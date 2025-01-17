import e, { Children as r, createElement as t } from "react";

function _extends() {
  _extends = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) {
        if (Object.prototype.hasOwnProperty.call(t, n)) {
          e[n] = t[n];
        }
      }
    }
    return e;
  };
  return _extends.apply(this, arguments);
}

var n = 60103;

var u = 60106;

var o = 60107;

var a = 60108;

var i = 60114;

var c = 60109;

var l = 60110;

var f = 60111;

var s = 60112;

var v = 60113;

var p = 60115;

var d = 60116;

if ("function" == typeof Symbol && Symbol.for) {
  var m = Symbol.for;
  n = m("react.element");
  u = m("react.portal");
  o = m("react.fragment");
  a = m("react.strict_mode");
  i = m("react.profiler");
  c = m("react.provider");
  l = m("react.context");
  f = Symbol.for("react.concurrent_mode");
  s = m("react.forward_ref");
  v = m("react.suspense");
  p = m("react.memo");
  d = m("react.lazy");
}

var h = n;

var y = u;

var _ = o;

var S = a;

var x = i;

var b = c;

var M = l;

var g = f;

var k = s;

var w = v;

var F = p;

var I = d;

var q = r.toArray;

var isAbstractElement = function(e) {
  return null !== e && "object" == typeof e;
};

var getChildrenArray = function(e) {
  return q(e).filter(isAbstractElement);
};

var computeProps = function(e, r) {
  return "object" == typeof r ? _extends({}, r, e) : e;
};

var E = new Map;

var C = {};

var D = void 0;

var P = void 0;

var getCurrentContextMap = function() {
  return _extends({}, C);
};

var getCurrentContextStore = function() {
  return new Map(E);
};

var flushPrevContextMap = function() {
  var e = D;
  D = void 0;
  return e;
};

var flushPrevContextStore = function() {
  var e = P;
  P = void 0;
  return e;
};

var restoreContextMap = function(e) {
  if (void 0 !== e) {
    _extends(C, e);
  }
};

var restoreContextStore = function(e) {
  if (void 0 !== e) {
    E.set(e[0], e[1]);
  }
};

var setCurrentContextMap = function(e) {
  D = void 0;
  C = e;
};

var setCurrentContextStore = function(e) {
  P = void 0;
  E = e;
};

var readContextValue = function(e) {
  var r = E.get(e);
  if (void 0 !== r) {
    return r;
  }
  return e._currentValue;
};

var R = {};

var maskContext = function(e) {
  var r = e.contextType;
  var t = e.contextTypes;
  if (r) {
    return readContextValue(r);
  } else if (!t) {
    return R;
  }
  var n = {};
  for (var u in t) {
    n[u] = C[u];
  }
  return n;
};

var z = null;

var getCurrentErrorFrame = function() {
  return z;
};

var setCurrentErrorFrame = function(e) {
  z = e || null;
};

var O = {
  current: {
    uniqueID: 0
  }
};

var W = "function" == typeof Object.is ? Object.is : function is(e, r) {
  return e === r && (0 !== e || 1 / e == 1 / r) || e != e && r != r;
};

var j = null;

var setCurrentIdentity = function(e) {
  j = e;
};

var getCurrentIdentity = function() {
  if (null === j) {
    throw new Error("[react-ssr-prepass] Hooks can only be called inside the body of a function component. (https://fb.me/react-invalid-hook-call)");
  }
  return j;
};

var H = null;

var T = null;

var U = !1;

var $ = null;

var A = 0;

var setFirstHook = function(e) {
  H = e;
};

function createWorkInProgressHook() {
  if (null === T) {
    if (null === H) {
      return H = T = {
        memoizedState: null,
        queue: null,
        next: null
      };
    } else {
      return T = H;
    }
  } else if (null === T.next) {
    return T = T.next = {
      memoizedState: null,
      queue: null,
      next: null
    };
  } else {
    return T = T.next;
  }
}

