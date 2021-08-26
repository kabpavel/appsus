import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    saveEmail,
    deleteEmail,
    getCarById,
    getNextemailId
}

const KEY = 'emails';
const gEmail = [{
        id: 1,
        name:'itay',
        emailAddress: 'itay@gmail.com',
        title: 'normally i stay up late',
        content: `Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer.
         Text messages may be sent over a cellular network, or may also be sent via an Internet connection.`
    },
    {
        id: 2,
        name:'itay',
        emailAddress: 'itay@walla.com',
        title: 'normally i stay up late',
        content: 'but then .........KEY.anchor.'
    }
];

// _createEmails();

function query(filterBy) {
    if (filterBy) {
    }
    console.log('gEmail',gEmail);
    return Promise.resolve(gEmail)
}

function deleteEmail(emailId) {
    var emailIdx = gEmail.findIndex(function (email) {
        return emailId === email.id
    })
    gEmail.splice(emailIdx, 1)
    _saveEmailToStorage();
    return Promise.resolve()
}

function saveEmail(emailToEdit) {
    return emailToEdit.id ? _updateCar(emailToEdit) : _addEmail(emailToEdit)
}


function _addEmail(emailToEdit) {
    var email = _createCar(emailToEdit.vendor, emailToEdit.speed)
    gEmail.unshift(email)
    _saveEmailToStorage();
    return Promise.resolve()
}

function _updateCar(emailToEdit) {
    var emailIdx = gEmail.findIndex(function (email) {
        return email.id === emailToEdit.id;
    })
    gEmail[emailIdx] = emailToEdit
    _saveEmailToStorage();
    return Promise.resolve()
}


function getCarById(emailId) {
    var email = gEmail.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}


function getNextemailId(emailId) {
    const emailIdx = gEmail.findIndex(email => email.id === emailId)
    let nextemailIdx = emailIdx + 1
    if (nextemailIdx === gEmail.length) nextemailIdx = 0
    return gEmail[nextemailIdx].id
}

function _createEmail(vendor, speed) {
    if (!speed) speed = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        vendor,
        speed,
        desc: utilService.makeLorem(),
        ctg: ''
    }
}

function _createEmails() {
    var cars = storageService.loadFromStorage(KEY)
    gEmail = cars;
    _saveEmailToStorage();
}

function _saveEmailToStorage() {
    storageService.saveToStorage(KEY, gEmail)
}
