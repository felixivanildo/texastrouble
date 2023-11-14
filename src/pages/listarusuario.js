import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, Switch, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import {TextField, Select, MenuItem} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { margin } from '@mui/system';



const Page = () => {
  // Example useState
  const [sectors, setSectors] = useState([{}])
  const [arrayteste, setArrayteste] = useState ([{}])
  const [currentuser, setCurrentUser] = useState([{}])
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    const autoexec = async () => {
        const elaborate = await axios.get('http://10.254.4.132:3010/api/sectors')
        const user = await AsyncStorage.getItem('@user')
        setSectors(elaborate.data)
        setCurrentUser(JSON.parse(user))
    }

    autoexec()
  }, [])


  useEffect(()=>{
      const getdata = async ()=> {
          

          var retrieved = await axios.get('http://10.254.4.132:3010/api/id')
          
          // console.log(retrieved)
           setArrayteste(retrieved.data)
 
     }
      

     getdata()
  }, [])

  const handleUpdate = async (data) => {
      // await axios.post('http://10.254.4.132:3010/api/updateUser', data)
      console.log(control)
  }

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
            <form style={{marginLeft: "13%"}}>
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
                    <th>Ativo</th>
                    <th>Salvar</th>
                    </tr>
                </thead>
              
                <tbody >
                
                {arrayteste.map((row, index) => {
                  // {console.log(row.isactive)}
                    return(
                    
                    <tr className="active-row" key={index}>
                    
                        <td>{row.firstname}</td>
                        <td>
                        <TextField id="standard-basic" label={row.phone} variant="standard" />
                        </td>
                        <td>

                          
                        
                        <Select
                                    sx={{ borderRadius: "10px" }}
                                    // placeholder="Setor" 
                                    id="demo-simple-select" 
                                    size="small" 
                                    defaultValue={row.country}                                    
                                >
                                    {sectors.map((sec) => (
                                        <MenuItem value={sec.sectoraka}>{sec.sectoraka}</MenuItem>
                                    ))}
                        </Select>


                        
                        </td>
                        <td>
                        <TextField id="standard-basic" label={row.city} variant="standard" />
                        </td>
                        <td>
                        <TextField id="standard-basic" label={row.jobtitle} variant="standard" />
                        </td>
                        <td >
                          {row.isactive === true && <Switch defaultChecked ></Switch>}
                          {row.isactive === false && <Switch value='brindo a vida' onChange={(e)=>{console.log(e.target)}}></Switch>}

                         
                        
                        </td>

                        <td><Button onClick={()=>{handleUpdate(row)}}>Salvar</Button></td>

                    </tr>

                )})}
                
                </tbody>
                
            </table>
            
            </div>
        </div>
        </form>
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
