import { Outlet } from "react-router-dom";
import Header from "./Header";

export function Layout() {
	return (
		<div className="flex">
			<div className="fixed">
				<Header></Header>
			</div>
			<span className="flex justify-center h-screen w-screen">
				<Outlet></Outlet>
			</span>
		</div>
	);
}
