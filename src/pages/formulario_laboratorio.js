import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const ReportMeasuringsForm = () => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    const json = [
        { "name": "measuringid", "text": "serial primary key" },
        { "name": "reportid", "text": "integer not null" },
        { "name": "updatedat", "text": "date" },
        { "name": "createdat", "text": "date DEFAULT CURRENT_DATE" },
        { "name": "ph", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "corverdadeira", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "turbidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "condutanciaespecifica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "acidez", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadeoh", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadeco", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "alcalinidadehco", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezatotal", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezacarbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "durezancarbonatos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "calcio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "magnesio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "cloretos", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "silica", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "sulfato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "amonia", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "nitrato", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "nitrito", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "ferrototal", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "sodio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "potassio", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "solidostotais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "colifornestotais", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "escherichiacoli", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },
        { "name": "indice_nitrato_nitrito", "text": "character varying(15) COLLATE pg_catalog.\"default\"" },

    ]

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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Loop through columns in JSON and create form fields */}
                                {json.map((column) => (
                                    <div key={column.name}>
                                        <label>{column.name}</label>
                                        {/* Use Controller to integrate React Hook Form with input fields */}
                                        <Controller
                                            name={column.name}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    {...field}
                                                    placeholder={column.text}
                                                />
                                            )}
                                        />
                                    </div>
                                ))}


                            </form>
                            <button type="submit">Submit</button>
                        </div>
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

