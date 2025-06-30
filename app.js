const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/health', (req, res) => res.send('ok'));
app.get('/version', (req, res) => res.send('1'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));