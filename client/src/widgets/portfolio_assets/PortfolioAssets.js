import React from "react";
import CardBody from "../../shared/ui/card/CardBody";
import TokenCard from "../../features/token_card/TokenCard";
import Card from "../../shared/ui/card/Card";

export default function PortfolioAssets({ assets = [] }) {

    return (<>
        <Card>
            <CardBody>
                {assets?.map(token => {
                    if (token.balance !== 0)
                        return <TokenCard token={token}/>
                })}
            </CardBody>
        </Card>
    </>)
}