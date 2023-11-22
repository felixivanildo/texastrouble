import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, Switch, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { p, Select, MenuItem } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { margin } from '@mui/system';
import EditUser from './editarusuario';
import Modal from '@mui/material/Modal';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Page = () => {
  // Example useState
  const [sectors, setSectors] = useState([{}])
  const [arrayteste, setArrayteste] = useState([{}])
  const [currentuser, setCurrentUser] = useState([{}])
  const { handleSubmit, control } = useForm();
  const [edit, setEdit] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    const autoexec = async () => {
      const elaborate = await axios.get('http://10.254.4.132:3010/api/sectors')
      const user = await AsyncStorage.getItem('@user')
      setSectors(elaborate.data)
      setCurrentUser(JSON.parse(user))
    }

    autoexec()
  }, [])


  useEffect(() => {
    const getdata = async () => {


      var retrieved = await axios.get('http://10.254.4.132:3010/api/id')

      // console.log(retrieved)
      setArrayteste(retrieved.data)

    }


    getdata()
  }, [])

  const handleUpdate = async (data) => {
    setOpen(true)
    setEdit(data.userid)
    // await axios.post('http://10.254.4.132:3010/api/updateUser', data)

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

            <div style={{ marginLeft: "10%", marginRight: "10%", }}>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <EditUser key={edit} id={edit} ></EditUser>
                </Box>
              </Modal>


              <div style={{ display: "flex", justifyContent: "center" }}>


                <table className="styled-table" >
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>Setor</th>
                      <th>Cidade</th>
                      <th>Trabalho</th>
                      <th>Ativo</th>
                      <th>Editar</th>
                    </tr>
                  </thead>

                  <tbody >

                    {arrayteste.map((row, index) => {
                      // {console.log(row.isactive)}
                      return (

                        <tr className="active-row" key={index}>

                          <td>{row.firstname}</td>
                          <td>
                            <p> {row.phone}</p>
                          </td>
                          <td>



                            <p>{row.contry}</p>



                          </td>
                          <td>
                            <p >{row.city}</p>
                          </td>
                          <td>
                            <p>{row.jobtitle}</p>
                          </td>
                          <td >
                            {row.isactive === true && <Switch defaultChecked disabled color='warning'></Switch>}
                            {row.isactive === false && <Switch value='brindo a vida' disabled></Switch>}



                          </td>

                          <td><Button onClick={() => { handleUpdate(row) }}>Editar</Button></td>

                        </tr>

                      )
                    })}

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
