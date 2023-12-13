import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'

export const SwipeView = (img : any, bgColor : string, onPress : any | Function) => {
    const style = StyleSheet.create({
        swipeView: {
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },
        swipeImg: {
            width: 30,
            height: 30
        }
    })
    
    return (
        <View style={[style.swipeView, {backgroundColor: bgColor}]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
                <Image style={style.swipeImg} source={img}/>
            </TouchableOpacity>
        </View>
    )
}