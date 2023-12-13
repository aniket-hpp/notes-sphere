import { View, Text, ScrollView, StyleSheet, DeviceEventEmitter } from 'react-native';
import { NotesListViewProps } from '../Extras/Types';
import NoteTile from '../Components/NoteTile';
import { useEffect, useState } from 'react';
import AddButton from '../Components/AddButton';
import {realm} from '../RealmManager/RealmManager'
import { NotesListContext } from '../Extras/Context';
import { EditedNote, UpdatedNotesList } from "../Extras/Types2";

const NotesListView = ({navigation, route} : NotesListViewProps) => {
    const [notesList, updateNotesList] = useState(realm.readNotes(route.params.grpId))

    const style = StyleSheet.create({
        mainContainer: {
            flex: 1,
            height: '100%',
            backgroundColor: '#EFF2DD'
        },
        title: {
            color: 'black',
            fontSize: 22,
            paddingVertical: 10,
            fontWeight: '700',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginBottom: 20,
            marginHorizontal: 20
        },
        scrollContainer:{
            alignItems: 'center',
            gap: 2,
            marginHorizontal: 20,
            borderRadius: 8,
            overflow: 'hidden'
        },
        scrollVw: {
            marginBottom: 50
        },
        text: {
            display: !notesList.length?'flex':'none',
            fontSize: 18,
            color: 'black',
            fontWeight: '400',
            textAlign: 'center'
        }
    })

    useEffect(() => {
        DeviceEventEmitter.addListener("event.UpdatedList", 
            (newList : UpdatedNotesList) => {
                updateNotesList(newList.list)
            }
        )

        DeviceEventEmitter.addListener("event.EditedNote", 
            (editedNote : EditedNote) => {
                realm.updateNote(notesList[editedNote.index], editedNote.title, editedNote.para)
            }
        )
    })
    
    return (
        <View style={style.mainContainer}>
            <Text style={style.title}>Notes : {route.params.grpName}</Text>

            <NotesListContext.Provider value={{List: notesList, setList: updateNotesList}}>
                <ScrollView style={style.scrollVw}>
                        <View style={style.scrollContainer}>{
                            notesList.map((obj, i) => {
                                return <NoteTile 
                                    obj={obj} 
                                    grpObjKey={route.params.grpId}
                                    key={i}
                                    index={i}
                                />
                            })
                        }</View>

                    <Text style={style.text}>Empty</Text>
                </ScrollView>
            </NotesListContext.Provider>

            <AddButton visible={true} onPress={() => {
                navigation.navigate('NotesView', 
                    {
                        title: "", 
                        paragraph: "" , 
                        grpId : route.params.grpId, 
                        index: -1
                    })
                }
            }/>
        </View>
    )
}

export default NotesListView