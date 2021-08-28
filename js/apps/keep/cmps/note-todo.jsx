import { noteService } from '../services/note.service.js';

export class NoteTodo extends React.Component {

    state = {
        isChecked: false
    }

    componentDidMount() {
        const { todo } = this.props
        //debugger
        const isChecked = (!todo.doneAt) ? false : true
        console.log('const isChecked = (!todo.doneAt) ? false : true', (!todo.doneAt) ? false : true)


        this.setState({ isChecked })
    }

    handleOnTodoChecked = (ev) => {
        const id = ev.target.id;
        const defaultChecked = ev.target.defaultChecked

        const { isChecked } = this.state
        const newIsChecked = !isChecked


        console.log('handleOnTodoChecked - newIsChecked', newIsChecked, 'defaultChecked', defaultChecked)

        const todoId = id.split('-')[1]
        const { noteId } = this.props
        const doneAt = (newIsChecked) ? Date.now() : ''



        noteService.updateTodo(noteId, todoId, doneAt).
            then(() => {
                this.setState({ isChecked: newIsChecked })
            })
    }


    render() {
        const { isChecked } = this.state
        const { index, todo } = this.props
        if (!todo) return <div>Loading todo...</div>
        //debugger

        console.log(' render() - const { isChecked } = this.state', isChecked);

        return (
            <span><input type="checkbox" id={`todo-${todo.id}`} name={`todo-${todo.id}`}
                // defaultChecked={isChecked}
                checked={isChecked}
                value={isChecked} onChange={this.handleOnTodoChecked} />
                <label for={`todo-${index}`}>{todo.txt}</label><br /> </span>
        )
    }
}