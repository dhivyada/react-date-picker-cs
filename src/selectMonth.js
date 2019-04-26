/**
 * @flow
 * Created by sam on 7/23/15.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class SelectMonth extends React.Component {

	static propTypes = {
		locale: PropTypes.string,
		month: PropTypes.number,
		selectMonth: PropTypes.func.isRequired
	}

	static defaultProps = {
		range: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
	}

	handleChange(e: any) {
		this.props.selectMonth(Number(e.currentTarget.value));
	}

	render() {
		let months;
		if (this.props.locale === 'zh') {
			months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		} else {
			months = ['January', 'February', 'March', ' April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		}
		let options = months.map((month, index) => {
			return <option key={index} value={index + 1}>{`${month}`}</option>;
		});
		return (
			<select value={this.props.month} className="datePicker__month" onChange={(e) => this.handleChange(e)}>
				{options}
			</select>
		);
	}
};
