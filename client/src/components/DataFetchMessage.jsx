import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export const DataFetchError = () => {
  return (
    <diV>
      <Alert variant="outlined" severity="error">
      There is a mistake to load Data can not Fetch from server please contact tecnical Support (551 181 56 05)
      </Alert>
    
    </diV>
  );
};

export const DataExistError = () => {
  return (
    <div>
      <Alert variant="outlined" severity="error">
      There is no data found. Your search didn't match any results, or your selected category is empty. Please search again or change the category.

      </Alert>
    </div>
  );
};

const DataFetchMessage = () => {
  return <div>DataFetchMessage</div>;
};

export default DataFetchMessage;
