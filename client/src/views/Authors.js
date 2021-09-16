import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Authors = (props) => {
    // On first load this empty array will be displayed (shows nothing).
    // When the data comes back and this state is set, it re-renders.
    const[authors, setAuthors] = useState([]);

    /*
    Empty arr is second argument means this will only happenon the first render
    of this component.
    */
    useEffect(() => {
        axios
            .get("http://localhost:8000/api")
            .then((res) => {
                setAuthors(res.data.sort((a,b)=>a.name.localeCompare(b.name)));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (delId) => {
        axios
        .delete("http://localhost:8000/api/" + delId)
        .then((res) => {
            // It has successfully been deleted from the DATABASE
            // It is still IN our state, we need to remove it from state.
            const filterAuthors = authors.filter((auth) => {
                return auth._id !== delId;
            });

            setAuthors(filterAuthors);
        })
        .catch((err) => {
            console.log(err.response);
        });
    };

    return (
        <div className="w-25 p-4 rounded shadow">
            <Link to="/new">Add an author</Link>
            <p>We have quotes by:</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                {authors.map((auth) => {
                    return (
                        <tr key={auth._id}>
                            <td>
                                <Link to={`/edit/${auth._id}`}>
                                    <p>{auth.name}</p>
                                </Link>
                            </td>
                            <td>
                                <Link
                                    to={`/edit/${auth._id}`}
                                    className="btn btn-sm btn-outline-warning mx-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => {
                                        handleDelete(auth._id);
                                    }}
                                    className="btn btn-sm btn-outline-danger mx-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Authors;