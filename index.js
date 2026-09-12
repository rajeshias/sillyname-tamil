'use strict';

var join = require('./lib/sandhi');
var romanize = require('./lib/romanize');
var adjectives = require('./data/adjectives');
var nouns = require('./data/nouns');

// Nouns bucketed by kind, so a modifier only ever sees the categories it is
// allowed to describe.
var byKind = nouns.reduce(function (acc, noun) {
  (acc[noun.kind] = acc[noun.kind] || []).push(noun);
  return acc;
}, {});

// Each modifier's candidate nouns, resolved once at load.
var poolFor = adjectives.map(function (adj) {
  return adj.modifies.reduce(function (pool, kind) {
    return pool.concat(byKind[kind] || []);
  }, []);
});

function pick(list, random) {
  return list[Math.floor(random() * list.length)];
}

function romanizePhrase(text) {
  return text.split(' ').map(romanize).join(' ');
}

function applyStyle(latin, style) {
  var parts = latin.split(' ');
  if (style === 'snake') return parts.join('_');
  if (style === 'kebab') return parts.join('-');
  if (style === 'camel') {
    return parts.map(function (part, i) {
      return i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  }
  return latin;
}

/**
 * Generate one silly Tamil name.
 *
 * @param {object|function} [options]  options, or a random generator for the
 *                                     0.x call signature
 * @param {function} [options.random]  returns a float in [0, 1)
 * @param {string}   [options.format]  'tamil' (default) | 'latin' | 'both'
 * @param {string}   [options.style]   'plain' (default) | 'camel' | 'snake' | 'kebab'
 * @param {string}   [options.kind]    restrict the head noun to one category
 * @returns {string|object}
 */
function generateName(options) {
  if (typeof options === 'function') {
    options = { random: options };
  }
  options = options || {};

  var random = options.random || Math.random;
  var format = options.format || 'tamil';
  var style = options.style || 'plain';

  var index = Math.floor(random() * adjectives.length);
  var adjective = adjectives[index];

  var pool = poolFor[index];
  if (options.kind) {
    pool = pool.filter(function (noun) { return noun.kind === options.kind; });
    if (!pool.length) pool = byKind[options.kind] || nouns;
  }

  var noun = pick(pool, random);
  var tamil = join(adjective.stem, adjective.join, noun.word);

  if (format === 'tamil') return tamil;

  var latin = applyStyle(romanizePhrase(tamil), style);
  if (format === 'latin') return latin;

  return {
    tamil: tamil,
    latin: latin,
    gloss: adjective.gloss + ' ' + noun.gloss
  };
}

/**
 * Generate `count` distinct names. Throws if the requested count exceeds what
 * the word lists can produce.
 */
generateName.many = function (count, options) {
  options = options || {};
  var seen = {};
  var out = [];
  var attempts = 0;
  var ceiling = count * 200 + 1000;

  while (out.length < count) {
    if (++attempts > ceiling) {
      throw new Error(
        'could not generate ' + count + ' distinct names; ' +
        'the word lists support roughly ' + generateName.combinations() + ' combinations'
      );
    }
    var name = generateName(options);
    var key = typeof name === 'string' ? name : name.tamil;
    if (seen[key]) continue;
    seen[key] = true;
    out.push(name);
  }

  return out;
};

/** Total distinct modifier+noun pairings the current word lists allow. */
generateName.combinations = function () {
  return poolFor.reduce(function (total, pool) { return total + pool.length; }, 0);
};

function randomNoun(generator) {
  return pick(nouns, generator || Math.random).word;
}

function randomAdjective(generator) {
  return pick(adjectives, generator || Math.random).word;
}

module.exports = generateName;
module.exports.randomNoun = randomNoun;
module.exports.randomAdjective = randomAdjective;
module.exports.romanize = romanize;
module.exports.join = join;
module.exports.adjectives = adjectives;
module.exports.nouns = nouns;
