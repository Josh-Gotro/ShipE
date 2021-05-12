import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getLabelsQuery } from '../queries/queries'
import Address from './Address'

function LabelList() {
    const { loading, error, data } = useQuery(getLabelsQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.labels.map(({
        ship_date,
        shipment_cost,
        tracking_number,
        label_download,
        address,
        id
    }) => (
        <div className="ShippingContainer">
            <div className="Label" key={id}>
                Printing Label: <br></br><a href={label_download}>{"View Label PDF"}</a><br></br>
                Tracking Number: {tracking_number}<br></br>
                Ship Date: {ship_date}<br></br>
                Shipping Cost: ${shipment_cost}<br></br><br></br>
            </div>
            <div className="Address" key={tracking_number}>
                <Address key={tracking_number} address={address} addressID={id} />
            </div>
        </div>
    ));
}

export default LabelList;

