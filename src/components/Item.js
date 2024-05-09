import React, { Component } from 'react';

export class Item extends Component{
    render(){
        return(
            // <div>{this.props.item.Operation}</div>
            <div className="item">
                <p>{this.props.item.Operation}</p>
                <p>{this.props.item.type}</p>
                <p>{this.props.item.sum}</p>
                <p>{this.props.item.dateTransaction}</p>
            </div>
        )
    }
}