'use strict';

// Tamil -> Latin transliteration aimed at readable usernames, not at ISO 15919.
// Tamil script does not mark voicing: க is [k] initially but [g] after a vowel
// or a nasal, so கருங்குயில் is "karunguyil" and not "karunkkuyil". The rules
// below reproduce that positional voicing.

var PULLI = '்';

var INDEP = {
  'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo',
  'எ': 'e', 'ஏ': 'e', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'o', 'ஔ': 'au'
};

var SIGN = {
  'ா': 'aa', 'ி': 'i', 'ீ': 'ee', 'ு': 'u', 'ூ': 'oo',
  'ெ': 'e', 'ே': 'e', 'ை': 'ai', 'ொ': 'o', 'ோ': 'o',
  'ௌ': 'au'
};

var CONS = {
  'க': 'k', 'ங': 'ng', 'ச': 's', 'ஞ': 'nj', 'ட': 't', 'ண': 'n',
  'த': 'th', 'ந': 'n', 'ப': 'p', 'ம': 'm', 'ய': 'y', 'ர': 'r',
  'ல': 'l', 'வ': 'v', 'ழ': 'zh', 'ள': 'l', 'ற': 'r', 'ன': 'n',
  'ஜ': 'j', 'ஷ': 'sh', 'ஸ': 's', 'ஹ': 'h'
};

// Intervocalic / post-nasal realisation of the stops.
var VOICED = { 'க': 'g', 'ச': 's', 'ட': 'd', 'த': 'dh', 'ப': 'b' };

var NASALS = { 'ங': 1, 'ஞ': 1, 'ண': 1, 'ந': 1, 'ம': 1, 'ன': 1 };

// Nasal + stop clusters are written as a single voiced cluster.
var NASAL_CLUSTER = {
  'ங|க': 'ng', 'ஞ|ச': 'nj', 'ந|த': 'nth', 'ண|ட': 'nd',
  'ம|ப': 'mb', 'ன|ற': 'ndr'
};

// Geminates stay voiceless; a few are simplified for legibility.
var GEMINATE = {
  'க': 'kk', 'ச': 'ch', 'ட': 'tt', 'த': 'th', 'ப': 'pp', 'ற': 'tr',
  'ல': 'll', 'ள': 'll', 'ண': 'nn', 'ன': 'nn', 'ம': 'mm', 'ய': 'yy',
  'ர': 'rr', 'வ': 'vv', 'ங': 'ng', 'ஞ': 'nj', 'ந': 'nn', 'ழ': 'zh'
};

function tokenize(word) {
  var units = [];
  for (var i = 0; i < word.length; i++) {
    var ch = word.charAt(i);
    if (INDEP[ch] !== undefined) {
      units.push({ vowel: INDEP[ch] });
    } else if (CONS[ch] !== undefined) {
      var next = word.charAt(i + 1);
      if (next === PULLI) {
        units.push({ cons: ch, dead: true });
        i++;
      } else if (SIGN[next] !== undefined) {
        units.push({ cons: ch, vowel: SIGN[next] });
        i++;
      } else {
        units.push({ cons: ch, vowel: 'a' });
      }
    }
  }
  return units;
}

function romanize(word) {
  var units = tokenize(word);
  var out = '';
  var i = 0;

  while (i < units.length) {
    var u = units[i];

    if (u.cons === undefined) {
      out += u.vowel;
      i++;
      continue;
    }

    if (u.dead) {
      var next = units[i + 1];

      if (next && next.cons) {
        var cluster = NASAL_CLUSTER[u.cons + '|' + next.cons];
        if (cluster) {
          out += cluster + (next.vowel === undefined ? '' : next.vowel);
          i += 2;
          continue;
        }
        if (u.cons === next.cons) {
          var base = CONS[u.cons];
          var doubled = GEMINATE[u.cons] || (base.length === 1 ? base + base : base);
          out += doubled + (next.vowel === undefined ? '' : next.vowel);
          i += 2;
          continue;
        }
      }

      // Word-final or heterorganic dead consonant.
      out += CONS[u.cons];
      i++;
      continue;
    }

    // Live consonant. Voice a stop when it follows a vowel or a nasal.
    var prev = units[i - 1];
    var afterVowel = prev && prev.vowel !== undefined;
    var afterNasal = prev && prev.dead && NASALS[prev.cons];
    out += (VOICED[u.cons] && (afterVowel || afterNasal))
      ? VOICED[u.cons]
      : CONS[u.cons];
    out += u.vowel;
    i++;
  }

  return out;
}

module.exports = romanize;
