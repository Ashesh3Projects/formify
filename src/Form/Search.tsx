import React, { useEffect, useRef } from "react";

function Search(props: { search: string; setQuery: Function }) {
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (props.search) {
			searchRef.current?.focus();
		}
	}, [props.search]);

	return (
		<form action="" method="get">
			<div className="mb-4 flex flex-row gap-2">
				<div className="flex flex-row w-full">
					<input
						name="search"
						className="flex rounded-lg border-2 border-gray-200 p-2 text-center w-full"
						onChange={(e) =>
							props.setQuery({ search: e.target.value })
						}
						value={props.search || ""}
						placeholder="Search"
						autoComplete="off"
						ref={searchRef}
					/>
				</div>
				<div className="flex">
					<button
						className="bg-purple-500 hover:bg-purple-700 text-white rounded-lg px-4"
						type="submit"
						title="search"
					>
						&#x1F50E;&#xFE0E;
					</button>
				</div>
			</div>
		</form>
	);
}

export default Search;
