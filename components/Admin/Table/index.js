import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../../../styles/Table.module.css';
import {getUsers, isAuthenticated} from '../../../actions/userApi';


export default function BasicTable() {
  const [rows, setRows] = React.useState([]);

  const getAllUsers = () => {
    getUsers().then(res => {
      console.log(res.data);
      setRows(res.data);
      
    })
  };

  React.useEffect(() => {
    getAllUsers();
    console.log('rows', rows)
  }, []);

  return (
    <TableContainer component={Paper} className={styles.container}> 
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tracking ID</TableCell>
            <TableCell className={styles.cell} align="right">Name</TableCell>
            <TableCell className={styles.cell} align="right">Email</TableCell>
            <TableCell className={styles.cell} align="right">Joined</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell className={styles.cell} align="right">{row.name}</TableCell>
              <TableCell className={styles.cell} align="right">{row.email}</TableCell>
              <TableCell className={styles.cell} align="right">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}