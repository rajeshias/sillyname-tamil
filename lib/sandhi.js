'use strict';

// Tamil compound joining (புணர்ச்சி).
//
// Join behaviour is stored per-word in the data files rather than derived from
// spelling, because Tamil sandhi is lexical, not mechanical. Two examples of
// why derivation fails: ஜொலிக்கும் ends in ம் but is a relative participle, so
// stripping ம் yields the nonsense ஜொலிக்கு; and பொன் + சிலை is பொற்சிலை, not
// பொன்சிலை. The classes below are assigned by hand in data/adjectives.js.

var PULLI = '்';

// Hard consonants (வல்லினம்) that trigger a junction change.
var HARD = { 'க': 1, 'ச': 1, 'த': 1, 'ப': 1 };

// Homorganic nasal for each hard consonant (மெல்லினம்).
var NASAL = { 'க': 'ங', 'ச': 'ஞ', 'த': 'ந', 'ப': 'ம' };

// Independent vowel -> dependent sign. Empty string for அ (inherent).
var VOWEL_SIGN = {
  'அ': '',        // அ
  'ஆ': 'ா',  // ஆ
  'இ': 'ி',  // இ
  'ஈ': 'ீ',  // ஈ
  'உ': 'ு',  // உ
  'ஊ': 'ூ',  // ஊ
  'எ': 'ெ',  // எ
  'ஏ': 'ே',  // ஏ
  'ஐ': 'ை',  // ஐ
  'ஒ': 'ொ',  // ஒ
  'ஓ': 'ோ',  // ஓ
  'ஔ': 'ௌ'   // ஔ
};

// Stems ending in these signs take a ய் glide; everything else takes வ்.
var FRONT_SIGN = { 'ி': 1, 'ீ': 1, 'ெ': 1, 'ே': 1, 'ை': 1 };

function endsWithDeadConsonant(stem) {
  return stem.charAt(stem.length - 1) === PULLI;
}

// உடம்படுமெய் — a vowel-initial second word needs a bridging consonant.
//
// ண் and ன் double across the seam (பொன் + ஆடை -> பொன்னாடை). Other dead
// consonants simply carry the vowel (மஞ்சள் + ஆமை -> மஞ்சளாமை).
var GEMINATES_BEFORE_VOWEL = { 'ண': 1, 'ன': 1 };

function joinBeforeVowel(stem, noun) {
  var sign = VOWEL_SIGN[noun.charAt(0)];
  var rest = noun.slice(1);

  if (endsWithDeadConsonant(stem)) {
    var finalConsonant = stem.charAt(stem.length - 2);
    if (GEMINATES_BEFORE_VOWEL[finalConsonant]) {
      return stem + finalConsonant + sign + rest;
    }
    return stem.slice(0, -1) + sign + rest;
  }

  // கரு + எலி -> கருவெலி ; பச்சை + எலி -> பச்சையெலி
  var tail = stem.charAt(stem.length - 1);
  var glide = FRONT_SIGN[tail] ? 'ய' : 'வ';
  return stem + glide + sign + rest;
}

/**
 * Join an attributive stem to a noun.
 *
 * @param {string} stem  attributive form of the modifier (e.g. கரு, நீல, பொன்)
 * @param {string} cls   'nasal' | 'double' | 'ran' | 'plain'
 * @param {string} noun
 * @returns {string}
 */
function join(stem, cls, noun) {
  // Relative participles stay separate words: பறக்கும் பூனை.
  if (cls === 'phrase') {
    return stem + ' ' + noun;
  }

  var head = noun.charAt(0);

  if (VOWEL_SIGN[head] !== undefined) {
    return joinBeforeVowel(stem, noun);
  }

  // Soft initial consonant: nothing happens at the seam.
  if (!HARD[head]) {
    return stem + noun;
  }

  if (cls === 'nasal') {
    // கரு + குயில் -> கருங்குயில்
    return stem + NASAL[head] + PULLI + noun;
  }

  if (cls === 'double') {
    // நீல + தாமரை -> நீலத்தாமரை
    return stem + head + PULLI + noun;
  }

  if (cls === 'ran') {
    // ன்-final stems: பொன் + கிளி -> பொற்கிளி, பொன் + தாமரை -> பொற்றாமரை
    var base = stem.slice(0, -2);
    if (head === 'த') {
      return base + 'ற' + PULLI + 'ற' + noun.slice(1);
    }
    return base + 'ற' + PULLI + noun;
  }

  return stem + noun;
}

module.exports = join;
module.exports.PULLI = PULLI;
module.exports.VOWEL_SIGN = VOWEL_SIGN;
