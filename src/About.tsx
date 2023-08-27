import React from "react";
import logo from "./logo.svg";
import NavBar from "./NavBar";

function About() {
	return (
		<>
			<figure className="p-6 mx-auto bg-white shadow-lg rounded-xl">
				<NavBar />
				<div className="border-2 border-slate-700 rounded-lg">
					<img
						className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto animate-spin "
						src={logo}
						alt=""
						width="384"
						height="512"
						style={{ animation: "spin 2s linear infinite" }}
					/>
					<div className="pt-6 p-8 text-center md:text-left space-y-4">
						<blockquote>
							<p className="text-lg font-medium">
								This app is called Formify, and it allows you to
								create and manage forms, as well as collect
								responses and analyze the data. With Formify,
								you can easily create custom forms for surveys,
								feedback, registrations, and more. You can also
								customize the design and branding of your forms
								to match your organization's style. Formify is a
								great tool for businesses, schools, and anyone
								who needs to collect and analyze data from
								forms.
							</p>
						</blockquote>
						<figcaption className="font-medium">
							<div className="text-sky-600 ">Ashesh Kumar</div>
						</figcaption>
					</div>
				</div>
			</figure>
		</>
	);
}

export default About;
