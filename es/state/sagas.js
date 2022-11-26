function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(importCurationApiConfig),
  _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(curationsSaga);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import ActionTypes from 'mirador/dist/es/src/state/actions/action-types';
import { getConfig, getManifests, getRequestsConfig } from 'mirador/dist/es/src/state/selectors';
import * as actions from 'mirador/dist/es/src/state/actions';
import { PluginActionTypes } from './actions';
import * as pluginActions from './actions';
import { getCurations, getManifestsToBeChecked } from './selectors';
var defaultCurationApiConfig = {
  visible: true,
  listAll: true,
  makeLabel: function makeLabel(curation) {
    var a = ["<b>index</b>: " + (curation.index || '-')];
    if (curation.region) {
      a.push("<b>region</b>: <span title=\"" + curation.region + "\">" + curation.region + "</span>");
    }
    if (curation.label) {
      a.push("<b>label</b>: " + curation.label);
    }
    if (curation.description) {
      a.push("<b>desciption</b>: " + curation.description);
    }
    if (curation.metadata) {
      curation.matadata.forEach(function (m) {
        a.push("<b>" + m.label + "</b>: " + m.value);
      });
    }
    return a.join('<br/>');
  },
  palette: {
    hidden: {
      globalAlpha: 0
    },
    "default": {
      strokeStyle: '#FF00FF',
      globalAlpha: 0.5
    },
    hovered: {
      strokeStyle: '#FF00FF',
      globalAlpha: 1
    },
    selected: {
      strokeStyle: '#FF00FF',
      globalAlpha: 1
    }
  }
};

