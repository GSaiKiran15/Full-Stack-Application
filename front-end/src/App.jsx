import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesList';

const routes = [{
  path:'/',
  element: <HomePage/> 
},
{
  path: '/about',
  element: <AboutPage/>
},
{
  path: '/article',
  element: <ArticlePage/>
},
{
  path: '/article/:id',
  element: <ArticlesListPage/>
},
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
