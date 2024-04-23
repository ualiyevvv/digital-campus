import React, {useEffect, useState} from "react";
import AdminAllInOne from "./admin/AdminAllInOne";
import {useAppContext} from "../app/provider/AppContextProvider";
import NavigationBar from "../widgets/navigation_bar/NavigationBar";
import AppContainer from "./AppContainer";

export default function AdminPage() {

    const { authHandler } = useAppContext()
    const { user } = authHandler

    return(<>
        <AppContainer>
            <NavigationBar />
            <AdminAllInOne />
        </AppContainer>
    </>)
}