import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import Laudo from './formularios/laudo';


const now = new Date();


const Page = () => {
const [searchTerm, setSearchTerm] = useState('');

  

const [data, setData] = useState  ( 
   [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  // 
] 

);

const [ searchedata, setSearchdata] = useState (data);

const handleSearch = (value) => {
  // console.log('Search value:', value);
  setSearchTerm(value);

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase()) ||
      item.phone.includes(value)
      // Add more conditions based on other properties you want to search
      // ...
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    return a.name.localeCompare(b.name);
    // You can customize the sorting logic based on your requirements
  });

  
  setSearchdata(sortedData)  
  // console.log(searchedata)
  
};

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(searchedata, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage)
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [isVisible, setIsVisible] = useState ('none')

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const toggleVisible = ()=>{
     isVisible === 'none' ? setIsVisible('') : setIsVisible('none')
    //  console.log(isVisible)
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const retrievedData = await axios.get('http://10.254.4.132:3010/api/getall');
        setData(retrievedData.data);
        setSearchdata(retrievedData.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(true)
      }
    };

    fetchData();
  }, [])




  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Laudos
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  onClick={()=>{toggleVisible()}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Criar
                </Button>
              </div>
            </Stack>

            <div className="slide-in-element" style={{marginLeft: '20%', display: `${isVisible}`}}>
              <Laudo/>
            </div>

            <CustomersSearch onSearch={handleSearch}/>
            { loading &&
            <CustomersTable
              count={data.length}
              items={searchedata}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
            }
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
