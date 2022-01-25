const text1 = await Deno.readTextFile("input.1.txt");
const text2 = await Deno.readTextFile("input.2.txt");

const Replacements1:Array<string> = text1.split("\n");

function ChkDM( dm:string ) : void
{
    if ( ! (DistinctMolecules.includes(dm) ) )
        DistinctMolecules.push( dm );
}

function MR( r:Array<string> ) : void
{
    const m1:string = text2;
    const e0:string = r[0];
    const e1:string = r[1];
    const el:number = e0.length;

    var m2:string;
    var i:number = m1.indexOf( e0 );

    while ( i >= 0 )
    {
        m2 = m1.substring( 0, i ) + e1 + m1.substring( i+el );

        ChkDM( m2 );

        i = m1.indexOf( e0, i+el )
    }
}

var Replacements2:Array<Array<string>> = new Array( Replacements1.length );
var DistinctMolecules:Array<string> = new Array();

for ( var i = 0; i < Replacements1.length; i++ )
    Replacements2[i] = Replacements1[i].split(" => ");

for ( let r of Replacements2 )
    MR( r )

console.log( DistinctMolecules.length );
