const text = await Deno.readTextFile("input.txt");

var children:Array<string> = text.split("\n");
 
function splitBy2s( str:string )
{
    var rV:Array<string> = new Array();

    for ( var i = 0; i < str.length-1; i++ )
        rV.push( str.substring(i,i+2) );

    return rV;
}

function appearsTwiceButDontOverlap( str:Array<string> )
{
    var rV:boolean = false;

    for ( var i = 0; i < str.length-1; i++ )
        for ( var j = i+1; j < str.length; j++ )
            if (
                    str[i] === str[j] &&
                    j !== i+1
                ) 
                {
                    rV = true;
                    if ( j === str.length ) break;
                }

    return rV;
}

function repeatWith1LetterBetween( str:string )
{
    var rV:boolean = false;

    for ( var i = 0; i < str.length-2; i++ )
        if ( str[i] === str[i+2] )
        {
            rV = true;
            break;
        }   

    return rV;
}

var niceChildren:number = 0;

for ( let child of children )
{
    const c1:Array<string> = splitBy2s( child );
    const b2:boolean = appearsTwiceButDontOverlap( c1 );
    const rp:boolean = repeatWith1LetterBetween( child );

    if ( b2 && rp ) niceChildren++;
}

console.log( niceChildren );
