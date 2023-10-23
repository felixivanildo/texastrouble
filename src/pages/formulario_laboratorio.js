import React from 'react';
import Laudo from './formularios/laudo';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const ReportMeasuringsForm = () => {


    return (
        <>
            <Head>
                <title>
                    USUARIOS | TEXAS TROUBLEMAKER
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Usuarios
                        </Typography>
                        {/* <SettingsNotifications />
                        <SettingsPassword /> */}
                        <Laudo></Laudo>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

ReportMeasuringsForm.getLayout = (ReportMeasuringsForm) => (
    <DashboardLayout>
        {ReportMeasuringsForm}
    </DashboardLayout>
);

export default ReportMeasuringsForm;