function basicStateReducer(e, r) {
  return "function" == typeof r ? r(e) : r;
}

function useReducer(e, r, t) {
  var n = getCurrentIdentity();
  if (null === (T = createWorkInProgressHook()).queue) {
    var u;
    if (e === basicStateReducer) {
      u = "function" == typeof r ? r() : r;
    } else {
      u = void 0 !== t ? t(r) : r;
    }
    T.memoizedState = u;
  }
  var o = T.queue || (T.queue = {
    last: null,
    dispatch: null
  });
  var a = o.dispatch || (o.dispatch = dispatchAction.bind(null, n, o));
  if (null !== $) {
    var i = $.get(o);
    if (void 0 !== i) {
      $.delete(o);
      var c = T.memoizedState;
      var l = i;
      do {
        c = e(c, l.action);
        l = l.next;
      } while (null !== l);
      T.memoizedState = c;
    }
  }
  return [ T.memoizedState, a ];
}

function useMemo(e, r) {
  getCurrentIdentity();
  var t = void 0 === r ? null : r;
  var n = (T = createWorkInProgressHook()).memoizedState;
  if (null !== n && null !== t) {
    if (function areHookInputsEqual(e, r) {
      if (!r) {
        return !1;
      }
      for (var t = 0; t < r.length && t < e.length; t++) {
        if (!W(e[t], r[t])) {
          return !1;
        }
      }
      return !0;
    }(t, n[1])) {
      return n[0];
    }
  }
  var u = e();
  T.memoizedState = [ u, t ];
  return u;
}

function useOpaqueIdentifier() {
  getCurrentIdentity();
  if (!(T = createWorkInProgressHook()).memoizedState) {
    T.memoizedState = "R:" + (O.current.uniqueID++).toString(36);
  }
  return T.memoizedState;
}

function dispatchAction(e, r, t) {
  if (e === j) {
    U = !0;
    var n = {
      action: t,
      next: null
    };
    if (null === $) {
      $ = new Map;
    }
    var u = $.get(r);
    if (void 0 === u) {
      $.set(r, n);
    } else {
      var o = u;
      while (null !== o.next) {
        o = o.next;
      }
      o.next = n;
    }
  }
}

function noop() {}

function _ref$2(e) {
  e();
}

var N = {
  readContext: function readContext(e, r) {
    return readContextValue(e);
  },
  useSyncExternalStore: function useSyncExternalStore(e, r, t) {
    return r();
  },
  useContext: function useContext(e, r) {
    getCurrentIdentity();
    return readContextValue(e);
  },
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: function useRef(e) {
    getCurrentIdentity();
    var r = (T = createWorkInProgressHook()).memoizedState;
    if (null === r) {
      var t = {
        current: e
      };
      T.memoizedState = t;
      return t;
    } else {
      return r;
    }
  },
  useState: function useState(e) {
    return useReducer(basicStateReducer, e);
  },
  useCallback: function useCallback(e, r) {
    return useMemo((function() {
      return e;
    }), r);
  },
  useMutableSource: function useMutableSource(e, r, t) {
    getCurrentIdentity();
    return r(e._source);
  },
  useTransition: function useTransition() {
    return [ _ref$2, !1 ];
  },
  useDeferredValue: function useDeferredValue(e) {
    return e;
  },
  useOpaqueIdentifier: useOpaqueIdentifier,
  useId: useOpaqueIdentifier,
  unstable_useId: useOpaqueIdentifier,
  unstable_useOpaqueIdentifier: useOpaqueIdentifier,
  useLayoutEffect: noop,
  useImperativeHandle: noop,
  useEffect: noop,
  useDebugValue: noop
};

