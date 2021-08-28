import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    addNote,
    deleteNote,
    getNoteById,
    updateNote,
    isNoteExist,
    updateNoteTitle,
    updateNoteText,
    updateTodo,
    updateNoteStyle
}

const KEY = 'notes';
var gNotes;

_createNotes();

function query(filterBy) {
    //return gNotes// temp
    //debugger
    if (filterBy) {
        // let { type, minPrice, maxPrice } = filterBy
        // maxPrice = maxPrice ? maxPrice : Infinity
        // minPrice = minPrice ? minPrice : 0
        // const notesToShow = gNotes.filter(
        //     note => note.title.includes(title)
        //         && note.listPrice.amount >= minPrice
        //         && note.listPrice.amount <= maxPrice)

        let { type } = filterBy
        const notes = gNotes.filter(
            note => note.type.includes(type))

        return Promise.resolve(notes)
    }

    return Promise.resolve(gNotes)
}


function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex((note) => noteId === note.id)
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage();
    return Promise.resolve()
}

function isNoteExist(noteId) {
    var note = gNotes.find(note => noteId === note.id)
    if (!note) return false
    return true
}

function addNote(type, isPinned, info, style) {
    const note = _createNote(type, isPinned, info, style)
    gNotes.unshift(note)
    _saveNotesToStorage();
    return Promise.resolve()
}

