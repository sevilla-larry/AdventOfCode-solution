function NextPW( s:Array<string> ) : void
{
    for ( var i = s.length-1; i >= 0; i-- )
    {
        const c = s[i];
        if ( c === "z" )
            s[i] = "a";
        else
        {
            s[i] = String.fromCharCode( s[i].charCodeAt(0) + 1 );
            break;
        }
    }

}

function ChkInc3( s:Array<string> ) : boolean
{
    var rV:boolean = false;

    for ( var i = 0; i < pwa.length-2; i++ )
    {
        const a1:number = s[i  ].charCodeAt(0);
        const a2:number = s[i+1].charCodeAt(0);
        const a3:number = s[i+2].charCodeAt(0);

        if ( a1+1 === a2 && a2+1 === a3 )
            {
                rV = true;
                break;
            }
    }

    return rV;
}

function ChkNoForbid( s:Array<string> ) : boolean
{
    const forbid:string = "iol";
    var rV:boolean = true;  // no forbidden

    for ( var i = 0; i < pwa.length; i++ )
    {
        const c:string = s[i];

        if ( forbid.includes( c ) )
        {
            rV = false;
            break;
        }
    }

    return rV;
}

function ChkNoOverLappedPairs( s:Array<string> ) : boolean
{
    var rV:boolean = false;

    const p1:number = ChkPair( 0, s ); //modifies index

    if ( p1 >= 0 )
        if ( p1 < s.length-3 )
        {
            const p2:number = ChkPair( p1+2, s );

            if ( p2 >= 0)
                rV = true;
        }

    return rV;
}

function ChkPair( startIndex:number, s:Array<string> ) : number
{
    var rV:number = -1;

    for ( var i = startIndex; i < s.length-1; i++ )
        if ( s[i] === s[i+1] )
        {
            rV = i;
            break;
        }

    return rV;
}


var pwa:Array<string> = "cqjxjnds".split("");    // 1st Question
//var pwa:Array<string> = "cqjxxyzz".split("");    // 2nd Question

var pw:string = "";
var loop:boolean = true;

while ( loop )
{
    var b1:boolean = false;
    var b2:boolean = false;
    var b3:boolean = false;

    NextPW( pwa );

    b1 = ChkInc3( pwa );
    if ( b1 )
        b2 = ChkNoForbid( pwa );
    if ( b2 )
        b3 = ChkNoOverLappedPairs( pwa );

    loop = ( ! ( b1 && b2 && b3 ) ) ;
}

for ( let c of pwa )
    pw += c;

console.log( pw );
