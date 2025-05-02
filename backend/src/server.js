import express from "express";
import {MongoClient, ServerApiVersion} from 'mongodb';
import pool from './db.js';

const articleInfo = [
    {name: 'learn-node', upVotes:0, comments:[]},
    {name: 'learn-react', upVotes:0, comments:[]},
    {name: 'mongodb', upVotes:0, comments:[]},
]

const app = express()

app.use(express.json())

app.get('/api/articles/:name', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
})

app.post('/api/articles/:name/upvote', async function(req, res) {
    const { name } = req.params;

    try {
      const update = await pool.query(
       'UPDATE blogs SET upvotes = upvotes + 1 WHERE title = $1',
      [name]
      );
  
      const output = await pool.query('select * from blogs where title = $1', [name])
      
      res.json(output.rows[0]); // ✅ sends the updated blog as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params
    const {postedBy, text} = req.body
    const comment = {postedBy, text}
    const result = await pool.query("UPDATE blogs SET comments = COALESCE(comments, '{}') || $1::jsonb WHERE title = $2 RETURNING *;", [comment, name]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
    res.json(result.rows[0]);
})

app.listen(8000, function() {
    console.log('Server is listening on PORT 8000'); 
});