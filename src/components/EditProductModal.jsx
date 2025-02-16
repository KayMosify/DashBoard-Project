import React, { useState, useEffect } from "react";
import styles from "./EditProductModal.module.css"; // Import module.css
import { X, Upload, ImagePlus } from 'lucide-react';
import img1 from '../assets/r-pics1.jpeg'
import img2 from '../assets/r-pics2.jpeg'
import img3 from '../assets/r-pics3.png'
import img4 from '../assets/r-pics4.png'

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  if (!isOpen || !product) return null;

  const [editedProduct, setEditedProduct] = useState({ ...product });

  const availableImages = [ img1, img2, img3, img4 ];
  const [showImages, setShowImages] = useState(false); 
  
  // Sample Brands and Categories
   const brandOptions = ['Bench', 'MSE', 'Natasha'];
   const categoryOptions = ['Jeans', 'Tees', 'Pants'];


  useEffect(() => {
    if (product) {
       setEditedProduct(product); 
    }
  }, [product]);


 const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleImageSelect = (imagePath) => {
    setEditedProduct(prev => ({ ...prev, image: imagePath }));
    setShowImages(false);
  };


  const handleSave = () => {
    onSave(editedProduct);
    onClose(); // Close modal after saving
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className="modal-header">
          <h2 className="modal-title">Update Product</h2>
          <button onClick={onClose} className="close-button">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p>Product ID: {editedProduct?.id}</p>

        {/* Image Upload */}
        <div className={styles.imageUpload}>
          <label className="form-label required-field">Widget</label>

          {editedProduct.image ? (
            <div className="selected-image">
              <img src={editedProduct.image} alt="Selected" className="product-thumbnail" />
              <button className="remove-image" onClick={() => setEditedProduct(prev => ({ ...prev, image: "" }))}>
                Remove
              </button>
            </div>
          ) : (
            <div className="widget-placeholder" onClick={() => setShowImages(!showImages)}>
              <ImagePlus className="widget-icon" />
              <p>Add Widget</p>
            </div>
          )}

          {showImages && (
            <div className="image-grid">
              {availableImages.map((img, index) => (
                <div key={index} className="image-option" onClick={() => handleImageSelect(img)}>
                  <img src={img} alt={`Product ${index + 1}`} className="product-thumbnail" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="form-grid">
          <div className={styles.formGroup}>
          <label className="form-label required-field">Brand</label>
          <select 
           name="brand" 
           value={editedProduct.brand} 
           onChange={handleChange} 
           placeholder="Brand Name" className="form-input"
           required
           >  
           <option value="">Select Brand</option>
            {brandOptions.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>        
        </div>

        <div className={styles.formGroup}>
           <label className="form-label required-field">Category</label>
          <select 
            name="category" 
            value={editedProduct.category} 
            onChange={handleChange} 
            placeholder="Category" 
            className="form-input" 
            required
          >
           <option value="">Select Category</option>
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className="form-label required-field">Product Name</label>
          <input type="text" name="name" value={editedProduct.name} onChange={handleChange} placeholder="Product Name" className="form-input"/>          
        </div>

        <div className={styles.formGroup}>
          <label className="form-label required-field">Price</label>
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} placeholder="Price" className="form-input"/>
        </div>

        <div className={styles.formGroup}>
           <label className="form-label">Stock Keeping Unit (SKU)</label>
          <input type="text" name="sku" value={editedProduct.sku} onChange={handleChange} placeholder="SKU" className="form-input"/>
        </div>

        <div className={styles.formGroup}>
          <label className="form-label">Location</label>
          <input type="text" name="location" value={editedProduct.location} onChange={handleChange} placeholder="Location" className="form-input"/>
        </div>

        </div>
        {/* Buttons */}
        <div className={styles.modalFooter}>
          <button className={styles.discardButton} onClick={onClose}>Discard</button>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
