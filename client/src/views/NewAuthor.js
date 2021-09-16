import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const NewAuthor = (props) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(null);

    // Used for routing the user to a new url.
    const history = useHistory();

    const handleNewProductSubmit = (e) => {
        e.preventDefault(); // stop page refresh

        const NewAuthor = {
            name
        };

        axios
            .post("http://localhost:8000/api", NewAuthor)
            .then((res) => {
                console.log(res.data);
                // Route user to the new product's page.
                history.push(`/`);
        })
        .catch((err) => {
            setErrors(err.response.data.errors);
            console.log(err.response);
        });
    };

    return (
        <div className="w-25 p-4 rounded shadow">
            <Link to="/">Home</Link>
            <p>Add a new author:</p>
            <form
                onSubmit={(e) => {
                    handleNewProductSubmit(e);
                }}
            >
                <div className="form-group">
                    <label className="h6">Name:</label>
                    {errors?.name && (
                        <span className="text-danger"> {errors?.name?.message}</span>
                    )}
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                    />
                </div>

                <Link to="/" className="btn btn-sm btn-outline-warning mx-1">Cancel</Link>
                <button className="btn btn-sm btn-outline-success">Submit</button>
            </form>
        </div>
    );
};

export default NewAuthor;