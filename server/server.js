const express = require('express');
const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');

const app = express();
app.set('view-engine', 'ejs');
app.use(express.json());
app.use('/login', loginRouter);
app.use('/register', registerRouter);

console.log('TEST LOG');

app.get('/', (req, res) => {
    res.render('server.ejs', { name: "Zach" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
