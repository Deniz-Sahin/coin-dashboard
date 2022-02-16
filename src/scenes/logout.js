import React, { useEffect } from "react";
import { useAuthenticatedUser, useSignOut } from "../services/AuthContext";

import { PageCenteredProgress } from "../components/CenteredProgress";
import { useHistory } from "react-router-dom";

export default function Logout() {
	const user = useAuthenticatedUser();
	const signOut = useSignOut();

	const history = useHistory();

	useEffect(() => {
		signOut();

		setTimeout(() => {
			history.push("/login");
		},500);
		
	}, []);

	return <PageCenteredProgress />;
}
