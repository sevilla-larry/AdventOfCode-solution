const text = await Deno.readTextFile("input.txt");

const ReindeerInfo1:Array<string> = text.split("\n");

function RI( ri:Array<string> ) : Array<any>
{
    var rV:Array<any> = new Array(14);

    rV[0] = ri[0];              // reindeer Name
    rV[1] = Number( ri[ 3] );   // flying speed in km/s
    rV[2] = Number( ri[ 6] );   // flying duration per lap
    rV[3] = Number( ri[13] );   // resting duration per lap

    rV[4] = rV[2] + rV[3];      // # secs per lap
    rV[5] = Math.floor( totalDuration  / rV[4] ); // number of laps
    rV[6] = ( totalDuration % rV[4] ); // Remainder
    rV[7] = rV[4] * rV[5] + rV[6]; // checking 1

    if ( rV[2] > rV[6] )
        rV[8] = rV[6];          // additional to flying
    else
        rV[8] = rV[2];

    rV[9] = rV[6] - rV[8];      // additional to resting

    rV[10] = rV[2] * rV[5] + rV[8]; // flying in seconds
    rV[11] = rV[3] * rV[5] + rV[9]; // resting in seconds

    rV[12] = rV[10] + rV[11]; // checking 2
    
    rV[13] = rV[10] * rV[1]; // km flying

    return rV;
}

const totalDuration:number = 2503; 

const ReindeerInfo2:Array<Array<string>> = new Array( ReindeerInfo1.length );
const ReindeerInfo3:Array<Array<any>> = new Array( ReindeerInfo1.length );

var maxDist:number = 0;

for ( var i = 0; i < ReindeerInfo1.length; i++ )
{
    ReindeerInfo2[i] = ReindeerInfo1[i].split(" ");

    ReindeerInfo3[i] = RI( ReindeerInfo2[i] );
}

for ( let r of ReindeerInfo3 )
    if ( r[13] > maxDist ) maxDist = r[13];

console.log( maxDist )
