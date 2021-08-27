import { noteService } from "../services/note.service.js"

export class NoteTitleEdit extends React.Component {

    state = {
        isEdit: false,
        editTitle: '',
        isTodos: false
    }

    isFirstToggle = true 

    componentDidMount() {
        if (this.props.todos) this.setState({ isTodos: true })
    }

    toggleEditStatus = () => {
        const isEdit = this.state.isEdit
        this.setState({ isEdit: !isEdit })
    }

    handleOnChange = (ev) => {
        const editTitle = ev.target.value
        
        this.setState({ editTitle })
    }

    onCancelEdit = () => {
        this.setState({ isEdit: false, editTitle: '' })
    }

    onSaveNewTitle = () => {
        const { editTitle, isTodos } = this.state
        const { noteId } = this.props

        debugger
        if (!editTitle) {
            this.toggleEditStatus();
            return
        }
        noteService.updateNoteTitle(noteId, editTitle, isTodos)
            .then(() => {
                //todo message
                this.setState({ isEdit: false, editTitle: '' })
                this.props.history.push('/note-app')
            })

        this.toggleEditStatus()
    }

    render() {
        const { title } = this.props
        const { isEdit, editTitle } = this.state

        console.log('title',title)
        console.log('isEdit',isEdit)
        console.log('editTitle',editTitle)

        return (
            <React.Fragment>
                {!isEdit &&
                    <section className="note-title">
                        <div>{title}</div>
                        <button onClick={this.toggleEditStatus}>edit</button>
                    </section>
                }
                {isEdit &&
                    <section className="note-title">
                        <input className="note-title-edit-input" type="text" name="editTitle" placeholder={title} value={editTitle} onChange={this.handleOnChange} />
                        <div>
                            <button className="save-edit" onClick={this.onSaveNewTitle}>save</button>
                            <button className="cancel-edit" onClick={this.onCancelEdit}>cancel</button>
                        </div>
                    </section>
                }
            </React.Fragment>
        )
    }
}