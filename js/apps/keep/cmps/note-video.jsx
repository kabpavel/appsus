

export class NoteVideo extends React.Component {

    render() {

        console.log('this.props', this.props)
        const { note } = this.props
        if (!note) return <div>Loading...</div>
        
        return (
            <div className="note-container">
                <div className="note-preview-container">
                    <h2>NoteVideo</h2>
                    <h2>{note.info.title}</h2>
                    <iframe width="300" height="200" src={info.url}></iframe>|
                    <img src={note.info.url} alt="" />
                </div>
            </div>
        )
    }
}
