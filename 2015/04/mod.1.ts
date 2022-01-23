import { Md5 } from "https://deno.land/std/hash/md5.ts";

const puzzle:string = "bgvyzdsv";
var hash:string = "";
var loop:boolean = true;
var lpn:number = 1;
var puzzleLpn:string = ""
var first5:string = ""

while ( loop )
{
    puzzleLpn = puzzle + lpn.toString();
    hash = new Md5().update( puzzleLpn ).toString();
    first5 = hash.substring(0,5);

    if ( first5 === "00000" ) 
    {
        loop = false;
        break;
    }
    lpn++;
}

console.log( lpn );
