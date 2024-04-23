import React, {useMemo, useState} from "react";
import BlockchainService from "../../services/BlockchainService";
import Logger from "../../../shared/libs/internal/Logger";
import NoteService from "../../services/NoteService";

export default function useNotes() {

    const logger = useMemo(()=>new Logger('useNotes'), []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ notes, setNotes ] = useState([])


    async function getNotes(address) {
        setIsLoading(true)
        try {
            const response = await NoteService.getNotes(address)
            setNotes(response.data)
            logger.log('USENOTES', notes, response)
        } catch (e) {
            logger.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }

    }

    async function createNote(resource, text) {
        setIsLoading(true)
        try {
            const response = await NoteService.createNote(resource, text)

            return response.data
        } catch (e) {
            logger.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        notes, getNotes, createNote,
        isLoading,
        error
    }

}