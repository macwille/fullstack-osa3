
const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: "Person1"
    },
    {
        id: 2,
        name: "Person2"
    },
    {
        id: 3,
        name: "Person3"
    },
    {
        id: 4,
        name: "Person4"
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})



app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    const count = persons.length
    const date = new Date()
    const now = date.getDate()
    console.log(`Count: ${count}, date: ${date}`)

    res.send(`<p>Persons: ${count}</p> <br> <p>Date: ${now}</p>`)

})

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
