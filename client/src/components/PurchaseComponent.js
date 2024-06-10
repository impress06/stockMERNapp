import React, { useState, useEffect, useCallback } from "react";
import useStockCall from "../service/useStockCall";
import "../modals/style/table.css";
import {  useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PaginationComponent from "./Pagination";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InvoiceModal from "../modals/InvoiceModal";
import PurchaseEditModal from "../modals/SaleAndPurchaseModal";

const PurchaseTable = () => {
  const [categoryName, setcategoryName] = useState("");
  const [perLimit, perSetLimit] = useState("10");
  const [params, setParams] = useState({});
  const [open, setOpen] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [purchaseEditData, setPurchaseEditData] = useState(null);
  
 


  

  const actions = [
    { icon: <ReceiptIcon />, name: 'Invoice', onClick:(data)=> handleOpenInvoice(data) },
    { icon: <ModeEditOutlinedIcon/>, name: 'Edit', onClick:(data)=> handleOpenEdit(data)},
    { icon: <HighlightOffOutlinedIcon/>, name: 'Delete' ,onClick:(data)=> handleDelete("purchase",data._id)  },
  ];

  const handleOpenInvoice = (data) => {
    console.log("invoice data",data)
    setSelectedData(data);
    setOpenInvoice(true);
    
  };
  const [formData, setFormData] = React.useState({
    id:"",
    brandId: "",
    firmId: "",
    productId: "",
    userId: "",
    price: "",
    quantity: "",
   
  });
  const handleClose = () => {
    setFormData({
      id:"",
      brandId: "",
      firmId: "",
      productId: "",
      userId: "",
      price: "",
      quantity: ""})
      setOpen(false);
  }
    

 
const handleOpenEdit=(data)=>{
 
  if(data._id){
    setFormData({
      id:data?._id,
      userId: data?.userId._id,
      brandId: data?.brandId._id,
      productId: data?.productId._id,
      firmId: data?.firmId._id,
      price: data?.price,
      quantity: data?.quantity,
   })

  }
 
  

  setOpen(true)
  


}



  useEffect(() => {
    getStock("purchase");
  }, []);

  const { getStock, deleteStock } = useStockCall();
  const {
    purchase,
    paginationInfo: { totalRecords },
  } = useSelector((state) => state.stock);
  

  const handleSort = (e) => {
    console.log("sort", e.target.value);
    setParams({
      action: "sort",
      actionField: "quantity",
      value: e.target.value,
    });
  };
  useEffect(() => {
   
      getStock("purchase", perLimit, null, params, categoryName);
    
  }, [perLimit, params]);

  const handleDelete = (url, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      deleteStock(url, id);
    }
    getStock("purchase", perLimit, null, {}, categoryName);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          margin: "0 20px",
        }}
      >
        <Button onClick={handleOpenEdit}>
          <AddCircleOutlineIcon />
          ADD PURCHASE
        </Button>
        <div>
          <p style={{ color: "black", fontWeight: "bold" }}>Per a Page</p>
          <select onChange={(e) => perSetLimit(e.target.value)}>
            <option value="">All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Purchased By</th>
              <th>Product Name</th>
              <th>Brand Name</th>
              <th>Firm Name</th>
              <th>Price</th>
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>Quantity</div>
                  <div>
                    <select onChange={(e) => handleSort(e)}>
                      <option value="desc">DESC</option>
                      <option value="asc">ASC</option>
                    </select>
                  </div>
                </div>
              </th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchase?.map((item, index) => (
              <tr key={index}>
                <td>{item.userId?.userName}</td>
                <td>{item?.productId.name}</td>
                <td>{item?.brandId.name}</td>
                <td>{item?.firmId.name}</td>
                <td>{item?.price}</td>
                <td>{item?.quantity}</td>
                <td>{item?.priceTotal}</td>
                <td>
                  <Box sx={{ height: 135, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', bottom: 15, right: 15 }}
                      icon={
                        <SpeedDialIcon
                          sx={{
                            width: 20,
                            height: 20,
                            '& .MuiFab-primary': {
                              width: 20,
                              height: 20,
                            },
                            '& .MuiSpeedDialIcon-icon': {
                              fontSize: 20,
                            },
                          }}
                        />
                      }
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={() => action.onClick(item)}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent url="purchase" category={categoryName} />
      <PurchaseEditModal
        open={open}
        handleEdit={purchaseEditData}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        url="purchase"
      />
      <InvoiceModal
        open={openInvoice}
        setOpen={setOpenInvoice}
        
        handleOpen={handleOpenInvoice}
        url="a"
        data={selectedData}
      />
    </div>
  );
};

export default PurchaseTable;
