import { CircularProgress } from "@mui/material";
import styles from './index.module.scss';

export default function CircularLoader() {
  return <div className={styles.root}>
    <CircularProgress color="primary" />
  </div>
}
