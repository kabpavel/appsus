
export class NoteAdd extends React.Component {

    state = {
        node: null,
        style: null,
        inputText: null,
        type: null
    }

    handleChange = (ev) => {
        console.log('handleChange')
        debugger
        console.log('ev.target.name', ev.target.name)

        if (ev.target.type === 'image') {
            const type = ev.target.name
            this.setState({ type })
        }

        if (ev.target.type === 'text') {
            const inputText = ev.target.value
            this.setState({ inputText })
        }

        console.log('this.state.filterBy', this.state.filterBy)
    }

    onSave = (ev) => {
        ev.preventDefault()
        console.log('onFilter')

        //this.props.onSetFilter(this.state.filterBy)        
    }

    placeholder = () => {

        const { type } = this.state

        switch (type) {
            case 'note-txt':
                return 'Enter text...'
            case 'note-audio':
                return 'Enter audio URL...'
            case 'note-todos':
                return 'Enter comma separated list...'
            case 'note-img':
                return 'Enter image URL...'
            case 'note-video':
                return 'Enter image URL...'
            default:
                return ''
        }
    }


    render() {

        const { type, inputText } = this.state

        return (
            <section className="note-add-container">
                <form className='note-add' onSubmit={this.onSave}>
                    <input className="input-text" type="text" name='text' placeholder={this.placeholder} value={inputText} onChange={this.handleChange} />
                    <input type="image" src="../js/apps/keep/img/note-audio.png" name="note-audio" onChange={this.handleChange} />
                    <input type="image" src="../js/apps/keep/img/note-todos.png" name="note-todos" onChange={this.handleChange} />
                    <input type="image" src="../js/apps/keep/img/note-img.png" name="note-img" onChange={this.handleChange} />
                    <input type="image" src="../js/apps/keep/img/note-video.png" name="note-video" onChange={this.handleChange} /> 
                    <button>Save</button>
                </form>
            </section>
        )
    }
}