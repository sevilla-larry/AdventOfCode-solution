const text = await Deno.readTextFile("input.txt");

var instructions:Array<string> = text.split("\n");

function Coor( coor:string ) : Array<number>
{
    const coorS:Array<string> = coor.split(",");
    const rV:Array<number> = [ Number(coorS[0]), Number(coorS[1])];

    return rV;
}

function turnProc1( instructTurn:Array<string> ) : void
{
    if ( instructTurn[1] === "on" )
        turnOnProc( instructTurn );
    else if ( instructTurn[1] === "off" )
        turnOffProc( instructTurn );
}

function turnOnProc( instructTurn:Array<string> ) : void
{
    const fC = Coor( instructTurn[2] );
    const tC = Coor( instructTurn[4] );

    turnProc2( fC, tC, true );
}

function turnOffProc( instructTurn:Array<string> ) : void
{
    const fC = Coor( instructTurn[2] );
    const tC = Coor( instructTurn[4] );

    turnProc2( fC, tC, false );
}

function toggleProc( instructTurn:Array<string> ) : void
{
    const fC = Coor( instructTurn[1] );
    const tC = Coor( instructTurn[3] );

    turnProc3( fC, tC );
}

function turnProc2( fC:Array<number>, tC:Array<number>, bL:boolean ) : void
{
    for ( var i = fC[0]; i <= tC[0]; i++ )
        for ( var j = fC[1]; j <= tC[1]; j++ )
            lights[i][j] = bL;
}

function turnProc3( fC:Array<number>, tC:Array<number> ) : void
{
    for ( var i = fC[0]; i <= tC[0]; i++ )
        for ( var j = fC[1]; j <= tC[1]; j++ )
            lights[i][j] = ! lights[i][j];
}

var lights:Array<Array<boolean>> = new Array(1000);

// Initialization to OFF
for ( var i = 0; i < lights.length; i++ )
{
    lights[i] = new Array(1000);
    for ( var j = 0; j < lights[i].length; j++ )
        lights[i][j] = false;
}

for ( let instruct1 of instructions )
{
    const instruct2:Array<string> = instruct1.split(" ");

    if ( instruct2[0] === "turn" )
        turnProc1( instruct2 );
    else if ( instruct2[0] === "toggle" )
        toggleProc( instruct2 );
}

var lighted:number = 0;

for ( let lo of lights)
    for ( let li of lo )
        if (li) lighted++;

console.log( lighted );
