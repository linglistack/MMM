import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ContributionByChannel = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 300
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'search_non_branded',
        'influencers',
        'podcast',
        'meta_retargeting',
        'linear_tv',
        'mailers',
        'search_branded',
        'meta_prospecting'
      ]
    },
    yAxis: {
      title: {
        text: 'Contribution ($)'
      },
      labels: {
        format: '${value}k'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '${value}k'
        }
      }
    },
    series: [{
      name: 'Contribution',
      data: [120, 95, 85, 45, 30, 15, 10, 5],
      color: '#2196f3'
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Contribution by Channel</Typography>
        <Button variant="outlined" size="small">Download Data</Button>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

export default ContributionByChannel;
