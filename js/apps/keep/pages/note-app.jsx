import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx';
import { NoteAdd } from '../cmps/note-add.jsx';
import { NoteFilter } from '../cmps/note-filter.jsx';

export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy).then((notes) => {
            this.setState({ notes })
        })
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes);
    };


    handleLoadNotes = () => {
        this.loadNotes();
    }

    onDeleteNote = (id) => {
        noteService.deleteNote(id).then(
            () => { this.loadNotes() }
        )
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading Notes...</div>
        //console.log('notes',notes)
        return (
            <form className="notes-app">
                <NoteAdd handleLoadNotes={this.handleLoadNotes} />
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteList notes={notes} onDeleteNote={this.onDeleteNote} />
            </form>
        )
    }
}