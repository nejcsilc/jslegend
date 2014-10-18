jslegend
========

## Example

#### result

[preview](https://cdn.rawgit.com/nedroid/jslegend/master/demo/index.html)

#### config file

```javascript
{
  //id: 'legendaId', 
  elements: {
    root: {
      0: [$el.chevron, $el.rootCheckbox, $el.text],
      4: [$el.chevron]
    },
    list: {
      0: [$el.checkbox, $el.text],
      3: [$el.text]
    }

  },
  data: [{
    name: 'Root one',
    checked: true,
    children: [{
      name: 'Child one',
      //elements: [],
      children: []
    }, {
      name: 'Child two',
      checked: true,
      listeners: {
        click: function(){alert('child two');}
      },
      children: []
    }, ]
  }, {
    name: 'Root two',
    children: [{
      name: 'Child one',
      children: []
    }]
  }]
}
```


