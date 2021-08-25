
import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
  return (
    <div className="note-list">
      {notes.map(note => console.log('NoteList note', note))}
      {notes.map(note => <NotePreview key={note.id} inputNote={note} />)}
      {notes.map(note => console.log('NoteList note', note))}
    </div>
  )
}
