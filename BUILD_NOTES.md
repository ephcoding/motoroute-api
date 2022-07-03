# ACTION ITEMS

- [ ] add 'status' prop to schema

# BUILD STEPS

1. install deps
1. setup dotenv
1. set env vars
1. create Express server
1. define GraphQL schema
1. define Query endpoints
1. define Mutation endpoints

# GRAPHQL QUERIES & MUTATIONS

```graphql
# USERS: returns all fields for all users
# {
#   users {
#     id
#     name
#     email
#   }
# }

# USER: returns all fields for [User]
# {
#   user(id:"62c187f73a8d922bd1f43453") {
#     id
#     name
#     email
#   }
# }

# ROUTES: returns all fields for all routes

# {
#   routes {
#     id
#     name
#     # status
#     user {
#       id
#       name
#       email
#     }
#     points {
#       coordinates {
#         latitude
#         longitude
#       }
#       accuracy
#       altitude
#       heading
#       speed
#       timestamp
#     }
#   }
# }

# ROUTE: returns all fields for [Route] + specified [User]
# {
#   route(id: "62c19d92d6d843326ee50b2c") {
#     id
#     name
#     user {
#       name
#     }
#     points {
#       coordinates {
# 				latitude
#         longitude
#       }
#       accuracy
#       altitude
#       heading
#       speed
#       timestamp
#     }

#   }
# }

# mutation {
#   addUser(name: "Builder Bob", email: "hard@hat.com") {
#     id
#     name
#     email
#   }
# }

# mutation {
#   deleteUser(id: "62c187023a8d922bd1f4344f") {
#     id
#   }
# }

# mutation {
#   updateUser(id:"62c1898361e94f8763c6c2d4", email: "bobs@newemail.com") {
# 		id
#     name
#     email
#   }
# }

# mutation {
# 	addRoute(name: "My first route", userId: "62c187f73a8d922bd1f43453") {
#     name
#     points {
#       coordinates {
#         latitude
#         longitude
#       }
#       accuracy
#       altitude
#       heading
#       speed
#       timestamp
#     }
#   }
# }

# mutation {
#   deleteRoute(id:"62c19d92d6d843326ee50b2c") {
#     id
#   }
# }

# mutation {
#   updateRoute(id:"62c1aaa3dfd0534ae7e9993c", name:"Here's a new route name") {
#     id
#     name
#   }
# }
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

# MONGODB DATABASE

- DONT FORGET: replace/add _actual_ db name in connection string `...mongodb.net/<db_name>...` in addition to password

# ISSUES

1. **_MongoDB can't connect to MongoDB Compass_**

ISSUE: `connection <monitor> to 52.6.126.142:27017 closed`
CAUSE: VPN
SOLUTION: turn off VPN, connect to MongoDB, reconnect VPN
NOTE: _re-connecting to VPN prevents db crud ops_

1. **_Mutation `args` prop types_**

ISSUE: getting error that `new` is req'd when instantiating new `GraphQLNonNull` instance
CAUSE: `graphql` version?
SOLUTION: down-bump `graphql` to `"15"`

1. **_new user mutation generates unwanted `users` AND `routes`collections_**

ISSUE: Creating new user in MongoDB creates and adds user to a new `users` collection (creates new `routes` collection too)
CAUSE: built-in collection naming
SOLUTION:
