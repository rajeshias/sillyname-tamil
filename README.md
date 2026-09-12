# sillyname-tamil

A random silly Tamil name generator that forms real Tamil compounds.

Tamil does not build names by putting two words next to each other. A modifier
takes an attributive form, and the seam between the two words changes according
to what sits on either side of it — கரு + குயில் is **கருங்குயில்**, not
*கருகுயில்*. This package applies those rules (புணர்ச்சி), so the names it
produces read as Tamil rather than as two words in a row.

**[Try it →](https://rajeshias.github.io/sillyname-tamil/)** — the demo highlights
the consonant each compound grows at its seam and names the rule that put it there.

```
npm i sillyname-tamil
```

## Usage

```javascript
const generateName = require('sillyname-tamil');

generateName();
// 'கருங்குயில்'
```

ES module:

```javascript
import generateName from 'sillyname-tamil';
```

### Latin transliteration

Most sites will not accept Tamil script in a username, so names can be
romanized. Tamil script does not mark voicing — க is `k` at the start of a word
and `g` between vowels — and the transliterator reproduces that.

```javascript
generateName({ format: 'latin' });   // 'pasungili'
generateName({ format: 'both' });
// { tamil: 'பசுங்கிளி', latin: 'pasungili', gloss: 'green parrot' }
```

### Options

| Option   | Values | Default | |
|---|---|---|---|
| `format` | `'tamil'`, `'latin'`, `'both'` | `'tamil'` | Output shape |
| `style`  | `'plain'`, `'camel'`, `'snake'`, `'kebab'` | `'plain'` | How to join a two-word name in Latin output |
| `kind`   | `'creature'`, `'plant'`, `'thing'`, `'place'` | any | Restrict the head noun |
| `random` | `() => number` | `Math.random` | Seedable generator |

`style` only affects names that come out as two words — compounds are a single
word already and are returned unchanged.

```javascript
// பறக்கும் ஆடு
generateName({ format: 'latin' });                  // 'parakkum aadu'
generateName({ format: 'latin', style: 'camel' });  // 'parakkumAadu'
generateName({ format: 'latin', style: 'snake' });  // 'parakkum_aadu'

generateName({ kind: 'creature' });                 // 'முரட்டுக்காளை'
```

### Batches

```javascript
generateName.many(5, { format: 'latin' });
// [ 'venmeen', 'sooramaadu', 'pazhanathai', 'kirukkunari', 'malaikkazhudhai' ]

generateName.combinations();   // 7551
```

`many` returns distinct names and throws rather than looping forever if you ask
for more than the word lists can produce.

### Reproducible output

Pass any function returning a float in `[0, 1)`:

```javascript
const seedRandom = require('seed-random');
generateName({ random: seedRandom('hello') });  // same name every time
```

## Sample output

| Tamil | Latin | Meaning |
|---|---|---|
| கிறுக்குநரி | kirukkunari | cracked fox |
| புயல்மயில் | puyalmayil | storm peacock |
| குள்ளக்கொக்கு | kullakkokku | stumpy stork |
| பாடும் மான் | paadum maan | singing deer |
| சக்கைப்பானை | sakkaippaanai | worn-out pot |
| தூங்கும் கழுகு | thoongum kazhugu | sleeping eagle |
| பழக்குடியன் | pazhakkudiyan | old drunkard |
| மஞ்சள்பித்தன் | manjalpithan | yellow madman |

## How the joining works

Each modifier stores the attributive stem it uses in compounds plus the class of
junction that stem takes:

| Class | Rule | Example |
|---|---|---|
| `nasal` | homorganic nasal before க/ச/த/ப | கரு + குயில் → கரு**ங்**குயில் |
| `double` | geminate the hard consonant | நீல + தாமரை → நீல**த்**தாமரை |
| `ran` | ன்-final stem, ன் → ற் | பொன் + கிளி → பொ**ற்**கிளி |
| `plain` | no change at the seam | வெண் + மயில் → வெண்மயில் |
| `phrase` | stays two words | பறக்கும் பூனை |

A vowel-initial noun takes a bridging consonant (உடம்படுமெய்) instead: a glide
after a vowel-final stem (கரு + எலி → கரு**வெ**லி), gemination after ண்/ன்
(பொன் + ஆடை → பொ**ன்னா**டை), and plain resyllabification otherwise
(மஞ்சள் + ஆமை → மஞ்சளாமை).

These classes are **assigned by hand in `data/adjectives.js`, not derived from
spelling**, because Tamil sandhi is lexical. Two examples of why derivation
fails: ஜொலிக்கும் ends in ம் but is a relative participle, so stripping ம் to
make it attributive yields the nonsense ஜொலிக்கு; and பொன் + சிலை is பொற்சிலை,
not பொன்சிலை. If you add words, assign the class deliberately and add a case to
the table in `test/index.js`.

Modifiers also declare which noun categories they may describe, so colours land
on creatures and plants and temperaments land on creatures. Pairing at random
across every noun is what produced output like "clay cloud" in earlier versions.

## Lower-level exports

```javascript
generateName.join('கரு', 'nasal', 'குயில்');  // 'கருங்குயில்'
generateName.romanize('செந்தாமரை');           // 'senthaamarai'
generateName.adjectives;                      // the modifier list
generateName.nouns;                           // the noun list
```

## Notes

The transliterator targets readable usernames, not ISO 15919: it does not
distinguish ஒ from ஓ or எ from ஏ, and it simplifies some geminates (ச்ச → `ch`).
If you need a reversible scheme, romanize with a dedicated library instead.

TypeScript definitions ship with the package.

## Credits

Ported from [sillyname](https://github.com/tmpvar/sillyname) by Geoff Wagstaff.

## License

MIT
