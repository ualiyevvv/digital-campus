import React, {useContext, useEffect, useMemo, useState} from "react";
import Loading from "../../widgets/loading/Loading";
import {useAppContext} from "../provider/AppContextProvider";
import Logger from "../../shared/libs/internal/Logger";

export default function Page({children}) {

    const logger = useMemo(()=>new Logger('Page'), []);
    const { authHandler } = useAppContext()
    const {user, isLoading,setLoading, isAuth, checkAuth} = authHandler

    useEffect(() => {
        logger.log('user', user)
        // if (user !== null) {
            if(localStorage.getItem('token')) {
                checkAuth()
                // console.log(user)
            } else {
                setLoading(false)
            }

        // }
        // console.log(user)
        // console.log(isAuth)

    }, []);

    if (isLoading) {
        return (<Loading />)
    }
    else {
        return (<>
            {children}
        </>)
    }




}