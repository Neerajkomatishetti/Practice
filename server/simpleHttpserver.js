const express = require('express');
const app = express();

const port = 3000;

let Users = [{
    usersDetails:[]
}];

app.use(express.json());

app.get('/Home', (req, res) => {
    res.send(`Your are at home (under construction!)`);
})

app.get('/next', (req, res) => {
    res.send(`Nothng here yet!`);
})

app.get('/Users', (req, res) => {
    res.json(Users[0]);
})

app.post('/Users', (req, res) => {
    // let User  = req.body.user;
    // let age = req.body.age;
    let data = req.body;

    data.forEach(element => {
        let User  = element.user;
        let age = element.age;
        let isDuplicate = Users[0].usersDetails.some(user => user.UserName == element.user)
        if (!isDuplicate){
            Users[0].usersDetails.push({
            "UserName": User,
            "UserAge": age
    })}
        
    });
    

    res.send("Added new Users");
})



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})