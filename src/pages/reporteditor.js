import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import DataComponent from './imagevisualiser';
import { VisuallyHiddenInput } from "@chakra-ui/visually-hidden";

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
  const [selected, setSelected] = useState('fq')
  const [data, setData] = useState([{}])
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [loaded, setLoaded] = useState(false)
 

  //   const { fields, remove } = useFieldArray({ control, name: 'data' });



  const onSubmit = (data) => {
    console.log('Updated data:', data.data);
    // You can handle the updated data as needed (e.g., send it to a server)
  };


  // const [fq, setFq] = useState([{}])
  const [value, setValue] = useState([{}])
  // const [bc, setBc] = useState([{}])
  // const [clr, setClr] = useState([{}])
  const [files, setFiles] = useState([{}])
  const [curroption, setCurroption] = useState('')


  useEffect(() => {
    function filterKeysByPrefixAsync(obj, prefix) {

      try {
        const filteredObj = {};
        Object.keys(obj).forEach(key => {
          if (key.startsWith(prefix)) {
            filteredObj[key] = obj[key];
          }
        });

        return (filteredObj);
      } catch (error) {
        return (error);
      }
    };


    const filtered_fq = filterKeysByPrefixAsync(data, 'fq')
    const filtered_bc = filterKeysByPrefixAsync(data, 'bc')
    const filtered_clr = filterKeysByPrefixAsync(data, 'clr')

    setValue({ fq: filtered_fq, bc: filtered_bc, clr: filtered_clr })
    setLoaded(true)
    //  .then((e) => {
    //   if(!value.includes(e)){
    //   setValue(oldArray => [...oldArray, {value1: e}])
    // }
    // })

    //  filterKeysByPrefixAsync(data, 'bc').then((e) => {
    //   if(!value.includes(e)){
    //     setValue(oldArray => [...oldArray, {value2: e}])
    //   }
    // })


    //  filterKeysByPrefixAsync(data, 'clr').then((e) => {
    //   if(!value.includes(e)){
    //     setValue(oldArray => [...oldArray, {value3: e}])
    //   }
    // })


  },)


  useEffect(() => {
    const getdata = async () => {


      var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', { id: props.id })
      setData(retrieved.data.data[0])
      setFiles(retrieved.data.files)
      

    }


    getdata()
    // console.log(value)
  }, [])





  const handleUpdate = async (data) => {
    setOpen(true)
    setEdit(data.userid)
    // await axios.post('http://10.254.4.132:3010/api/updateUser', data)

  }


  const HandleUpdateImage = async () => {
    // console.log('heyyyyyyyyyyy, acaaaa!!!!!!!!!')
    var retrieved = await axios.put('http://10.254.4.132:3010/api/getexclusivereport', { id: props.id })
    console.log(retrieved.data.files)
    setFiles(retrieved.data.files)
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
            <div style={{}}>

              <DataComponent onAdd={HandleUpdateImage} reponame={props.reponame} id={props.id} files={files}></DataComponent>
              <br></br>
              
            </div>
          </Box>
        </Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display: "flex", justifyContent: "center"}}>
          <Button variant="contained" onClick={() => { handleUpdate('row') }}>IMAGENS</Button>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
           
            {[{ name: "fq", text: "FÍSICO QUÍMICO" },
            { name: "bc", text: "BACTERIOLOGICA" },
            { name: "clr", text: "CLOROFILA" }
            ].map((column) => (
              <div key={column.name}>
                <Button style={{ backgroundColor: column.name === curroption ? 'wheat' : '' }}
                  onClick={() => {
                    // handleSelect(column.tipo); !isVisible ? setVisible(true) : setVisible(true);
                    setSelected(column.name)
                    setCurroption(`${column.name}`)
                  }}>
                  {column.text}
                </Button>
              </div>
            ))}

          </div>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Campo</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(loaded ? value[selected] : [{}]).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{String(key).split('_')[1]}</TableCell>
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
          <Button  type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JsonTableEditor;
