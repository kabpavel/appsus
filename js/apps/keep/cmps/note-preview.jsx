import { NoteImg } from './note-img.jsx';
import { NoteTodos } from './note-todos.jsx';
import { NoteTxt } from './note-txt.jsx';
import { NoteVideo } from './note-video.jsx';

export class NotePreview extends React.Component {

    DynamicCmp = (props) => {
        const { note }  = props

        switch (note.type) {
            case 'note-txt':
                return <NoteImg {...props} />
            case 'note-todos':
                return <NoteTodos {...props} />
            case 'note-txt':
                return <NoteTxt {...props} />
            case 'note-video':
                return <NoteVideo {...note} />
            default:
                return <div>Error loading note..</div>
        }
    }

    render() {
        const { DynamicCmp, props } = this
        
        return (
            <DynamicCmp {...props} />
        )
    }
}