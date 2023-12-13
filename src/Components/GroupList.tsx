import { View, ScrollView, StyleSheet, Text } from "react-native";
import GroupTile from "./GroupTile";
import { useContext } from "react";
import { NoteGroupsListContext } from "../Extras/Context";

const GroupList = () => {
    // group list and its set Function are shared using useContext
    const context = useContext(NoteGroupsListContext)

    const style = StyleSheet.create({
        container:{
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
            display: !context?.List.length?'flex':'none',
            fontSize: 18,
            color: 'black',
            fontWeight: '400',
            textAlign: 'center'
        }
    })

    return (
        <ScrollView style={style.scrollVw}>
            <View style={style.container}>
                {
                    context?.List.map((o, i) => {
                        // component to render individual group tiles
                        return <GroupTile obj={o} key={i}/>
                    })
                }
            </View>
            
            {/* show a text empty if group list is empty */}
            <Text style={style.text}>
                Empty
            </Text>
        </ScrollView>
    )
}

export default GroupList