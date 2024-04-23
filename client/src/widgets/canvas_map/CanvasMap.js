import React, {useEffect, useRef, useState} from "react";

import styles from './map.module.css'
import {Map} from './lib/map'
import ObjectInfo from "../../features/map/object_info/ObjectInfo";
import Notice from "../../features/map/notice/Notice";
import Controls from "../../features/map/controls/Controls";

import marker from './lib/img/marker.png'

export default function CanvasMap({}) {

    const divRef = useRef(null);
    const canvasRef = useRef(null);

    const [map, setMap] = useState(null);
    const [notice, setNotice] = useState('')
    const [objectData, setObjectData] = useState(null)

    function handleSelectedChange(newSelected) {
        setObjectData(newSelected);
    }

    function updateObjectData(e) {
        const { name, value } = e.target;
        setObjectData({ ...objectData, [name]: value });
    }

    function saveSelectedObjectData() {
        if (map) {
            map.world.saveItemData(objectData)
        }
    }

    const updateCanvasAndMap = () => {
        if (divRef.current && canvasRef.current) {
            const { width, height } = divRef.current.getBoundingClientRect();
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;

            // Инициализация или обновление объекта карты
            if (!map) {
                const newMap = new Map(canvas);
                newMap.init();
                newMap.on('selectedChanged', handleSelectedChange);
                setMap(newMap);

            } else {
                // Если у объекта карты есть метод для обновления размеров, вызвать его здесь
                // Например: map.updateSize(width, height);
            }
        }
    };

    useEffect(() => {
        // Вызов при монтаже компонента
        updateCanvasAndMap();
        // Обновление размеров при изменении размера окна
        window.addEventListener('resize', updateCanvasAndMap);
        // Очистка
        return () => {
            map.off('selectedChanged', handleSelectedChange);
            window.removeEventListener('resize', updateCanvasAndMap);
        };
    }, []); // Пустой массив зависимостей гарантирует, что эффект выполнится один раз при монтаже

    useEffect(() => {
        console.log('OBJECTDATA',objectData)
    }, [objectData]);


    return (<div className={styles.mapDiv}>

        <div ref={divRef} className={styles.map}>
            <canvas width={'100%'} height={'100%'} ref={canvasRef}></canvas>
            <img id={'marker'} src={marker} alt="marker.png" style={{display: 'none', position: 'absolute'}}/>
        </div>

        {objectData && <ObjectInfo data={objectData} updateInfo={updateObjectData} onSave={saveSelectedObjectData} />}

        <Notice text={notice}/>

        <Controls map={map}/>

    </div>)
}