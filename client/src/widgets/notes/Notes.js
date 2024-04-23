import React, {useEffect, useState} from "react";
import Table from "../../shared/ui/table/Table";
import TableHead from "../../shared/ui/table/TableHead";
import TableRow from "../../shared/ui/table/TableRow";
import TableBody from "../../shared/ui/table/TableBody";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import {useAppContext} from "../../app/provider/AppContextProvider";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import Loading from "../loading/Loading";
import Loader from "../../shared/ui/loader/Loader";
import Typography from "../../shared/ui/typography/Typography";

export default function Notes({ address = '' }) {

    const { notesHandler } = useAppContext();
    const {notes, isLoading, getNotes, createNote} = notesHandler;


    const [ noteText, setNoteText ] = useState('')
    const [ alertText, setAlertText ] = useState('')

    useEffect(() => {
        getNotes(address)
    }, [address]);

    async function submitNote() {
        if (noteText !== '' && noteText.length > 3) {
            await createNote(address, noteText)
            setNoteText('')
            await getNotes(address)
            setAlertText('')
        } else setAlertText('Необходимо написать более 3х символов')
    }

    if (isLoading) {
        return <Loading />
    }

    return (<>
        <Block bottom={15} width={'100%'}>
            <Typography size={21} bottom={8} color={'grey'} weight={600}>Написать заметку</Typography>
            {alertText && <Typography size={16} bottom={8} color={'red'} weight={500}>{alertText}</Typography>}

            <textarea style={{resize: 'vertical'}} required value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={4}>

            </textarea>
            <Button top={8} size={'small'} width={'fit-content'} onClick={submitNote}>Сохранить заметку</Button>
        </Block>
        {notes.length < 1 && 'No notes by this address.'}
        {notes.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>Заметка</TableRow>
                    <TableRow isHead={true}>Создатель</TableRow>
                    <TableRow isHead={true}>Дата создания</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { notes.map( note => (<>
                        <TableRow key={note.id}>
                            <td>{note.text }</td>
                            <td>{note.user.email }</td>
                            <td>{format(new Date(note.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ruLocale })}</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }
    </>)
}