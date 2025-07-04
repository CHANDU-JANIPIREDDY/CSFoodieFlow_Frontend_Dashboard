import React, { useState, useEffect } from 'react';
import { API_PATH } from "../data/ApiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_PATH}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('This is UseEffect');
  }, []);

  const deleteProductById = async (productId) => {
    const isConfirmed = window.confirm("Are You Sure? You Want to Delete?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${API_PATH}/product/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert('Product Deleted Successfully');
      }
    } catch (error) {
      console.error('Failed to delete Product', error);
      alert('Failed to delete Product');
    }
  };

  return (
    <div>
      {!products ? (
        <p>No Products Found</p>
      ) : (
        <table className="product-table">
          <thead className='product-headings'>
            <tr>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>IMAGE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.productname}</td>
                  <td>{item.price}</td>
                  <td>{item.image && (
                    <img src={`${API_PATH}/uploads/${item.image}`} alt={item.productname}
                      style={{ width: "50px", height: '50px', borderRadius: '50%' }} />
                  )}</td>
                  <td>
                    <button onClick={() => deleteProductById(item._id)}>Delete Item</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
