const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Middleware 
app.use(bodyParser.json());
const database = {
    users : [
    {
        id: '123',
        name: 'John',
        email: 'john@example.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'Sally',
        email: 'Sally@example.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    }
]
}


app.get('/', (req, res) => {
    res.send(database.users);
})
// Making signin post request to database
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success')
    } else {
        res.status(400).json('error logging in')
    }
})

// Making register post request to database
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

// Making a get request using user id
app.get('/profile/:id', (req, res)=> {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})


/*
--> res = this is working
/signin --> Post = Process / fail
/register --> Post = user
/profile/userId --> GET = user
/image --> Put = user
*/