var resolve = function(e) {
  var r = e._payload || e;
  if (0 === r._status) {
    return r._result;
  } else if (1 === r._status) {
    return Promise.resolve(r._result);
  } else if (2 === r._status) {
    return Promise.reject(r._result);
  }
  r._status = 0;
  return r._result = (r._ctor || r._result)().then((function(e) {
    r._result = e;
    if ("function" == typeof e) {
      r._status = 1;
    } else if (null !== e && "object" == typeof e && "function" == typeof e.default) {
      r._result = e.default;
      r._status = 1;
    } else {
      r._status = 2;
    }
  })).catch((function(e) {
    r._status = 2;
    r._result = e;
    return Promise.reject(e);
  }));
};

var render$3 = function(e, r, n) {
  var u = e._payload || e;
  if (1 === u._status) {
    return t(u._result, r);
  }
  return null;
};

var makeFrame$1 = function(e, r, t) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    id: getCurrentIdentity(),
    hook: H,
    kind: "frame.hooks",
    errorFrame: getCurrentErrorFrame(),
    thenable: t,
    props: r,
    type: e
  };
};

var render$2 = function(e, r, t) {
  try {
    return function renderWithHooks(e, r, t) {
      T = null;
      var n = e(r, t);
      while (A < 25 && U) {
        U = !1;
        A += 1;
        T = null;
        n = e(r, t);
      }
      A = 0;
      $ = null;
      T = null;
      return n;
    }(e, computeProps(r, e.defaultProps), maskContext(e));
  } catch (n) {
    if ("function" != typeof n.then) {
      throw n;
    }
    t.push(makeFrame$1(e, r, n));
    return null;
  }
};

function _ref$1() {
  return !1;
}

function _ref2() {
  return null;
}

var createInstance = function(e, r) {
  var t = {
    _thrown: 0,
    queue: n = [],
    isMounted: _ref$1,
    enqueueForceUpdate: _ref2,
    enqueueReplaceState: function(e, r) {
      if (e._isMounted) {
        n.length = 0;
        n.push(r);
      }
    },
    enqueueSetState: function(e, r) {
      if (e._isMounted) {
        n.push(r);
      }
    }
  };
  var n;
  var u = computeProps(r, e.defaultProps);
  var o = maskContext(e);
  var a = new e(u, o, t);
  a.props = u;
  a.context = o;
  a.updater = t;
  a._isMounted = !0;
  if (void 0 === a.state) {
    a.state = null;
  }
  if ("function" == typeof a.componentDidCatch || "function" == typeof e.getDerivedStateFromError) {
    var i = makeFrame(e, a, null);
    i.errorFrame = i;
    setCurrentErrorFrame(i);
  }
  if ("function" == typeof e.getDerivedStateFromProps) {
    var c = (0, e.getDerivedStateFromProps)(a.props, a.state);
    if (null != c) {
      a.state = _extends({}, a.state, c);
    }
  } else if ("function" == typeof a.componentWillMount) {
    a.componentWillMount();
  } else if ("function" == typeof a.UNSAFE_componentWillMount) {
    a.UNSAFE_componentWillMount();
  }
  return a;
};

var makeFrame = function(e, r, t) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    errorFrame: getCurrentErrorFrame(),
    thenable: t,
    kind: "frame.class",
    error: null,
    instance: r,
    type: e
  };
};

var render$1 = function(e, r, t) {
  !function(e) {
    var r = e.updater.queue;
    if (r.length > 0) {
      var t = _extends({}, e.state);
      for (var n = 0, u = r.length; n < u; n++) {
        var o = r[n];
        var a = "function" == typeof o ? o.call(e, t, e.props, e.context) : o;
        if (null !== a) {
          _extends(t, a);
        }
      }
      e.state = t;
      r.length = 0;
    }
  }(r);
  var n = null;
  try {
    n = r.render();
  } catch (n) {
    if ("function" != typeof n.then) {
      throw n;
    }
    t.push(makeFrame(e, r, n));
    return null;
  }
  if (void 0 !== e.childContextTypes && "function" == typeof r.getChildContext) {
    var u = r.getChildContext();
    if (null !== u && "object" == typeof u) {
      !function(e) {
        D = {};
        for (var r in e) {
          D[r] = C[r];
          C[r] = e[r];
        }
      }(u);
    }
  }
  if ("function" != typeof r.getDerivedStateFromProps && ("function" == typeof r.componentWillMount || "function" == typeof r.UNSAFE_componentWillMount) && "function" == typeof r.componentWillUnmount) {
    try {
      r.componentWillUnmount();
    } catch (e) {}
  }
  r._isMounted = !1;
  return n;
};

