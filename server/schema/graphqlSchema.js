const { users, routes } = require("../fakeData");
const graphql = require("graphql");

// *************************************
// TYPE DEFINITIONS
// *************************************

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
		user: {
			type: UserType,
			resolve(parent, args) {
				return users.find((user) => user.id === parent.userId);
			},
		},
	}),
});

const PointType = new graphql.GraphQLObjectType({
	name: "Point",
	fields: () => ({
		coordinates: {
			type: CoordinatesType,
			resolve(parent, args) {
				return parent.coords;
			},
		},
		accuracy: { type: graphql.GraphQLInt },
		altitude: { type: graphql.GraphQLInt },
		heading: { type: graphql.GraphQLInt },
		speed: { type: graphql.GraphQLInt },
		timestamp: { type: graphql.GraphQLString },
	}),
});

const CoordinatesType = new graphql.GraphQLObjectType({
	name: "Coordinates",
	fields: () => ({
		latitude: { type: graphql.GraphQLInt },
		longitude: { type: graphql.GraphQLInt },
	}),
});

// *************************************
// RESOLVERS
// *************************************
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

// *************************************
// MUTATIONS
// *************************************
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// add user
		addUser: {
			type: UserType,
			args: {
				name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
				email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
			},
			resolve(parent, args) {
				const user = new User({
					name: args.name,
					email: args.email,
				});
			},
		},
		// delete user
		// edit user
		// add route
		// delete route
		// edit route
	},
});

module.exports = new graphql.GraphQLSchema({
	query: RootQuery,
});
