const text = await Deno.readTextFile("input.txt");

var children:Array<string> = text.split("\n");

//https://www.codegrepper.com/code-examples/javascript/how+to+check+vowels+in+a+string+in+javascript

function countAtLeast3Vowels( str:string )
{
    const cV:number = (str.match(/[aeiou]/gi) || []).length;
    var rV:boolean = false;
    
    if ( cV >= 3 ) rV = true;
    
    return rV;
}

function containsTwiceInARow( str:string )
{
    var rV:boolean = false;
    var pc = "";

    for ( let c of str )
        if ( pc === c )
        {
            rV = true;
            break;
        }
        else
            pc = c;
        
    return rV;
}

//https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript

var forbidden:Array<string> = [ "ab", "cd", "pq", "xy" ];

function containsForbidden( str:string )
{
    var rV:boolean = false;
    var fLength:number = forbidden.length;

    while( fLength-- )
        if (str.indexOf(forbidden[fLength])!=-1)
        {
            rV = true;
            break;
        }

    return rV;
}

var niceChildren:number = 0;

for ( let child of children )
{
    const cV:boolean = countAtLeast3Vowels( child );
    const tr:boolean = containsTwiceInARow( child );
    const cF:boolean = containsForbidden(   child );

    if ( cV && tr && ! cF ) niceChildren++

}

console.log( niceChildren );
