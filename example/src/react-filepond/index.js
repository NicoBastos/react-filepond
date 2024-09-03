/*!
 * react-filepond v7.1.2
 * A handy FilePond adapter component for React
 * 
 * Copyright (c) 2024 PQINA
 * https://pqina.nl/filepond
 * 
 * Licensed under the MIT license.
 */

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilePond = void 0;
Object.defineProperty(exports, "FileStatus", {
  enumerable: true,
  get: function get() {
    return _filepond.FileStatus;
  }
});
Object.defineProperty(exports, "registerPlugin", {
  enumerable: true,
  get: function get() {
    return _filepond.registerPlugin;
  }
});
var _react = _interopRequireWildcard(require("react"));
var _filepond = require("filepond");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Import required methods and styles from the FilePond module, should not need anything else
// We need to be able to call the registerPlugin method directly so we can add plugins
// Do this once
var isSupported = (0, _filepond.supported)();

// filtered methods
var filteredMethods = ["setOptions", "on", "off", "onOnce", "appendTo", "insertAfter", "insertBefore", "isAttachedTo", "replaceElement", "restoreElement", "destroy"];

// The React <FilePond/> wrapper
var FilePond = exports.FilePond = /*#__PURE__*/function (_React$Component) {
  function FilePond(props) {
    var _this;
    _classCallCheck(this, FilePond);
    _this = _callSuper(this, FilePond, [props]);
    _this.allowFilesSync = true;
    return _this;
  }

  // Will setup FilePond instance when mounted
  _inherits(FilePond, _React$Component);
  return _createClass(FilePond, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      // clone the input so we can restore it in unmount
      this._input = this._element.querySelector('input[type="file"]');
      this._inputClone = this._input.cloneNode();

      // exit here if not supported
      if (!isSupported) return;
      var options = Object.assign({}, this.props);

      // if onupdate files is defined, make sure setFiles does not cause race condition
      if (options.onupdatefiles) {
        var cb = options.onupdatefiles;
        options.onupdatefiles = function (items) {
          _this2.allowFilesSync = false;
          cb(items);
        };
      }

      // Create our pond
      this._pond = (0, _filepond.create)(this._input, options);

      // Reference pond methods to FilePond component instance
      Object.keys(this._pond).filter(function (key) {
        return !filteredMethods.includes(key);
      }).forEach(function (key) {
        _this2[key] = _this2._pond[key];
      });
    }

    // Will clean up FilePond instance when unmounted
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // exit when no pond defined
      if (!this._pond) return;

      // This fixed <Strict> errors

      // FilePond destroy is async so we have to move FilePond to a bin element so it can no longer affect current element tree as React unmount / mount is sync
      var bin = document.createElement("div");
      bin.append(this._pond.element);
      bin.id = "foo";

      // now we call destroy so FilePond can start it's destroy logic
      this._pond.destroy();
      this._pond = undefined;

      // we re-add the original file input element so everything is as it was before
      this._element.append(this._inputClone);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      if (!this.allowFilesSync) {
        this.allowFilesSync = true;
        return false;
      }
      return true;
    }

    // Something changed
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // exit when no pond defined
      if (!this._pond) return;
      var options = Object.assign({}, this.props);

      // this is only set onces, on didmount
      delete options.onupdatefiles;

      // update pond options based on new props
      this._pond.setOptions(options);
    }

    // Renders basic element hook for FilePond to attach to
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        id = _this$props.id,
        name = _this$props.name,
        className = _this$props.className,
        allowMultiple = _this$props.allowMultiple,
        required = _this$props.required,
        captureMethod = _this$props.captureMethod,
        acceptedFileTypes = _this$props.acceptedFileTypes;
      return /*#__PURE__*/(0, _react.createElement)("div", {
        className: "filepond--wrapper",
        ref: function ref(element) {
          return _this3._element = element;
        }
      }, /*#__PURE__*/(0, _react.createElement)("input", {
        type: "file",
        name: name,
        id: id,
        accept: acceptedFileTypes,
        multiple: allowMultiple,
        required: required,
        className: className,
        capture: captureMethod
      }));
    }
  }]);
}(_react["default"].Component);


