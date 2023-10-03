// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Divider,
//   Typography
// } from '@mui/material';

// const user = {
//   avatar: '/assets/avatars/avatar-anika-visser.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Anika Visser',
//   timezone: 'GTM-7'
// };

// export const AccountProfile = () => (
//   <Card>
//     <CardContent>
//       <Box
//         sx={{
//           alignItems: 'center',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         <Avatar
//           src={user.avatar}
//           sx={{
//             height: 80,
//             mb: 2,
//             width: 80
//           }}
//         />
//         <Typography
//           gutterBottom
//           variant="h5"
//         >
//           {user.name}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.city} {user.country}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.timezone}
//         </Typography>
//       </Box>
//     </CardContent>
//     <Divider />
//     <CardActions>
//       <Button
//         fullWidth
//         variant="text"
//       >
//         Upload picture
//       </Button>
//     </CardActions>
//   </Card>
// );
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const AccountProfile = () => {
  const [user, setUser] = useState([{
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  }]);

  useEffect(() => {
    // Simulating an asynchronous database fetch
    const fetchUserFromDatabase = async () => {
      try {
        // Replace this with your actual database fetch logic
        const response = await axios.get('http://10.254.4.132:3010/api/id'); // Assuming you have an API endpoint for fetching user data
        // console.log(response.body)
        // const userData = await response.json();
        console.log(response.data[0])
        setUser(response.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserFromDatabase();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  if (!user) {
    // You can render a loading state or fallback UI while waiting for the data
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.city} {user.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
