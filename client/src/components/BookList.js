import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAddressesQuery } from '../queries/queries'

function BookList() {
    const { loading, error, data } = useQuery(getAddressesQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.addresses.map(({ name, phone, company_name, address_line1, city_locality, state_province, postal_code, country_code, labels, id }) => (
        <>
            <div key={id}>
                {name}:<br></br>{phone}<br></br>{company_name}<br></br>{address_line1}<br></br>{city_locality}<br></br>{state_province}<br></br>{postal_code}<br></br>{country_code}<br></br>}
            </div><br></br>
        </>
    ));
}

export default BookList;
