import { createContext, useContext } from "react";
import { NoteGroupsObj, NotesObj } from "../RealmManager/RealmManager";

type NotesListContextType = {
    List : NotesObj[],
    setList : Function
}

type NoteGroupsListContextType = {
    List : NoteGroupsObj[],
    setList : Function
}

export const NotesListContext = createContext<NotesListContextType | undefined>(undefined);
export const NoteGroupsListContext = createContext<NoteGroupsListContextType | undefined>(undefined);