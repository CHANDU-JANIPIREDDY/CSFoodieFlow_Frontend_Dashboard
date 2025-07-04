import React, { useState } from 'react';
import { API_PATH } from '../../data/ApiPath';

function AddProduct() {
  const [productname, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const hndleBestSeller = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const firmId = localStorage.getItem('firmId');
      const loginToken = localStorage.getItem('loginToken');

      if (!loginToken || !firmId) {
        console.log("User not Authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('productname', productname);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestseller', bestseller); // ✅ Added missing field
      category.forEach((value) => formData.append('category', value));
      if (image) formData.append('image', image);

      const response = await fetch(`${API_PATH}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added Successfully');
      }
      setProductName("");
      setPrice("");
      setBestSeller(false);
      setCategory([]);
      setImage(null);
      setDescription("");

    } catch (error) {
      console.error(error.message); // ✅ Fixed error logging
      alert('Failed to add product');
    }
  };

  return (
    <div className='form-container'>
      <form className='authFormLogin' onSubmit={handleAddProduct}>
        <h4>ADD PRODUCT</h4>

        <div className='firm-label-container'>
          <label className='firm-label-name'>PRODUCT NAME</label><br />
          <input type="text" className="form-control" onChange={(e) => setProductName(e.target.value)} />
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'>PRODUCT PRICE</label><br />
          <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="checkBoxContainer">
          <label className='firm-label-name'>CATEGORY</label>
          <div className="container">
            <div className="check-box">
              <label className='firm-label-name'>VEG</label>
              <input type="checkbox" className='form-control' value='veg' onChange={handleCategoryChange} checked={category.includes('veg')} />
            </div>
            <div className="check-box">
              <label className='firm-label-name'>NON-VEG</label>
              <input type="checkbox" className='form-control' value="non-veg" onChange={handleCategoryChange} checked={category.includes('non-veg')} />
            </div>
          </div>
        </div>

        <div className="checkBoxContainer">
          <label className='firm-label-name'>BEST SELLER</label>
          <div className="container">
            <div className="check-box">
              <label className='firm-label-name'>YES</label>
              <input type="radio" className='form-control' value="true" checked={bestseller===true} name="bestseller" onChange={hndleBestSeller} />
            </div>
            <div className="check-box">
              <label className='firm-label-name'>NO</label>
              <input type="radio" className='form-control' value="false" checked={bestseller===false} name="bestseller" onChange={hndleBestSeller} />
            </div>
          </div>
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'>DESCRIPTION</label><br />
          <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'> IMAGE</label><br />
          <input type="file" className="form-control" onChange={handleImageUpload} />
        </div>

        <div className='pt-3'>
          <button className='btn btn-primary' type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
