import { ImageHover } from "./image-hover.jsx"
import { noteService } from '../services/note.service.js';
const { withRouter } = ReactRouterDOM

export class _ColorPicker extends React.Component {


  onChange = (ev) => {
    const backgroundColor = ev.target.value;
    const { note } = this.props

    noteService.updateNoteStyle(note.id, { ...note.style, backgroundColor })
      .then(() => {
        //todo message
        this.props.history.push('/note-app')
      })
  }

  render() {
    const { style } = this.props.note
    //debugger
    return (
      <input type="color" class="note-color-style" value={style.backgroundColor} onChange={this.onChange} ></input>
    )
  }
}

export const ColorPicker = withRouter(_ColorPicker)