import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { NotesObj, realm } from "../RealmManager/RealmManager";
import { useAppNavigation } from "../Extras/usAppNavigation";
import { useContext } from "react";
import 'react-native-gesture-handler'
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler'
import { NotesListContext } from "../Extras/Context";
const arrow = require('../Icons/right-arrow.png')
const trash = require('../Icons/delete.png')
import { SwipeView } from "../Extras/SwipeView";


const NoteTile = (props : {obj : NotesObj, grpObjKey : string, index : number}) => {
    const navigation = useAppNavigation()
    const context = useContext(NotesListContext)

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

    const deleteObj = () => {
        realm.deleteNote(props.obj)
        context?.setList(realm.readNotes(props.grpObjKey))
    }

    const editObj = () => {
        navigation.navigate('NotesView', {title: props.obj.title, paragraph: props.obj.paragraph, grpId: props.grpObjKey, index: props.index})
    }

    return (
        <View>
            <GestureHandlerRootView>
                <Swipeable 
                    overshootFriction={10}
                    renderRightActions={() => {return SwipeView(trash, 'red', deleteObj)}} 
                >
                    <TouchableOpacity 
                        style={style.container} 
                        activeOpacity={0.6}
                        onPress={editObj}
                    >
                        <Text style={style.text}>{props.obj.title}</Text>

                        <TouchableOpacity 
                            style={style.imgButton} 
                            onPress={editObj}
                            activeOpacity={0.5}
                        >
                            <Image style={style.img} source={arrow}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>
        </View>
    )
}

export default NoteTile