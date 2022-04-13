import React from 'react';
import { useLocation } from 'react-router-dom';
import BidProductCard from '../Components/BidProducts/BidProductCard';
import { Container } from '@mui/material';
import axios from '../axios-study';
import FadeLoader from 'react-spinners/FadeLoader';

const BidProducts = () => {
  const location = useLocation();
  const [count, setCount] = React.useState(0);
  // console.log(location.state);
  let data = {
    item_id: location.state.id,
    base_price: location.state.basePrice
  };

  let [loading, setLoading] = React.useState(true);

  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    axios
      .post('/get_details', data)
      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [count]);

  // console.log(details);
  return (
    <Container
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <BidProductCard
        count={count}
        setCount={setCount}
        itemName={location.state.itemName}
        itemId={location.state.id}
        basePrice={location.state.basePrice}
        currentPrice={details.current_price}
        highestBidder={details.current_highest_buyer}
        time={details.time}
        balance={location.state.balance}
        loading={loading}
        setLoading={setLoading}
      />
      <FadeLoader
        color={'blue'}
        loading={loading}
        size={350}
        css={{ position: 'absolute', left: '50%', top: '50%' }}
      />
    </Container>
  );
};

export default BidProducts;
