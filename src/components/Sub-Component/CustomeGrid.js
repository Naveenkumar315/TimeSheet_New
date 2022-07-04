import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function StickyHeadTable(props) {

    const columns = props['Columns'];
    const rows = props['Rows'];
    const Pagination = props['Pagination']

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getPagination = () => {
        if (Pagination)
            return (<TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />);
    }
    return (
        <Paper sx={{ width: '100%', maxHeight: '80vh', overflow: 'auto', border: '1px solid ' + localStorage['BgColor'], height: 'auto' }}>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: localStorage['BgColor'] }}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: localStorage['BgColor'], color: '#fff', padding: '10px' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={index} align={column.align} style={{ padding: '9px' }}>
                                                    {column.button && row.LeaveType !== 'Total'
                                                        ? <button className='btnAction' onClick={() => alert('Why You clicked Meee 😡😡😡 !!!, Paithiyam')}>{column.button}</button>
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {getPagination()}

        </Paper >
    );
}
