import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@mui/material';
const BidProducts = () => {
  const location = useLocation();
  return (
    <>
      <Card
        sx={{ minWidth: 300, maxWidth: 300 }}
        style={{ margin: '30px auto', border: '1px solid black' }}
        variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ItemName : {location.state.itemName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Id : {location.state.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Base price : {location.state.basePrice} ₹
          </Typography>
        </CardContent>
        <CardActions>
          <div>
            <TextField
              id="outlined-basic"
              label="Enter Amount"
              variant="outlined"
              color="warning"
              type="number"
              fullWidth
              onChange={() => {
                console.log('jo');
              }}
            />
          </div>
          <div>
            <Button size="large" variant="contained" color="warning" fullWidth>
              Bid
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default BidProducts;
