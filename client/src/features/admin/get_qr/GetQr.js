import React, {useContext, useEffect, useState} from "react";
import QRCode from 'qrcode'
import Block from "../../../shared/ui/block/Block";
import {useAuth} from "../../../app/AuthProvider";
import Typography from "../../../shared/ui/typography/Typography";
import Overlay from "../../../shared/ui/overlay/Overlay";
import Loader from "../../../shared/ui/loader/Loader";
import Button from "../../../shared/ui/button/Button";
import {useNavigate} from "react-router-dom";

export default function GetQr({roomHash}) {

    const navigate = useNavigate()

    const {adminHandler, user} = useAuth()
    const {getQrhash, createQrhash, isQRLoaded, isLoading, qrHash} = adminHandler

    const [QR, setQR] = useState(null)

    useEffect(() => {
        getQrhash(roomHash)
    }, []);


    // это состояние гонки бесит. отображение отстает. т.е идет запрос, а ответ показывает на предыдущий запрос.
    // раздраэается, как бороться с этим в реакте, как ловить актуальное состояние??
    // я использую useEffect слушая определенную переменную, но выполняется по два раза...
    // хотя бы в generateQR функции я делаю проверку чтобы не запускать сложную логику кода если у меня несоответствующее состояние данных
    useEffect(() => {
        GenerateQRCode()
        // console.log('QRQRQR', qrHash)
    }, [qrHash]);

    const GenerateQRCode = () => {
        if (!qrHash || qrHash?.qrcode === null) {
            setQR(null)
        } else {
            // console.log('GenerateQRCode', qrHash)
            const url = `https://localhost:9000/attendee/${qrHash.qrcode.hash}`
            setQR(null)
            QRCode.toDataURL(url, {
                width: 800,
                margin: 2,
                color: {
                    // dark: '#335383FF',
                    // light: '#EEEEEEFF'
                }
            }, (err, url) => {
                if (err) return console.error(err)

                // выводит файл в бинарном виде ??
                // console.log('QRQRQRQR', url)
                setQR(url)
            })
        }
    }

    function onCreate() {
        createQrhash(roomHash)
        getQrhash(roomHash)
    }

    if (isLoading) {
        return <Overlay><Loader/></Overlay>
    }

    return (<>
        <Block isAlignCenter={true} bottom={15}>
            <Typography size={18} weight={600} bottom={20}>{roomHash}</Typography>
            {/*{JSON.stringify(qrHash)}*/}
            {QR && qrHash && qrHash?.qrcode !== null && <>
                <img style={{width:'100%'}} src={QR}  alt={qrHash.qrcode.hash}/>
                <a href={QR} download={`qrcode_${roomHash.split('-')[0]}.png`}>Download</a>
                <Button onClick={()=> navigate(`/attendee/${qrHash.qrcode.hash}`, {replace: true})}>Перейти (тест)</Button>
            </>}

            {!qrHash || qrHash?.qrcode === null && <Button onClick={onCreate}>Create a QR</Button>}

        </Block>
    </>)
}

