import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Switch
} from '@mui/material';
import axios from 'axios';

const states = [
  {
    value: 'SUPMAST',
    label: 'SUPMAST'
  },
  {
    value: 'GECAM',
    label: 'GECAM'
  },
  {
    value: 'SUPMER',
    label: 'SUPMER'
  },
  {
    value: '---',
    label: '---'
  }
];

export default function EditUser(props) {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '',
    state: '---',
    country: 'USA',
    isactive: false,
    jobtitle: 'default'
  });

  useEffect(() => {
    const fetchUserFromDatabase = async () => {
      try {
        if (String(props.id).length > 0) {
          // Replace this with your actual database fetch logic
          const response = await axios.put('http://10.254.4.132:3010/api/getexclusive', { id: props.id })
          // console.log(response.data[0])
          // const userData = await response.json();
          // console.log(JSON.parse(response))
          setValues(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserFromDatabase();
  }, [])

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(event.target)
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Edite as informações"
          title="Perfil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Primeiro nome"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Sobrenome"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />


              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Função"
                  name="funcao"
                  onChange={handleChange}
                  value={values.jobtitle}
                />


              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* <TextField
                  fullWidth
                  label="Setor"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                /> */}
                <TextField
                  fullWidth
                  label="Select Setor"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid
                xs={12}
                md={6}
              >
               
              </Grid> */}


              <Grid
                xs={12}
                md={12}
              >

                <div style={{display: "flex", justifyContent: "center"}}>
                <label style={{display: "flex", alignItems: "center"}}>Ativo?</label>
                {values.isactive && <Switch defaultChecked></Switch>}
                {!values.isactive &&  <Switch></Switch>}
                </div>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant="contained">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
