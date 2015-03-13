angular.module('davidbohunek.ctrlshiftselect', [])
       .directive('ctrlshiftselect', [function () {
           return {
               restrict: 'A',
               controller: function ($scope, $element, $attrs) {

                   if ($attrs.ctrlshiftselectClass) {
                       this.selectedClass = $attrs.ctrlshiftselectClass;
                   } else {
                       this.selectedClass = 'selected';
                   }

                   var childItems = [];
                   var lastSelectedItemScope;

                   var setSelected = function (modelGetter, scope, value) {
                       modelGetter.assign(scope, value);
                       $scope.$digest();

                       if (value) {
                           lastSelectedItemScope = scope;
                       }
                   };

                   this.initChild = function (childItem) {
                       childItems.push(childItem);
                   };

                   this.onShiftClick = function (element, modelGetter, scope) {

                       //select all items between the last one selected and the clicked one

                       var lastSelectedItemScopeStored = lastSelectedItemScope;
                       var isSelecting = false;

                       for (var i = 0; i < childItems.length; i++) {
                           var childItem = childItems[i];

                           if (isSelecting) {
                               setSelected(childItem.modelGetter, childItem.scope, true);
                           }

                           if (childItem.scope === scope || childItem.scope === lastSelectedItemScopeStored) {
                               isSelecting = !isSelecting;
                           }

                           if (isSelecting) {
                               setSelected(childItem.modelGetter, childItem.scope, true);
                           }
                       }

                   };

                   this.onCtrlClick = function (element, modelGetter, scope) {

                       //revert selection of clicked item
                       var currentValue = modelGetter(scope);
                       setSelected(modelGetter, scope, !currentValue);
                   };

                   this.onPlainClick = function (element, modelGetter, scope) {

                       //deselect all
                       for (var i = 0; i < childItems.length; i++) {
                           var childItem = childItems[i];
                           setSelected(childItem.modelGetter, childItem.scope, false);
                       }

                       //select the clicked item
                       setSelected(modelGetter, scope, true);
                   };
               }
           };
       }])
       .directive('ctrlshiftselectModel', ['$parse', function ($parse) {
           return {
               restrict: 'A',
               require: '^ctrlshiftselect',
               link: function (scope, element, attributes, controller) {

                   var modelGetter = $parse(attributes.ctrlshiftselectModel);

                   controller.initChild({
                       modelGetter: modelGetter,
                       scope: scope
                   });

                   scope.$watch(attributes.ctrlshiftselectModel, function (newValue) {
                       if (newValue) {
                           element.addClass(controller.selectedClass);
                       } else {
                           element.removeClass(controller.selectedClass);
                       }
                   });
                   
                   var onMouseDown = function(event) {
                       //left mouse click
                       if (event.which !== 1) {
                           return true;
                       }

                       if (event.shiftKey) {
                           controller.onShiftClick(element, modelGetter, scope);
                       } else if (event.ctrlKey) {
                           controller.onCtrlClick(element, modelGetter, scope);
                       } else {
                           controller.onPlainClick(element, modelGetter, scope);
                       }
                   };
                   
                   element.on('mousedown', onMouseDown);
                   
                   scope.$on("$destroy", function() {
                        element.off('mousedown', onMouseDown);
                   });
               }
           };
       }]);
