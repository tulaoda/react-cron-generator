import React, { Component } from "react";
import { InputNumber } from "antd";
export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange(value) {
    if ((value > 0 && value < 60) || value === "") {
      let val = ["0", "*", "*", "*", "*", "?", "*"];
      if (value === "") {
        val[1] = "";
      } else {
        val[1] = `0/${value}`;
      }
      this.props.onChange(val);
    }
  }
  render() {
    this.state.value = this.props.value;
    return (
      <div className="well">
        每隔 <InputNumber onChange={this.onChange.bind(this)} defaultValue={1} min={1} max={60} /> 分钟(s)'
      </div>
    );
  }
}
