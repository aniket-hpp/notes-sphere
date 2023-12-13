import { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Button from '../Components/Button'
import { NoteGroupsObj, realm } from '../RealmManager/RealmManager'
import { NoteGroupsListContext } from '../Extras/Context'

const Add = require('../Icons/continue.png')
const Cancel = require('../Icons/cancel.png')

const AddGroupView = (props : 
        {
            title : string,
            close : Function, 
            obj : NoteGroupsObj | undefined
        }) => {

    const context = useContext(NoteGroupsListContext)

    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent :'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20,
            zIndex: 10
        },
        group: {
            elevation: 25,
            backgroundColor: 'white',
            width: '100%',
            height: 'auto',
            borderRadius: 10,
            padding: 20
        },
        tab1: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        tab2: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20
        },
        img: {
            width: 40,
            height: 40
        },
        title: {
            color: 'black',
            fontSize: 22,
            paddingBottom: 30,
            fontWeight: 'bold'
        },
        textInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: 45,
            padding: 10
        }
    })

    const [text, setText] = useState(props.obj?props.obj.group:"")

    const add = () => {
        if(text.replace(/\s/g, '').length){
            if(props.obj != undefined && props.obj.group != text){
                realm.updateGroup(props.obj, text)
            }else if(props.obj == undefined){
                realm.writeGroup(text)
            }

            context?.setList(realm.readGroups())
        }

        setText("")
        props.close()
    }

    return (
        <View style={style.container}>
            <View style={style.group}>
                <View style={style.tab1}>
                    <Text style={style.title}>{props.title}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => props.close()}>
                        <Image style={style.img} source={Cancel}/>
                    </TouchableOpacity>
                </View>


                <View style={style.tab2}>
                    <TextInput
                        style={style.textInput}
                        value={text} 
                        onChangeText={setText} 
                        placeholder='Group Name'
                    />
                    
                    <TouchableOpacity activeOpacity={0.5} onPress={add}>
                        <Image style={style.img} source={Add}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddGroupView