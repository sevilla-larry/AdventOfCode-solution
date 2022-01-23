const text = await Deno.readTextFile("input.txt");

var houses:Array<Array<number>> = new Array();
var x:number = 0;
var y:number = 0;
var withPresent:number = 1;

houses[x] = new Array();
houses[x][y] = 1;

for ( let c of text )
{
         if ( c === ">" ) x++;
    else if ( c === "<" ) x--;
    else if ( c === "^" ) y++;
    else if ( c === "v" ) y--;

    if ( typeof houses[x] === "undefined" )
        houses[x] = new Array();

    if ( typeof houses[x][y] === "undefined" )
        {
            houses[x][y] = 1;
            withPresent++;
        }
    else
        houses[x][y]++;
}

console.log(withPresent);
