import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";


const PetDetail = props => {

    const id = useParams();
    const history = useHistory();

    const [petInfo, setpetInfo] = useState({
        name: "",
        type: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: ""
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id.id}`)
            .then(res => {
                console.log(res);
                setpetInfo({
                    ...petInfo,
                    ...res.data.Pet
                })
            })
    }, [])

    function adopt(){
        axios.delete(`http://localhost:8000/api/pet/${id.id}`)
        .then(res => {
            console.log(res);
            history.push("/");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Link to="/">back to home</Link>
            <h2>Details about: {petInfo.name} </h2>
            <button onClick={adopt}>Adopt {petInfo.name}?</button>
            <ul>
                <li>Pet Type : {petInfo.type}</li>
                <li>Pet Description : {petInfo.description}</li>
                <li>Skills : {petInfo.skill1} {petInfo.skill2} {petInfo.skill3}</li>
            </ul>
        </>
    );
}

export default PetDetail;