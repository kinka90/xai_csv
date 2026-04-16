function applyPattern(input){
  const pattern = findClosestPattern(input);

  if(!pattern) return input;

  const inputWords = input.split(' ');
  const patternWords = pattern.ind.split(' ');

  let result = [];

  patternWords.forEach((pw, i) => {

    // 🔥 ambil kata dari posisi sama jika ada
    if(inputWords[i]){
      result.push(inputWords[i]);
    } else {
      // 🔥 fallback: cari kata mirip
      const found = inputWords.find(w => w.startsWith(pw.substring(0,3)));
      result.push(found || pw);
    }

  });

  return result.join(' ');
}