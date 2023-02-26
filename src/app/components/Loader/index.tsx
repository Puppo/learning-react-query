import { CircularProgress } from "@mui/material";
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import styles from './index.module.scss';

export default function Loader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  if (!isFetching && !isMutating) return null;

  return <div className={styles.root}>
    <CircularProgress color="primary" />
  </div>
}
