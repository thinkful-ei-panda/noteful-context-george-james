import React from 'react'
import Note from '../Note/Note'
///////////////////////////////////////////////////////////////
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
///////////////////////////////////////////////////////////////
import './NotePageMain.css'


/*************************************************************************************
 * swap some function components for class components so that you can read context 
 * (or use Context.Consumer components with render props).
*************************************************************************************/
// export default function NotePageMain(props) {
//   return (
//     <section className='NotePageMain'>
//       <Note
//         id={props.note.id}
//         name={props.note.name}
//         modified={props.note.modified}
//       />
//       <div className='NotePageMain__content'>
//         {props.note.content.split(/\n \r|\n/).map((para, i) =>
//           <p key={i}>{para}</p>
//         )}
//       </div>
//     </section>
//   )
// }

// NotePageMain.defaultProps = {
//   note: {
//     content: '',
//   }
// }


export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}