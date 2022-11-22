const cookieParser = require('cookie-parser');

const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hallo das ist die erste Nachicht');
});

app.listen(port, () => {
  console.log(`server läuft auf http://localhost:${port} !!!`);
});
