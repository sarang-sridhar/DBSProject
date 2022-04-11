import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import PropTypes from 'prop-types';

import axios from '../../axios-study';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BidProductCard = (props) => {
  const [currentVal, setCurrentVal] = React.useState(props.basePrice);
  const [currentPrice, setCurrentPrice] = React.useState(props.basePrice);
  const [open, setOpen] = React.useState(false);
  const [successOpen, setSucessOpen] = React.useState(false);

  const handleBid = () => {
    if (currentVal > currentPrice) {
      let data = {
        item_id: props.itemId,
        item_name: props.itemName,
        current_highest_buyer: 'bhanu',
        current_price: currentVal,
        base_price: props.basePrice
      };
      axios.post('/update_store', data).then((response) => {
        console.log(response);
      });
      setCurrentPrice(currentVal);
      setSucessOpen(true);
    } else {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setSucessOpen(false);
  };

  return (
    <>
      <Card
        sx={{ minWidth: 320, maxWidth: 500 }}
        style={{ margin: '30px auto', border: '1px solid black' }}
        variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ItemName : {props.itemName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Id : {props.itemId}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Base price : {props.basePrice} ₹
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Current price : {currentPrice} ₹
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Current Highest Bidder : {props.currentHighestBidder}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{ width: '80%' }}>
            <TextField
              id="outlined-basic"
              label="Enter Amount"
              variant="outlined"
              color="warning"
              type="number"
              fullWidth
              onChange={(e) => setCurrentVal(e.target.value)}
            />
          </div>
          <div>
            <Button size="large" variant="contained" color="warning" fullWidth onClick={handleBid}>
              Bid
            </Button>
          </div>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Enter A Valid Amount !!
        </Alert>
      </Snackbar>

      <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Bid Sucessfully Placed !!
        </Alert>
      </Snackbar>
    </>
  );
};

BidProductCard.propTypes = {
  itemName: PropTypes.string,
  itemId: PropTypes.string,
  basePrice: PropTypes.number,
  currentPrice: PropTypes.number,
  currentHighestBidder: PropTypes.string
};

export default BidProductCard;
