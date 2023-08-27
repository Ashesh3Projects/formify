import { Link } from "raviger";
import React from "react";
import logo from "./logo.svg";

function Header(props: { title: string }) {
	return (
		<>
			<div className="flex gap-2 center w-full">
				<img
					src={logo}
					className="animate-spin h-16 w-16"
					alt="logo"
					style={{ animation: "spin 2s linear infinite" }}
				/>
				<h1 className="flex text-center text-xl items-center font-semibold ml-auto mr-auto">
					{props.title}
				</h1>
			</div>
			<div className="p-3"></div>
			{/* <div>
				<Link
					href="/"
					className="cursor-pointer w-full flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg justify-center"
				>
					Enter
				</Link>
			</div> */}
		</>
	);
}

export default Header;
