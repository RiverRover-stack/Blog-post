import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AuthLayout } from './components/index.js'
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: '/signup',
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: '/all-posts',
				element: (
					<AuthLayout authentication>
						<AllPosts />
					</AuthLayout>
				),
			},
			{
				path: '/add-post',
				element: (
					<AuthLayout authentication>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: '/edit-post/:docId',
				element: (
					<AuthLayout authentication>
						<EditPost />
					</AuthLayout>
				),
			},
			{
				path: '/post/:docId',
				element: (
					<AuthLayout authentication>
						<Post />
					</AuthLayout>
				),
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
