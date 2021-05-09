import { gql } from 'apollo-boost';


const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

const getBooksQuery = gql`
{
    books{
        name
        genre
        id
    }
}
`
const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name:$name, genre:$genre, authorId:$authorId){
        name
        genre
        id
    }
}
`

const addAddressMutation = gql`
mutation($name: String!, $phone: String!, $company_name: String!, $address_line1: String!, $city_locality: String!, $state_province: String!, $postal_code: String!, $country_code: String!, $address_residential_indicator: String!){
    addAddress(
        name: "Mr Crock",
        phone: "15127448788",
        company_name: "CROCS RETAIL, INC",
        address_line1: "7477 DRY CREEK PKWY",
        city_locality: "NIWOT",
        state_province: "CO",
        postal_code: "80503-8021",
        country_code: "US",
        address_residential_indicator: "yes"
    ){
        name
        phone
    }
}
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAddressMutation };

// mutation{
//     addAddress(
//         name: "Mr Crock",
//         phone: "15127448788",
//         company_name: "CROCS RETAIL, INC",
//         address_line1: "7477 DRY CREEK PKWY",
//         city_locality: "NIWOT",
//         state_province: "CO",
//         postal_code: "80503-8021",
//         country_code: "US",
//         address_residential_indicator: "yes"
//     ){
//         name
//         phone
//     }
// }