/**
 * @flow
 * Created by sam on 7/23/15.
 * 此页面的 month 为 1 基
 */
import React from 'react';
import PropTypes from 'prop-types';
import SelectYear from './selectYear';
import SelectMonth from './selectMonth';
import WeekDays from './weekDays';
import getToday from './getTodayMixin';

export default class Calendar extends React.Component {
	static propTypes = {
		date: PropTypes.string,
		locale: PropTypes.string,
		onClickCalendar: PropTypes.func.isRequired,
		range: PropTypes.arrayOf(PropTypes.number),
		selectToday: PropTypes.func.isRequired
	}

	state = {
		year: (new Date(this.props.date || getToday())).getFullYear(),
		month: (new Date(this.props.date || getToday())).getMonth() + 1,
		day: (new Date(this.props.date || getToday())).getDate()
	}

	prevMonth() {
		let minYear = this.props.range[0];
		let maxYear = this.props.range[1];
		if (this.state.month === 1) {
			this.setState({
				month: 12,
				year: (this.state.year === minYear ? maxYear : this.state.year - 1)
			});
		} else {
			this.setState({
				month: this.state.month - 1
			});
		}
	}

	nextMonth() {
		let minYear = this.props.range[0];
		let maxYear = this.props.range[1];
		if (this.state.month === 12) {
			this.setState({
				month: 1,
				year: (this.state.year === maxYear ? minYear : this.state.year + 1)
			});
		} else {
			this.setState({
				month: this.state.month + 1
			});
		}
	}

	mutateDate() {
		// 选择天的时候
		let month = String(this.state.month);
		month = month.length < 2 ? `0${month}` : `${month}`;
		let day = String(this.state.day);
		day = day.length < 2 ? `0${day}` : `${day}`;
		let date = `${this.state.year}-${month}-${day}`;
		this.props.onClickCalendar(date);
	}

	selectYear(year: number) {
		this.setState({
			year: year
		});
	}

	selectDay(day: number) {
		this.setState({
			day: day
		}, () => {
			this.mutateDate();
		});
	}

	selectMonth(month: number) {
		this.setState({
			month: month
		});
	}

	render() {
		return (<div className="datePicker__calendar">
			<div className="datePicker__calendar__header">
				<span onClick={(e) => this.prevMonth(e)} className="datePicker__prev"/>
				<SelectYear year={Number(this.state.year)} selectYear={(year) => this.selectYear(year)} range={this.props.range}/>
				<SelectMonth month={Number(this.state.month)} selectMonth={(month) => this.selectMonth(month)} locale={this.props.locale}/>
				<span onClick={(e) => this.nextMonth(e)} className="datePicker__next"/>
			</div>
			<WeekDays locale={this.props.locale}
								highlight={new Date(this.props.date).getFullYear() === this.state.year && new Date(this.props.date).getMonth() + 1 === this.state.month}
								year={Number(this.state.year)} month={Number(this.state.month)} day={Number(this.state.day)}
								selectDay={(day) => this.selectDay(day)}/>
			<div className="datePicker__btnGroup">
				<button className="datePicker__btn datePicker__btn--today"
								onClick={(props) => this.props.selectToday(props)}>{this.props.locale === 'zh' ? '今天' : 'Today'}</button>
			</div>
		</div>);
	}

};
