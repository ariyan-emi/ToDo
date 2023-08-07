import React, { Component } from 'react'

export default class Moves extends Component {
    render() {
        return (
            <div className="Moves">
                Moves<br/>{this.props.moves}
            </div>
        )
    }
}
