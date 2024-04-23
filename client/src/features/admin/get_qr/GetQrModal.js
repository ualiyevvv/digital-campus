import React from 'react'
import {useAuth} from "../../../app/AuthProvider";
import Modal from "../../../shared/ui/modal/Modal";
import GetQr from "./GetQr";
import useToggle from "../../../hooks/useToggle";
export default function GetQrModal({roomHash, toggle}) {

    const {isAuth, user} = useAuth();

    if (isAuth && user.role !== 'ADMIN') {
        return window.location.replace('/');
    }

    return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
        <GetQr roomHash={roomHash} />
    </Modal>)
}