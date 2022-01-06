const axios = require('axios');
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3300;

server.use(express.static('public'));
process.title = "test-app";

server.get('/', (_req, res) => {
  setTimeout(() => {  res.send("Hello  world") }, 18000);
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
