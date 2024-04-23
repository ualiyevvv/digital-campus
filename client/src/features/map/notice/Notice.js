import React from "react";
import styles from "./notice.module.css";
import Typography from "../../../shared/ui/typography/Typography";

export default function Notice({text = ''}) {

    return (<>
        {text && <div className={styles.notice}>
            <Typography size={18} weight={600} color={'grey'} align={'center'}>{text}</Typography>
        </div>}
    </>)
}