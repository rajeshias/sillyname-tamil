'use strict';

// Browser entry for the demo page. Wraps the real library so the page can
// annotate the seam instead of only showing the finished name.

var generateName = require('../index.js');
var join = require('../lib/sandhi');
var romanize = require('../lib/romanize');
var adjectives = require('../data/adjectives');
var nouns = require('../data/nouns');

var RULES = {
  nasal: {
    label: 'nasal',
    tamil: 'மெல்லினம்',
    rule: 'A homorganic nasal appears before க / ச / த / ப.'
  },
  double: {
    label: 'double',
    tamil: 'வல்லினம் மிகுதல்',
    rule: 'The hard consonant doubles across the seam.'
  },
  ran: {
    label: 'ran',
    tamil: 'ன் → ற்',
    rule: 'A ன்-final stem turns its ன் into ற் before a hard consonant.'
  },
  plain: {
    label: 'plain',
    tamil: 'இயல்பு',
    rule: 'Nothing changes at the seam.'
  },
  phrase: {
    label: 'phrase',
    tamil: 'பெயரெச்சம்',
    rule: 'A relative participle stays its own word.'
  }
};

var VOWEL_RULE = {
  label: 'vowel',
  tamil: 'உடம்படுமெய்',
  rule: 'A vowel-initial noun needs a bridging consonant.'
};

function commonPrefix(a, b) {
  var i = 0;
  while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) i++;
  return i;
}

function commonSuffix(a, b) {
  var i = 0;
  while (
    i < a.length && i < b.length &&
    a.charAt(a.length - 1 - i) === b.charAt(b.length - 1 - i)
  ) i++;
  return i;
}

// Split the joined form into [kept from stem, what the rule inserted, the noun].
// Diffing against both inputs covers every class, including ran (பொ|ற்|கிளி)
// and the vowel glides (கரு|வெ|லி).
function segment(stem, noun, joined) {
  var head = commonPrefix(joined, stem);
  var tail = commonSuffix(joined, noun);
  if (head + tail > joined.length) tail = joined.length - head;
  return {
    head: joined.slice(0, head),
    seam: joined.slice(head, joined.length - tail),
    tail: joined.slice(joined.length - tail)
  };
}

var VOWELS = 'அஆஇஈஉஊஎஏஐஒஓஔ';

function build(options) {
  options = options || {};
  var pool = adjectives;
  var adjective = pool[Math.floor(Math.random() * pool.length)];

  var candidates = nouns.filter(function (noun) {
    if (options.kind) return noun.kind === options.kind;
    return adjective.modifies.indexOf(noun.kind) > -1;
  });
  if (!candidates.length) candidates = nouns;

  var noun = candidates[Math.floor(Math.random() * candidates.length)];
  var tamil = join(adjective.stem, adjective.join, noun.word);
  var vowelInitial = VOWELS.indexOf(noun.word.charAt(0)) > -1;

  return {
    tamil: tamil,
    latin: tamil.split(' ').map(romanize).join(' '),
    gloss: adjective.gloss + ' ' + noun.gloss,
    stem: adjective.stem,
    stemWord: adjective.word,
    stemGloss: adjective.gloss,
    noun: noun.word,
    nounGloss: noun.gloss,
    nounKind: noun.kind,
    joinClass: adjective.join,
    rule: vowelInitial && adjective.join !== 'phrase' ? VOWEL_RULE : RULES[adjective.join],
    parts: segment(adjective.stem, noun.word, tamil)
  };
}

module.exports = {
  build: build,
  romanize: romanize,
  join: join,
  rules: RULES,
  counts: {
    adjectives: adjectives.length,
    nouns: nouns.length,
    combinations: generateName.combinations()
  }
};
