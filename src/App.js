import React, { Component } from "react";
import Cron from "./lib";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (val, interval) => {};

    render() {
        return (
            <div>
                <Cron onChange={this.handleChange} value={this.state.value} showResultText={true} showResultCron={true} nextExecutionTimes={5} />
            </div>
        );
    }
}

export default App;
