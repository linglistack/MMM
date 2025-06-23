import React, { useState, useEffect, useRef } from 'react';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';

const tableData = [
  { group: 'Not Opted In', subgroup: 'Control', reach: 3527, conversions: 13, cr: '0.37%', revenue: 875.24, ccr: '0.37%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'Not Opted In', subgroup: 'Conversion Targeting', reach: 11077, conversions: 72, cr: '0.65%', revenue: 2260.74, ccr: '0.37%', lift: '43.29%', spend: 1813.78, aaRevenue: 978.77, aaROAS: '0.53963' },
  { group: 'Not Opted In', subgroup: 'R&F Targeting', reach: 10877, conversions: 45, cr: '0.41%', revenue: 2675.42, ccr: '0.37%', lift: '10.91%', spend: 1805.84, aaRevenue: 291.86, aaROAS: '0.16162' },
  { group: 'Opted In', subgroup: 'Control', reach: 1211, conversions: 31, cr: '2.56%', revenue: 1487.63, ccr: '2.56%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'Opted In', subgroup: 'Conversion Targeting', reach: 3800, conversions: 93, cr: '2.45%', revenue: 4419.24, ccr: '2.56%', lift: '-4.60%', spend: 622.22, aaRevenue: -203.14, aaROAS: '-0.3265' },
  { group: 'Opted In', subgroup: 'R&F Targeting', reach: 3645, conversions: 94, cr: '2.58%', revenue: 4014.66, ccr: '2.56%', lift: '0.74%', spend: 605.16, aaRevenue: 29.59, aaROAS: '0.0489' },
  { group: 'All Customers', subgroup: 'Control', reach: 4738, conversions: 44, cr: '0.93%', revenue: 2362.87, ccr: '0.93%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'All Customers', subgroup: 'Conversion Targeting', reach: 14877, conversions: 165, cr: '1.11%', revenue: 6679.98, ccr: '0.93%', lift: '16.27%', spend: 2436.00, aaRevenue: 1086.73, aaROAS: '0.44611' },
  { group: 'All Customers', subgroup: 'R&F Targeting', reach: 14522, conversions: 139, cr: '0.96%', revenue: 6690.08, ccr: '0.93%', lift: '2.98%', spend: 2411.00, aaRevenue: 199.25, aaROAS: '0.08264' },
];

const groupedData = tableData.reduce((acc, row) => {
  if (!acc[row.group]) {
    acc[row.group] = [];
  }
  acc[row.group].push(row);
  return acc;
}, {});

const insights = [
    {
        text: "Why We Ran This Test. We wanted to see if Facebook ads—specifically Conversion Targeting and Reach & Frequency Targeting—could actually drive more conversions and revenue compared to doing nothing (our control group). Also, we were curious: Would people who aren't getting our emails respond better to ads?",
        highlight: { type: 'card', id: 'purpose' }
    },
    {
        text: "What We Thought Might Happen. Conversion targeting would do better than R&F targeting. People not opted into email would be more impacted by ads—they're not already hearing from us, so Facebook could make a bigger difference.",
        highlight: { type: 'card', id: 'hypothesis' }
    },
    {
        text: "How We Set It Up. We split customers into 3 groups: Control (no ads), Conversion Targeting, and R&F Targeting. We also broke them down by email opt-in status—to see if that changed results. Key things we looked at: conversions, revenue, lift vs. control, and ROAS.",
        highlight: { type: 'card', id: 'design' }
    },
    {
        text: "Now let's look at the results for all customers. Conversion Targeting worked best, with a 16% lift in conversions.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And a solid ROAS of point-four-five.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "R&F was weaker, showing a small 3% lift.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'R&F Targeting', column: 'Lift %' }
    },
    {
        text: "And a low ROAS of just point-zero-eight.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'R&F Targeting', column: 'aaROAS' }
    },
    {
        text: "For non-email opted-in customers, this group saw the biggest impact. Conversion Targeting had an impressive 43% lift.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And a strong ROAS of point-five-four.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "Even R&F worked okay here with an 11% lift.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'R&F Targeting', column: 'Lift %' }
    },
    {
        text: "However, for customers already on our email list, ads didn't really help. In fact, Conversion Targeting had negative lift and negative ROAS.",
        highlight: { type: 'group', name: 'Opted In' }
    },
    {
        text: "Conversion Targeting had negative lift.",
        highlight: { type: 'cell', group: 'Opted In', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And negative ROAS, showing this was actually wasteful spending.",
        highlight: { type: 'cell', group: 'Opted In', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "So what this tells us is that targeting people not getting our emails is where Facebook ads shine. If someone's already engaged via email, adding Facebook doesn't add much, and might even be wasteful.",
        highlight: { type: 'group', name: 'Not Opted In' }
    },
    {
        text: "This means Conversion Targeting is the clear winner—more efficient and more impactful. R&F isn't worth the spend unless we have extra budget and a specific goal, like awareness.",
        highlight: { type: 'col', name: 'aaROAS' }
    },
];

const customerLevelData = [
  { recency: '0-6M', frequency: '1X', email_opt: 0, customer_id: 30865, orders: 165, fb_co_lift_pct: '0.321', fb_co_stat_sig: '0.727', fb_rf_lift_pct: '-0.012', fb_rf_stat_sig: '-0.027', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 53, fb_co_incr_revenue: 5615, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '1X', email_opt: 1, customer_id: 11197, orders: 252, fb_co_lift_pct: '-0.286', fb_co_stat_sig: '-0.623', fb_rf_lift_pct: '-0.266', fb_rf_stat_sig: '-0.588', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '2X', email_opt: 0, customer_id: 8159, orders: 74, fb_co_lift_pct: '0.563', fb_co_stat_sig: '0.888', fb_rf_lift_pct: '-0.721', fb_rf_stat_sig: '-0.671', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 42, fb_co_incr_revenue: 3066, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '2X', email_opt: 1, customer_id: 5212, orders: 194, fb_co_lift_pct: '0.046', fb_co_stat_sig: '0.115', fb_rf_lift_pct: '0.068', fb_rf_stat_sig: '0.17', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '3X', email_opt: 0, customer_id: 3258, orders: 51, fb_co_lift_pct: '-0.248', fb_co_stat_sig: '-0.267', fb_rf_lift_pct: '0.41', fb_rf_stat_sig: '0.587', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '3X', email_opt: 1, customer_id: 2832, orders: 140, fb_co_lift_pct: '-0.215', fb_co_stat_sig: '-0.398', fb_rf_lift_pct: '-0.708', fb_rf_stat_sig: '-0.832', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '0-6M', frequency: '4X+', email_opt: 0, customer_id: 4082, orders: 145, fb_co_lift_pct: '0.022', fb_co_stat_sig: '0.046', fb_rf_lift_pct: '0.449', fb_rf_stat_sig: '0.886', fb_co_reco: 0, fb_rf_reco: 1, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 65, fb_rf_incr_revenue: 2604 },
  { recency: '0-6M', frequency: '4X+', email_opt: 1, customer_id: 5645, orders: 518, fb_co_lift_pct: '0.222', fb_co_stat_sig: '0.809', fb_rf_lift_pct: '0.382', fb_rf_stat_sig: '0.989', fb_co_reco: 1, fb_rf_reco: 1, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 198, fb_rf_incr_revenue: 3434 },
  { recency: '07-12M', frequency: '1X', email_opt: 0, customer_id: 19506, orders: 71, fb_co_lift_pct: '0.122', fb_co_stat_sig: '0.189', fb_rf_lift_pct: '-0.153', fb_rf_stat_sig: '-0.204', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 9, fb_co_incr_revenue: 454, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '1X', email_opt: 1, customer_id: 6575, orders: 54, fb_co_lift_pct: '0.48', fb_co_stat_sig: '0.713', fb_rf_lift_pct: '-1.514', fb_rf_stat_sig: '-0.845', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 26, fb_co_incr_revenue: 1139, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '2X', email_opt: 0, customer_id: 5037, orders: 34, fb_co_lift_pct: '0.125', fb_co_stat_sig: '0.138', fb_rf_lift_pct: '-0.674', fb_rf_stat_sig: '-0.482', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '2X', email_opt: 1, customer_id: 2953, orders: 68, fb_co_lift_pct: '0.146', fb_co_stat_sig: '0.228', fb_rf_lift_pct: '-0.054', fb_rf_stat_sig: '-0.074', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '3X', email_opt: 0, customer_id: 1820, orders: 17, fb_co_lift_pct: '0.091', fb_co_stat_sig: '0.071', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-1', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '3X', email_opt: 1, customer_id: 1482, orders: 56, fb_co_lift_pct: '-1.812', fb_co_stat_sig: '-0.91', fb_rf_lift_pct: '0.364', fb_rf_stat_sig: '0.539', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '4X+', email_opt: 0, customer_id: 2277, orders: 55, fb_co_lift_pct: '0.067', fb_co_stat_sig: '0.092', fb_rf_lift_pct: '-0.325', fb_rf_stat_sig: '-0.346', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '07-12M', frequency: '4X+', email_opt: 1, customer_id: 2369, orders: 151, fb_co_lift_pct: '0.347', fb_co_stat_sig: '0.765', fb_rf_lift_pct: '0.018', fb_rf_stat_sig: '0.037', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 52, fb_co_incr_revenue: 5383, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '1X', email_opt: 0, customer_id: 23223, orders: 25, fb_co_lift_pct: '0.855', fb_co_stat_sig: '0.976', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-1', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 21, fb_co_incr_revenue: 870, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '1X', email_opt: 1, customer_id: 6845, orders: 31, fb_co_lift_pct: '0.234', fb_co_stat_sig: '0.254', fb_rf_lift_pct: '0.256', fb_rf_stat_sig: '0.278', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 7, fb_co_incr_revenue: 509, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '2X', email_opt: 0, customer_id: 5045, orders: 12, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.999', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.999', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '2X', email_opt: 1, customer_id: 2305, orders: 19, fb_co_lift_pct: '0.792', fb_co_stat_sig: '0.833', fb_rf_lift_pct: '0.805', fb_rf_stat_sig: '0.84', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 15, fb_co_incr_revenue: 556, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '3X', email_opt: 0, customer_id: 1605, orders: 6, fb_co_lift_pct: '0.776', fb_co_stat_sig: '0.562', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.955', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 5, fb_co_incr_revenue: 161, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '3X', email_opt: 1, customer_id: 895, orders: 10, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.997', fb_rf_lift_pct: '0.57', fb_rf_stat_sig: '0.433', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '4X+', email_opt: 0, customer_id: 1437, orders: 19, fb_co_lift_pct: '-1', fb_co_stat_sig: '0', fb_rf_lift_pct: '0.733', fb_rf_stat_sig: '0.803', fb_co_reco: 0, fb_rf_reco: 1, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '12-18M', frequency: '4X+', email_opt: 1, customer_id: 1083, orders: 35, fb_co_lift_pct: '0', fb_co_stat_sig: '-1', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-1', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '1X', email_opt: 0, customer_id: 17082, orders: 35, fb_co_lift_pct: '0.472', fb_co_stat_sig: '0.58', fb_rf_lift_pct: '0.61', fb_rf_stat_sig: '0.774', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '1X', email_opt: 1, customer_id: 3815, orders: 15, fb_co_lift_pct: '0', fb_co_stat_sig: '-1', fb_rf_lift_pct: '0.255', fb_rf_stat_sig: '0.198', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '2X', email_opt: 0, customer_id: 3670, orders: 15, fb_co_lift_pct: '0', fb_co_stat_sig: '-1', fb_rf_lift_pct: '0.247', fb_rf_stat_sig: '0.192', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '2X', email_opt: 1, customer_id: 1263, orders: 13, fb_co_lift_pct: '0.829', fb_co_stat_sig: '0.857', fb_rf_lift_pct: '0.543', fb_rf_stat_sig: '0.412', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 11, fb_co_incr_revenue: 270, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '3X', email_opt: 0, customer_id: 1326, orders: 7, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.992', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.992', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '3X', email_opt: 1, customer_id: 512, orders: 9, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.998', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.998', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '4X+', email_opt: 0, customer_id: 1093, orders: 9, fb_co_lift_pct: '0.802', fb_co_stat_sig: '0.749', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.992', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 7, fb_co_incr_revenue: 567, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '18-24M', frequency: '4X+', email_opt: 1, customer_id: 651, orders: 12, fb_co_lift_pct: '0.43', fb_co_stat_sig: '0.333', fb_rf_lift_pct: '0.516', fb_rf_stat_sig: '0.397', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '1X', email_opt: 0, customer_id: 76425, orders: 67, fb_co_lift_pct: '0.827', fb_co_stat_sig: '0.999', fb_rf_lift_pct: '0.353', fb_rf_stat_sig: '0.512', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 55, fb_co_incr_revenue: 2223, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '1X', email_opt: 1, customer_id: 15009, orders: 45, fb_co_lift_pct: '0.323', fb_co_stat_sig: '0.418', fb_rf_lift_pct: '0.665', fb_rf_stat_sig: '0.895', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '2X', email_opt: 0, customer_id: 11431, orders: 18, fb_co_lift_pct: '0.094', fb_co_stat_sig: '0.073', fb_rf_lift_pct: '0.119', fb_rf_stat_sig: '0.093', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '2X', email_opt: 1, customer_id: 3428, orders: 15, fb_co_lift_pct: '0.208', fb_co_stat_sig: '0.162', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-1', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '3X', email_opt: 0, customer_id: 2686, orders: 8, fb_co_lift_pct: '0.944', fb_co_stat_sig: '0.944', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.955', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 8, fb_co_incr_revenue: 259, fb_rf_incr_conversions: 14, fb_rf_incr_revenue: 1333 },
  { recency: '24+M', frequency: '3X', email_opt: 1, customer_id: 1036, orders: 8, fb_co_lift_pct: '0.604', fb_co_stat_sig: '0.453', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.992', fb_co_reco: 1, fb_rf_reco: 0, fb_co_incr_conve: 5, fb_co_incr_revenue: 126, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '4X+', email_opt: 0, customer_id: 1352, orders: 7, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.992', fb_rf_lift_pct: '0', fb_rf_stat_sig: '-0.992', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 21, fb_rf_incr_revenue: 655 },
  { recency: '24+M', frequency: '4X+', email_opt: 1, customer_id: 712, orders: 6, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.975', fb_rf_lift_pct: '0.764', fb_rf_stat_sig: '0.56', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 0, fb_rf_incr_revenue: 0 },
  { recency: '24+M', frequency: '4X+', email_opt: 1, customer_id: 712, orders: 6, fb_co_lift_pct: '0', fb_co_stat_sig: '-0.975', fb_rf_lift_pct: '0.764', fb_rf_stat_sig: '0.56', fb_co_reco: 0, fb_rf_reco: 0, fb_co_incr_conve: 0, fb_co_incr_revenue: 0, fb_rf_incr_conversions: 30, fb_rf_incr_revenue: 1043 },
];

const insights2 = [
    { type: 'card', id: 'purpose2', text: "First, the purpose. We wanted to evaluate the incremental impact of Facebook Conversion Objective and Remarketing Funnel campaigns on revenue and conversions. We looked at this across different customer segments, defined by how recently they bought, how often they buy, and if they are on our email list." },
    { type: 'card', id: 'hypothesis2', text: "Our hypothesis was that these Facebook campaigns would increase orders and revenue, especially for recent buyers, lower frequency customers, and those not getting our emails, since they are less saturated with our marketing." },
    { type: 'card', id: 'insights2', text: "Let's dive into the key insights. We found some high-performing segments for Conversion Objective campaigns." },
    { type: 'row', customer_id: 8159, text: "For example, customers who last bought 0 to 6 months ago, have bought twice, and are not on our email list, showed a 56.3% lift with a high statistical significance, generating over $3,000 in incremental revenue." },
    { type: 'row', customer_id: 23223, text: "Similarly, customers who last bought 12 to 18 months ago, only once, and are not on email, showed a massive 85.5% lift and generated $870 in extra revenue." },
    { type: 'row', customer_id: 76425, text: "And customers who haven't bought in over 24 months, but were also not on email, had an 82.7% lift, bringing in over $2,200." },
    { type: 'card', id: 'insights2', text: "On the other hand, we noticed that targeting customers who are already on our email list often underperforms." },
    { type: 'row', customer_id: 11197, text: "For recent, single-purchase customers on our email list, the campaign had a negative 28.6% lift." },
    { type: 'row', customer_id: 1482, text: "And for customers who bought 7 to 12 months ago, have purchased multiple times, and are on our email list, the result was a dramatic negative 181% lift." },
    { type: 'card', id: 'insights2', text: "The remarketing funnel campaign was generally weaker across the board." },
    { type: 'row', customer_id: 5645, text: "For instance, one of the few segments with a positive result showed a 38% lift, but that generated zero dollars in actual revenue, making it ineffective." },
    { type: 'card', id: 'takeaways2', text: "So, what are the strategic takeaways? First, prioritize Conversion Objective campaigns for low-frequency customers and those not on our email list. Second, avoid spending on high-frequency users or email subscribers who show negative results. And finally, use remarketing funnel campaigns cautiously, as they show little gain." }
];

const customerContext = [
  { id: 'purpose2', title: 'Purpose', content: 'To evaluate the incremental impact of Facebook Conversion Objective (CO) and Remarketing Funnel (RF) campaigns on revenue and conversions across customer segments defined by Recency, Frequency, and Email Opt-In.' },
  { id: 'hypothesis2', title: 'Hypothesis', content: 'Facebook CO and RF campaigns will increase orders and revenue, especially for: Recent buyers (0–6M), Lower frequency segments (1X–2X), Email non-opt-in users (less marketing saturation).' },
  { id: 'insights2', title: 'Key Insights (with Data)', content: 'High-performing CO segments: 0–6M/2X/Email Opt-Out (+56.3% Lift, $3k revenue). Email Opt-In often underperforms: 07–12M/3X/Email Opt-In (−181.2% Lift). RF is weaker overall.' },
  { id: 'takeaways2', title: 'Strategic Takeaways', content: '✅ Prioritize CO for low-frequency & non-email users. ⚠️ Avoid CO on high-frequency & email opt-in users with negative lift. 🚫 Use RF cautiously.' },
]

const CustomerLevelTable = ({ currentHighlight, isPlaying }) => {
  const headers = [
    { key: 'recency', name: 'Recency' },
    { key: 'frequency', name: 'Frequency' },
    { key: 'email_opt', name: 'Email Opt-In' },
    { key: 'customer_id', name: 'Customer ID' },
    { key: 'orders', name: 'Orders' },
    { key: 'fb_co_lift_pct', name: 'FB CO Lift %' },
    { key: 'fb_co_stat_sig', name: 'FB CO Stat Sig' },
    { key: 'fb_rf_lift_pct', name: 'FB RF Lift %' },
    { key: 'fb_rf_stat_sig', name: 'FB RF Stat Sig' },
    { key: 'fb_co_reco', name: 'FB CO Reco' },
    { key: 'fb_rf_reco', name: 'FB RF Reco' },
    { key: 'fb_co_incr_conve', name: 'FB CO Incr Conve' },
    { key: 'fb_co_incr_revenue', name: 'FB CO Incr Revenue' },
    { key: 'fb_rf_incr_conversions', name: 'FB RF Incr Conversions' },
    { key: 'fb_rf_incr_revenue', name: 'FB RF Incr Revenue' },
  ];

  const rowRefs = useRef([]);

  useEffect(() => {
    if (
      isPlaying &&
      currentHighlight?.type === 'row' &&
      currentHighlight?.customer_id
    ) {
      const idx = customerLevelData.findIndex(row => row.customer_id === currentHighlight.customer_id);
      if (idx !== -1 && rowRefs.current[idx]) {
        rowRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentHighlight, isPlaying]);

  const formatCell = (value, key) => {
    const num = parseFloat(value);
    // 色阶函数
    const getColorGrade = (val, posMax, negMin) => {
      if (isNaN(val)) return '';
      if (val > 0) {
        if (val > posMax * 0.8) return 'bg-green-300 text-green-900';
        if (val > posMax * 0.5) return 'bg-green-200 text-green-900';
        return 'bg-green-100 text-green-900';
      } else if (val < 0) {
        if (val < negMin * 0.8) return 'bg-red-300 text-red-900';
        if (val < negMin * 0.5) return 'bg-red-200 text-red-900';
        return 'bg-red-100 text-red-900';
      }
      return 'bg-gray-100 text-gray-800';
    };

    // 关键色阶列
    if (key === 'fb_co_lift_pct') {
      return (
        <span className={`px-2 py-1 rounded ${getColorGrade(num, 1, -1)}`}>{num.toFixed(3)}</span>
      );
    }
    if (key === 'fb_co_stat_sig') {
      return (
        <span className={`px-2 py-1 rounded ${getColorGrade(num, 1, -1)}`}>{num.toFixed(3)}</span>
      );
    }
    if (key === 'fb_rf_lift_pct') {
      return (
        <span className={`px-2 py-1 rounded ${getColorGrade(num, 1, -1)}`}>{num.toFixed(3)}</span>
      );
    }
    if (key === 'fb_rf_stat_sig') {
      return (
        <span className={`px-2 py-1 rounded ${getColorGrade(num, 1, -1)}`}>{num.toFixed(3)}</span>
      );
    }
    if (key === 'fb_co_incr_revenue') {
      const revenue = parseInt(value);
      return (
        <span className={`px-2 py-1 rounded ${getColorGrade(revenue, 3000, -100)}`}>{`$${revenue.toLocaleString()}`}</span>
      );
    }
    if (key === 'email_opt') {
        return value === 1 ? 'Opt-In' : 'Opt-Out';
    }
    if (key === 'fb_co_reco' || key === 'fb_rf_reco') {
        return <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${value === 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{value}</span>
    }
    if (key === 'fb_rf_incr_conversions') {
      return num ? num.toLocaleString() : 0;
    }
    if (key === 'fb_rf_incr_revenue') {
      const revenue = parseInt(value);
      return (
        <span className={`px-2 py-1 rounded ${revenue > 0 ? 'bg-green-100 text-green-900' : revenue < 0 ? 'bg-red-100 text-red-900' : ''}`}>{`$${revenue ? revenue.toLocaleString() : 0}`}</span>
      );
    }
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Level Detail</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 z-10 bg-white bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
              <tr>
                {headers.map(header => (
                  <th key={header.key} scope="col" className="py-3 px-4">
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerLevelData.map((row, rowIndex) => {
                const isRowHighlighted = currentHighlight?.type === 'row' && currentHighlight?.customer_id === row.customer_id;
                const isDimmed = isPlaying && currentHighlight?.type === 'row' && !isRowHighlighted;

                return (
                    <tr
                      key={rowIndex}
                      ref={el => rowRefs.current[rowIndex] = el}
                      className={`border-b border-gray-200 transition-all duration-300 ${isRowHighlighted ? 'bg-primary-50 ring-2 ring-primary-500' : ''} ${isDimmed ? 'opacity-30' : 'hover:bg-gray-50'}`}
                    >
                    {headers.map(header => (
                        <td key={header.key} className="py-3 px-4">
                        {formatCell(row[header.key], header.key)}
                        </td>
                    ))}
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
};

const modelParameterData = [
  { Model: 'tv_S', Average: 0.022, SD: 0.004, LCI: 0.018, UCI: 0.026, '4_138_1': 0.02, '4_133_3': 0.029, '4_141_7': 0.029, '4_133_7': 0.016, '4_140_1': 0.026, '4_129_5': 0.021, '4_134_4': 0.025, '4_141_6': 0.027, '4_143_6': 0.019, '2_136_2': 0.022, '2_117_4': 0.021, '2_126_1': 0.021, '2_143_2': 0.02, '2_115_6': 0.023 },
  { Model: 'ooh_S', Average: 0.021, SD: 0.005, LCI: 0.016, UCI: 0.026, '4_138_1': 0.021, '4_133_3': 0.022, '4_141_7': 0.024, '4_133_7': 0.016, '4_140_1': 0.026, '4_129_5': 0.018, '4_134_4': 0.014, '4_141_6': 0.032, '4_143_6': 0.025, '2_136_2': 0.022, '2_117_4': 0.021, '2_126_1': 0.021, '2_143_2': 0.02, '2_115_6': 0.029 },
  { Model: 'print_S', Average: 0.015, SD: 0.004, LCI: 0.011, UCI: 0.018, '4_138_1': 0.014, '4_133_3': 0.018, '4_141_7': 0.026, '4_133_7': 0.013, '4_140_1': 0.018, '4_129_5': 0.013, '4_134_4': 0.014, '4_141_6': 0.017, '4_143_6': 0.015, '2_136_2': 0.013, '2_117_4': 0.012, '2_126_1': 0.012, '2_143_2': 0.012, '2_115_6': 0.013 },
  { Model: 'facebook', Average: 0.01, SD: 0.003, LCI: 0.007, UCI: 0.013, '4_138_1': 0.009, '4_133_3': 0.006, '4_141_7': 0.006, '4_133_7': 0.008, '4_140_1': 0.01, '4_129_5': 0.009, '4_134_4': 0.011, '4_141_6': 0.007, '4_143_6': 0.012, '2_136_2': 0.013, '2_117_4': 0.013, '2_126_1': 0.012, '2_143_2': 0.017, '2_115_6': 0.013 },
  { Model: 'search_S', Average: 0.017, SD: 0.004, LCI: 0.012, UCI: 0.021, '4_138_1': 0.02, '4_133_3': 0.017, '4_141_7': 0.018, '4_133_7': 0.019, '4_140_1': 0.02, '4_129_5': 0.021, '4_134_4': 0.013, '4_141_6': 0.023, '4_143_6': 0.02, '2_136_2': 0.031, '2_117_4': 0.01, '2_126_1': 0.01, '2_143_2': 0.015, '2_115_6': 0.018 },
  { Model: 'newsletter', Average: 0.032, SD: 0.015, LCI: 0.016, UCI: 0.047, '4_138_1': 0.025, '4_133_3': 0.018, '4_141_7': 0.016, '4_133_7': 0.038, '4_140_1': 0.029, '4_129_5': 0.07, '4_134_4': 0.012, '4_141_6': 0.022, '4_143_6': 0.022, '2_136_2': 0.047, '2_117_4': 0.033, '2_126_1': 0.033, '2_143_2': 0.03, '2_115_6': 0.047 },
  { Model: 'Total Med', Average: 0.116, SD: 0.017, LCI: 0.1, UCI: 0.133, '4_138_1': 0.109, '4_133_3': 0.11, '4_141_7': 0.119, '4_133_7': 0.11, '4_140_1': 0.112, '4_129_5': 0.145, '4_134_4': 0.084, '4_141_6': 0.132, '4_143_6': 0.107, '2_136_2': 0.126, '2_117_4': 0.108, '2_126_1': 0.108, '2_143_2': 0.11, '2_115_6': 0.146 },
  { Model: 'trend', Average: 0.011, SD: '', LCI: '', UCI: '', '4_138_1': 0, '4_133_3': 0, '4_141_7': 0, '4_133_7': 0, '4_140_1': 0, '4_129_5': 0, '4_134_4': 0.151, '4_141_6': 0, '4_143_6': 0, '2_136_2': 0, '2_117_4': 0, '2_126_1': 0, '2_143_2': 0, '2_115_6': 0 },
  { Model: 'season', Average: -0.001, SD: '', LCI: '', UCI: '', '4_138_1': -0.001, '4_133_3': -0.001, '4_141_7': -0.001, '4_133_7': -0.001, '4_140_1': -0.001, '4_129_5': -0.001, '4_134_4': -0.001, '4_141_6': -0.001, '4_143_6': -0.001, '2_136_2': -0.001, '2_117_4': -0.001, '2_126_1': -0.001, '2_143_2': -0.001, '2_115_6': -0.001 },
  { Model: 'holiday', Average: 0.006, SD: '', LCI: '', UCI: '', '4_138_1': 0.006, '4_133_3': 0.006, '4_141_7': 0.006, '4_133_7': 0.006, '4_140_1': 0.006, '4_129_5': 0.006, '4_134_4': 0.007, '4_141_6': 0.006, '4_143_6': 0.005, '2_136_2': 0.005, '2_117_4': 0.006, '2_126_1': 0.006, '2_143_2': 0.006, '2_115_6': 0.005 },
  { Model: 'intercept', Average: 0.46, SD: '', LCI: '', UCI: '', '4_138_1': 0.481, '4_133_3': 0.469, '4_141_7': 0.462, '4_133_7': 0.437, '4_140_1': 0.447, '4_129_5': 0.404, '4_134_4': 0.302, '4_141_6': 0.499, '4_143_6': 0.498, '2_136_2': 0.461, '2_117_4': 0.489, '2_126_1': 0.489, '2_143_2': 0.486, '2_115_6': 0.516 },
  { Model: 'competitio', Average: 0.402, SD: '', LCI: '', UCI: '', '4_138_1': 0.399, '4_133_3': 0.41, '4_141_7': 0.408, '4_133_7': 0.441, '4_140_1': 0.429, '4_129_5': 0.439, '4_134_4': 0.452, '4_141_6': 0.36, '4_143_6': 0.385, '2_136_2': 0.385, '2_117_4': 0.391, '2_126_1': 0.391, '2_143_2': 0.393, '2_115_6': 0.329 },
  { Model: 'events', Average: 0.006, SD: '', LCI: '', UCI: '', '4_138_1': 0.006, '4_133_3': 0.006, '4_141_7': 0.006, '4_133_7': 0.006, '4_140_1': 0.007, '4_129_5': 0.007, '4_134_4': 0.007, '4_141_6': 0.006, '4_143_6': 0.006, '2_136_2': 0.006, '2_117_4': 0.006, '2_126_1': 0.006, '2_143_2': 0.006, '2_115_6': 0.006 },
  { Model: 'Total Base', Average: 0.884, SD: '', LCI: '', UCI: '', '4_138_1': 0.891, '4_133_3': 0.89, '4_141_7': 0.881, '4_133_7': 0.89, '4_140_1': 0.893, '4_129_5': 0.888, '4_134_4': 0.916, '4_141_6': 0.869, '4_143_6': 0.893, '2_136_2': 0.874, '2_117_4': 0.892, '2_126_1': 0.892, '2_143_2': 0.89, '2_115_6': 0.854 },
  { Model: 'depVarHat', Average: 1, SD: '', LCI: '', UCI: '', '4_138_1': 1, '4_133_3': 1, '4_141_7': 1, '4_133_7': 1, '4_140_1': 1, '4_129_5': 1, '4_134_4': 1, '4_141_6': 1, '4_143_6': 1, '2_136_2': 1, '2_117_4': 1, '2_126_1': 1, '2_143_2': 1, '2_115_6': 1 },
];

const modelParameterHeaders = [
  'Model', 'Average', 'SD', 'LCI', 'UCI', '4_138_1', '4_133_3', '4_141_7', '4_133_7', '4_140_1', '4_129_5', '4_134_4', '4_141_6', '4_143_6', '2_136_2', '2_117_4', '2_126_1', '2_143_2', '2_115_6'
];

const modelParameterInsights = [
  { text: "In this section, I'll walk you through the model structure and how each variable contributes to the final outcome we're analyzing — whether it's sales, conversions, or another key metric.", id: 'intro', highlight: null, audio: "3_1.mp3" },
  { text: "Our model divides the influencing factors into two main groups: First, Media Variables, which are marketing activities we can directly control. These are our paid marketing efforts, such as TV, print, Facebook, and newsletters.", id: 'media-vars', highlight: { type: 'group', names: ['tv_S','ooh_S','print_S','facebook','search_S','newsletter','Total Med'] }, audio: "3_2.mp3" },
  { text: "Second, Base Variables, which are more external or natural market forces, like seasonality or competitor behavior.", id: 'base-vars', highlight: { type: 'group', names: ['trend','season','holiday','intercept','competitio','events','Total Base'] }, audio: "3_3.mp3" },
  { text: "Among all media channels, we found that 'newsletter' is the most effective, with an average contribution of 0.032.", id: 'newsletter', highlight: { type: 'row', name: 'newsletter' }, audio: "3_4.mp3" },
  { text: "On the other hand, 'Facebook' contributes less — around 0.01 — but still plays a meaningful role.", id: 'facebook', highlight: { type: 'row', name: 'facebook' }, audio: "3_5.mp3" },
  { text: "If we sum up all media variables, they account for about 11.6% of the total explained impact. That means media spend is responsible for roughly one-ninth of the results we see.", id: 'media-sum', highlight: { type: 'row', name: 'Total Med' }, audio: "3_6.mp3" },
  { text: "The remaining 88.4% is driven by external or base variables, which we'll look at next. What stands out here is that nearly 90% of performance is driven by non-media factors — like trend, seasonality, and competitor actions.", id: 'base-sum', highlight: { type: 'row', name: 'Total Base' }, audio: "3_7.mp3" },
  { text: "This tells us that media alone can't move the needle — unless we align with these underlying forces. While media explains just over 10%, competitor actions alone explain over 40% — making them 4 times more influential than all paid media combined.", id: 'competitor', highlight: { type: 'row', name: 'competitio' }, audio: "3_8.mp3" },
  { text: "Add to that a strong intercept and predictable seasonal triggers, and the message is clear: The market is doing the heavy lifting. Our job is to align, not just spend.", id: 'conclusion', highlight: { type: 'group', names: ['intercept','season','trend','competitio','events'] }, audio: "3_9.mp3" },
];

// 百分比格式化函数
const formatPercent = (val) => {
  if (typeof val !== 'number' || isNaN(val)) return val;
  return (val * 100).toFixed(1) + '%';
};

const ModelParameterTable = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const audioRef = useRef(null);

  const currentInsight = isPlaying ? modelParameterInsights[highlightedIndex] : null;

  useEffect(() => {
    if (isPlaying && currentInsight?.audio) {
      audioRef.current.src = `/audio/${currentInsight.audio}`;
      audioRef.current.play();
    }
  }, [isPlaying, highlightedIndex, currentInsight]);

  const handleAudioEnded = () => {
    if (highlightedIndex < modelParameterInsights.length - 1) {
      setHighlightedIndex(highlightedIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const { isReady: isSpeechReady, getPremiumVoice } = useSpeechSynthesis();

  // 关键行分组
  const mediaRows = ['tv_S','ooh_S','print_S','facebook','search_S','newsletter','Total Med'];
  const baseRows = ['trend','season','holiday','intercept','competitio','events','Total Base'];
  const keyRows = [...mediaRows, ...baseRows];
  const keyCols = ['Average','SD','LCI','UCI'];

  // 色阶函数
  const getColColor = (val, col) => {
    if (typeof val !== 'number' || isNaN(val)) return '';
    if (col === 'Average') {
      if (val > 0.03) return 'bg-green-200';
      if (val > 0.015) return 'bg-green-100';
      if (val < 0) return 'bg-red-100';
      return '';
    }
    if (col === 'SD') {
      if (val > 0.01) return 'bg-yellow-100';
      if (val > 0.005) return 'bg-yellow-50';
      return '';
    }
    if (col === 'LCI' || col === 'UCI') {
      if (val > 0.1) return 'bg-blue-100';
      if (val < 0) return 'bg-red-100';
      return '';
    }
    return '';
  };

  // 行分组底色
  const getRowColor = (rowName) => {
    if (mediaRows.includes(rowName)) return 'bg-blue-50';
    if (baseRows.includes(rowName)) return 'bg-purple-50';
    return '';
  };

  // 洞察高亮
  const getHighlightClass = (row, highlight) => {
    if (!highlight) return '';
    if (highlight.type === 'row' && highlight.name === row.Model) return 'ring-2 ring-primary-500';
    if (highlight.type === 'group' && highlight.names?.includes(row.Model)) return 'ring-2 ring-primary-400';
    return '';
  };

  const handlePlay = () => {
    setHighlightedIndex(0);
    setIsPlaying(true);
  };
  const handleStop = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };
  const handleNext = () => {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % modelParameterInsights.length);
    audioRef.current.pause();
  };

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Model Parameter Summary</h2>
        <div className="flex items-center space-x-2">
          {!isPlaying ? (
            <button onClick={handlePlay} className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 border border-primary-200 transition-colors flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Play Insights</span>
            </button>
          ) : (
            <>
              <button onClick={handleNext} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Next Insight ({highlightedIndex + 1}/{modelParameterInsights.length})</span>
              </button>
              <button onClick={handleStop} className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </>
          )}
        </div>
      </div>
      {currentInsight && (
        <div className="fixed bottom-8 right-8 w-full max-w-sm bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-20">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Insight #{highlightedIndex + 1}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{currentInsight.text}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="sticky top-0 z-10 bg-white bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
            <tr>
              {modelParameterHeaders.map(h => (
                <th key={h} className="py-3 px-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modelParameterData.map((row, i) => {
              const rowColor = keyRows.includes(row.Model) ? getRowColor(row.Model) : '';
              const highlightClass = getHighlightClass(row, currentInsight?.highlight);
              return (
                <tr key={i} className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ${rowColor} ${highlightClass}`}>
                  {modelParameterHeaders.map(h => {
                    let cell = row[h] !== undefined ? row[h] : '';
                    let cellColor = '';
                    if (keyRows.includes(row.Model) && keyCols.includes(h)) {
                      cellColor = getColColor(cell, h);
                    }
                    // 所有小数都渲染为百分比
                    let display = cell;
                    if (typeof cell === 'number' && !Number.isInteger(cell)) {
                      display = formatPercent(cell);
                    }
                    return (
                      <td key={h} className={`py-3 px-4 ${cellColor}`}>{display}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <audio ref={audioRef} onEnded={handleAudioEnded} style={{ display: 'none' }} />
    </div>
  );
};

const DataAnalysis = () => {
  const headers = ['Subgroup', 'Reach', 'Conversions', 'CR', 'Revenue', 'CCR', 'Lift %', 'Spend', 'aaRevenue', 'aaROAS'];
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [highlightedIndex2, setHighlightedIndex2] = useState(0);
  const tableRef = useRef(null);
  const { isReady: isSpeechReady, getPremiumVoice } = useSpeechSynthesis();

  const currentInsight = isPlaying ? insights[highlightedIndex] : null;
  const currentHighlight = currentInsight?.highlight;

  const currentInsight2 = isPlaying2 ? insights2[highlightedIndex2] : null;
  const currentHighlight2 = currentInsight2;

  useEffect(() => {
    if (isPlaying && currentInsight && isSpeechReady) {
      const utterance = new SpeechSynthesisUtterance(currentInsight.text);
      const premiumVoice = getPremiumVoice();
      
      if (premiumVoice) {
        utterance.voice = premiumVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
      }
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (highlightedIndex < insights.length - 1) {
          setTimeout(() => setHighlightedIndex(prev => prev + 1), 1000);
        } else {
          setIsPlaying(false);
        }
      };
    } else {
      window.speechSynthesis.cancel();
    }
    return () => window.speechSynthesis.cancel();
  }, [isPlaying, highlightedIndex, isSpeechReady]);

  useEffect(() => {
    if (isPlaying2 && currentInsight2 && isSpeechReady) {
      const utterance = new SpeechSynthesisUtterance(currentInsight2.text);
      const premiumVoice = getPremiumVoice();
      
      if (premiumVoice) {
        utterance.voice = premiumVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
      }
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (highlightedIndex2 < insights2.length - 1) {
          setTimeout(() => setHighlightedIndex2(prev => prev + 1), 1000);
        } else {
          setIsPlaying2(false);
        }
      };
    } else if (!isPlaying) {
      window.speechSynthesis.cancel();
    }
    return () => window.speechSynthesis.cancel();
  }, [isPlaying2, highlightedIndex2, isSpeechReady]);

  const handlePlay = () => {
    setHighlightedIndex(0);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    window.speechSynthesis.cancel();
  };

  const handleNext = () => {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % insights.length);
    window.speechSynthesis.cancel();
  };

  const handlePlay2 = () => {
    setHighlightedIndex2(0);
    setIsPlaying2(true);
  };

  const handleStop2 = () => {
    setIsPlaying2(false);
    window.speechSynthesis.cancel();
  };

  const handleNext2 = () => {
    setHighlightedIndex2((prevIndex) => (prevIndex + 1) % insights2.length);
    window.speechSynthesis.cancel();
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lift Analysis Report</h1>
        <div className="flex items-center space-x-2">
            {!isPlaying ? (
              <button onClick={handlePlay} className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 border border-primary-200 transition-colors flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Play Insights</span>
              </button>
            ) : (
              <>
                <button onClick={handleNext} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Next Insight ({highlightedIndex + 1}/{insights.length})</span>
                </button>
                <button onClick={handleStop} className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </>
            )}
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Export CSV</button>
        </div>
      </div>
      
      {/* Insight Card */}
      {currentInsight && (
          <div className="absolute top-24 right-6 w-full max-w-sm bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Insight #{highlightedIndex + 1}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{currentInsight.text}</p>
          </div>
      )}

      {/* Experiment Setup Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'purpose', title: 'Purpose', content: 'To evaluate the effectiveness of two Facebook targeting strategies—Conversion Targeting vs. Reach & Frequency (R&F) Targeting—in driving incremental conversions and revenue compared to a control group with no ads.' },
          { id: 'hypothesis', title: 'Hypothesis', content: 'Facebook ads, especially Conversion Targeting, will lift conversions and revenue vs. control. Customers who are not engaged via email (non-opted-in) will be more responsive to paid social campaigns.' },
          { id: 'design', title: 'Design & Considerations', content: 'Randomized controlled test with 3 groups: Control, Conversion Targeting, R&F Targeting. Segmented by email opt-in status to understand interaction between email marketing and paid social. Metrics tracked: Conversion Rate (CR), Incremental Lift, Spend, Revenue, ROAS.' },
        ].map(item => {
            const isHighlighted = isPlaying && currentHighlight?.type === 'card' && currentHighlight.id === item.id;
            const isDimmed = isPlaying && (!isHighlighted || currentHighlight?.type !== 'card');

            return (
                <div key={item.id} className={`bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ${isHighlighted ? 'ring-2 ring-primary-500 scale-105' : ''} ${isDimmed ? 'opacity-30' : ''}`}>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.content}</p>
                </div>
            )
        })}
      </div>

      <div className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-300 ${isPlaying && currentHighlight?.type === 'card' ? 'opacity-30' : ''}`} ref={tableRef}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 z-10 bg-white bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3 px-4 rounded-l-lg">Group</th>
                {headers.map(header => {
                  const isColHighlighted = currentHighlight?.type === 'col' && currentHighlight?.name === header;
                  const isDimmed = isPlaying && currentHighlight?.type === 'col' && !isColHighlighted;
                  return <th key={header.key} scope="col" className={`py-3 px-4 transition-all duration-300 ${isColHighlighted ? 'bg-primary-100' : ''} ${isDimmed ? 'opacity-30' : ''}`}>{header.name}</th>
                })}
                <th scope="col" className="py-3 px-4 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([group, rows]) => (
                <React.Fragment key={group}>
                  {rows.map((row, rowIndex) => {
                    const isRowHighlighted = currentHighlight?.type === 'row' && currentHighlight?.group === group && currentHighlight?.subgroup === row.subgroup;
                    const isGroupHighlighted = currentHighlight?.type === 'group' && currentHighlight?.name === group;
                    const isCellHighlighted = currentHighlight?.type === 'cell' && 
                      currentHighlight?.group === group && 
                      currentHighlight?.subgroup === row.subgroup;
                    const isFocus = isRowHighlighted || isGroupHighlighted || isCellHighlighted;
                    const isDimmed = isPlaying && !isFocus && currentHighlight?.type !== 'col';

                    return (
                      <tr className={`border-b border-gray-200 ${rowIndex === 0 ? 'border-t-4 border-primary-200' : ''} transition-all duration-300 ${isFocus ? 'bg-primary-50' : ''} ${isDimmed ? 'opacity-30' : 'hover:bg-gray-50'}`} key={row.subgroup}>
                        {rowIndex === 0 && <td rowSpan={rows.length} className="py-4 px-4 align-top font-bold text-gray-800 border-r border-gray-200">{group}</td>}
                        {headers.map(header => {
                            const isColHighlighted = currentHighlight?.type === 'col' && currentHighlight?.name === header;
                            const isCellHighlighted = currentHighlight?.type === 'cell' && 
                              currentHighlight?.group === group && 
                              currentHighlight?.subgroup === row.subgroup && 
                              currentHighlight?.column === header;
                            const isCellDimmed = isPlaying && currentHighlight?.type === 'col' && !isColHighlighted;
                            const value = row[header.toLowerCase().replace(/[^a-z0-9]/gi, '')];
                            
                            let displayValue = value;
                            if (typeof value === 'number') {
                                displayValue = value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                                if (['revenue', 'spend', 'aarevenue'].includes(header.toLowerCase().replace(/[^a-z0-9]/gi, ''))) {
                                    displayValue = `$${displayValue}`;
                                }
                            }
                            
                            const cellClasses = `py-3 px-4 transition-all duration-300 ${isColHighlighted || isCellHighlighted ? 'bg-primary-100' : ''} ${isCellDimmed ? 'opacity-30' : ''}`;
                            const liftClasses = `font-medium ${row.lift.startsWith('-') ? 'text-red-500' : 'text-green-600'}`;
                            const aaRevenueClasses = `font-medium ${row.aaRevenue < 0 ? 'text-red-500' : 'text-gray-800'}`;
                            const aaRoasClasses = `font-medium ${parseFloat(row.aaROAS) < 0 ? 'text-red-500' : 'text-gray-800'}`;

                            if (header === 'Lift %') return <td className={`${cellClasses} ${liftClasses}`}>{row.lift}</td>;
                            if (header === 'aaRevenue') return <td className={`${cellClasses} ${aaRevenueClasses}`}>${row.aaRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>;
                            if (header === 'aaROAS') return <td className={`${cellClasses} ${aaRoasClasses}`}>{parseFloat(row.aaROAS).toFixed(5)}</td>;
                            if (header === 'Subgroup') return <td className={cellClasses}>{row.subgroup}</td>;
                            if (['Reach', 'Conversions'].includes(header)) return <td className={cellClasses}>{row[header.toLowerCase()].toLocaleString()}</td>;
                            if (['Revenue', 'Spend'].includes(header)) return <td className={cellClasses}>${row[header.toLowerCase()].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>;

                            return <td className={cellClasses}>{row[header.toLowerCase().replace(/[^a-z0-9]/gi, '')]}</td>;
                        })}
                        <td className="py-3 px-4"></td>
                      </tr>
                    )
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Second Experiment --- */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer Segment Deep Dive</h1>
          <div className="flex items-center space-x-2">
              {!isPlaying2 ? (
                <button onClick={handlePlay2} className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 border border-primary-200 transition-colors flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Play Insights</span>
                </button>
              ) : (
                <>
                  <button onClick={handleNext2} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Next Insight ({highlightedIndex2 + 1}/{insights2.length})</span>
                  </button>
                  <button onClick={handleStop2} className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </>
              )}
          </div>
        </div>
        
        {/* Insight Card for second table */}
        {currentInsight2 && (
            <div className="fixed bottom-8 right-8 w-full max-w-sm bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-20">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Insight #{highlightedIndex2 + 1}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{currentInsight2.text}</p>
            </div>
        )}

        {/* Experiment Setup Section for second table */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerContext.map(item => {
              const isHighlighted = isPlaying2 && currentHighlight2?.type === 'card' && currentHighlight2.id === item.id;
              const isDimmed = isPlaying2 && currentHighlight2?.type === 'card' && !isHighlighted;
              return (
                  <div key={item.id} className={`bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ${isHighlighted ? 'ring-2 ring-primary-500 scale-105' : ''} ${isDimmed ? 'opacity-30' : ''}`}>
                      <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{item.content}</p>
                  </div>
              )
          })}
        </div>
        
        <CustomerLevelTable currentHighlight={currentHighlight2} isPlaying={isPlaying2} />
        <ModelParameterTable />
      </div>
    </div>
  );
};

export default DataAnalysis; 