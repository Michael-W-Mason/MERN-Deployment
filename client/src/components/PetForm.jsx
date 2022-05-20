import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PetForm = props => {

    const history = useHistory();
    const id = useParams();

    const [errorList, setErrorList] = useState({
        name: "",
        type: "",
        description: ""
    })

    const [petForm, setPetForm] = useState({
        name: "",
        type: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });

    useEffect(() => {
        if (id.id !== undefined) {
            axios.get(`http://localhost:8000/api/pet/${id.id}`)
                .then(res => {
                    console.log(res);
                    setPetForm({
                        ...petForm,
                        ...res.data.Pet
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [])


    function changHandler(e) {
        e.preventDefault();
        setPetForm({
            ...petForm,
            [e.target.name]: e.target.value
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        if (id.id !== undefined) {
            axios.put(`http://localhost:8000/api/pet/${id.id}`, { ...petForm })
                .then(res => {
                    console.log(res);
                    if (res.data.error !== undefined) {
                        throw (res);
                    }
                    setPetForm({
                        name: "",
                        type: "",
                        description: "",
                        skill1: "",
                        skill2: "",
                        skill3: ""
                    });
                    history.push("/");
                })
                .catch(err => {
                    console.log(err);
                    setErrorList({ ...errorList, ...err.data.error.errors });
                    if(err.data.error == "Name already exists"){
                        console.log("Here");
                        setErrorList({...errorList, name : {message : "Name already exists"}});
                    }
                })
        }
        else {
            axios.post("http://localhost:8000/api/pet", { ...petForm })
                .then(res => {
                    console.log(res);
                    if (res.data.error !== undefined) {
                        throw (res);
                    }
                    setPetForm({
                        name: "",
                        type: "",
                        description: "",
                        skill1: "",
                        skill2: "",
                        skill3: ""
                    });
                    history.push("/");
                })
                .catch(err => {
                    console.log(err);
                    setErrorList({ ...errorList, ...err.data.error.errors });
                    if(err.data.error == "Name already exists"){
                        console.log("Here");
                        setErrorList({...errorList, name : {message : "Name already exists"}});
                    }
                })
        }
    }

    return (
        <>
            <Link to="/">back to home</Link>
            <h2>{id.id ? `Edit ${petForm.name}` : `Know a pet needing a home?`}</h2>
            <form onSubmit={submitHandler}>
                <p>{errorList.name.message}</p>
                <label htmlFor="name">Pet Name:</label>
                <input type="text" name="name" onChange={changHandler} defaultValue={petForm.name} />
                <p>{errorList.type.message}</p>
                <label htmlFor="type">Pet Type:</label>
                <input type="text" name="type" onChange={changHandler} defaultValue={petForm.type} />
                <p>{errorList.description.message}</p>
                <label htmlFor="description">Pet Description:</label>
                <input type="text" name="description" onChange={changHandler} defaultValue={petForm.description} />
                <p>Skills (optional):</p>
                <label htmlFor="skill1">Skill 1:</label>
                <input type="text" name="skill1" onChange={changHandler} defaultValue={petForm.skill1} />
                <label htmlFor="skill2">Skill 2:</label>
                <input type="text" name="skill2" onChange={changHandler} defaultValue={petForm.skill2} />
                <label htmlFor="skill3">Skill 3:</label>
                <input type="text" name="skill3" onChange={changHandler} defaultValue={petForm.skill3} />
                <button type="submit">{id.id ? "Edit Pet" : "Add Pet"}</button>
            </form>
        </>
    );
}

export default PetForm;