var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle ={}
handle["/"]= requestHandlers.start;
handle["/start"]= requestHandlers.start;
handle["/details"]= requestHandlers.details;
handle["query"] = requestHandlers.queryUser;

server.start(router.route, handle);