const express = require('express');
const initContracts = require('./app/Services/InitContracts');
// const userRoutes = require('./routes/users');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// userRoutes(app);
routes(app);

initContracts();

app.get('/', async (req, res) => {
    res.send(`Hello:`);
});

app.listen(PORT);