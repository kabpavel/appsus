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

    console.log('updateTodo(noteId, todoId, doneAt)', noteId, todoId, doneAt)

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
    return [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Some Title 1"
        },
        style: {
            backgroundColor: "#D7ACFF"
        }
    }, {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://live.staticflickr.com/66/221816951_e51f4162c1_c.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#FFF473"
        }
    }, {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{
                id: "t101",
                txt: "Driving liscence",
                doneAt: null
            }, {
                id: "t102",
                txt: "Coding power",
                doneAt: 187111111
            }
            ]
        },
        style: {
            backgroundColor: "#CBF0F8"
        }
    }, {
        id: "n104",
        type: "note-video",
        info: {
            url: "https://www.youtube.com/embed/WNeLUngb-Xg",
            title: "Linkin Park - In The End (Mellen Gi & Tommee Profitt Remix)"
        },
        style: {
            backgroundColor: "#F28C81"
        }
    },
    {
        id: "n105",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Some Title 1"
        },
        style: {
            backgroundColor: "#D7ACFF"
        }
    }, {
        id: "n106",
        type: "note-img",
        info: {
            url: "https://live.staticflickr.com/66/221816951_e51f4162c1_c.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#FFF473"
        }
    }, {
        id: "n107",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{
                id: "t103",
                txt: "Driving liscence",
                doneAt: null
            }, {
                id: "t104",
                txt: "Coding power",
                doneAt: 187111111
            }
            ]
        },
        style: {
            backgroundColor: "#CBF0F8"
        }
    }, {
        id: "n108",
        type: "note-video",
        info: {
            url: "https://www.youtube.com/embed/WNeLUngb-Xg",
            title: "Linkin Park - In The End (Mellen Gi & Tommee Profitt Remix)"
        },
        style: {
            backgroundColor: "#F28C81"
        }
    }
    ];
}