// init
export function importCurationApiConfig() {
  var _yield$select, curationApi, uris, curations, i, uri;
  return _regeneratorRuntime().wrap(function importCurationApiConfig$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select(getConfig);
        case 2:
          _yield$select = _context.sent;
          curationApi = _yield$select.curationApi;
          uris = [].concat(curationApi.curations);
          _context.next = 7;
          return put(pluginActions.initCurationApiConfig({
            config: _extends({}, defaultCurationApiConfig, curationApi),
            curationIds: [],
            curations: {},
            manifestsToBeChecked: {}
          }));
        case 7:
          _context.next = 9;
          return select(getCurations);
        case 9:
          curations = _context.sent;
          i = 0;
        case 11:
          if (!(i < uris.length)) {
            _context.next = 19;
            break;
          }
          uri = uris[i];
          if (curations[uri]) {
            _context.next = 16;
            break;
          }
          _context.next = 16;
          return put(pluginActions.requestCuration(uri));
        case 16:
          i += 1;
          _context.next = 11;
          break;
        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

// fetch
function fetchWrapper(url, options, _ref) {
  var success = _ref.success,
    degraded = _ref.degraded,
    failure = _ref.failure;
  return fetch(url, options).then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 401) {
        return (degraded || success)({
          json: json,
          response: response
        });
      }
      if (response.ok) {
        return success({
          json: json,
          response: response
        });
      }
      return failure({
        error: response.statusText,
        json: json,
        response: response
      });
    })["catch"](function (error) {
      return failure({
        error: error,
        response: response
      });
    });
  })["catch"](function (error) {
    return failure({
      error: error
    });
  });
}
function fetchCurationResource(url, options, _ref2) {
  var success = _ref2.success,
    degraded = _ref2.degraded,
    failure = _ref2.failure;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$select2, _yield$select2$prepro, preprocessors, _yield$select2$postpr, postprocessors, reqOptions, action;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return select(getRequestsConfig);
          case 2:
            _yield$select2 = _context2.sent;
            _yield$select2$prepro = _yield$select2.preprocessors;
            preprocessors = _yield$select2$prepro === void 0 ? [] : _yield$select2$prepro;
            _yield$select2$postpr = _yield$select2.postprocessors;
            postprocessors = _yield$select2$postpr === void 0 ? [] : _yield$select2$postpr;
            _context2.prev = 7;
            reqOptions = preprocessors.reduce(function (acc, f) {
              return f(url, acc) || acc;
            }, options);
            _context2.next = 11;
            return call(fetchWrapper, url, reqOptions, {
              degraded: degraded,
              failure: failure,
              success: success
            });
          case 11:
            action = _context2.sent;
            action = postprocessors.reduce(function (acc, f) {
              return f(url, acc) || acc;
            }, action);
            return _context2.abrupt("return", action);
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](7);
            return _context2.abrupt("return", failure({
              error: _context2.t0
            }));
          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[7, 16]]);
  })();
}
export function fetchCuration(_ref3) {
  var uri = _ref3.uri;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var success, failure, _yield$call, dispatch, error;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            success = function success(_ref4) {
              var json = _ref4.json;
              return {
                dispatch: pluginActions.receiveCuration(uri, json),
                error: null
              };
            };
            failure = function failure(_ref5) {
              var error = _ref5.error;
              return {
                dispatch: pluginActions.receiveCurationFailure(uri, typeof error === 'object' ? String(error) : error, null),
                error: typeof error === 'object' ? String(error) : error
              };
            };
            _context3.next = 4;
            return call(fetchCurationResource, uri, {}, {
              failure: failure,
              success: success
            });
          case 4:
            _yield$call = _context3.sent;
            dispatch = _yield$call.dispatch;
            error = _yield$call.error;
            _context3.next = 9;
            return put(dispatch);
          case 9:
            if (!error) {
              _context3.next = 14;
              break;
            }
            _context3.next = 12;
            return put(actions.addError(error));
          case 12:
            _context3.next = 16;
            break;
          case 14:
            _context3.next = 16;
            return put(pluginActions.curationResourceUpdated(uri));
          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  })();
}
function parseCanvasIdFragment(s) {
  var a = s.split('#xywh=');
  return a[1] ? {
    canvasId: a[0],
    region: a[1],
    fragmentSelector: a[1].split(',').map(function (n) {
      return parseInt(n, 10);
    })
  } : {
    canvasId: a[0],
    region: 'full'
  };
}
function onCurationResourceUpdated(_ref6) {
  var uri = _ref6.uri;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var _yield$select3, json;
    return _regeneratorRuntime().wrap(function _callee4$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return select(getCurations);
          case 2:
            _yield$select3 = _context6.sent;
            json = _yield$select3[uri].json;
            if (!(json && json['@context'] && json['@context'].includes('http://codh.rois.ac.jp/iiif/curation/1/context.json'))) {
              _context6.next = 8;
              break;
            }
            return _context6.delegateYield( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var manifests, canvasIds, map, items, curationId, curationLabel, _loop, i;
              return _regeneratorRuntime().wrap(function _callee3$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return select(getManifests);
                    case 2:
                      manifests = _context5.sent;
                      canvasIds = {};
                      map = {};
                      Object.values(manifests).forEach(function (m) {
                        canvasIds[m.id] = [];
                        // todo: use `manifesto` to manipulate ranges?
                        m.json.sequences.forEach(function (s) {
                          return s.canvases.forEach(function (c) {
                            canvasIds[m.id].push(c['@id']);
                            map[c['@id']] = c.images[0].resource.service['@id'];
                          });
                        });
                      });
                      // curations
                      items = [];
                      curationId = json['@id'];
                      curationLabel = json.label || null; // todo: use `manifesto` to manipulate ranges?
                      _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
                        var s, common, targetCanvasIds;
                        return _regeneratorRuntime().wrap(function _loop$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                s = json.selections[i];
                                common = {
                                  manifestId: s.within['@id'],
                                  selectionLabel: s.label || null,
                                  curationLabel: curationLabel
                                };
                                targetCanvasIds = canvasIds[common.manifestId];
                                if (targetCanvasIds) {
                                  _context4.next = 6;
                                  break;
                                }
                                _context4.next = 6;
                                return put(pluginActions.updateManifestsToBeChecked(common.manifestId, uri));
                              case 6:
                                if (s.members) {
                                  s.members.forEach(function (m, idx) {
                                    var canvasIdAndRegion = parseCanvasIdFragment(m['@id']);
                                    items.push(_extends({}, canvasIdAndRegion, {
                                      serviceId: map && map[canvasIdAndRegion.canvasId],
                                      index: targetCanvasIds ? targetCanvasIds.indexOf(canvasIdAndRegion.canvasId) + 1 : '-',
                                      description: m.description || null,
                                      metadata: m.metadata || null,
                                      label: m.label || null
                                    }, common, {
                                      id: curationId + "/" + i + "/" + idx
                                    }));
                                  });
                                } else if (s.canvases) {
                                  s.canvases.forEach(function (c, idx) {
                                    var canvasIdAndRegion = parseCanvasIdFragment(c);
                                    items.push(_extends({}, canvasIdAndRegion, {
                                      serviceId: map && map[canvasIdAndRegion.canvasId],
                                      index: targetCanvasIds ? targetCanvasIds.indexOf(canvasIdAndRegion.canvasId) + 1 : '-'
                                    }, common, {
                                      id: curationId + "/" + i + "/" + idx
                                    }));
                                  });
                                }
                              case 7:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _loop);
                      });
                      i = 0;
                    case 11:
                      if (!(i < json.selections.length)) {
                        _context5.next = 16;
                        break;
                      }
                      return _context5.delegateYield(_loop(i), "t0", 13);
                    case 13:
                      i += 1;
                      _context5.next = 11;
                      break;
                    case 16:
                      _context5.next = 18;
                      return put(pluginActions.addCurationItems(uri, items));
                    case 18:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee3);
            })(), "t0", 6);
          case 6:
            _context6.next = 9;
            break;
          case 8:
            // eslint-disable-next-line no-console
            console.error(uri + " is invalid:", json);
          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee4);
  })();
}
function onManifestUpdated(_ref7) {
  var manifestId = _ref7.manifestId,
    manifestJson = _ref7.manifestJson;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var manifestsToBeChecked;
    return _regeneratorRuntime().wrap(function _callee5$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return select(getManifestsToBeChecked);
          case 2:
            manifestsToBeChecked = _context7.sent;
            if (manifestsToBeChecked[manifestId]) {
              // eslint-disable-next-line no-console
              console.warn('manifests to be checked still exist:', manifestsToBeChecked, manifestJson);
            }
          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee5);
  })();
}
export default function curationsSaga() {
  return _regeneratorRuntime().wrap(function curationsSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return all([takeEvery(ActionTypes.IMPORT_CONFIG, importCurationApiConfig), takeEvery(PluginActionTypes.REQUEST_CURATION, fetchCuration), takeEvery(PluginActionTypes.CURATION_RESOURCE_UPDATED, onCurationResourceUpdated), takeEvery(ActionTypes.RECEIVE_MANIFEST, onManifestUpdated)]);
        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked2);
}