import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataExistError, DataFetchError } from '../components/DataFetchMessage';
import useStockCall from '../service/useStockCall';
import PurchaseTable from '../components/PurchaseComponent';
import InvoiceForm from '../components/InvoiceForm';

const Purchases = () => {
  const { getStock } = useStockCall();
  
  useEffect(() => {
    getStock("purchase");
  }, []);
  
  const {
    purchase,
    error,
    loading,
  } = useSelector((state) => state.stock);
  
  
  
  if (error) {
    return <DataFetchError />;
  }
  
  return (
    <div>
      {purchase.length === 0 && <DataExistError />}
      <PurchaseTable />
     
    </div>
  );
}

export default Purchases;
