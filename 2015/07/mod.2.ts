const text = await Deno.readTextFile("input.2.txt");

var instructions:Array<string> = text.split("\n");

function GetValue( e:string )
{
    var rV = undefined;
    var nE = Number( e );

    if ( isNaN( nE ) )
    {
        for ( let m of MappedValues )
        {
            if ( m[0] === e )
            {
                rV = m[1];
                break;
            }
        }
    }
    else
        rV = nE;

    return rV;
}

function PushValue( e:string, pV:any ) : void
{
    var succeed:boolean = false;

    for ( let m of MappedValues )
        if ( m[0] === e )
        {
            if ( m[1] === undefined )
                m[1] = pV;

            succeed = true;
        }

    if ( ! succeed )
        MappedValues.push( [ e, pV ] );
}

function ProcAssign( instruct:Array<string> ) : void
{
    const rV = GetValue( instruct[0] );

    PushValue( instruct[2], rV );
}

function ProcNOT( instruct:Array<string> ) : void
{
    const rV = GetValue( instruct[1] );

    if ( rV === undefined )
        PushValue( instruct[3], rV )
    else
        PushValue( instruct[3], ~ rV )
}

function ProcAND( instruct:Array<string> ) : void
{
    const v1 = GetValue( instruct[0] );
    const v2 = GetValue( instruct[2] );
    var rV = undefined;

    if ( ! ( v1 === undefined || v2 === undefined ) )
        rV = v1 & v2;
    
    PushValue( instruct[4], rV );
}

function ProcOR( instruct:Array<string> ) : void
{
    const v1 = GetValue( instruct[0] );
    const v2 = GetValue( instruct[2] );
    var rV = undefined;

    if ( ! ( v1 === undefined || v2 === undefined ) )
        rV = v1 | v2;

    PushValue( instruct[4], rV );
}

function ProcLSHIFT( instruct:Array<string> ) : void
{
    const v1 = GetValue( instruct[0] );
    const v2 = GetValue( instruct[2] );
    var rV = undefined;

    if ( ! ( v1 === undefined || v2 === undefined ) )
        rV = v1 << v2;

    PushValue( instruct[4], rV );
}

function ProcRSHIFT( instruct:Array<string> ) : void
{
    const v1 = GetValue( instruct[0] );
    const v2 = GetValue( instruct[2] );
    var rV = undefined;

    if ( ! ( v1 === undefined || v2 === undefined ) )
        rV = v1 >> v2;
    
    PushValue( instruct[4], rV );
}

var MappedValues = new Array();
var cont:boolean = true;

while ( cont )
{
    for ( let instruct1 of instructions )
    {
        const instruct2:Array<string> = instruct1.split(" ");

        if ( instruct2.length === 3 )
            ProcAssign( instruct2 );
        else if ( instruct2[0] === "NOT" )
            ProcNOT( instruct2 );
        else if ( instruct2[1] === "AND" )
            ProcAND( instruct2 );
        else if ( instruct2[1] === "OR" )
            ProcOR( instruct2 );
        else if ( instruct2[1] === "LSHIFT" )
            ProcLSHIFT( instruct2 );
        else if ( instruct2[1] === "RSHIFT" )
            ProcRSHIFT( instruct2 );
    }

    
    cont = false;

    for ( let m of MappedValues )
        if ( m[1] === undefined)
        {
            cont = true;
            break;
        }
}

console.log( GetValue( "a") );
