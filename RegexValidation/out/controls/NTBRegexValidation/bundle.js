var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./NTBRegexValidation/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./NTBRegexValidation/index.ts":
/*!*************************************!*\
  !*** ./NTBRegexValidation/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegExValidationControl = void 0;\n\nvar RegExValidationControl =\n/** @class */\nfunction () {\n  /**Empty constructor */\n  function RegExValidationControl() {\n    this.sDefaultLabel = \"\";\n    this.sDefaultErrorLabel = \"Incorrect Format\";\n    this.sDivElementClass = \"classDiv\";\n    this.sDivElementId = \"sDivId\";\n    this.sInputElementClass = \"classInput\";\n    this.sInputElementId = \"sInputId\";\n    this.sLabelElementClass = \"classLabel\";\n    this.sLabelElementId = \"sLabelId\";\n    this.sErrorLabelElementClass = \"classErrorLabel\";\n    this.sErrorLabelElementId = \"sErrorLabelId\";\n  }\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param objActualContainer If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  RegExValidationControl.prototype.init = function (context, notifyOutputChanged, state, container) {\n    var sInputValue = \"\";\n    this._context = context;\n    this._notifyOutputChanged = notifyOutputChanged;\n    this.eventHandler = this.onTextInput.bind(this);\n    this._container = document.createElement(\"div\");\n    this.objInputElement = document.createElement(\"input\");\n    this.objInputElement.setAttribute(\"type\", \"text\");\n    this.objInputElement.setAttribute(\"id\", this.sInputElementId);\n    this.objInputElement.setAttribute(\"class\", this.sInputElementClass);\n    this.objInputElement.addEventListener(\"input\", this.eventHandler);\n\n    if (!this.isNullOrUndefined(context.parameters.ValueToProcess)) {\n      this.sInputValue = context.parameters.ValueToProcess.raw || \"\";\n      sInputValue = context.parameters.ValueToProcess.formatted ? context.parameters.ValueToProcess.formatted : \"\";\n    }\n\n    if (!this.isNullOrUndefined(context.parameters.RegexExpression)) {\n      this.objRegex = new RegExp(context.parameters.RegexExpression.raw || \"\");\n    }\n\n    if (!this.isNullOrUndefined(context.parameters.UserNotificationText)) {\n      this.userNotificationText = context.parameters.UserNotificationText.raw || \"\";\n    }\n\n    this.objInputElement.setAttribute(\"value\", sInputValue);\n\n    this._container.appendChild(this.objInputElement);\n\n    container.appendChild(this._container);\n  };\n  /**\r\n   * Called when any value in the property bag has changed.\r\n   * This includes field values, data-sets, global values such as container height and width,\r\n   * offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object;\r\n   * It contains values as set up by the customizer mapped to names defined in the manifest,\r\n   * as well as utility functions\r\n   */\n\n\n  RegExValidationControl.prototype.updateView = function (context) {\n    this._context = context;\n  };\n  /**\r\n   * Called when any value change occurs in Input Element TextBox\r\n   * @param objEvent\r\n   */\n\n\n  RegExValidationControl.prototype.onTextInput = function (objEvent) {\n    this.sInputValue = this.objInputElement.value;\n    this.validateInputUsingRegex(this.sInputValue);\n\n    this._notifyOutputChanged();\n  };\n\n  RegExValidationControl.prototype.validateInputUsingRegex = function (sValueToProcess) {\n    var sNotification = !this.isNullOrUndefined(this.userNotificationText) ? this.userNotificationText : this.sDefaultErrorLabel;\n    var sUniqueId = sNotification + \"_UniqueId\";\n    var clearNotification = null;\n    var setNotification = null;\n    clearNotification = this.GetFunctionFromContextUtils(\"clearNotification\");\n    setNotification = this.GetFunctionFromContextUtils(\"setNotification\");\n\n    if (!this.isNullOrUndefined(clearNotification) && !this.isNullOrUndefined(setNotification)) {\n      clearNotification = clearNotification;\n      setNotification = setNotification;\n\n      if (!this.isNullOrUndefined(this.objRegex) && !this.isNullOrUndefined(sValueToProcess) && !this.objRegex.test(sValueToProcess)) {\n        setNotification(sNotification, sUniqueId);\n      } else {\n        clearNotification(sUniqueId);\n      }\n    }\n  };\n\n  RegExValidationControl.prototype.GetFunctionFromContextUtils = function (sFunctionName) {\n    var objFunctionToReturn = null;\n\n    if (!this.isNullOrUndefined(this._context) && !this.isNullOrUndefined(this._context.utils) && !this.isNullOrUndefined(this._context.utils[sFunctionName])) {\n      objFunctionToReturn = this._context.utils[sFunctionName];\n    }\n\n    return objFunctionToReturn;\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest,\r\n   * expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  RegExValidationControl.prototype.getOutputs = function () {\n    return {\n      ValueToProcess: this.sInputValue\n    };\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree.\r\n   * Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  RegExValidationControl.prototype.destroy = function () {\n    this.objInputElement.removeEventListener(\"input\", this.eventHandler);\n  };\n\n  RegExValidationControl.prototype.isNullOrUndefined = function (objectToProcess) {\n    var bIsNull = false;\n\n    if (objectToProcess === null && objectToProcess === \"\" && objectToProcess !== undefined && objectToProcess === \"undefined\") {\n      bIsNull = true;\n    }\n\n    return bIsNull;\n  };\n\n  return RegExValidationControl;\n}();\n\nexports.RegExValidationControl = RegExValidationControl;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./NTBRegexValidation/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('NTB.RegExValidationControl', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.RegExValidationControl);
} else {
	var NTB = NTB || {};
	NTB.RegExValidationControl = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.RegExValidationControl;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}