import React, { useState, useEffect } from 'react';
import { Plus, Search, Menu, MapPin, Edit2, Trash2, Image } from 'lucide-react';
import AddProductModal from './AddProductModal';
import DeleteModal from './DeleteModal';
import './Dashboard.css';
import img1 from "../assets/r-pics1.jpeg";
import img2 from "../assets/r-pics2.jpeg";
import img3 from '../assets/r-pics3.png'
import img4 from '../assets/r-pics4.png'
import ProductImg from '../assets/product.png'
import BrandImg from '../assets/brand.png'
import CategoryImg from '../assets/categories.png'
import InvoiceImg from '../assets/invoice.png'
import SupplierImg from '../assets/supplier.png'
import BellImg from '../assets/bell.png'
import HumanImg from '../assets/human.png'
import BrandDropdown from '../assets/brand-dropdown.png'
import CatDropdown from '../assets/cat-dropdown.png'
import Edit from '../assets/edit.png'
import Delete from '../assets/delete.png'
import Location from '../assets/location.png'
import ProductDetails from './ProductDetails';
import EditProductModal from './EditProductModal';



const generateSKU = () => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};

const initialProducts = [
  { 
    id: '101', 
    sku: '102391283', 
    name: 'CTee', 
    quantity: 10, 
    price: 199.99, 
    location: 'Talavera',
    image: img3 
  },
  { 
    id: '102', 
    sku: '120398123', 
    name: 'Eupormat', 
    quantity: 25, 
    price: 259.99, 
    location: 'Cabanatuan',
    image: img4 
  }
];

const Dashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = products.length;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductSKU, setNewProductSKU] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

 useEffect(() => {
    if (isModalOpen) {
      setNewProductSKU(generateSKU());
    }
  }, [isModalOpen]); 

  const handleAddProduct = (productData) => {
    const newProduct = {
      id: (products.length ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1).toString(),
      sku: productData.sku || generateSKU(),
      name: productData.productName,
      quantity: productData.quantity || 0,
      price: parseFloat(productData.price),
      location: productData.location,
      brand: productData.brand,
      category: productData.category,
      image: productData.image // Store the image from the modal
    };
    setProducts(prevProducts => [...products, newProduct]);
    setCurrentPage(1);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
  setIsDeleteModalOpen(false);
  setSelectedProduct(null);
};

const handleDeleteProduct = () => {
  if (selectedProduct) {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProduct.id));
  }
  handleCloseDeleteModal();
}

const handleEditClick = (product) => {
  setEditingProduct(product);
  setIsEditModalOpen(true);
  setSelectedProduct(false)
};

const handleSaveEdit = (updatedProduct) => {
  setProducts((prevProducts) =>
    prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  );
  setIsEditModalOpen(false);
  setSelectedProduct(false);
};

const handleCloseEdit = () => {
  setIsEditModalOpen(false);
  setSelectedProduct(false); 
};

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">LOGO</div>
        <nav className="nav-menu">
          <button className="nav-item active">
            <img src={ProductImg} alt="" />
            <span>Products</span>
          </button>
          <button className="nav-item">
            <img src={BrandImg} alt="" />
            <span>Brands</span>
          </button>
          <button className="nav-item">
            <img src={CategoryImg} alt="" />
            <span>Categories</span>
          </button>
          <button className="nav-item">
            <img src={InvoiceImg} alt="" />
            <span>Invoice</span>
          </button>
          <button className="nav-item">
            <img src={SupplierImg} alt="" />
            <span>Suppliers</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-image">
          <img src={BellImg} alt="" />
          <img src={HumanImg} alt="" />
         </div>
        <div className="inner-content">
          <div className="header">
            <div className="header-controls">
            <div className='product-search'> <h1 className="header-title">Products</h1>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <Search className="search-icon" />
              </div></div>
              <div className="button-group">
                <button className="filter-button"><img src={BrandDropdown} alt="" /></button>
                <button className="filter-button"><img src={CatDropdown} alt="" /></button>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="add-button"
                >
                  <Plus className="w-4 h-4" />
                  <span>Product</span>
                </button>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="product-table">
              <thead className="table-header">
                <tr>
                  {/* <th className="px-6 py-3 text-left">IMAGE</th> */}
                  <th className="px-6 py-3 text-left">PRODUCT ID</th>
                  <th className="px-6 py-3 text-left">SKU</th>
                  <th className="px-6 py-3 text-left">PRODUCT NAME</th>
                  <th className="px-6 py-3 text-left">QUANTITY</th>
                  <th className="px-6 py-3 text-left">PRICE</th>
                  <th className="px-6 py-3 text-left">LOCATION</th>
                  <th className="px-6 py-3 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="table-row" onClick={() => setSelectedProduct(product)}>
                    <td className="px-6 py-4 prod-img">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                          />
                        ) : (
                          <Image className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      {product.id}
                    </td>
                    {/* <td className="px-6 py-4"></td> */}
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">{product.price.toFixed(2)} Php</td>
                    <td className="px-6 py-4">
                      <div className="location-cell">
                        <img src={Location} alt="" />
                        {product.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="action-buttons">                       
                        <button onClick={() => handleEditClick(product)}
                          className="edit-button">
                          <img src={Edit} alt="" />
                        </button>
                        <button 
                          onClick={()=>setIsDeleteModalOpen(true)}
                          className="delete-button">
                          <img src={Delete} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              &gt;
            </button>
          </div>
    
        </div>        


        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddProduct}
          generatedSKU={newProductSKU}
        />
         
        {/* Product Details Modal  */}
        {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

        {isDeleteModalOpen && <div className="modal-overlay"></div>}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteProduct}    
          productDetails={{
            id: selectedProduct?.id,
            brand: selectedProduct?.brand,
            name: selectedProduct?.name,
            category: selectedProduct?.category
          }}
        />

        {/* Edit Modal */}
         {editingProduct && (
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEdit}
            product={editingProduct}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;