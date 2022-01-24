const text = await Deno.readTextFile("input.txt");

const Lights1:Array<string> = text.split("\n");

function AL( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === 0 || c === 0 )
        rV = 0;
    else
        rV = LightsA[r-1][c-1];

    return rV;
}

function AA( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === 0 )
        rV = 0;
    else
        rV = LightsA[r-1][c];

    return rV;
}

function AR( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === 0 || c === maxDim-1 )
        rV = 0;
    else
        rV = LightsA[r-1][c+1];

    return rV;
}

function LL( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( c === 0 )
        rV = 0;
    else
        rV = LightsA[r][c-1];

    return rV;
}

function RR( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( c === maxDim-1 )
        rV = 0;
    else
        rV = LightsA[r][c+1];

    return rV;
}

function BL( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === maxDim-1 || c === 0 )
        rV = 0;
    else
        rV = LightsA[r+1][c-1];

    return rV;
}

function BB( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === maxDim-1 )
        rV = 0;
    else
        rV = LightsA[r+1][c];

    return rV;
}

function BR( r:number, c:number ) : number
{
    var rV:number = -1;

    if ( r === maxDim-1 || c === maxDim-1 )
        rV = 0;
    else
        rV = LightsA[r+1][c+1];

    return rV;
}

function NextStatus( r:number, c:number ) : number
{
    var rV:number = LightsA[r][c];

    const al:number = AL( r, c );
    const aa:number = AA( r, c );
    const ar:number = AR( r, c );
    const ll:number = LL( r, c );
    const rr:number = RR( r, c );
    const bl:number = BL( r, c );
    const bb:number = BB( r, c );
    const br:number = BR( r, c );

    const tl:number = al + aa + ar + ll + rr + bl + bb + br;

    if ( rV === 1)
        if ( tl === 2 || tl === 3 )
            rV = 1;
        else
            rV = 0;
    else
        if ( tl === 3 )
            rV = 1;
        else
            rV = 0;

    return rV;
}

const maxDim:number = 100;
const maxSteps:number = 100;

var Lights2:Array<Array<string>> = new Array( Lights1.length );
var LightsA:Array<Array<number>> = new Array( Lights1.length );
var LightsZ:Array<Array<number>> = new Array( Lights1.length );

var lightsOn:number = 0;

for ( var i = 0; i < Lights1.length; i++ )
{
    Lights2[i] = Lights1[i].split("");
    LightsA[i] = new Array( Lights1.length );
    LightsZ[i] = new Array( Lights1.length );

    for ( var j = 0; j < Lights2[i].length; j++ )
        if ( Lights2[i][j] === "#" )
             LightsA[i][j] = 1;
        else
             LightsA[i][j] = 0;
}

for ( var k = 0; k < maxSteps; k++ )
{
    for ( var i = 0; i < maxDim; i++ )
        for ( var j = 0; j < maxDim; j++ )
            LightsZ[i][j] = NextStatus( i, j );

    // copy back to LightsA
    for ( var i = 0; i < maxDim; i++ )
        for ( var j = 0; j < maxDim; j++ )
            LightsA[i][j] = LightsZ[i][j];
}

for ( var i = 0; i < maxDim; i++ )
    for ( var j = 0; j < maxDim; j++ )
        lightsOn += LightsZ[i][j];

console.log( lightsOn );
