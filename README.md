angularCtrlShiftSelect
======================

angularCtrlShiftSelect is lightweight and simple set of directives which allows you to use left mouse button clicks with CTRL and SHIFT to select multiple items as you are used to from desktop apps.

Installation
------------

* Download the latest script file - https://github.com/davidbohunek/angularCtrlShiftSelect/blob/master/dist/ctrlshiftselect.min.js
* Include the script in your webpage

Usage
-----

* Include module 'davidbohunek.ctrlshiftselect' in your app/module.
* Use standard ``ng-repeat`` to render your list
* Add attribute ``ctrlshiftselect`` to a root element of your items, e.g. to a ``table`` or ``ul`` element
* In item template in your ``ng-repat`` (see example below) add attribute ``ctrlshiftselect-model="item.isSelected"`` (replace "item.isSelected" with whatever is relevant for you, this sets property on the model item to a boolean value depending if it's selected or not)


Example
-------
````javascript
angular.module('app', ['davidbohunek.ctrlshiftselect'])
````

````html
<table ctrlshiftselect ctrlshiftselect-class="selected">            
    <tr ng-repeat="item in items" ctrlshiftselect-model="item.isSelected"><td>{{item.text}}</td><td>{{item.isSelected || false}}</td></tr>	
</table>
````

For full example see - https://github.com/davidbohunek/angularCtrlShiftSelect/blob/master/example/index.html
