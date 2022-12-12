import React, {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Link from '@mui/material/Link';


function DataTable() {
  const [repos, setRepos] = useState([]);

    useEffect(() => {
      fetch("https://api.github.com/search/repositories?q=react&per_page=100")
        .then(res => res.json())
        .then(data => {
          console.log(data);
            setRepos(data.items)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, repos.length - page * rowsPerPage);

    return (  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                
          <TableHead>
          <TableRow>
            <TableCell >Repositories</TableCell>
            <TableCell align="right">Stars</TableCell>
            <TableCell align="right">Forks</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                {repos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((repo, index) => (
                    <TableRow key={repo.id}>
                    <TableCell component="th" scope="row">
                      <Link href={repo.html_url} underline="none">{repo.full_name}</Link>
                    </TableCell>
                    <TableCell align="right">{repo.stargazers_count}</TableCell>
                    <TableCell align="right">{repo.forks_count}</TableCell>
                    </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
          </TableRow>
        )}
                </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
            </TableContainer>
            
  );
}


export default DataTable;