import React, { useContext, useState } from "react";
import Nav from "../NavBar";
import { AuthContext } from "../AuthContext";
import { login } from "../api";
import { navigate } from "raviger";

function Login() {
	const { login: authLogin } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const token = await login({ email, password });
			authLogin(token);
			navigate("/forms");
		} catch (error: any) {
			console.error(error);
			setError(error.message);
		}
	}

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
			<Nav />
			<h3 className="text-3xl font-bold leading-tight text-center text-gray-800">
				Login
			</h3>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="email"
						className="block text-gray-700 font-bold mb-2"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onChange={(event) => setEmail(event.target.value)}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-gray-700 font-bold mb-2"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						autoComplete="current-password"
						required
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div>
					<p className="text-red-500 text-xs italic">{error}</p>
				</div>
				<div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Sign In
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
