"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElseIf = exports.Else = exports.If = exports.Condition = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var Condition = function Condition(_ref) {
    var children = _ref.children;

    var ifCondition = null;
    var ifChildren = null;
    var elseIfConditions = [];
    var elseChildren = null;
    var childrens = [];

    if (Array.isArray(children)) {
        childrens.push.apply(childrens, (0, _toConsumableArray3.default)(children));
    } else {
        childrens.push(children);
    }

    childrens.forEach(function(_ref2) {
        var type = _ref2.type,
            props = _ref2.props;
        var name = type.name;
        var condition = props.condition,
            children = props.children;

        if (name === "If") {
            ifCondition = condition;
            ifChildren = children;
        } else if (name === "ElseIf") {
            elseIfConditions.push({
                condition: condition,
                children: children
            });
        } else if (name === "Else") {
            elseChildren = children;
        }
    });

    if (ifCondition) {
        return ifChildren;
    }

    if (elseIfConditions.length > 0) {
        var child = elseIfConditions.find(function(cond) {
            return cond.condition;
        });
        if (child) {
            return child.children;
        }
    }

    return elseChildren;
};

var If = function If(_ref3) {
    var condition = _ref3.condition,
        children = _ref3.children;
    return condition ? children : null;
};

var ElseIf = function ElseIf(_ref4) {
    var condition = _ref4.condition,
        children = _ref4.children;
    return condition ? children : null;
};

var Else = function Else(_ref5) {
    var children = _ref5.children;
    return children;
};

exports.Condition = Condition;
exports.If = If;
exports.Else = Else;
exports.ElseIf = ElseIf;
