import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import OverviewCard from './OverviewCard';
import MarketingEffectiveness from './MarketingEffectiveness';
import PerformanceByChannel from './PerformanceByChannel';
import ContributionByChannel from './ContributionByChannel';

const Dashboard = () => {
  const overviewData = {
    baselineOutcome: 370000,
    paidOutcome: 313000,
    totalOutcome: 632000,
    totalSpend: 210000,
    paidROI: 1.4,
    blendedROI: 3.0
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <Typography variant="h5" gutterBottom>
        You spent $210k with a 1.4x paid ROI over the last 7 days
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <OverviewCard data={overviewData} />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <MarketingEffectiveness />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <PerformanceByChannel />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <ContributionByChannel />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
