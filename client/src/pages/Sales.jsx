import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataExistError, DataFetchError } from '../components/DataFetchMessage';
import useStockCall from '../service/useStockCall';
import SaleTable from '../components/SaleComponent';

const Sales = () => {
  const { getStock } = useStockCall();
  
  useEffect(() => {
    getStock("sale");
  }, []);
  
  const {
    sale,
    error
  } = useSelector((state) => state.stock);
  
  
  
  if (error) {
    return <DataFetchError />;
  }
  
  return (
    <div>
      {sale.length === 0 && <DataExistError />}
      <SaleTable />
    </div>
  );
}

export default Sales;
