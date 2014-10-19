'use strict';
(function (exports) {
  exports.baseUl = function () {
    return $('<ul/>');
  };
  exports.baseLi = function () {
    return $('<li/>');
  };
  exports.text = function (opt) {
    opt = opt.text || opt;
    return $('<span/>').html(opt.value);
  };
  exports.rootCheckbox = function (opt) {
    opt = opt.rootCheckbox || opt;
    return $('<span class="glyphicon"/>').addClass(opt.checked ? 'glyphicon-check' : 'glyphicon-unchecked').addClass('root-checkbox').click(function () {
      $(this).toggleClass('glyphicon-check').toggleClass('glyphicon-unchecked').parent('li').find('ul span.list-checkbox').toggleClass('glyphicon-check', $(this).hasClass('glyphicon-unchecked')).toggleClass('glyphicon-unchecked', $(this).hasClass('glyphicon-check')).trigger('click');
    });
  };
  exports.checkbox = function (opt) {
    opt = opt.checkbox || opt;
    return $('<span class="glyphicon"/>').addClass(opt.checked ? 'glyphicon-check' : 'glyphicon-unchecked').addClass('list-checkbox').click(function () {
      $(this).toggleClass('glyphicon-check').toggleClass('glyphicon-unchecked');
    }).bind(opt.listeners);
  };
  function dropdownList(opt) {
    var ul = $('<ul class="dropdown-menu" role="menu"/>');
    $.each(opt.lists || [], function () {
      var li = $('<li/>').appendTo(ul);
      if (this.class && this.class.indexOf('divider') >= 0) {
        li.addClass(this.class);
      } else {
        $('<a/>').attr('href', this.href || '#').text(this.text || 'dropdown.lists[ ].text').addClass(this.class).bind(this.listeners).appendTo(li);
      }
    });
    return ul;
  }
  exports.dropdown = function (opt) {
    opt = opt.dropdown || opt;
    var bg = $('<div class="btn-group"/>').addClass(opt.dropup ? 'dropup' : '');
    $('<button data-toggle="dropdown"/>').appendTo(bg).addClass('btn btn-xs btn-default dropdown-toggle').text(opt.buttonText || 'dropdown.buttonText').append('<span class="caret"/>');
    dropdownList(opt).appendTo(bg);
    return bg;
  };
  exports.dropdownS = function (opt) {
    opt = opt.dropdownS || opt;
    var bg = $('<div class="btn-group"/>').addClass(opt.dropup ? 'dropup' : '');
    $('<button>').appendTo(bg).addClass('btn btn-xs btn-default').text(opt.buttonText || 'dropdown.buttonText').bind(opt.listeners);
    $('<button data-toggle="dropdown"/>').appendTo(bg).addClass('btn btn-xs btn-default dropdown-toggle').append('<span class="caret"/>');
    dropdownList(opt).appendTo(bg);
    return bg;
  };
  exports.chevron = function () {
    return $('<span class="glyphicon glyphicon-chevron-down"/>').click(function () {
      $(this).toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-right').parent('li').find('ul').slideToggle(99);
    });
  };
}(window.$el = {}));'use strict';
(function (exports) {
  var jData, elements;
  function createLegend(id, data) {
    createList($el.baseUl(), data).appendTo('#' + id);
  }
  function createNode(depth, data, root) {
    var li = $el.baseLi(), elems = data.elements || elements;
    elems = root ? elems.root : elems.list;
    elems = elems[depth] || elems[0];
    $.each(elems, function () {
      li.append($(this(data)));
    });
    return li;
  }
  function createList(ul, data, index) {
    index = index || 0;
    $.each(data, function () {
      if (this.children && this.children.length > 0) {
        createNode(index, this, true).appendTo(ul).append(createList($el.baseUl(), this.children, index + 1));
      } else {
        createNode(index, this).appendTo(ul);
      }
    });
    return ul;
  }
  function getData(url, mapper) {
  }
  exports.init = function (options) {
    var data, id;
    if (options) {
      data = jData || options.data || getData(options.url, options.mapper);
      id = options.id || 'ns-legend';
      elements = options.elements || {
        root: { 0: [$el.text] },
        list: { 0: [$el.text] }
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
  exports.setData = function (data) {
    jData = data;
  };
  exports.getData = function () {
    return jData;
  };
}(window.$legend = {}));