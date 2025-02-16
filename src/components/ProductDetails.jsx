import React from 'react'
import './ProductDetails.css'
import ProdLogo from '../assets/prod-logo.png'



const ProductDetails = ({product, onClose}) => {
  if (!product) return null;
  
  return (
    <div className='modal-overlay'>
      <div className="modal-content">       
        <div className="product-info">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <div className="product-header">
              <div className='logo-h2'>
                <img src={ProdLogo} alt="" />
                <h2 className='modal-title'>Product Details</h2>
              </div>
               <button className='close-button' onClick={onClose}>x</button>
            </div>
            <p>Product ID: <span className='p-result'>{product.id}</span></p>
            <p>Brand: <span className='p-result'>{product.brand}</span></p>
            <p>Product Name: <span className='p-result'>{product.name}</span></p>
            <p>Category: <span className='p-result'>{product.category}</span></p>
            <p>Price: <span className='p-result'>{product.price.toFixed(2)} Php</span></p>
            <p>Location: <span className='p-result'>{product.location}</span></p>
            <p>SKU: <span className='p-result'>{product.sku}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails