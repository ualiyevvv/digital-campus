import React, {useState} from "react";

import Card from "../../shared/ui/card/Card";
import CardBody from "../../shared/ui/card/CardBody";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Button from "../../shared/ui/button/Button";
import Badge from "../../shared/ui/badge/Badge";
import TokenCard from "../../features/token_card/TokenCard";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

import styles from './portfolio.module.css'
export default function Portfolio({addressInfo={}}) {

    const [isShowAll, setIsShowAll] = useState(true)

    return (<div className={styles.Portfolio}>
        <Card minWidth={400} maxWidth={'100%'}>
            <CardBody>
                <Block bottom={12}>
                    <GroupFlex align={'aic'} justify={'start'}>
                        <Typography bottom={4} size={24} weight={800} color={'black'}>{addressInfo.address}</Typography>
                        <Block left={10} width={'fit-content'}><Badge text={addressInfo.blockchain} left={10}></Badge></Block>

                    </GroupFlex>

                    {addressInfo.blockchain !== 'ethereum' && <>
                        <Typography bottom={2} size={16} weight={600} color={'grey'}>Всего получено: {addressInfo?.total_received * 0.00000001 } BTC (${(addressInfo?.total_received * 0.00000001)*addressInfo?.btc_current_price })</Typography>
                        <Typography bottom={2} size={16} weight={600} color={'grey'}>Всего отправлено: {addressInfo?.total_sent * 0.00000001 } BTC (${(addressInfo?.total_sent * 0.00000001)*addressInfo?.btc_current_price })</Typography>
                    </>}

                    <Typography bottom={2} size={16} weight={600} color={'grey'}>Первая активность: {format(new Date(addressInfo?.first_activity), 'dd MMMM yyyy, HH:mm', { locale: ruLocale })}</Typography>
                    <Typography bottom={2} size={16} weight={600} color={'grey'}>Последняя активность: {format(new Date(addressInfo?.last_activity), 'dd MMMM yyyy, HH:mm', { locale: ruLocale })}</Typography>
                    {addressInfo.blockchain !== 'ethereum'
                        ? <Typography bottom={2} size={16} weight={600} color={'grey'}>Баланс: {addressInfo?.balance * 0.00000001 } BTC (${(addressInfo?.balance * 0.00000001)*addressInfo?.btc_current_price })</Typography>
                        :<Typography bottom={2} size={16} weight={600} color={'grey'}>Баланс: ${addressInfo?.balance }</Typography>
                    }
                    <Typography size={16} weight={600} color={'grey'}> </Typography>
                </Block>
                <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                    {/*<Block>*/}
                    {/*    <Typography size={21} weight={800} color={'black'}>Portfolio</Typography>*/}
                    {/*    <Typography size={16} weight={700} color={'grey'}>Balance: ${addressInfo?.balance}</Typography>*/}
                    {/*</Block>*/}
                    {/*<Button size={'small'} width={'fit-content'} variant={'outline'} onClick={()=>setIsShowAll(!isShowAll)}>*/}
                    {/*    {isShowAll ? 'Hide' : 'Show'}*/}
                    {/*</Button>*/}
                </GroupFlex>
                {/*{isShowAll &&*/}
                {/*    <Block top={15}>*/}
                {/*        {addressInfo?.tokens?.map(token => {*/}
                {/*            if (token.balance !== 0)*/}
                {/*                return <TokenCard token={token}/>*/}
                {/*        })}*/}
                {/*    </Block>*/}
                {/*}*/}
            </CardBody>
        </Card>
    </div>)
}