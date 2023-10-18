import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import {BaseMobile} from './Mobile'
import {BaseDesktop} from './desktop/Base'
type Props = {};
export function BaseScheduleList({}: Props) {
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
		if (widthWindow <= 414) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [widthWindow]);

    return (
        <div>
            {isMobile ? <BaseMobile/> : <BaseDesktop/> }
        </div>
    )
}