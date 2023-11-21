import React, { useEffect, useState } from 'react';
import Laudo from './formularios/laudo';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

function ReportMeasuringsForm() {
  const currentUrl = window.location.href;
  const [agua_situacao, setAgua] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an asynchronous operation, e.g., fetching data
        // Replace this with your actual asynchronous operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set the agua_situacao state after the asynchronous operation
        setAgua(String(currentUrl).split('?dynamicProp=')[1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  // Render the component only when agua_situacao is not null
  if (agua_situacao === null) {
    return (
      <div>
        {/* You can add a loading spinner or message here */}
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>USUARIOS | TEXAS TROUBLEMAKER</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">{String(agua_situacao).toUpperCase().split('_')[1]}</Typography>
            {/* Uncomment the following lines if needed */}
            {/* <SettingsNotifications /> */}
            {/* <SettingsPassword /> */}
            <Laudo agua={agua_situacao} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

ReportMeasuringsForm.getLayout = (ReportMeasuringsForm) => (
  <DashboardLayout>{ReportMeasuringsForm}</DashboardLayout>
);

export default ReportMeasuringsForm;
