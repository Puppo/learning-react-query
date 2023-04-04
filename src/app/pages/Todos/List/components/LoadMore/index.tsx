

import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useCallback } from 'react';

interface ILoadMoreProps {
  enabled: boolean;
  onClick?: () => void
}

export default function LoadMore({
  enabled,
  onClick
}: ILoadMoreProps) {

  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexFlow: 'row',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
        }}
      >
        <Button
          disabled={!enabled}
          onClick={handleClick}
        >
          Load More
        </Button>
      </Box>
    </Box>
  )
}
