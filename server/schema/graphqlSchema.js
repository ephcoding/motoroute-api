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

const RouteType = new graphql.GraphQLObjectType({
	name: "Route",
	fields: () => ({
		id: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		points: {
			type: new graphql.GraphQLList(PointType),
		},
	}),
});

const PointType = new graphql.GraphQLObjectType({
	name: "Point",
	fields: () => ({
		coordinates: { type: CoordinatesType },
		accuracy: { type: graphql.GraphQLInt },
		altitude: { type: graphql.GraphQLInt },
		heading: { type: graphql.GraphQLInt },
		speed: { type: graphql.GraphQLInt },
		timestamp: { type: graphql.GraphQLString },
	}),
});

const CoordinatesType = new graphql.GraphQLObjectType({
	name: "Coordinates",
	fields: {
		latitude: { type: graphql.GraphQLInt },
		longitude: { type: graphql.GraphQLInt },
	},
});

// ***********************************************************
// [ GRAPHQL RESOLVERS: handlers / controllers ]
// ***********************************************************
const RootQuery = new graphql.GraphQLObjectType({
	name: "RootQuery",
	fields: {
		users: {
			type: new graphql.GraphQLList(UserType),
			resolve(parent, args) {
				return users;
			},
		},
		user: {
			type: UserType,
			args: { id: { type: graphql.GraphQLID } },
			resolve(parent, args) {
				return users.find((user) => user.id === args.id);
			},
		},
		routes: {
			type: new graphql.GraphQLList(RouteType),
			resolve(parent, args) {
				return routes;
			},
		},
		route: {
			type: RouteType,
			args: { id: { type: graphql.GraphQLID } },
			resolve(parent, args) {
				return routes.find((route) => route.id === args.id);
			},
		},
	},
});

module.exports = new graphql.GraphQLSchema({
	query: RootQuery,
});
