import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import useStockCall from '../service/useStockCall';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (max-width: 1200px)': {
    width: '80%',
    height: '80%',
  },
  '@media (max-width: 678px)': {
    width: '90%',
    height: 'auto',
    p: 2,
  },
};
const boxStyle = {
  marginTop: '1rem',
  '@media (max-width: 678px)': {
    width: '100%',
  },
};

export default function BasicModal({ url }) {
   console.log("url",url)
    
   
  
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    image: null,
    adress: "",
    phone: "",
  });
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {getStock,AddStockFile}=useStockCall()

 
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('adress', formData.adress);
    formDataToSend.append('phone', formData.phone);
    console.log("formData",formDataToSend)

    AddStockFile(url,formDataToSend)
    
    getStock(url)
    setFormData({
    name: "",
    image: null,
    adress: "",
    phone: "",})
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}><AddCircleOutlineIcon />
      <Typography variant="caption" style={{ fontWeight: 'normal', marginLeft: '4px' }}>
                Add {`${url.toUpperCase()}`}
              </Typography>
      </Button>
      <IconButton color="primary" onClick={handleOpen}>
        
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          ADD {`${url.toUpperCase()}`}
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
          <Box mt={2}>
          
            <input
              accept="image/*"
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              style={{ display: 'block', marginBottom: '16px' }}
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="adress"
            label="Adress"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
         <Box sx={boxStyle} mt={2} display="flex" gap={2}  justifyContent="space-evenly">
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
