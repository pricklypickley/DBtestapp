const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env['MONGODB_USERNAME'];
const password = process.env['MONGODB_PASSWORD'];

const uri = `mongodb+srv://${username}:${password}@cluster0.8w0jxyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('SampleInsurance'); // Replace 'test' with your database name
    const collection = database.collection('Sample1'); // Replace 'example' with your collection name

    const data = await collection.find({}).toArray();
    res.send(`
      <html>
        <body>
          <h1>Data from MongoDB</h1>
          <ul>
            ${data.map(item => `<li>${JSON.stringify(item)}</li>`).join('')}
          </ul>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from MongoDB');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
