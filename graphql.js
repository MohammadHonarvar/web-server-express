import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(8080, _ => console.log('Running server on localhost:8080'));