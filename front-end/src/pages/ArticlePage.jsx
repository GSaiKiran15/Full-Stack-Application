import { useLoaderData} from 'react-router-dom'
export default function ArticlePage() {
    const {title, content, upvotes} = useLoaderData()
    return (
        <>
        <h1>{title}</h1>
        <p> This Article has {upvotes} upvotes! </p>
        <p>{content}</p>
        </>
    );
}