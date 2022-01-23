const text = await Deno.readTextFile("input.txt");

var houses = new Array();

var xS:number = 0;
var xR:number = 0;
var yS:number = 0;
var yR:number = 0;
var tk:boolean = true; // token true = Santa, token false = Robot
var withPresent:number = 1;

houses[0] = [];
houses[0][0] = 1;

for ( let c of text )
{
    if ( tk )
    {
             if ( c === ">" ) xS++;
        else if ( c === "<" ) xS--;
        else if ( c === "^" ) yS++;
        else if ( c === "v" ) yS--;

        if ( typeof houses[xS] === "undefined" )
            houses[xS] = [];

        if ( typeof houses[xS][yS] === "undefined" )
            {
                houses[xS][yS] = 1;
                withPresent++;
            }
        else
            houses[xS][yS]++;

        tk = false;
    }
    else
    {
             if ( c === ">" ) xR++;
        else if ( c === "<" ) xR--;
        else if ( c === "^" ) yR++;
        else if ( c === "v" ) yR--;

        if ( typeof houses[xR] === "undefined" )
            houses[xR] = [];

        if ( typeof houses[xR][yR] === "undefined" )
            {
                houses[xR][yR] = 1;
                withPresent++;
            }
        else
            houses[xR][yR]++;

        tk = true;
   }

}

console.log(withPresent);
