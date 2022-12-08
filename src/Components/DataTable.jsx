import React, {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function DataTable() {
    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch("https://api.github.com/search/repositories?q=react&per_page=10")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setRepos(data.items)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    return (  
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                
                <TableHead font-weight="bold">
                <TableRow>
                    <TableCell >Name</TableCell>
                    <TableCell align="right">Stars</TableCell>
                    <TableCell align="right">Forks</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                {repos.map((repo) => (
                    <TableRow
                    key={repo.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{repo.full_name}</TableCell>
                    <TableCell align="right">{repo.stargazers_count}</TableCell>
                    <TableCell align="right">{repo.forks_count}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
  );
}

export default DataTable