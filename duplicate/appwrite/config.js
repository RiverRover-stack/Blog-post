// writing database services

import {
	Client,
	Databases,
	Storage,
	ID,
	Query,
} from 'appwrite'
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

	async createPost({
		title,
		slug,
		content,
		featuredImage,
		status,
		userId,
	}) {
		try {
			await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{
					title,
					content,
					slug,
					featuredImage,
					status,
					userId,
				}
			)
			return true
		} catch (error) {
			throw error
		}
	}

	async updatePost(
		documentId,
		{ title, slug, content, featuredImage, status }
	) {
		try {
			await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId,
				{
					title,
					content,
					featuredImage,
					status,
					slug,
				}
			)
			return true
		} catch (error) {
			throw error
		}
	}

	async getPost(documentId) {
		try {
			await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId
			)
			return true
		} catch (error) {
			throw error
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
			throw error
		}
	}

	async listPosts(
		queries = [Query.equal('status', 'active')]
	) {
		try {
			this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			)
			return true
		} catch (error) {
			throw error
		}
	}

	// writing file service

	async uploadFile(file) {
		try {
			await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			)
			return true
		} catch (error) {
			throw error
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(
				conf.appwriteBucketId,
				fileId
			)
			return true
		} catch (error) {
			throw error
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(
			conf.appwriteBucketId,
			fileId
		)
	}

	async updateFile(fileId) {
		try {
			await this.storage.updateFile(
				conf.appwriteBucketId,
				fileId
			)
			return true
		} catch (error) {
			throw error
		}
	}
}

const service = new Service()

export default service
