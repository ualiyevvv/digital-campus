import React, {useEffect, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../../widgets/loading/Loading";
import Logger from "../../shared/libs/internal/Logger";
import {useAppContext} from "../provider/AppContextProvider";


export default function PageProtected({children}) {

    const logger = useMemo(()=>new Logger('PageProtected'), []);

    const { authHandler } = useAppContext()
    const {user, isLoading, isAuth, checkAuth, setLoading} = authHandler
    const navigate = useNavigate()

    //!9OVLa39
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return navigate('/auth');
        }

        checkAuth();

        console.log(JSON.stringify(user))

    }, []);

    if (isLoading) {
        return (<Loading />)
    }

    if (!isAuth) {
        return navigate('/auth');
    }

    if (user) {
        logger.log('USER', user)
    }

    return (<>
        {children}
    </>)

}