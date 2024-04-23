import React, {useState} from "react";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Logo from "../../shared/ui/logo/Logo";
import Box from "../../shared/ui/box/Box";
import Container from "../../shared/ui/box/Container";
import Avatar from "../../shared/ui/avatar/Avatar";
import Typography from "../../shared/ui/typography/Typography";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Block from "../../shared/ui/block/Block";
import {useAppContext} from "../../app/provider/AppContextProvider";
import LogoutAction from "../../widgets/logout_action/LogoutAction";

export default function AdminDashboard() {

    const { authHandler } = useAppContext();
    const {user} = authHandler;

    const [activeTab, setActiveTab] = useState('hotels')

    return(<>
        <GroupInline width={'100%'} height={'100%'}>
            <AppBar padding={'20px 10px'} left={true}>
                <Block top={40}>
                    <Logo/>
                    <Block top={80} isAlignCenter={true}>
                        <Nav block={true}>
                            <NavLink active={activeTab === 'employees'} text={'Сотрудники'} onClick={ () => setActiveTab('employees')}/>
                        </Nav>
                    </Block>
                </Block>
                <Block>
                    <GroupInline width={'auto'}>
                        <Avatar right={10}/>
                        <div><Typography>{user.name}</Typography></div>
                    </GroupInline>
                    <Block top={20}>
                        <LogoutAction inverseColor={true} />
                    </Block>
                </Block>
            </AppBar>
            <Box>
                <Container padding={'20px 0'}>
                    {/*{activeTab === 'hotels' && <HotelAdminPage />}*/}
                    {activeTab === 'employees' && <>employees</>}
                </Container>
            </Box>
        </GroupInline>
    </>)
}