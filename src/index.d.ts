

    // export enum PopupDirection {
    //     DownRight,
    //     DownLeft,
    //     UpRight,
    //     UpLeft,
    //     Center
    // }

    // // -------------------------

    // interface PopupContentBase {
    //     width: number;
    //     height: number;
    //     data: any;

    //     render(): JSX.Element;
    //     _onClick: (actionItem: PopupActionItem) => void;
    // }

    // // -------------------------

    // // interface SeperatorItem extends DropDownItemBase {}

    // // interface SeperatorItemConstructor {
    // //     new(): SeperatorItem;
    // // }

    // // export var SeperatorItem: SeperatorItemConstructor;

    // // // -------------------------

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

    // interface PopupActionItem {
    //     code: string;
    //     text: RightImageInfo[];
    //     data: string;
    //     isDefault: string;
    //     _onClick: (actionItem: PopupActionItem) => void;
    // }

    // interface PopupActionItemConstructor {
    //     new(text: string, onClick: (actionItem: PopupActionItem) => void, code: string = "", data: any = {}, isDefault: boolean = false): ActionItem;
    // }

    // export var PopupActionItem: PopupActionItemConstructor;

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

    // interface DropDownControl {
    //     element: any;
    //     direction: DropDownDirection;
    //     closeOnActionItemClick: boolean;
    //     closeOnOptionItemClick: boolean;
    //     alignText: boolean;
    //     setToRelativePositionIfNotSet: boolean;
        
    //     onClick?: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    //     onClose?: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    //     onChecked?: (optionItem: OptionItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    //     onOpened?: () => void;
    //     onHover?: (item: DropDownItem) => void;

    //     items: DropDownItemBase[]; 
    //     getItems: () => DropDownItemBase[];
        
    //     close(): void;
    //     createMenu(): void;
    // }

    // interface DropDownControlConstructor {
    //     new(element: any, items?: DropDownItemBase[], onClick?: (item: DropDownItem) => void, direction?: DropDownDirection): DropDownControl;
    // }

    // export var DropDownControl: DropDownControlConstructor;

    // // ------------------------------------

    // export var DropDownMenu: any;

    // // ------------------------------------

    // export var TestData: any;



