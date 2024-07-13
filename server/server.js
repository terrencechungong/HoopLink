const { ApolloServer } = require("apollo-server")
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers')
const { connectToDb, getDb } = require('./db')
const PORT = process.env.PORT

const server = new ApolloServer({ typeDefs, resolvers });
let db;

connectToDb((err) => {
    server.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
    db = getDb();
});

module.exports = {
    database: db
}