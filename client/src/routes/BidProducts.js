import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
const BidProducts = () => {
  const location = useLocation();
  return (
    <>
      <Card
        sx={{ minWidth: 300, maxWidth: 300 }}
        style={{ margin: '30px auto' }}
        elevation="1"
        variant="elevation">
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
          <Button size="large" variant="outlined" fullWidth>
            Bid
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BidProducts;
