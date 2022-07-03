// const { users, routes } = require("../fakeData");
const UserModel = require("../models/User");
const RouteModel = require("../models/Route");

const {
	GraphQLEnumType,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema,
} = require("graphql");

// *************************************
// TYPE DEFINITIONS
// *************************************

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
	}),
});

const RouteType = new GraphQLObjectType({
	name: "Route",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		points: {
			type: new GraphQLList(PointType),
		},
		user: {
			type: UserType,
			resolve(parent, args) {
				// return users.find((user) => user.id === parent.userId);
				return RouteMode.findById(parent.userId);
			},
		},
	}),
});

const PointType = new GraphQLObjectType({
	name: "Point",
	fields: () => ({
		coordinates: {
			type: CoordinatesType,
			resolve(parent, args) {
				return parent.coords;
			},
		},
		accuracy: { type: GraphQLInt },
		altitude: { type: GraphQLInt },
		heading: { type: GraphQLInt },
		speed: { type: GraphQLInt },
		timestamp: { type: GraphQLString },
	}),
});

const CoordinatesType = new GraphQLObjectType({
	name: "Coordinates",
	fields: () => ({
		latitude: { type: GraphQLInt },
		longitude: { type: GraphQLInt },
	}),
});

// *************************************
// RESOLVERS
// *************************************
const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return UserModel.find();
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return UserModel.findById(args.id);
			},
		},
		routes: {
			type: new GraphQLList(RouteType),
			resolve(parent, args) {
				return RouteModel.find();
			},
		},
		route: {
			type: RouteType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return RouteModel.findById(args.id);
			},
		},
	},
});

// *************************************
// MUTATIONS
// *************************************
const MutationQueries = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// -- ADD USER
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const user = new UserModel({
					name: args.name,
					email: args.email,
				});

				return user.save();
			},
		},
		// -- DELETE USER & AND THEIR ROUTES
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				RouteModel.find({ userId: args.id }).then((routes) => {
					routes.forEach((route) => {
						route.remove();
					});
				});

				return UserModel.findByIdAndRemove(args.id);
			},
		},
		// -- EDIT USER

		// -- EDIT ROUTE

		// -- EDIT ROUTE

		// -- EDIT ROUTE
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: MutationQueries,
});
