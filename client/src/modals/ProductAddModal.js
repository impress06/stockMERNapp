import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useAxios from "../service/useAxios";
import useStockCall from "../service/useStockCall";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width:1200px)": {
    width: "80%",
    height: "80%",
  },
  "@media (max-width:678px)": {
    width: "90%",
    height: "auto",
    p: 2,
  },
};

export default function ProductAddModal({
  url,
  open,
  handleOpen,
  handleClose,
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    categoryId: "",
    brandId: "",
  });

  const { getStock, AddStock } = useStockCall();

  const { category, brand } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formData", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    AddStock("product", formData);

    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Product
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoryId-label">Category</InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              label="Category"
              onChange={handleChange}
            >
              {category.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="brandId-label">Brand</InputLabel>
            <Select
              labelId="brandId-label"
              id="brandId"
              name="brandId"
              value={formData.brandId}
              label="Brand"
              onChange={handleChange}
            >
              {brand.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2} display="flex" gap={2} justifyContent="space-evenly">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
