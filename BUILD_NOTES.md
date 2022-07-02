# BUILD STEPS

1. install deps
1. setup dotenv
1. set env vars
1. create Express server
1. define GraphQL schema
1. define Query endpoints
1. define Mutation endpoints

# TARGET GRAPHQL FUNCTIONALITY

```graphql
# USERS: returns all fields for all users
{
	users {
		id
		name
		email
	}
}

# USER: returns all fields for [User]
{
	user(id: "003") {
		id
		name
		email
	}
}

# ROUTES: returns all fields for all routes
{
	routes {
		id
		name
		points
	}
}

# ROUTE: returns all fields for [Route] + specified [User]
{
	route(id: "1002") {
		id
		name
		points
		user {
			id
			name
			email
		}
	}
}
```

# GRAPHQL TYPE DEFINITIONS

## `GraphQLObjectTypeConfig`

```graphql
# Object Config

type GraphQLObjectTypeConfig = {
  name: string;
  interfaces?: GraphQLInterfacesThunk | Array<GraphQLInterfaceType>;
  fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap;
  isTypeOf?: (value: any, info?: GraphQLResolveInfo) => boolean;
  description?: ?string
}
```

```graphql
# Object Field Config

type GraphQLFieldConfig = {
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: GraphQLFieldResolveFn;
  deprecationReason?: string;
  description?: ?string;
}
```
