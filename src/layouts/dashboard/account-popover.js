import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AccountPopover = (props) => {
  const [user, setUser] = useState ({})
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  useEffect(()=>{
    const fetchUserFromDatabase = async () => {
      try {
        // Replace this with your actual database fetch logic
        const response = await AsyncStorage.getItem('@user') // Assuming you have an API endpoint for fetching user data
        // console.log(response.body)
        // const userData = await response.json();
        // console.log(response)
        setUser(JSON.parse(response));
      } catch (error) {
        console.error('Error fetching user:', error);
      }}

      fetchUserFromDatabase()
  },[])


  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.firstName + ' ' + user.lastName}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
