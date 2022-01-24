const text = await Deno.readTextFile("input.txt");

const Ingredients1:Array<string> = text.split("\n");

function ParseIngredients( ingred1:string )
{
    var rV = new Array();

    const posColon:number = ingred1.indexOf(":")
    const ingred2 = ingred1.substring( 0, posColon );
    const ingredProp1:string = ingred1.substring( posColon+2 );
    const ingredProp2:Array<string> = ingredProp1.split(", ")
    const ingredProp3:Array<Array<any>> = new Array( ingredProp2.length );

    for ( var i = 0; i < ingredProp2.length; i++ )
    {
        ingredProp3[i] = ingredProp2[i].split(" ");
        ingredProp3[i][1] = Number( ingredProp3[i][1] );
    }

    rV[0] = ingred2;
    rV[1] = ingredProp3;

    return rV;
}

/*
    i0 = teaspoons of Sprinkel
    i1 = teaspoons of Butterscotch
    i2 = teaspoons of Chocolate
    i3 = teaspoons of Candy
*/
function GenScore( i0:number, i1:number, i2:number, i3:number ) : number
{
    var tS:number = 0;

    var tC:number = i0*Ingredients2[0][1][0][1] +
                    i1*Ingredients2[1][1][0][1] +
                    i2*Ingredients2[2][1][0][1] +
                    i3*Ingredients2[3][1][0][1];

    var tD:number = i0*Ingredients2[0][1][1][1] +
                    i1*Ingredients2[1][1][1][1] +
                    i2*Ingredients2[2][1][1][1] +
                    i3*Ingredients2[3][1][1][1];

    var tF:number = i0*Ingredients2[0][1][2][1] +
                    i1*Ingredients2[1][1][2][1] +
                    i2*Ingredients2[2][1][2][1] +
                    i3*Ingredients2[3][1][2][1];

    var tT:number = i0*Ingredients2[0][1][3][1] +
                    i1*Ingredients2[1][1][3][1] +
                    i2*Ingredients2[2][1][3][1] +
                    i3*Ingredients2[3][1][3][1];

    var tL:number = i0*Ingredients2[0][1][4][1] +
                    i1*Ingredients2[1][1][4][1] +
                    i2*Ingredients2[2][1][4][1] +
                    i3*Ingredients2[3][1][4][1];

    if ( tC < 0 ) tC = 0;
    if ( tD < 0 ) tD = 0;
    if ( tF < 0 ) tF = 0;
    if ( tT < 0 ) tT = 0;

    tS = tC * tD * tF * tT;

    if ( tL !== 500 )       // filter by 500 calories only
        tS = 0;

    return tS;
}


const maxIngred:number = 100;

var Ingredients2:Array<any> = new Array(Ingredients1.length);

var maxScore:number = 0;
var curScore:number = 0;

for ( var i = 0; i < Ingredients1.length; i++ )
{
    Ingredients2[i] = ParseIngredients( Ingredients1[i] )
}

// Sprinkel LOOP
for ( var i0 = 0; i0 <= maxIngred; i0++ )
{
    //Butterscotch LOOP
    for ( var i1 = 0; i1 <= maxIngred; i1++ )
    {
        //Chocolate LOOP
        for ( var i2 = 0; i2 <= maxIngred; i2++ )
        {
            //Candy LOOP
            for ( var i3 = 0; i3 <= maxIngred; i3++ )
            {
                if ( i0+i1+i2+i3 === maxIngred )
                    curScore = GenScore( i0, i1, i2, i3 );

                if ( curScore > maxScore ) maxScore = curScore;
            }
        }
    }   
}

console.log( maxScore );
