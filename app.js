const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();


app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {

      const response = await axios.get('https://randomuser.me/api/', {
        params: {
          results: 45  
        }
      });
  
      const users = response.data.results;
      res.render('index', { users: users });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error fetching data');
    }
  });

app.get('/env-page', (req, res) => {
  const items = [
    { name: 'PORT', value: `${process.env.PORT}` },
    { name: 'DB_HOST', value: `${process.env.DB_HOST}` },
    { name: 'DB_USER', value: `${process.env.DB_USER}` },
    { name: 'DB_PASS', value: `${process.env.DB_PASS}` },
    { name: 'SECRET_KEY', value: `${process.env.SECRET_KEY}` }
];

  res.render('env_page', { items });
});

  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
