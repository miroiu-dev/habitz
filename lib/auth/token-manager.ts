import * as SecureStore from 'expo-secure-store';

type Tokens = {
	accessToken: string | null;
	refreshToken: string | null;
};

type TokenCallback = (tokens: Tokens) => void;

class TokenManager {
	private listeners: Set<TokenCallback> = new Set();
	private currentTokens: Tokens = {
		accessToken: null,
		refreshToken: null
	};

	async getAccessToken() {
		if (this.currentTokens.accessToken) {
			return this.currentTokens.accessToken;
		}

		const accessToken = await SecureStore.getItemAsync('accessToken');
		this.currentTokens.accessToken = accessToken;

		return accessToken;
	}

	async getRefreshToken() {
		if (this.currentTokens.refreshToken) {
			return this.currentTokens.refreshToken;
		}

		const refreshToken = await SecureStore.getItemAsync('refreshToken');
		this.currentTokens.refreshToken = refreshToken;

		return refreshToken;
	}

	async setTokens(accessToken: string, refreshToken: string) {
		await Promise.all([
			SecureStore.setItemAsync('accessToken', accessToken),
			SecureStore.setItemAsync('refreshToken', refreshToken)
		]);

		this.currentTokens = { accessToken, refreshToken };
		this.notifyListeners();
	}

	subscribe(callback: TokenCallback) {
		this.listeners.add(callback);
		callback(this.currentTokens);

		return () => {
			this.listeners.delete(callback);
		};
	}

	async clearTokens() {
		await Promise.all([
			SecureStore.deleteItemAsync('accessToken'),
			SecureStore.deleteItemAsync('refreshToken')
		]);

		this.currentTokens = { accessToken: null, refreshToken: null };
		this.notifyListeners();
	}

	private notifyListeners() {
		for (const listener of this.listeners) {
			listener(this.currentTokens);
		}
	}
}

export const tokenManager = new TokenManager();
