import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "./api";

interface AuthContextValue {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			if (localStorage.getItem("token")) {
				setIsAuthenticated(true);
				const user = await getUserData();
				if (user) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} else {
				setIsAuthenticated(false);
			}
		}
		fetchData();
	}, []);

	function login(token: string) {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
	}

	function logout() {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
