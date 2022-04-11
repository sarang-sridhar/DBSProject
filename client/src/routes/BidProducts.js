import React from 'react';
import { useLocation } from 'react-router-dom';
import BidProductCard from '../Components/BidProducts/BidProductCard';

const BidProducts = () => {
  const location = useLocation();

  return (
    <>
      <BidProductCard
        itemName={location.state.itemName}
        itemId={location.state.id}
        basePrice={location.state.basePrice}
        currentPrice={location.state.basePrice}
      />
    </>
  );
};

export default BidProducts;
