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
Object.defineProperty(exports, "__esModule", { value: true });
// Custom Modules
const robots_1 = require("./robots");
function robotsGenerator(outPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // execute class for variable usage
        const generator = new robots_1.RobotsGenerator();
        const data = yield generator.generateFile(outPath);
        // console.log('robotsGenerator data:\n', data);
        return data;
    });
}
exports.default = robotsGenerator;
