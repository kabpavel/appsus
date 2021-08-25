

export class NoteImg extends React.Component {

    render() {
        console.log('this.props',this.props)

        const { note } = this.props
        if(!note) return <div>Loading...</div>

        return (
            <div className="note-container">
                <div className="note-preview-container">
                    <h2>NoteImg</h2>
                    <h2>{note.info.title}</h2>
                    <img src={note.info.url} alt="" />
                </div>
            </div>
        )
    }
}
