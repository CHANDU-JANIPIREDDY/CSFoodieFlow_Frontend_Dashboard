import React, { useState } from 'react';
import { API_PATH } from '../../data/ApiPath';

const AddFirm = () => {
  const [firmname, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error('User Not Authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('firmname', firmname);
      formData.append('area', area);
      formData.append('offer', offer);
      category.forEach((value) => formData.append('category', value));
      region.forEach((value) => formData.append('region', value));
      if (image) formData.append('image', image);

      const response = await fetch(`${API_PATH}/firm/add-firm`, {
        method: 'POST',
        headers: {
          token: `${loginToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setImage(null)
        alert('Firm added Successfully');
      }else if(data.message==="vendor can have only one firm"){
        alert("Firm Already Exists 🍝. Only one firm can be added")
      }else{
        alert("Failed to add firm")
      }
      console.log('This is FirmId',data.firmId);
      const firmId = data.firmId;
      localStorage.setItem("firmId",firmId);
    } catch (error) {
      console.error('Failed to add Firm', error);
    }
  };

  return (
    <div className='form-container'>
      <form className='firm-authFormLogin' onSubmit={handleFirmSubmit}>
        <h4>ADD FIRM</h4>

        <div className='firm-label-container'>
          <label className='firm-label-name'>FIRM NAME</label><br />
          <input type="text" className="form-control" name='firmname' value={firmname} onChange={(e) => setFirmName(e.target.value)} />
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'>AREA</label><br />
          <input type="text" className="form-control" name='area' value={area} onChange={(e) => setArea(e.target.value)} />
        </div>

        <div className="checkBoxContainer">
          <label className='firm-label-name'>CATEGORY</label>
          <div className="container">
            <div className="check-box">
              <label className='firm-label-name'>VEG</label>
              <input type="checkbox" className='form-control' value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
            </div>
            <div className="check-box">
              <label className='firm-label-name'>NON-VEG</label>
              <input type="checkbox" className='form-control' value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
            </div>
          </div>
        </div>

        <div className="checkBoxContainer">
          <label className='firm-label-name'>REGION</label>
          <div className="container">
            <div className="check-box">
              <label className='firm-label-name'>South-Indian</label>
              <input type="checkbox" className='form-control' value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
            </div>
            <div className="check-box">
              <label className='firm-label-name'>North-Indian</label>
              <input type="checkbox" className='form-control' value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
            </div>
          </div>
          <div className="container">
            <div className="check-box">
              <label className='firm-label-name'>Chinese</label>
              <input type="checkbox" className='form-control' value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
            </div>
            <div className="check-box">
              <label className='firm-label-name'>Bakery</label>
              <input type="checkbox" className='form-control' value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
            </div>
          </div>
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'>OFFER</label><br />
          <input type="text" className="form-control" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />
        </div>

        <div className='firm-label-container'>
          <label className='firm-label-name'>FIRM IMAGE</label><br />
          <input type="file" className="form-control" onChange={handleImageUpload} />
        </div>

        <div className='pt-3'>
          <button className='btn btn-primary' type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
