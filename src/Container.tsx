import React from "react";

function Container(props: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen bg-gray-100 items-center p-2">
			{props.children}
		</div>
	);
}

export default Container;
