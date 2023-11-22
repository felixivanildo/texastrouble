import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const JsonTableEditor = (props) => {
    const { handleSubmit, control } = useForm();
//   const { fields, remove } = useFieldArray({ control, name: 'data' });



  const onSubmit = (data) => {
    console.log('Updated data:', data.data);
    // You can handle the updated data as needed (e.g., send it to a server)
  };

  const [values, setValues] = useState ([{}])

  useEffect(() => {
    const getdata = async () => {


      var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', {id: props.id})

      console.log(retrieved)
      setValues(retrieved.data)

    }


    getdata()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(values[0]).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    <Controller
                      name={`data.${key}`}
                      control={control}
                      defaultValue={value}
                      render={({ field }) => <TextField {...field} />}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default JsonTableEditor;
