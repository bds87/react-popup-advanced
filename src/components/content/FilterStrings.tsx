import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as __utils from '../../utils';
import { PopupActionItem, PopupContentBase } from '../PopupContent'

// -----------------------------------------
// A content implementation featuring a string filter (StartsWith, EndsWith, Contains, ..)
// -----------------------------------------
export class PopupFilterStrings extends PopupContentBase {
    //private data: any = {};

    constructor(onClick: (actionItem: PopupActionItem) => void, data?: any) {
        super(onClick);

        // initialise this popup
        this.height = 60;
        this.width = 225;

        this.data = data || {
            operator: "StartsWith",
            operand: ""
        };
    }

    public _collectData(actionItem: PopupActionItem) {
        actionItem.data = this.data;
    }

    public render() {
        return (<Popup_FilterStrings data={this.data} onChange={ data => this.data = data } />);
    }
}

interface popProp {
    data: any
    onChange: (data: any) => void   // pass a handler to this popup so I can update the underlying model
}

interface state {
    operator? : string
    operand?: string                  
}

class Popup_FilterStrings extends React.Component<popProp, state> {

    constructor(props: popProp) {
        super(props);
        this.state = {
            operator: this.props.data.operator,
            operand: this.props.data.operand
        }

        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleOperandChange = this.handleOperandChange.bind(this);
    }

    private handleOperatorChange(event: any) {
        var newVal = event.target.value;
        this.setState( { operator: newVal }, () => this.props.onChange(this.state));
    }

    private handleOperandChange(event: any) {
        var newVal = event.target.value;
        this.setState( { operand: newVal }, () => this.props.onChange(this.state));
    }
    
    public render() {
         // get the correct style
        const style = {
            lineHeight: "60px"
        };

        const styleSpan = {
            marginLeft: "5px"
        };

        const styleInput = {
            marginLeft: "5px",
            marginRight: "5px",
            width: "120px"
        };

        return (
            <div style={style} >
                <select className='pop-border' value={this.state.operator} onChange={(e) => this.handleOperatorChange(e)}>
                    <option value="StartsWith">{'Starts With'}</option>
                    <option value="EndWith">{'Ends With'}</option>
                    <option value="Contains">{'Contains'}</option>
                </select>
                <input autoFocus className='pop-border' 
                    type="text" 
                    style={styleInput} 
                    value={this.state.operand} 
                    onChange={(e) => this.handleOperandChange(e)} />
            </div>
            )
    }

}