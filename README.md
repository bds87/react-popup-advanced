
# An advanced React Popup Component 
## Key features
* Provides standard popup for EditName, Date, Number and String filters.
* Allows custom content in the popup content section
* Provides a standardised header and footer
* Any number of customisable action buttons hosted in the footer 
* Is activated programmatically (i.e. can be attached to onClick on any element)
* TypeScript support

## Demo
Have a look at the [demo-page](http://www.reactpopup.marcelheeremans.com) to see the react popup in action!

## **Load the CSS!**
Do not forget to load the rpopup.css into your project (using a 'require' or other means)

`require('react-popup-advanced/styles/rpopup.css')`

# Using the React Popup Control
The control provides a PopupContainer which contains a fixed header and footer. A PopupContent derived control is nestled in between these. There are four standard implementations of the PopupContent but you can easily write your own.
### Footer hosts PopupActionItem
The footer items are PopupActionItem that can be given through the settings.  If only an array of 'strings' are given then PopupActionItems are auto-generated based upon these.

# The 'edit-name' content type 

![FixedItems.png](http://www.marcelheeremans.com/reactpopup/pics/editname.PNG)
```javascript
...
// handle a footer button click
var newName = (btn: PopupActionItem) => {
    if (btn.code == "OK")
        btnDL.innerHTML = btn.data.name;
}

// find the element you wish to attach the popup to
var btnDL: any = document.getElementsByClassName('test-dl')[0];

// on click make the popup come up towards the left/bottom and with the following settings...
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
```

### content property
The content property should provide an implementation of a PopupContentBase (representing the middle part of the popup).  
In this case the `PopupEditName` is given which takes as first parameter a handler that is called when a footer item is clicked and the second parameter is the text the user wishes to edit.
The implementation above shows the button text being used as default and updated once the 'OK' button is selected.



# The 'number-range' content type 

![filternumbers.png](http://www.marcelheeremans.com/reactpopup/pics/number-range-filter.PNG)
```javascript
...
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

// find the element you wish to attach the popup to
var btnDR: any = document.getElementsByClassName('test-dr')[0];

// on click make the popup come up towards the left/bottom and with the following settings...
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
```

### content property
Again, the content property should provide an implementation of a PopupContentBase (representing the middle part of the popup).  
In this case the `PopupFilterNumberRange` is given which takes as first parameter a handler that is called when a footer item is clicked and the second parameter is the state of the filter when it first shows.
The implementation above shows an initial state of the 'filterTemp' being used unless the element has been given some settings to hold. This clearly fully depends on your implementation...



# The 'date-range' content type 

![filternumbers.png](http://www.marcelheeremans.com/reactpopup/pics/date-range-filter.PNG)
```javascript
...
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
```


# The 'string-filter' content type 

![filternumbers.png](http://www.marcelheeremans.com/reactpopup/pics/string-filter.PNG)
```javascript
...
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
```

# Creating custom content
### ToDo...

# Further Comments
### ToDo...


# History

|version | Notes |
| ---- | ------ |
v 0.2.0 | TypeScript support
v 0.1.0 | Initial release.


