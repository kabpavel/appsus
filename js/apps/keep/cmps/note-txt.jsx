import { NoteToTrash } from '../cmps/note-to-trash.jsx';
import { NoteTitleEdit } from './note-title-edit.jsx';
import { NoteTextEdit } from './note-text-edit.jsx';
import { ColorPicker } from './color-picker.jsx';

export class NoteTxt extends React.Component {

    render() {

        const { note, onDeleteNote } = this.props

        if (!note) return <div>Loading...</div>
        //console.log('print')
        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>

                    <NoteTitleEdit noteId={note.id} title={note.info.title} />
                    {/* <h2 className="info-title">{note.info.title}</h2> */}
                    <NoteTextEdit noteId={note.id} text={note.info.txt} />
                </div>
                <div className="flex align-center">
                    <NoteToTrash note={note} onDeleteNote={onDeleteNote} />
                    <ColorPicker note={note} />
                </div>
            </div>
        )
    }
}
