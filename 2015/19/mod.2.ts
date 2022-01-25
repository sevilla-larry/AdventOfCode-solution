const text1 = await Deno.readTextFile("input.1.txt");
const text2 = await Deno.readTextFile("input.2.txt");

const Replacements1:Array<string> = text1.split("\n");

function CountUpperCase( s:string ) : number
{
    var rV:number = 0;

    for ( let c of s )
    {
        if ( "A" <= c && c <= "Z" )
            rV++
    }

    return rV;
}

function RI( r:Array<string> ) : Array<any>
{
    var rV:Array<any> = new Array(3);

    const t:string = r[1];

    rV[0] = CountUpperCase( t );
    rV[1] = r[0];
    rV[2] = t;

    return rV;
}

var Replacements2:Array<Array<string>> = new Array( Replacements1.length );
var Replacements3:Array<Array<any>> = new Array( Replacements1.length );
var DistinctMolecules:Array<string> = new Array();

var maxLevel:number = 0;

var m1:string = text2;
var m2:string;
var curLevel:number = 0;
var counter:number = 0;
var cont:boolean = true;

for ( var i = 0; i < Replacements1.length; i++ )
{
    Replacements2[i] = Replacements1[i].split(" => ");

    Replacements3[i] = RI( Replacements2[i] )
}

//https://www.geeksforgeeks.org/bubble-sort/
for ( var i = 0; i < Replacements3.length-1; i++ )
{
    for ( var j = 0; j < Replacements3.length-i-1; j++ )
    {
        if ( Replacements3[j][0] < Replacements3[j+1][0] )
        {
            //swap
            const tempR:Array<any> = Replacements3[j];
            Replacements3[j] = Replacements3[j+1];
            Replacements3[j+1] = tempR;
        }
    }
}

maxLevel = Replacements3[0][0];

while ( cont )
{
    const mf:string = Replacements3[curLevel][1];
    const mt:string = Replacements3[curLevel][2];

    if ( m1.includes( mt ) )
    {
        const idx:number = m1.indexOf( mt );
        const el:number = mt.length;

        m2 = m1.substring(0,idx) + mf + m1.substring( idx+el );
        curLevel = 0;
        counter++;
        m1 = m2;
    }
    else
    {
        curLevel++;
        if ( curLevel >= Replacements3.length )
            cont = false;
    }
}

console.log( counter );
