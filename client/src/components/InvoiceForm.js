import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    firmId: '',
    productId: '',
    brandId: '',
    price: 0,
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/invoice', formData, {
        responseType: 'blob', // PDF döneceği için blob tipinde
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="userId" placeholder="User ID" onChange={handleChange} />
      <input type="text" name="firmId" placeholder="Firm ID" onChange={handleChange} />
      <input type="text" name="productId" placeholder="Product ID" onChange={handleChange} />
      <input type="text" name="brandId" placeholder="Brand ID" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
