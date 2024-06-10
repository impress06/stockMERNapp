import React, { useState, useEffect, useCallback } from "react";
import useStockCall from "../service/useStockCall";
import "../modals/style/table.css";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, TextField } from "@mui/material";
import PaginationComponent from "./Pagination";
import ProductAddModal from "../modals/ProductAddModal";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [perLimit, perSetLimit] = useState("10");
  const [params, setParams] = useState({});
  const [open, setOpen] = useState(false);
  
  
 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const debouncedSearch = useCallback(
    debounce((query) => {
      getStock("product", perLimit, null, query, categoryName);
    }, 300),
    []
  );

  useEffect(() => {
    getStock("category");
  }, []);

  const { getStock, deleteStock } = useStockCall();
  const {
    product,

    category,

    paginationInfo: { totalRecords },
  } = useSelector((state) => state.stock);

  useEffect(() => {
    if (categoryName === "All") {
      getStock("product", perLimit, null, params);
    } else {
      getStock("product", perLimit, null, params, categoryName);
    }
  }, [perLimit, categoryName, params]);

  const handleSort = (e) => {
    console.log("sort", e.target.value);
    setParams({
      action: "sort",
      actionField: "quantity",
      value: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const sendParamsVariables = {
      action: "search",
      actionField: "name",
      value,
    };
    debouncedSearch(sendParamsVariables);
  };

  const handleDelete = (url, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      deleteStock(url, id);
    }
    getStock("product", perLimit, null, {}, categoryName);
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
        <Button onClick={handleOpen}>
          <AddCircleOutlineIcon />
          ADD PRODUCT
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
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>Categories</div>
                  <div>
                    <select
                      onChange={(e) => setcategoryName(e.target.value)}
                      defaultValue="All"
                    >
                      <option value="All">All</option>
                      {category.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
              <th>
                <div className="nameRow">
                  <div>Name:</div>
                  <TextField
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    sx={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px",
                        color: "whitesmoke",
                      },
                      "& .MuiInputLabel-root": {
                        color: "whitesmoke",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "whitesmoke",
                      },
                    }}
                  />
                </div>
              </th>
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>Stock</div>
                  <div>
                    <select onChange={(e) => handleSort(e)}>
                      <option value="desc">DESC</option>
                      <option value="asc">ASC</option>
                    </select>
                  </div>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((item, index) => (
              <tr key={index}>
                <td>{item.categoryId?.name}</td>
                <td>{item?.name}</td>
                <td>{item?.quantity}</td>
                <td>
                  <DeleteIcon
                    style={{ color: "#4ABD7F" }}
                    onClick={() => handleDelete("product", item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent url="product" category={categoryName} />
      <ProductAddModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProductTable;
