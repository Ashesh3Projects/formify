import React from "react";
import Header from "./Header";
import Nav from "./NavBar";

function Home() {
	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl text-center">
			<Nav />
			<Header title="Welcome to Formify App" />
		</div>
	);
}

export default Home;
