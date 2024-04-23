import React, {useEffect} from "react";
import Loader from "../../../shared/ui/loader/Loader";
import Table from "../../../shared/ui/table/Table";
import TableHead from "../../../shared/ui/table/TableHead";
import TableRow from "../../../shared/ui/table/TableRow";
import TableBody from "../../../shared/ui/table/TableBody";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import {useAppContext} from "../../../app/provider/AppContextProvider";
import Loading from "../../../widgets/loading/Loading";
import CreateUserModal from "../../../features/admin/create_user/CreateUserModal";
import useToggle from "../../../shared/libs/hooks/useToggle";
import Button from "../../../shared/ui/button/Button";

export default function AdminUsers() {

    const { adminHandler } = useAppContext();
    const {users, isLoading,getUsers} = adminHandler;


    const [isCreateUserModalActive, toggle] = useToggle()

    useEffect(() => {
        getUsers()
    }, []);

    if (isLoading) {
        return <Loading />
    }


    return (<>
        {isCreateUserModalActive && <CreateUserModal toggle={toggle}/> }
        <Button width={'fit-content'} onClick={toggle} size={'small'} bottom={20}>Создать пользователя</Button>
        {users.length < 1 && 'No users in system.'}
        {users.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>id</TableRow>
                    <TableRow isHead={true}>name</TableRow>
                    <TableRow isHead={true}>email</TableRow>
                    <TableRow isHead={true}>email_confirmed</TableRow>
                    <TableRow isHead={true}>role</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { users.map( user => (<>
                        <TableRow key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.email_confirmed ? format(new Date(user.email_confirmed), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'Не активирован'}</td>
                            <td>{user.role}</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }

    </>)
}