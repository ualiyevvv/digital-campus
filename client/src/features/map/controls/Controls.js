import React, {useState} from "react";
import styles from './control.module.css'
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
export default function Controls({map = null}) {

    const [editorMode, setEditorMode] = useState(null)

    function save() {
        if (map) {
            map.world.save();
        }
    }

    function editorToggle(mode) {
        if (map) {
            if (editorMode === null) {
                setEditorMode(mode)
                map.editor.enable(mode)
            } else {
                setEditorMode(null)
                map.editor.disable()
            }

            console.log('EDD', map.editor.enabled())
        }
    }


    return (<>

        <div className={styles.controls}>
            <GroupButtons>
                <Button onClick={save} width={'fin-content'} size={'small'}>💾</Button>
                <Button onClick={() => editorToggle('draw')} isActive={editorMode === 'draw'} disabled={editorMode === 'edit'} width={'fin-content'} size={'small'}>Draw</Button>
                <Button onClick={() => editorToggle('edit')} isActive={editorMode === 'edit'} disabled={editorMode === 'draw'} width={'fin-content'} size={'small'}>Edit</Button>
            </GroupButtons>
        </div>

    </>)
}