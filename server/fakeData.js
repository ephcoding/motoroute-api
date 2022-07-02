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
		id: "1001",
		userId: "001",
		name: "running",
		points: [
			{
				timestamp: 1656738789770,
				coords: {
					latitude: [-25, 49],
					longitude: [-49, 23],
				},
				altitude: 1200,
				accuracy: 1,
				heading: 34,
				speed: 2,
			},
		],
	},
	{
		id: "1002",
		userId: "001",
		name: "looking for Ferguson",
		points: [
			{
				timestamp: 1656738789770,
				coords: {
					latitude: [-25, 49],
					longitude: [-49, 23],
				},
				altitude: 1200,
				accuracy: 1,
				heading: 34,
				speed: 2,
			},
		],
	},
	{
		id: "1003",
		userId: "002",
		name: "stalking Cecilia & Coach",
		points: [
			{
				timestamp: 1656738789770,
				coords: {
					latitude: [-25, 49],
					longitude: [-49, 23],
				},
				altitude: 1200,
				accuracy: 1,
				heading: 34,
				speed: 2,
			},
		],
	},
	{
		id: "1004",
		userId: "003",
		name: "car wash",
		points: [
			{
				timestamp: 1656738789770,
				coords: {
					latitude: [-25, 49],
					longitude: [-49, 23],
				},
				altitude: 1200,
				accuracy: 1,
				heading: 34,
				speed: 2,
			},
		],
	},
	{
		id: "1005",
		userId: "003",
		name: "walk of shame",
		points: [
			{
				timestamp: 1656738789770,
				coords: {
					latitude: [-25, 49],
					longitude: [-49, 23],
				},
				altitude: 1200,
				accuracy: 1,
				heading: 34,
				speed: 2,
			},
		],
	},
];

module.exports = { users, routes };
