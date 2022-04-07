import * as React from 'react';

import {
  Avatar,
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material';
import Darkreader from 'react-darkreader';

import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';

import { useLocation, useNavigate } from 'react-router-dom';

// products import
import productData from '../data/storeData';
import ItemCard from '../Components/StoreComponents/ItemCard';

const drawerWidth = 200;

export default function Dashboard() {
  const [open, setOpen] = React.useState(null);

  React.useEffect(() => {
    setOpen(true);
    console.log(productData);
    setOpen(false);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Auction Mangement System
          </Typography>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ margin: '0 10px' }} src={location.state.photoURL} />
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
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left">
        <Toolbar />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin View" />
          </ListItem>
        </List>

        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}>
          {productData.map((item) => (
            <>
              <ItemCard
                productId={item.productId}
                productName={item.productName}
                productDescription={item.productDescription}
                productImg={item.productImg}
                productPrice={item.productPrice}
              />
            </>
          ))}
        </div>
      </Box>
    </Box>
  );
}
