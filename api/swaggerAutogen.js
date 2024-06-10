"use strict"
/* -------------------------------------------------------
	EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "http://fullstackteam.org/#",
		contact: { name: packageJson.author, email: "mustafatelli@msn.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
		Bearer: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT Authentication * Example: <b>Bearer ...accessToken...</b>'
		},
	},
	security: [{ Token: [] }, { Bearer: [] }],
	definitions: {
		// Models:
		"User": require('./src/models/user').schema.obj,
		"Brand": require('./src/models/brands').schema.obj,
		"Category": require('./src/models/categories').schema.obj,
		"Firm": require('./src/models/firms').schema.obj,
		"Product": require('./src/models/products').schema.obj,
		"Purchase": require('./src/models/purchases').schema.obj,
		"Sale": require('./src/models/sales').schema.obj,
	}
}

const routes = ['./index.js']
const outputFile = './src/config/swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)