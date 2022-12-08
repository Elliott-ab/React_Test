import React, {useState, useEffect} from "react";

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
        <div>
            <ul>
                {
                repos.map (repo => <li key={repo.id}>{repo.name}</li>)
                }  
            </ul>
        </div>
    )
}

export default DataTable