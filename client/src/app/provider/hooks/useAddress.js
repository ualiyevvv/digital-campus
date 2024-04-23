import React, {useMemo, useState} from "react";
import BlockchainService from "../../services/BlockchainService";
import Logger from "../../../shared/libs/internal/Logger";
import NoteService from "../../services/NoteService";

export default function useAddress() {

    const logger = useMemo(()=>new Logger('useAddress'), []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [addressInfoData, setAddressInfoData] = useState(null)
    const [ isAddressFetched, setIsAddressFetched ] = useState(false)

    async function getAddressInfo(address) {
        setIsLoading(true)
        try {
            const response = await BlockchainService.getAddressInfo(address)
            setAddressInfoData(response.data)
            logger.log(response)
        } catch (e) {
            logger.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsAddressFetched(true)
            setIsLoading(false)
        }
    }
    return {
        getAddressInfo,
        addressInfoData,
        isLoading,
        isAddressFetched,
        error
    }

}