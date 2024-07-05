/**
 * MIT License
 * 
 * Copyright (c) 2024 Masato Nakatsuji
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import { IncomingMessage, ServerResponse } from "http";
import { MinuetServerModuleBase } from "minuet-server";

export interface MinuetCookieSetOption {
    Expires? : string,
    maxAge? : number,
    Path?: string,
    Domain?: string,
    HttpOnly? : boolean,
    Secure? : boolean,
}

export class MinuetCookie {

    private req : IncomingMessage;

    private res: ServerResponse;

    private cookies : {[name : string] : string} = {};

    public constructor(req : IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;

        const cookieBase = req.headers.cookie;
        if (!cookieBase) return;
        const cookies = cookieBase.split(";");
        for (let n = 0 ; n < cookies.length ; n++) {
            const c_ = cookies[n].split("=");
            const name = c_[0].trim();
            const value = c_[1].trim();
            this.cookies[name] = value;
        }
    }

    /**
     * ***get***
     * @param {string?} name 
     * @returns 
     */
    public get(name? : string) : string | {[name : string] : string} {
        if (name){
            if (this.cookies[name]) {
                return this.cookies[name];
            }
        }
        else {
            return this.cookies;
        }
    }

    /**
     * ***set***
     * @param {string} name 
     * @param {string | number | boolean} value 
     * @param {MinuetCookieSetOption} option 
     * @returns 
     */
    public set(name : string, value : string | number | boolean, option?: MinuetCookieSetOption) : MinuetCookie {
        if (typeof value != "string") value = value.toString();
        this.cookies[name] = value;
        let writeStr = name + "=" + value;
        if (option){
            const c = Object.keys(option);
            for (let n = 0 ; n < c.length ; n++) {
                let field : string = c[n];
                const value = option[field].toString();
                if (field == "maxAge") field = "max-Age";
                writeStr += "; " + field + "=" + value;
            }
        }
        this.res.setHeader("Set-Cookie", writeStr);
        return this;
    }

    /**
     * ***delete*** 
     * @param {string} name 
     * @returns 
     */
    public delete(name : string) : MinuetCookie {
        this.set(name, "", {
            maxAge: 0,
        });
        delete this.cookies[name];
        return this;
    }

}

export class MinuetServerModuleCookie extends MinuetServerModuleBase {}