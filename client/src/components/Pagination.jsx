import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { setCurrentPage } from "../features/stockSlice";
import useStockCall from "../service/useStockCall";
import loadingGif from "../assets/images/loading.gif";

const PaginationComponent = ({ url, sear,category }) => {
  const dispatch = useDispatch();
  const { paginationInfo} = useSelector((state) => state.stock);
 

  const {
    filter,
    limit,
    page,
    search,
    pages: { current, total },
    skip,
    sort,
    totalRecords,
  } = paginationInfo;

  const { getStock } = useStockCall();

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));

    getStock(url, limit, value, sear,category);
    
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      
        <Pagination
          count={total}
          page={current}
          onChange={handleChange}
          color="primary"
        />
      
    </div>
  );
};

export default PaginationComponent;
