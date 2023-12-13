import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackList = {
    HomeView: undefined;
    NotesListView: {grpName : string, grpId : string};
    NotesView: {title: string, paragraph : string, grpId : string, index : number};
}

export type NotesListViewProps = NativeStackScreenProps<StackList, 'NotesListView'>
export type NotesViewProps = NativeStackScreenProps<StackList, 'NotesView'>
export const Stack = createNativeStackNavigator<StackList>();