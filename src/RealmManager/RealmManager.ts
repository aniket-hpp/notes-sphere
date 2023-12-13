import 'react-native-get-random-values'
import Realm from 'realm'

class Notes extends Realm.Object<Notes> {
    _id! : Realm.BSON.ObjectId;
    grpKey! : string;
    title! : String;
    paragraph! : string;
    dateCreated!: string;

    static schema: Realm.ObjectSchema = {
        name: 'Notes',
        properties: {
            _id: 'objectId',
            grpKey: 'string',
            title: 'string',
            paragraph: 'string',
            dateCreated: 'string'
        },
        primaryKey: '_id'
    };
}

export class NotesObj {
    _id! : Realm.BSON.ObjectId;
    title! : string;
    paragraph! : string;
    dateCreated!: string;
}

class NoteGroups extends Realm.Object<NoteGroups> {
    _id! : Realm.BSON.ObjectId;
    group! : string;

    static schema: Realm.ObjectSchema = {
        name: 'NoteGroups',
        properties: {
            _id: 'objectId',
            group: 'string'
        },
        primaryKey: '_id'
    };
}

export class NoteGroupsObj {
    _id! : Realm.BSON.ObjectId;
    group! : string;
}

class RealmManager {
    realm = new Realm({schema: [NoteGroups, Notes], schemaVersion: 1})

    writeGroup(grpName : string) {
        try{
            this.realm.write(() => {
                this.realm.create('NoteGroups', {
                    _id: new Realm.BSON.ObjectId(),
                    group: grpName
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    readGroups() : NoteGroupsObj[] {
        return Array.from(this.realm.objects('NoteGroups'));
    }

    updateGroup(obj : NoteGroupsObj, grpName : string) {
        try{
            this.realm.write(() => {
                obj.group = grpName
            })
        }catch(e){
            console.log(e)
        }
    }

    writeNote(grpId : string, title : string, paragraph : string) {
        try{
            this.realm.write(() => {
                this.realm.create('Notes', {
                    _id: new Realm.BSON.ObjectId(),
                    title: title,
                    paragraph: paragraph,
                    dateCreated: Date.toString(),
                    grpKey: grpId
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    updateNote(obj : NotesObj, title : string, para : string) {
        try{
            this.realm.write(() => {
                obj.title = title
                obj.paragraph = para
                obj.dateCreated = Date().toString()
            })
        }catch(e){
            console.log(e)
        }
    }

    readNotes(grpKey : string) : NotesObj[] {
        let notes = this.realm.objects('Notes').filter((e) => {return e.grpKey == grpKey})
        return Array.prototype.slice.call(notes, 0, notes.length)
    }

    deleteGroup(grp : NoteGroupsObj) {
        let notes = this.readNotes(String(grp._id))

        notes.map((obj) => {
            this.deleteNote(obj)
        })

        try{
            this.realm.write(() => {
                this.realm.delete(grp)
            })
        }catch(e){
            console.log(e)
        }
    }

    deleteNote(note : NotesObj) {
        try{
            this.realm.write(() => {
                this.realm.delete(note)
            })
        }catch(e){
            console.log(e)
        }
    }
}

export const realm = new RealmManager()