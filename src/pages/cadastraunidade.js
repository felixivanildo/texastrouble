import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';


const Page = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data); // You can handle the form data here
    };
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
                        <div style={{ marginLeft: "10%", marginRight: "10%", }}>
                            <form onSubmit={handleSubmit(onSubmit)}  style={{ display: "flex", flexWrap: "wrap" }}>
                                <div className='child'>
                                    <label>UNIDADE: </label>
                                    <Controller
                                        name="unityname"
                                        control={control}
                                        render={({ field }) => <input {...field} />}
                                    />
                                </div>

                                <div className='child'>
                                    <label>STATUS DE ATIVA: </label>
                                    <Controller
                                        name="activestatus"
                                        control={control}
                                        render={({ field }) => <input {...field} />}
                                    />
                                </div>

                               
                            </form>
                            <button type="submit">Submit</button>
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
