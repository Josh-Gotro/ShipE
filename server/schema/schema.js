const graphql = require('graphql');
const _ =  require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const Address = require('../models/address');
const Label = require('../models/label');



const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat 
} = graphql;

// TYPES
const LabelType = new GraphQLObjectType({
    name: 'Label',
    fields: () => ({
        id: { type: GraphQLID },
        ship_date: { type: GraphQLString },
        shipment_cost: { type: GraphQLString },
        tracking_number: { type: GraphQLString },
        label_download: { type: GraphQLString },
        address: {
            type: AddressType,
            resolve(parent, args) {
                // code to get data from db / other source
                return Address.findById(parent.addressId)
            }
        }
    })
});

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        company_name: { type: GraphQLString },
        address_line1: { type: GraphQLString },
        address_line2: { type: GraphQLString },
        address_line3: { type: GraphQLString },
        city_locality: { type: GraphQLString },
        state_province: { type: GraphQLString },
        postal_code: { type: GraphQLString },
        country_code: { type: GraphQLString },
        address_residential_indicator: { type: GraphQLString },
        labels: {
            type: new GraphQLList(LabelType),
            resolve(parent, args) {
                return Label.find({ addressId: parent.id })
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // code to get data from db / other source
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id })
            }
        }
    })
});

// ROOT QUERIES   
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        label: {
            type: LabelType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Label.findById(args.id)
            }
        },
        address: {
            type: AddressType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Address.findById(args.id)
            }
        },
        labels: {
            type: new GraphQLList(LabelType),
            resolve(parent, args) {
                return Label.find({})
            }
        },
        addresses: {
            type: new GraphQLList(AddressType),
            resolve(parent, args) {
                return Address.find({})
            }
        },

        // vvvvvvvvvv Old vvvvvvvvvv
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    }
});

// MUTATIONS
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAddress: {
            type: AddressType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                company_name: { type: new GraphQLNonNull(GraphQLString) },
                address_line1: { type: new GraphQLNonNull(GraphQLString) },
                address_line2: { type: GraphQLString },
                address_line3: { type: GraphQLString },
                city_locality: { type: new GraphQLNonNull(GraphQLString) },
                state_province: { type: new GraphQLNonNull(GraphQLString) },
                postal_code: { type: new GraphQLNonNull(GraphQLString) },
                country_code: { type: new GraphQLNonNull(GraphQLString) },
                address_residential_indicator: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let address = new Address({
                    name: args.name,
                    phone: args.phone,
                    company_name: args.company_name,
                    address_line1: args.address_line1,
                    address_line2: args.address_line2,
                    address_line3: args.address_line3,
                    city_locality: args.city_locality,
                    state_province: args.state_province,
                    postal_code: args.postal_code,
                    country_code: args.country_code,
                    address_residential_indicator: args.address_residential_indicator
                });
                return address.save()
            }
        },
        addLabel: {
            type: LabelType,
            args: {
                ship_date: { type: new GraphQLNonNull(GraphQLString) },
                shipment_cost: { type: new GraphQLNonNull(GraphQLFloat) },
                tracking_number: { type: new GraphQLNonNull(GraphQLString) },
                label_download: { type: new GraphQLNonNull(GraphQLString) },
                addressId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let label = new Label({
                    name: args.name,
                    ship_date: args.ship_date,
                    shipment_cost: args.shipment_cost,
                    tracking_number: args.tracking_number,
                    label_download: args.label_download,
                    addressId: args.addressId
                });
                return label.save();
            }
        },

        // vvvvvvvvvv Old vvvvvvvvvv
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})