const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

////////////////// dummy data
var books = [
    { name: 'Name of the wind', genre: 'fantasy', id: '1', authorId: '1' },
    { name: 'The final empire', genre: 'fantasy', id: '2', authorId: '2' },
    { name: 'The long earth', genre: 'Sci-ficti', id: '3', authorId: '3' },
    { name: 'Les miserables', genre: 'fantasy', id: '4', authorId: '1' },
    { name: 'without family', genre: 'fantasy', id: '5', authorId: '3' },
    { name: 'Dimna', genre: 'Sci-ficti', id: '6', authorId: '3' },
]
var authors = [
    { name: 'Kolarov 11', age: 41, id: '1' },
    { name: 'Kolarov 22', age: 42, id: '2' },
    { name: 'Kolarov 33', age: 43, id: '3' },
]
///////////////////////

const BookType = new GraphQLObjectType({
    name: 'Book',
    // wrap it in a function Later ***
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // wrap it in a function
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db/ other source
                console.log(typeof args.id);
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
