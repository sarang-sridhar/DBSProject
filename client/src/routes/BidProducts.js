import React from 'react';
import { useLocation } from 'react-router-dom';
import BidProductCard from '../Components/BidProducts/BidProductCard';
import axios from '../axios-study';

const BidProducts = () => {
  const location = useLocation();
  const [count, setCount] = React.useState(0);
  console.log(location.state);
  let data = {
    item_id: location.state.id,
    base_price: location.state.basePrice
  };

  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    axios
      .post('/get_details', data)
      .then((response) => setDetails(response.data))
      .catch((error) => console.log(error));
  }, [count]);

  console.log(details);
  return (
    <>
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
      />
    </>
  );
};

export default BidProducts;
