import React from 'react'
import Modal from "../../../shared/ui/modal/Modal";
import CreateUser from "./CreateUser";
export default function CreateUserModal({toggle}) {

    // const {isAuth, user} = useAuth();
    //
    // if (isAuth && user.role !== 'ADMIN') {
    //     return window.location.replace('/');
    // }

    return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
        <CreateUser toggle={toggle}/>
    </Modal>)
}