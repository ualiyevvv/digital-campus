import React, {useState} from "react";
import Block from "../../shared/ui/block/Block";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import AdminUsers from "./admin_tabs/AdminUsers";
import Typography from "../../shared/ui/typography/Typography";
import AdminLogs from "./admin_tabs/AdminLogs";

export default function AdminAllInOne() {

    const [tab, setTab] = useState('users')

    const TabsView = {
        users: <AdminUsers />,
        reqlogs: <AdminLogs />,

    }


    return (<>
        <Block top={100}>
            <Block bottom={5}>
                <Block bottom={20} padding={'0 20px'}>
                    <Typography size={28} weight={900} color={'silver'} bottom={20}>Admin Dashboard</Typography>
                </Block>

                <Block padding={'0 20px'}>
                    <ToggleButtonWrapper>
                        <ToggleButton isActive={tab==='users'} onClick={() => setTab('users')}>Пользователи</ToggleButton>
                        <ToggleButton isActive={tab==='reqlogs'} onClick={() => setTab('reqlogs')}>Логи запросов</ToggleButton>
                    </ToggleButtonWrapper>
                </Block>
            </Block>
            <Block padding={20}>
                {TabsView[tab]}
            </Block>
        </Block>
    </>)
}