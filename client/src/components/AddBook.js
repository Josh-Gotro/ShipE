import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAuthorsQuery } from '../queries/queries'

const AddBook = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [authorID, setAuthorID] = useState("")


    const displayAuthors = () => {
        if (loading) return <option disabled>Loading...</option>;
        if (error) return <option disabled>Error :(</option>;

        return data.authors.map(({ name, id }) => (
            <option key={id} value={id}>{name}</option>
        ));
    }

    return (
        <>
            <form id="add-book">

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select Author</option>
                        {displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        </>
    );
}

export default AddBook;
