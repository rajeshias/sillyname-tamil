'use strict';

// Modifiers, each stored with the attributive stem actually used in compounds
// and the junction class that stem takes. `word` is the citation form a
// dictionary would list; `stem` is what the generator joins.
//
// join classes:
//   nasal  - homorganic nasal before க/ச/த/ப   (கரு + குயில் -> கருங்குயில்)
//   double - geminate the hard consonant        (நீல + தாமரை -> நீலத்தாமரை)
//   ran    - ன்-final stem, ன் -> ற்            (பொன் + கிளி -> பொற்கிளி)
//   plain  - no change at the seam              (வெண் + மயில் -> வெண்மயில்)
//   phrase - stays a separate word with a space (பறக்கும் பூனை)
//
// `modifies` restricts which noun categories this may describe. Pairing at
// random across every noun produces noise like "clay cloud"; the tags keep a
// compound close enough to plausible that it reads as a name.

module.exports = [
  // Colours
  { word: 'கருப்பு', stem: 'கரு', join: 'nasal', gloss: 'black', modifies: ['creature', 'plant', 'thing'] },
  { word: 'சிவப்பு', stem: 'செ', join: 'nasal', gloss: 'red', modifies: ['creature', 'plant', 'thing'] },
  { word: 'வெள்ளை', stem: 'வெண்', join: 'plain', gloss: 'white', modifies: ['creature', 'plant', 'thing'] },
  { word: 'பச்சை', stem: 'பசு', join: 'nasal', gloss: 'green', modifies: ['creature', 'plant'] },
  { word: 'நீலம்', stem: 'நீல', join: 'double', gloss: 'blue', modifies: ['creature', 'plant', 'place'] },
  { word: 'மஞ்சள்', stem: 'மஞ்சள்', join: 'plain', gloss: 'yellow', modifies: ['creature', 'plant', 'thing'] },
  { word: 'பொன்', stem: 'பொன்', join: 'ran', gloss: 'golden', modifies: ['creature', 'plant', 'thing'] },
  { word: 'தங்கம்', stem: 'தங்க', join: 'double', gloss: 'gold', modifies: ['creature', 'thing'] },
  { word: 'வெள்ளி', stem: 'வெள்ளி', join: 'double', gloss: 'silver', modifies: ['creature', 'thing'] },
  { word: 'செம்பு', stem: 'செம்பு', join: 'double', gloss: 'copper', modifies: ['thing'] },
  { word: 'இரும்பு', stem: 'இரும்பு', join: 'double', gloss: 'iron', modifies: ['creature', 'thing'] },
  { word: 'பித்தளை', stem: 'பித்தளை', join: 'double', gloss: 'brass', modifies: ['thing'] },
  { word: 'ஊதா', stem: 'ஊதா', join: 'double', gloss: 'purple', modifies: ['creature', 'plant'] },
  { word: 'சாம்பல்', stem: 'சாம்பல்', join: 'plain', gloss: 'ashen', modifies: ['creature', 'thing'] },
  { word: 'பழுப்பு', stem: 'பழுப்பு', join: 'double', gloss: 'brown', modifies: ['creature', 'thing'] },
  { word: 'வைரம்', stem: 'வைர', join: 'double', gloss: 'diamond', modifies: ['creature', 'thing'] },
  { word: 'மரகதம்', stem: 'மரகத', join: 'double', gloss: 'emerald', modifies: ['thing'] },
  { word: 'மாணிக்கம்', stem: 'மாணிக்க', join: 'double', gloss: 'ruby', modifies: ['thing'] },
  { word: 'முத்து', stem: 'முத்து', join: 'double', gloss: 'pearl', modifies: ['creature', 'thing'] },
  { word: 'பவளம்', stem: 'பவள', join: 'double', gloss: 'coral', modifies: ['creature', 'thing'] },
  { word: 'பளிங்கு', stem: 'பளிங்கு', join: 'double', gloss: 'crystal', modifies: ['creature', 'thing'] },
  { word: 'கருநீலம்', stem: 'கருநீல', join: 'double', gloss: 'navy', modifies: ['creature', 'place'] },
  { word: 'இளஞ்சிவப்பு', stem: 'இளஞ்சிவப்பு', join: 'double', gloss: 'pink', modifies: ['creature', 'plant'] },

  // --- SIZE, SHAPE & FORM ---
  { word: 'பெரிய', stem: 'பெரு', join: 'nasal', gloss: 'great', modifies: ['creature', 'place', 'thing'] },
  { word: 'சின்ன', stem: 'சின்ன', join: 'double', gloss: 'little', modifies: ['creature', 'thing'] },
  { word: 'குட்டி', stem: 'குட்டி', join: 'double', gloss: 'tiny', modifies: ['creature', 'thing'] },
  { word: 'நீண்ட', stem: 'நெடு', join: 'nasal', gloss: 'long/tall', modifies: ['creature', 'place', 'thing'] },
  { word: 'குள்ள', stem: 'குள்ள', join: 'double', gloss: 'stumpy', modifies: ['creature'] },
  { word: 'குட்டை', stem: 'குட்டை', join: 'double', gloss: 'short', modifies: ['creature', 'thing'] },
  { word: 'ஒல்லி', stem: 'ஒல்லி', join: 'double', gloss: 'skinny', modifies: ['creature'] },
  { word: 'கொழுத்த', stem: 'கொழு', join: 'nasal', gloss: 'plump', modifies: ['creature'] },
  { word: 'பருத்த', stem: 'பரு', join: 'nasal', gloss: 'bulky', modifies: ['creature', 'thing'] },
  { word: 'மொட்டை', stem: 'மொட்டை', join: 'double', gloss: 'bald', modifies: ['creature', 'thing'] },
  { word: 'உருண்டை', stem: 'உருண்டை', join: 'double', gloss: 'round', modifies: ['creature', 'thing'] },
  { word: 'தட்டை', stem: 'தட்டை', join: 'double', gloss: 'flat', modifies: ['creature', 'thing'] },
  { word: 'மா', stem: 'மா', join: 'double', gloss: 'grand', modifies: ['creature', 'place'] },
  { word: 'அரை', stem: 'அரை', join: 'double', gloss: 'half', modifies: ['creature', 'thing'] },
  { word: 'உயர்', stem: 'உயர்', join: 'plain', gloss: 'lofty', modifies: ['creature', 'place'] },
  { word: 'திண்', stem: 'திண்', join: 'plain', gloss: 'dense/stout', modifies: ['creature', 'thing'] },

  // --- TEMPERAMENT, SPIRIT & MYSTICISM ---
  { word: 'வீரம்', stem: 'வீர', join: 'double', gloss: 'valiant', modifies: ['creature'] },
  { word: 'தீர', stem: 'தீர', join: 'double', gloss: 'intrepid', modifies: ['creature'] },
  { word: 'முரடு', stem: 'முரட்டு', join: 'double', gloss: 'brutish', modifies: ['creature'] },
  { word: 'சோம்பல்', stem: 'சோம்பேறி', join: 'double', gloss: 'lazy', modifies: ['creature'] },
  { word: 'கிறுக்கு', stem: 'கிறுக்கு', join: 'double', gloss: 'cracked', modifies: ['creature'] },
  { word: 'சுட்டி', stem: 'சுட்டி', join: 'double', gloss: 'impish', modifies: ['creature'] },
  { word: 'குறும்பு', stem: 'குறும்பு', join: 'double', gloss: 'naughty', modifies: ['creature'] },
  { word: 'துடுக்கு', stem: 'துடுக்கு', join: 'double', gloss: 'feisty', modifies: ['creature'] },
  { word: 'பேய்', stem: 'பேய்', join: 'double', gloss: 'demon', modifies: ['creature', 'thing'] },
  { word: 'பித்து', stem: 'பித்து', join: 'double', gloss: 'mad', modifies: ['creature'] },
  { word: 'திமிர்', stem: 'திமிர்', join: 'plain', gloss: 'arrogant', modifies: ['creature'] },
  { word: 'வெறி', stem: 'வெறி', join: 'double', gloss: 'frenzied', modifies: ['creature'] },
  { word: 'சூரம்', stem: 'சூர', join: 'double', gloss: 'fierce', modifies: ['creature'] },
  { word: 'கோபம்', stem: 'கோப', join: 'double', gloss: 'wrathful', modifies: ['creature'] },
  { word: 'கொடுமை', stem: 'கொடு', join: 'nasal', gloss: 'grim/cruel', modifies: ['creature', 'place', 'thing'] },
  { word: 'மந்தம்', stem: 'மந்த', join: 'double', gloss: 'dull', modifies: ['creature'] },
  { word: 'பஞ்சு', stem: 'பஞ்சு', join: 'double', gloss: 'cottony', modifies: ['creature', 'thing'] },
  { word: 'அடங்கா', stem: 'அடங்கா', join: 'double', gloss: 'untamed', modifies: ['creature'] },
  { word: 'கில்லாடி', stem: 'கில்லாடி', join: 'double', gloss: 'wily', modifies: ['creature'] },
  { word: 'கள்ள', stem: 'கள்ள', join: 'double', gloss: 'stealthy/sly', modifies: ['creature', 'thing'] },
  { word: 'சக்கை', stem: 'சக்கை', join: 'double', gloss: 'worn-out', modifies: ['creature', 'thing'] },
  { word: 'ஏமாளி', stem: 'ஏமாளி', join: 'double', gloss: 'gullible', modifies: ['creature'] },
  { word: 'மாய', stem: 'மாய', join: 'double', gloss: 'mystic/phantom', modifies: ['creature', 'place', 'thing'] },
  { word: 'மந்திர', stem: 'மந்திர', join: 'double', gloss: 'magical', modifies: ['creature', 'thing'] },
  { word: 'சாந்த', stem: 'சாந்த', join: 'double', gloss: 'gentle/serene', modifies: ['creature'] },

  // --- TEXTURE, SENSES, AGE & PURITY ---
  { word: 'கடினம்', stem: 'கடின', join: 'double', gloss: 'hard', modifies: ['creature', 'thing'] },
  { word: 'மென்மை', stem: 'மென்', join: 'plain', gloss: 'soft/tender', modifies: ['creature', 'plant', 'thing'] },
  { word: 'கூர்மை', stem: 'கூர்', join: 'double', gloss: 'razor/sharp', modifies: ['creature', 'thing'] },
  { word: 'ஈரம்', stem: 'ஈர', join: 'double', gloss: 'damp', modifies: ['creature', 'thing'] },
  { word: 'சுடு', stem: 'சுடு', join: 'double', gloss: 'scalding', modifies: ['thing'] },
  { word: 'குளிர்', stem: 'குளிர்', join: 'plain', gloss: 'cold', modifies: ['creature', 'thing', 'place'] },
  { word: 'புது', stem: 'புது', join: 'double', gloss: 'new', modifies: ['creature', 'thing'] },
  { word: 'பழைய', stem: 'பழ', join: 'double', gloss: 'old', modifies: ['thing', 'creature'] },
  { word: 'கிழ', stem: 'கிழ', join: 'double', gloss: 'aged', modifies: ['creature'] },
  { word: 'இளம்', stem: 'இள', join: 'nasal', gloss: 'young', modifies: ['creature', 'plant'] },
  { word: 'தூய', stem: 'தூய', join: 'double', gloss: 'pure', modifies: ['creature', 'thing'] },
  { word: 'நறுமணம்', stem: 'நறு', join: 'nasal', gloss: 'sweet-scented', modifies: ['plant', 'thing'] },
  { word: 'கார', stem: 'கார', join: 'double', gloss: 'pungent/fiery', modifies: ['creature', 'thing'] },

  // --- NATURE, REALMS & ELEMENTS ---
  { word: 'மலை', stem: 'மலை', join: 'double', gloss: 'mountain', modifies: ['creature', 'place'] },
  { word: 'கடல்', stem: 'கடல்', join: 'plain', gloss: 'sea', modifies: ['creature', 'place'] },
  { word: 'ஆற்று', stem: 'ஆற்று', join: 'double', gloss: 'river', modifies: ['creature', 'place'] },
  { word: 'காட்டு', stem: 'காட்டு', join: 'double', gloss: 'wild', modifies: ['creature', 'plant'] },
  { word: 'நாட்டு', stem: 'நாட்டு', join: 'double', gloss: 'homespun', modifies: ['creature', 'thing'] },
  { word: 'மழை', stem: 'மழை', join: 'double', gloss: 'rain', modifies: ['creature', 'place'] },
  { word: 'நிலா', stem: 'நிலா', join: 'double', gloss: 'moonlit', modifies: ['creature', 'thing'] },
  { word: 'சூரிய', stem: 'சூரிய', join: 'double', gloss: 'solar', modifies: ['creature', 'thing'] },
  { word: 'நெருப்பு', stem: 'நெருப்பு', join: 'double', gloss: 'fire', modifies: ['creature', 'thing'] },
  { word: 'இடி', stem: 'இடி', join: 'double', gloss: 'thunder', modifies: ['creature'] },
  { word: 'புயல்', stem: 'புயல்', join: 'plain', gloss: 'storm', modifies: ['creature'] },
  { word: 'பனி', stem: 'பனி', join: 'double', gloss: 'frosty', modifies: ['creature', 'place'] },
  { word: 'கார்', stem: 'கார்', join: 'plain', gloss: 'dark-cloud', modifies: ['creature', 'place'] },
  { word: 'வான்', stem: 'வான்', join: 'plain', gloss: 'celestial/sky', modifies: ['creature', 'place'] },
  { word: 'விண்', stem: 'விண்', join: 'plain', gloss: 'cosmic/star', modifies: ['creature', 'thing'] },
  { word: 'மின்', stem: 'மின்', join: 'ran', gloss: 'lightning/spark', modifies: ['creature', 'thing'] },
  { word: 'இருள்', stem: 'இருள்', join: 'plain', gloss: 'shadow/gloom', modifies: ['creature', 'place'] },
  { word: 'சோலை', stem: 'சோலை', join: 'double', gloss: 'grove', modifies: ['creature', 'plant'] },
  { word: 'பாலை', stem: 'பாலை', join: 'double', gloss: 'desert', modifies: ['creature', 'place'] },

  // --- RELATIVE PARTICIPLES (VERBAL ADJECTIVES) ---
  // Stays a separate word with a space (e.g. பறக்கும் பூனை, எரியும் வாள்).
  { word: 'பறக்கும்', stem: 'பறக்கும்', join: 'phrase', gloss: 'flying', modifies: ['creature'] },
  { word: 'ஓடும்', stem: 'ஓடும்', join: 'phrase', gloss: 'running', modifies: ['creature'] },
  { word: 'தூங்கும்', stem: 'தூங்கும்', join: 'phrase', gloss: 'sleeping', modifies: ['creature'] },
  { word: 'சிரிக்கும்', stem: 'சிரிக்கும்', join: 'phrase', gloss: 'laughing', modifies: ['creature'] },
  { word: 'பாடும்', stem: 'பாடும்', join: 'phrase', gloss: 'singing', modifies: ['creature'] },
  { word: 'ஆடும்', stem: 'ஆடும்', join: 'phrase', gloss: 'dancing', modifies: ['creature'] },
  { word: 'கத்தும்', stem: 'கத்தும்', join: 'phrase', gloss: 'screeching', modifies: ['creature'] },
  { word: 'திருடும்', stem: 'திருடும்', join: 'phrase', gloss: 'thieving', modifies: ['creature'] },
  { word: 'குதிக்கும்', stem: 'குதிக்கும்', join: 'phrase', gloss: 'leaping', modifies: ['creature'] },
  { word: 'மிதக்கும்', stem: 'மிதக்கும்', join: 'phrase', gloss: 'floating', modifies: ['creature'] },
  { word: 'சீறும்', stem: 'சீறும்', join: 'phrase', gloss: 'snarling/hissing', modifies: ['creature'] },
  { word: 'எரியும்', stem: 'எரியும்', join: 'phrase', gloss: 'burning', modifies: ['creature', 'thing', 'place'] },
  { word: 'மின்னும்', stem: 'மின்னும்', join: 'phrase', gloss: 'sparkling', modifies: ['creature', 'thing'] },
  { word: 'முழங்கும்', stem: 'முழங்கும்', join: 'phrase', gloss: 'roaring/booming', modifies: ['creature', 'thing'] },
  { word: 'வேட்டையாடும்', stem: 'வேட்டையாடும்', join: 'phrase', gloss: 'hunting', modifies: ['creature'] },
  { word: 'நீந்தும்', stem: 'நீந்தும்', join: 'phrase', gloss: 'swimming', modifies: ['creature'] },
  { word: 'சுழலும்', stem: 'சுழலும்', join: 'phrase', gloss: 'whirling', modifies: ['creature', 'thing'] },
  { word: 'காக்கும்', stem: 'காக்கும்', join: 'phrase', gloss: 'guardian', modifies: ['creature'] }
];
