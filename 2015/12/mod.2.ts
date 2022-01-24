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

        if ( NotContainRed( j ) )
            for ( let k of objKeys )
                BrwData( j[k] );
    }
    else if ( typeof(j) === "number" )
        sum += j;
}

function NotContainRed( obj:any ) : boolean
{
    var rV:boolean = true;
    const objKeys = Object.keys( obj );

    for ( let k of objKeys )
    {
        const objVal = obj[k];

        if ( typeof(objVal) === "string"  && objVal === "red" )
        {
            rV = false;
            break;
        }
    }

    return rV;
}

var sum:number = 0;

BrwData( jsonText );

console.log( "Sum:", sum );
