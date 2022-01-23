const text = await Deno.readTextFile("input.txt");

const sides1 = text.split("\n");
var sides2:Array<Array<string>> = new Array(sides1.length);
var sides3:Array<Array<number>> = new Array(sides1.length);
var perm1:Array<Array<number>>  = new Array(sides1.length);
var perm2:Array<number>         = new Array(sides1.length);

var perm:number = 0;

for ( var i = 0; i < sides1.length; i++ )
{
    sides2[i] = sides1[i].split("x");
    sides3[i] = new Array(3);

    for ( var j = 0; j < 3; j++ )
    {
        sides3[i][j] = Number( sides2[i][j] );
    }

    perm1[i] = new Array(4);

    perm1[i][1] = ( sides3[i][0] + sides3[i][1] ) * 2;
    perm1[i][2] = ( sides3[i][0] + sides3[i][2] ) * 2;
    perm1[i][3] = ( sides3[i][1] + sides3[i][2] ) * 2;

         if ( perm1[i][1] <= perm1[i][2] && perm1[i][1] <= perm1[i][3] ) perm1[i][0] = perm1[i][1];
    else if ( perm1[i][2] <= perm1[i][1] && perm1[i][2] <= perm1[i][3] ) perm1[i][0] = perm1[i][2];
    else if ( perm1[i][3] <= perm1[i][1] && perm1[i][3] <= perm1[i][2] ) perm1[i][0] = perm1[i][3];

    perm2[i] = (sides3[i][0] * sides3[i][1] * sides3[i][2]) + perm1[i][0];

    perm += perm2[i];
}

console.log( perm );
