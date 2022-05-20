import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PetTable = props => {

    const [petList, setPetList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet`)
            .then(res => {
                console.log(res);
                setPetList(res.data.Pet);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <Link to="/pets/new">add a pet to the shelter</Link>
            <h2>These pets are looking for a good home</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                petList.map((ele, i) => {
                    return(
                        <tr key={i}>
                            <td>{ele.name}</td>
                            <td>{ele.type}</td>
                            <td><Link to={`/pets/${ele._id}`}>Details</Link> | <Link to={`/pets/${ele._id}/edit`}>Edit</Link></td>
                        </tr>
                    );
                })
            }
                </tbody>
            </table>

        </>
    )
}

export default PetTable;