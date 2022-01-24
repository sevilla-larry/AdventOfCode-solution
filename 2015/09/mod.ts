const text = await Deno.readTextFile("input.txt");

const Distances:Array<string> = text.split("\n");

function CityAdd( c:string ) : void
{
    const bE = Cities.includes( c );

    if ( ! bE )
        Cities.push( c );
}

//https://medium.com/weekly-webtips/step-by-step-guide-to-array-permutation-using-recursion-in-javascript-4e76188b88ff
function permute( nums:Array<any> ) : Array<any>
{
    var result:Array<any> = new Array();

    if ( nums.length === 0 ) return new Array();

    if ( nums.length === 1 ) return [ nums ];

    for ( var i = 0; i < nums.length; i++ )
    {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumsPermuted = permute(remainingNums);

        for ( var j = 0; j < remainingNumsPermuted.length; j++ )
        {
            const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
            result.push(permutedArray);
        }
    }

    return result;
}

function CompRouteDist( i:number, r:Array<string> ) : void
{
    for ( var j = 0; j < r.length - 1; j++)
    {
        const d:number = GetDist( r[j], r[j+1] )

        RouteDistances[i].push( d );
    }
}

function GetDist( c1:string, c2:string ) : number
{
    var rV:number = 0;

    for ( var k = 0; k < CityDistances1.length; k++ )
    {
             if ( CityDistances1[k][0] === c1 && 
                  CityDistances1[k][2] === c2 )
        {
            rV = Number( CityDistances1[k][4] );
            break;
        }
        else if ( CityDistances1[k][0] === c2 && 
                  CityDistances1[k][2] === c1 )
        {
            rV = Number( CityDistances1[k][4] );
            break;
        }
    }

    return rV;

}

function CompTotalDist( r:Array<number> ) : number
{
    var rT:number = 0;

    for ( var k = 0; k < r.length; k++ )
        rT += r[k];

    return rT;
}

var CityDistances1:Array<Array<string>> = new Array( Distances.length)
var Cities:Array<string> = new Array();

var Routes:Array<Array<string>> = new Array()

var RouteDistances:Array<Array<number>> = new Array( Routes.length );
var TotalDistances:Array<number> = new Array( Routes.length );

var minDist:number;
var maxDist:number;

for ( var i = 0; i < Distances.length; i++ )
    CityDistances1[i] = Distances[i].split(" ");

for ( var i = 0; i < CityDistances1.length; i++ )
{
    CityAdd( CityDistances1[i][0] );
    CityAdd( CityDistances1[i][2] );
}

Routes = permute( Cities );

for ( var i = 0; i < Routes.length; i++)
{
    RouteDistances[ i ] = new Array;

    CompRouteDist( i, Routes[i] );
    TotalDistances[i] = CompTotalDist( RouteDistances[i] );
}

minDist = TotalDistances[0];
maxDist = TotalDistances[0];

for ( var i = 1; i < TotalDistances.length; i++)
{
    if ( minDist > TotalDistances[i] )
         minDist = TotalDistances[i];

    if ( maxDist < TotalDistances[i] )
         maxDist = TotalDistances[i];
}

console.log( "Mininum Distance", minDist);
console.log( "Maxinum Distance", maxDist);
