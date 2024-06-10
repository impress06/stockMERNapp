import React, { useEffect, useState, useCallback } from "react";
import useStockCall from "../service/useStockCall";
import Typography from "@mui/material/Typography";
import { debounce } from "lodash";
import { TextField } from "@mui/material";
import "../assets/css/pages.css";
import { useSelector } from "react-redux";
import BasicModal from "../modals/AddModal";
import loadingGif from "../assets/images/loading.gif";
import PaginationComponent from "../components/Pagination";
import CardModal from "../modals/CardModal";


const Firms = () => {
  const { getStock} = useStockCall();
  const {
    firm,
    loading,
    paginationInfo: { totalRecords },
  } = useSelector((state) => state.stock);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getStock("firm");
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      getStock("firm", null, null, query);
    }, 300),
    []
  );

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

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          top: "66px",
          zIndex: 1000,
          border: "1px red dashed",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <BasicModal url="firm" />

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search firms"
            variant="outlined"
            size="small"
            sx={{
              marginRight: "10px",
              "& .MuiInputBase-root": {
                height: "40px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "10px",
              },
            }}
          />
        </div>

        {searchTerm && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <Typography variant="h6" style={{ marginRight: "10px" }}>
              We found {totalRecords} Results for: {`"${searchTerm}"`}
            </Typography>
          </div>
        )}
      </div>

      {loading ? (
        <img
          style={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src={loadingGif}
          alt="Loading..."
        />
      ) : (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
              gap: "10px",
            }}
          >
            <CardModal cardData={firm} urlRoute="firm" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <PaginationComponent
              url="firm"
    
            />
          </div>
         
        </div>
      )}
    </div>
  );
};

export default Firms;
