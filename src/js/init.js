'use strict';

(function(exports) {

  var jData, elements;

  function createLegend(id, data) {
    createList($el.baseUl(), data).appendTo('#' + id);
  }

  function createNode(depth, data, root) {
    var li = $el.baseLi(),
      elems = data.elements || elements;
    elems = root ? elems.root : elems.list;
    elems = elems[depth] || elems[0];
    $.each(elems, function() {
      li.append($(this(data)));
    });
    return li;
  }

  function createList(ul, data, index) {
    index = index || 0;
    $.each(data, function() {
      if (this.children && this.children.length > 0) {
        createNode(index, this, true)
          .appendTo(ul)
          .append(createList($el.baseUl(), this.children, index + 1));
      } else {
        createNode(index, this)
          .appendTo(ul);
      }
    });
    return ul;
  }

  function getData(url, mapper) {

  }

  exports.init = function(options) {

    var data, id;

    if (options) {

      data = jData || options.data || getData(options.url, options.mapper);
      id = options.id || 'ns-legend';
      elements = options.elements || {
        root: {
          0: [$el.text]
        },
        list: {
          0: [$el.text]
        }
      };

      if (typeof id === 'string') {
        if (data) {
          if (data.length > 0) {
            createLegend(id, data);
          } else {
            throw new Error('To create legend has to be at least one root element');
          }
        } else {
          throw new Error('Id must be in legend options legend');
        }
      } else {
        throw new Error('Id must be string value');
      }
    } else {
      throw new Error('Cannot get data to build legend');
    }
  };

  exports.setData = function(data) {
    jData = data;
  };

  exports.getData = function() {
    return jData;
  };

})(window.$legend = {});
