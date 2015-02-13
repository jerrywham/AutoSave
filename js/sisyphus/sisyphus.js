! function (t) {
    t.fn.sisyphus = function (e) {
        var i = t.map(this, function (e) {
            return t(e).attr("id") + t(e).attr("name")
        }).join(),
            n = Sisyphus.getInstance(i);
        return n.protect(this, e), n
    };
    var e = {};
    e.isAvailable = function () {
        if ("object" == typeof t.jStorage) return !0;
        try {
            return localStorage.getItem
        } catch (e) {
            return !1
        }
    }, e.set = function (e, i) {
        if ("object" == typeof t.jStorage) t.jStorage.set(e, i + "");
        else try {
            localStorage.setItem(e, i + "")
        } catch (n) {}
    }, e.get = function (e) {
        if ("object" == typeof t.jStorage) {
            var i = t.jStorage.get(e);
            return i ? "" + i : i
        }
        return localStorage.getItem(e)
    }, e.remove = function (e) {
        "object" == typeof t.jStorage ? t.jStorage.deleteKey(e) : localStorage.removeItem(e)
    }, Sisyphus = function () {
        function i() {
            return {
                setInstanceIdentifier: function (t) {
                    this.identifier = t
                },
                getInstanceIdentifier: function () {
                    return this.identifier
                },
                setInitialOptions: function (i) {
                    var n = {
                        excludeFields: [],
                        customKeySuffix: "",
                        locationBased: !1,
                        timeout: 0,
                        autoRelease: !0,
                        onSave: function () {},
                        onBeforeRestore: function () {},
                        onRestore: function () {},
                        onRelease: function () {}
                    };
                    this.options = this.options || t.extend(n, i), this.browserStorage = e
                },
                setOptions: function (e) {
                    this.options = this.options || this.setInitialOptions(e), this.options = t.extend(this.options, e)
                },
                protect: function (e, i) {
                    this.setOptions(i), e = e || {};
                    var a = this;
                    if (this.targets = this.targets || [], this.href = a.options.name ? a.options.name : location.hostname + location.pathname + location.search + location.hash, this.targets = t.merge(this.targets, e), this.targets = t.unique(this.targets), this.targets = t(this.targets), !this.browserStorage.isAvailable()) return !1;
                    var o = a.options.onBeforeRestore.call(a);
                    if ((void 0 === o || o) && a.restoreAllData(), this.options.autoRelease && a.bindReleaseData(), !n.started[this.getInstanceIdentifier()]) if (a.isCKEditorPresent()) var s = setInterval(function () {
                        CKEDITOR.isLoaded && (clearInterval(s), a.bindSaveData(), n.started[a.getInstanceIdentifier()] = !0)
                    }, 100);
                    else a.bindSaveData(), n.started[a.getInstanceIdentifier()] = !0
                },
                isCKEditorPresent: function () {
                    return this.isCKEditorExists() ? (CKEDITOR.isLoaded = !1, CKEDITOR.on("instanceReady", function () {
                        CKEDITOR.isLoaded = !0
                    }), !0) : !1
                },
                isCKEditorExists: function () {
                    return "undefined" != typeof CKEDITOR
                },
                findFieldsToProtect: function (t) {
                    return t.find(":input").not(":submit").not(":reset").not(":button").not(":file").not(":password").not(":disabled").not("[readonly]")
                },
                bindSaveData: function () {
                    var e = this;
                    e.options.timeout && e.saveDataByTimeout(), e.targets.each(function () {
                        var i = t(this).attr("id") + t(this).attr("name");
                        e.findFieldsToProtect(t(this)).each(function () {
                            if (-1 !== t.inArray(this, e.options.excludeFields)) return !0;
                            var n = t(this),
                                a = (e.options.locationBased ? e.href : "") + i + n.attr("name") + e.options.customKeySuffix;
                            (n.is(":text") || n.is("textarea")) && (e.options.timeout || e.bindSaveDataImmediately(n, a)), e.bindSaveDataOnChange(n)
                        })
                    })
                },
                saveAllData: function () {
                    var e = this;
                    e.targets.each(function () {
                        var i = t(this).attr("id") + t(this).attr("name"),
                            n = {};
                        e.findFieldsToProtect(t(this)).each(function () {
                            var a = t(this);
                            if (-1 !== t.inArray(this, e.options.excludeFields) || void 0 === a.attr("name")) return !0;
                            var o = (e.options.locationBased ? e.href : "") + i + a.attr("name") + e.options.customKeySuffix,
                                s = a.val();
                            if (a.is(":checkbox")) {
                                if (-1 !== a.attr("name").indexOf("[")) {
                                    if (n[a.attr("name")] === !0) return;
                                    s = [], t("[name='" + a.attr("name") + "']:checked").each(function () {
                                        s.push(t(this).val())
                                    }), n[a.attr("name")] = !0
                                } else s = a.is(":checked");
                                e.saveToBrowserStorage(o, s, !1)
                            } else if (a.is(":radio")) a.is(":checked") && (s = a.val(), e.saveToBrowserStorage(o, s, !1));
                            else if (e.isCKEditorExists()) {
                                var r;
                                (r = CKEDITOR.instances[a.attr("name")] || CKEDITOR.instances[a.attr("id")]) ? (r.updateElement(), e.saveToBrowserStorage(o, a.val(), !1)) : e.saveToBrowserStorage(o, s, !1)
                            } else e.saveToBrowserStorage(o, s, !1)
                        })
                    }), e.options.onSave.call(e)
                },
                restoreAllData: function () {
                    var e = this,
                        i = !1;
                    e.targets.each(function () {
                        var n = t(this),
                            a = t(this).attr("id") + t(this).attr("name");
                        e.findFieldsToProtect(n).each(function () {
                            if (-1 !== t.inArray(this, e.options.excludeFields)) return !0;
                            var n = t(this),
                                o = (e.options.locationBased ? e.href : "") + a + n.attr("name") + e.options.customKeySuffix,
                                s = e.browserStorage.get(o);
                            null !== s && (e.restoreFieldsData(n, s), i = !0)
                        })
                    }), i && e.options.onRestore.call(e)
                },
                restoreFieldsData: function (t, e) {
                    return void 0 === t.attr("name") ? !1 : void(t.is(":checkbox") && "false" !== e && -1 === t.attr("name").indexOf("[") ? t.attr("checked", "checked") : t.is(":checkbox") && "false" === e && -1 === t.attr("name").indexOf("[") ? t.removeAttr("checked") : t.is(":radio") ? t.val() === e && t.attr("checked", "checked") : -1 === t.attr("name").indexOf("[") ? t.val(e) : (e = e.split(","), t.val(e)))
                },
                bindSaveDataImmediately: function (t, e) {
                    var i = this;
                    if ("onpropertychange" in t ? t.get(0).onpropertychange = function () {
                        i.saveToBrowserStorage(e, t.val())
                    } : t.get(0).oninput = function () {
                        i.saveToBrowserStorage(e, t.val())
                    }, this.isCKEditorExists()) {
                        var n;
                        (n = CKEDITOR.instances[t.attr("name")] || CKEDITOR.instances[t.attr("id")]) && n.document.on("keyup", function () {
                            n.updateElement(), i.saveToBrowserStorage(e, t.val())
                        })
                    }
                },
                saveToBrowserStorage: function (t, e, i) {
                    i = void 0 === i ? !0 : i, this.browserStorage.set(t, e), i && "" !== e && this.options.onSave.call(this)
                },
                bindSaveDataOnChange: function (t) {
                    var e = this;
                    t.change(function () {
                        e.saveAllData()
                    })
                },
                saveDataByTimeout: function () {
                    var t = this,
                        e = t.targets;
                    setTimeout(function () {
                        function e() {
                            t.saveAllData(), setTimeout(e, 1e3 * t.options.timeout)
                        }
                        return e
                    }(e), 1e3 * t.options.timeout)
                },
                bindReleaseData: function () {
                    var e = this;
                    e.targets.each(function () {
                        var i = t(this),
                            n = i.attr("id") + i.attr("name");
                        t(this).bind("submit reset", function () {
                            e.releaseData(n, e.findFieldsToProtect(i))
                        })
                    })
                },
                manuallyReleaseData: function () {
                    var e = this;
                    e.targets.each(function () {
                        var i = t(this),
                            n = i.attr("id") + i.attr("name");
                        e.releaseData(n, e.findFieldsToProtect(i))
                    })
                },
                releaseData: function (e, i) {
                    var a = !1,
                        o = this;
                    n.started[o.getInstanceIdentifier()] = !1, i.each(function () {
                        if (-1 !== t.inArray(this, o.options.excludeFields)) return !0;
                        var i = t(this),
                            n = (o.options.locationBased ? o.href : "") + e + i.attr("name") + o.options.customKeySuffix;
                        o.browserStorage.remove(n), a = !0
                    }), a && o.options.onRelease.call(o)
                }
            }
        }
        var n = {
            instantiated: [],
            started: []
        };
        return {
            getInstance: function (t) {
                return n.instantiated[t] || (n.instantiated[t] = i(), n.instantiated[t].setInstanceIdentifier(t), n.instantiated[t].setInitialOptions()), t ? n.instantiated[t] : n.instantiated[t]
            },
            free: function () {
                return n = {
                    instantiated: [],
                    started: []
                }, null
            },
            version: "1.1.2"
        }
    }()
}(jQuery);