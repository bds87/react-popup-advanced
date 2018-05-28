import React from 'react';
import ReactDOM from 'react-dom';
import * as __utils from '../../utils';
import { PopupActionItem, PopupContentBase } from '../PopupContent'
import moment from 'moment';

// -----------------------------------------
// A content implementation featuring a number range filter
// -----------------------------------------
export class PopupFilterDates extends PopupContentBase {
    private data: any = {};

    constructor(onClick: (actionItem: PopupActionItem) => void, data?: any) {
        super(onClick);

        // initialise this popup
        this.height = 70;
        this.width = 210;

        this.data = data || {
            operator1: "<=",
            operator2: "",
            operand1: moment().format("YYYY-MM-DD"),
            operand2: ""
        };
    }

    public _collectData(actionItem: PopupActionItem) {
        actionItem.data = this.data;
    }

    public render() {
        return (<Popup_FilterDates data={this.data} onChange={ data => this.data = data } />);
    }
}

interface popProp {
    data: any
    onChange: (data: any) => void   // pass a handler to this popup so I can update the underlying model
}

interface state {
    operator1? : string
    operator2? : string
    operand1?: string                  
    operand2?: string 
}

class Popup_FilterDates extends React.Component<popProp, state> {

    constructor(props: popProp) {
        super(props);

        this.state = {
            operator1: this.props.data.operator1,
            operator2: this.props.data.operator2,
            operand1: this.props.data.operand1,
            operand2: this.props.data.operand2
        }

        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleOperandChange = this.handleOperandChange.bind(this);
    }

    private handleOperatorChange(event: any, s: string) {
        var newVal = event.target.value;
        s == "top" ? 
            this.setState( { operator1: newVal }, () => this.props.onChange(this.state)) : 
            this.setState( { operator2: newVal }, () => this.props.onChange(this.state));
    }

    private handleOperandChange(event: any, s: string) {
        var newVal = event.target.value;
        s == "top" ? 
            this.setState( { operand1: newVal }, () => this.props.onChange(this.state)) : 
            this.setState( { operand2: newVal }, () => this.props.onChange(this.state));
    }
    
    public render() {
         // get the correct style
        const style = {
            lineHeight: "60px"
        };

        const styleRow = { padding: "5px 0 5px 0", display: "flex" };

        const styleSpan = {
            marginLeft: "5px"
        };

        const styleInput = {
            flex: 1,
            minWidth: "0px",
            marginLeft: "5px",
            marginRight: "5px"
        };

        return (
            <div style={style} >
                <div style={styleRow}>
                    <select className='pop-border' value={this.state.operator1} onChange={(e) => this.handleOperatorChange(e, "top")}>
                        <option value="=">{'='}</option>
                        <option value="<">{'\<'}</option>
                        <option value="<=">{'\<='}</option>
                        <option value=">=">>=</option>
                        <option value=">">></option>
                    </select>
                    <input autoFocus className='pop-border' type="date" style={styleInput} value={this.state.operand1} onChange={(e) => this.handleOperandChange(e, "top")} />
                </div>
                <div style={styleRow}>
                    <select className='pop-border' value={this.state.operator2} onChange={(e) => this.handleOperatorChange(e, "bottom")}>
                        <option value=">=">>=</option>
                        <option value=">">></option>
                        <option value="<">{'\<'}</option> 
                        <option value="<=">{'\<='}</option>
                        <option value="=">{'='}</option>
                        <option value="">{''}</option>
                    </select>
                    <input className='pop-border' type="date" style={styleInput} value={this.state.operand2} onChange={(e) => this.handleOperandChange(e, "bottom")} />
                </div>
            </div>
            )
    }

}