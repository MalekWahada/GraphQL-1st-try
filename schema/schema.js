const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
    {name: 'Name of the wind', genre: 'fantasy', id: 1},
    {name: 'The final empire', genre: 'fantasy', id: 2},
    {name: 'The long earth', genre: 'Sci-ficti', id: 3},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    // wrap it in a function Later ***
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from db/ other source
                return _find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
