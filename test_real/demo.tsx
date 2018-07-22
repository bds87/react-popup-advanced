import * as React from "react";
import * as ReactDOM from "react-dom";
import * as moment from 'moment';
import { PopupContainer, PopupActionItem, PopupNotImpl, PopupFilterDates, PopupEditName, 
    PopupFilterNumberRange, PopupFilterStrings, PopupDirection } from 'react-popup-advanced';

//import '../styles/flex.scss'
//import '../styles/rpopup.scss'


require('test-react-popup-advanced/styles/flex.css')
require('test-react-popup-advanced/styles/rpopup.css')

import './demo.scss'

// -----------------------------

const filterTemp: any = {
    operator1: ">=",
    operator2: "<",
    operand1: "100",
    operand2: "350"
}

var filterData = (btn: PopupActionItem) => {
    if (btn.code == "Filter") {
        var msg = btn.data.operator1 + " " + btn.data.operand1 + "   ";
        msg += btn.data.operator2 + " " + btn.data.operand2;
        btnDR.innerHTML = msg;
        btnDR.data = btn.data;
    }
    if (btn.code == "Remove") {
        btnDR.innerHTML = "- no filter -";
        btnDR.data = undefined;
    }
}

var btnDR: any = document.getElementsByClassName('test-dr')[0];
btnDR.addEventListener("click", () => {

    var initialState = btnDR.data || filterTemp;

    var props: any = {
        element: btnDR,
        direction: PopupDirection.DownRight,
        tintBackDrop: true,
        header: "Filter between two numbers",
        actions: ['Filter', 'Remove'],
        content: new PopupFilterNumberRange(filterData, initialState)
    }

    PopupContainer.show(props);
});

// -----------------------------

var filteredDates = (btn: PopupActionItem) => {
    if (btn.code == "Filter") {
        btnUR.innerHTML = btn.data.operator1 + " " + btn.data.operand1;
        btnUR.data = btn.data;
    }
    if (btn.code == "Remove") {
        btnUR.innerHTML = "- no filter -";
        btnUR.data = undefined;
    }
}

var btnUR: any = document.getElementsByClassName('test-ur')[0];
btnUR.addEventListener("click", () => {
    var props: any = {
        element: btnUR,
        direction: PopupDirection.UpRight,
        tintBackDrop: true,
        header: "Select date range",
        actions: ['Filter', 'Remove'],
        content: new PopupFilterDates(filteredDates, btnUR.data)
    }

    PopupContainer.show(props);
});

// -----------------------------

var btnUL: any = document.getElementsByClassName('test-ul')[0];
btnUL.addEventListener("click", () => {
    var props: any = {
        element: btnUL,
        direction: PopupDirection.UpLeft,
        tintBackDrop: true,
        header: "This is my header",
        actions: ['OK', 'Cancel'],
        model: {},
        content: new PopupNotImpl()
    }

    PopupContainer.show(props);
});

// -----------------------------

var newName = (btn: PopupActionItem) => {
    if (btn.code == "OK")
        btnDL.innerHTML = btn.data.name;
}

var btnDL: any = document.getElementsByClassName('test-dl')[0];
btnDL.addEventListener("click", () => {
    var props: any = {
        element: btnDL,
        direction: PopupDirection.DownLeft,
        tintBackDrop: true,
        header: "Please enter a user name",
        actions: ['OK', 'Cancel'],
        content: new PopupEditName(newName, btnDL.innerHTML)
    }
    PopupContainer.show(props);
});

// -----------------------------

var doFilterString = (btn: PopupActionItem) => {
    if (btn.code == "Filter") {
        btnCenter.innerHTML = btn.data.operator + " " + btn.data.operand
        btnCenter.data = btn.data;
    }
    if (btn.code == "Remove") {
        btnCenter.innerHTML = "- no filter -";
        btnCenter.data = undefined;
    }
}

var btnCenter: any = document.getElementsByClassName('test-center')[0];
btnCenter.addEventListener("click", () => {
    var props: any = {
        direction: PopupDirection.Center,
        tintBackDrop: true,
        header: "This is my CENTERED string filter",
        actions: ['Filter', 'Remove'],
        content: new PopupFilterStrings(doFilterString, btnCenter.data)
    }
    PopupContainer.show(props);
});

// -----------------------------


 