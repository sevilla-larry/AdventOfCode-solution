import { Md5 } from "https://deno.land/std/hash/md5.ts";

var puzzle:string = "bgvyzdsv";
var hash:string = "";
var loop:boolean = true;
var lpn:number = 1;
var puzzleLpn:string = ""
var first6:string = ""

while ( loop )
{
    puzzleLpn = puzzle + lpn.toString();
    hash = new Md5().update( puzzleLpn ).toString();
    first6 = hash.substring(0,6);

    if ( first6 === "000000" ) 
    {
        loop = false;
        break;
    }
    lpn++;
}

console.log( lpn );
