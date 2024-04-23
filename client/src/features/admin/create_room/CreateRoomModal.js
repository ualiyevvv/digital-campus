import React from 'react'
import CreateRoom from "./CreateRoom";
import {useAuth} from "../../../app/AuthProvider";
import Modal from "../../../shared/ui/modal/Modal";
export default function CreateRoomModal({toggle}) {

    const {isAuth, user} = useAuth();

    if (isAuth && user.role !== 'ADMIN') {
        return window.location.replace('/');
    }

    return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
        <CreateRoom toggle={toggle}/>
    </Modal>)
}