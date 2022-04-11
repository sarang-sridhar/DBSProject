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
  Box
} from '@mui/material';
import Darkreader from 'react-darkreader';

import LogoutIcon from '@mui/icons-material/Logout';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StoreIcon from '@mui/icons-material/Store';
import HistoryIcon from '@mui/icons-material/History';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// products import
import productData from '../data/storeData';
import ItemCard from '../Components/StoreComponents/ItemCard';
import { isLoggedOut } from '../redux/actions';

const drawerWidth = 200;

export default function Dashboard() {
  React.useEffect(() => {
    console.log(productData);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(isLoggedOut());
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

          <Typography variant="h6" noWrap component="div">
            Welcome : {location.state.name}
          </Typography>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div">
              Balance : {location.state.balance}
            </Typography>
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
              <DataObjectIcon />
            </ListItemIcon>
            <ListItemText primary="Live Database" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Order History" />
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
