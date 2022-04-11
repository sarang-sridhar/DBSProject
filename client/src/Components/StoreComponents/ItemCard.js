import React from 'react';

import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ItemCard = (props) => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 300, margin: 1 }} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ItemName : {props.product_name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Id : {props.product_id}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Base price : {props.product_baseprice} ₹
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" variant="outlined">
          Bid
        </Button>
        <Button size="large" color="error" variant="outlined">
          Leave Bid
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  product_name: PropTypes.string,
  product_id: PropTypes.string,
  product_baseprice: PropTypes.number
};

export default ItemCard;
