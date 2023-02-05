import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface AppBarProps {
  auth: boolean,
  logout: () => void
}

export default function ({ auth, logout }: AppBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
  };

  return <MuiAppBar position="static"
    sx={{
      marginBottom: '20px'
    }}>
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
          Todo List
        </Link>
      </Typography>
      <div>
        {auth && (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
        {!auth && <Link to="/auth/sign-in" style={{ textDecoration: 'none', color: '#fff' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Link>}
      </div>
    </Toolbar>
  </MuiAppBar >
}