const { KEY } = require("./key.js");
var WebSocket = require("ws");
var socket = new WebSocket("wss://api.tiingo.com/crypto");

let array = [];
const wss = new WebSocket.Server({ origin: "*", port: 3000 });

var subscribe = {
	eventName: "subscribe",
	authorization: KEY,
	eventData: {
		thresholdLevel: 2,
	},
};

let sender;

wss.on("connection", (ws) => {
	sender = ws;
});

socket.on("open", function open() {
	socket.send(JSON.stringify(subscribe));
});
socket.on("message", function (data) {
	const dataItem = JSON.parse(data.toString("utf8"));
	if (sender && dataItem.data && dataItem.data[1] === "btcusd") {
		if (array.length > 500) {
			array = [...array.slice(1)];
		}
		array.push(dataItem);
		sender.send(JSON.stringify(array));
	}
});
