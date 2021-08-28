import { NoteTodo } from './note-todo.jsx'
import { NoteToTrash } from '../cmps/note-to-trash.jsx';
import { NoteTitleEdit } from './note-title-edit.jsx';
import { ColorPicker } from './color-picker.jsx';

export class NoteTodos extends React.Component {

    render() {

        const { note, onDeleteNote } = this.props
        if (!note) return <div>Loading...</div>

        //debugger

        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    {/* <h2 className="info-title">{note.info.label}</h2> */}
                    <NoteTitleEdit noteId={note.id} title={note.info.label} todos={true}/>
                    <ul className="ul-todos">
                        {note.info.todos.map((todo, index) => <NoteTodo todo={todo} index={index} key={index} noteId={note.id} />)}
                    </ul>
                </div>
                <div className="flex">
                    <NoteToTrash note={note} onDeleteNote={onDeleteNote} />
                    <ColorPicker note={note} />
                </div>
            </div>
        )
    }
}
