const pgConfig = {
	host: 'localhost',
	port: 5432,
	user:'postgres',
	password: '010203',
	database: 'online'
}

const options = {
	definition:{
		openapi:'3.0.1',
		info:{
			title:'Node js api Simple Todo',
			version:'1.0.0'
		},
		servers:[
			{
				url:'http://localhost:5000/'
			}
		],
		
	},
	apis:['./routes']
}

module.exports = {
	options,
	pgConfig
}