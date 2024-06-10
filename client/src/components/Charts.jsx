import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Grid, Container, Card, Typography } from '@mui/material';

const valueFormatter = (number) => {
  return "$ " + new Intl.NumberFormat("en-US").format(number).toString();
};

const Charts = () => {
  const { sale, purchase } = useSelector((state) => state.stock);

  const salesData = sale?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.priceTotal,
  })) || [];

  const purchasesData = purchase?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.priceTotal,
  })) || [];

  
  const combinedDataMap = {};

  salesData.forEach((item) => {
    if (!combinedDataMap[item.date]) {
      combinedDataMap[item.date] = { date: item.date, sale: 0, purchase: 0, profit: 0 };
    }
    combinedDataMap[item.date].sale += item.amount;
  });

  purchasesData.forEach((item) => {
    if (!combinedDataMap[item.date]) {
      combinedDataMap[item.date] = { date: item.date, sale: 0, purchase: 0, profit: 0 };
    }
    combinedDataMap[item.date].purchase += item.amount;
  });

  const combinedData = Object.values(combinedDataMap).map((item) => {
    return {
      ...item,
      profit: item.sale - item.purchase,
    };
  });

  const pieData = [
    { name: 'Total Sales', value: salesData.reduce((sum, item) => sum + item.amount, 0) },
    { name: 'Total Purchases', value: purchasesData.reduce((sum, item) => sum + item.amount, 0) },
    { name: 'Total Profit', value: combinedData.reduce((sum, item) => sum + item.profit, 0) },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 15 }}>
        Sales, Purchase, and Profit Data
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card>
            <Typography variant="h6" gutterBottom>
              Total Sales, Purchases, and Profit (USD)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={valueFormatter} />
                <Legend />
                <Bar dataKey="sale" fill="#8884d8" name="Sales" />
                <Bar dataKey="purchase" fill="#82ca9d" name="Purchases" />
                <Bar dataKey="profit" fill="#ffc658" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <Typography variant="h6" gutterBottom>
              Total Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={valueFormatter} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
