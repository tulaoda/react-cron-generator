import React, { Component } from "react";
import { TimePicker, InputNumber } from "antd";
const format = "HH:mm";
export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onHourChange = this.onHourChange.bind(this);
    }
    componentWillMount() {
        this.state.value = this.props.value;
        if (this.state.value[2].split("/")[1] || this.state.value[2] === "*") {
            this.state.every = true;
        }
    }
    onHourChange(value) {
        if (this.state.every && ((value > 0 && value < 24) || value === "")) {
            let val = ["0", "0", "*", "*", "*", "?"];
            if (value === "") {
                val[2] = "";
            } else {
                val[2] = `*/${value}`;
            }
            // val[3] = "1/1";
            this.props.onChange(val);
        }
    }
    handleTimeChange = (time, timeString) => {
        let timeStringArr = timeString.split(":").reverse();
        let val = ["0", "*", "*", "*", "*", "?"];
        val[1] = timeStringArr[0];
        val[2] = timeStringArr[1];
        // val[3] = "1/1";
        this.props.onChange(val);
    };

    render() {
        this.state.value = this.props.value;
        return (
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="well well-small">
                        <input
                            type="radio"
                            onClick={e => {
                                this.setState({ every: true });
                                this.props.onChange(["0", "0", "0/1", "*", "*", "?"]);
                            }}
                            checked={this.state.every ? true : false}
                        />
                        <span>&nbsp;每隔 &nbsp;</span>
                        <InputNumber min={1} defaultValue={1} max={24} onChange={this.onHourChange} disabled={this.state.every ? false : true} />
                        <span>&nbsp;小时(s)&nbsp;</span>
                    </div>
                    <div className="well well-small">
                        <input
                            type="radio"
                            onClick={e => {
                                this.setState({ every: false });
                                this.props.onChange();
                            }}
                            checked={this.state.every ? false : true}
                        />
                        <span className="margin-right-10 ">&nbsp;开始时间&nbsp;</span>
                        <TimePicker format={format} disabled={this.state.every ? true : false} onChange={this.handleTimeChange} />
                    </div>
                </div>
            </div>
        );
    }
}
