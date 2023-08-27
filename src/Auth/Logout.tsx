import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { navigate } from "raviger";

function Logout() {
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		logout();
		navigate("/");
	}, []);

	return <> - </>;
}

export default Logout;
