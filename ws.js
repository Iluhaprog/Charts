"use strict";

import { testData } from "./testdata.js";

const getDomainByPrice = (data) => {
	const prices = data
		.map(({ data }) => data[5])
		.filter((item) => item !== null);
	return [Math.min(...prices), Math.max(...prices)];
};
const getDomainByDate = (data) => {
	const dates = data
		.map(({ data }) => (data[5] !== null ? new Date(data[2]).getTime() : null))
		.filter((item) => item !== null);
	return [Math.min(...dates), Math.max(...dates)];
};

const processData = ({ data, width, height, maxPrice, maxDate }) => {
	return data
		.map(({ data }, index) => {
			const x = (index / 63) * width;
			const y = (data[5] / maxPrice) * height;
			return { x, y };
		})
		.filter(({ x, y }) => x !== 0 && y !== 0);
};

export const createWebsocket = (draw, width, height) => {
	const data = testData;
	draw(data);
	// const ws = new WebSocket("ws://localhost:3000");
	// ws.addEventListener("message", (e) => {
	// 	const data = testData2;
	// 	const [minPrice, maxPrice] = getDomainByPrice(data);
	// 	const [minDate, maxDate] = getDomainByDate(data);
	// 	draw(
	// 		processData({
	// 			data,
	// 			width,
	// 			height,
	// 			maxDate: maxDate,
	// 			maxPrice: maxPrice,
	// 		})
	// 	);
	// });
};
