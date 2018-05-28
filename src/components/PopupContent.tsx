import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as __utils from '../utils';

// The base implementation of the content for the Popup Content placeholder
export class PopupContentBase {
    public width: number;
    public height: number;
    public render(): JSX.Element { return <span>no implementation</span> }
    public _onClick: (actionItem: PopupActionItem) => void = null;

    constructor(onClick: (actionItem: PopupActionItem) => void, width: number = 200, height: number = 200) {
        this._onClick = onClick;
        this.width = width;
        this.height = height;
    }

    public raiseClick(actionItem: PopupActionItem) {
        if (!actionItem.data) actionItem.data = {};
        this._collectData(actionItem);
        if (this._onClick) this._onClick(actionItem);
    }

    // meant to be overwritten so that the derived classes can provide relevant data from their models
    public _collectData(actionItem: PopupActionItem) {
        actionItem.data = {};
    }
}

// A simple implementation of a not implemented content
export class PopupNotImpl extends PopupContentBase {
    constructor() {
        super(null, 180, 40);
    }
    public render() {
        return (<span style={{ lineHeight: '40px', width: '100%', textAlign: 'center', display: 'inline-block' }}>** no implementation **</span>);
    }
}

// ----------------------------------------------------------------------------------

// an action (button) item placed in the footer of the popup
export class PopupActionItem  {
    
    public code: string = "";
    public text: string = "";
    public data: any = {};
    public isDefault: boolean = false;
    private _onClick: (actionItem: PopupActionItem) => void = null;

    constructor(text: string, onClick: (actionItem: PopupActionItem) => void, code: string = "", data: any = {}, isDefault: boolean = false) {    
        this.text = text;
        this._onClick = onClick;
        this.code = code || text;
        this.data = data;
        this.onClick = this.onClick.bind(this);
        this.isDefault = isDefault;
    }

    // allow the click to be raised from outside
    public onClick() {
        this._onClick(this);
    }

    public render() {
        return <div className='button' key={this.code} onClick={this.onClick}>{this.text}</div>
    }
    
}




