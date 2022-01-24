import { readJson } from "https://deno.land/x/jsonfile/mod.ts";

const jsonText:any = await readJson( "input.txt" );

function BrwData( j:any ) : void
{
    if ( Array.isArray(j) )
        for ( let j1 of j )
            BrwData( j1 );
    else if ( typeof(j) === "object" )
    {
        const objKeys = Object.keys( j );
        
        for ( let k of objKeys )
            BrwData( j[k] );
    }
    else if ( typeof(j) === "number" )
        sum += j;
}

var sum:number = 0;

BrwData( jsonText );

console.log( "Sum:", sum );
