import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";;

const EditAuthor = (props) => {
    const[auth, setAuth] = useState(null);
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const { id } = useParams();

    /* 
    Empty arr as second argument means this will only happen on the first render
    of this component.
    */
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/" + id)
            .then((res) => {
                setAuth(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleOnChange = (e) => {
        const keyBeingUpdated = e.target.name;
        const newValue = e.target.value;

        setAuth({ ...auth, [keyBeingUpdated]: newValue });
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
    
        axios
            .put("http://localhost:8000/api/edit/" + auth._id, auth)
            .then((res) => {
                console.log(res.data);
                // Route user to the new destination's page.
                history.push(`/`);
            })
            .catch((err) => {
                // THIS CATCH only triggers because our controller uses
                // res.status(400).json(err);
                setErrors(err.response.data.errors);
                console.log(err.response);
            });
        };
    
        if (auth === null) {
            // return "We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?";
            return (
                <div>
                    <h6 className="text-danger">We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</h6>
                    <Link to="/new">Add an author</Link>
                </div>
            );
        }
    
        return (
            <div className="w-25 p-4 rounded shadow">
                <Link to="/">Home</Link>
                <p>Edit this author</p>
                <form
                    onSubmit={(e) => {
                        handleEditSubmit(e);
                    }}
                >
                    <div className="form-group">
                        <label className="h6">Name</label>
                        {errors?.name && (
                            <span className="text-danger"> {errors?.name?.message}</span>
                        )}
                        <input
                            onChange={(e) => {
                                handleOnChange(e);
                            }}
                            type="text"
                            className="form-control"
                            value={auth.name}
                            name="name"
                        />
                    </div>
                    
                    <Link to="/" className="btn btn-sm btn-outline-warning mx-1">Cancel</Link>
                    <button className="btn btn-sm btn-outline-success">Submit</button>
                </form>
            </div>
        );
};

export default EditAuthor;