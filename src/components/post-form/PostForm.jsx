import React, { useCallback } from 'react'
import appwriteService from '../../appwrite/config'
import { Button, Input, Select, RTE } from '../index'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
	const { register, handleSubmit, control, watch, setValue, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || '',
				content: post?.content || '',
				status: post?.status || 'active',
				slug: post?.slug || '',
			},
		})
	const navigate = useNavigate()
	const userData = useSelector((state) => state.auth.userData)

	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await appwriteService.uploadFile(data.image[0])
				: null
			if (file) {
				appwriteService.deleteFile(post.featuredImage)
			}
			const post = await appwriteService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			})
			if (post) {
				navigate(`/post/${post.$id}`)
			}
		} else {
			const file = await appwriteService.uploadFile(data.image[0])
			if (file) {
				const fileId = file.$id
				data.featuredImage = fileId

				const newPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
				})
				if (newPost) navigate(`/post/${newPost.$id}`)
			}
		}
	}

	const slugTransform = useCallback((value) => {
		if (value && typeof value === 'string')
			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-')
		return ''
	})

	React.useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title))
			}
		})
		return () => {
			subscription.unsubscribe() // unsubscribing the event prevents memory leaks which is a very effective optimisation in complicated apps.
		}
	}, [watch, slugTransform, setValue])

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title: "
					placeholder="Title"
					className="mb-4"
					{...register('title', {
						required: true,
					})}
				/>
				<Input
					label="Slug: "
					placeholder="Slug"
					className="mb-4"
					{...register('slug', {
						required: true,
					})}
					onInput={(e) =>
						setValue('slug', slugTransform(e.currentTarget.value))
					}
				/>
				<RTE
					label="Content: "
					name="content"
					control={control}
					defaultValue={getValues('content')}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image: "
					type="file"
					className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
								      file:text-sm file:font-semibold
								      file:bg-violet-50 file:text-violet-700
								      hover:file:bg-violet-100"
					accept="image/png image/jpg image/jpeg image/gif"
					{...register('image', {
						required: !post,
					})}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={appwriteService.getFilePreview(
								post.featuredImage
							)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={['active', 'inactive']}
					label="Status"
					className="mb-4"
					{...register('status', {
						required: true,
					})}
				/>
				<Button
					type="submit"
					bgColor={post ? 'bg-green-500' : undefined}
					className="w-full"
				>
					{post ? 'Update' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}

export default PostForm
