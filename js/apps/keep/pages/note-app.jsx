import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx';

export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        // noteService.query(this.state.filterBy).then((notesToShow) => {
        //     this.setState({ notesToShow })
        // })
        const  notes = noteService.query()
        this.setState({ notes })
    }

    render() {
        const { notes } = this.state
        if(!notes) return <div>Loading Notes...</div>

        return (
            <form className="notes-app">
                <h1>Notes-App</h1>
                <NoteList notes={notes} />
            </form>
        )
    }
}