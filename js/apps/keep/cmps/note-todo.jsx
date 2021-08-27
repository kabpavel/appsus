export class NoteTodo extends React.Component {
    render() {
        
        const { index, todo } = this.props
        if (!todo) return <div>Loading todo...</div>

        return (
            <span><input type="checkbox" id={`todo-${index}`} name={`todo-${index}`} value={(!todo.doneAt) ? 'no' : 'yes'} />
                <label for={`todo-${index}`}>{todo.txt}</label><br /> </span>
        )
    }
}