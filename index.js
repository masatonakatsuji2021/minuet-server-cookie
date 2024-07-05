"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinuetServerModuleCookie = exports.MinuetCookie = void 0;
const minuet_server_1 = require("minuet-server");
class MinuetCookie {
    constructor(req, res) {
        this.cookies = {};
        this.req = req;
        this.res = res;
        const cookieBase = req.headers.cookie;
        if (!cookieBase)
            return;
        const cookies = cookieBase.split(";");
        for (let n = 0; n < cookies.length; n++) {
            const c_ = cookies[n].split("=");
            const name = c_[0].trim();
            const value = c_[1].trim();
            this.cookies[name] = value;
        }
    }
    get(name) {
        if (name) {
            if (this.cookies[name]) {
                return this.cookies[name];
            }
        }
        else {
            return this.cookies;
        }
    }
    set(name, value, option) {
        if (typeof value != "string")
            value = value.toString();
        this.cookies[name] = value;
        let writeStr = name + "=" + value;
        if (option) {
            const c = Object.keys(option);
            for (let n = 0; n < c.length; n++) {
                let field = c[n];
                const value = option[field].toString();
                if (field == "maxAge")
                    field = "max-Age";
                writeStr += "; " + field + "=" + value;
            }
        }
        this.res.setHeader("Set-Cookie", writeStr);
        return this;
    }
    delete(name) {
        this.set(name, "", {
            maxAge: 0,
        });
        delete this.cookies[name];
        return this;
    }
}
exports.MinuetCookie = MinuetCookie;
class MinuetServerModuleCookie extends minuet_server_1.MinuetServerModuleBase {
}
exports.MinuetServerModuleCookie = MinuetServerModuleCookie;
