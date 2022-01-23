const text = await Deno.readTextFile("input.txt");

var Str1:Array<string> = text.split("\n");
function ChkBS( s:string ) : string
{
    var rV:string = "";

    const i = s.indexOf( backSlash1 );
    const bB = ( i >= 0 );

    if ( bB )
    {
        const s1 = s.substring( i+1 );
        
        if ( i === 0 )
            rV = backSlash2 + ChkBS( s1 );
        else
            rV = s.substring( 0, i ) + backSlash2 + ChkBS( s1 );
    }
    else
        rV = s;

    return rV;
}

function ChkDQ( s:string ) : string
{
    var rV:string = "";

    const i = s.indexOf( doubleQuote1 );
    const bQ = ( i >= 0 );

    if ( bQ )
    {
        const s1 = s.substring( i+1 );
        
        if ( i === 0 )
            rV = doubleQuote2 + ChkDQ( s1 );
        else
            rV = s.substring( 0, i ) + doubleQuote2 + ChkDQ( s1 );
    }
    else
        rV = s;

    return rV;
}

function AddQuotes( s:string ) : string
{
    const rV:string = doubleQuote1 + s + doubleQuote1;

    return rV;
}

var Str2:Array<string> = new Array<string>(Str1.length);

var numOfChars1:number = 0;
var numOfChars2:number = 0;

const doubleQuote1 = "\"";
const backSlash1 = "\\";
const doubleQuote2 = backSlash1 + doubleQuote1;
const backSlash2 = backSlash1 + backSlash1;

for ( var i = 0; i < Str1.length; i++ )
{
    const s = Str1[i];

    numOfChars1 += s.length;

    var s1:string = s;
    
    s1 = ChkBS( s1 );

    s1 = ChkDQ( s1 );

    s1 = AddQuotes( s1 );

    Str2[ i ] = s1;
}

for ( let s of Str2 )
{
    numOfChars2 += s.length;
}

console.log( numOfChars2 -  numOfChars1 );
