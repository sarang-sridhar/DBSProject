import * as React from 'react';

import {
  Button,
  TextField,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@mui/material';
import axios from '../axios-study';

export default function AddTime() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    axios.get('/get_store').then((response) => {
      // console.log(response.data);
      setRows(response.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: '20px auto' }}>
        <Table sx={{ minWidth: 800, maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Product Id</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Product Baseprice</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Set Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.product_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.product_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.product_baseprice}
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    label="Enter the number of hours for bid end-time from now"
                    fullWidth
                    type="number"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button variant="contained">UPDATE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
