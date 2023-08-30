import { useState, useEffect } from "react";
import { HeaderLinks } from "./HeaderLinks";
import HeaderMobileLinks from "./HeaderMobileLinks";

// type IHeader = {};

export default function Header() {
	const [widthWindow, setWidthWindow] = useState(window.innerWidth);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setWidthWindow(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (widthWindow <= 414) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [widthWindow]);

	if (isMobile) {
		return <HeaderMobileLinks></HeaderMobileLinks>;
	}

	return <HeaderLinks></HeaderLinks>;
}
