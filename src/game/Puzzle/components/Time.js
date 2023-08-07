import React, { Component } from 'react'

export default class Time extends Component {
    render() {
        return (
            <div className="Time">
                Time<br/>{this.props.time}
            </div>
        )
    }
}
