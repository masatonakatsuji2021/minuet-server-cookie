import * as http from "http";
import { MinuetCookie } from "minuet-server-cookie";

let ind = 0;
http.createServer(async (req, res)=>{

    const mc = new MinuetCookie(req, res);

//    console.log(mc.get());
  //  console.log(mc.get("write-test"));
  /*
    ind++;
    mc.set("write-test", "test count=" + ind.toString(), {
        maxAge: 30,
    });
    */
   /*
   mc.delete("delete-test");
   console.log(mc.get());
    */
   
    res.write("OK");
    res.end();
}).listen(8082);
console.log("Listen http://localhost:8082");