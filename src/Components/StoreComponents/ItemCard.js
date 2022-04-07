import React from 'react';

import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ItemCard = (props) => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 300, margin: 1 }} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ItemName : {props.productName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Id : {props.productId}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Price : {props.productPrice.toString()} ₹
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" variant="outlined">
          Bid
        </Button>
        <Button size="large" color="warning" variant="outlined">
          Leave Bid
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  productName: PropTypes.string,
  productId: PropTypes.string,
  productPrice: PropTypes.number
};

export default ItemCard;
