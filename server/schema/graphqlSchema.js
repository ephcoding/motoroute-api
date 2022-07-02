const { users, routes } = require("../fakeData");
const graphql = require("graphql");

const UserType = new graphql.GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		email: { type: graphql.GraphQLString },
	}),
});

// another option
// const schema = graphql.buildSchema(`
// type User {
//   id: ID!
//   name: String!
//   email: String!
// }
// `)

const RootQuery = new graphql.GraphQLObjectType({
	name: "RootQuery",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: graphql.GraphQLID } },
			resolve(parent, args) {
				return users.find((user) => user.id === args.id);
			},
		},
	},
});
