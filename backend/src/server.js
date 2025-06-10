import express from "express";
import pool from './db.js';
import admin from 'firebase-admin'
import fs from 'fs'

const credentials = JSON.parse(fs.readFileSync('./key.json'));

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const app = express()

app.use(express.json())

app.get('/api/articles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
})

app.get('/api/articles/:name', async (req, res) => {
  const {name} = req.params
    try {
        const result = await pool.query('SELECT * FROM blogs WHERE title = $1',[name]);
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
})

app.use(async function (req, res, next) {
  const {authtoken} = req.headers;

  if (authtoken){
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
  } else {
    res.sendStatus(400);
  }
  next();
})

app.post('/api/articles/:name/upvote', async function(req, res) {
    const { name } = req.params;
    const {uid} = req.user

    const article = await db.collection('articles').findOne({name});
    const upvoteIds = article.upvoteIds || []
    const updatedArticle = await 
    try {
      const update = await pool.query(
       'UPDATE blogs SET upvotes = upvotes + 1 WHERE title = $1',
      [name]
      );
      const output = await pool.query('select * from blogs where title = $1', [name])
      res.json(output.rows[0].upvotes); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params; 
    const { postedBy} = req.body;

    const newCommentObject = {
        postedBy: postedBy.nameText,
        text: postedBy.commentText
    };
    
    try {
        const result = await pool.query(`UPDATE blogs SET comments = array_append(COALESCE(comments, ARRAY[]::jsonb[]), $1::jsonb) WHERE title = $2 RETURNING *;`, [newCommentObject, name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found or no update was performed.' });
        }
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment due to a server error.' });
    }
});

app.listen(8000, function() {
    console.log('Server is listening on PORT 8000'); 
});