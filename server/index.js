const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;

const app = express();

// listens for connections at spec'd port
app.listen(port, console.log(`Server listening >>> PORT: ${port} <<<`));

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
	})
);
