import { View, Text, StyleSheet } from "react-native";

const TopBar = () => {
    const style = StyleSheet.create({
        container: {
            height: 60,
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            backgroundColor: 'rgba(238, 107, 97, 0.9)'
        },
        text: {
            color: '#EFF2DD',
            fontSize: 32,
            fontWeight: 'bold'
        }
    })

    return (
        <View style={style.container}>
            <Text style={style.text}>NoteSphere</Text>
        </View>
    )
}

export default TopBar