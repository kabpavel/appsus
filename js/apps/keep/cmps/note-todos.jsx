

export class NoteTodos extends React.Component {

    render() {
        console.log('this.props',this.props)

        const { note } = this.props
        if(!note) return <div>Loading...</div>
        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2>Todos</h2>
                     <h2>{note.info.title}</h2>
                    <ul>
                        {note.info.todos.map((todo, index) =><li key={index}>{todo.text}</li>)}
                    </ul> 
                </div>
            </div>
        )
    }
}
