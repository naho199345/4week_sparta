"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.methodForTs = void 0;
var express = require('express');
var Article = require("../schemas/article");
var authMiddlleware = require("../middlewares/auth-middleware");
var router = express.Router();
var methodForTs = function (req, res, next) { };
exports.methodForTs = methodForTs;
router.get("/", function (req, res) {
    res.send("this is root page");
});
// 전체 목록조회
router.get("/article", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var article;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Article.find().sort({ _id: -1 })];
            case 1:
                article = _a.sent();
                res.json({
                    article: article
                });
                return [2 /*return*/];
        }
    });
}); });
// 게시글 조회페이지
router.get("/article/:_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, article;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                return [4 /*yield*/, Article.find({ _id: _id })];
            case 1:
                article = (_a.sent())[0];
                res.json({
                    article: article
                });
                return [2 /*return*/];
        }
    });
}); });
// 삭제기능
router["delete"]("/article/:_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, password, article;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                password = req.body.password;
                return [4 /*yield*/, Article.find({ _id: _id }, { password: 1 })];
            case 1:
                article = (_a.sent())[0];
                if (!(article.password != password)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({ success: false })];
            case 2: return [4 /*yield*/, Article.deleteOne({ _id: _id })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json({ success: true, message: "게시글이 삭제되었습니다." });
                return [2 /*return*/];
        }
    });
}); });
// 수정
router.put("/article/:_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, password, title, content, name, article;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.params._id;
                _a = req.body, password = _a.password, title = _a.title, content = _a.content, name = _a.name;
                return [4 /*yield*/, Article.find({ _id: _id }, { password: 1 })];
            case 1:
                article = (_b.sent())[0];
                if (!(article.password != password)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({ success: false })];
            case 2: return [4 /*yield*/, Article.updateOne({ _id: _id }, { $set: { password: password, title: title, content: content, name: name } })];
            case 3:
                _b.sent();
                res.json({ success: true, message: "게시글이 수정되었습니다." });
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// 생성 파일
router.post("/article", authMiddlleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var today, year, month, day, date, _a, title, name, content, password, createarticle;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                today = new Date();
                year = today.getFullYear();
                month = today.getMonth() + 1;
                day = today.getDate();
                date = year + "-" + month + "-" + day;
                _a = req.body, title = _a.title, name = _a.name, content = _a.content, password = _a.password;
                if (!(name && password && title && content)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, errorMessage: "정확히 입력해주세요!" })];
                }
                return [4 /*yield*/, Article.create({
                        title: title,
                        name: name,
                        content: content,
                        password: password,
                        date: date
                    })];
            case 1:
                createarticle = _b.sent();
                res.status(201).json({ article: createarticle });
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
