import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as __utils from '../../utils';
import { PopupActionItem, PopupContentBase } from '../PopupContent'

// -----------------------------------------
// A content implementation allowing a simple single name change
// -----------------------------------------
export class PopupEditName extends PopupContentBase {
    private name: string = "";

    constructor(onClick: (actionItem: PopupActionItem) => void, name?: string) {
        super(onClick);

        // initialise this popup
        this.name = name;
        this.height = 60;
        this.width = 200;
    }

    public _collectData(actionItem: PopupActionItem) {
        actionItem.data.name = this.name;
    }

    public render() {
        return (<Popup_EditName name={this.name} onChange={ s => this.name = s } />);
    }
}


interface popProp {
    name?: string                   // 
    onChange: (s: string) => void   // pass a handler to this popup so I can update the underlying model
}

interface editNameState {
    name: string;
}

class Popup_EditName extends React.Component<popProp, editNameState> {

    constructor(props: popProp) {
        super(props);

        this.state = {
            name: props.name || "marcel"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private handleInputChange(event: any) {
        var newVal = event.target.value;
        this.setState( { name: newVal });
        this.props.onChange(newVal);
    }

    private handleFocus(event: any) {
        event.target.select();
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

        return (<div style={style} >
            <span style={styleSpan}>Name:</span>
            <input autoFocus className='pop-border'
                type="text"
                style={styleInput}
                value={this.state.name}
                onChange={this.handleInputChange}
                onFocus={this.handleFocus} />
        </div>)
    }

}