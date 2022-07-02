const users = [
	{
		id: "001",
		name: "Nick Miller",
		email: "got@documents.com",
	},
	{
		id: "002",
		name: "Winston Schmit",
		email: "winston.schmit@astrat.com",
	},
	{
		id: "003",
		name: "Jessica DamnDay",
		email: "principal@jess.com",
	},
];

const routes = [
	{
		user_id: "001",
		route_name: "running",
		points: [
			[-80, 23],
			[73, 23],
		],
	},
	{
		user_id: "002",
		route_name: "stalking Cecilia & Coach",
		points: [
			[-80, 23],
			[73, 23],
			[-80, 23],
			[73, 23],
			[-80, 23],
			[73, 23],
			[-80, 23],
			[73, 23],
		],
	},
	{
		user_id: "003",
		route_name: "car wash",
		points: [
			[-80, 23],
			[73, 23],
			[-80, 23],
			[73, 23],
			[-80, 23],
			[73, 23],
		],
	},
];

module.exports = { users, routes };
