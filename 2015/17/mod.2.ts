const text = await Deno.readTextFile("input.txt");

const Containers1:Array<string> = text.split("\n");

//https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
function dec2bin(dec:number) : string
{
    return (dec >>> 0).toString(2);
}

function CountOnes( c:string ) : number
{
    var rV:number = 0;

    for ( var i = 0; i < c.length; i++)
        if ( c.at(i) === "1" )
            rV++

    return rV;
}

const exactVol:number = 150; // liters

var Containers2:Array<number> = new Array( Containers1.length )
var Combinations:Array<Array<any>> = new Array;

var maxCombination:number = 2 ** Containers2.length;
var numOfMinCombinations:number = 0;
var minCont:number = Containers2.length;

for ( var i = 0; i < Containers1.length; i++ )
    Containers2[i] = Number( Containers1[i] );

for ( var i = 0; i < maxCombination; i++)
{
    // Combination is binary string
    var combination:string = dec2bin(i).padStart(20,"0");
    var totalLiters:number = 0;

    for ( var j = 0; j < combination.length; j++)
    {
        const binVal:number = Number( combination.charAt(j) );
        const liters:number = binVal * Containers2[j];

        totalLiters += liters;
    }

    if ( totalLiters === exactVol )
        {        
            const numOfOnes = CountOnes( combination )
            Combinations.push( [ combination, numOfOnes ] );
        }
}

for ( let c of Combinations )
    if ( c[1] < minCont ) minCont = c[1];

for ( let c of Combinations )
    if ( c[1] === minCont ) numOfMinCombinations++;

console.log( numOfMinCombinations )
