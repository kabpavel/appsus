import { ImageHover } from "./image-hover.jsx"

export class NoteToTrash extends React.Component {

    onClick = () => {
        const { note, onDeleteNote } = this.props
        onDeleteNote(note.id)
    }

    render() {

        return (
            <ImageHover className="img-note-to-trash toTop"
                name="trash"
                onHoverSrc="../js/apps/keep/img/deleteOpen.png"
                onRegularSrc="../js/apps/keep/img/delete.png"
                onClick={this.onClick} />
        )
    }
}