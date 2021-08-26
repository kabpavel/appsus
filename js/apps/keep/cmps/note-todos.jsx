import { NoteTodo } from './note-todo.jsx'

export class NoteTodos extends React.Component {

    render() {

        const { note } = this.props
        console.log('note', note)
        console.log('note.info.todos', note.info.todos)

        if (!note) return <div>Loading... note</div>
        if (!note.info.todos) return <div>Loading... todos</div>
        if (!note.info.label) return <div>Loading... label</div>
        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2>Todos</h2>
                    <h2 className="info-title">{note.info.label}</h2>
                    <ul>
                        { note.info.todos.map((todo, index) => <NoteTodo todo={todo} index={index} key={index}/>)}
                    </ul>  
                </div>
            </div>
        )
    }
}
