'use strict';

var assert = require('assert');
var generateName = require('../');
var join = require('../lib/sandhi');
var romanize = require('../lib/romanize');
var adjectives = require('../data/adjectives');
var nouns = require('../data/nouns');

// A small seeded PRNG so the suite has no dependencies beyond mocha.
function seeded(seed) {
  var state = seed >>> 0;
  return function () {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

var JOIN_CLASSES = ['nasal', 'double', 'ran', 'plain', 'phrase'];
var KINDS = ['creature', 'plant', 'thing', 'place'];

describe('sandhi', function () {
  // Each expected form is an attested Tamil compound, not a derived guess.
  var cases = [
    ['கரு', 'nasal', 'குயில்', 'கருங்குயில்'],
    ['செ', 'nasal', 'தாமரை', 'செந்தாமரை'],
    ['பசு', 'nasal', 'கிளி', 'பசுங்கிளி'],
    ['பெரு', 'nasal', 'பாம்பு', 'பெரும்பாம்பு'],
    ['பெரு', 'nasal', 'சிங்கம்', 'பெருஞ்சிங்கம்'],
    ['நீல', 'double', 'தாமரை', 'நீலத்தாமரை'],
    ['சின்ன', 'double', 'பூனை', 'சின்னப்பூனை'],
    ['மா', 'double', 'குயில்', 'மாக்குயில்'],
    ['வெண்', 'plain', 'மயில்', 'வெண்மயில்'],
    ['பொன்', 'ran', 'கிளி', 'பொற்கிளி'],
    ['பொன்', 'ran', 'தாமரை', 'பொற்றாமரை'],
    ['பொன்', 'ran', 'மயில்', 'பொன்மயில்'],
    ['பறக்கும்', 'phrase', 'பூனை', 'பறக்கும் பூனை']
  ];

  cases.forEach(function (c) {
    it(c[0] + ' + ' + c[2] + ' -> ' + c[3], function () {
      assert.strictEqual(join(c[0], c[1], c[2]), c[3]);
    });
  });

  describe('before a vowel (உடம்படுமெய்)', function () {
    var vowelCases = [
      // Vowel-final stems take a glide.
      ['கரு', 'nasal', 'எலி', 'கருவெலி'],
      ['நீல', 'double', 'ஆடு', 'நீலவாடு'],
      ['மா', 'double', 'ஓநாய்', 'மாவோநாய்'],
      ['பச்சை', 'double', 'எலி', 'பச்சையெலி'],
      ['கில்லாடி', 'double', 'ஆமை', 'கில்லாடியாமை'],
      // ண் and ன் double across the seam.
      ['வெண்', 'plain', 'எலி', 'வெண்ணெலி'],
      ['பொன்', 'ran', 'ஆடை', 'பொன்னாடை'],
      // Other dead consonants simply carry the vowel.
      ['மஞ்சள்', 'plain', 'ஆமை', 'மஞ்சளாமை'],
      ['கடல்', 'plain', 'ஆமை', 'கடலாமை'],
      ['குளிர்', 'plain', 'ஊசல்', 'குளிரூசல்']
    ];

    vowelCases.forEach(function (c) {
      it(c[0] + ' + ' + c[2] + ' -> ' + c[3], function () {
        assert.strictEqual(join(c[0], c[1], c[2]), c[3]);
      });
    });
  });

  it('leaves a soft initial consonant alone', function () {
    assert.strictEqual(join('கரு', 'nasal', 'மயில்'), 'கருமயில்');
    assert.strictEqual(join('நீல', 'double', 'நரி'), 'நீலநரி');
  });
});

describe('romanize', function () {
  var cases = [
    ['கருங்குயில்', 'karunguyil'],
    ['செந்தாமரை', 'senthaamarai'],
    ['பசுங்கிளி', 'pasungili'],
    ['சிங்கம்', 'singam'],
    ['பசும்பாம்பு', 'pasumbaambu'],
    ['வெண்ணெலி', 'venneli'],
    ['தமிழ்', 'thamizh'],
    ['நீலத்தாமரை', 'neelathaamarai']
  ];

  cases.forEach(function (c) {
    it(c[0] + ' -> ' + c[1], function () {
      assert.strictEqual(romanize(c[0]), c[1]);
    });
  });

  it('voices a stop after a vowel but not word-initially', function () {
    // The same letter க is [k] initially and [g] between vowels.
    assert.strictEqual(romanize('கரு').charAt(0), 'k');
    assert.ok(/g/.test(romanize('மகன்')));
  });

  it('produces only ASCII', function () {
    nouns.forEach(function (noun) {
      assert.ok(
        /^[a-z ]+$/.test(romanize(noun.word)),
        noun.word + ' romanized to ' + romanize(noun.word)
      );
    });
  });

  it('handles every geminate in the word lists', function () {
    // Regression: a geminate missing from the table stringified to
    // "undefined", which the ASCII check above happily accepted
    // (செந்நாய் -> "seundefinedaay").
    adjectives.map(function (a) { return a.stem; })
      .concat(nouns.map(function (n) { return n.word; }))
      .forEach(function (word) {
        assert.ok(
          !/undefined|NaN/.test(romanize(word)),
          word + ' romanized to ' + romanize(word)
        );
      });
  });

  it('romanizes ந்ந as nn', function () {
    assert.strictEqual(romanize('செந்நாய்'), 'sennaay');
  });
});

describe('generateName', function () {
  it('returns a string', function () {
    assert.strictEqual(typeof generateName(), 'string');
  });

  it('is deterministic for a given generator', function () {
    // Regression: 0.2.x picked the name shape with an unseeded Math.random,
    // so two identically seeded calls disagreed about half the time.
    for (var seed = 0; seed < 200; seed++) {
      assert.strictEqual(
        generateName({ random: seeded(seed) }),
        generateName({ random: seeded(seed) })
      );
    }
  });

  it('accepts the 0.x bare-generator signature', function () {
    assert.strictEqual(generateName(seeded(7)), generateName(seeded(7)));
  });

  it('never emits a stray space in a compound', function () {
    for (var i = 0; i < 500; i++) {
      var name = generateName({ random: seeded(i), format: 'both' });
      var spaces = name.tamil.split(' ').length - 1;
      assert.ok(spaces <= 1, 'too many words in ' + name.tamil);
    }
  });

  it('returns tamil, latin and gloss for format "both"', function () {
    var name = generateName({ format: 'both' });
    assert.ok(name.tamil.length);
    assert.ok(/^[a-z ]+$/.test(name.latin));
    assert.ok(name.gloss.length);
  });

  it('applies the requested style', function () {
    var opts = { random: seeded(3), format: 'latin' };
    var phrase = generateName({ random: seeded(3), format: 'both' });
    if (phrase.tamil.indexOf(' ') === -1) return; // not a phrase; nothing to join
    assert.ok(generateName({ random: seeded(3), format: 'latin', style: 'snake' }).indexOf('_') > -1);
    assert.ok(generateName({ random: seeded(3), format: 'latin', style: 'kebab' }).indexOf('-') > -1);
    assert.strictEqual(generateName(opts).indexOf('_'), -1);
  });

  it('restricts the head noun with "kind"', function () {
    var creatures = nouns.filter(function (n) { return n.kind === 'place'; })
      .map(function (n) { return n.word; });
    for (var i = 0; i < 100; i++) {
      var name = generateName({ random: seeded(i), kind: 'place', format: 'both' });
      var matched = creatures.some(function (w) {
        return name.tamil.indexOf(w.slice(1)) > -1 || name.tamil.indexOf(w) > -1;
      });
      assert.ok(matched, name.tamil + ' is not built on a place noun');
    }
  });
});

describe('generateName.many', function () {
  it('returns the requested number of distinct names', function () {
    var names = generateName.many(300);
    assert.strictEqual(names.length, 300);
    assert.strictEqual(new Set(names).size, 300);
  });

  it('throws rather than looping forever when asked for too many', function () {
    assert.throws(function () {
      generateName.many(generateName.combinations() + 1);
    }, /distinct names/);
  });
});

describe('word data', function () {
  it('reports a sane combination count', function () {
    assert.ok(generateName.combinations() > 5000);
  });

  it('has no duplicate entries', function () {
    var adjWords = adjectives.map(function (a) { return a.word; });
    assert.strictEqual(new Set(adjWords).size, adjWords.length);
    var nounKeys = nouns.map(function (n) { return n.kind + '/' + n.word; });
    assert.strictEqual(new Set(nounKeys).size, nounKeys.length);
  });

  it('uses only known join classes and kinds', function () {
    adjectives.forEach(function (a) {
      assert.ok(JOIN_CLASSES.indexOf(a.join) > -1, a.word + ' has join "' + a.join + '"');
      assert.ok(a.modifies.length, a.word + ' modifies nothing');
      a.modifies.forEach(function (kind) {
        assert.ok(KINDS.indexOf(kind) > -1, a.word + ' modifies unknown kind "' + kind + '"');
      });
    });
    nouns.forEach(function (n) {
      assert.ok(KINDS.indexOf(n.kind) > -1, n.word + ' has kind "' + n.kind + '"');
    });
  });

  it('gives every modifier at least one noun to attach to', function () {
    var kinds = {};
    nouns.forEach(function (n) { kinds[n.kind] = true; });
    adjectives.forEach(function (a) {
      var reachable = a.modifies.some(function (k) { return kinds[k]; });
      assert.ok(reachable, a.word + ' can never be paired');
    });
  });

  it('carries a gloss on every entry', function () {
    adjectives.concat(nouns).forEach(function (entry) {
      assert.ok(entry.gloss && entry.gloss.length, JSON.stringify(entry) + ' has no gloss');
    });
  });
});
