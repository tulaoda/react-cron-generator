import React, { Component } from "react";
import { TimePicker, Checkbox, Row, Col } from "antd";
const format = "HH:mm";

export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onCheck = this.onCheck.bind(this);
    }

    handleTimeChange = (time, timeString) => {
        let timeStringArr = timeString.split(":").reverse();
        let val = this.state.value;
        val[0] = "0";
        val[1] = timeStringArr[0];
        val[2] = timeStringArr[1];
        this.props.onChange(val);
    };

    onCheck(e) {
        let val = this.state.value;
        val[0] = "0";
        if (e.target.checked) {
            val[2] = `${val[2]}`.split("/").length > 1 ? "0" : val[2].toString();
            val[3] = "?";
            val[4] = "*";
            if (val[5] === "*" || val[5] === "?" || val[5] === "MON-FRI") {
                val[5] = e.target.value;
            } else {
                val[5] = val[5] + "!" + e.target.value;
            }
        } else {
            val[5] = val[5].split("!");
            if (val[5].length > 1) {
                val[5].splice(val[5].indexOf(e.target.value), 1);
                val[5] = val[5].toString().replace(/,/g, "!");
            } else {
                val[5] = "*";
            }
        }
        this.props.onChange(val);
    }
    render() {
        this.state.value = this.props.value;
        return (
            <div>
                <div className="well well-small">
                    <Row>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("MON") !== -1 ? true : false} value="MON">
                                星期一
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("TUE") !== -1 ? true : false} value="TUE">
                                星期二
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("WED") !== -1 ? true : false} value="WED">
                                星期三
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("THU") !== -1 ? true : false} value="THU">
                                星期四
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("FRI") !== -1 ? true : false} value="FRI">
                                星期五
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("SAT") !== -1 ? true : false} value="SAT">
                                星期六
                            </Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox onChange={this.onCheck} checked={this.state.value[5].search("SUN") !== -1 ? true : false} value="SUN">
                                星期天
                            </Checkbox>
                        </Col>
                    </Row>
                </div>
                <div className="well well-small">
                    开始时间 &nbsp;
                    <TimePicker format={format} onChange={this.handleTimeChange} />
                </div>
            </div>
        );
    }
}
