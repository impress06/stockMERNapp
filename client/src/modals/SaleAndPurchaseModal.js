import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useStockCall from "../service/useStockCall";
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

export default function SaleAndPurchasetModal({
  url,
  open,
  handleOpen,
  handleClose,
  formData,
  setFormData,
}) {
  const { getStock, putStock, postStock } = useStockCall();

  React.useEffect(() => {
    getStock("firm");
    getStock("brand");
    getStock("product");
    getStock("purchase");
  }, []);

  const { product, brand, firm } = useSelector((state) => state.stock);
  const { _id } = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      userId: _id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.id) {
      putStock(url, formData.id, formData);
    } else {
      postStock(url, formData);
    }

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
            {formData?.id ? "EDIT" : "ADD"} {`${url.toUpperCase()}`}
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="productId-label">Product Name</InputLabel>
            <Select
              labelId="productId-label"
              id="productId"
              name="productId"
              value={formData.productId}
              label="Product"
              onChange={handleChange}
            >
              {product.map((item) => (
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

          {formData.firmId && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="firmId-label">Firm Name</InputLabel>
              <Select
                labelId="firmId-label"
                id="firmId"
                name="firmId"
                value={formData.firmId}
                label="Firm"
                onChange={handleChange}
              >
                {firm.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="quantity"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

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
