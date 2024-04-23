import React from "react";
import styles from './objectInfo.module.css';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import Input from "../../../shared/ui/input/Input";
import Button from "../../../shared/ui/button/Button";

export default function ObjectInfo({data = {}, updateInfo = f=>f, onSave = f=>f}) {

    return (<>
        <div className={styles.objectInfo}>
            <Block padding={10}>
                <Input
                    type={'text'}
                    onChange={updateInfo}
                    value={data.category ? data.category : ''}
                    name={'category'}
                />
                <Typography bottom={6}></Typography>
                <Input
                    type={'text'}
                    onChange={updateInfo}
                    value={data.name}
                    name={'name'}
                />
                <Typography bottom={6}></Typography>
                <Input
                    type={'text'}
                    onChange={updateInfo}
                    value={data.description}
                    name={'description'}
                />
                <Button onClick={onSave} size={'small'} top={10}>Save</Button>
            </Block>
        </div>
    </>)
}