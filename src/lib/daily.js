import React, { Component } from "react";
import { InputNumber, TimePicker } from "antd";
const format = "HH:mm";

export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0
    };

    this.onDayChange = this.onDayChange.bind(this);
  }
  componentWillMount() {
    this.state.value = this.props.value;
    if (this.state.value[3] === "?") {
      this.state.every = false;
    } else {
      this.state.every = true;
    }
  }
  onDayChange(value) {
    if ((value > 0 && value < 32) || value === "") {
      let val = [
        "0",
        this.state.value[1] === "*" ? "0" : this.state.value[1],
        this.state.value[2] === "*" ? "0" : this.state.value[2],
        "*",
        "*",
        "?",
        "*"
      ];
      if (value === "") {
        val[3] = "";
      } else {
        val[3] = `1/${value}`;
      }
      this.props.onChange(val);
    }
  }

  handleTimeChange = (time, timeString) => {
    let timeStringArr = timeString.split(":").reverse();
    let val = this.state.value;
    val[1] = timeStringArr[0];
    val[2] = timeStringArr[1];
    this.props.onChange(val);
  };

  render() {
    this.state.value = this.props.value;
    return (
      <div className="tab-pane">
        <div className="well well-small">
          <input
            type="radio"
            onClick={e => {
              this.setState({ every: true });
              this.props.onChange();
            }}
            value="1"
            name="DailyRadio"
            checked={this.state.every ? true : false}
          />
          &nbsp; 每隔 &nbsp;
          <InputNumber min={1} defaultValue={1} onChange={this.onDayChange} disabled={this.state.every ? false : true} />
          &nbsp; 天(s)
        </div>
        <div className="well well-small">
          <input
            onClick={e => {
              this.setState({ every: false });
              this.props.onChange(["0", this.state.value[1], this.state.value[2], "?", "*", "MON-FRI", "*"]);
            }}
            type="radio"
            value="2"
            name="DailyRadio"
            checked={this.state.every ? false : true}
          />
          &nbsp;每个工作日&nbsp;
        </div>
        <div className="well well-small">
          开始时间&nbsp;
          <TimePicker format={format} onChange={this.handleTimeChange} />
        </div>
      </div>
    );
  }
}
