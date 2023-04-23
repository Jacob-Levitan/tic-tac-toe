const express = require('express');
const app = express();

console.log('TEST LOG');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
