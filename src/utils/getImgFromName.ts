const getImgFromName = (name: string) =>
	`https://ui-avatars.com/api/?background=random&name=${name
		.split(' ')
		.join('+')}`;

export default getImgFromName;
