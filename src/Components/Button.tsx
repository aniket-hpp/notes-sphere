import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props : {name : string, onPress : any}) => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: '#55A891',
            width: 80,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        text: {
            color: 'white'
        }
    })
    
    return (
        <TouchableOpacity activeOpacity={0.7} style={style.container} onPress={props.onPress}>
            <Text style={style.text}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default Button