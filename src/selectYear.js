/**
 * @flow
 * Created by sam on 7/23/15.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class SelectYear extends React.Component {
	static propTypes = {
		range: PropTypes.arrayOf(PropTypes.number),
		selectYear: PropTypes.func.isRequired,
		year: PropTypes.number
	}
	static defaultProps = {
		year: new Date().getFullYear()
	}

	handleChange(e: any) {
		this.props.selectYear(Number(e.currentTarget.value));
	}

	render() {
		let start = typeof this.props.range === 'undefined' ? 1984 : this.props.range[0];
		let end = typeof this.props.range === 'undefined' ? 2046 : this.props.range[1];
		let options = [];
		for (let i = start, l = end; i <= l; i++) {
			options.push(i);
		}
		options = options.map(function (option) {
			return <option key={option} value={option}>{option}</option>;
		});
		return (
			<select value={this.props.year} className="datePicker__year" onChange={(e) => this.handleChange(e)}>
				{options}
			</select>
		);
	}
};
