const { users, routes } = require("../fakeData");
const graphql = require("graphql");

const UserType = new graphql.GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		email: { type: graphql.GraphQLString },
		routes: {
			type: new graphql.GraphQLList(RouteType),
			resolve(parent, args) {
				return Route.findById(parent.id);
			},
		},
	}),
});

const RouteType = new graphql.GraphQLObjectType({
	name: "Route",
	fields: () => ({
		userId: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		// points: {new graphql.GraphQLList(PointType),
		// resolve(parent,args) {
		//   return Point.findById(parent.)
		// }}
	}),
});

const PointType = new graphql.GraphQLObjectType({
	name: "Point",
	fields: () => ({
		timestamp: { type: graphql.GraphQLInt },
		coords: new graphql.GraphQLObjectType({
			name: "coordinates",
			fields: () => ({
				latitude: { type: graphql.GraphQLInt },
				longitude: { type: graphql.GraphQLInt },
				altitude: { type: graphql.GraphQLInt },
				accuracy: { type: graphql.GraphQLInt },
				heading: { type: graphql.GraphQLInt },
				speed: { type: graphql.GraphQLInt },
			}),
		}),
	}),
});

// optional schema definition
// const schema = graphql.buildSchema(`
// type User {
//   id: ID
//   name: String
//   email: String
// }
// `)

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
