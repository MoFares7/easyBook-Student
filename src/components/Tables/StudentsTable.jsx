import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Box, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import colors from '../../assets/theme/base/colors';
import rgba from '../../assets/theme/functions/rgba';
import male from '../../assets/icons/male.png';
import female from '../../assets/icons/female.png';
import c_orange from '../../assets/icons/c_orange.png';
import c_blue from '../../assets/icons/c_blue.png';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import MDTypography from '../../items/MDTypography';
import typography from './../../assets/theme/base/typography';
import borders from '../../assets/theme/base/borders';

// Custom styled components
const StyledTable = styled(Table)({
        borderCollapse: 'collapse',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
        border: 'none',
        [`&.${tableCellClasses.head}`]: {
                backgroundColor: colors.primary.state,
                color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
        },
}));

const StyledTableRow = styled(TableRow)(({ theme, isEven }) => ({
        backgroundColor: isEven ? 'white' : rgba(colors.primary.main, 0.08),
        '& td, & th': {
                border: 'none',
        },
}));

function createData(firstName, lastName, educationLevel, gender, country, city, mobileNumber, note, action) {
        return { firstName, lastName, educationLevel, gender, country, city, mobileNumber, note, action };
}

const rows = [
        createData('Frozen yoghurt', 159, 'High School', 'Male', 4.0, 4.0, 4.0, 4.0, 4.0),
        createData('Ice cream sandwich', 237, 'Bachelor', 'Female', 4.3, 4.0, 4.0, 4.0, 4.0),
        createData('Eclair', 262, 'Master', 'Male', 6.0, 4.0, 4.0, 4.0, 4.0),
        createData('Cupcake', 305, 'High School', 'Female', 4.3, 4.0, 4.0, 4.0, 4.0),
        createData('Ice cream sandwich', 237, 'Bachelor', 'Female', 4.3, 4.0, 4.0, 4.0, 4.0),
        createData('Gingerbread', 356, 'Doctorate', 'Male', 3.9, 4.0, 4.0, 4.0, 4.0),
        createData('Ice cream sandwich', 237, 'Bachelor', 'Female', 4.3, 4.0, 4.0, 4.0, 4.0),

        // Add more rows if needed
];

export default function StudentsTable() {
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(3);

        const handleChangePage = (event, newPage) => {
                setPage(newPage - 1);
        };

        const handleChangeRowsPerPage = (event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
        };

        const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
                <Box>
                        <TableContainer component={Paper}>
                                <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                                <StyledTableRow>
                                                        <StyledTableCell>First Name</StyledTableCell>
                                                        <StyledTableCell align="center">Last Name</StyledTableCell>
                                                        <StyledTableCell align="center">Educational level</StyledTableCell>
                                                        <StyledTableCell align="center">Gender</StyledTableCell>
                                                        <StyledTableCell align="center">Country</StyledTableCell>
                                                        <StyledTableCell align="center">City</StyledTableCell>
                                                        <StyledTableCell align="center">Mobile Number</StyledTableCell>
                                                        <StyledTableCell align="center">Notes</StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                                </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                                {paginatedRows.map((row, index) => (
                                                        <StyledTableRow key={row.firstName} isEven={index % 2 === 0}>
                                                                <StyledTableCell component="th" scope="row">
                                                                        {row.firstName}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                                <img
                                                                                        src={row.educationLevel === 'High School' ? c_orange : c_blue}
                                                                                        alt={row.educationLevel}
                                                                                        style={{ width: 9, height: 9 }}
                                                                                />
                                                                                <span>{row.educationLevel}</span>
                                                                        </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                <img
                                                                                        src={row.gender === 'Male' ? male : female}
                                                                                        alt={row.gender}
                                                                                        style={{ width: 15, height: 20 }}
                                                                                />
                                                                                <span>{row.gender}</span>
                                                                        </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{row.country}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.city}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.note}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <Box style={{ display: 'flex', gap: '0px', justifyContent: 'center' }}>
                                                                                <IconButton>
                                                                                        <img src={deleteIcon} alt="Delete" style={{ width: 25, height: 25 }} />
                                                                                </IconButton>
                                                                                <IconButton>
                                                                                        <img src={editIcon} alt="Edit" style={{ width: 25, height: 25 }} />
                                                                                </IconButton>
                                                                        </Box>
                                                                </StyledTableCell>
                                                        </StyledTableRow>
                                                ))}
                                        </TableBody>
                                </StyledTable>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <MDTypography typography={typography.caption}>Rows per page:</MDTypography>
                                        <Select
                                                value={rowsPerPage}
                                                onChange={handleChangeRowsPerPage}
                                                sx={{
                                                        borderRadius:borders.borderRadius.lg,
                                                        width: '50%',
                                                        height: '32px', 
                                                        '.MuiSelect-select': {
                                                                height: '32px', 
                                                        },
                                                        '.MuiMenuItem-root': {
                                                                fontSize: '14px', 
                                                        },
                                                }}
                                        >
                                                <MenuItem sx={{ fontSize: '14px' }} value={5}>5</MenuItem>
                                                <MenuItem sx={{ fontSize: '14px' }} value={10}>10</MenuItem>
                                                <MenuItem sx={{ fontSize: '14px' }} value={15}>15</MenuItem>
                                        </Select>
                                </Box>
                                <Pagination
                                        count={Math.ceil(rows.length / rowsPerPage)}
                                        page={page + 1}
                                        onChange={handleChangePage}
                                        shape="rounded"
                                        color="primary"
                                />
                        </Box>
                </Box>
        );
}
