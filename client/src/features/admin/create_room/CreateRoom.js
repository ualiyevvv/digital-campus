import React, {useContext, useEffect, useState} from "react";

import Input from "../../../shared/ui/input/Input";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import {useAuth} from "../../../app/AuthProvider";
import Typography from "../../../shared/ui/typography/Typography";
import Overlay from "../../../shared/ui/overlay/Overlay";
import Loader from "../../../shared/ui/loader/Loader";
const CreateRoom = ({toggle}) => {

    const {roomHandler} = useAuth();
    const {getRooms} = roomHandler

    const [roomName, setRoomName] = useState('')
    const [roomEndDate, setRoomEndDate] = useState('')
    const [roomTgGroupId, setTgGroupId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {user} = useAuth()

    if (!user) {
        return (<></>)
    }
    function createRoom() {

        setIsLoading(true)
        const room = {
            name: roomName,
            tg_group_id: roomTgGroupId,
            user_id: user.id,
            end_date: roomEndDate
        }

        // Отправка POST-запроса
        fetch(`http://localhost:3000/api/room/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(room),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                getRooms()
                toggle()
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error(error);
            });
        setIsLoading(false)
    }



    return (<>
        {isLoading && <Overlay><Loader/></Overlay>}
        <Block isAlignCenter={true} bottom={15}>
            <Typography size={24} weight={600} bottom={20}>Create a room</Typography>
            <Input type={'text'} value={roomName} placeHolder={'room name'} name={'name'} onChange={(e) => setRoomName(e.target.value)} />
            <Input type={'datetime-local'} value={roomEndDate} placeHolder={'room end date'} name={'end_date'} onChange={(e) => setRoomEndDate(e.target.value)} />
            <Input type={'text'} value={roomTgGroupId} placeHolder={'room tg id'} name={'tg_group_id'} onChange={(e) => setTgGroupId(e.target.value)} />
            <Button onClick={createRoom}>Отправить</Button>
        </Block>
    </>)
}

export default CreateRoom;
