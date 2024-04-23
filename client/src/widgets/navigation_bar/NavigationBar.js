import React, {useEffect} from "react";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Nav from "../../shared/ui/nav/Nav";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import LogoutAction from "../logout_action/LogoutAction";
import NavLink from "../../shared/ui/nav/NavLink";
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../../app/provider/AppContextProvider";

export default function NavigationBar() {

    const { authHandler } = useAppContext()
    const { user } = authHandler
    const navigate = useNavigate();

    return (<>
        <AppBar padding={'10px'}>
            <Nav>
                <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                    <GroupFlex width={'auto'} align={'aic'}>
                        <Logo /> <Block right={40}></Block>

                        {user?.role === 'ADMIN' && <NavLink text={'AdminPanel'} onClick={() => navigate('/admin')} />}
                        <NavLink text={'Explorer'} onClick={() => navigate('/explorer')} />
                    </GroupFlex>
                    <Block width={180}>
                        <LogoutAction inverseColor={true} />
                    </Block>
                </GroupFlex>
            </Nav>
        </AppBar>
    </>)
}