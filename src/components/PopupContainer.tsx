import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PopupNotImpl, PopupContentBase, PopupActionItem } from './PopupContent'
import * as __utils from '../utils';

export enum PopupDirection {
    DownRight,
    DownLeft,
    UpRight,
    UpLeft,
    Center
}

export class PopupContainer  {

    private elementPopupContainer: any = undefined;
    private elementReference: any = undefined;
    private elementTint: any = undefined;
    private elementBody: any = undefined;
    private direction: PopupDirection = PopupDirection.DownRight;
    private tintBackDrop: boolean = true;
    private header: string = "";
    private actions: PopupActionItem[] = [];
    private content: PopupContentBase;

    private width: number = 0;
    private height: number = 0;

    // show the popup for the given settings
    public static show(settings: any) {

        // create an instance of this Container!
        var dd = new PopupContainer(settings);

        // set it all in motion...
        dd.show();

    }

    constructor(props: any) {

        // 
        this.elementReference = props.element;
        this.direction = props.direction || PopupDirection.DownRight;
        this.tintBackDrop = props.tintBackDrop || true;
        this.header = props.header || "";
        this.content = props.content || new PopupNotImpl();
        this.height = (this.content.height || 50) + 72 + 10;    // use given content height + little extra for margins, padding, border etc
        this.width = this.content.width || 250;                 // use given content width (or 250px if not given)

        this.elementBody = document.getElementsByTagName("body")[0];

        // bind our show and hide to the current this
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.asyncHide = this.asyncHide.bind(this);

        // iterate through the actions (NOTE - do this AFTER we do the above .bind statements)
        var stringActions: string[] = props.actions || ['Close'];
        stringActions.map((txt, index) => this.actions.push(new PopupActionItem(txt, (action: PopupActionItem) => {
            
            // pass over the action that was clicked back to the caller
            this.content.raiseClick(action);

            // hide the popup (async!)
            this.asyncHide();

        }, txt, {}, index == 0 )));
    }

    // called when user clicks away from this popup (on the background which should trigger removing of the popup)
    public asyncHide() {
        var x = this.hide.bind(this);
        setTimeout(() => x(), 1);
    }

    // 
    private hide() {

        // remove the popup element completely
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(this.elementPopupContainer);
        
        // if we have a background overlay, remove it
        if (this.elementTint) {
            this.elementTint.style.opacity = '0';    
            setTimeout(() => {
                body.removeChild(this.elementTint);
            }, 300);
        }

        // remove the click handler
        document.removeEventListener("click", this.hide);

    }

    public show() {
        setTimeout(() => { this.show2(); });     // we HAVE to disconnect this otherwise the show is called followed by the hide directly!
    }

    // Called when all settings have been set 
    private show2() {

         // if we need to tint the backdrop then insert another dummy div
         if (this.tintBackDrop) {
            this.elementTint = document.createElement("div"); 
            this.elementTint.classList.add("pop-tint-backdrop");
            this.elementBody.appendChild(this.elementTint); 
            setTimeout(() => this.elementTint.style.opacity = "0.3", 1);
        }

        // add a div element we will place this dropdown into - we don't want to disturb the original markup
        this.elementPopupContainer = document.createElement("div"); 
        this.elementPopupContainer.classList.add("pop-container-holder");
        this.elementBody.appendChild(this.elementPopupContainer);
        
        // render the newly created container
        ReactDOM.render(this.render(), this.elementPopupContainer);

        // add a click handler to hide this popup if user clicks anywhere else..
        document.addEventListener("click", this.hide);

    }

    private getStyle() {

        // get the coordinates for this element
        var coords = __utils.getCoords(this.elementReference);

        // define the return style (this is now always going to be fixed!)
        var style: any = { position: "fixed" as "fixed" };

        // for now....
        style.width = this.width + "px";
        style.height = this.height + "px";

        // not relative
        if (this.direction == PopupDirection.DownLeft) {
            style.top = coords.bottom + "px";
            style.right = coords.rightFromWindow + "px";
        };
        if (this.direction == PopupDirection.DownRight) {
            style.top = coords.bottom + "px";
            style.left = coords.left + "px";
        };
        if (this.direction == PopupDirection.UpLeft) {
            style.bottom = coords.topFromWindow + "px";
            style.right = coords.rightFromWindow + "px";
        };
        if (this.direction == PopupDirection.UpRight) {
            style.bottom = coords.topFromWindow + "px";
            style.left = coords.left + "px";
        };
        if (this.direction == PopupDirection.Center) {
            style.left = (window.innerWidth / 2) - (this.width / 2) + "px";
            style.top = (window.innerHeight / 2) - (this.height / 2) + "px";
        };

        return style;
    }
   
    // prevents any clicking from bubbling back up to the button....
    private preventPropagation(e: any) {
        e.nativeEvent.stopImmediatePropagation();
    }

    // 
    private renderHeader() {
        return <span>{this.header}</span>
    }

    // render the footer 
    private renderFooter() {
         // callback for any items and map these to something useful
         return this.actions.map(item => item.render());
    }

    private renderedContent(el: any) {
        
        // listen to keyups
        el.onkeyup = (event: any) => {

            // attach an 'onEnter' listener so we can 'press' the default action button
            if (event.keyCode == 13) {          // Enter key
                // find the default action and raise the onClick pretending the user did this
                var defaultAction = this.actions.find(a => a.isDefault);
                if (defaultAction) defaultAction.onClick();
            }

            // attach an 'ESC' listener so we can close the popup
            if (event.keyCode == 27) {          // ESC key
                // close the popup 
                this.hide();
            }
        };

    }

    render() {

        // get the correct style
        const style = this.getStyle();

        // get the content rendered
        var content = this.content.render();

        // render the actual drop down 
        return (
        <div className={"flex-parent-col pop-container"} style={style} onClick={this.preventPropagation}  title=''>
            <div className='pop-header'>
                { this.renderHeader() }
            </div>
            <div className='flex-child pop-content' ref={(el) => { this.renderedContent(el); }} >
                { content }
            </div>
            <div className='pop-footer'>
                { this.renderFooter() }
            </div>
        </div>);

    }
}


// // A small helper class allowing me to pass through a 'close' handler to the React component so
// // that a client can instigate a proper 'closing' of the popup. 
// export class CloseHelper {

//     // called from the client who will then in effect call the 'acceptClose' function
//     // that should be implemented in the React component.
//     public close() {
//         if (this && this.acceptClose) this.acceptClose();
//     }

//     // implemented in the constructor of the react comp - which will call 'hide'..
//     public acceptClose: () => void;

// }


class GUID {
    public static createGuid() {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }

    public static createGuidRight5(pos: number = 5) {
        var guid: string = this.createGuid();
        guid = guid.substr(guid.length - pos);
        return guid;
    }
}