/**
 * @flow
 * Created by sam on 7/24/15.
 */
import React from 'react';
import PropTypes from 'prop-types'; 
import Week from './week';

export default class WeekDays extends  React.Component{
	static  propTypes= {
		day: PropTypes.number.isRequired,
		highlight: PropTypes.bool,
		locale: PropTypes.string,
		month: PropTypes.number.isRequired,
		range: PropTypes.arrayOf(PropTypes.number),
		selectDay: PropTypes.func.isRequired,
		year: PropTypes.number.isRequired
	}
	selectDay (val:string) {
		this.props.selectDay(val);
	}
	render () {

		// 计算某年某月总共的天数
		let days = new Date(this.props.year, this.props.month, 0).getDate(); // 8 月 0 号即 7 月最后一天

		// 该月第一天是周几，0 是周天，1 是周一
		let firstDay = new Date(this.props.year, this.props.month - 1, 1).getDay();

		let range = [...Array(days)].map((_, i) => i + 1);

		for (let i = 0, l = firstDay; i < l; i++) {
			range.unshift(undefined);
		}

		let chunks = []; // 分割成长度为 7 的数组段

		while (range.length > 0) {
			chunks.push(range.splice(0, 7));
		}

		let weekDays = [];
		for (let j = 0, len = chunks.length; j < len; j++) {
			// 如果 chunks[j] 长度不足 7，则补充到 7
			if (chunks[j].length < 7) {
				for (let m = chunks[j].length, n = 7; m < n; m++) {
					chunks[j].push(undefined);
				}
			}
			weekDays.push(<Week key={j} highlight={this.props.highlight} days={chunks[j]} selectDay={(val) => this.selectDay(val)} day={Number(this.props.day)}/>);
		}
		let weekTitle;
		if (this.props.locale === 'zh') {
			weekTitle = ['日', '一', '二', '三', '四', '五', '六'].map(function (v) {
				return (<th key={v}>{v}</th>);
			});
		} else {
			weekTitle = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (v) {
				return (<th key={v}>{v}</th>);
			});
		}

		return (
			<table>
				<thead>
				<tr>
					{weekTitle}
				</tr>
				</thead>
				<tbody>
				{weekDays}
				</tbody>
			</table>
		);
	}
}