var L = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;

var V = "function" == typeof setImmediate;

var render = function(e, r, t, n, u) {
  return (o = e).prototype && o.prototype.isReactComponent ? function(e, r, t, n, u) {
    setCurrentIdentity(null);
    var o = createInstance(e, r);
    var a = n(u, o);
    if (a) {
      t.push(makeFrame(e, o, a));
      return null;
    }
    return render$1(e, o, t);
  }(e, r, t, n, u) : function(e, r, t, n, u) {
    setFirstHook(null);
    setCurrentIdentity({});
    var o = n(u);
    if (o) {
      t.push(makeFrame$1(e, r, o));
      return null;
    }
    return render$2(e, r, t);
  }(e, r, t, n, u);
  var o;
};

var visitElement = function(e, r, n) {
  switch (function(e) {
    switch (e.$$typeof) {
     case y:
      return y;

     case h:
      switch (e.type) {
       case g:
        return g;

       case _:
        return _;

       case x:
        return x;

       case S:
        return S;

       case w:
        return w;

       default:
        switch (e.type && e.type.$$typeof) {
         case I:
          return I;

         case F:
          return F;

         case M:
          return M;

         case b:
          return b;

         case k:
          return k;

         default:
          return h;
        }
      }

     default:
      return;
    }
  }(e)) {
   case w:
   case S:
   case g:
   case x:
   case _:
    return getChildrenArray(e.props.children);

   case b:
    var u = e.props;
    var o = u.children;
    !function(e, r) {
      P = [ e, E.get(e) ];
      E.set(e, r);
    }(e.type._context, u.value);
    return getChildrenArray(o);

   case M:
    var a = e.props.children;
    if ("function" == typeof a) {
      var i = e.type;
      var c = readContextValue("object" == typeof i._context ? i._context : i);
      return getChildrenArray(a(c));
    } else {
      return [];
    }

   case I:
    var l = function(e, r, t) {
      if ((e._payload || e)._status <= 0) {
        t.push({
          kind: "frame.lazy",
          contextMap: getCurrentContextMap(),
          contextStore: getCurrentContextStore(),
          errorFrame: getCurrentErrorFrame(),
          thenable: resolve(e),
          props: r,
          type: e
        });
        return null;
      }
      return render$3(e, r);
    }(e.type, e.props, r);
    return getChildrenArray(l);

   case F:
    var f = t(e.type.type, e.props);
    return getChildrenArray(f);

   case k:
    var s = e.type;
    var v = s.render;
    var p = computeProps(e.props, s.defaultProps);
    var d = t(v, p);
    return getChildrenArray(d);

   case h:
    if ("string" == typeof e.type) {
      return getChildrenArray(e.props.children);
    } else {
      var m = render(e.type, e.props, r, n, e);
      return getChildrenArray(m);
    }

   default:
    return [];
  }
};

var visitLoop = function(e, r, t, n, u, o) {
  var a = L.current;
  var i = Date.now();
  try {
    L.current = N;
    while (e.length > 0) {
      var c = e[e.length - 1].shift();
      if (void 0 !== c) {
        var l = visitElement(c, u, o);
        e.push(l);
        r.push(flushPrevContextMap());
        t.push(flushPrevContextStore());
        n.push(getCurrentErrorFrame());
      } else {
        e.pop();
        restoreContextMap(r.pop());
        restoreContextStore(t.pop());
        setCurrentErrorFrame(n.pop());
      }
      if (V && Date.now() - i > 5) {
        return !0;
      }
    }
    return !1;
  } catch (e) {
    var f = getCurrentErrorFrame();
    if (!f) {
      throw e;
    }
    f.error = e;
    u.unshift(f);
    return !1;
  } finally {
    L.current = a;
  }
};

