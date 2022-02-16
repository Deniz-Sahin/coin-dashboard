import React, { useContext } from "react";

const AuthContext = React.createContext();

class FetchError extends Error {
	constructor(status, ...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, FetchError);
		}

		this.status = status;
	}
}

function handleErrors(response) {
	if (!response.ok) {
		throw new FetchError(response.status, response.status + ":" + response.statusText);
	}
	return response;
}

export function useAuth() {
	return useContext(AuthContext);
}

export function useAuthLoading() {
	const { loading } = useContext(AuthContext);
	return loading;
}

export function useAuthenticatedUser() {
	const { user } = useContext(AuthContext);
	return user;
}

export function useSignOut() {
	const { signOut } = useContext(AuthContext);
	return signOut;
}

export function useSetAuthenticatedUser() {
	const { setUser } = useContext(AuthContext);
	return setUser;
}

export { AuthContext, handleErrors, FetchError };
