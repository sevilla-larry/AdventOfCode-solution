const text = await Deno.readTextFile("input.txt");

var Str1:Array<string> = text.split("\n");
function ChkHex( s:string ) : string
{
    var rV:string = "";

    const i = s.indexOf( hexPrefix );
    const bH1 = ( i >= 0 );

    if ( bH1 )
    {
        const h = "0" + s.substring( i+1, i+4 );
        const hx = Number( h );
        const c = String.fromCharCode( hx );
        const s1 = s.substring( i+4 );
        const bH2 = ( ! ( s.charAt(i+2) === "\\" || s.charAt(i+3) === "\\" ) ) && ! isNaN(hx);

        if ( bH2 )
        {
            if ( i === 0 )
            {
                rV = c + ChkHex( s1 );
            }
            else
            {
                rV = s.substring( 0, i ) + c + ChkHex( s1 );
            }
        }
        else
        {
            rV = s.substring( 0, i ) + ChkHex( s.substring( i+1 ) );
        }
    }
    else
    {
        rV = s;
    }

    return rV;
}

function ChkDQ( s:string ) : string
{
    var rV:string = "";

    const i = s.indexOf( doubleQuote2 );
    const bQ = ( i >= 0 );

    if ( bQ )
    {
        const s1 = s.substring( i+2 );
        
        if ( i === 0 )
        {
            rV = doubleQuote1 + ChkDQ( s1 );
        }
        else
        {
            rV = s.substring( 0, i ) + doubleQuote1 + ChkDQ( s1 );
        }
        
    }
    else
    {
        rV = s;
    }

    return rV;
}

function ChkBS( s:string ) : string
{
    var rV:string = "";

    const i = s.indexOf( backSlash2 );
    const bB = ( i >= 0 );

    if ( bB )
    {
        const s1 = s.substring( i+2 );
        
        if ( i === 0 )
        {
            rV = backSlash1 + ChkBS( s1 );
        }
        else
        {
            rV = s.substring( 0, i ) + backSlash1 + ChkBS( s1 );
        }
        
    }
    else
    {
        rV = s;
    }

    return rV;
}

var Str2:Array<string> = new Array<string>(Str1.length);

var numOfChars1:number = 0;
var numOfChars2:number = 0;

const doubleQuote1 = "\"";
const hexPrefix = "\\x";
const backSlash1 = "\\";
const doubleQuote2 = backSlash1 + doubleQuote1;
const backSlash2 = backSlash1 + backSlash1;

for ( var i = 0; i < Str1.length; i++ )
{
    const s = Str1[i];

    numOfChars1 += s.length;

    var s1:string = s.substring( 1, s.length-1 );
    
    s1 = ChkHex( s1);

    s1 = ChkDQ( s1 );

    s1 = ChkBS( s1 );

    Str2[ i ] = s1;
}

for ( let s of Str2 )
{
    numOfChars2 += s.length;
}

console.log( numOfChars1 - numOfChars2 );
