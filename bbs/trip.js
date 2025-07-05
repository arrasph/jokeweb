function getCode(original) {
  let codepoints = "";
  for (const char of original) {
    codepoints += char.codePointAt(0);
  }
  
  let sum=0
  for(const num of codepoints){
    sum+=Number(num);
  }
  const onlynum=codepoints+sum;
  const hexa=Number(onlynum).toString(16)
  const algo=sum+onlynum+hexa+codepoints
  const trip=parseInt(algo,16).toString(36).slice(-10)
  return trip
}

function reverse(trip){
  const revA=parseInt(trip,36).toString(16)
  return revA
}