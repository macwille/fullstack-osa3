
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


// Morgan token to show data of POST methods.
morgan.token('body', function (req, res) {
    const body = req.body
    return `Morgan - Body: ${JSON.stringify(body)}`
})
// Use of token
app.use(morgan(':body'))


let persons = [
    {
        id: 1,
        name: "Person1",
        number: 050555000
    },
    {
        id: 2,
        name: "Person2",
        number: 030555000
    },
    {
        id: 3,
        name: "Person3",
        number: 040555000
    },
    {
        id: 4,
        name: "Person4",
        number: 060555000
    }
]
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

// Home page.
app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

// Persons page.
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Info page.
app.get("/info", (req, res) => {
    const count = persons.length
    const date = new Date()

    res.send(`<p>Phonebook has info of: ${count} persons</p>
     <br> <p>${date}</p>`)

})

// Add new person.
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json(
            { error: 'Name missing' }
        )
    }

    const person = {
        id: generateId,
        name: body.name,
        number: Math.floor(Math.random() * 1000000000)
    }

    const same = (comp) => comp.name === person.name

    if (persons.some(same)) {
        console.log("Name is already in use")
        return res.status(400).json(
            { error: 'Name must be unique' }
        )
    }
    persons = persons.concat(person)

    res.json(person)

})

// Get person with id.
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(`Looking for person.id: ${id}`)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// Delete person with id.
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(`Deleting person with id:${id}`)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.use(morgan(':method :status :res[content-length] - :response-time ms :body'))
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
