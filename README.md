# React DatePicker

## Demo

Demo：[chenxsan.github.io/react-date-picker-cs](http://chenxsan.github.io/react-date-picker-cs/)

## Install

You can install it from npm:

```
npm install dhivyada/react-date-picker-cs --save
```

or install via yarn

```
yarn add dhivyada/react-date-picker-cs
```

## Usage

```
var React = require('react');
var ReactDatePicker = require('react-date-picker-cs');

var App = React.createClass({
	getInitialState: function() {
		return {
			selectedDate: '2015-07-20'
		};
	},
	log: function(date) {
		this.setState({
			selectedDate: date
		});
	},
	render () {
		return (
			<div>
				<ReactDatePicker onChange={this.log} range={[2013, 2020]} value={this.state.selectedDate} disabled={true}/>
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
```

### Properties

* range {Array} - You can customize the range of year
* onChange {Function} - When user set a date
* locale {String} - Defaults to `en`, you can also use `zh`
* disabled {Boolean} - Defaults to `false`, you can pass in `true` to disable component
* value {String} - Set a default date

### Modify styles

The styles are defined in `ReactDatePicker.less`, make use of [BEM naming convention](https://en.bem.info/method/definitions/)。

### Browser support

I had only test it with the latest Firefox、Chrome and Safari on Mac OSX.

## Customization

The source code is in `src` folder, so you can customize it as you like.

Anything related to developing this component, please check [JedWatson/generator-react-component](https://github.com/JedWatson/generator-react-component).

## Test

Test code is in `test` folder, you can run:

```
npm test
```

## License

MIT. Copyright (c) 2015 Sam Chen.
