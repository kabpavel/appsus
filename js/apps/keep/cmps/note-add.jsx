
import { noteService } from '../services/note.service.js';
import { ImageHover } from "./image-hover.jsx"
import { utilService } from '../../../util.service.js';

export class NoteAdd extends React.Component {

    state = {
        node: '',
        style: '',
        inputText: '',
        inputTitle: '',
        type: '',
    }

    componentDidMount() {
        const type = 'note-txt'
        this.setState({ type })
    }

    handleChange = (ev) => {
        //console.log('handleChange')
        //console.log('ev.target.name', ev.target.name)
        //console.log('ev.target.type', ev.target.type)
        //console.log('ev.target.value', ev.target.value)

        if (ev.target.name === 'input-text') {
            const inputText = ev.target.value
            this.setState({ inputText })
            return
        }

        if (ev.target.name === 'input-title') {
            const inputTitle = ev.target.value
            this.setState({ inputTitle })
            return
        }

        const type = ev.target.name
        this.setState({ type, inputText: '', inputTitle: '' })
    }

    onSave = (ev) => {
        ev.preventDefault()
        const { type, inputTitle, inputText } = this.state

        //todo message
        if (!inputTitle) return
        if (!inputText) return


        let info = ''
        switch (type) {
            case 'note-txt':
                console.log('title: inputTitle, txt: inputText', inputTitle, inputText)

                info = { title: inputTitle, txt: inputText }
                break

            case 'note-audio':
                info = { title: inputTitle, url: inputText }
                break

            case 'note-todos':
                const todosList = inputText.split(',')
                if (todosList.length === 0) return //todo message
                const todos = []
                todosList.forEach((todo) => {
                    todos.push({ id: utilService.makeId(6), txt: todo, doneAt: null })
                })
                info = { label: inputTitle, todos }
                break

            case 'note-img':
                info = { title: inputTitle, url: inputText }
                break

            case 'note-video':
                info = { title: inputTitle, url: inputText }
                break

            default:
                return ''
        }
        //console.log('info', info)

        noteService.addNote(type, false, info, '')
            .then(() => {
                const inputText = ''
                const inputTitle = ''
                this.setState({ inputText, inputTitle })
            }).then(() => {
                const { handleLoadNotes } = this.props
                handleLoadNotes()
            })
    }

    placeholder = () => {
        const { type } = this.state
        switch (type) {
            case 'note-txt':
                return 'Enter text'
            case 'note-audio':
                return 'Enter audio URL'
            case 'note-todos':
                return 'Enter todos comma separated'
            case 'note-img':
                return 'Enter image URL'
            case 'note-video':
                return 'Enter video URL'
            default:
                return ''
        }
    }

    inputTextType = () => {
        const { type } = this.state
        switch (type) {
            case 'note-txt':
                return 'Text:  '
            case 'note-todos':
                return 'Todos: '
            case 'note-audio':
                return 'URL:   '
            case 'note-img':
                return 'URL:   '
            case 'note-video':
                return 'URL:   '
            default:
                return ''
        }
    }


    addSelect = (type) => {
        return (type === this.state.type) ? '_select' : ''
    }

    render() {
        const { type, inputText, inputTitle } = this.state
        if (!type) return <div>NoteAdd Loading...</div>

        return (
            <section className="note-add-container">
                <div className="note-add">
                    <div className="input-container flex justify-space-between">
                        <label htmlFor="input-title">Title: </label>
                        <input className="input-title" type="text" id="input-title" name="input-title" autocomplete="off" 
                        placeholder="Enter title" value={inputTitle} onChange={this.handleChange} />
                    </div>
                    <div className="input-container flex justify-space-between">
                        <label htmlFor="input-text">{`${this.inputTextType()}`}</label>
                        <input className="input-text" type="text" id="input-text" name="input-text" autocomplete="off" 
                        placeholder={`${this.placeholder()}`} value={inputText} onChange={this.handleChange} />
                    </div>
                    <div className="buttons-container">
                        <ImageHover className="note-txt" name="note-txt" onHoverSrc="js/apps/keep/img/note-txt_select.png"
                            onRegularSrc={`js/apps/keep/img/note-txt${this.addSelect('note-txt')}.png`} onClick={this.handleChange} />
                        <ImageHover className="note-todos" name="note-todos" onHoverSrc="js/apps/keep/img/note-todos_select.png"
                            onRegularSrc={`js/apps/keep/img/note-todos${this.addSelect('note-todos')}.png`} onClick={this.handleChange} />
                        <ImageHover className="note-img" name="note-img" onHoverSrc="js/apps/keep/img/note-img_select.png"
                            onRegularSrc={`js/apps/keep/img/note-img${this.addSelect('note-img')}.png`} onClick={this.handleChange} />
                        <ImageHover className="note-video" name="note-video" onHoverSrc="js/apps/keep/img/note-video_select.png"
                            onRegularSrc={`js/apps/keep/img/note-video${this.addSelect('note-video')}.png`} onClick={this.handleChange} />
                        <ImageHover className="note-save" name="note-save" onHoverSrc={'js/apps/keep/img/save_hover.png'}
                            onRegularSrc={'js/apps/keep/img/save.png'} onClick={this.onSave} />
                    </div>
                </div>
            </section>
        )
    }
}