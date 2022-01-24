const text = await Deno.readTextFile("input.txt");

const AuntSues1:Array<string> = text.split("\n");

function ParseAuntSues( auntSue:string ) : void
{
    var rV = new Object;

    const posColon:number = auntSue.indexOf(":")
    const auntSueNum:number = Number ( auntSue.substring( 4, posColon ) ); 
    const auntSueProp1:string = auntSue.substring( posColon+2 );
    const auntSueProp2:Array<string> = auntSueProp1.split(", ")
    const auntSueProp3:Array<any> = new Array( auntSueProp2.length );
    
    for ( var i = 0; i < auntSueProp2.length; i++ )
    {
        auntSueProp3[i] = auntSueProp2[i].split(": ");
        auntSueProp3[i][1] = Number( auntSueProp3[i][1] );
    }

    AuntSues2[ auntSueNum ] = auntSueProp3;
}

/*
    General rule
    Found and right value = 1
    Found and wrong value = -1
    NOT found             = 0
*/
function ChkPropertyE( auntSueProp:Array<any>, propS:string, propN:number ) : number
{
    var rV:number = 0;

    for ( let p of auntSueProp )
    {
        if ( p[0] === propS )
        {
            if ( p[1] === propN )
                rV = 1;
            else
                rV = -1;

            break;
        }
    }

    return rV;
}

/*
    Found and less than value       = 1
    Found and greater than or equal = -1
    NOT found                       = 0
*/
function ChkPropertyL( auntSueProp:Array<any>, propS:string, propN:number ) : number
{
    var rV:number = 0;

    for ( let p of auntSueProp )
    {
        if ( p[0] === propS )
        {
            if ( p[1] < propN )
                rV = 1;
            else
                rV = -1;

            break;
        }
    }

    return rV;
}

/*
    Found and grater than value  = 1
    Found and less than or equal = -1
    NOT found                    = 0
*/
function ChkPropertyG( auntSueProp:Array<any>, propS:string, propN:number ) : number
{
    var rV:number = 0;

    for ( let p of auntSueProp )
    {
        if ( p[0] === propS )
        {
            if ( p[1] > propN )
                rV = 1;
            else
                rV = -1;

            break;
        }
    }

    return rV;
}

var AuntSues2:Array<any> = new Array( AuntSues1.length+1 );

for ( let as of AuntSues1 )
    ParseAuntSues( as )

for ( var i = 1; i <= 500; i++ )
{
    const c0 = ChkPropertyE( AuntSues2[i], "children"   , 3 );
    const c1 = ChkPropertyG( AuntSues2[i], "cats"       , 7 );
    const c2 = ChkPropertyE( AuntSues2[i], "samoyeds"   , 2 );
    const c3 = ChkPropertyL( AuntSues2[i], "pomeranians", 3 );
    const c4 = ChkPropertyE( AuntSues2[i], "akitas"     , 0 );
    const c5 = ChkPropertyE( AuntSues2[i], "vizslas"    , 0 );
    const c6 = ChkPropertyL( AuntSues2[i], "goldfish"   , 5 );
    const c7 = ChkPropertyG( AuntSues2[i], "trees"      , 3 );
    const c8 = ChkPropertyE( AuntSues2[i], "cars"       , 2 );
    const c9 = ChkPropertyE( AuntSues2[i], "perfumes"   , 1 );

    if (
        c0 >= 0 &&
        c1 >= 0 &&
        c2 >= 0 &&
        c3 >= 0 &&
        c4 >= 0 &&
        c5 >= 0 &&
        c6 >= 0 &&
        c7 >= 0 &&
        c8 >= 0 &&
        c9 >= 0
        )
    {
        console.log( i );
    }
}
