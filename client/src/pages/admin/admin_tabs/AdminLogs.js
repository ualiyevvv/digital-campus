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

export default function AdminLogs() {

    const { adminHandler } = useAppContext();
    const {reqlogs, isLoading,getReqlogs} = adminHandler;



    useEffect(() => {
        getReqlogs()
    }, []);

    if (isLoading) {
        return <Loading />
    }


    return (<>
        {reqlogs.length < 1 && 'No logs in system.'}
        {reqlogs.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>Запрашиваемый адрес</TableRow>
                    <TableRow isHead={true}>ФИО сотрудника</TableRow>
                    <TableRow isHead={true}>Почта сотрудника</TableRow>
                    <TableRow isHead={true}>Роль</TableRow>
                    <TableRow isHead={true}>Дата и время</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { reqlogs.map( reqlog => (<>
                        <TableRow key={reqlog.id}>
                            <td>{reqlog.resource}</td>
                            <td>{reqlog.user.name}</td>
                            <td>{reqlog.user.email}</td>
                            <td>{reqlog.user.role}</td>
                            <td>{reqlog.createdAt ? format(new Date(reqlog.createdAt), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'Не активирован'}</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }

    </>)
}