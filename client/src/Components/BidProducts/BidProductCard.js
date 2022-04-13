import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import sold from '../../assets/SoldOut/sold.png';
import unsold from '../../assets/SoldOut/unsold.png';

import PropTypes from 'prop-types';

import axios from '../../axios-study';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

function getDate(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  var now = new Date(date);
  return (
    days[now.getDay()] +
    ' ' +
    months[now.getMonth()] +
    ' ' +
    now.getDate() +
    ' ' +
    now.getFullYear()
  );
}

const BidProductCard = (props) => {
  const [currentVal, setCurrentVal] = React.useState(props.basePrice);
  const [currentPrice, setCurrentPrice] = React.useState(props.basePrice);
  const [open, setOpen] = React.useState(false);
  const [successOpen, setSucessOpen] = React.useState(false);

  // console.log(props.highestBidder);

  const handleBid = () => {
    if (currentVal > currentPrice && props.balance > currentVal) {
      setCurrentPrice(currentVal);
      let data = {
        item_id: props.itemId,
        item_name: props.itemName,
        current_highest_buyer: sessionStorage.getItem('uid'),
        current_price: currentVal,
        base_price: props.basePrice
      };

      // console.log(props.highestBidder);
      axios
        .post('/update_store', data)
        .then((response) => {
          // console.log(response);
          if (response.data.status === 1) {
            props.setCount(props.count + 1);
            props.setLoading(true);
          }
        })
        .catch((error) => console.log(error));

      setSucessOpen(true);
    } else {
      setOpen(true);
    }
  };

  // console.log(props.highestBidder);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setSucessOpen(false);
  };

  var date = new Date();
  var date2 = new Date(props.time);

  console.log('Highest bidder is ', props.highestBidder);

  // console.log(props.highestBidder);
  return (
    <>
      <Card
        sx={{ minWidth: 320, maxWidth: 700 }}
        style={{
          opacity: props.loading ? '0.5' : '1'
        }}
        elevation={3}
        variant="elevation">
        <CardContent>
          {date.getTime() - date2.getTime() < 0 ? (
            <></>
          ) : (
            <CardMedia
              component="img"
              height="200"
              image={props.highestBidder == 'null' ? unsold : sold}
              alt=""
            />
          )}
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
            Current price : {props.currentPrice} ₹
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Current Highest Bidder : {props.highestBidder ? props.highestBidder.split('-')[0] : ''}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Current Highest ID : {props.highestBidder ? props.highestBidder.split('-')[1] : 'null'}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            End Time :{' '}
            {date.getTime() - date2.getTime() < 0
              ? getDate(props.time.slice(0, 10)) + ' ' + tConvert(props.time.slice(11, 16))
              : 'Bidding time is over !!'}
          </Typography>
          {/* <Typography gutterBottom variant="h5" component="div">
            Time Left : {<Countdown date={Date.now() + 8.64e8} />}
          </Typography> */}
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
              disabled={date.getTime() > date2.getTime() ? true : false}
            />
          </div>
          <div>
            <Button
              size="large"
              variant="contained"
              color="warning"
              fullWidth
              onClick={handleBid}
              disabled={date.getTime() > date2.getTime() ? true : false}>
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
  highestBidder: PropTypes.string,
  time: PropTypes.string,
  count: PropTypes.number,
  setCount: PropTypes.func,
  balance: PropTypes.number,
  loading: PropTypes.bool,
  setLoading: PropTypes.func
};

export default BidProductCard;
