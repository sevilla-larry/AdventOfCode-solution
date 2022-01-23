const text = await Deno.readTextFile("input.txt");

var floor:number = 0;

for ( let c of text )
{
    if ( c === "(" ) floor++;
    else if ( c === ")" ) floor--;
}

console.log(floor);
