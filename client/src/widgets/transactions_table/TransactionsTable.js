import React, {useEffect} from "react";
import Table from "../../shared/ui/table/Table";
import TableHead from "../../shared/ui/table/TableHead";
import TableRow from "../../shared/ui/table/TableRow";
import TableBody from "../../shared/ui/table/TableBody";
import Loader from "../../shared/ui/loader/Loader";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default function TransactionsTable({ transactions = [] }) {

    useEffect(() => {
        console.log('Txs', transactions)
    }, []);

    return (<>
        {transactions.length < 1 && 'No transactions by this address.'}
        {transactions.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>Дата</TableRow>
                    <TableRow isHead={true}>Тип</TableRow>
                    <TableRow isHead={true}>Хэш транзакции</TableRow>
                    <TableRow isHead={true}>Сумма</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { transactions.map( tx => (<>
                        <TableRow key={tx.block_height}>
                            <td>{format(new Date(tx.confirmed), 'dd MMMM yyyy, HH:mm', { locale: ruLocale })}</td>
                            <td>{tx.tx_input_n < 0 ? 'Получил' : 'Отправил'}</td>
                            <td>{tx.tx_hash}</td>
                            <td>{tx.value * 0.00000001 } BTC</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }
    </>)
}