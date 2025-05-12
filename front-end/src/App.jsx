import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';

const routes = [{
  path: '/',
  element: <Layout/>,
  errorElement: <NotFoundPage/>,
  children: [{
    path:'/',
    element: <HomePage/> 
  },
  {
    path: '/about',
    element: <AboutPage/>
  },
  {
    path: '/articles',
    element: <ArticlesListPage/>,
    loader: async function () {
      const response = await axios.get('/api/articles')
      const data = response.data
      return {data}
    }
  },
  {
    path: 'articles/:name',
    element: <ArticlePage/>,
    loader: async ({params}) => {
      const response = await axios.get(`/api/articles/${encodeURIComponent((params.name))}`);
      const {title, content, upvotes, comments} = response.data[0]
      return {title, content, upvotes, comments};
    }
  }
  ]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
