import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductTable from '../components/ProductComponent';
import { DataExistError, DataFetchError } from '../components/DataFetchMessage';
import useStockCall from '../service/useStockCall';

const ProductS = () => {
  const { getStock } = useStockCall();
  
  useEffect(() => {
    getStock("product");
  }, []);
  
  const {
    product,
    error
  } = useSelector((state) => state.stock);
  
  
  
  if (error) {
    return <DataFetchError />;
  }
  
  return (
    <div>
      {product.length === 0 && <DataExistError />}
      <ProductTable />
    </div>
  );
}

export default ProductS;
