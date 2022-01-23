const text = await Deno.readTextFile("input.txt");

var floor:number = 0;
var position:number = 0;

for ( let c of text )
{
    position++;
    if ( c === "(" ) floor++;
    else if ( c === ")" ) floor--;

    if ( floor === -1 ) break;
}

console.log(position);
