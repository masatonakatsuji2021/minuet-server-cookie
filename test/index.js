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
const http = require("http");
const minuet_server_cookie_1 = require("minuet-server-cookie");
let ind = 0;
http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mc = new minuet_server_cookie_1.MinuetCookie(req, res);
    //    console.log(mc.get());
    //  console.log(mc.get("write-test"));
    /*
      ind++;
      mc.set("write-test", "test count=" + ind.toString(), {
          maxAge: 30,
      });
      */
    mc.delete("delete-test");
    console.log(mc.get());
    res.write("OK");
    res.end();
})).listen(8082);
console.log("Listen http://localhost:8082");
