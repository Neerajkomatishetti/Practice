const express = require('express');
const app = express();
const fs = require('fs').promises; // <- use promises-based fs
const port = 3000;

app.use(express.json());

async function getUsers() {
    try {
        const data = await fs.readFile('Users.json', 'utf-8');
        const Users = JSON.parse(data);
        return Users;
    } catch (err) {
        console.error("Error reading file:", err);
        return [{ usersDetails: [] }];
    }
}

async function saveUsers(Users) {
    try {
        await fs.writeFile('Users.json', JSON.stringify(Users, null, 2));
    } catch (err) {
        console.error("Error writing file:", err);
    }
}

app.get('/Home', (req, res) => {
    res.send(`You are at home (under construction!)`);
});

app.get('/Users', async (req, res) => {
    let Users = await getUsers();
    res.json(Users[0]); // or return full array if needed
});

app.post('/Users', async (req, res) => {
    const data = req.body;
    let Users = await getUsers();

    if (!Array.isArray(data)) {
        return res.status(400).send("Expected an array of users");
    }

    const newUsers = [];
    const duplicates = [];

    data.forEach(element => {
        let isDuplicate = Users[0].usersDetails.some(user => user.UserName === element.user);
        if (!isDuplicate) {
            Users[0].usersDetails.push({
                UserName: element.user,
                UserAge: element.age
            });
            newUsers.push(element.user);
        } else {
            duplicates.push(element.user);
        }
    });

    await saveUsers(Users);

    res.send({
        added: newUsers,
        duplicates: duplicates,
        message: `${newUsers.length} new users added, ${duplicates.length} duplicates ignored.`
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
