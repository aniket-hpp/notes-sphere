import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
const Plus = require('../Icons/plus.png')

const AddButton = (props : {visible: boolean, onPress : any}) => {
    const style = StyleSheet.create({
        container: {
            position: 'absolute',
            top: Dimensions.get('screen').height - 240,
            left: Dimensions.get('screen').width - 100,
            width: 60,
            height: 60,
            display: props.visible?'flex':'none',
            zIndex: 10
        },
        img: {
            width: 60,
            height: 60
        }
    })

    return (
        <TouchableOpacity activeOpacity={0.8} style={style.container} onPress={props.onPress}>
            <Image style={style.img} source={Plus}/>
        </TouchableOpacity>
    )
}

export default AddButton