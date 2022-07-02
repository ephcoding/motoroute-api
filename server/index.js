const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/graphqlSchema");
const port = process.env.PORT || 5000;

const app = express();

// [.use()]es mounts middleware
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
	})
);

// [listen()]s for connections at spec'd port
app.listen(port, console.log(`Server listening >>> PORT: ${port} <<<`));
