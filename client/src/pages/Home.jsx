import React from 'react'
import KPI from '../components/KPI'
import { useEffect } from "react"
import useStockCall from "../service/useStockCall"


import Charts from '../components/Charts'

const Home = () => {

  const {getStock}=useStockCall()
    useEffect(() => {
        getStock("sale");
        getStock("purchase")
      }, []);
  return (
    <div>
      <KPI/>
      <Charts/>
    </div>
  )
}

export default Home