function NumberOfGifts( hn:number ) : number
{
    var rV:number = 0;

    for ( var e = 1; e <= hn; e++ )
        if ( ( hn % e === 0 ) && ( hn / ( e * 50 ) <= 1 ) )
            rV += e;

    return rV * 11;
}

const maxGift:number = 29000000;

var loop:boolean = true;

var houseNum:number = 0;
var gifts:number    = 0;

while ( loop )
{
    houseNum++;

    gifts = NumberOfGifts( houseNum );

    loop = ( gifts < maxGift );
}

console.log( houseNum, gifts );
