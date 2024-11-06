'use strict';
const { MongoClient } = require('mongodb');

// Connection URL
const url = `mongodb://${process.env.SERVER_DB_HOST}:27017`;
const client = new MongoClient(url);
const dbName = 'networks';
const RandNum = require('randts')
const NumberConfig = new RandNum.Configuration()
NumberConfig.setMinLength(32)

class LogsInsert {
	constructor() {
        this.area = process.env.SERVER_AREA;
        this.db = null;
        this.link();
        this.Id = null;
    }

    getSessionId() {
        const RandomNumber = new RandNum.Generator(NumberConfig)
    	return RandomNumber.getNumber().getValue();
    }

    async link() {
    	await client.connect();
    	this.db = client.db(dbName);
    }

    table(Name, Data) {
    	this.Id = this.getSessionId();
    	this.db.collection(Name).insertMany([{
    		serial: this.Id,
    		data: Data,
    		area: this.area
    	}]);
    }

    getId() {
    	return this.Id;
    }
}

module.exports = LogsInsert