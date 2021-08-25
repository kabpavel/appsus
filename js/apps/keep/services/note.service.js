import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    addNote,
    deleteNote,
    getNoteById,
    updateNote,
    isNoteExist
}

const KEY = 'notes';
var gNotes;

_createNotes();

function query() {
    return []//gNotes// temp
    if (filterBy) {
        // let { title, minPrice, maxPrice } = filterBy
        // maxPrice = maxPrice ? maxPrice : Infinity
        // minPrice = minPrice ? minPrice : 0
        // const notesToShow = gNotes.filter(
        //     note => note.title.includes(title)
        //         && note.listPrice.amount >= minPrice
        //         && note.listPrice.amount <= maxPrice)
        // return Promise.resolve(notesToShow)
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

function addNote(note) {
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

function _createNote(id, type, isPinned, info, style) {
    return {
        id: (id) || utilService.makeId(),
        type,
        isPinned,
        info,
        style
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

    function getTempNotes() {
        return  [{
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        }, {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        }, {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [{
                    txt: "Driving liscence",
                    doneAt: null
                }, {
                    txt: "Coding power",
                    doneAt: 187111111
                }
                ]
            }
        }
        ];
    }
