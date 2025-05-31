import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import AxiosConfig from '../api/AxiosConfig';
import { Box, CircularProgress, Typography } from '@mui/material';

type ChartData = {
  xAxis: number[];
  series: number[];
};

export default function SingleUserChart() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await AxiosConfig.get('/api/v1/chart/user/1');
        
        const data = response.data;
        setChartData({
          xAxis: [1, 2, 3, 5, 8, 10], //tbc
          series: [2, 5.5, 2, 8.5, 1.5, 5] //tbc
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data. Please try again later.');
        setChartData({
          xAxis: [1, 2, 3, 5, 8, 10],
          series: [2, 5.5, 2, 8.5, 1.5, 5]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <LineChart
      xAxis={[{ data: chartData?.xAxis || [] }]}
      series={[
        {
          data: chartData?.series || [],
          label: 'Power Usage (kWh)'
        },
      ]}
      height={300}
      width={500}
    />
  );
}