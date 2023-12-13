import { Text, StyleSheet, Modal, ScrollView, SafeAreaView } from "react-native";
import AddButton from "../Components/AddButton";
import { realm } from "../RealmManager/RealmManager";
import { useState } from "react";
import AddGroupView from "./AddGroupView";
import GroupList from "../Components/GroupList";
import { NoteGroupsListContext } from "../Extras/Context";

// entry point
// all components shares a single instance of RealmManager class named realm
// list and functions of useStates are passed through useContext

const HomeView = () => {
    const style = StyleSheet.create({
        container: {
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
        }
    })

    const [grpList, updateList] = useState(realm.readGroups())
    const [isAddGrp, setAddGrp] = useState(false)

    return (
        <SafeAreaView style={style.container}>
            <NoteGroupsListContext.Provider value={{List: grpList, setList: updateList}}>            
                <Text style={style.title}>Note Groups</Text>

                {/* renders the note groups list */}
                <GroupList/>

                {/* modal for add or edit group pop up */}
                <Modal animationType="fade" transparent={true} visible={isAddGrp}>
                    <AddGroupView 
                        title="New Group"
                        close={() => setAddGrp(false)}
                        obj={undefined}
                    />
                </Modal>

                {/* floating button */}
                <AddButton visible={!isAddGrp} onPress={() => setAddGrp(true)}/>
            </NoteGroupsListContext.Provider>
        </SafeAreaView>
    )
}

export default HomeView