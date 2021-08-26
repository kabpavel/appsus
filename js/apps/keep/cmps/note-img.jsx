

export class NoteImg extends React.Component {

    render() {

        const { note } = this.props
        if(!note) return <div>Loading...</div>

        return (
            <div className="note-container" >
                <div className="note-preview-container" style={note.style}>
                    <h2>Image</h2>
                    <h2 className="info-title">{note.info.title}</h2>
                    <img src={note.info.url} alt="" />
                </div>
            </div>
        )
    }
}
