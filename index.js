
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


// Morgan token to show data of POST methods.
morgan.token('body', function (req, res) {
    const body = req.body
    return `with body ${JSON.stringify(body)}`
})
// Use of token
app.use(morgan(':body'))
app.use(morgan(':method :status :res[content-length] - :response-time ms :body'))


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}


// GET Home page
app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")

})

// GET Info page
app.get("/info", (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        const count = persons.length
        res.send(`<h2>Database has ${count} person(s) information.</h2>
        <p>As of ${date}.</p>`)

    })
})



// GET Persons as JSON.
app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()))
    })
})

// POST Add person
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.content === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            return savedPerson.toJSON()
        })
        .then(savedAndFormatedPerson => {
            res.json(savedAndFormatedPerson)
        })
        .catch(error => next(error))
})

// GET person with id.
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// DELETE person with id.
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})


// PUT new number
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    console.log(`Update number of id:${req.params.id}`)

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log('index.js error: ')
    console.error(error)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log(`Returned value: ${error.message}`)
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
