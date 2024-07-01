import { Client, Account, ID } from 'appwrite'
import conf from '../conf/conf'

class AuthService {
	client = new Client()
	account
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId)
		this.account = new Account(this.client)
	}

	async signUp({ email, name, password }) {
		try {
			const userAccouunt = this.account.create(
				ID.unique(),
				email,
				password,
				name
			)
			if (userAccouunt) {
				return this.login(email, password)
			} else {
				return userAccouunt
			}

		} catch (error) {
			throw error
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(
				email,
				password
			)
		} catch (error) {
			throw error
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get()
		} catch (error) {
			throw error
		}
	}

	async logout() {
		try {
			return await this.account.deleteSessions()
		} catch (error) {
			throw error
		}
	}
}

const service = new AuthService()

export default service
