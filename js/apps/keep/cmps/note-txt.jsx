


export class NoteTxt extends React.Component {

    render() {
        const { note } = this.props
        
        if (!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container" style={note.style}>
                    <h2>NoteTxt</h2>
                    <h2>{note.info.title}</h2>
                    <p>{note.info.txt}</p>
                </div>
            </div>
        )
    }
}
