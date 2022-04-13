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

import FadeLoader from 'react-spinners/FadeLoader';

import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../axios-study';

// products import
import ItemCard from '../Components/StoreComponents/ItemCard';
import { isLoggedOut } from '../redux/actions';

const drawerWidth = 200;

export default function Dashboard() {
  let [loading, setLoading] = React.useState(true);
  const [productData, setProductData] = React.useState([]);
  const location = useLocation();
  const [balance, setBalance] = React.useState();

  React.useEffect(() => {
    axios.get('/get_store').then((reponse) => {
      setProductData(reponse.data);
      console.log(reponse.data);
    });

    axios
      .get('/get_balance', { params: { uid: sessionStorage.getItem('uid') } })
      .then((response) => {
        setBalance(response.data.balance);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();
  let dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(isLoggedOut());
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', opacity: loading ? 0.5 : 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, p: 0.1 }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Auction Mangement System
          </Typography>
          <Typography>
            <Typography variant="h6" noWrap component="div">
              Welcome : {location.state.name}
            </Typography>
            <Typography variant="h6" noWrap component="div">
              User Id : {location.state.uid}
            </Typography>
          </Typography>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div">
              Balance : {balance}
            </Typography>
            <Avatar style={{ margin: '0 10px' }} src={location.state.photoURL} />
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
          <ListItem button onClick={() => navigate('/admin')}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
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
                product_id={item.product_id}
                product_name={item.product_name}
                product_baseprice={item.product_baseprice}
                balance={balance}
              />
            </>
          ))}
        </div>
      </Box>
      <FadeLoader
        color={'blue'}
        loading={loading}
        size={350}
        css={{ position: 'absolute', left: '50%', top: '50%' }}
      />
    </Box>
  );
}
