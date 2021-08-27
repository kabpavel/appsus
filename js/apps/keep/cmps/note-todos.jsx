import { NoteTodo } from './note-todo.jsx'
import { NoteToTrash } from '../cmps/note-to-trash.jsx';
export class NoteTodos extends React.Component {

    render() {

        const { note, onDeleteNote } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2 className="info-title">{note.info.label}</h2>
                    <ul>
                        {note.info.todos.map((todo, index) => <NoteTodo todo={todo} index={index} key={index} />)}
                    </ul>
                </div>
                <NoteToTrash note={note} onDeleteNote={onDeleteNote} />
            </div>
        )
    }
}
