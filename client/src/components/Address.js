import React, { useState } from 'react';

const Address = (props) => {
    const [toggle, setToggle] = useState(false)

    function showAddress() {
        return (<>
            {name}<br></br>
            {company_name}<br></br>
            {phone}<br></br>
            {address_line1}<br></br>
            {city_locality}<br></br>
            {state_province}<br></br>
            {postal_code}
        </>)
    }

    function actionWord() {
        if (toggle) {
            return "HIDE"
        } else {
            return "SHOW"
        }
    }

    const {
        name,
        company_name,
        phone,
        address_line1,
        city_locality,
        state_province,
        postal_code
    } = props.address

    return (
        <>
            <button onClick={() => setToggle(v => !v)}>{actionWord()} + ADDRESS</button>
            <div>
                {toggle ? showAddress() : null}
            </div>
        </>
    );
}

export default Address;
