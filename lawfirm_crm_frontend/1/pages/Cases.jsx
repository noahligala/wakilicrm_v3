import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, Box } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useTheme, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '2px', // Adjust padding to make rows more compact
  fontSize: '0.65rem', // Reduce font size for denser text
  borderRight: '1px solid rgba(224, 224, 224, 0.5)', // Add border at the bottom of each row
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Cases({ setTitle }) {
  useEffect(() => {
    setTitle('Cases');
  }, [setTitle]);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = () => {
      fetch('http://localhost:8000/api/cases')
        .then(response => {
          if (!response.ok) {
            throw new Error('Unable to fetch cases');
          }
          return response.json();
        })
        .then(data => setRows(data))
        .catch(error => {
          console.error('Error fetching cases:', error);
          setError('Error fetching cases. Please try again later.');
        });
    };

    // Fetch cases immediately
    fetchCases();

    // Fetch cases every 5 seconds
    const intervalId = setInterval(fetchCases, 5000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper sx={{mt:5}}>
      <TableContainer>
        <Table sx={{minWidth: 750 }} size="small" aria-label="a dense table">
          <TableHead >
            <TableRow sx={{color: 'primary', transform: 'uppercase'}}>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Case</StyledTableCell>
              <StyledTableCell align="center">Court</StyledTableCell>
              <StyledTableCell align="center">Client</StyledTableCell>
              <StyledTableCell align="center">Opposing Client</StyledTableCell>
              <StyledTableCell align="center">Updated</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Edit/Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell >{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.court}</StyledTableCell>
                <StyledTableCell align="center">{row.client}</StyledTableCell>
                <StyledTableCell align="center">{row.opposing_counsel}</StyledTableCell>
                <StyledTableCell align="center">{row.updated_at}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button aria-label="delete" size="small" href="#contained-buttons">
                    <DriveFileRenameOutlineIcon />
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows,  border: '1px'}}>
                <StyledTableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <TableRow>
          <TablePagination
            p={5}
            rowsPerPageOptions={[10, 20, 25, { label: 'All', value: -1 }]}
            colSpan={8}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Paper>
  );
}
