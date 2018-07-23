

    export enum PopupDirection {
        DownRight,
        DownLeft,
        UpRight,
        UpLeft,
        Center
    }

    // -------------------------

    interface PopupActionItem {
        code: string;
        text: string;
        data: any;
        isDefault: boolean;
        _onClick: (actionItem: PopupActionItem) => void;
    }

    interface PopupActionItemConstructor {
        new(text: string, onClick: (actionItem: PopupActionItem) => void, code: string, data: any, isDefault: boolean): PopupActionItem;
    }

    export var PopupActionItem: PopupActionItemConstructor;

    // // -------------------------

    interface PopupContentBase {
        width: number;
        height: number;
        data: any;

        render(): JSX.Element;
        _onClick: (actionItem: PopupActionItem) => void;
    }

    // -------------------------
    
    interface PopupNotImpl extends PopupContentBase {}

    interface PopupNotImplConstructor {
        new(): PopupNotImpl;
    }

    export var PopupNotImpl: PopupNotImplConstructor;

    // -------------------------

    interface PopupFilterNumberRange extends PopupContentBase {}

    interface PopupFilterNumberRangeConstructor {
        new(onClick: (actionItem: PopupActionItem) => void, data?: any): PopupFilterNumberRange;
    }

    export var PopupFilterNumberRange: PopupFilterNumberRangeConstructor;

    // -------------------------

    interface PopupFilterDates extends PopupContentBase {}

    interface PopupFilterDatesConstructor {
        new(onClick: (actionItem: PopupActionItem) => void, data?: any): PopupFilterDates;
    }

    export var PopupFilterDates: PopupFilterDatesConstructor;

    // -------------------------
    
    interface PopupEditName extends PopupContentBase {}

    interface PopupEditNameConstructor {
        new(onClick: (actionItem: PopupActionItem) => void, data?: any): PopupEditName;
    }

    export var PopupEditName: PopupEditNameConstructor;

    // -------------------------
    
    interface PopupFilterStrings extends PopupContentBase {}

    interface PopupFilterStringsConstructor {
        new(onClick: (actionItem: PopupActionItem) => void, data?: any): PopupFilterStrings;
    }

    export var PopupFilterStrings: PopupFilterStringsConstructor;

    // -------------------------




    // interface PopupNotImpl extends PopupContentBase { }

    // // ---------------------

    // interface PopupFilterDates extends PopupContentBase {
        
    // }

    // interface PopupFilterDatesConstructor {
    //     new(onClick: (actionItem: PopupActionItem) => void, data?: any): HeaderItem;
    // }

    // interface PopupFilterDates extends PopupFilterDatesConstructor { }
    

    // // ------------------------

    // interface ActionItem extends DropDownItem {
    //     imageLeft: string;
    //     imageRight: RightImageInfo[];
    //     className: string;
    //     clickedImage: string;
    //     textMarginRight: number;
    //     addRightImage(img: string, tooltip?: string): void;
    //     //static useMaterialImage24: boolean;
    // }

    // interface ActionItemConstructor {
    //     new(key: string, text: string, image?: string, isDisabled?: boolean): ActionItem;
    // }

    // export var ActionItem: ActionItemConstructor;

    // // ------------------------


    // // export var HeaderItem: HeaderItemConstructor;

    // // // -------------------------

    // // interface DropDownItem extends DropDownItemBase {
    // //     text: string;
    // // }

    // // // -------------------------

    // // interface  RightImageInfo {
    // //     imageRight: string;
    // //     toolTip: string;
    // // }

    // // -------------------------



    // interface OptionItem extends DropDownItem {
    //     isChecked: boolean;
    //     groupBy: string;
    //     toggle(): void;
    // }

    // interface OptionItemConstructor {
    //     new(key: string, text: string, groupBy?: string, isChecked?: boolean): OptionItem;
    // }

    // export var OptionItem: OptionItemConstructor;

    // // -------------------------

    // interface PopupContainer {
    //     show(settings: any): void;
    // }

    export declare class PopupContainer {
        static show(settings: any): void;
    }

    // interface DropDownControlConstructor {
    //     new(element: any, items?: DropDownItemBase[], onClick?: (item: DropDownItem) => void, direction?: DropDownDirection): DropDownControl;
    // }

    // export var DropDownControl: DropDownControlConstructor;

    // // ------------------------------------

    // export var DropDownMenu: any;

    // // ------------------------------------

    // export var TestData: any;



