import React, { Component } from "react";
import { TimePicker,InputNumber } from "antd";
const format = "HH:mm";

export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0
    };

    this.onDayChange = this.onDayChange.bind(this);
    this.onLastDayChange = this.onLastDayChange.bind(this);
    // this.onAtHourChange = this.onAtHourChange.bind(this);
    // this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }
  componentWillMount() {
    this.state.value = this.props.value;
    if (this.state.value[3] === "L") {
      this.state.every = "2";
    } else if (this.state.value[3] === "LW") {
      this.state.every = "3";
    } else if (this.state.value[3].startsWith("L")) {
      this.state.every = "4";
    } else {
      this.state.every = "1";
    }
  }
  onDayChange(value) {
    if ((parseInt(value) > 0 && parseInt(value) <= 31) || value === "") {
      let val = [
        "0",
        this.state.value[1] === "*" ? "0" : this.state.value[1],
        this.state.value[2] === "*" ? "0" : this.state.value[2],
        this.state.value[3],
        "1/1",
        "?",
        "*"
      ];
      val[3] = value;
      this.props.onChange(val);
    }
  }
  onLastDayChange(value) {
    if ((parseInt(value) >> 0 && parseInt(value) <= 31) || value === "") {
      let val = [
        "0",
        this.state.value[1] === "*" ? "0" : this.state.value[1],
        this.state.value[2] === "*" ? "0" : this.state.value[2],
        this.state.value[3],
        "1/1",
        "?",
        "*"
      ];
      if (value === "") {
        val[3] = "";
      } else {
        val[3] = `L-${value}`;
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

  // onAtHourChange(e) {
  //   let val = this.state.value;
  //   val[2] = `${e.target.value}`;
  //   this.props.onChange(val);
  // }
  // onAtMinuteChange(e) {
  //   let val = this.state.value;
  //   val[1] = `${e.target.value}`;
  //   this.props.onChange(val);
  // }
  render() {
    this.state.value = this.props.value;
    return (
      <div className="tab-pane">
        <div className="well well-small">
          <input
            type="radio"
            onChange={e => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "1",
                "1/1",
                "?",
                "*"
              ]);
            }}
            value="1"
            name="MonthlyRadio"
            checked={this.state.every === "1" ? true : false}
          />
          &nbsp;每月的第&nbsp;
          {/* <input readOnly={this.state.every !== "1"} type="number" value={this.state.value[3]} onChange={this.onDayChange} /> */}
          <InputNumber min={1} defaultValue={1} onChange={this.onDayChange} disabled={this.state.every !== "1"} />
          &nbsp;天
        </div>
        <div className="well well-small">
          <input
            onChange={e => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "L",
                "*",
                "?",
                "*"
              ]);
            }}
            type="radio"
            value="2"
            name="DailyRadio"
            checked={this.state.every === "2" ? true : false}
          />
          &nbsp; 每月的最后一天&nbsp;
        </div>
        <div className="well well-small">
          <input
            onChange={e => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "LW",
                "*",
                "?",
                "*"
              ]);
            }}
            type="radio"
            value="3"
            name="DailyRadio"
            checked={this.state.every === "3" ? true : false}
          />
          &nbsp; 在每个月的最后一个工作日&nbsp;
        </div>
        <div className="well well-small">
          <input
            type="radio"
            onChange={e => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                `L-${1}`,
                "*",
                "?",
                "*"
              ]);
            }}
            value="4"
            name="MonthlyRadio"
            checked={this.state.every === "4" ? true : false}
          />
          月底前
          {/* <input disabled={this.state.every !== "4"} type="number" value={this.state.value[3].split("-")[1]} onChange={this.onLastDayChange} /> */}
          <InputNumber min={1} defaultValue={1} onChange={this.onLastDayChange} disabled={this.state.every !== "4"} />
          &nbsp;天
        </div>
        <div className="well well-small">
         开始时间 &nbsp;
          <TimePicker format={format} onChange={this.handleTimeChange} />
        </div>
      </div>
    );
  }
}
