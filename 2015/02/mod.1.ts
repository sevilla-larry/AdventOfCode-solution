const text = await Deno.readTextFile("input.txt");

const sides1 = text.split("\n");
var sides2:Array<Array<string>> = new Array(sides1.length);
var sides3:Array<Array<number>> = new Array(sides1.length);
var area1:Array<Array<number>>  = new Array(sides1.length);
var area2:Array<number>         = new Array(sides1.length);
var area:number = 0;

for ( var i = 0; i < sides1.length; i++ )
{
    sides2[i] = sides1[i].split("x");
    sides3[i] = new Array(3);

    for ( var j = 0; j < 3; j++ )
    {
        sides3[i][j] = Number( sides2[i][j] );
    }

    area1[i] = new Array(4);

    area1[i][1] = sides3[i][0] * sides3[i][1];
    area1[i][2] = sides3[i][0] * sides3[i][2];
    area1[i][3] = sides3[i][1] * sides3[i][2];

         if ( area1[i][1] <= area1[i][2] && area1[i][1] <= area1[i][3] ) area1[i][0] = area1[i][1];
    else if ( area1[i][2] <= area1[i][1] && area1[i][2] <= area1[i][3] ) area1[i][0] = area1[i][2];
    else if ( area1[i][3] <= area1[i][1] && area1[i][3] <= area1[i][2] ) area1[i][0] = area1[i][3];

    area2[i] = 
        area1[i][1] * 2 +
        area1[i][2] * 2 +
        area1[i][3] * 2 +
        area1[i][0];

    area += area2[i];
}

console.log( area );
