import React, { useState, useEffect } from 'react';
import CPE, { ServiceManager } from 'cross-platform-editor';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MockWebpackDocumentClient = /*#__PURE__*/function () {
  function MockWebpackDocumentClient(accountId, applicationId) {
    _classCallCheck(this, MockWebpackDocumentClient);

    this.accountId = accountId;
    this.applicationId = applicationId;
  }

  _createClass(MockWebpackDocumentClient, [{
    key: "getRenderedDocument",
    value: function getRenderedDocument(documentId) {
      return fetch("".concat(BASE_URI, "/accounts/").concat(this.accountId, "/documents/").concat(documentId, "/rendered_content")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getDocument",
    value: function getDocument(documentId) {
      return fetch("".concat(BASE_URI, "/accounts/").concat(this.accountId, "/documents/").concat(documentId)).then(function (r) {
        return r.json();
      }).then(function (response) {
        var onGetDocumentEvent = new CustomEvent("onGetDocument", {
          detail: response
        });
        window.dispatchEvent(onGetDocumentEvent);
        return response;
      });
    }
  }, {
    key: "createDocumentFromTemplate",
    value: function createDocumentFromTemplate(templateId) {
      return fetch("".concat(BASE_URI, "/accounts/").concat(this.accountId, "/templates/{").concat(templateId, "}/documents"), {
        method: "POST"
      }).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "updateDocument",
    value: function updateDocument(documentId, json) {
      return fetch("".concat(BASE_URI, "/accounts/").concat(this.accountId, "/documents/").concat(documentId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      }).then(function (r) {
        // this to catch fetch status error
        if (!r.ok) {
          throw Error("".concat(r.status, " - ").concat(r.statusText, "(").concat(r.url, ")"));
        }

        return r;
      }).then(function (r) {
        return r.text();
      }).catch(function (err) {
        throw err;
      });
    }
    /**
     * Get templates
     * @return {Object}
     */

  }, {
    key: "getTemplates",
    value: function getTemplates() {
      return fetch("".concat(BASE_URI, "/applications/").concat(this.applicationId, "/template_views/Released")).then(function (r) {
        return r.json();
      });
    }
  }]);

  return MockWebpackDocumentClient;
}();

var EmailCustomerAccountService = /*#__PURE__*/function () {
  function EmailCustomerAccountService() {
    _classCallCheck(this, EmailCustomerAccountService);
  }

  _createClass(EmailCustomerAccountService, [{
    key: "getEmailCustomerAccount",
    value: function getEmailCustomerAccount() {
      return fetch("".concat(BASE_URI, "/email-account")).then(function (r) {
        return r.json();
      });
    }
  }]);

  return EmailCustomerAccountService;
}();

var AccountService = /*#__PURE__*/function () {
  function AccountService() {
    _classCallCheck(this, AccountService);
  }

  _createClass(AccountService, [{
    key: "getAccount",
    value: function () {
      var _getAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("".concat(BASE_URI, "/accounts")).then(function (r) {
                  return r.json();
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAccount() {
        return _getAccount.apply(this, arguments);
      }

      return getAccount;
    }()
  }]);

  return AccountService;
}();

var VimeoService = /*#__PURE__*/function () {
  function VimeoService() {
    _classCallCheck(this, VimeoService);
  }

  _createClass(VimeoService, [{
    key: "fetchVideosById",
    value: function () {
      var _fetchVideosById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(videoId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("".concat(BASE_URI, "/videos/vimeo/").concat(videoId)).then(function (r) {
                  return r.json();
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fetchVideosById(_x) {
        return _fetchVideosById.apply(this, arguments);
      }

      return fetchVideosById;
    }()
  }]);

  return VimeoService;
}();

var CommonDataService = /*#__PURE__*/function () {
  function CommonDataService() {
    _classCallCheck(this, CommonDataService);
  }

  _createClass(CommonDataService, [{
    key: "getStateData",
    value: function getStateData() {
      return fetch("".concat(BASE_URI, "/common/states")).then(function (r) {
        return r.json();
      });
    }
  }]);

  return CommonDataService;
}();

var MockSettingsService = /*#__PURE__*/function () {
  function MockSettingsService() {
    _classCallCheck(this, MockSettingsService);
  }

  _createClass(MockSettingsService, [{
    key: "getCpeSettingByName",
    value: function getCpeSettingByName(settingName) {
      return fetch("".concat(BASE_URI, "/settings/cpe/").concat(settingName)).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "updateCpeSetting",
    value: function updateCpeSetting(settingName, settingValue) {
      return fetch("".concat(BASE_URI, "/settings/cpe/").concat(settingName), {
        method: "POST",
        body: {
          settingValue: settingValue
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return MockSettingsService;
}();

var ContactsService = /*#__PURE__*/function () {
  function ContactsService() {
    _classCallCheck(this, ContactsService);
  }

  _createClass(ContactsService, [{
    key: "getContactDetails",
    value: function getContactDetails() {
      return fetch("".concat(BASE_URI, "/contact/1/details")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getContactLists",
    value: function getContactLists() {
      return fetch("".concat(BASE_URI, "/contacts")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "createContactList",
    value: function createContactList(name) {
      return fetch("".concat(BASE_URI, "/contact"), {
        method: "POST",
        body: {
          name: name
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return ContactsService;
}();

var MockMyLibraryService = /*#__PURE__*/function () {
  function MockMyLibraryService() {
    _classCallCheck(this, MockMyLibraryService);
  }

  _createClass(MockMyLibraryService, [{
    key: "getImages",
    value: function getImages() {
      return fetch("".concat(BASE_URI, "/library/images")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getFolders",
    value: function getFolders() {
      return fetch("".concat(BASE_URI, "/library/folders")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getSummary",
    value: function getSummary() {
      return fetch("".concat(BASE_URI, "/library/summary")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "generateImageFolders",
    value: function generateImageFolders() {
      return fetch("".concat(BASE_URI, "/library/folders"), {
        method: "POST"
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return MockMyLibraryService;
}();

var ShoppableProductService = /*#__PURE__*/function () {
  function ShoppableProductService() {
    _classCallCheck(this, ShoppableProductService);
  }

  _createClass(ShoppableProductService, [{
    key: "getProducts",
    value: function getProducts() {
      return fetch("".concat(BASE_URI, "/shoppable-products")).then(function (r) {
        return r.json();
      });
    }
  }]);

  return ShoppableProductService;
}();

var ActionblockPltService = /*#__PURE__*/function () {
  function ActionblockPltService() {
    _classCallCheck(this, ActionblockPltService);
  }

  _createClass(ActionblockPltService, [{
    key: "getProductData",
    value: function getProductData() {
      return fetch("".concat(BASE_URI, "/action-block/products")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getLandingPages",
    value: function getLandingPages() {
      return fetch("".concat(BASE_URI, "/action-block/landing-pages")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "insertProduct",
    value: function insertProduct(payload) {
      return fetch("".concat(BASE_URI, "/action-block/product"), {
        method: "POST",
        body: _objectSpread2({}, payload)
      }).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "createAbSurvey",
    value: function createAbSurvey(payload) {
      return fetch("".concat(BASE_URI, "/action-block/abSurvey"), {
        method: "POST",
        body: _objectSpread2({}, payload)
      }).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "createAbRsvp",
    value: function createAbRsvp(payload) {
      return fetch("".concat(BASE_URI, "/action-block/abRsvp"), {
        method: "POST",
        body: _objectSpread2({}, payload)
      }).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "createAbPoll",
    value: function createAbPoll(payload) {
      return fetch("".concat(BASE_URI, "/action-block/abPoll"), {
        method: "POST",
        body: _objectSpread2({}, payload)
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return ActionblockPltService;
}();

var ShoppingcartService = /*#__PURE__*/function () {
  function ShoppingcartService() {
    _classCallCheck(this, ShoppingcartService);
  }

  _createClass(ShoppingcartService, [{
    key: "saveProduct",
    value: function saveProduct(payload) {
      return fetch("".concat(BASE_URI, "/cart/product"), {
        method: "POST",
        body: _objectSpread2({}, payload)
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return ShoppingcartService;
}();

var WebExtractService = /*#__PURE__*/function () {
  function WebExtractService() {
    _classCallCheck(this, WebExtractService);
  }

  _createClass(WebExtractService, [{
    key: "getWebContent",
    value: function getWebContent() {
      return fetch("".concat(BASE_URI, "/web-extract/content")).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getValidProviders",
    value: function getValidProviders() {
      return fetch("".concat(BASE_URI, "/web-extract/valid-providers")).then(function (r) {
        return r.json();
      });
    }
  }]);

  return WebExtractService;
}();

var mockDistUI = function mockDistUI() {
  console.warn("DistUI is mocked out"); // No-op on distui functions

  window.distui = {
    /**
     * addEventListener
     */
    addEventListener: function addEventListener() {},

    /**
     * removeEventListener
     */
    removeEventListener: function removeEventListener() {},

    /**
     * showOverlay
     */
    showOverlay: function showOverlay() {},

    /**
     * track
     */
    track: function track() {}
  }; // distui-helper is looking for onDistUiReady event
  // https://github.roving.com/ES/distui-helpers/blob/1f561f28835ca18db5ea27e4b9a1e173862bc0ac/src/js/distUI.js#L78

  window.DistUI = _objectSpread2({
    instance: _objectSpread2({}, window.distui)
  }, window.distui);
  var fakeOnDistUiReadyEvent = new CustomEvent("onDistUiReady", {});
  window.document.dispatchEvent(fakeOnDistUiReadyEvent);
};

//mock dist UI

mockDistUI();
var BASE_URI = process.REACT_APP_API_URL || "http://localhost:8002";
var services = {
  contacts: ContactsService,
  emailCustomerAccount: EmailCustomerAccountService,
  library: MockMyLibraryService,
  shoppableProducts: ShoppableProductService,
  actionblockPlt: ActionblockPltService,
  shoppingcartSvc: ShoppingcartService,
  account: AccountService,
  settings: MockSettingsService,
  webExtract: WebExtractService,
  vimeo: VimeoService,
  commonData: CommonDataService
};

var CpeIntegration = function CpeIntegration(_ref) {
  var documentId = _ref.documentId,
      accountId = _ref.accountId,
      applicationId = _ref.applicationId;

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      cpeComponent = _useState2[0],
      setCpeComponent = _useState2[1];

  var _useState3 = useState("pointer"),
      _useState4 = _slicedToArray(_useState3, 2),
      cursorStyle = _useState4[0],
      setCursorStyle = _useState4[1];

  useEffect(function () {
    var documentService = new MockWebpackDocumentClient(accountId, applicationId);
    ServiceManager.registerService("document", documentService);
    ServiceManager.registerService("emailCustomerAccount", new EmailCustomerAccountService());
    ServiceManager.registerService("account", new AccountService());
    ServiceManager.registerService("commonData", new CommonDataService());
    ServiceManager.registerService("vimeo", new VimeoService());
    var cpeInstance = new CPE({
      el: ".editor-document",
      paletteEl: ".editor-palette",
      accountId: accountId,
      documentId: documentId,
      config: {},
      autoSave: true,
      services: services,
      console: {
        success: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        log: console.log
      },
      editorData: {
        builderTokenPresent: true
      },
      consumerEditorConfig: {
        layout: {
          dynamicContent: {
            enabled: true,
            allowed: true
          }
        }
      },
      paletteEditorConfig: {
        poll: {
          shouldShowBlock: true
        },
        rsvp: {
          shouldShowBlock: true,
          allowed: true
        }
      },
      plugins: {
        whatsNew: {
          enabled: false
        }
      }
    });
    window.addEventListener("onGetDocument", function (event) {
      if (cpeInstance) {
        cpeInstance.config.documentId = event.detail.metadata.document_id;
        setCpeComponent(cpeInstance);
      }
    });
    cpeInstance.eventChannel.on("document-auto-save", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = console;
              _context.next = 3;
              return cpeInstance.saveDocument();

            case 3:
              _context.t1 = _context.sent;

              _context.t0.log.call(_context.t0, "save", _context.t1);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    cpeInstance.start().then();
    setCpeComponent(cpeInstance);
  }, []);

  var continueButton = function continueButton() {
    cpeComponent.saveDocument();
  };

  var saveButton = function saveButton() {
    setCursorStyle("wait");
    cpeComponent.saveDocument().then(function (_) {
      setCursorStyle("pointer");
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-header"
  }, /*#__PURE__*/React.createElement("section", {
    className: "fed-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "CommonHeader CommonHeader--editable u-bgWhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "CommonHeader-column CommonHeader-column--title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "CommonHeader-column Form CommonHeader-column--title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Form-inputGroup CommonHeader-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "Form-inputAddOn u-valignMiddle"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "CommonHeader-column u-paddingFlush"
  }, /*#__PURE__*/React.createElement("span", {
    className: "editor-status-region"
  }, /*#__PURE__*/React.createElement("span", {
    className: "CommonHeader-action u-marginRight save-status"
  })), /*#__PURE__*/React.createElement("span", {
    className: "u-marginRightHalf"
  }, /*#__PURE__*/React.createElement("button", {
    className: "Button Button--link",
    id: "save-button",
    type: "button",
    title: "Save your edits",
    onClick: saveButton,
    style: {
      cursor: cursorStyle
    } // disabled

  }, /*#__PURE__*/React.createElement("i", {
    className: "Icon--disk"
  }), /*#__PURE__*/React.createElement("span", null, "Save"))), /*#__PURE__*/React.createElement("span", {
    className: "u-marginRightFlush"
  }, /*#__PURE__*/React.createElement("button", {
    className: "Button Button--primary",
    id: "nextButton",
    type: "button",
    "data-qe-id": "nextButton",
    title: "Choose recipients and schedule when to send",
    onClick: continueButton
  }, "Continue")))))), /*#__PURE__*/React.createElement("div", {
    className: "editor-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-palette"
  })), /*#__PURE__*/React.createElement("div", {
    className: "editor-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-console"
  }), /*#__PURE__*/React.createElement("div", {
    className: "editor-message-settings"
  }), /*#__PURE__*/React.createElement("div", {
    id: "editor-document",
    className: "editor-document"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "survey-container"
  })));
};

export { CpeIntegration };
