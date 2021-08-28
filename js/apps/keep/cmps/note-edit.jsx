export class NoteEdit extends React.Component {

    state = {
        title: '',
        
    };

    componentDidMount() {
        const { note } = this.props.note
        setState({ note })
    }

    




    // "id": "n103",
    // "type": "note-todos",
    // "info": {
    // 	"label": "Get my stuff together",
    // 	"todos": [{
    // 			"txt": "Driving liscence",
    // 			"doneAt": null
    // 		}, {
    // 			"txt": "Coding power",
    // 			"doneAt": 187111111
    // 		}
    // 	]
    // },
    // "style": {
    // 	"backgroundColor": "#CBF0F8"
    // }


    render() {

        const { note } = this.state

        if (!note) return <div>Loading!!!</div>

        return (
            <div className="edit-note-container">
                <form className="edit-note" onSubmit={this.onSaveChages}>
                    <h2>Title: {note.title}</h2>
                    <input className="note-title" type="text" name="note-title" id="note-title" value={reader} onChange={this.handleChange} />
                    <h2>Title: {note.title}</h2>
                    <input className="note-title" type="text" name="note-title" id="note-title" value={reader} onChange={this.handleChange} />


                    <label htmlFor="freeText">Free Text:</label>
                    <textarea className="review-freetext" id="freeText" name="freeText" rows="4" cols="50" value={freeText} onChange={this.handleChange} />
                    <button>Save Review</button>
                </form>

            </div>

        );
    }

}