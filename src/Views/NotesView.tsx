import { View, TouchableOpacity, TextInput, StyleSheet, DeviceEventEmitter, ScrollView, Image } from "react-native";
import { NotesViewProps } from "../Extras/Types";
import { useState } from "react";
import Button from "../Components/Button";
import {realm} from '../RealmManager/RealmManager'
import { EditedNote } from "../Extras/Types2";

const saveIcon = require('../Icons/save.png')

const NotesView = ({navigation, route} : NotesViewProps) => {
    let editMode =  route.params.index != -1
    let titleCpy = editMode?route.params.title:""
    let paraCpy =  editMode?route.params.paragraph:""

    const style = StyleSheet.create({
        container: {
            flex : 1,
            padding: 10,
            backgroundColor: '#EFF2DD'
        },
        titleContainer: {
            padding: 10,
            borderBottomWidth: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between"
        },
        title : {
            fontSize: 32,
            color: 'black',
            fontWeight: 'bold'
        },
        paraContainer: {
            padding: 10,
            marginBottom: 10
        },
        para: {
            fontSize: 18,
        },
        buttonContainer: {
            padding: 20,
            alignItems:'flex-end'
        },
        img: {
            width: 35,
            height: 35
        }
    })

    const [title, setTitle] = useState(titleCpy)
    const [para, setPara] = useState(paraCpy)
    
    const save = () => {
        if(title.replace(/\s/g, '').length){
            if(editMode && (title != titleCpy || para != paraCpy)){
                let data : EditedNote = {index: route.params.index, title : title, para : para}
                DeviceEventEmitter.emit("event.EditedNote", data)
            }else if(!editMode){
                realm.writeNote(route.params.grpId, title, para)
                DeviceEventEmitter.emit("event.UpdatedList",  {list : realm.readNotes(route.params.grpId)})
            }
        }

        navigation.goBack()
    }

    return (
        <View style={style.container}>
            <View style={style.titleContainer}>
                <TextInput style={style.title} placeholder="Title" value={title} onChangeText={setTitle}/>

                <TouchableOpacity activeOpacity={0.7} onPress={save}>
                    <Image style={style.img} source={saveIcon}/>
                </TouchableOpacity>
            </View>

            <ScrollView style={style.paraContainer}>
                <TextInput multiline={true} style={style.para}placeholder="Paragraph" value={para} onChangeText={setPara}/>
            </ScrollView>

            <View style={style.buttonContainer}>
                <Button name="Cancel" onPress={() => {navigation.goBack()}}/>
            </View>
        </View>
    )
}

export default NotesView