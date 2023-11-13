import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';

import CadastrarCidade from './formularios/cadastrarCidade';



const Page = () => {

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
                        <div >
                           <CadastrarCidade/>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;