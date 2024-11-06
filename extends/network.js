'use strict';
const Traceroute = require('nodejs-traceroute');
const pingX = require('ping');
class Network {
    constructor() {
        this.pid = 0;
        this.logData = null;
        
    }
    
    async tracert(Domain) {
        this.logData = [];
        const tracer3rd = new Traceroute();
        return new Promise((resolve, reject) => {
            tracer3rd.on('pid', (pid) => {
                this.pid = pid;
            }).on('hop', (hop) => {
                this.logData.push(hop);
            }).on('close', (code) => {
                resolve(code);
            });
            tracer3rd.trace(Domain);
        });
    }

    async ping(Domain) {
        let that = this;
        return new Promise((resolve, reject) => {
            pingX.promise.probe(Domain, {
               timeout: 10,
               extra: ['-c', '5', '-i', '0.4'],
            }).then(function (res) {
                that.setLogs({
                    times: res.times,
                    min: res.min,
                    max: res.max,
                    avg: res.avg
                });
                resolve();
            })
        });
    }

    setLogs(data) {
        this.logData = data;
    }

    logs() {
        return this.logData;
    }
}


module.exports = Network;