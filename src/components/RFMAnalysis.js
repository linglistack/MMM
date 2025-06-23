import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ChartNarrator from './ChartNarrator';

const RFMAnalysis = () => {
  const data = [
    { recency: '0-6M', customers: 68170, percentage: 22.40 },
    { recency: '07-12M', customers: 43907, percentage: 14.43 },
    { recency: '12-18M', customers: 46275, percentage: 15.21 },
    { recency: '18-24M', customers: 32205, percentage: 10.58 },
    { recency: '24+M', customers: 113655, percentage: 37.35 }
  ];

  const totalCustomers = 304327;

  // Analytical insights with precise timing and multi-row highlighting
  const insights = [
    {
      text: "Active customer engagement shows a concerning trend. While 22.4% of customers purchased in the last 6 months, there's a significant drop in the 6-12 month period.",
      duration: 5000,
      highlightArea: {
        rows: [0, 1], // Highlighting first two rows
        style: {
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
          transition: 'background-color 0.3s ease'
        }
      }
    },
    {
      text: "The middle segments, from 7 to 18 months, show relatively stable customer retention, maintaining around 14-15% each. This suggests consistent but potentially improvable retention strategies.",
      duration: 6000,
      highlightArea: {
        rows: [1, 2], // Highlighting middle segments
        style: {
          backgroundColor: 'rgba(251, 192, 45, 0.1)',
          transition: 'background-color 0.3s ease'
        }
      }
    },
    {
      text: "A critical insight is the large inactive segment - over 37% of customers haven't purchased in 2 years. This represents a significant opportunity for reactivation campaigns.",
      duration: 6000,
      highlightArea: {
        rows: [4], // Highlighting inactive segment
        style: {
          backgroundColor: 'rgba(244, 67, 54, 0.08)',
          transition: 'background-color 0.3s ease'
        }
      }
    },
    {
      text: "Comparing recent to inactive customers reveals a potential churn risk. The ratio of active customers in the last 6 months to inactive customers is nearly 1:1.7, indicating a need for improved retention strategies.",
      duration: 7000,
      highlightArea: {
        rows: [0, 4], // Highlighting contrast between recent and inactive
        style: {
          backgroundColor: 'rgba(76, 175, 80, 0.08)',
          transition: 'background-color 0.3s ease'
        }
      }
    },
    {
      text: "Key action items: First, launch targeted reactivation campaigns for the 37% inactive segment. Second, investigate the drop between 0-6 and 7-12 months to improve early retention. Third, strengthen engagement in the 7-18 month period to prevent further churn.",
      duration: 8000,
      highlightArea: {
        rows: [0, 1, 2, 4], // Highlighting all relevant segments
        style: {
          backgroundColor: 'rgba(156, 39, 176, 0.08)',
          transition: 'background-color 0.3s ease'
        }
      }
    }
  ];

  return (
    <Box id="rfm-analysis" className="relative">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          RFM Analysis - Recency
          <Typography variant="subtitle2" color="text.secondary">
            Customer distribution by last purchase date
          </Typography>
        </Typography>
        <ChartNarrator
          chartId="rfm-analysis"
          insights={insights}
        />
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600, width: '33%' }}>Recency</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, width: '33%' }}>SUM of customers</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, width: '33%' }}>% Of Customers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.recency}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor:  'inherit',
                  transition: 'all 0.3s ease'
                }}
                className="highlight-row"
                data-row-index={index}
              >
                <TableCell component="th" scope="row">
                  {row.recency}
                </TableCell>
                <TableCell align="right">{row.customers.toLocaleString()}</TableCell>
                <TableCell align="right">{row.percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>Grand Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{totalCustomers.toLocaleString()}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>100.00%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RFMAnalysis; 