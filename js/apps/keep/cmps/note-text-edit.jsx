import { noteService } from "../services/note.service.js"
const { withRouter } = ReactRouterDOM
import { ImageHover } from "./image-hover.jsx"

export class _NoteTextEdit extends React.Component {

    state = {
        isEdit: false,
        editText: ''
    }

    isFirstToggle = true

    toggleEditStatus = () => {
        const isEdit = this.state.isEdit
        this.setState({ isEdit: !isEdit })
    }

    handleOnChange = (ev) => {
        this.isFirstToggle = false
        const editText = ev.target.value
        this.setState({ editText })
    }

    onCancelEdit = () => {
        this.isFirstToggle = true
        this.setState({ isEdit: false, editText: '' })
    }

    onSaveNewText = () => {
        const { editText } = this.state
        const { noteId } = this.props

        this.isFirstToggle = true

        //debugger
        if (!editText) {
            this.toggleEditStatus();
            return
        }
        noteService.updateNoteText(noteId, editText)
            .then(() => {
                //todo message
                this.setState({ isEdit: false, editText: '' })
                this.props.history.push('/note-app')
            })

        this.toggleEditStatus()
    }

    render() {
        const { text } = this.props
        const { isEdit, editText } = this.state

        //console.log('text',text)
        //console.log('isEdit',isEdit)
        //console.log('editText',editText)

        return (
            <React.Fragment>
                {!isEdit &&
                    <section className="note-text">
                        <p>{text}</p>
                        <ImageHover className="img-edit-title" name="edit-title" onHoverSrc="../js/apps/keep/img/edit-note_select.png"
                            onRegularSrc={`../js/apps/keep/img/edit-note.png`} onClick={this.toggleEditStatus} />
                    </section>
                }
                {isEdit &&
                    <section className="note-text">
                        <textarea className="note-text-edit-input" type="text" name="editText" value={(!this.isFirstToggle) ? editText : text} onChange={this.handleOnChange} ></textarea>

                        {/* <input className="note-text-edit-input" type="text" name="editText" value={(!this.isFirstToggle) ? editText : text} onChange={this.handleOnChange} /> */}
                        
                        <div>

                            <ImageHover className="img-save-edit" name="save-edit" onHoverSrc="../js/apps/keep/img/ok_select.png"
                                onRegularSrc={`../js/apps/keep/img/ok.png`} onClick={this.onSaveNewText} />

                            <ImageHover className="img-cancel-edit" name="cancel-edit" onHoverSrc="../js/apps/keep/img/cancel_select.png"
                                onRegularSrc={`../js/apps/keep/img/cancel.png`} onClick={this.onCancelEdit} />
                        </div>
                    </section>
                }
            </React.Fragment>
        )
    }
}

export const NoteTextEdit = withRouter(_NoteTextEdit)