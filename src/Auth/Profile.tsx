import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { navigate } from "raviger";
import { getUserData } from "../api";
import Nav from "../NavBar";

function Profile() {
	const [userData, setUserData] = useState<any>();

	useEffect(() => {
		async function fetchData() {
			const user = await getUserData();
			if (user) {
				setUserData(user);
			} else {
				setUserData(undefined);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
			<Nav />
			<h3 className="text-3xl font-bold leading-tight text-center text-gray-800 my-4">
				Profile
			</h3>
			<div className="space-y-6">
				<div className="flex justify-between">
					<label htmlFor="name" className="block text-gray-700 mb-2">
						Name:
					</label>
					<p className="text-gray-700 mb-2">{userData?.email}</p>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default Profile;
