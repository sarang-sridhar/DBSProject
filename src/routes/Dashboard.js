import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Avatar, Button } from '@mui/material';
import Darkreader from 'react-darkreader';

import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import SellIcon from '@mui/icons-material/Sell';

import { useLocation, useNavigate } from 'react-router-dom';


const drawerWidth = 200;

export default function Dashboard() {

  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout=()=>{
    navigate('/') ;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}

      >
        <Toolbar
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h6" noWrap component="div">
            Auction Mangement System
          </Typography>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              style={{ margin: '0 10px' }}
              src={location.state.photoURL}
            />
            <Button 
            endIcon={<LogoutIcon/>}
            variant="outlined"
            color="inherit"
            style={{ margin: '0 10px' }}
            onClick={handleLogout}
            >
              LOG OUT
            </Button>
            <Darkreader />
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="View Store" />
          </ListItem>
          <ListItem button >
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Sell Something" />
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin View" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}
