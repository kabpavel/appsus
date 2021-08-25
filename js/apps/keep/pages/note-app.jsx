import { noteService } from '../services/note.service.js';

export class NoteApp extends React.Component {

    state = {
        notesToShow: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes();
    }


    loadNotes = () => {
        // noteService.query(this.state.filterBy).then((notesToShow) => {
        //     this.setState({ notesToShow })
        // })
        const  notesToShow = noteService.query()
        console.log('notesToShow',notesToShow)
        this.setState({ notesToShow })
    }

    render() {
        const { notesToShow } = this.state

        if(!notesToShow) return <div>Loading Notes...</div>
        return (
            <form className="notes-app">
                <h1>Notes-App</h1>
            </form>
        )
    }
}