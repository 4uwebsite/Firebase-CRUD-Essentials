// PURPOSE:
// This module packages the essential functions required to run CRUD ops on a RealTime Firebase DB.

// Import Firebase functions.
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {getDatabase, ref, push, onValue, remove, get, update, set} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// Configure DB connectivity
const appSettings = {
    databaseURL: 'https://crud-basics-e2bb0-default-rtdb.asia-southeast1.firebasedatabase.app/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const personsInDB = ref(database, 'persons')

// data object
const person = {
    name: 'Eddard',
    age: 73,
    gender: 'male',
    grade: 3200
}

// push (disable when testing other function)
// push(personsInDB, person)

// onValue
onValue(personsInDB, function(snapshot) {
    // Check if snapshot exists
    if (snapshot.exists()) {
        console.log('snapshot object as values:')
        const values = Object.values(snapshot.val()) // Object values without keys.
        // console.log(values)
        console.table(values)
        console.log('snapshot object as entries:')
        const entries = Object.entries(snapshot.val()) // Object with keys.
        // console.log(entries)
        console.table(entries)
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
            // console.log(personWithKey)
            console.table(personWithKey)
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
    age: 17,
    gender: `MALE`,
    grade: 300,
    name: `Arngelo`
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

// set
// used to write or replace data at a specified database reference. When you call set, it overwrites any existing data at that location with the new data you provide.
// IMPORTANT:
// If you have a nested structure and call set on a parent node, all the child nodes will be overwritten unless you explicitly include them in the new data.
// Alternative:
// If you want to update only specific fields without overwriting others, you can use the update function instead of set.