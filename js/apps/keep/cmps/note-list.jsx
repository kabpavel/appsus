
import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote }) {
  return (
    <div className="note-list">
      {notes.map(note => <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} />)}
    </div>
  )
}
