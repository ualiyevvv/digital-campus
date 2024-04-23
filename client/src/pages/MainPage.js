import React, {useEffect, useState} from "react";
import {useAppContext} from "../app/provider/AppContextProvider";
import NavigationBar from "../widgets/navigation_bar/NavigationBar";
import Block from "../shared/ui/block/Block";
import Typography from "../shared/ui/typography/Typography";
import AppContainer from "./AppContainer";
import CanvasMap from "../widgets/canvas_map/CanvasMap";

export default function MainPage() {

    const { authHandler, addressHandler } = useAppContext()
    const { user } = authHandler


    return(<>
        <AppContainer>
            {/*<NavigationBar />*/}

            <Block isCenteredByY={true}>
                <CanvasMap />
                {/*<Typography align={'center'} size={24} color={'silver'} weight={800}>Главная страница</Typography>*/}
            </Block>
        </AppContainer>
    </>)
}