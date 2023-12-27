import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import JsonTableEditor from 'src/pages/reporteditor';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import PrintIcon from '@mui/icons-material/Print';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '80vh', // Set your desired height
  overflowX: 'auto', // Add overflow scrolling on the x-axis if needed
  overflowY: 'auto', // Add overflow scrolling on the y-axis if needed
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState('');
  const [selectedRepo, setSelectedtRepo] = useState ('')

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const handleUpdate = async (data, name) => {

    setOpen(true)
    setSelectedtRepo(name)
    setEdit(data)
    // await axios.post('http://10.254.4.132:3010/api/updateUser', data)

  }


  const handlePrint = async (data) =>{
      console.log(data)
      await axios.put("http://10.254.4.132:3010/api/print", {id: data})
  }

  return (


    <Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <h2>

            {selectedRepo}
          </h2>
          <div>
            <JsonTableEditor reponame={selectedRepo} key={edit} id={edit} ></JsonTableEditor>
          </div>
        </Box>
      </Modal>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  /> */}
                </TableCell>
                <TableCell>
                  Usuario Atual
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Setor
                </TableCell>
                <TableCell>
                  Laudo
                </TableCell>
                <TableCell>
                  Ultima Alteração
                </TableCell>
                <TableCell>
                  Imprimir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = String(customer.createdAt).substring(0, 10);

                return (



                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >

                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      /> */}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>

                      {customer.email}

                    </TableCell>
                    <TableCell>

                      {customer.address.city}, {customer.address.state}, {customer.address.country}

                    </TableCell>
                    <TableCell>
                      <Button onClick={() => { handleUpdate(customer.id, customer.phone) }} style={{ margin: "0px", padding: "0px" }}>
                        {customer.phone}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => { handlePrint(customer.id) }} style={{paddingLeft: "0", marginLeft: "0"}} startIcon={<PrintIcon/>}>
                        Imprimir
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
