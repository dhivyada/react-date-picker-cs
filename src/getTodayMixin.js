/* @flow */
export default () => {
	let today = new Date();
	let year: string = `${today.getFullYear()}`;
	let month: string = `${today.getMonth() + 1}`; // 0 基，但是显示时不可能也 0 基
	let day: string = `${today.getDate()}`;
	month = month.length < 2 ? `0${month}` : month;
	day = day.length < 2 ? `0${day}` : day;
	return `${year}-${month}-${day}`;
};
