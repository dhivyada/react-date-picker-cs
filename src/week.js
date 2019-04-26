/**
 * @flow
 * Created by sam on 7/24/15.
 * 生成单行的星期
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Week extends React.Component {
	static propTypes = {
		day: PropTypes.number, // input 中的 day 值，
		days: PropTypes.array.isRequired, // 要渲染的数组，正常长度为 7
		highlight: PropTypes.bool, // 表示要高亮特定的 yyyy-mm-dd 日期
		selectDay: PropTypes.func.isRequired
	}

	handleClick(e: any) {
		this.props.selectDay(e.target.textContent);
	}

	render() {
		let days = (typeof this.props.days === 'undefined' ? [] : this.props.days).map((day, index) => {
			if (day) {

				// 仅高亮今天
				if (day === this.props.day && this.props.highlight) {
					return <td key={index} className={'datePicker__day--today datePicker__day'}
										 onClick={(e) => this.handleClick(e)}>{day}</td>;
				} else {
					return <td key={index} className="datePicker__day" onClick={(e) => this.handleClick(e)}>{day}</td>;
				}
			} else {
				return <td key={index} className={'datePicker__day--disabled datePicker__day'}></td>;
			}
		});

		return (
			<tr>{days}</tr>
		);
	}
};
