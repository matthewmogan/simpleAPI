const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(express.json());

app.listen(PORT,() => console.log(`Simple server running on ${PORT}`))

app.get("/api/quotes",(req,res,next) => {
    const person = req.query.person
    if (person){
        const filteredQuotes = quotes.filter((element) => element.person === person)
        const response = {"quotes": filteredQuotes}
        res.status(200).send(response)
    } else {
        const response = {"quotes": quotes}
        res.status(200).send(response)
    }
})

app.post("/api/quotes",(req,res,next) => {
    const {quote, person} = req.body
    if(quote && person) {
        const newObject = {
            "quote": quote,
            "person": person
        }
        quotes.push(newObject)
        res.status(201).send({message:"Quote added successfully"})
    } else {
        res.status(400).send({error: "Missing quote or person"})
    }
})

app.get("/api/quotes/random",(req,res,next) => {
    res.status(200).send({"quote": getRandomElement(quotes)})
})
