import React, {useMemo, useState} from "react";
import UserService from "../../services/UserService";
import ReqlogsService from "../../services/ReqlogsService";
import Logger from "../../../shared/libs/internal/Logger";

export default function useAdmin() {

    const logger = useMemo(()=>new Logger('useAdmin'), []);
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [reqlogs, setReqlogs] = useState([]);

    async function getUsers() {
        setIsLoading(true)
        try {
            const response = await UserService.getUsers()
            setUsers(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }

    }

    async function getReqlogs() {
        setIsLoading(true)
        try {
            const response = await ReqlogsService.getReqlogs()
            setReqlogs(response.data)
        } catch (e) {
            logger.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }

    }


    async function createUser({name, email}) {
        setIsLoading(true)
        try {
            const response = await UserService.createUser(name,email)

            return response.data
        } catch (e) {
            logger.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }


    return ({
        users,
        reqlogs, getReqlogs,
        getUsers, createUser,
        isLoading,
    })
}