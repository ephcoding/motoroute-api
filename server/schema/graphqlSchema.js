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
	name: "UserType",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
	}),
});

const RouteType = new GraphQLObjectType({
	name: "RouteType",
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
				return UserModel.findById(parent.userId);
			},
		},
	}),
});

const PointType = new GraphQLObjectType({
	name: "PointType",
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
	name: "CoordinatesType",
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
				// Mongoose.find
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
	name: "MutationQueries",
	fields: {
		// -- ADD USER
		addUser: {
			type: UserType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				// inserts new user into [motoroute_db] 'users' [collection]
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
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			// delete all routes associated with this user
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

		// -- ADD ROUTE
		addRoute: {
			type: RouteType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				userId: { type: GraphQLNonNull(GraphQLID) },
				status: {
					type: new GraphQLEnumType({
						name: "RouteStatus",
						values: {
							new: { value: "Not Started" },
							started: { value: "Incomplete" },
							finished: { value: "Finished" },
						},
					}),
					defaultValue: "Not Started",
				},
				// points: {
				// 	type: PointType,
				// 	values: {
				// 		coords: {
				// 			type: CoordinatesType,
				// 			values: {
				// 				latitude: { type: GraphQLInt },
				// 				longitude: { type: GraphQLInt },
				// 			},
				// 		},
				// 		accuracy: { type: GraphQLInt },
				// 		altitude: { type: GraphQLInt },
				// 		heading: { type: GraphQLInt },
				// 		speed: { type: GraphQLInt },
				// 		timestamp: { type: GraphQLString },
				// 	},
				// 	defaultValue: [],
				// },
			},
			resolve(parent, args) {
				const route = new RouteModel({
					name: args.name,
					userId: args.userId,
					status: args.status,
					// points: args.points,
				});

				return route.save();
			},
		},

		// -- DELETE ROUTE
		// deleteRoute: {
		// 	type: RouteType,
		// 	args: {
		// 		id: {
		// 			type: GraphQLNonNull(GraphQLID),
		// 		},
		// 		resolve(parent, args) {
		// 			return RouteModel.findByIdAndRemove(args.id);
		// 		},
		// 	},
		// },

		// -- EDIT ROUTE
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: MutationQueries,
});
