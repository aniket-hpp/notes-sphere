import { NotesObj } from "../RealmManager/RealmManager";

export interface EditedNote {
    title : string,
    para : string,
    index : number,
}

export interface UpdatedNotesList {
    list : NotesObj[]
}