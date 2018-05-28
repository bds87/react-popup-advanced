import React from "react";
import ReactDOM from "react-dom";
import { PopupContainer, PopupDirection } from './components/PopupContainer';
import { PopupActionItem, PopupNotImpl } from './components/PopupContent';
import { PopupEditName } from './components/content/EditName'
import { PopupFilterNumberRange } from './components/content/FilterNumbers'
import { PopupFilterDates } from './components/content/FilterDates'
import * as __utils from './utils';

import './styles/rpopup.scss'
import './styles/demo.scss'
import './styles/flex.scss'

// -----------------------------

const filterTemp: any = {
    operator1: ">=",
    operator2: "<",
    operand1: "100",
    operand2: "250"
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

var btnCenter: any = document.getElementsByClassName('test-center')[0];
btnCenter.addEventListener("click", () => {
    var props: any = {
        direction: PopupDirection.Center,
        tintBackDrop: true,
        header: "This is my CENTERED header",
        actions: ['OK', 'Cancel'],
        model: {},
        content: new PopupNotImpl()
    }

    PopupContainer.show(props);
});

// -----------------------------


 