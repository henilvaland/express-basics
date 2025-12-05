const express = require('express');
const app = express();
app.use(express.json()); // to accept any parameters for post request

let users = [
    {id: 1, name: "henil"},
    {id: 2, name: "shivam" }
]

app.get('/', (req, res) => {
    res.send("server is working fine!!!");
})

const checkLogin = (req, res, next) => {
    //http://localhost:3000/users?isLoggedin=true
    if(req.query.isLoggedin === 'true'){
        next();
    } else {
        res.status(401).json({message: "user is not logged in"});
    }
}

app.get('/users', checkLogin,(req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == parseInt(req.params.id));
    res.json(user);
})

// app.get('/users/:name', (req, res) => {
//     const user = users.find(u => u.name == req.params.name);
//     res.json(user);
// })

app.post('/users', (req, res) =>{
    const newUser = {
        id : users.length + 1,
        name : req.body.name
    }
    users.push(newUser);
    res.status(201).json(newUser);
})

app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    users[index] = {
        id: Number(req.params.id),
        name: req.body.name
    }
    res.json(users[index])
})

app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id == parseInt(req.params.id));
    user.name = req.body.name;
    res.json(user);
})

app.delete('/users/:id', (req, res) => {
    const isUserExists = users.some(u => u.id == parseInt(req.params.id));
    const user = users.filter(u => u.id != req.params.id);
    res.json({message: "user deleted successfully"});
})

app.listen(3000, () => {
    console.log('server is running!!');
})