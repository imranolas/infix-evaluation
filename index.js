import express from 'express';
import {parseAndEvaluate} from './src/index';

const app = express();

app.get('/calculus', (req, res) => {
  const query = new Buffer(req.query.query, 'base64').toString('utf8');
  try {
    const result = parseAndEvaluate(query);
    const response = {
      error: false,
      result
    };
    res.send(response);
  } catch (e) {
    res.status(400).send({
      error: true,
      result: e.message
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
