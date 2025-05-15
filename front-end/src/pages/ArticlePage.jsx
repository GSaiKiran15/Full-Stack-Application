import { useLoaderData, useParams} from 'react-router-dom'
import axios from 'axios';
import CommentsList from '../CommentsList';
import { useState } from 'react';
import AddCommentForm from '../AddCommentForm';

export default function ArticlePage() {
    const {name} = useParams()
    const {title, content, upvotes: initialUpVotes, comments: initialComments} = useLoaderData()
    const [upvotes, setUpVotes] = useState(initialUpVotes);
    const [comments, setComments] = useState(initialComments)

    async function onUpVoteClicked() {
        const response = await axios.post('/api/articles/' + name + '/upvote')
        const updateArticleData = response.data;
        setUpVotes(updateArticleData)
    }

    async function onAddComment(nameText, commentText){
        const response = await axios.post('/api/articles/' + name + '/comments', {
            postedBy: nameText,
            text: commentText,
        })
        const updateArticleData = response.data;
        setComments(updateArticleData.comments)
    }

    return (
        <>
        <h1>{title}</h1>
        <p>{content}</p>
        <p> This Article has {upvotes} upvotes! </p>
        <button onClick={onUpVoteClicked}>Up Vote</button>
        <AddCommentForm onAddComment={onAddComment}/>
        <CommentsList comments={initialComments}/>
        </>
    );
}

export async function loader({params}) {
      const response = await axios.get(`/api/articles/${encodeURIComponent((params.name))}`);
      const {title, content, upvotes, comments} = response.data[0]
      return {title, content, upvotes, comments};
}