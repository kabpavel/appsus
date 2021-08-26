

export class NoteAudio extends React.Component {

    render() {
        const { note } = this.props
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>
                    <h2>Video</h2>
                    <h2>{note.info.title}</h2>
                    <audio controls>
                        <source src={note.info.url} />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        )
    }
}
