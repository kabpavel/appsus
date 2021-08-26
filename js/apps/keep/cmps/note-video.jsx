

export class NoteVideo extends React.Component {

    render() {

        const { note } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>
                    <h2>Video</h2>
                    <h2 className="info-title">{note.info.title}</h2>
                    <iframe width="305" src={note.info.url}></iframe>
                </div>
            </div>
        )
    }
}
