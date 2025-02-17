import React from 'react';
import './ItemCard.css';
import { IItem } from '../../@types';

const ItemCard: React.FC<{ item: IItem }> = ({ item }) => {
  const calculateFinalPrice = () => {
    return (item.price - (item.price * item.discount) / 100).toFixed(2);
  };

  return (
    <div className="item-card">
      <div className="card-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-category">{item.category}</span>
      </div>
      <div className="price-info">
        <span className="original-price">${item.price}</span>
        {item.discount > 0 && (
          <span className="discount">-{item.discount}%</span>
        )}
      </div>
      <div className="final-price">${calculateFinalPrice()}</div>
     
    </div>
  );
};


export default ItemCard;
