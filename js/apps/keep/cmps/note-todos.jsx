

export class NoteTodos extends React.Component {

    render() {

        const { note } = this.props

        note.info.todos


        console.log('note', note)

        console.log('note.info.todos', note.info.todos)

        if (!note) return <div>Loading...</div>
        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2>Todos</h2>
                    <h2>{note.info.title}</h2>

                    {/* {note.info.todos.map((todo, index) => {
                            <span><input type="checkbox" id={`todo-${index}`} name={`todo-${index}`} value={(!todo.doneAt) ? 'no' : 'yes'} />
                                <label for={`todo-${index}`}>{todo.text}</label><br /> </span>
                        })} */}

                    {note.info.todos.map((todo, index) => {
                       console.log('todo',todo,'index',index)
                    })}


                    {/* <ul>
                        {note.info.todos.map((todo, index) =><li key={index}>{todo.text}</li>)}
                    </ul>  */}
                </div>
            </div>
        )
    }
}