var makeYieldFrame = function(e, r, t, n) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    errorFrame: getCurrentErrorFrame(),
    thenable: null,
    kind: "frame.yield",
    traversalChildren: e,
    traversalMap: r,
    traversalStore: t,
    traversalErrorFrame: n
  };
};

var visit = function(e, r, t) {
  var n = [ e ];
  var u = [ flushPrevContextMap() ];
  var o = [ flushPrevContextStore() ];
  var a = [ getCurrentErrorFrame() ];
  if (visitLoop(n, u, o, a, r, t)) {
    r.unshift(makeYieldFrame(n, u, o, a));
  }
};

var update = function(e, r, t) {
  if ("frame.yield" === e.kind) {
    setCurrentIdentity(null);
    setCurrentContextMap(e.contextMap);
    setCurrentContextStore(e.contextStore);
    setCurrentErrorFrame(e.errorFrame);
    if (visitLoop(e.traversalChildren, e.traversalMap, e.traversalStore, e.traversalErrorFrame, r, t)) {
      r.unshift(makeYieldFrame(e.traversalChildren, e.traversalMap, e.traversalStore, e.traversalErrorFrame));
    }
  } else {
    var n = L.current;
    var u = null;
    L.current = N;
    try {
      if ("frame.class" === e.kind) {
        u = function(e, r) {
          setCurrentIdentity(null);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          if (r.error) {
            if (++r.instance.updater._thrown >= 25) {
              return null;
            }
            r.instance._isMounted = !0;
            if ("function" == typeof r.instance.componentDidCatch) {
              r.instance.componentDidCatch(r.error);
            }
            if ("function" == typeof r.type.getDerivedStateFromError) {
              r.instance.updater.enqueueSetState(r.instance, r.type.getDerivedStateFromError(r.error));
            }
          }
          return render$1(r.type, r.instance, e);
        }(r, e);
      } else if ("frame.hooks" === e.kind) {
        u = function(e, r) {
          setFirstHook(r.hook);
          setCurrentIdentity(r.id);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          return render$2(r.type, r.props, e);
        }(r, e);
      } else if ("frame.lazy" === e.kind) {
        u = function(e, r) {
          setCurrentIdentity(null);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          return render$3(r.type, r.props);
        }(0, e);
      }
    } catch (e) {
      var o = getCurrentErrorFrame();
      if (!o) {
        throw e;
      }
      o.error = e;
      r.unshift(o);
      u = null;
    } finally {
      L.current = n;
    }
    visit(getChildrenArray(u), r, t);
  }
};

function _ref(e, r) {
  setImmediate(e);
}

var flushFrames = function(e, r, t) {
  var n = e.shift();
  if (!n) {
    return Promise.resolve();
  }
  if (V && "frame.yield" === n.kind) {
    n.thenable = new Promise(_ref);
  }
  return Promise.resolve(n.thenable).then((function() {
    !function(e) {
      O.current = e;
    }(t);
    update(n, e, r);
    return flushFrames(e, r, t);
  }), (function(t) {
    if (!n.errorFrame) {
      throw t;
    }
    n.errorFrame.error = t;
    update(n.errorFrame, e, r);
  }));
};

var defaultVisitor = function() {
  return;
};

var renderPrepass = function(e, r) {
  if (!r) {
    r = defaultVisitor;
  }
  var t = [];
  var n = O.current = {
    uniqueID: 0
  };
  setCurrentContextMap({});
  setCurrentContextStore(new Map);
  setCurrentErrorFrame(null);
  try {
    visit(getChildrenArray(e), t, r);
  } catch (e) {
    return Promise.reject(e);
  }
  return flushFrames(t, r, n);
};

export { renderPrepass as default };
//# sourceMappingURL=react-ssr-prepass.es.js.map
