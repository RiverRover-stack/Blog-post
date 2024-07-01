// setting up database

import { Client, Databases, Storage, ID, Query } from 'appwrite'
import conf from '../conf/conf'

class Service {
	client = new Client()
	databases
	storage

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId)
		this.databases = new Databases(this.client)
		this.storage = new Storage(this.client)
	}

	async createPost({ title, slug, content, status, featuredImage, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{
					title,
					slug,
					content,
					status,
					featuredImage,
					userId,
				}
			)
		} catch (error) {
			console.log('Appwrite service :: createPost :: error', error)
		}
	}

	async updatePost(
		documentId,
		{ title, slug, content, status, featuredImage }
	) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId,
				{
					title,
					slug,
					content,
					status,
					featuredImage,
				}
			)
		} catch (error) {
			console.log('Appwrite service :: updatePost :: error', error)
		}
	}

	async deletePost(documentId) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId
			)
			return true
		} catch (error) {
			console.log('Appwrite service :: deletePost :: error', error)
			return false
		}
	}

	async getPost(documentId) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId
			)
		} catch (error) {
			console.log('Appwrite service :: getPost :: error', error)
			return false
		}
	}

	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			)
		} catch (error) {
			console.log('Appwrite service :: deletePost :: error', error)
			return false
		}
	}

	// file services
	async uploadFile(file) {
		try {
			await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			)
			return true
		} catch (error) {
			console.log('Appwrite service :: uploadFile :: error', error)
			return false
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteBucketId, fileId)
			return true
		} catch (error) {
			console.log('Appwrite service :: deleteFile :: error', error)
			return false
		}
	}

	async getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
	}
}

const service = new Service()

export default service
