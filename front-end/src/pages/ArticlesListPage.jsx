import articles from "../article-content";
import ArticlesList from "../ArticleList";

export default function ArticlesListPage() { 
    return (
        <>
        <h1>Articles</h1>
        <ArticlesList articles={articles}/>
        </>
    );
 }