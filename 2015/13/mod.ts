const text = await Deno.readTextFile("input.txt");

const SittingArrangement1:Array<string> = text.split("\n");

//https://medium.com/weekly-webtips/step-by-step-guide-to-array-permutation-using-recursion-in-javascript-4e76188b88ff
function permute( nums:Array<any> ) : Array<any>
{
    let result:Array<any> = [];

    if (nums.length === 0) return [];

    if (nums.length === 1) return [ nums ];

    for (let i = 0; i < nums.length; i++)
    {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumsPermuted = permute(remainingNums);

        for (let j = 0; j < remainingNumsPermuted.length; j++)
        {
            const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
            result.push(permutedArray);
        }
    }

    return result;
}

function SA( sa:Array<string> ) : Array<any>
{
    var rV = new Array(3);
    const p:string = sa[10];
    const gl:string = sa[2];
    var m:number = 1;

    rV[0] = sa[0];
    rV[1] = p.substring( 0, p.length-1 );

    if ( gl === "lose" ) m = -1;

    rV[2] = Number( sa[3] ) * m;

    return rV;
}

function PersonAdd( c:string ) : void
{
    const bE = Persons.includes( c );

    if ( ! bE )
        Persons.push( c );
}

function GetHappiness( p0:string, p1:string ) : number
{
    var rV:number = 0;

    for ( var i = 0; i < SittingArrangement3.length; i++ )
    {
        if ( p0 === SittingArrangement3[i][0] &&
             p1 === SittingArrangement3[i][1] )
        {
            rV = SittingArrangement3[i][2];
            break;
        }
    }

    return rV;
}

const SittingArrangement2:Array<Array<string>> = new Array( SittingArrangement1.length );
const SittingArrangement3:Array<Array<any>> = new Array( SittingArrangement1.length );

var SittingArrangement4:Array<string> = new Array();
var Persons:Array<string> = new Array();

var Happiness1:Array<Array<Array<number>>> = new Array( SittingArrangement4.length );
var Happiness2:Array<number> = new Array( SittingArrangement4.length );

var maxHappy:number = 0;

for ( var i = 0; i < SittingArrangement1.length; i++ )
{
    SittingArrangement2[i] = SittingArrangement1[i].split(" ");

    SittingArrangement3[i] = SA( SittingArrangement2[i] )
}


for ( var i = 0; i < SittingArrangement2.length; i++ )
    PersonAdd( SittingArrangement2[i][0] );

// Add this to the 2nd Question
// Persons.push( "yourself" );

SittingArrangement4 = permute( Persons );

for ( var i = 0; i < SittingArrangement4.length; i++ )
{
    const sa = SittingArrangement4[i];
    var lI:number = -1;
    var rI:number = -1;
    var lH:number = 0;
    var rH:number = 0;
    var nH:number = 0;

    Happiness1[i] = new Array();

    for ( var j = 0; j < sa.length; j++ )
    {
        if ( j === 0 )
        {
            lI = sa.length-1;
            rI = 1;
        }
        else if ( j === sa.length-1 )
        {
            lI = sa.length-2;
            rI = 0;
        }
        else
        {
            lI = j-1;
            rI = j+1;
        }

        lH = GetHappiness( sa[j], sa[lI] );
        rH = GetHappiness( sa[j], sa[rI] );
        nH = lH+rH;

        Happiness1[i].push( [ nH, lH, rH ] )
    }
}

for ( var i = 0; i < Happiness1.length; i++ )
{
    const h:Array<Array<number>> = Happiness1[i];
    var th:number = 0;

    for ( var j = 0; j < h.length; j++ )
        th += h[j][0];

    Happiness2[i] = th;
}

for ( let h of Happiness2 )
    if ( h > maxHappy ) maxHappy = h;

console.log( maxHappy );
