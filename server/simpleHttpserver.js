const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    let n = req.query.n;
    let name = req.query.name;
    res.send(`hi hello, you have passed a query I see! is this it "${n}" and you name is ${name}`);
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})