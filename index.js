const axios = require('axios');
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3300;
const os = require("os")

server.use(express.static('public'));
process.title = "test-app";

server.get('/', (req, res) => {
  console.log('received a request');
  var body = {
    'status': 'OK',
    'request': {
      'headers': req.headers
    }
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body, null, 4));
});

//server.get('/', (_req, res) => {
//  res.send('Hello Hackathon 2021!');
//});


server.get('/fetch-wordpress-graphql', async (_req, res) => {
  const query = `
    query QueryPosts {
      posts {
        nodes 
          id
          content
          title
          slug
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await axios.post(process.env.GRAPHQL_API_URL, { query });
  res.send(response.data.data.posts.nodes)
});

server.get('/envs', (req, res) => {
  console.log(process.env);
  res.send('Envs displayed in logs!');
})

server.listen(PORT, () => {
  console.log(`Application is listening at port ${PORT} and should be broken`);
});

console.log(`Hello logs I am sending 500s`);

const cpuData = os.cpus()
const numOfCpus = os.cpus().length
console.log(numOfCpus)
console.log(cpuData)
