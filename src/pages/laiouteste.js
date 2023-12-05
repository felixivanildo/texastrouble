import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import DataComponent from './imagevisualiser';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '80vh',
  overflow: "scroll",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const JsonTableEditor = (props) => {
  const { handleSubmit, control } = useForm();
  const [edit, setEdit] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  //   const { fields, remove } = useFieldArray({ control, name: 'data' });



  const onSubmit = (data) => {
    console.log('Updated data:', data.data);
    // You can handle the updated data as needed (e.g., send it to a server)
  };

  const [values, setValues] = useState([{}])
  const [files, setFiles] = useState([{}])




  useEffect(() => {
    const getdata = async () => {


      var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', { id: props.id })

      // console.log(retrieved)
      setValues(retrieved.data.data)
      setFiles(retrieved.data.files)

    }


    getdata()
  }, [])


  const handleUpdate = async (data) => {
    setOpen(true)
    setEdit(data.userid)
    // await axios.post('http://10.254.4.132:3010/api/updateUser', data)

  }


  return (
    <div>


      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
            <DataComponent files={files}></DataComponent>
            <br></br>
            <Button  style={{backgroundColor: "var(--primary-color)", color:"white"}}>Adicionar Nova Imagem</Button>
            </div>
          </Box>
        </Modal>
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
          <Button onClick={() => {handleUpdate('row')} } type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JsonTableEditor;
