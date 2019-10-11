import React, { Component } from "react";
import cronstrue from "cronstrue";
import Minutes from "./minutes";
import Daily from "./daily";
import Hourly from "./hourly";
import Weekly from "./weekly";
import Monthly from "./monthly";
import Yearly from "./yearly";
import "./cron-builder.css"; 
import { Tabs } from "antd";
const tabs = ["分钟", "小时", "天", "周", "月"];
const { TabPane } = Tabs;

export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: tabs[0]
    };
  }
  componentWillMount() {
    if (!this.props.value || this.props.value.split(" ").length !== 7) {
      this.state.value = ["0", "0", "00", "1/1", "*", "?", "*"];
      this.state.selectedTab = tabs[0];
      this.parentChange(this.state.value);
    } else {
      this.state.value = this.props.value.replace(/,/g, "!").split(" ");
    }
    let val = this.state.value;
    if (val[1].search("/") !== -1 && val[2] === "*" && val[3] === "1/1") {
      this.state.selectedTab = tabs[0];
    } else if (val[3] === "1/1") {
      this.state.selectedTab = tabs[1];
    } else if (val[3].search("/") !== -1 || val[5] === "MON-FRI") {
      this.state.selectedTab = tabs[2];
    } else if (val[3] === "?") {
      this.state.selectedTab = tabs[3];
    } else if (val[3].startsWith("L") || val[4] === "1/1") {
      this.state.selectedTab = tabs[4];
    } else {
      this.state.selectedTab = tabs[0];
    }
  }

  defaultValue(tab) {
    switch (tab) {
      case tabs[0]:
        return ["0", "0/1", "*", "*", "*", "?", "*"];
        break;
      case tabs[1]:
        return ["0", "0", "00", "1/1", "*", "?", "*"];
        break;
      case tabs[2]:
        return ["0", "0", "00", "1/1", "*", "?", "*"];
        break;
      case tabs[3]:
        return ["0", "0", "00", "?", "*", "*", "*"];
        break;
      case tabs[4]:
        return ["0", "0", "00", "1", "1/1", "?", "*"];
        break;
      case tabs[5]:
        return ["0", "0", "00", "1", "1/1", "?", "*"];
        break;
      default:
        return;
    }
  }

  tabChanged(tab) {
    console.log(tab);
    this.setState({ selectedTab: tab, value: this.defaultValue(tab) });
    this.parentChange(this.defaultValue(tab));
  }
  getHeaders() {
    return tabs.map(d => {
      return (
        <li className={this.state.selectedTab === d ? "active" : ""}>
          <a onClick={this.tabChanged.bind(this, d)}>{d}</a>
        </li>
      );
    });
  }
  onValueChange(val) {
    if (val && val.length) {
      this.setState({ value: val });
    } else {
      this.setState({ value: ["0", "0", "00", "1/1", "*", "?", "*"] });
      val = ["0", "0", "00", "1/1", "*", "?", "*"];
    }
    this.parentChange(val);
  }

  parentChange(val) {
    let newVal = "";
    newVal = val.toString().replace(/,/g, " ");
    newVal = newVal.replace(/!/g, ",");
    console.log(newVal);
    this.props.onChange(newVal);
  }
  getVal() {
    let val = cronstrue.toString(
      this.state.value
        .toString()
        .replace(/,/g, " ")
        .replace(/!/g, ",")
    );
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  }

  getComponent(tab) {
    switch (tab) {
      case tabs[0]:
        return <Minutes value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      case tabs[1]:
        return <Hourly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      case tabs[2]:
        return <Daily value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      case tabs[3]:
        return <Weekly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      case tabs[4]:
        return <Monthly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      case tabs[5]:
        return <Yearly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
        break;
      default:
        return;
    }
  }

  handleTabChange = () => {};

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="cron_builder">
        <Tabs animated={false} activeKey={selectedTab} onChange={this.tabChanged.bind(this)}>
          <TabPane tab={tabs[0]} key={tabs[0]}>
            <Minutes value={this.state.value} onChange={this.onValueChange.bind(this)} />
          </TabPane>
          <TabPane tab={tabs[1]} key={tabs[1]}>
            <Hourly value={this.state.value} onChange={this.onValueChange.bind(this)} />
          </TabPane>
          <TabPane tab={tabs[2]} key={tabs[2]}>
            <Daily value={this.state.value} onChange={this.onValueChange.bind(this)} />
          </TabPane>
          <TabPane tab={tabs[3]} key={tabs[3]}>
            <Weekly value={this.state.value} onChange={this.onValueChange.bind(this)} />
          </TabPane>
          <TabPane tab={tabs[4]} key={tabs[4]}>
            <Monthly value={this.state.value} onChange={this.onValueChange.bind(this)} />
          </TabPane>
        </Tabs>
        {this.props.showResultText && <div className="cron-builder-bg">{this.getVal()}</div>}
        {this.props.showResultCron && (
          <div className="cron-builder-bg">
            {this.state.value
              .toString()
              .replace(/,/g, " ")
              .replace(/!/g, ",")}
          </div>
        )}
      </div>
    );
  }
}
