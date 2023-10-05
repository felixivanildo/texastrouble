import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';


const Page = () => {
  // Example useState
  const [arrayteste, setArrayteste] = useState ([{}])

  useEffect(()=>{
      const getdata = async ()=> {
          

          var retrieved = await axios.get('http://10.254.4.132:3010/api/id')
          
          console.log(retrieved)
           setArrayteste(retrieved.data)
 
     }
      

     getdata()
  }, [])

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
            
            <div style={{display: "flex", justifyContent: "center"}}>
            <table className="styled-table" >
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Setor</th>
                    <th>Cidade</th>
                    <th>Trabalho</th>
                    </tr>
                </thead>
                <tbody >
                {arrayteste.map((row, index) => {
                    return(
                    <tr   className="active-row" key={index}>
                        <td>{row.firstname}</td>
                        <td>{row.phone}</td>
                        <td>{row.country}</td>
                        <td>{row.city}</td>
                        <td>{row.jobtitle}</td>

                    </tr>

                )})}
                </tbody>
            </table>
            </div>
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
