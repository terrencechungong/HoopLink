const { UserList, MovieList } = require("./FakeData")
const lodash = require("lodash");
const database = require('../server')

const resolvers = {
    Mutation: {
        createUser: (parent, user_) => {
            const user = user_.user;
            UserList.push(user);
            user['id'] = UserList.length + 1;
            return user;
        }
    },
    Query: {
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = parseInt(args.id);
            const user = lodash.find(UserList, {id})
            return user;
        },
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            return lodash.find(MovieList, {name})
        }
    },
    User: {
        favoriteMovies: () => {
            return lodash.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    }
}

module.exports = {resolvers};