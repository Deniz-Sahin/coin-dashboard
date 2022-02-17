import React, { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

export default function JwtProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState();
	
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setUser(token);
		}

		setLoading(false);
	}, []);

	const signOut = () => {
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				setUser,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