function getNoteById(noteId) {
    var note = gNotes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function updateNote(noteId, newNote) {
    var note = gNotes.find(function (note) {
        return note.id === noteId;
    })
    note = newNote;
    _saveNotesToStorage();
    return Promise.resolve()
}

function _createNote(type, isPinned, info, style) {
    return {
        id: utilService.makeId(6),
        type,
        isPinned: false,
        info,
        style: { backgroundColor: utilService.increaseBrightness(utilService.getRandomColor(), 50) }
    }
}

function _createNotes() {
    var notes = storageService.loadFromStorage(KEY)
    if (!notes || !notes.length) {
        notes = getTempNotes()
    }
    gNotes = notes;
    _saveNotesToStorage();
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}


function updateNoteTitle(noteId, title, isTodos) {
    //debugger
    const idx = gNotes.findIndex(note => noteId === note.id)
    if (!isTodos) gNotes[idx].info.title = title
    else gNotes[idx].info.label = title
    _saveNotesToStorage();
    return Promise.resolve()
}

function updateNoteText(noteId, text) {
    //debugger
    const idx = gNotes.findIndex(note => noteId === note.id)
    gNotes[idx].info.txt = text
    _saveNotesToStorage();
    return Promise.resolve()
}

function updateTodo(noteId, todoId, doneAt) {
    //debugger

    //console.log('updateTodo(noteId, todoId, doneAt)', noteId, todoId, doneAt)

    const noteIdx = gNotes.findIndex(note => noteId === note.id)

    const todoIdx = gNotes[noteIdx].info.todos.findIndex(todo => todoId === todo.id)
    gNotes[noteIdx].info.todos[todoIdx].doneAt = (!doneAt) ? null : doneAt

    _saveNotesToStorage();
    return Promise.resolve()
}

function updateNoteStyle(noteId, style) {
    //debugger
    const noteIdx = gNotes.findIndex(note => noteId === note.id)
    gNotes[noteIdx].style = style

    _saveNotesToStorage();
    return Promise.resolve()
}


function getTempNotes() {
    return [{"id":"SUyHxL","type":"note-img","isPinned":false,"info":{"title":"Ocean view","url":"https://wallpaperaccess.com/full/2718871.jpg"},"style":{"backgroundColor":"#ff94a4"}},{"id":"qiHUvG","type":"note-img","isPinned":false,"info":{"title":"Me, Myself and Paris 2","url":"https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg"},"style":{"backgroundColor":"#a584c4"}},{"id":"VsXRKD","type":"note-img","isPinned":false,"info":{"title":"Moreux crater on Mars (perspective view)","url":"https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/03/moreux_crater_on_mars_perspective_view/21867926-1-eng-GB/Moreux_crater_on_Mars_perspective_view_pillars.jpg"},"style":{"backgroundColor":"#d24659"}},{"id":"jKFNWI","type":"note-video","isPinned":false,"info":{"title":"President Biden meets with Israeli Prime Minister Naftali Bennett","url":"https://www.youtube.com/embed/seQx_5MckGI"},"style":{"backgroundColor":"#e5f7ff"}},{"id":"CQwDiq","type":"note-video","isPinned":false,"info":{"title":"Deep Feelings Mix | Deep House, Vocal House, Nu Disco, Chillout","url":"https://www.youtube.com/embed/B5mimngffGQ"},"style":{"backgroundColor":"#85baff"}},{"id":"u6nOGr","type":"note-video","isPinned":false,"info":{"title":"Elon Musk Monologue - SNL","url":"https://www.youtube.com/embed/fCF8I_X1qKI"},"style":{"backgroundColor":"#c7e9ff"}},{"id":"QTnX7n","type":"note-txt","isPinned":false,"info":{"title":"article - ","txt":"Definition of article (Entry 1 of 2) 1a: a distinct often numbered section of a writing an article of the constitution b: a separate clause c: a stipulation in a document (such as a contract or a creed) articles of indenture \nd: a nonfictional prose composition usually forming an independent part of a publication (such as a magazine) wrote an article for the newspaper"},"style":{"backgroundColor":"#ff7575"}},{"id":"PsyQD8","type":"note-todos","isPinned":false,"info":{"label":"My to-do list","todos":[{"id":"xWTJRm","txt":"Develop a new feature for the wep application","doneAt":1630191337310},{"id":"45QLrw","txt":"  Buy a helmet for cycling","doneAt":null},{"id":"C7gdUf","txt":" Have lunch with Maria on Wednesday","doneAt":null},{"id":"AIsHWe","txt":" Analyze the survey results","doneAt":null},{"id":"weMQ7R","txt":" Deliver the company accounts on day 30","doneAt":null},{"id":"nRfxpF","txt":" DPublish an article","doneAt":null},{"id":"cUWyh4","txt":" on Monday","doneAt":null},{"id":"Jhsnv9","txt":" I would like to visit New Zealand","doneAt":null},{"id":"kVUQs3","txt":" Learn to use Sketch","doneAt":null}]},"style":{"backgroundColor":"#7adeff"}},{"id":"1FNgG8","type":"note-img","isPinned":false,"info":{"title":"Mystic candle","url":"https://media3.giphy.com/media/fi9iBFsZXieAg/giphy.gif"},"style":{"backgroundColor":"#9789fa"}},{"id":"85hTWO","type":"note-img","isPinned":false,"info":{"title":"Milano - There are only few remains of the ancient Roman colony, notably the well-preserved Colonne di San Lorenzo. During the second half of the 4th century, Saint Ambrose, as bishop of Milan, had a strong influence on the layout of the city.","url":"https://www.intergeo.com/wp-content/uploads/2015/05/milano-1-768x513.jpg"},"style":{"backgroundColor":"#ffcd94"}},{"id":"R10aGX","type":"note-img","isPinned":false,"info":{"title":"Me, Myself and Paris","url":"https://i.pinimg.com/originals/9c/56/e3/9c56e3d78baf9641b3c18c2934c5ea03.jpg"},"style":{"backgroundColor":"#ff80ca"}},{"id":"ZsGUT0","type":"note-todos","isPinned":false,"info":{"label":"TASK LIST","todos":[{"id":"HRWbyM","txt":"Study Modern History notes","doneAt":null},{"id":"9n9QPf","txt":"• Maths homework - due Thursday English homework - due Friday","doneAt":null},{"id":"qGlAmi","txt":" • Visual Arts assignment - due next Monday","doneAt":null},{"id":"6XOqme","txt":" • Mow the lawns","doneAt":1630190546057},{"id":"4cI0Bv","txt":" • Practice Public Speaking speech - due Friday","doneAt":null}]},"style":{"backgroundColor":"#7dd8c6"}},{"id":"n104","type":"note-video","info":{"url":"https://www.youtube.com/embed/WNeLUngb-Xg","title":"Linkin Park - In The End. • • • • I tried so hard And got so far But in the end It doesn't even matter I had to fall To lose it all But in the end It doesn't even matter • • •"},"style":{"backgroundColor":"#b4db57"}}];
}
