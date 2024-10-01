// Import Firebase functions.
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {getDatabase, ref, push, onValue, remove, get, update} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// Configure DB connectivity
const appSettings = {
    databaseURL: 'https://crud-basics-e2bb0-default-rtdb.asia-southeast1.firebasedatabase.app/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const personsInDB = ref(database, 'persons')

// data object
const person = {
    name: 'Rob',
    age: 23,
    gender: 'male',
    grade: 1200
}

// push (disable when testing other function)
// push(personsInDB, person)

// onValue
onValue(personsInDB, function(snapshot) {
    // Check if snapshot exists
    if (snapshot.exists()) {
        console.log('snapshot object as values:')
        const values = Object.values(snapshot.val())
        console.log(values)
        console.log('snapshot object as entries:')
        const entries = Object.entries(snapshot.val())
        console.log(entries)
    }
    else {
        console.log('snapshot empty')
    }
})

// remove
const key = '-O86hircwGWlPDrSjRzE'
const personsInDBKey = ref(database, `persons/${key}`)
remove(personsInDBKey)
    .then(() => {
        console.log(`Person with ${key} key was removed.`)
    })
    .catch((error) => {
        console.log('Error removing person:', error)
    })

// get
const getKey = "-O86jBBwkzfj8L9RaWDM"
const personsInDBGetKey = ref(database, `persons/${getKey}`)
get(personsInDBGetKey)
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(`Person with key ${getKey}:`)
            const personWithKey = Object.values(snapshot.val())
            console.log(personWithKey)
        }
        else {
            console.log(`Person with key ${getKey}: Not Found`)
        }
    })
    .catch((error) => {
        console.log(`Error:`, error)
    })

// update
const personUpdated = {
    age: 99,
    gender: `unknown`,
    grade: `n/a`,
    name: `Braaga`
}
const updateKey = "-O86fsOCMDl0ZqsO4EP4"
const personsInDBUpdateKey = ref(database, `persons/${updateKey}`)
update(personsInDBUpdateKey, personUpdated)
    .then(() => {
        console.log('person uppdated')
    })
    .catch((error) => {
        console.log(`error:`, error)
    })
