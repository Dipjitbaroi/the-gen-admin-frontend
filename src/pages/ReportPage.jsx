// // src/components/ReportPage.js
// import React from 'react';
// import { Button, Card, CardContent, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(() => ({
//   card: {
//     marginBottom: '1rem',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   status: {
//     color: 'green',
//   },
// }));

// const ReportPage = () => {
//   const classes = useStyles();

//   return (
//     <div className="p-4">
//       <div className="flex justify-end space-x-2">
//         <Button variant="contained" color="warning">Temporarily Ban User</Button>
//         <Button variant="contained" color="error">Permanently Ban User</Button>
//       </div>

//       <Card className={classes.card}>
//         <CardContent>
//           <div className={classes.header}>
//             <Typography variant="h6">About The Report</Typography>
//             <Typography variant="body2" className={classes.status}>Open</Typography>
//           </div>
//           <Typography variant="body2">Report ID: 00001</Typography>
//           <Typography variant="body2">Report Type: Harassment</Typography>
//           <Typography variant="body2">Reported On: 20/02/2024 04:56 PM</Typography>
//           <Typography variant="body2">Communication: 10 minutes</Typography>
//           <Typography variant="body2">Comment: Lorem ipsum dolor sit amet consectetur...</Typography>
//         </CardContent>
//       </Card>

//       <Card className={classes.card}>
//         <CardContent>
//           <Typography variant="h6">People</Typography>
//           <Typography variant="body2">Reported User: Fiona Albert, She/Her, 28 years old, London, UK, Languages: English, Spanish, Arabic</Typography>
//           <Typography variant="body2">Reported By: Fiona Albert, She/Her, 28 years old, London, UK, Languages: English, Spanish, Arabic</Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ReportPage;
