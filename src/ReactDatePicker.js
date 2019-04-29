/**
 * @flow
 * Created by sam on 7/23/15.
 */
import React from 'react';
import Calendar from './calendar';
import PropTypes from 'prop-types';
import getToday from './getTodayMixin';

export default class ReactDatePicker extends React.Component {

	static defaultProps = {
		disabled: false,
		range: [2010, 2020],
		locale: 'en',
		value: ''
	}

	static propTypes = {
		disabled: PropTypes.bool,
		locale: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		range: PropTypes.arrayOf(PropTypes.number),
		value: PropTypes.string
	}

	state = {
		isCalendarShow: false
	}

	componentDidMount() {
		document.addEventListener('click', () => this.documentClickHandler);
	}

	componentWillUnmount() {
		document.removeEventListener('click', () => this.documentClickHandler);
	}

	documentClickHandler() {
		this.setState({
			isCalendarShow: false
		});
	}

	onClickDatePickerArea(e: any) {

		// stop the click event
		e.nativeEvent.stopImmediatePropagation();
	}

	onClickCalendar(date: string) {
		this.setState({
			isCalendarShow: false
		});
		this.props.onChange(date);
	}

	selectToday() {
		this.setState({
			isCalendarShow: false
		});
		this.props.onChange(getToday());
	}

	calender() {
		return (
			<Calendar onClickCalendar={(date) => this.onClickCalendar(date)} date={this.props.value}
								selectToday={() => this.selectToday()} range={this.props.range} locale={this.props.locale}/>
		);
	}

	focusIn() {
		this.onFocusChange(true);
	}

	onBlur() {
		this.onFocusChange(false);
	}

	toggleCalendarVisibility() {
		this.onFocusChange(!this.state.isCalendarShow);
	}

	onFocusChange(isOpen) {
		if (this.props.disabled === true) {
			return;
		}
		this.setState({
			isCalendarShow: isOpen
		});
	}

	render() {
		return (
			<div className="datePicker" onClick={(e) => this.onClickDatePickerArea(e)}>
				<button onClick={() => this.toggleCalendarVisibility()}
								className={`datePicker__input ${this.props.disabled === true ? 'datePicker__input--disabled' : ''}`} style={{display: 'flex', justifyContent: 'space-between'}}
								disabled={this.props.disabled}>
					<span style={{textAlign: 'left'}}>{this.props.value}</span>
					{this.renderArrow()}
				</button>
				{this.state.isCalendarShow === false ? null : this.calender()}
			</div>
		);
	}

	renderArrow() {
		if(!this.props.disabled) {
			return this.state.isCalendarShow ? <i className="up-arrow"/>: <i className="down-arrow"/>;
		}
	}
};
