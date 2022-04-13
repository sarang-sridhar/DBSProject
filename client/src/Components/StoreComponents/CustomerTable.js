import React from 'react';

import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@mui/material';
import axios from '../../axios-study';
import FadeLoader from 'react-spinners/FadeLoader';

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

function getDate(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  var now = new Date(date);
  return (
    days[now.getDay()] +
    ' ' +
    months[now.getMonth()] +
    ' ' +
    now.getDate() +
    ' ' +
    now.getFullYear()
  );
}

export default function CustomerTable() {
  let [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/my_products', { params: { uid: sessionStorage.getItem('uid') } })
      .then((response) => {
        // console.log(response.data);
        setLoading(false);
        setRows(response.data);
      });
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, margin: '20px auto' }}
        style={{ opacity: loading ? '0.5' : '1' }}>
        <Table sx={{ minWidth: 800, maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Product Id</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Price Paid</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Time When Bought</TableCell>
              {/* <TableCell style={{ fontWeight: 'bold' }}>Set Time</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.length ? (
                rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.item_id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.product_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.current_price}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {getDate(row.time.slice(0, 10)) + ' ' + tConvert(row.time.slice(11, 16))}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                  <TextField
                    label="Enter the number of hours for bid end-time from now"
                    fullWidth
                    type="number"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button variant="contained">UPDATE</Button>
                </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <>No items Bought Yet</>
              )
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
        <FadeLoader
          color={'blue'}
          loading={loading}
          size={350}
          css={{ position: 'absolute', left: '50%', top: '50%' }}
        />
      </TableContainer>
    </>
  );
}
