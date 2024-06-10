import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import useAxios from "../service/useAxios";

export default function InvoiceModal({ open, setOpen, data }) {
  const { axiosPrivateSimpleTokenInsist } = useAxios();
  console.log("invice ",data)
  const [formData, setFormData] = useState({
    username: "",
    firmName: "",
    brandName: "",
    productName: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        username: data?.userId?.userName || "",
        firmName: data?.firmId?.name || "",
        brandName: data?.brandId.name || "",
        productName: data?.productId.name || "",
        price: data?.price || "",
        quantity: data?.quantity || "",
      });
    }
  }, [data]);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivateSimpleTokenInsist.post(
        "/invoice",
        formData,
        {
          responseType: "blob", 
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Invoice Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="UserName"
            type="text"
            disabled
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
         {formData.firmId && ( <TextField
            fullWidth
            margin="normal"
            label="Firm Name"
            type="text"
            value={formData.firmName}
            name="firmName"
            disabled
            onChange={handleChange}
          />)}
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            type="text"
            value={formData.productName}
            name="productName"
            disabled
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Brand Name"
            type="text"
            value={formData.brandName}
            name="brandName"
            disabled
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            value={formData.price}
            name="price"
            disabled
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            value={formData.quantity}
            name="quantity"
            disabled
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Invoice
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
