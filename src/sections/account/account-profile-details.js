import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField ,
  Unstable_Grid2 as Grid
} from '@mui/material';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '',
    state: 'los-angeles',
    country: 'USA'
  });

  useEffect(()=>{
    const fetchUserFromDatabase = async () => {
      try {
        // Replace this with your actual database fetch logic
        const response = await AsyncStorage.getItem('@user') // Assuming you have an API endpoint for fetching user data
        // console.log(response.body)
        // const userData = await response.json();
        // console.log(JSON.parse(response))
        setValues(JSON.parse(response));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserFromDatabase();
  },[])

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
          subheader="The information can be edited"
          title="Profile"
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
                <TextField disabled
                  fullWidth
                  helperText="Please specify the first name"
                  label="Nome"
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
                <TextField disabled
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
                <TextField disabled
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
                <TextField disabled
                  fullWidth
                  label="Número"
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
                <TextField disabled
                  fullWidth
                  label="Setor"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* <TextField disabled
                  fullWidth
                  label="Select State"
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
                </TextField> */}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {/* <Button variant="contained">
            Save details
          </Button> */}
        </CardActions>
      </Card>
    </form>
  );
};
