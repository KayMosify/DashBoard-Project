import React, { useState, useEffect } from 'react';
import { X, Upload, ImagePlus } from 'lucide-react';
import './ProductModal.css';
import img1 from '../assets/r-pics1.jpeg'
import img2 from '../assets/r-pics2.jpeg'
import img3 from '../assets/r-pics3.png'
import img4 from '../assets/r-pics4.png'

const AddProductModal = ({ isOpen, onClose, onSave, generatedSKU }) => {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: '',
    price: '',
    sku: generatedSKU,
    location: '',
    quantity: 1,
    image: ''
  });

   const availableImages = [ img1, img2, img3, img4 ];
   const [showImages, setShowImages] = useState(false); 

   // Sample Brands and Categories
   const brandOptions = ['Bench', 'MSE', 'Natasha'];
   const categoryOptions = ['Jeans', 'Tees', 'Pants'];

  // Generate SKU when modal opens
 useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, sku: generatedSKU }));
    }
  }, [isOpen, generatedSKU]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (imagePath) => {
    setFormData(prev => ({ ...prev, image: imagePath }));
    setShowImages(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add Product</h2>
          <button onClick={onClose} className="close-button">
            <X className="w-6 h-6" />
          </button>
        </div>

       <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required-field">Widget</label>
            {!showImages ? (
              <div
                className="widget-placeholder"
                onClick={() => setShowImages(true)}
              >
                <ImagePlus className="widget-icon" />
                <p>Add Widget</p>
              </div>
            ) : (
              <div className="image-grid">
                {availableImages.map((img, index) => (
                  <div
                    key={index}
                    className={`image-option ${
                      formData.image === img ? "selected" : ""
                    }`}
                    onClick={() => handleImageSelect(img)}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="product-thumbnail"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand & Category as Dropdowns */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required-field">Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="form-input"
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

            <div className="form-group">
              <label className="form-label required-field">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
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

            <div className="form-group">
              <label className="form-label required-field">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required-field">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className="form-input"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label required-field">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="form-input"
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Keeping Unit (SKU)</label>
              <input
                type="text"
                name="sku"
                value={formData.sku} readOnly
                // onChange={handleInputChange}
                // placeholder="SKU"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="form-input"
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={onClose}
              className="discard-button"
            >
              Discard
            </button>
            <button
              type="submit"
              className="save-button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;