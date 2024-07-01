import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
	const [post, setPost] = useState(null)
	const navigate = useNavigate()
	const { docId } = useParams()

	useEffect(() => {
		if (docId) {
			appwriteService.getPost(docId).then((post) => {
				if (post) {
					setPost(post)
				}
			})
		} else {
			navigate('/')
		}
	}, [docId, navigate])

	return post ? (
		<div className="py-8">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null
}

export default EditPost
