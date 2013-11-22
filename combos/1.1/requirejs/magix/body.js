/**
 * @fileOverview body事件代理
 * @author 行列<xinglie.lkf@taobao.com>
 * @version 1.0
 **/
define("magix/body", ["magix/magix"], function(Magix) {
    //todo dom event and sizzle
    var Has = Magix.has;
var Mix = Magix.mix;
//依赖类库才能支持冒泡的事件
var DependLibEvents = {};
var RootNode = document.body;
var RootEvents = {};
var MxEvtSplit = String.fromCharCode(26);

var MxOwner = 'mx-owner';
var MxIgnore = 'mx-ei';
var TypesRegCache = {};
var IdCounter = 1 << 16;
var On = 'on';
var Comma = ',';

var IdIt = function(dom) {
    return dom.id || (dom.id = 'mx-e-' + (IdCounter--));
};
var GetSetAttribute = function(dom, attrKey, attrVal) {
    if (dom && dom.setAttribute) {
        if (attrVal) {
            dom.setAttribute(attrKey, attrVal);
        } else {
            attrVal = dom.getAttribute(attrKey);
        }
    }
    return attrVal;
};
var VOM;
var Body = {
    lib: Magix.unimpl,
    special: function(events) {
        Mix(DependLibEvents, events);
    },
    process: function(e) {

        var target = e.target || e.srcElement;
        while (target && target.nodeType != 1) {
            target = target.parentNode;
        }
        var current = target;
        var eventType = e.type;
        var eventReg = TypesRegCache[eventType] || (TypesRegCache[eventType] = new RegExp(Comma + eventType + '(?:,|$)'));
        //
        if (!eventReg.test(GetSetAttribute(target, MxIgnore))) {
            var type = 'mx-' + eventType;
            var info;
            var ignore;
            var arr = [];
            while (current && current != RootNode) { //找事件附近有mx[a-z]+事件的DOM节点
                info = GetSetAttribute(current, type);
                ignore = GetSetAttribute(current, MxIgnore); //current.getAttribute(MxIgnore);
                if (info || eventReg.test(ignore)) {
                    break;
                } else {
                    //
                    arr.push(current);
                    current = current.parentNode;
                }
            }
            if (info) { //有事件
                //找处理事件的vframe
                var vId;
                var ts = info.split(MxEvtSplit);
                if (ts.length > 1) {
                    vId = ts[0];
                    info = ts.pop();
                }
                var handler = GetSetAttribute(current, MxOwner) || vId; //current.getAttribute(MxOwner);
                if (!handler) { //如果没有则找最近的vframe
                    var begin = current;
                    var vfs = VOM.all();
                    while (begin && begin != RootNode) {
                        if (Has(vfs, begin.id)) {
                            GetSetAttribute(current, MxOwner, handler = begin.id);
                            //current.setAttribute(MxOwner,handler=begin.id);
                            break;
                        }
                        begin = begin.parentNode;
                    }
                }
                if (handler) { //有处理的vframe,派发事件，让对应的vframe进行处理

                    var vframe = VOM.get(handler);
                    var view = vframe && vframe.view;
                    if (view) {
                        view.processEvent({
                            info: info,
                            se: e,
                            st: eventType,
                            tId: IdIt(target),
                            cId: IdIt(current)
                        });
                    }
                } else {
                    throw Error('miss ' + MxOwner + ':' + info);
                }
            } else {
                var node;
                while (arr.length) {
                    node = arr.shift();
                    ignore = GetSetAttribute(node, MxIgnore) || On; //node.getAttribute(MxIgnore);
                    if (!eventReg.test(ignore)) {
                        ignore = ignore + Comma + eventType;
                        GetSetAttribute(node, MxIgnore, ignore);
                        //node.setAttribute(MxIgnore,ignore);
                    }
                }
            }
        }
    },
    act: function(type, vom, remove) {
        var me = this;
        var counter = RootEvents[type] || 0;
        var step = counter > 0 ? 1 : 0;

        counter += remove ? -step : step;

        if (!counter) {
            if (vom) {
                VOM = vom;
            }
            var lib = DependLibEvents[type];
            if (lib) {
                me.lib(remove, RootNode, type);
            } else {
                RootNode[On + type] = remove ? null : function(e) {
                    e = e || window.event;
                    if (e) {
                        me.process(e);
                    }
                };
            }
            if (!remove) {
                counter = 1;
            }
        }
        RootEvents[type] = counter;
    }
};
    Body.lib = function(remove, node, type) {
        var fn = remove ? 'undelegate' : 'delegate';
        $(node)[fn]('[mx-' + type + ']', type, Body.process);
    };
    Body.special(Magix.listToMap('focusin,focusout,mouseenter,mouseleave,mousewheel'));
    return Body;
});