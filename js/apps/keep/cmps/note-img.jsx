import { NoteToTrash } from '../cmps/note-to-trash.jsx';

export class NoteImg extends React.Component {

    render() {
        const { note, onDeleteNote } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2 className="info-title">{note.info.title}</h2>
                    <img src={note.info.url} alt="" />
                </div>
                <NoteToTrash note={note} onDeleteNote={onDeleteNote} />
            </div>
        )
    }
}
