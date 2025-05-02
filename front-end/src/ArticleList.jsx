import { Link } from "react-router-dom";
export default function ArticlesList({articles}) {
    return (
        <>
        {articles.map(a => (<Link key={a.name} to={'/articles/' + a.name}><h1>{a.title}</h1><p>{a.content[0]}</p></Link>))}
        </>
    );
}