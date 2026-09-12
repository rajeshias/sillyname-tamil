"use strict";
var SillyName = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/sandhi.js
  var require_sandhi = __commonJS({
    "lib/sandhi.js"(exports, module) {
      "use strict";
      var PULLI = "\u0BCD";
      var HARD = { "\u0B95": 1, "\u0B9A": 1, "\u0BA4": 1, "\u0BAA": 1 };
      var NASAL = { "\u0B95": "\u0B99", "\u0B9A": "\u0B9E", "\u0BA4": "\u0BA8", "\u0BAA": "\u0BAE" };
      var VOWEL_SIGN = {
        "\u0B85": "",
        // அ
        "\u0B86": "\u0BBE",
        // ஆ
        "\u0B87": "\u0BBF",
        // இ
        "\u0B88": "\u0BC0",
        // ஈ
        "\u0B89": "\u0BC1",
        // உ
        "\u0B8A": "\u0BC2",
        // ஊ
        "\u0B8E": "\u0BC6",
        // எ
        "\u0B8F": "\u0BC7",
        // ஏ
        "\u0B90": "\u0BC8",
        // ஐ
        "\u0B92": "\u0BCA",
        // ஒ
        "\u0B93": "\u0BCB",
        // ஓ
        "\u0B94": "\u0BCC"
        // ஔ
      };
      var FRONT_SIGN = { "\u0BBF": 1, "\u0BC0": 1, "\u0BC6": 1, "\u0BC7": 1, "\u0BC8": 1 };
      function endsWithDeadConsonant(stem) {
        return stem.charAt(stem.length - 1) === PULLI;
      }
      var GEMINATES_BEFORE_VOWEL = { "\u0BA3": 1, "\u0BA9": 1 };
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
        var tail = stem.charAt(stem.length - 1);
        var glide = FRONT_SIGN[tail] ? "\u0BAF" : "\u0BB5";
        return stem + glide + sign + rest;
      }
      function join(stem, cls, noun) {
        if (cls === "phrase") {
          return stem + " " + noun;
        }
        var head = noun.charAt(0);
        if (VOWEL_SIGN[head] !== void 0) {
          return joinBeforeVowel(stem, noun);
        }
        if (!HARD[head]) {
          return stem + noun;
        }
        if (cls === "nasal") {
          return stem + NASAL[head] + PULLI + noun;
        }
        if (cls === "double") {
          return stem + head + PULLI + noun;
        }
        if (cls === "ran") {
          var base = stem.slice(0, -2);
          if (head === "\u0BA4") {
            return base + "\u0BB1" + PULLI + "\u0BB1" + noun.slice(1);
          }
          return base + "\u0BB1" + PULLI + noun;
        }
        return stem + noun;
      }
      module.exports = join;
      module.exports.PULLI = PULLI;
      module.exports.VOWEL_SIGN = VOWEL_SIGN;
    }
  });

  // lib/romanize.js
  var require_romanize = __commonJS({
    "lib/romanize.js"(exports, module) {
      "use strict";
      var PULLI = "\u0BCD";
      var INDEP = {
        "\u0B85": "a",
        "\u0B86": "aa",
        "\u0B87": "i",
        "\u0B88": "ee",
        "\u0B89": "u",
        "\u0B8A": "oo",
        "\u0B8E": "e",
        "\u0B8F": "e",
        "\u0B90": "ai",
        "\u0B92": "o",
        "\u0B93": "o",
        "\u0B94": "au"
      };
      var SIGN = {
        "\u0BBE": "aa",
        "\u0BBF": "i",
        "\u0BC0": "ee",
        "\u0BC1": "u",
        "\u0BC2": "oo",
        "\u0BC6": "e",
        "\u0BC7": "e",
        "\u0BC8": "ai",
        "\u0BCA": "o",
        "\u0BCB": "o",
        "\u0BCC": "au"
      };
      var CONS = {
        "\u0B95": "k",
        "\u0B99": "ng",
        "\u0B9A": "s",
        "\u0B9E": "nj",
        "\u0B9F": "t",
        "\u0BA3": "n",
        "\u0BA4": "th",
        "\u0BA8": "n",
        "\u0BAA": "p",
        "\u0BAE": "m",
        "\u0BAF": "y",
        "\u0BB0": "r",
        "\u0BB2": "l",
        "\u0BB5": "v",
        "\u0BB4": "zh",
        "\u0BB3": "l",
        "\u0BB1": "r",
        "\u0BA9": "n",
        "\u0B9C": "j",
        "\u0BB7": "sh",
        "\u0BB8": "s",
        "\u0BB9": "h"
      };
      var VOICED = { "\u0B95": "g", "\u0B9A": "s", "\u0B9F": "d", "\u0BA4": "dh", "\u0BAA": "b" };
      var NASALS = { "\u0B99": 1, "\u0B9E": 1, "\u0BA3": 1, "\u0BA8": 1, "\u0BAE": 1, "\u0BA9": 1 };
      var NASAL_CLUSTER = {
        "\u0B99|\u0B95": "ng",
        "\u0B9E|\u0B9A": "nj",
        "\u0BA8|\u0BA4": "nth",
        "\u0BA3|\u0B9F": "nd",
        "\u0BAE|\u0BAA": "mb",
        "\u0BA9|\u0BB1": "ndr"
      };
      var GEMINATE = {
        "\u0B95": "kk",
        "\u0B9A": "ch",
        "\u0B9F": "tt",
        "\u0BA4": "th",
        "\u0BAA": "pp",
        "\u0BB1": "tr",
        "\u0BB2": "ll",
        "\u0BB3": "ll",
        "\u0BA3": "nn",
        "\u0BA9": "nn",
        "\u0BAE": "mm",
        "\u0BAF": "yy",
        "\u0BB0": "rr",
        "\u0BB5": "vv",
        "\u0B99": "ng",
        "\u0B9E": "nj",
        "\u0BA8": "nn",
        "\u0BB4": "zh"
      };
      function tokenize(word) {
        var units = [];
        for (var i = 0; i < word.length; i++) {
          var ch = word.charAt(i);
          if (INDEP[ch] !== void 0) {
            units.push({ vowel: INDEP[ch] });
          } else if (CONS[ch] !== void 0) {
            var next = word.charAt(i + 1);
            if (next === PULLI) {
              units.push({ cons: ch, dead: true });
              i++;
            } else if (SIGN[next] !== void 0) {
              units.push({ cons: ch, vowel: SIGN[next] });
              i++;
            } else {
              units.push({ cons: ch, vowel: "a" });
            }
          }
        }
        return units;
      }
      function romanize(word) {
        var units = tokenize(word);
        var out = "";
        var i = 0;
        while (i < units.length) {
          var u = units[i];
          if (u.cons === void 0) {
            out += u.vowel;
            i++;
            continue;
          }
          if (u.dead) {
            var next = units[i + 1];
            if (next && next.cons) {
              var cluster = NASAL_CLUSTER[u.cons + "|" + next.cons];
              if (cluster) {
                out += cluster + (next.vowel === void 0 ? "" : next.vowel);
                i += 2;
                continue;
              }
              if (u.cons === next.cons) {
                var base = CONS[u.cons];
                var doubled = GEMINATE[u.cons] || (base.length === 1 ? base + base : base);
                out += doubled + (next.vowel === void 0 ? "" : next.vowel);
                i += 2;
                continue;
              }
            }
            out += CONS[u.cons];
            i++;
            continue;
          }
          var prev = units[i - 1];
          var afterVowel = prev && prev.vowel !== void 0;
          var afterNasal = prev && prev.dead && NASALS[prev.cons];
          out += VOICED[u.cons] && (afterVowel || afterNasal) ? VOICED[u.cons] : CONS[u.cons];
          out += u.vowel;
          i++;
        }
        return out;
      }
      module.exports = romanize;
    }
  });

  // data/adjectives.js
  var require_adjectives = __commonJS({
    "data/adjectives.js"(exports, module) {
      "use strict";
      module.exports = [
        // Colours
        { word: "\u0B95\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", stem: "\u0B95\u0BB0\u0BC1", join: "nasal", gloss: "black", modifies: ["creature", "plant", "thing"] },
        { word: "\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", stem: "\u0B9A\u0BC6", join: "nasal", gloss: "red", modifies: ["creature", "plant", "thing"] },
        { word: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BC8", stem: "\u0BB5\u0BC6\u0BA3\u0BCD", join: "plain", gloss: "white", modifies: ["creature", "plant", "thing"] },
        { word: "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8", stem: "\u0BAA\u0B9A\u0BC1", join: "nasal", gloss: "green", modifies: ["creature", "plant"] },
        { word: "\u0BA8\u0BC0\u0BB2\u0BAE\u0BCD", stem: "\u0BA8\u0BC0\u0BB2", join: "double", gloss: "blue", modifies: ["creature", "plant", "place"] },
        { word: "\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD", stem: "\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD", join: "plain", gloss: "yellow", modifies: ["creature", "plant", "thing"] },
        { word: "\u0BAA\u0BCA\u0BA9\u0BCD", stem: "\u0BAA\u0BCA\u0BA9\u0BCD", join: "ran", gloss: "golden", modifies: ["creature", "plant", "thing"] },
        { word: "\u0BA4\u0B99\u0BCD\u0B95\u0BAE\u0BCD", stem: "\u0BA4\u0B99\u0BCD\u0B95", join: "double", gloss: "gold", modifies: ["creature", "thing"] },
        { word: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF", stem: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF", join: "double", gloss: "silver", modifies: ["creature", "thing"] },
        { word: "\u0B9A\u0BC6\u0BAE\u0BCD\u0BAA\u0BC1", stem: "\u0B9A\u0BC6\u0BAE\u0BCD\u0BAA\u0BC1", join: "double", gloss: "copper", modifies: ["thing"] },
        { word: "\u0B87\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", stem: "\u0B87\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", join: "double", gloss: "iron", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BB3\u0BC8", stem: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BB3\u0BC8", join: "double", gloss: "brass", modifies: ["thing"] },
        { word: "\u0B8A\u0BA4\u0BBE", stem: "\u0B8A\u0BA4\u0BBE", join: "double", gloss: "purple", modifies: ["creature", "plant"] },
        { word: "\u0B9A\u0BBE\u0BAE\u0BCD\u0BAA\u0BB2\u0BCD", stem: "\u0B9A\u0BBE\u0BAE\u0BCD\u0BAA\u0BB2\u0BCD", join: "plain", gloss: "ashen", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BB4\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", stem: "\u0BAA\u0BB4\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", join: "double", gloss: "brown", modifies: ["creature", "thing"] },
        { word: "\u0BB5\u0BC8\u0BB0\u0BAE\u0BCD", stem: "\u0BB5\u0BC8\u0BB0", join: "double", gloss: "diamond", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BB0\u0B95\u0BA4\u0BAE\u0BCD", stem: "\u0BAE\u0BB0\u0B95\u0BA4", join: "double", gloss: "emerald", modifies: ["thing"] },
        { word: "\u0BAE\u0BBE\u0BA3\u0BBF\u0B95\u0BCD\u0B95\u0BAE\u0BCD", stem: "\u0BAE\u0BBE\u0BA3\u0BBF\u0B95\u0BCD\u0B95", join: "double", gloss: "ruby", modifies: ["thing"] },
        { word: "\u0BAE\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1", stem: "\u0BAE\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1", join: "double", gloss: "pearl", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BB5\u0BB3\u0BAE\u0BCD", stem: "\u0BAA\u0BB5\u0BB3", join: "double", gloss: "coral", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BB3\u0BBF\u0B99\u0BCD\u0B95\u0BC1", stem: "\u0BAA\u0BB3\u0BBF\u0B99\u0BCD\u0B95\u0BC1", join: "double", gloss: "crystal", modifies: ["creature", "thing"] },
        { word: "\u0B95\u0BB0\u0BC1\u0BA8\u0BC0\u0BB2\u0BAE\u0BCD", stem: "\u0B95\u0BB0\u0BC1\u0BA8\u0BC0\u0BB2", join: "double", gloss: "navy", modifies: ["creature", "place"] },
        { word: "\u0B87\u0BB3\u0B9E\u0BCD\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", stem: "\u0B87\u0BB3\u0B9E\u0BCD\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", join: "double", gloss: "pink", modifies: ["creature", "plant"] },
        // --- SIZE, SHAPE & FORM ---
        { word: "\u0BAA\u0BC6\u0BB0\u0BBF\u0BAF", stem: "\u0BAA\u0BC6\u0BB0\u0BC1", join: "nasal", gloss: "great", modifies: ["creature", "place", "thing"] },
        { word: "\u0B9A\u0BBF\u0BA9\u0BCD\u0BA9", stem: "\u0B9A\u0BBF\u0BA9\u0BCD\u0BA9", join: "double", gloss: "little", modifies: ["creature", "thing"] },
        { word: "\u0B95\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF", stem: "\u0B95\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF", join: "double", gloss: "tiny", modifies: ["creature", "thing"] },
        { word: "\u0BA8\u0BC0\u0BA3\u0BCD\u0B9F", stem: "\u0BA8\u0BC6\u0B9F\u0BC1", join: "nasal", gloss: "long/tall", modifies: ["creature", "place", "thing"] },
        { word: "\u0B95\u0BC1\u0BB3\u0BCD\u0BB3", stem: "\u0B95\u0BC1\u0BB3\u0BCD\u0BB3", join: "double", gloss: "stumpy", modifies: ["creature"] },
        { word: "\u0B95\u0BC1\u0B9F\u0BCD\u0B9F\u0BC8", stem: "\u0B95\u0BC1\u0B9F\u0BCD\u0B9F\u0BC8", join: "double", gloss: "short", modifies: ["creature", "thing"] },
        { word: "\u0B92\u0BB2\u0BCD\u0BB2\u0BBF", stem: "\u0B92\u0BB2\u0BCD\u0BB2\u0BBF", join: "double", gloss: "skinny", modifies: ["creature"] },
        { word: "\u0B95\u0BCA\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4", stem: "\u0B95\u0BCA\u0BB4\u0BC1", join: "nasal", gloss: "plump", modifies: ["creature"] },
        { word: "\u0BAA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4", stem: "\u0BAA\u0BB0\u0BC1", join: "nasal", gloss: "bulky", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BCA\u0B9F\u0BCD\u0B9F\u0BC8", stem: "\u0BAE\u0BCA\u0B9F\u0BCD\u0B9F\u0BC8", join: "double", gloss: "bald", modifies: ["creature", "thing"] },
        { word: "\u0B89\u0BB0\u0BC1\u0BA3\u0BCD\u0B9F\u0BC8", stem: "\u0B89\u0BB0\u0BC1\u0BA3\u0BCD\u0B9F\u0BC8", join: "double", gloss: "round", modifies: ["creature", "thing"] },
        { word: "\u0BA4\u0B9F\u0BCD\u0B9F\u0BC8", stem: "\u0BA4\u0B9F\u0BCD\u0B9F\u0BC8", join: "double", gloss: "flat", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BBE", stem: "\u0BAE\u0BBE", join: "double", gloss: "grand", modifies: ["creature", "place"] },
        { word: "\u0B85\u0BB0\u0BC8", stem: "\u0B85\u0BB0\u0BC8", join: "double", gloss: "half", modifies: ["creature", "thing"] },
        { word: "\u0B89\u0BAF\u0BB0\u0BCD", stem: "\u0B89\u0BAF\u0BB0\u0BCD", join: "plain", gloss: "lofty", modifies: ["creature", "place"] },
        { word: "\u0BA4\u0BBF\u0BA3\u0BCD", stem: "\u0BA4\u0BBF\u0BA3\u0BCD", join: "plain", gloss: "dense/stout", modifies: ["creature", "thing"] },
        // --- TEMPERAMENT, SPIRIT & MYSTICISM ---
        { word: "\u0BB5\u0BC0\u0BB0\u0BAE\u0BCD", stem: "\u0BB5\u0BC0\u0BB0", join: "double", gloss: "valiant", modifies: ["creature"] },
        { word: "\u0BA4\u0BC0\u0BB0", stem: "\u0BA4\u0BC0\u0BB0", join: "double", gloss: "intrepid", modifies: ["creature"] },
        { word: "\u0BAE\u0BC1\u0BB0\u0B9F\u0BC1", stem: "\u0BAE\u0BC1\u0BB0\u0B9F\u0BCD\u0B9F\u0BC1", join: "double", gloss: "brutish", modifies: ["creature"] },
        { word: "\u0B9A\u0BCB\u0BAE\u0BCD\u0BAA\u0BB2\u0BCD", stem: "\u0B9A\u0BCB\u0BAE\u0BCD\u0BAA\u0BC7\u0BB1\u0BBF", join: "double", gloss: "lazy", modifies: ["creature"] },
        { word: "\u0B95\u0BBF\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BC1", stem: "\u0B95\u0BBF\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BC1", join: "double", gloss: "cracked", modifies: ["creature"] },
        { word: "\u0B9A\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF", stem: "\u0B9A\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF", join: "double", gloss: "impish", modifies: ["creature"] },
        { word: "\u0B95\u0BC1\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", stem: "\u0B95\u0BC1\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", join: "double", gloss: "naughty", modifies: ["creature"] },
        { word: "\u0BA4\u0BC1\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1", stem: "\u0BA4\u0BC1\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1", join: "double", gloss: "feisty", modifies: ["creature"] },
        { word: "\u0BAA\u0BC7\u0BAF\u0BCD", stem: "\u0BAA\u0BC7\u0BAF\u0BCD", join: "double", gloss: "demon", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1", stem: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1", join: "double", gloss: "mad", modifies: ["creature"] },
        { word: "\u0BA4\u0BBF\u0BAE\u0BBF\u0BB0\u0BCD", stem: "\u0BA4\u0BBF\u0BAE\u0BBF\u0BB0\u0BCD", join: "plain", gloss: "arrogant", modifies: ["creature"] },
        { word: "\u0BB5\u0BC6\u0BB1\u0BBF", stem: "\u0BB5\u0BC6\u0BB1\u0BBF", join: "double", gloss: "frenzied", modifies: ["creature"] },
        { word: "\u0B9A\u0BC2\u0BB0\u0BAE\u0BCD", stem: "\u0B9A\u0BC2\u0BB0", join: "double", gloss: "fierce", modifies: ["creature"] },
        { word: "\u0B95\u0BCB\u0BAA\u0BAE\u0BCD", stem: "\u0B95\u0BCB\u0BAA", join: "double", gloss: "wrathful", modifies: ["creature"] },
        { word: "\u0B95\u0BCA\u0B9F\u0BC1\u0BAE\u0BC8", stem: "\u0B95\u0BCA\u0B9F\u0BC1", join: "nasal", gloss: "grim/cruel", modifies: ["creature", "place", "thing"] },
        { word: "\u0BAE\u0BA8\u0BCD\u0BA4\u0BAE\u0BCD", stem: "\u0BAE\u0BA8\u0BCD\u0BA4", join: "double", gloss: "dull", modifies: ["creature"] },
        { word: "\u0BAA\u0B9E\u0BCD\u0B9A\u0BC1", stem: "\u0BAA\u0B9E\u0BCD\u0B9A\u0BC1", join: "double", gloss: "cottony", modifies: ["creature", "thing"] },
        { word: "\u0B85\u0B9F\u0B99\u0BCD\u0B95\u0BBE", stem: "\u0B85\u0B9F\u0B99\u0BCD\u0B95\u0BBE", join: "double", gloss: "untamed", modifies: ["creature"] },
        { word: "\u0B95\u0BBF\u0BB2\u0BCD\u0BB2\u0BBE\u0B9F\u0BBF", stem: "\u0B95\u0BBF\u0BB2\u0BCD\u0BB2\u0BBE\u0B9F\u0BBF", join: "double", gloss: "wily", modifies: ["creature"] },
        { word: "\u0B95\u0BB3\u0BCD\u0BB3", stem: "\u0B95\u0BB3\u0BCD\u0BB3", join: "double", gloss: "stealthy/sly", modifies: ["creature", "thing"] },
        { word: "\u0B9A\u0B95\u0BCD\u0B95\u0BC8", stem: "\u0B9A\u0B95\u0BCD\u0B95\u0BC8", join: "double", gloss: "worn-out", modifies: ["creature", "thing"] },
        { word: "\u0B8F\u0BAE\u0BBE\u0BB3\u0BBF", stem: "\u0B8F\u0BAE\u0BBE\u0BB3\u0BBF", join: "double", gloss: "gullible", modifies: ["creature"] },
        { word: "\u0BAE\u0BBE\u0BAF", stem: "\u0BAE\u0BBE\u0BAF", join: "double", gloss: "mystic/phantom", modifies: ["creature", "place", "thing"] },
        { word: "\u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0", stem: "\u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0", join: "double", gloss: "magical", modifies: ["creature", "thing"] },
        { word: "\u0B9A\u0BBE\u0BA8\u0BCD\u0BA4", stem: "\u0B9A\u0BBE\u0BA8\u0BCD\u0BA4", join: "double", gloss: "gentle/serene", modifies: ["creature"] },
        // --- TEXTURE, SENSES, AGE & PURITY ---
        { word: "\u0B95\u0B9F\u0BBF\u0BA9\u0BAE\u0BCD", stem: "\u0B95\u0B9F\u0BBF\u0BA9", join: "double", gloss: "hard", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BC6\u0BA9\u0BCD\u0BAE\u0BC8", stem: "\u0BAE\u0BC6\u0BA9\u0BCD", join: "plain", gloss: "soft/tender", modifies: ["creature", "plant", "thing"] },
        { word: "\u0B95\u0BC2\u0BB0\u0BCD\u0BAE\u0BC8", stem: "\u0B95\u0BC2\u0BB0\u0BCD", join: "double", gloss: "razor/sharp", modifies: ["creature", "thing"] },
        { word: "\u0B88\u0BB0\u0BAE\u0BCD", stem: "\u0B88\u0BB0", join: "double", gloss: "damp", modifies: ["creature", "thing"] },
        { word: "\u0B9A\u0BC1\u0B9F\u0BC1", stem: "\u0B9A\u0BC1\u0B9F\u0BC1", join: "double", gloss: "scalding", modifies: ["thing"] },
        { word: "\u0B95\u0BC1\u0BB3\u0BBF\u0BB0\u0BCD", stem: "\u0B95\u0BC1\u0BB3\u0BBF\u0BB0\u0BCD", join: "plain", gloss: "cold", modifies: ["creature", "thing", "place"] },
        { word: "\u0BAA\u0BC1\u0BA4\u0BC1", stem: "\u0BAA\u0BC1\u0BA4\u0BC1", join: "double", gloss: "new", modifies: ["creature", "thing"] },
        { word: "\u0BAA\u0BB4\u0BC8\u0BAF", stem: "\u0BAA\u0BB4", join: "double", gloss: "old", modifies: ["thing", "creature"] },
        { word: "\u0B95\u0BBF\u0BB4", stem: "\u0B95\u0BBF\u0BB4", join: "double", gloss: "aged", modifies: ["creature"] },
        { word: "\u0B87\u0BB3\u0BAE\u0BCD", stem: "\u0B87\u0BB3", join: "nasal", gloss: "young", modifies: ["creature", "plant"] },
        { word: "\u0BA4\u0BC2\u0BAF", stem: "\u0BA4\u0BC2\u0BAF", join: "double", gloss: "pure", modifies: ["creature", "thing"] },
        { word: "\u0BA8\u0BB1\u0BC1\u0BAE\u0BA3\u0BAE\u0BCD", stem: "\u0BA8\u0BB1\u0BC1", join: "nasal", gloss: "sweet-scented", modifies: ["plant", "thing"] },
        { word: "\u0B95\u0BBE\u0BB0", stem: "\u0B95\u0BBE\u0BB0", join: "double", gloss: "pungent/fiery", modifies: ["creature", "thing"] },
        // --- NATURE, REALMS & ELEMENTS ---
        { word: "\u0BAE\u0BB2\u0BC8", stem: "\u0BAE\u0BB2\u0BC8", join: "double", gloss: "mountain", modifies: ["creature", "place"] },
        { word: "\u0B95\u0B9F\u0BB2\u0BCD", stem: "\u0B95\u0B9F\u0BB2\u0BCD", join: "plain", gloss: "sea", modifies: ["creature", "place"] },
        { word: "\u0B86\u0BB1\u0BCD\u0BB1\u0BC1", stem: "\u0B86\u0BB1\u0BCD\u0BB1\u0BC1", join: "double", gloss: "river", modifies: ["creature", "place"] },
        { word: "\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1", stem: "\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1", join: "double", gloss: "wild", modifies: ["creature", "plant"] },
        { word: "\u0BA8\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1", stem: "\u0BA8\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1", join: "double", gloss: "homespun", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BB4\u0BC8", stem: "\u0BAE\u0BB4\u0BC8", join: "double", gloss: "rain", modifies: ["creature", "place"] },
        { word: "\u0BA8\u0BBF\u0BB2\u0BBE", stem: "\u0BA8\u0BBF\u0BB2\u0BBE", join: "double", gloss: "moonlit", modifies: ["creature", "thing"] },
        { word: "\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF", stem: "\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF", join: "double", gloss: "solar", modifies: ["creature", "thing"] },
        { word: "\u0BA8\u0BC6\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", stem: "\u0BA8\u0BC6\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", join: "double", gloss: "fire", modifies: ["creature", "thing"] },
        { word: "\u0B87\u0B9F\u0BBF", stem: "\u0B87\u0B9F\u0BBF", join: "double", gloss: "thunder", modifies: ["creature"] },
        { word: "\u0BAA\u0BC1\u0BAF\u0BB2\u0BCD", stem: "\u0BAA\u0BC1\u0BAF\u0BB2\u0BCD", join: "plain", gloss: "storm", modifies: ["creature"] },
        { word: "\u0BAA\u0BA9\u0BBF", stem: "\u0BAA\u0BA9\u0BBF", join: "double", gloss: "frosty", modifies: ["creature", "place"] },
        { word: "\u0B95\u0BBE\u0BB0\u0BCD", stem: "\u0B95\u0BBE\u0BB0\u0BCD", join: "plain", gloss: "dark-cloud", modifies: ["creature", "place"] },
        { word: "\u0BB5\u0BBE\u0BA9\u0BCD", stem: "\u0BB5\u0BBE\u0BA9\u0BCD", join: "plain", gloss: "celestial/sky", modifies: ["creature", "place"] },
        { word: "\u0BB5\u0BBF\u0BA3\u0BCD", stem: "\u0BB5\u0BBF\u0BA3\u0BCD", join: "plain", gloss: "cosmic/star", modifies: ["creature", "thing"] },
        // 'plain', not 'ran': மின் keeps its ன் before a hard consonant
        // (மின்சாரம், மின்விளக்கு), unlike பொன் -> பொற்காலம். Gemination before a
        // vowel still applies via the seam rule, giving மின்னல்.
        { word: "\u0BAE\u0BBF\u0BA9\u0BCD", stem: "\u0BAE\u0BBF\u0BA9\u0BCD", join: "plain", gloss: "lightning/spark", modifies: ["creature", "thing"] },
        { word: "\u0B87\u0BB0\u0BC1\u0BB3\u0BCD", stem: "\u0B87\u0BB0\u0BC1\u0BB3\u0BCD", join: "plain", gloss: "shadow/gloom", modifies: ["creature", "place"] },
        { word: "\u0B9A\u0BCB\u0BB2\u0BC8", stem: "\u0B9A\u0BCB\u0BB2\u0BC8", join: "double", gloss: "grove", modifies: ["creature", "plant"] },
        { word: "\u0BAA\u0BBE\u0BB2\u0BC8", stem: "\u0BAA\u0BBE\u0BB2\u0BC8", join: "double", gloss: "desert", modifies: ["creature", "place"] },
        // --- RELATIVE PARTICIPLES (VERBAL ADJECTIVES) ---
        // Stays a separate word with a space (e.g. பறக்கும் பூனை, எரியும் வாள்).
        { word: "\u0BAA\u0BB1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0BAA\u0BB1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "flying", modifies: ["creature"] },
        { word: "\u0B93\u0B9F\u0BC1\u0BAE\u0BCD", stem: "\u0B93\u0B9F\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "running", modifies: ["creature"] },
        { word: "\u0BA4\u0BC2\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0BA4\u0BC2\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "sleeping", modifies: ["creature"] },
        { word: "\u0B9A\u0BBF\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0B9A\u0BBF\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "laughing", modifies: ["creature"] },
        { word: "\u0BAA\u0BBE\u0B9F\u0BC1\u0BAE\u0BCD", stem: "\u0BAA\u0BBE\u0B9F\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "singing", modifies: ["creature"] },
        { word: "\u0B86\u0B9F\u0BC1\u0BAE\u0BCD", stem: "\u0B86\u0B9F\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "dancing", modifies: ["creature"] },
        { word: "\u0B95\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD", stem: "\u0B95\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "screeching", modifies: ["creature"] },
        { word: "\u0BA4\u0BBF\u0BB0\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD", stem: "\u0BA4\u0BBF\u0BB0\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "thieving", modifies: ["creature"] },
        { word: "\u0B95\u0BC1\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0B95\u0BC1\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "leaping", modifies: ["creature"] },
        { word: "\u0BAE\u0BBF\u0BA4\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0BAE\u0BBF\u0BA4\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "floating", modifies: ["creature"] },
        { word: "\u0B9A\u0BC0\u0BB1\u0BC1\u0BAE\u0BCD", stem: "\u0B9A\u0BC0\u0BB1\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "snarling/hissing", modifies: ["creature"] },
        { word: "\u0B8E\u0BB0\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD", stem: "\u0B8E\u0BB0\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "burning", modifies: ["creature", "thing", "place"] },
        { word: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD", stem: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "sparkling", modifies: ["creature", "thing"] },
        { word: "\u0BAE\u0BC1\u0BB4\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0BAE\u0BC1\u0BB4\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "roaring/booming", modifies: ["creature", "thing"] },
        { word: "\u0BB5\u0BC7\u0B9F\u0BCD\u0B9F\u0BC8\u0BAF\u0BBE\u0B9F\u0BC1\u0BAE\u0BCD", stem: "\u0BB5\u0BC7\u0B9F\u0BCD\u0B9F\u0BC8\u0BAF\u0BBE\u0B9F\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "hunting", modifies: ["creature"] },
        { word: "\u0BA8\u0BC0\u0BA8\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD", stem: "\u0BA8\u0BC0\u0BA8\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "swimming", modifies: ["creature"] },
        { word: "\u0B9A\u0BC1\u0BB4\u0BB2\u0BC1\u0BAE\u0BCD", stem: "\u0B9A\u0BC1\u0BB4\u0BB2\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "whirling", modifies: ["creature", "thing"] },
        { word: "\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", stem: "\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", join: "phrase", gloss: "guardian", modifies: ["creature"] }
      ];
    }
  });

  // data/nouns.js
  var require_nouns = __commonJS({
    "data/nouns.js"(exports, module) {
      "use strict";
      module.exports = [
        // --- ANIMALS, BIRDS & BEASTS ---
        { word: "\u0B95\u0BC1\u0BAF\u0BBF\u0BB2\u0BCD", kind: "creature", gloss: "koel" },
        { word: "\u0B95\u0BBF\u0BB3\u0BBF", kind: "creature", gloss: "parrot" },
        { word: "\u0BAA\u0BC1\u0BB2\u0BBF", kind: "creature", gloss: "tiger" },
        { word: "\u0BB5\u0BC7\u0B99\u0BCD\u0B95\u0BC8", kind: "creature", gloss: "panther" },
        { word: "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAE\u0BCD", kind: "creature", gloss: "lion" },
        { word: "\u0BAF\u0BBE\u0BA9\u0BC8", kind: "creature", gloss: "elephant" },
        { word: "\u0B95\u0BC1\u0BB0\u0B99\u0BCD\u0B95\u0BC1", kind: "creature", gloss: "monkey" },
        { word: "\u0BAA\u0BC2\u0BA9\u0BC8", kind: "creature", gloss: "cat" },
        { word: "\u0BA8\u0BBE\u0BAF\u0BCD", kind: "creature", gloss: "dog" },
        { word: "\u0B9A\u0BC6\u0BA8\u0BCD\u0BA8\u0BBE\u0BAF\u0BCD", kind: "creature", gloss: "dhole" },
        { word: "\u0B8E\u0BB2\u0BBF", kind: "creature", gloss: "rat" },
        { word: "\u0B86\u0B9F\u0BC1", kind: "creature", gloss: "goat" },
        { word: "\u0BAE\u0BBE\u0B9F\u0BC1", kind: "creature", gloss: "cow" },
        { word: "\u0B95\u0BC1\u0BA4\u0BBF\u0BB0\u0BC8", kind: "creature", gloss: "horse" },
        { word: "\u0BAA\u0BB0\u0BBF", kind: "creature", gloss: "steed" },
        { word: "\u0B95\u0BB4\u0BC1\u0BA4\u0BC8", kind: "creature", gloss: "donkey" },
        { word: "\u0B92\u0B9F\u0BCD\u0B9F\u0B95\u0BAE\u0BCD", kind: "creature", gloss: "camel" },
        { word: "\u0BAE\u0BBE\u0BA9\u0BCD", kind: "creature", gloss: "deer" },
        { word: "\u0BAE\u0BC1\u0BAF\u0BB2\u0BCD", kind: "creature", gloss: "rabbit" },
        { word: "\u0B85\u0BA3\u0BBF\u0BB2\u0BCD", kind: "creature", gloss: "squirrel" },
        { word: "\u0B95\u0BB0\u0B9F\u0BBF", kind: "creature", gloss: "bear" },
        { word: "\u0B93\u0BA8\u0BBE\u0BAF\u0BCD", kind: "creature", gloss: "wolf" },
        { word: "\u0BA8\u0BB0\u0BBF", kind: "creature", gloss: "fox" },
        { word: "\u0BAA\u0BA9\u0BCD\u0BB1\u0BBF", kind: "creature", gloss: "pig" },
        { word: "\u0B8E\u0BB0\u0BC1\u0BAE\u0BC8", kind: "creature", gloss: "buffalo" },
        { word: "\u0B95\u0BBE\u0BB3\u0BC8", kind: "creature", gloss: "bull" },
        { word: "\u0B95\u0BA9\u0BCD\u0BB1\u0BC1", kind: "creature", gloss: "calf" },
        { word: "\u0B9A\u0BC7\u0BB5\u0BB2\u0BCD", kind: "creature", gloss: "rooster" },
        { word: "\u0B95\u0BCB\u0BB4\u0BBF", kind: "creature", gloss: "hen" },
        { word: "\u0BAE\u0BAF\u0BBF\u0BB2\u0BCD", kind: "creature", gloss: "peacock" },
        { word: "\u0BAA\u0BC1\u0BB1\u0BBE", kind: "creature", gloss: "dove" },
        { word: "\u0B95\u0BBE\u0B95\u0BAE\u0BCD", kind: "creature", gloss: "crow" },
        { word: "\u0B95\u0BB4\u0BC1\u0B95\u0BC1", kind: "creature", gloss: "eagle" },
        { word: "\u0BAA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1", kind: "creature", gloss: "hawk" },
        { word: "\u0B86\u0BA8\u0BCD\u0BA4\u0BC8", kind: "creature", gloss: "owl" },
        { word: "\u0BB5\u0BCC\u0BB5\u0BBE\u0BB2\u0BCD", kind: "creature", gloss: "bat" },
        { word: "\u0BA4\u0BB5\u0BB3\u0BC8", kind: "creature", gloss: "frog" },
        { word: "\u0BAA\u0BBE\u0BAE\u0BCD\u0BAA\u0BC1", kind: "creature", gloss: "snake" },
        { word: "\u0BA8\u0BBE\u0B95\u0BAE\u0BCD", kind: "creature", gloss: "cobra" },
        { word: "\u0BA4\u0BC7\u0BB3\u0BCD", kind: "creature", gloss: "scorpion" },
        { word: "\u0B9A\u0BBF\u0BB2\u0BA8\u0BCD\u0BA4\u0BBF", kind: "creature", gloss: "spider" },
        { word: "\u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", kind: "creature", gloss: "ant" },
        { word: "\u0BB5\u0BA3\u0BCD\u0B9F\u0BC1", kind: "creature", gloss: "beetle" },
        { word: "\u0BA4\u0BC1\u0BAE\u0BCD\u0BAA\u0BBF", kind: "creature", gloss: "dragonfly" },
        { word: "\u0B9A\u0BBF\u0BB3\u0BCD\u0BB5\u0BA3\u0BCD\u0B9F\u0BC1", kind: "creature", gloss: "cricket" },
        { word: "\u0BAE\u0BC0\u0BA9\u0BCD", kind: "creature", gloss: "fish" },
        { word: "\u0B9A\u0BC1\u0BB1\u0BBE", kind: "creature", gloss: "shark" },
        { word: "\u0BA4\u0BBF\u0BAE\u0BBF\u0B99\u0BCD\u0B95\u0BB2\u0BAE\u0BCD", kind: "creature", gloss: "whale" },
        { word: "\u0BA8\u0BA3\u0BCD\u0B9F\u0BC1", kind: "creature", gloss: "crab" },
        { word: "\u0B86\u0BAE\u0BC8", kind: "creature", gloss: "turtle" },
        { word: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BC8", kind: "creature", gloss: "crocodile" },
        { word: "\u0B95\u0BCA\u0B9A\u0BC1", kind: "creature", gloss: "mosquito" },
        { word: "\u0BAA\u0BC1\u0BB4\u0BC1", kind: "creature", gloss: "worm" },
        { word: "\u0BA8\u0BA4\u0BCD\u0BA4\u0BC8", kind: "creature", gloss: "snail" },
        { word: "\u0BAA\u0BB2\u0BCD\u0BB2\u0BBF", kind: "creature", gloss: "gecko" },
        { word: "\u0B89\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", kind: "creature", gloss: "monitor lizard" },
        { word: "\u0B95\u0BC0\u0BB0\u0BBF", kind: "creature", gloss: "mongoose" },
        { word: "\u0B95\u0B99\u0BCD\u0B95\u0BBE\u0BB0\u0BC1", kind: "creature", gloss: "kangaroo" },
        { word: "\u0BB2\u0BBE\u0BAE\u0BBE", kind: "creature", gloss: "llama" },
        { word: "\u0BB5\u0BBE\u0BA4\u0BCD\u0BA4\u0BC1", kind: "creature", gloss: "duck" },
        { word: "\u0B85\u0BA9\u0BCD\u0BA9\u0BAE\u0BCD", kind: "creature", gloss: "swan" },
        { word: "\u0B95\u0BCA\u0B95\u0BCD\u0B95\u0BC1", kind: "creature", gloss: "stork" },
        { word: "\u0BAE\u0BA8\u0BCD\u0BA4\u0BBF", kind: "creature", gloss: "ape" },
        { word: "\u0B9A\u0BBF\u0BB1\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8", kind: "creature", gloss: "leopard" },
        { word: "\u0BA8\u0BC0\u0BB0\u0BCD\u0BAF\u0BBE\u0BA9\u0BC8", kind: "creature", gloss: "hippo" },
        { word: "\u0BAF\u0BBE\u0BB3\u0BBF", kind: "creature", gloss: "yali" },
        { word: "\u0BB5\u0BBE\u0BA9\u0BAE\u0BCD\u0BAA\u0BBE\u0B9F\u0BBF", kind: "creature", gloss: "skylark" },
        // --- PEOPLE, OCCUPATIONS & FIGURES ---
        { word: "\u0B85\u0BB0\u0B9A\u0BA9\u0BCD", kind: "creature", gloss: "king" },
        { word: "\u0BB0\u0BBE\u0BA3\u0BBF", kind: "creature", gloss: "queen" },
        { word: "\u0B85\u0BB0\u0B9A\u0BBF", kind: "creature", gloss: "empress" },
        { word: "\u0BB5\u0BC7\u0BA8\u0BCD\u0BA4\u0BA9\u0BCD", kind: "creature", gloss: "monarch" },
        { word: "\u0B87\u0BB3\u0BB5\u0BB0\u0B9A\u0BA9\u0BCD", kind: "creature", gloss: "prince" },
        { word: "\u0BB5\u0BC0\u0BB0\u0BA9\u0BCD", kind: "creature", gloss: "hero" },
        { word: "\u0B95\u0BB3\u0BCD\u0BB3\u0BA9\u0BCD", kind: "creature", gloss: "thief" },
        { word: "\u0B95\u0BCA\u0BB3\u0BCD\u0BB3\u0BC8\u0BAF\u0BA9\u0BCD", kind: "creature", gloss: "bandit" },
        { word: "\u0B92\u0BB1\u0BCD\u0BB1\u0BA9\u0BCD", kind: "creature", gloss: "spy" },
        { word: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BA9\u0BCD", kind: "creature", gloss: "madman" },
        { word: "\u0B9A\u0BBE\u0BAE\u0BBF\u0BAF\u0BBE\u0BB0\u0BCD", kind: "creature", gloss: "ascetic" },
        { word: "\u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BA9\u0BCD", kind: "creature", gloss: "sage" },
        { word: "\u0BAA\u0BC1\u0BB2\u0BB5\u0BA9\u0BCD", kind: "creature", gloss: "poet" },
        { word: "\u0B95\u0BB2\u0BC8\u0B9E\u0BA9\u0BCD", kind: "creature", gloss: "artist" },
        { word: "\u0B95\u0BC2\u0BA4\u0BCD\u0BA4\u0BA9\u0BCD", kind: "creature", gloss: "dancer" },
        { word: "\u0B9A\u0BA3\u0BCD\u0B9F\u0BBF\u0BAF\u0BA9\u0BCD", kind: "creature", gloss: "brawler" },
        { word: "\u0BAE\u0BB2\u0BCD\u0BB2\u0BA9\u0BCD", kind: "creature", gloss: "wrestler" },
        { word: "\u0B95\u0BC1\u0B9F\u0BBF\u0BAF\u0BA9\u0BCD", kind: "creature", gloss: "drunkard" },
        { word: "\u0BAA\u0BC7\u0BAF\u0BCD", kind: "creature", gloss: "ghost" },
        { word: "\u0BAA\u0BC2\u0BA4\u0BAE\u0BCD", kind: "creature", gloss: "ogre" },
        { word: "\u0BAE\u0BBE\u0BAF\u0BBE\u0BB5\u0BBF", kind: "creature", gloss: "illusionist" },
        { word: "\u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BB5\u0BBE\u0BA4\u0BBF", kind: "creature", gloss: "sorcerer" },
        { word: "\u0B95\u0BCB\u0BAE\u0BBE\u0BB3\u0BBF", kind: "creature", gloss: "clown" },
        { word: "\u0B9A\u0BBF\u0BAA\u0BCD\u0BAA\u0BBE\u0BAF\u0BCD", kind: "creature", gloss: "soldier" },
        { word: "\u0B95\u0BBE\u0BB5\u0BB2\u0BA9\u0BCD", kind: "creature", gloss: "sentinel" },
        { word: "\u0BAE\u0BBE\u0BB2\u0BC1\u0BAE\u0BBF", kind: "creature", gloss: "sailor" },
        { word: "\u0BAE\u0BC0\u0BA9\u0BB5\u0BA9\u0BCD", kind: "creature", gloss: "fisherman" },
        { word: "\u0BAE\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BA9\u0BCD", kind: "creature", gloss: "healer" },
        { word: "\u0BA4\u0BB2\u0BC8\u0BB5\u0BA9\u0BCD", kind: "creature", gloss: "chief" },
        { word: "\u0BB5\u0BC7\u0B9F\u0BA9\u0BCD", kind: "creature", gloss: "hunter" },
        { word: "\u0BA4\u0BC2\u0BA4\u0BA9\u0BCD", kind: "creature", gloss: "envoy" },
        // --- FLORA, HERBS & TREES ---
        { word: "\u0BA4\u0BBE\u0BAE\u0BB0\u0BC8", kind: "plant", gloss: "lotus" },
        { word: "\u0BAE\u0BB2\u0BCD\u0BB2\u0BBF\u0B95\u0BC8", kind: "plant", gloss: "jasmine" },
        { word: "\u0BAE\u0BC1\u0BB2\u0BCD\u0BB2\u0BC8", kind: "plant", gloss: "wild jasmine" },
        { word: "\u0B95\u0BBE\u0BA8\u0BCD\u0BA4\u0BB3\u0BCD", kind: "plant", gloss: "gloriosa lily" },
        { word: "\u0B95\u0BC1\u0BB1\u0BBF\u0B9E\u0BCD\u0B9A\u0BBF", kind: "plant", gloss: "kurinji" },
        { word: "\u0B9A\u0BC6\u0BA3\u0BCD\u0BAA\u0B95\u0BAE\u0BCD", kind: "plant", gloss: "champak" },
        { word: "\u0B95\u0BCA\u0BA9\u0BCD\u0BB1\u0BC8", kind: "plant", gloss: "cassia" },
        { word: "\u0BB0\u0BCB\u0B9C\u0BBE", kind: "plant", gloss: "rose" },
        { word: "\u0BAE\u0BB2\u0BB0\u0BCD", kind: "plant", gloss: "flower" },
        { word: "\u0BAA\u0BC2", kind: "plant", gloss: "blossom" },
        { word: "\u0B9A\u0BC6\u0B9F\u0BBF", kind: "plant", gloss: "shrub" },
        { word: "\u0BAE\u0BB0\u0BAE\u0BCD", kind: "plant", gloss: "tree" },
        { word: "\u0B86\u0BB2\u0BCD", kind: "plant", gloss: "banyan" },
        { word: "\u0B85\u0BB0\u0B9A\u0BC1", kind: "plant", gloss: "peepal" },
        { word: "\u0BB5\u0BC7\u0BAE\u0BCD\u0BAA\u0BC1", kind: "plant", gloss: "neem" },
        { word: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BA9\u0BAE\u0BCD", kind: "plant", gloss: "sandalwood" },
        { word: "\u0BAE\u0BC2\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BCD", kind: "plant", gloss: "bamboo" },
        { word: "\u0B95\u0BCA\u0B9F\u0BBF", kind: "plant", gloss: "vine" },
        { word: "\u0B87\u0BB2\u0BC8", kind: "plant", gloss: "leaf" },
        { word: "\u0BB5\u0BC7\u0BB0\u0BCD", kind: "plant", gloss: "root" },
        { word: "\u0BAE\u0BC1\u0BB3\u0BCD", kind: "plant", gloss: "thorn" },
        { word: "\u0BAA\u0BC1\u0BB2\u0BCD", kind: "plant", gloss: "grass" },
        { word: "\u0BA4\u0BB3\u0BBF\u0BB0\u0BCD", kind: "plant", gloss: "sprout" },
        { word: "\u0BB5\u0BBF\u0BA4\u0BC8", kind: "plant", gloss: "seed" },
        { word: "\u0BAA\u0BB4\u0BAE\u0BCD", kind: "plant", gloss: "fruit" },
        { word: "\u0BAE\u0BBE\u0BAE\u0BCD\u0BAA\u0BB4\u0BAE\u0BCD", kind: "plant", gloss: "mango" },
        { word: "\u0BB5\u0BBE\u0BB4\u0BC8", kind: "plant", gloss: "banana" },
        { word: "\u0BA4\u0BC6\u0BA9\u0BCD\u0BA9\u0BC8", kind: "plant", gloss: "coconut palm" },
        { word: "\u0BAA\u0BA9\u0BC8", kind: "plant", gloss: "palmyra palm" },
        { word: "\u0B95\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1", kind: "plant", gloss: "sugarcane" },
        { word: "\u0BA8\u0BC6\u0BB2\u0BCD", kind: "plant", gloss: "paddy" },
        { word: "\u0BAE\u0BBF\u0BB3\u0B95\u0BBE\u0BAF\u0BCD", kind: "plant", gloss: "chilli" },
        { word: "\u0BB5\u0BC6\u0B99\u0BCD\u0B95\u0BBE\u0BAF\u0BAE\u0BCD", kind: "plant", gloss: "onion" },
        { word: "\u0BAA\u0BC2\u0B9A\u0BA3\u0BBF", kind: "plant", gloss: "pumpkin" },
        { word: "\u0B95\u0BA4\u0BCD\u0BA4\u0BB0\u0BBF", kind: "plant", gloss: "brinjal" },
        { word: "\u0BAE\u0BC1\u0BB0\u0BC1\u0B99\u0BCD\u0B95\u0BC8", kind: "plant", gloss: "drumstick" },
        { word: "\u0BA8\u0BC6\u0BB2\u0BCD\u0BB2\u0BBF", kind: "plant", gloss: "gooseberry" },
        // --- WEAPONS, OBJECTS & ARTIFACTS ---
        { word: "\u0BB5\u0BC7\u0BB2\u0BCD", kind: "thing", gloss: "spear" },
        { word: "\u0BB5\u0BBE\u0BB3\u0BCD", kind: "thing", gloss: "sword" },
        { word: "\u0B95\u0BA4\u0BCD\u0BA4\u0BBF", kind: "thing", gloss: "knife" },
        { word: "\u0BB5\u0BBF\u0BB2\u0BCD", kind: "thing", gloss: "bow" },
        { word: "\u0B85\u0BAE\u0BCD\u0BAA\u0BC1", kind: "thing", gloss: "arrow" },
        { word: "\u0B95\u0BC7\u0B9F\u0BAF\u0BAE\u0BCD", kind: "thing", gloss: "shield" },
        { word: "\u0B95\u0BA4\u0BC8", kind: "thing", gloss: "mace" },
        { word: "\u0B95\u0BB5\u0B9A\u0BAE\u0BCD", kind: "thing", gloss: "armour" },
        { word: "\u0B9A\u0B99\u0BCD\u0B95\u0BC1", kind: "thing", gloss: "conch" },
        { word: "\u0BAE\u0BC1\u0BB0\u0B9A\u0BC1", kind: "thing", gloss: "war drum" },
        { word: "\u0BAE\u0BA4\u0BCD\u0BA4\u0BB3\u0BAE\u0BCD", kind: "thing", gloss: "drum" },
        { word: "\u0BAA\u0BC1\u0BB2\u0BCD\u0BB2\u0BBE\u0B99\u0BCD\u0B95\u0BC1\u0BB4\u0BB2\u0BCD", kind: "thing", gloss: "flute" },
        { word: "\u0BB5\u0BC0\u0BA3\u0BC8", kind: "thing", gloss: "veena" },
        { word: "\u0BAE\u0BA3\u0BBF", kind: "thing", gloss: "bell" },
        { word: "\u0BAE\u0B95\u0BC1\u0B9F\u0BAE\u0BCD", kind: "thing", gloss: "crown" },
        { word: "\u0B85\u0BB0\u0BBF\u0BAF\u0BA3\u0BC8", kind: "thing", gloss: "throne" },
        { word: "\u0BAE\u0BBE\u0BB2\u0BC8", kind: "thing", gloss: "garland" },
        { word: "\u0B95\u0BB4\u0BB2\u0BCD", kind: "thing", gloss: "warrior anklet" },
        { word: "\u0B9A\u0B9F\u0BCD\u0B9F\u0BC8", kind: "thing", gloss: "shirt" },
        { word: "\u0BA4\u0BCA\u0BAA\u0BCD\u0BAA\u0BBF", kind: "thing", gloss: "hat" },
        { word: "\u0B9A\u0BC6\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1", kind: "thing", gloss: "sandal" },
        { word: "\u0BB5\u0BC7\u0B9F\u0BCD\u0B9F\u0BBF", kind: "thing", gloss: "dhoti" },
        { word: "\u0BAA\u0BC8", kind: "thing", gloss: "bag" },
        { word: "\u0B95\u0BC1\u0B9F\u0BC8", kind: "thing", gloss: "umbrella" },
        { word: "\u0B95\u0BA3\u0BCD\u0BA3\u0BBE\u0B9F\u0BBF", kind: "thing", gloss: "spectacles" },
        { word: "\u0B95\u0B9F\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD", kind: "thing", gloss: "clock" },
        { word: "\u0BB5\u0BBF\u0BB3\u0B95\u0BCD\u0B95\u0BC1", kind: "thing", gloss: "lamp" },
        { word: "\u0BAA\u0BBE\u0BA9\u0BC8", kind: "thing", gloss: "pot" },
        { word: "\u0B95\u0BC1\u0B9F\u0BAE\u0BCD", kind: "thing", gloss: "pitcher" },
        { word: "\u0B95\u0BB2\u0B9A\u0BAE\u0BCD", kind: "thing", gloss: "chalice/urn" },
        { word: "\u0B95\u0BB0\u0BA3\u0BCD\u0B9F\u0BBF", kind: "thing", gloss: "ladle" },
        { word: "\u0BA4\u0B9F\u0BCD\u0B9F\u0BC1", kind: "thing", gloss: "plate" },
        { word: "\u0B9A\u0BBE\u0BB5\u0BBF", kind: "thing", gloss: "key" },
        { word: "\u0BAA\u0BC2\u0B9F\u0BCD\u0B9F\u0BC1", kind: "thing", gloss: "lock" },
        { word: "\u0B95\u0BAF\u0BBF\u0BB1\u0BC1", kind: "thing", gloss: "rope" },
        { word: "\u0B8F\u0BA3\u0BBF", kind: "thing", gloss: "ladder" },
        { word: "\u0B9A\u0B95\u0BCD\u0B95\u0BB0\u0BAE\u0BCD", kind: "thing", gloss: "wheel" },
        { word: "\u0BB5\u0BA3\u0BCD\u0B9F\u0BBF", kind: "thing", gloss: "cart" },
        { word: "\u0BAA\u0B9F\u0B95\u0BC1", kind: "thing", gloss: "boat" },
        { word: "\u0BA4\u0BCB\u0BA3\u0BBF", kind: "thing", gloss: "skiff" },
        { word: "\u0BA4\u0BC7\u0BB0\u0BCD", kind: "thing", gloss: "chariot" },
        { word: "\u0BAE\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC8", kind: "thing", gloss: "seal" },
        { word: "\u0BA8\u0BBE\u0BA3\u0BAF\u0BAE\u0BCD", kind: "thing", gloss: "coin" },
        { word: "\u0BAA\u0BC1\u0BA4\u0BCD\u0BA4\u0B95\u0BAE\u0BCD", kind: "thing", gloss: "book" },
        { word: "\u0B9A\u0BC1\u0BB5\u0B9F\u0BBF", kind: "thing", gloss: "palm manuscript" },
        { word: "\u0B9A\u0BBF\u0BB2\u0BC8", kind: "thing", gloss: "statue" },
        { word: "\u0B8A\u0B9A\u0BB2\u0BCD", kind: "thing", gloss: "swing" },
        { word: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BB0\u0BCD", kind: "thing", gloss: "riddle" },
        { word: "\u0BAA\u0BCA\u0BB1\u0BBF", kind: "thing", gloss: "mechanism/spark" },
        // --- PLACES, LANDSCAPES & GEOGRAPHY ---
        { word: "\u0B95\u0B9F\u0BB2\u0BCD", kind: "place", gloss: "sea" },
        { word: "\u0BAE\u0BB2\u0BC8", kind: "place", gloss: "mountain" },
        { word: "\u0B9A\u0BBF\u0B95\u0BB0\u0BAE\u0BCD", kind: "place", gloss: "peak" },
        { word: "\u0B86\u0BB1\u0BC1", kind: "place", gloss: "river" },
        { word: "\u0B85\u0BB0\u0BC1\u0BB5\u0BBF", kind: "place", gloss: "waterfall" },
        { word: "\u0B95\u0BC1\u0BB3\u0BAE\u0BCD", kind: "place", gloss: "pond" },
        { word: "\u0BAA\u0BCA\u0BAF\u0BCD\u0B95\u0BC8", kind: "place", gloss: "lotus lake" },
        { word: "\u0B95\u0BBF\u0BA3\u0BB1\u0BC1", kind: "place", gloss: "well" },
        { word: "\u0BA4\u0BC1\u0BB1\u0BC8", kind: "place", gloss: "ford/port" },
        { word: "\u0B95\u0BB0\u0BC8", kind: "place", gloss: "shore" },
        { word: "\u0B95\u0BBE\u0B9F\u0BC1", kind: "place", gloss: "forest" },
        { word: "\u0B95\u0BBE\u0BA9\u0B95\u0BAE\u0BCD", kind: "place", gloss: "deep jungle" },
        { word: "\u0BB5\u0BAF\u0BB2\u0BCD", kind: "place", gloss: "field" },
        { word: "\u0BA4\u0BC0\u0BB5\u0BC1", kind: "place", gloss: "island" },
        { word: "\u0B95\u0BC1\u0B95\u0BC8", kind: "place", gloss: "cave" },
        { word: "\u0B95\u0BCB\u0B9F\u0BCD\u0B9F\u0BC8", kind: "place", gloss: "fort" },
        { word: "\u0B85\u0BB0\u0BA3\u0BCD\u0BAE\u0BA9\u0BC8", kind: "place", gloss: "palace" },
        { word: "\u0BAA\u0BBE\u0B9A\u0BB1\u0BC8", kind: "place", gloss: "war camp" },
        { word: "\u0B8A\u0BB0\u0BCD", kind: "place", gloss: "settlement" },
        { word: "\u0BA8\u0BBE\u0B9F\u0BC1", kind: "place", gloss: "realm" },
        { word: "\u0B9A\u0BCB\u0BB2\u0BC8", kind: "place", gloss: "grove" },
        { word: "\u0BAA\u0BBE\u0BB2\u0BC8", kind: "place", gloss: "desert" },
        { word: "\u0BB5\u0BBE\u0BA9\u0BAE\u0BCD", kind: "place", gloss: "sky" },
        { word: "\u0BAE\u0BC7\u0B95\u0BAE\u0BCD", kind: "place", gloss: "cloud" },
        { word: "\u0B9A\u0BC1\u0BB4\u0BBF", kind: "place", gloss: "whirlpool" },
        { word: "\u0BAA\u0BB3\u0BCD\u0BB3\u0BA4\u0BCD\u0BA4\u0BBE\u0B95\u0BCD\u0B95\u0BC1", kind: "place", gloss: "valley" },
        { word: "\u0BB5\u0BC6\u0BB3\u0BBF", kind: "place", gloss: "meadow/expanse" },
        { word: "\u0BAE\u0BC1\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD", kind: "place", gloss: "courtyard" }
      ];
    }
  });

  // index.js
  var require_sillyname_tamil = __commonJS({
    "index.js"(exports, module) {
      "use strict";
      var join = require_sandhi();
      var romanize = require_romanize();
      var adjectives = require_adjectives();
      var nouns = require_nouns();
      var byKind = nouns.reduce(function(acc, noun) {
        (acc[noun.kind] = acc[noun.kind] || []).push(noun);
        return acc;
      }, {});
      var poolFor = adjectives.map(function(adj) {
        return adj.modifies.reduce(function(pool, kind) {
          return pool.concat(byKind[kind] || []);
        }, []);
      });
      function pick(list, random) {
        return list[Math.floor(random() * list.length)];
      }
      function romanizePhrase(text) {
        return text.split(" ").map(romanize).join(" ");
      }
      function applyStyle(latin, style) {
        var parts = latin.split(" ");
        if (style === "snake")
          return parts.join("_");
        if (style === "kebab")
          return parts.join("-");
        if (style === "camel") {
          return parts.map(function(part, i) {
            return i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1);
          }).join("");
        }
        return latin;
      }
      function generateName(options) {
        if (typeof options === "function") {
          options = { random: options };
        }
        options = options || {};
        var random = options.random || Math.random;
        var format = options.format || "tamil";
        var style = options.style || "plain";
        var index = Math.floor(random() * adjectives.length);
        var adjective = adjectives[index];
        var pool = poolFor[index];
        if (options.kind) {
          pool = pool.filter(function(noun2) {
            return noun2.kind === options.kind;
          });
          if (!pool.length)
            pool = byKind[options.kind] || nouns;
        }
        var noun = pick(pool, random);
        var tamil = join(adjective.stem, adjective.join, noun.word);
        if (format === "tamil")
          return tamil;
        var latin = applyStyle(romanizePhrase(tamil), style);
        if (format === "latin")
          return latin;
        return {
          tamil,
          latin,
          gloss: adjective.gloss + " " + noun.gloss
        };
      }
      generateName.many = function(count, options) {
        options = options || {};
        var seen = {};
        var out = [];
        var attempts = 0;
        var ceiling = count * 200 + 1e3;
        while (out.length < count) {
          if (++attempts > ceiling) {
            throw new Error(
              "could not generate " + count + " distinct names; the word lists support roughly " + generateName.combinations() + " combinations"
            );
          }
          var name = generateName(options);
          var key = typeof name === "string" ? name : name.tamil;
          if (seen[key])
            continue;
          seen[key] = true;
          out.push(name);
        }
        return out;
      };
      generateName.combinations = function() {
        return poolFor.reduce(function(total, pool) {
          return total + pool.length;
        }, 0);
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
    }
  });

  // demo/entry.js
  var require_entry = __commonJS({
    "demo/entry.js"(exports, module) {
      var generateName = require_sillyname_tamil();
      var join = require_sandhi();
      var romanize = require_romanize();
      var adjectives = require_adjectives();
      var nouns = require_nouns();
      var RULES = {
        nasal: {
          label: "nasal",
          tamil: "\u0BAE\u0BC6\u0BB2\u0BCD\u0BB2\u0BBF\u0BA9\u0BAE\u0BCD",
          rule: "A homorganic nasal appears before \u0B95 / \u0B9A / \u0BA4 / \u0BAA."
        },
        double: {
          label: "double",
          tamil: "\u0BB5\u0BB2\u0BCD\u0BB2\u0BBF\u0BA9\u0BAE\u0BCD \u0BAE\u0BBF\u0B95\u0BC1\u0BA4\u0BB2\u0BCD",
          rule: "The hard consonant doubles across the seam."
        },
        ran: {
          label: "ran",
          tamil: "\u0BA9\u0BCD \u2192 \u0BB1\u0BCD",
          rule: "A \u0BA9\u0BCD-final stem turns its \u0BA9\u0BCD into \u0BB1\u0BCD before a hard consonant."
        },
        plain: {
          label: "plain",
          tamil: "\u0B87\u0BAF\u0BB2\u0BCD\u0BAA\u0BC1",
          rule: "Nothing changes at the seam."
        },
        phrase: {
          label: "phrase",
          tamil: "\u0BAA\u0BC6\u0BAF\u0BB0\u0BC6\u0B9A\u0BCD\u0B9A\u0BAE\u0BCD",
          rule: "A relative participle stays its own word."
        }
      };
      var VOWEL_RULE = {
        label: "vowel",
        tamil: "\u0B89\u0B9F\u0BAE\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BC6\u0BAF\u0BCD",
        rule: "A vowel-initial noun needs a bridging consonant."
      };
      function commonPrefix(a, b) {
        var i = 0;
        while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i))
          i++;
        return i;
      }
      function commonSuffix(a, b) {
        var i = 0;
        while (i < a.length && i < b.length && a.charAt(a.length - 1 - i) === b.charAt(b.length - 1 - i))
          i++;
        return i;
      }
      function segment(stem, noun, joined) {
        var head = commonPrefix(joined, stem);
        var tail = commonSuffix(joined, noun);
        if (head + tail > joined.length)
          tail = joined.length - head;
        return {
          head: joined.slice(0, head),
          seam: joined.slice(head, joined.length - tail),
          tail: joined.slice(joined.length - tail)
        };
      }
      var VOWELS = "\u0B85\u0B86\u0B87\u0B88\u0B89\u0B8A\u0B8E\u0B8F\u0B90\u0B92\u0B93\u0B94";
      function build(options) {
        options = options || {};
        var pool = adjectives;
        var adjective = pool[Math.floor(Math.random() * pool.length)];
        var candidates = nouns.filter(function(noun2) {
          if (options.kind)
            return noun2.kind === options.kind;
          return adjective.modifies.indexOf(noun2.kind) > -1;
        });
        if (!candidates.length)
          candidates = nouns;
        var noun = candidates[Math.floor(Math.random() * candidates.length)];
        var tamil = join(adjective.stem, adjective.join, noun.word);
        var vowelInitial = VOWELS.indexOf(noun.word.charAt(0)) > -1;
        return {
          tamil,
          latin: tamil.split(" ").map(romanize).join(" "),
          gloss: adjective.gloss + " " + noun.gloss,
          stem: adjective.stem,
          stemWord: adjective.word,
          stemGloss: adjective.gloss,
          noun: noun.word,
          nounGloss: noun.gloss,
          nounKind: noun.kind,
          joinClass: adjective.join,
          rule: vowelInitial && adjective.join !== "phrase" ? VOWEL_RULE : RULES[adjective.join],
          parts: segment(adjective.stem, noun.word, tamil)
        };
      }
      module.exports = {
        build,
        romanize,
        join,
        rules: RULES,
        counts: {
          adjectives: adjectives.length,
          nouns: nouns.length,
          combinations: generateName.combinations()
        }
      };
    }
  });
  return require_entry();
})();
