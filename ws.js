"use strict";

import { processData } from "./dataProcessing.js";

export const createWebsocket = (draw, width, height) => {
	const ws = new WebSocket("ws://localhost:3000");
	ws.addEventListener("message", (e) => {
		const data = JSON.parse(e.data);
		draw(
			processData({
				data,
				width,
				height,
			}),
			data
		);
	});
};
