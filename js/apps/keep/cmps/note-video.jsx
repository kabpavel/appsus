import { NoteToTrash } from '../cmps/note-to-trash.jsx';
import { NoteTitleEdit } from './note-title-edit.jsx';
import { ColorPicker } from './color-picker.jsx';

export class NoteVideo extends React.Component {

    render() {

        const { note, onDeleteNote } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>
                    {/* <h2 className="info-title">{note.info.title}</h2> */}
                    <NoteTitleEdit noteId={note.id} title={note.info.title} />
                    <iframe width="305" src={note.info.url}></iframe>
                </div>
                <div className="flex align-center">
                    <NoteToTrash note={note} onDeleteNote={onDeleteNote} />
                    <ColorPicker note={note} />
                </div>
            </div>
        )
    }
}
