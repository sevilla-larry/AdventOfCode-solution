//https://stackoverflow.com/questions/31222938/look-and-say-sequence-in-javascript
function lookAndSay(seq:any)
{
    var prev = seq[0];
    var freq = 0;
    var output = [];
    seq.forEach
    (
        function(s:any)
        {
            if (s==prev)
                freq++;
            else
            {
                output.push(freq);
                output.push(prev);
                prev = s;
                freq = 1;
            }
        }
    );
    output.push(freq);
    output.push(prev);

    return output;
}

var seq = [ 1,1,1,3,2,2,2,1,1,3 ]

const max:number = 40;      // 1st Question
//const max:number = 50;      // 2nd Question

for ( var n = 0; n < max; n++ )
    seq = lookAndSay(seq);

var s:string = "";

for ( let n of seq )
    s += n.toString();

console.log( s.length );
