import { gql } from 'apollo-boost';

const getAddressesQuery = gql`
{
    addresses{
        name
        phone
        company_name
        address_line1
        city_locality
        state_province
        postal_code
        country_code
        address_residential_indicator
        labels{
            tracking_number
            ship_date
        }
    }
}
`

const getLabelsQuery = gql`
{
  labels{
      ship_date
      shipment_cost
      tracking_number
      label_download
      address{
        name
        phone
        company_name
        address_line1
        city_locality
        state_province
        postal_code
        country_code
        address_residential_indicator
      }
  }
}
`

const addAddressMutation = gql`
mutation($name: String!, $phone: String!, $company_name: String!, $address_line1: String!, $city_locality: String!, $state_province: String!, $postal_code: String!, $country_code: String!, $address_residential_indicator: String!){
    addAddress(
        name: $name,
        phone: $phone,
        company_name: $company_name,
        address_line1: $address_line1,
        city_locality: $city_locality,
        state_province: $state_province,
        postal_code: $postal_code,
        country_code: $country_code,
        address_residential_indicator: $address_residential_indicator
    ){
        name
        phone
        company_name
        address_line1
        city_locality
        state_province
        postal_code
        country_code
        address_residential_indicator
    }
}
`

const addLabelMutation = gql`
mutation($ship_date: String!, $shipment_cost: Number!, $tracking_number: String!, $label_download: String!, $addressId: ID!){
    addAddress(
        ship_date: $ship_date,
        shipment_cost: $shipment_cost,
        tracking_number: $tracking_number,
        label_download: $label_download,
        addressId: $addressId
    ){
        ship_date
        shipment_cost
        tracking_number
        label_download
    }
}
`

export { getAddressesQuery, getLabelsQuery, addAddressMutation, addLabelMutation };