'use strict';

var json = {
  //id: 'legendaId', 
  elements: {
    root: {
      0: [$el.chevron, $el.rootCheckbox, $el.dropdownS, $el.text],
      4: [$el.chevron]
    },
    list: {
      0: [$el.checkbox, $el.dropdown, $el.text],
      3: [$el.text]
    }

  },
  data: [{
    text: {
      value: 'Root one'
    },
    rootCheckbox: {
      checked: true
    },
    dropdownS: {
      dropup: false,
      buttonText: 'Test',
      listeners: {
        click: function() {
          alert('base action');
        }
      },
      lists: [{
        //class: '',
        //href: '',
        listeners: {
          click: function() {
            alert('list clicked');
          }
        }
      }, {
        href: 'http://www.google.si',
        text: 'Google'
      }, {
        class: 'divider'
      }, {
        text: 'Do nothing'
      }]
    },
    children: [{
      //elements: [],
      children: [],
      text: {
        value: 'Child one'
      },
      dropdown: {
        dropup: true,
        buttonText: 'Test',
        lists: [{
          //class: '',
          //href: '',
          listeners: {
            click: function() {
              alert('test test test');
            }
          }
        }, {
          href: 'http://www.google.si',
          text: 'Google'
        }, {
          class: 'divider'
        }, {
          text: 'Do nothing'
        }]
      }
    }, {
      children: [],
      text: {
        value: 'Child two'
      },
      checkbox: {
        checked: true,
        listeners: {
          click: function() {
            alert('child two');
          }
        }
      }
    }, ]
  }, {
    text: {
      value: 'Root two'
    },
    children: [{
      children: [],
      text: {
        value: 'Child one'
      }
    }]
  }]
};

$(function() {
  $legend.init(json);
});
