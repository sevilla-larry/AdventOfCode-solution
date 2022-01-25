const iEquip:number     = 0;
const iCost:number      = 1;
const iDamage:number    = 2;
const iArmor:number     = 3;

// Equipment, Cost, Damage, Armor

const Weapons:Array<Array<any>> =
[
    [ "Dagger",       8, 4, 0 ],
    [ "Shortsword",  10, 5, 0 ],
    [ "Warhammer",   25, 6, 0 ],
    [ "Longsword",   40, 7, 0 ],
    [ "Greataxe",    74, 8, 0 ]
];

const Armors:Array<Array<any>> =
[
    [ "Leather",     13, 0, 1 ],
    [ "Chainmail",   31, 0, 2 ],
    [ "Splintmail",  53, 0, 3 ],
    [ "Bandedmail",  75, 0, 4 ],
    [ "Platemail",  102, 0, 5 ]
];

const Rings1:Array<Array<any>> =
[
    [ "Damage+1",    25, 1, 0 ],
    [ "Damage+2",    50, 2, 0 ],
    [ "Damage+3",   100, 3, 0 ],
    [ "Defense+1",   20, 0, 1 ],
    [ "Defense+2",   40, 0, 2 ],
    [ "Defense+3",   80, 0, 3 ]
];

var Equipments1:Array<Array<Array<any>>> = new Array()

// Equipment = Weapons = 1, Armor = 0, Rings = 0
for ( var i = 0; i < Weapons.length; i++ )
    Equipments1.push( [ Weapons[i] ] );

// Equipment = Weapons = 1, Armor = 0, Rings = 1
for ( var i = 0; i < Weapons.length; i++ )
    for ( var k1 = 0; k1 < Rings1.length; k1++ )
        Equipments1.push( [ Weapons[i], Rings1[k1] ] );

// Equipment = Weapons = 1, Armor = 0, Rings = 2
for ( var i = 0; i < Weapons.length; i++ )
    for ( var k1 = 0; k1 < Rings1.length-1; k1++ )
        for ( var k2 = k1+1; k2 < Rings1.length; k2++ )
            Equipments1.push( [ Weapons[i], Rings1[k1], Rings1[k2] ] );

// Equipment = Weapons = 1, Armor = 1, Rings = 0
for ( var i = 0; i < Weapons.length; i++ )
    for ( var j = 0; j < Armors.length; j++ )
        Equipments1.push( [ Weapons[i], Armors[j] ] );

// Equipment = Weapons = 1, Armor = 1, Rings = 1
for ( var i = 0; i < Weapons.length; i++ )
    for ( var j = 0; j < Armors.length; j++ )
        for ( var k1 = 0; k1 < Rings1.length; k1++ )
            Equipments1.push( [ Weapons[i], Armors[j], Rings1[k1] ] );

// Equipment = Weapons = 1, Armor = 1, Rings = 2
for ( var i = 0; i < Weapons.length; i++ )
    for ( var j = 0; j < Armors.length; j++ )
        for ( var k1 = 0; k1 < Rings1.length-1; k1++ )
            for ( var k2 = k1+1; k2 < Rings1.length; k2++ )
                Equipments1.push( [ Weapons[i], Armors[j], Rings1[k1], Rings1[k2] ] );

function SumEquip( e:Array<Array<any>> ) : string
{
    var rV:string = e[0][iEquip];

    for ( var i = 1; i < e.length; i++ )
        rV += "&" + e[i][iEquip];

    return rV;
}

function SumCost( e:Array<Array<any>> ) : number
{
    var rV:number = e[0][iCost];

    for ( var i = 1; i < e.length; i++ )
        rV += e[i][iCost];

    return rV;
}

function SumDamage( e:Array<Array<any>> ) : number
{
    var rV:number = e[0][iDamage];

    for ( var i = 1; i < e.length; i++ )
        rV += e[i][iDamage];

    return rV;
}

function SumArmor( e:Array<Array<any>> ) : number
{
    var rV:number = e[0][iArmor];

    for ( var i = 1; i < e.length; i++ )
        rV += e[i][iArmor];

    return rV;
}

var Equipments2:Array<Array<any>> = new Array( Equipments1.length )
var Game:Array<Array<any>>;

const BossInitPoints:number = 109;
const BossDamage:number     = 8;
const BossArmor:number      = 2;

const PlayerInitPoints:number = 100;

var maxCost:number = 0;
var minCost:number;

for ( var i = 0; i < Equipments1.length; i++ )
{
    Equipments2[i] = new Array();

    Equipments2[i][iEquip ] = SumEquip(  Equipments1[i] );
    Equipments2[i][iCost  ] = SumCost(   Equipments1[i] );
    Equipments2[i][iDamage] = SumDamage( Equipments1[i] );
    Equipments2[i][iArmor ] = SumArmor(  Equipments1[i] );
}

Game = new Array( Equipments2.length );

for ( var i = 0; i < Equipments2.length; i++ )
{
    // New Game with new Equipment
    var bsPoints:number = BossInitPoints;
    var mePoints:number = PlayerInitPoints;

    const meDamage:number = Equipments2[i][iDamage];
    const meArmor:number  = Equipments2[i][iArmor];

    var loop:boolean = true;
    var turn:boolean = true;  // T=player/me, F=Boss/enemy

    var damageIncur:number = 0;  // possible Damage

    while ( loop )
    {
        if ( turn )     // my turn
        {
            damageIncur = meDamage - BossArmor;

            if ( damageIncur <= 0 )
                 damageIncur = 1;

            bsPoints -= damageIncur;
        }
        else            // boss turn
        {
            damageIncur = BossDamage - meArmor;
            if ( damageIncur <= 0 )
                 damageIncur = 1;
                
            mePoints -= damageIncur;
        }

        turn = ! turn;      // toggle turns
        loop = ! ( bsPoints <= 0 || mePoints <= 0 );
        // exit if either losses
    }

    Game[i] = [ bsPoints <= 0, Equipments2[i][iCost]  ];
}

for ( var i = 0; i < Equipments2.length; i++ )
    if ( Equipments2[i][iCost] > maxCost)
        maxCost = Equipments2[i][iCost];

minCost = maxCost;

for ( var i = 0; i < Game.length; i++ )
    if ( Game[i][0] )
        if ( Game[i][iCost] < minCost )
            minCost = Game[i][iCost];

console.log( minCost );
