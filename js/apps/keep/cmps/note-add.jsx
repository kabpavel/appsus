
import { noteService } from '../services/note.service.js';

export class NoteAdd extends React.Component {

    state = {
        node: '',
        style: '',
        inputText: '',
        type: '',

    }

    componentDidMount() {
        const type = 'note-txt'
        this.setState({ type })
    }

    handleChange = (ev) => {
        console.log('handleChange')
        console.log('ev.target.name', ev.target.name)
        console.log('ev.target.type', ev.target.type)
        console.log('ev.target.value', ev.target.value)

        if (ev.target.type === 'text') {
            const inputText = ev.target.value
            this.setState({ inputText })
            return
        }

        const type = ev.target.name
        this.setState({ type })
    }

    onSave = (ev) => {
        ev.preventDefault()
        console.log('onSave')
        const { type, inputText } = this.state
        
        if (!inputText) return
        const infoList = inputText.split('|')
        if (!infoList) return//todo message

        let info = ''
        switch (type) {
            case 'note-txt':
                info = { txt: infoList[0] }
                break
            case 'note-audio':
                if (infoList.length !== 2) return //todo message
                info = { title: infoList[0], url: infoList[1] }
                break
            case 'note-todos':
                if (infoList.length !== 2) return //todo message
                const todosList = inputText.split(',')
                if (todosList.length === 0) return //todo message
                const todos = []
                todosList.forEach((todo, idx) => {
                    if (idx != 0) todos.push({ txt: todo, doneAt: null })
                })
                info = { label: infoList[0], todos }

                break
            case 'note-img':
                if (infoList.length !== 2) return //todo message
                info = { title: infoList[0], url: infoList[1] }
                break
            case 'note-video':
                if (infoList.length !== 2) return //todo message
                info = { title: infoList[0], url: infoList[1] }
                break
            default:
                return ''
        }
        console.log('info', info)

        noteService.addNote(type, false, info, '')
            .then(() => {
                const inputText = ''
                this.setState({ inputText })
            }).then(() => {
                const { handleLoadNotes } = this.props
                handleLoadNotes()
            })
    }

    placeholder = () => {
        const { type } = this.state
        switch (type) {
            case 'note-txt':
                return 'Enter: text'
            case 'note-audio':
                return 'Enter: title | audio URL'
            case 'note-todos':
                return 'Enter: title | todos comma separated'
            case 'note-img':
                return 'Enter: title | image URL'
            case 'note-video':
                return 'Enter: title | video URL'
            default:
                return ''
        }
    }

    addSelect = (type) => {
        return (type === this.state.type) ? '_select' : ''
    }

    render() {
        const { type, inputText, handleLoadNotes } = this.state
        if (!type) return <div>NoteAdd Loading...</div>
        return (
            <section className="note-add-container">
                <div className="note-add">
                    <input className="input-text" type="text" name="text" autocomplete="off" placeholder={`${this.placeholder()}`} value={inputText} onChange={this.handleChange} />

                    <div className="buttons-container">
                        <img onClick={this.handleChange} name="note-txt" src={`../js/apps/keep/img/note-txt${this.addSelect('note-txt')}.png`} alt="" />
                        {/* <img onClick={this.handleChange} name="note-audio" src={`../js/apps/keep/img/note-audio${this.addSelect('note-audio')}.png`} alt="" /> */}
                        <img onClick={this.handleChange} name="note-todos" src={`../js/apps/keep/img/note-todos${this.addSelect('note-todos')}.png`} alt="" />
                        <img onClick={this.handleChange} name="note-img" src={`../js/apps/keep/img/note-img${this.addSelect('note-img')}.png`} alt="" />
                        <img onClick={this.handleChange} name="note-video" src={`../js/apps/keep/img/note-video${this.addSelect('note-video')}.png`} alt="" />
                        <img src={'../js/apps/keep/img/save.png'} alt="" onClick={this.onSave} />
                    </div>
                </div>
            </section>
        )
    }
}