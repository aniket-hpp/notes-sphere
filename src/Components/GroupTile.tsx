import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { NoteGroupsObj, realm } from "../RealmManager/RealmManager";
import { useAppNavigation } from "../Extras/usAppNavigation";
import { useState } from "react";
import 'react-native-gesture-handler'
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler'
import AddGroupView from "../Views/AddGroupView";
import { useContext } from "react";
import { NoteGroupsListContext } from "../Extras/Context";
import { SwipeView } from "../Extras/SwipeView";

const arrow = require('../Icons/right-arrow.png')
const edit = require('../Icons/edit.png')
const trash = require('../Icons/delete.png')

const GroupTile = (props : {obj : NoteGroupsObj, key : number}) => {
    const navigation = useAppNavigation()
    const context = useContext(NoteGroupsListContext);

    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: Dimensions.get('screen').width - 40,
            height: 50,
            padding: 10,
            backgroundColor: '#8ACDD7',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: 'white',
            fontSize: 20,
            fontWeight: '500'
        },
        imgButton: {
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: '#FFCF96',
            borderRadius: 8,
            padding: 15
        },
        img: {
            width: 25,
            height: 25
        }
    })

    const [editView, setEditView] = useState(false)

    const deleteObj = () => {
        realm.deleteGroup(props.obj)
        context?.setList(realm.readGroups())
    }

    const editObj = () => {
        setEditView(true)
    }

    const goToNotesListView = () => {
        navigation.navigate('NotesListView', {grpId: String(props.obj._id), grpName: props.obj.group})
    }

    return (
        <View>
            <GestureHandlerRootView>
                <Swipeable
                    overshootFriction={10}
                    renderRightActions={() => {return SwipeView(trash, 'red', deleteObj)}} 
                    renderLeftActions={() => {return SwipeView(edit, 'cornflowerblue', editObj)}
                }>
                    <TouchableOpacity 
                        style={style.container} 
                        activeOpacity={0.6}
                        onPress={goToNotesListView}
                    >
                        <Text style={style.text}>{props.obj.group}</Text>

                        <TouchableOpacity 
                            style={style.imgButton} 
                            onPress={goToNotesListView}
                            activeOpacity={0.5}
                        >
                            <Image style={style.img} source={arrow}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>

            <Modal transparent={true} visible={editView}>
                <AddGroupView 
                    title="Edit Group"
                    close={() => setEditView(false)}
                    obj={props.obj}
                />
            </Modal>
        </View>
    )
}

export default GroupTile