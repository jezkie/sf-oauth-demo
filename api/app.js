const port = 3000;

const express = require('express');
const cors = require('cors'); 

const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')

const CLIENT_ID = 'client-id';
const CLIENT_SECRET = 'client-secret';

const oauthUrl = 'https://login.salesforce.com/services/oauth2';
const TARGET_ORG_ENDPOINT = 'https://mindful-narwhal-6i6s53-dev-ed.my.salesforce.com'
const API_VERSION = 62;

const jsonParser = bodyParser.json();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function createInMemoryStore() {
  const dataStore = {}; // This is the private data store

  return {
    setItem: (key, value) => {
      dataStore[key] = value;
    },
    getItem: (key) => {
      return dataStore[key];
    },
    deleteItem: (key) => {
      delete dataStore[key];
    },
    getAllItems: () => {
      return { ...dataStore }; // Return a copy to prevent direct modification
    },
  };
}

const storage = createInMemoryStore(); 

app.get('/oauth2/userpwd', async (req, res) => {
    const tokentUrl = 'https://login.salesforce.com/services/oauth2/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('username', 'USERNAME');
    params.append('password', 'PASSWORD');
    try {
        const response = await axios.post(tokentUrl, params);
        res.send({"access_token": response.data.access_token});
    } catch (error) {
        console.log('Authentication errors', error);
    }
})

app.get('/oauth2/user-agent', async (req, res) => {
    const tokentUrl = `${oauthUrl}/authorize`;
    const params = new URLSearchParams();
    params.append('response_type', 'token');
    params.append('client_id', CLIENT_ID);
    params.append('redirect_uri', 'https://localhost:3006/token');

    try {
        const response = await axios.post(tokentUrl, params);
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(response.data));

    } catch (error) {
        console.log('Authentication errors', error);
    }
});

app.post('/oauth2/access_token', jsonParser, async (req, res) => {
    const { access_token } = req.body;
    storage.setItem('access_token', decodeURIComponent(access_token));
    res.set('Content-Type', 'application/json');
    res.send({ message: 'Access token stored successfully!' });
})

app.get('/contacts', async (req, res) => {
  const queryP = {
      q: `SELECT Name, FirstName, LastName, Email, MailingAddress, Title FROM Contact WHERE Title != null ORDER BY Name ASC LIMIT 10`,
    };

    const result = await axios.get(`${TARGET_ORG_ENDPOINT}/services/data/v${API_VERSION}.0/query`, {
      params: queryP,
      headers: { Authorization: `Bearer ${storage.getItem('access_token')}` }
    });

    res.set('Content-Type', 'application/json');
    res.send(result.data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
