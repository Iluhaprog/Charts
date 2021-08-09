"use strict";

import { createWebsocket } from "./ws.js";

const SIZES = { width: 700, height: 300 };
const BACKGROUND = (alpha = 1) => `rgba(21, 12, 26, ${alpha})`;
const LINE_COLOR = (alpha = 1) => `rgba(204, 120, 250, ${alpha})`;
const SHADOW_COLOR = (alpha = 1) => `rgba(214, 140, 255, ${alpha})`;
const PADDING = 30;

export const init = () => {
	const mainBox = document.body;
	const { canvas, context } = createCanvas({
		...SIZES,
		background: BACKGROUND(),
	});
	mainBox.appendChild(canvas);
	createWebsocket(
		(data) => {
			draw(context, data);
			drawShadow(context, data);
			drawText({
				context,
				x: 20,
				y: 35,
				fs: 24,
				text: `${data[data.length - 1].price.toFixed(2)} $`,
			});
			drawText({
				context,
				x: SIZES.width - 110,
				y: 35,
				fs: 16,
				text: "BTC/USD",
			});
		},
		SIZES.width,
		SIZES.height
	);
};

export const createCanvas = ({ width, height, background }) => {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.style.backgroundColor = background;
	return { canvas, context: canvas.getContext("2d") };
};

export const drawText = ({ context, x, y, text, fs }) => {
	context.fillStyle = LINE_COLOR();
	context.font = `${fs}px Jacques Francois Shadow`;
	context.fillText(text, x, y);
};

export const draw = (context, data) => {
	context.clearRect(0, 0, SIZES.width, SIZES.height);
	data.map(({ x, y }, index) => {
		drawPoint({
			context,
			x,
			y: calcY(y),
			size: 2,
			background: LINE_COLOR(0.8),
		});
		if (index < data.length - 1) {
			drawLine({
				context,
				x1: x,
				y1: calcY(y),
				x2: data[index + 1].x,
				y2: calcY(data[index + 1].y),
				background: LINE_COLOR(1),
				lineWidth: 4,
			});
		}
	});
};

export const drawShadow = (context, data) => {
	context.beginPath;
	context.moveTo(data[0].x, SIZES.height - PADDING);
	data.map(({ x, y }) => {
		context.lineTo(x, calcY(y));
	});
	context.lineTo(data[data.length - 1].x, SIZES.height - PADDING);
	context.closePath();
	const gradient = context.createLinearGradient(0, 0, 0, SIZES.height);
	gradient.addColorStop(0, LINE_COLOR(0.2));
	gradient.addColorStop(1, LINE_COLOR(0));
	context.fillStyle = gradient;
	context.fill();
};

export const calcY = (y) => SIZES.height - y - PADDING;

export const drawPoint = ({ context, x, y, size, background }) => {
	context.beginPath();
	context.shadowColor = SHADOW_COLOR(1);
	context.shadowBlur = 15;
	context.moveTo(x, y);
	context.arc(x, y, size, 0, 2 * Math.PI);
	context.fillStyle = background;
	context.fill();
	context.closePath();
};

export const drawLine = ({
	context,
	x1,
	y1,
	x2,
	y2,
	lineWidth,
	background,
}) => {
	context.beginPath();
	context.shadowColor = SHADOW_COLOR(1);
	context.shadowBlur = 15;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineWidth = lineWidth;
	context.strokeStyle = background;
	context.stroke();
	context.closePath();
};

init();
