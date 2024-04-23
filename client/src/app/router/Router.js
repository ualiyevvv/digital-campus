import React from 'react';
import { Routes, Route } from "react-router-dom";

import {routeConfig} from "./routerConfig";

import Authentication from "../../pages/auth/main/Authentication";
import PageProtected from "../middlewares/PageProtected";
import Logout from "../../pages/auth/logout/Logout";
import Page from "../middlewares/Page";

export const Router = () => {

	return (<>
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route
					key={path}
					path={path}
					element={
						// <PageProtected>
						// 	{element}
							element
						// </PageProtected>
					}
				/>
			))}


			{/** Authentication Pages */}
			<Route path='/auth'>
				<Route index element={
					<Page>
						<Authentication />
					</Page>
				}/>

				<Route path='logout' element={
					// <PageProtected>
						<Logout />
					// </PageProtected>
				}/>
			</Route>


		</Routes>
	</>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
