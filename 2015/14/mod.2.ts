const text = await Deno.readTextFile("input.txt");

const ReindeerInfo1:Array<string> = text.split("\n");

function RI( ri:Array<string> ) : Array<any>
{
    var rV:Array<any> = new Array(4);

    rV[0] = ri[0];              // reindeer Name
    rV[1] = Number( ri[ 3] );   // flying speed in km/s
    rV[2] = Number( ri[ 6] );   // flying duration per lap
    rV[3] = Number( ri[13] );   // resting duration per lap

    return rV;
}


const totalDuration:number = 2503; 

const ReindeerInfo2:Array<Array<string>> = new Array( ReindeerInfo1.length );
const ReindeerInfo3:Array<Array<any>> = new Array( ReindeerInfo1.length );

var ReindeerData:Array<Array<any>> = new Array( ReindeerInfo3.length )

var maxPoints:number = 0;

for ( var i = 0; i < ReindeerInfo1.length; i++ )
{
    ReindeerInfo2[i] = ReindeerInfo1[i].split(" ");

    ReindeerInfo3[i] = RI( ReindeerInfo2[i] );
}

for ( var i = 0; i < ReindeerData.length; i++ )
{
    ReindeerData[i] = new Array(8)

    ReindeerData[i][0] = ReindeerInfo3[i][0];   // reindeer name
    ReindeerData[i][1] = ReindeerInfo3[i][1];   // flying speed
    ReindeerData[i][2] = ReindeerInfo3[i][2];   // flying duration
    ReindeerData[i][3] = ReindeerInfo3[i][3];   // resting duration

    ReindeerData[i][4] = false;                 // flying?
    ReindeerData[i][5] = 0;                     // total flying distance
    ReindeerData[i][6] = 0;                     // remaining flying or resting
    ReindeerData[i][7] = 0;                     // total points 
}

for ( var t = 0; t < totalDuration; t++ )
{
    var maxDist:number = 0;

    for ( let r of ReindeerData )
    {
        if ( r[6] <= 0 )                        // remaining flying or resting
        {
            r[4] = ! r[4];                      // toggle flying & resting

            if ( r[4] )
                 r[6] = r[2];                   // reset remaining flying
            else
                 r[6] = r[3];                   // reset remaining resting
        }

        if ( r[4] )                             // flying
        {
             r[5] += r[1];                      // add distance
        }

        r[6]--;                                 // decrement remaining seconds

        if ( r[5] > maxDist ) maxDist = r[5];

    }

    for ( let r of ReindeerData )
        if ( r[5] === maxDist )                 // Add points to leading reindeer
             r[7]++;

}

for ( let r of ReindeerData )
    if ( r[7] > maxPoints ) maxPoints = r[7]; 


console.log( maxPoints );
