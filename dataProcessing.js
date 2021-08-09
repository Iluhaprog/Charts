export const getDomainByPrice = (data) => {
	const prices = data
		.map(({ data }) => data[5])
		.filter((item) => item !== null);
	return [Math.min(...prices), Math.max(...prices)];
};

export const getDomainByDate = (data) => {
	const dates = data
		.map(({ data }) => (data[5] !== null ? new Date(data[2]).getTime() : null))
		.filter((item) => item !== null);
	return [Math.min(...dates), Math.max(...dates)];
};

export const processData = ({ data, width, height }) => {
	const [minDate, maxDate] = getDomainByDate(data);
	const [minPrice, maxPrice] = getDomainByPrice(data);
	return data
		.map(({ data }, index) => {
			const x = (index / 500) * width;
			const y = (data[5] / maxPrice) * height * 0.5;
			return { x, y, price: data[5], exchange: data[4] };
		})
		.filter(({ y }) => !!y);
};
