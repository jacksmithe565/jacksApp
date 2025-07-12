import React from 'react';
import Skeleton from '../../../../components/component-library/skeleton';
import Box from '../../../index';
import { BorderRadius } from 'src/_helpers/_constants/_design-system';
export const AssetChartLoading = () => {
  return (
    <Box className="asset-chart__empty-or-loading-state-container" dataTestId="asset-chart-loading">
      <Skeleton className="asset-chart__skeleton borderRadiusLG" />
    </Box>
  );
