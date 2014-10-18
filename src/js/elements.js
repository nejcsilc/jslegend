'use strict';

(function(exports) {

  exports.baseUl = function() {
    return $('<ul/>');
  };

  exports.baseLi = function() {
    return $('<li/>');
  };

  exports.text = function(opt) {
    return $('<span/>')
      .html(opt.name);
  };

  exports.rootCheckbox = function(opt) {
    return $('<span class="glyphicon"/>')
      .addClass(opt.checked ? 'glyphicon-check' : 'glyphicon-unchecked')
      .addClass('root-checkbox')
      .click(function() {
        $(this)
          .toggleClass('glyphicon-check')
          .toggleClass('glyphicon-unchecked')
          .parent('li').find('ul span.list-checkbox')
          .toggleClass('glyphicon-check', $(this).hasClass('glyphicon-unchecked'))
          .toggleClass('glyphicon-unchecked', $(this).hasClass('glyphicon-check'))
          .trigger('click');
      });
  };

  exports.checkbox = function(opt) {
    return $('<span class="glyphicon"/>')
      .addClass(opt.checked ? 'glyphicon-check' : 'glyphicon-unchecked')
      .addClass('list-checkbox')
      .click(function() {
        $(this)
          .toggleClass('glyphicon-check')
          .toggleClass('glyphicon-unchecked');
      })
      .bind(opt.listeners);
  };

  exports.dropdown = function() {
    return $('<button/>');
  };

  exports.chevron = function() {
    return $('<span class="glyphicon glyphicon-chevron-down"/>')
      .click(function() {
        $(this)
          .toggleClass('glyphicon-chevron-down')
          .toggleClass('glyphicon-chevron-right')
          .parent('li').find('ul').slideToggle(99);
      });
  };

})(window.$el = {});
