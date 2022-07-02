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
