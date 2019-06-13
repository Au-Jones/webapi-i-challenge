// implement your API here
// require('dotenv').config(); 
// const server = require['apply./api/server.js'];
const express = require('express');
const server = express();
const db = require('./data/db');

server.get('/',(req,res) => {
    res.send('hello Angel');
})
server.use(express.json());
server.post('/api/users', (req,res) => {
    const apiInfo = req.body;
    if(!apiInfo.name || !apiInfo.bio) {
        res.status(400).json({message: 'provide Name and Bio'})
    }else{
        db.insert(apiInfo)
        .then(user => res.status(203).json(user))
        .catch(error => res.status(500).json ({error: 'could not save the user'}))
    }
})

server.get('/api/users/', (req,res) =>{
    db.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error:"could not retrieve the user"}))
})

server .get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    db.findById(id)
    .then(users => res.status(200).json(users))
    .catch(error => res.status(405).json({message: 'user does not exist'}))
})

server.delete('/api.users/:id', (req,res) =>{
    const id = req.params.id;
    db.remove(id)
    .then(users => {
        if(users) {
            res.status(200).end()
        }else{
            res.status(405).json({message: 'user does not exist'})
        }
    })
    .catch(error => res.status(500).json({error: 'user could not be removed'}))
})

server.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;
    bd.findById(id)
    .then(user => {
        if(user){
            if(!changes.name || !changes.bio) {
                db.update(id,changes)
                .then(update => res.status(200).json(updated))
                .catch(error => res.status(500).json ({ error: 'user cant be changed'}))
            }
            else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The user information could not be modified." }))

        })

const port = process.env.PORT || 8000;
       

server.listen(port, () => console.log(`my first express server is running on port ${port}`));

   

    
