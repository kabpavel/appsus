
import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote }) {
  return (
    <div className="note-list">
      
      {/* {notes.map(note => console.log('NoteList note', note))} */}
      {notes.map(note => <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} />)}
      {/* {notes.map(note => console.log('NoteList note', note))} */}
    </div>
  )
}
