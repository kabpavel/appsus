import { NoteToTrash } from '../cmps/note-to-trash.jsx';

export class NoteTxt extends React.Component {

    render() {
        const { note, onDeleteNote } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>
                    <NoteToTrash note={note} onDeleteNote={onDeleteNote}/>
                    <h2>Text</h2>
                    <h2 className="info-title">{note.info.title}</h2>
                    <p>{note.info.txt}</p>
                </div>
            </div>
        )
    }
}
