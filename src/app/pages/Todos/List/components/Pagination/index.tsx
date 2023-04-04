

import MuiPagination from '@mui/material/Pagination';
import Box from '@mui/system/Box';

interface IPaginationProps {
  currentPage: number;
  pages: number;
  setPage: (page: number) => void
}

export default function Pagination({
  currentPage,
  pages,
  setPage
}: IPaginationProps) {
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
        <MuiPagination
          size="small"
          page={currentPage}
          count={pages}
          onChange={(_, page) => {
            setPage(page)
          }}
        />
      </Box>
    </Box>
  )
}
