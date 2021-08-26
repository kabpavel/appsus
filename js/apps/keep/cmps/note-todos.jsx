

export class NoteTodos extends React.Component {

    render() {

        const { note } = this.props
        if(!note) return <div>Loading...</div>
        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2>Todos</h2>
                     <h2>{note.info.title}</h2>
                    
                     <form action="">
                     {note.info.todos.map((todo, index) => {
                        <span><input type="checkbox" id={`todo-${index}`} name={`todo-${index}`} value={(!todo.doneAt)?'no':'yes'} />
                            <label for={`todo-${index}`}>{todo.text}</label><br/> </span>
                           })}
                    </form>
                    
                    {/* <ul>
                        {note.info.todos.map((todo, index) =><li key={index}>{todo.text}</li>)}
                    </ul>  */}
                </div>
            </div>
        )
    }
}
