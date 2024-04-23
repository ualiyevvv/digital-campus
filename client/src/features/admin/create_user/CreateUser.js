import React, {useContext, useEffect, useState} from "react";

import Input from "../../../shared/ui/input/Input";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import {useAppContext} from "../../../app/provider/AppContextProvider";
const CreateUser = ({toggle}) => {

    const { adminHandler } = useAppContext();
    const { createUser, getUsers } = adminHandler

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    // TODO validation custom or change to form and submit (native input requires)
    async function onCreateUser() {
        const user = {
            name: userName,
            email: userEmail,
        }

        await createUser(user)
        await getUsers()
        toggle()
    }


    return (<>
        <Block isAlignCenter={true} bottom={15}>
            <Typography size={24} weight={600} bottom={20}>Create a level</Typography>
            <Block top={8}></Block>
            <Input type={'text'} value={userName} placeHolder={'Имя сотрудника'} onChange={(e) => setUserName(e.target.value)} />
            <Block top={8}></Block>
            <Input type={'email'} value={userEmail} placeHolder={'Почта сотрудника'} onChange={(e) => setUserEmail(e.target.value)} />
            <Button top={12} onClick={onCreateUser}>Создать</Button>
        </Block>
    </>)
}

export default CreateUser;
