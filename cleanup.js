const fs = require('fs');
let content = fs.readFileSync('c:/Users/sahil/dev-tools/index.html', 'utf8');

// Remove everything between the /* ══ STATE ══ */ comment marker that now got contaminated with old data
// We want to remove lines starting after domains]; until the real /* ══ STATE ══ */ block
// Strategy: find the first "/* ══ STATE ══ */" which now has junk after it, and remove until the second one

const stateMarker = '        /* \u2550\u2550 STATE \u2550\u2550 */';
const firstIdx = content.indexOf(stateMarker);
const secondIdx = content.indexOf(stateMarker, firstIdx + 1);

if (firstIdx !== -1 && secondIdx !== -1) {
    content = content.substring(0, firstIdx) + content.substring(secondIdx);
    fs.writeFileSync('c:/Users/sahil/dev-tools/index.html', content, 'utf8');
    console.log('Cleaned up! Removed dead code block between STATE markers.');
    console.log('First marker at char:', firstIdx);
    console.log('Second marker at char:', secondIdx);
} else {
    console.log('firstIdx:', firstIdx, 'secondIdx:', secondIdx);
    console.log('Pattern not found, no changes made.');
}
