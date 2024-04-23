import React, {useEffect, useState} from "react";
import {useAppContext} from "../app/provider/AppContextProvider";
import NavigationBar from "../widgets/navigation_bar/NavigationBar";
import Block from "../shared/ui/block/Block";
import AddressSearch from "../features/address_serach/AddressSearch";
import Typography from "../shared/ui/typography/Typography";
import Portfolio from "../widgets/portfolio/Portfolio";
import Loading from "../widgets/loading/Loading";
import AppContainer from "./AppContainer";
import Box from "../shared/ui/box/Box";
import TransactionsTable from "../widgets/transactions_table/TransactionsTable";
import {useLocation, useSearchParams  } from "react-router-dom";
import PortfolioAssets from "../widgets/portfolio_assets/PortfolioAssets";
import ToggleButtonWrapper from "../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../shared/ui/toggle_button/ToggleButton";
import Notes from "../widgets/notes/Notes";

export default function ExplorerPage({}) {

    const { authHandler, addressHandler } = useAppContext()

    const [searchParams, setSearchParams] = useSearchParams();
    const [ address, setAddress ] = useState(searchParams.get('address') || '');

    const { addressInfoData, getAddressInfo, isLoading, isAddressFetched } = addressHandler

    const [ transactionsData, setTransactionsData ] = useState([])
    const [searchValue, setSearchValue] = useState(address || '')


    const [tab, setTab] = useState('notes')

    const TabsView = {
        transactions: addressInfoData?.blockchain !== 'ethereum' && <TransactionsTable transactions={addressInfoData?.txrefs}/>,
        assets: addressInfoData?.blockchain === 'ethereum' && <PortfolioAssets assets={addressInfoData?.assets}/>,
        notes: <Notes address={address} />,
    }

    useEffect(() => {
        address && setSearchParams({address: address})

        if (address) {

            (async () => await getAddressInfo(address))()

        }
    }, [address]);

    return(<>
        <AppContainer>

            <NavigationBar />
            { isLoading && <Loading /> }

            <Box isContainer={true}>
                <Block top={100}>
                    <AddressSearch value={searchValue} onChange={setSearchValue} onSubmit={() => setAddress(searchValue)} />
                </Block>

                { (isAddressFetched === false && searchValue === '') && <Block isCenteredByY={true}>
                    <Typography align={'center'} size={24} color={'silver'} weight={800}>Введите адрес для поиска и нажмите на Go</Typography>
                </Block>
                }
                { isAddressFetched && !addressInfoData?.address && <Block isCenteredByY={true}>
                    <Typography align={'center'} size={24} color={'silver'} weight={800}>Адрес не найден</Typography>
                </Block>
                }

                { !isLoading && isAddressFetched && addressInfoData?.address && <Block top={40}>
                    <Portfolio addressInfo={addressInfoData}/>

                    <Block top={20} bottom={10}>
                        <ToggleButtonWrapper>
                            {addressInfoData?.blockchain !== 'ethereum' && <ToggleButton isActive={tab==='transactions'} onClick={() => setTab('transactions')}>Транзакции</ToggleButton>}
                            <ToggleButton isActive={tab==='notes'} onClick={() => setTab('notes')}>Заметки</ToggleButton>
                            {addressInfoData?.blockchain === 'ethereum' && <ToggleButton isActive={tab==='assets'} onClick={() => setTab('assets')}>Токены</ToggleButton>}
                        </ToggleButtonWrapper>
                    </Block>

                    <Block top={40}>
                        {TabsView[tab]}
                    </Block>

                </Block>
                }
            </Box>

        </AppContainer>
    </>)
}