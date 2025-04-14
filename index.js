var defaultPlayerName = 'Player Name';

var adjectives = [
    // I. Colors (நிறங்கள்)
    "கருப்பு",        // Black
    "வெள்ளை",        // White
    "சாம்பல்",        // Grey/Ash
    "பழுப்பு",        // Brown
    "சிவப்பு",        // Red
    "இளஞ்சிவப்பு",   // Pink
    "குருதிநிறம்",   // Blood-red (*use with caution*)
    "ஆரஞ்சு",        // Orange
    "மஞ்சள்",        // Yellow
    "பச்சை",         // Green
    "நீலம்",         // Blue
    "கடல்நீலம்",      // Sea blue
    "ஊதா",          // Purple
    "செம்மஞ்சள்",     // Saffron/Deep Orange
    "தங்கம்",         // Gold (*Noun*)
    "வெள்ளி",        // Silver (*Noun*)
    "செம்பு",         // Copper (*Noun*)
    "பித்தளை",       // Brass (*Noun*)
    "தந்தம்",         // Ivory (*Noun*)
    "கிரீம்",         // Cream (*Noun*)
    "லாவண்டர்",      // Lavender (*Noun*)
    "மஜந்தா",        // Magenta (*Noun*)
    "வானவில்",       // Rainbow (*Noun*)
    "மங்கல்",         // Dull/Faded

    // II. Light & Appearance (ஒளி & தோற்றம்)
    "பொலிவான",      // Bright/Shiny
    "பிரகாசம்",       // Brightness/Radiance (*Noun*)
    "ஒளி",           // Light (*Noun*)
    "ஒளிவீச்சு",      // Radiance (*Noun*)
    "மின்னல்",       // Lightning (*Noun*)
    "மிளிர்வு",       // Glitter/Sparkle (*Noun*)
    "பளபளப்பு",      // Shine/Gloss (*Noun*)
    "ஜொலிக்கும்",     // Shining/Glittering
    "தேஜஸ்வி",       // Radiant (*Sanskrit origin*)
    "மங்கலம்",       // Auspicious (*Noun*)
    "தெளிவு",        // Clarity (*Noun*)
    "கண்ணாடி",      // Glass (*Noun*)
    "இருள்",         // Darkness (*Noun*)
    "சூடான",        // Hot
    "குளிர்",         // Cold (*Noun/Adjective*)
    "அழகான",        // Beautiful
    "அழகு",          // Beauty (*Noun*)

    // III. Materials & Minerals (பொருட்கள் & கனிமங்கள்)
    "கல்",           // Stone (*Noun*)
    "பாறை",         // Rock (*Noun*)
    "மணல்",         // Sand (*Noun*)
    "களிமண்",       // Clay (*Noun*)
    "வைரம்",         // Diamond (*Noun*)
    "மரகதம்",       // Emerald (*Noun*)
    "மாணிக்கம்",     // Ruby (*Noun*)
    "நீலக்கல்",      // Sapphire (*Noun*)
    "முத்து",         // Pearl (*Noun*)
    "பவளம்",        // Coral (*Noun*)
    "தகரம்",         // Tin (*Noun*)
    "இரும்பு",        // Iron (*Noun*)
    "எஃகு",          // Steel (*Noun*)
    "மெழுகு",        // Wax (*Noun*)
    "பட்டு",         // Silk (*Noun*)
    "கம்பளி",       // Wool (*Noun*)
    "நூல்",          // Thread/Yarn (*Noun*)
    "கயிறு",         // Rope (*Noun*)
    "சந்தனம்",       // Sandalwood (*Noun*)
    "கருங்காலி",     // Ebony (*Noun*)
    "கரி",           // Charcoal (*Noun*)
    "மைக்கா",        // Mica (*Noun*)
    "பசால்ட்",       // Basalt (*Noun*)
    "கிரானைட்",      // Granite (*Noun*)
    "பளிங்கு",       // Marble (*Noun*)

    // IV. Nature & Plants (இயற்கை & தாவரங்கள்)
    "மரம்",          // Tree (*Noun*)
    "செடி",          // Plant (*Noun*)
    "கொடி",          // Creeper/Vine (*Noun*)
    "இலை",          // Leaf (*Noun*)
    "மலர்",          // Flower (*Noun*)
    "மொட்டு",        // Bud (*Noun*)
    "விதை",          // Seed (*Noun*)
    "காய்",          // Unripe Fruit/Vegetable (*Noun*)
    "பழம்",          // Fruit (*Noun*)
    "வாசம்",         // Fragrance (*Noun*)
    "காடு",          // Forest (*Noun*)
    "வனம்",          // Forest (*Noun*)
    "சோலை",         // Grove (*Noun*)
    "தோப்பு",        // Grove/Orchard (*Noun*)
    "மலை",          // Mountain (*Noun*)
    "சிகரம்",        // Peak (*Noun*)
    "சரிவு",         // Slope (*Noun*)
    "பள்ளத்தாக்கு",  // Valley (*Noun*)
    "நதி",           // River (*Noun*)
    "ஏரி",           // Lake (*Noun*)
    "குளம்",         // Pond (*Noun*)
    "நீர்",           // Water (*Noun*)
    "அலை",          // Wave (*Noun*)
    "கடல்",          // Sea (*Noun*)
    "வானம்",         // Sky (*Noun*)
    "மேகம்",         // Cloud (*Noun*)
    "காற்று",        // Wind/Air (*Noun*)
    "புயல்",         // Storm (*Noun*)
    "மழை",          // Rain (*Noun*)
    "பனி",           // Dew/Snow/Mist (*Noun*)
    "மண்",           // Soil/Earth (*Noun*)
    "சேறு",          // Mud (*Noun*)
    "பாசி",          // Moss/Algae (*Noun*)
    "புல்",           // Grass (*Noun*)
    "நெல்",          // Paddy (*Noun*)
    "கோதுமை",       // Wheat (*Noun*)
    "மூங்கில்",      // Bamboo (*Noun*)
    "பனை",          // Palm (*Noun*)
    "தென்னை",       // Coconut tree (*Noun*)
    "ரோஜா",         // Rose (*Noun*)
    "மல்லிகை",      // Jasmine (*Noun*)
    "தாமரை",       // Lotus (*Noun*)
    "செம்பருத்தி",    // Hibiscus (*Noun*)
    "துளசி",         // Basil (*Noun*)
    "புதினா",        // Mint (*Noun*)
    "மசாலா",        // Spice (*Noun*)

    // V. Time & Cosmos (காலம் & அண்டம்)
    "காலை",         // Morning (*Noun*)
    "பகல்",          // Daytime (*Noun*)
    "மாலை",         // Evening (*Noun*)
    "இரவு",          // Night (*Noun*)
    "விடியல்",       // Dawn (*Noun*)
    "சூரியன்",       // Sun (*Noun*)
    "சந்திரன்",      // Moon (*Noun*)
    "விண்மீன்",      // Star (*Noun*)
    "நட்சத்திரம்",    // Star (*Noun*)
    "கோள்",         // Planet (*Noun*)
    "அண்டம்",        // Universe (*Noun*)
    "எரிகல்",        // Meteor (*Noun*)

    // VI. Shapes & Sizes (வடிவங்கள் & அளவுகள்)
    "சிறு",          // Small
    "சிறிய",         // Small
    "பெரிய",         // Big/Large
    "குறுகிய",       // Short/Narrow
    "நீளமான",       // Long
    "உயரமான",       // Tall/High
    "குட்டையான",     // Short (height)
    "மெல்லிய",       // Thin/Slender
    "தடித்த",        // Thick/Bold
    "வட்ட",         // Round
    "வட்டம்",        // Circle (*Noun*)
    "சதுர",         // Square
    "சதுரம்",        // Square (*Noun*)
    "கோடு",          // Line (*Noun*)
    "சுருள்",         // Curl/Spiral (*Noun*)
    "ஆழமான",        // Deep
    "ஆழமற்ற",       // Shallow
    "பரந்த",         // Wide/Vast

    // VII. Qualities & Concepts (பண்புகள் & கருத்துக்கள்)
    "நல்ல",          // Good
    "புதிய",         // New
    "பழைய",         // Old
    "இளம்",          // Young
    "முதிய",         // Old/Aged
    "இனிப்பு",       // Sweet (*Noun/Adjective*)
    "கசப்பு",        // Bitter (*Noun/Adjective*)
    "புளிப்பு",       // Sour (*Noun/Adjective*)
    "உப்பு",          // Salt (*Noun/Adjective*)
    "காரம்",         // Spicy/Pungent (*Noun/Adjective*)
    "வேகமான",       // Fast
    "மெதுவான",      // Slow
    "வலிமை",        // Strength (*Noun*)
    "வலிமையான",     // Strong
    "மென்மை",        // Softness (*Noun*)
    "மென்மையான",     // Soft/Gentle
    "கடுமை",        // Severity (*Noun*)
    "கடுமையான",     // Severe/Harsh
    "வீரம்",         // Valor (*Noun*)
    "வீரமான",       // Brave/Heroic
    "துணிச்சல்",     // Courage (*Noun*)
    "துணிச்சலான",    // Brave
    "அமைதி",        // Peace (*Noun*)
    "அமைதியான",     // Peaceful/Calm
    "சந்தோஷம்",      // Happiness (*Noun*)
    "நம்பிக்கை",     // Hope/Trust (*Noun*)
    "உண்மை",        // Truth (*Noun*)
    "சுதந்திரம்",     // Freedom (*Noun*)
    "சக்தி",         // Power/Energy (*Noun*)
    "மகிமை",        // Glory (*Noun*)
    "புனிதம்",       // Sacredness (*Noun*)
    "புனித",         // Sacred
    "தெய்வீகம்",     // Divinity (*Noun*)
    "தெய்வீக",       // Divine
    "ஞானம்",        // Wisdom (*Noun*)
    "ஞான",         // Wise
    "புத்திசாலி",     // Intelligent
    "கூர்மை",        // Sharpness (*Noun*)
    "கூர்மையான",     // Sharp
    "நுட்பமான",      // Subtle/Delicate/Fine
    "முரட்டு",       // Rough/Rugged
    "நிலையான",      // Stable
    "நிலயற்ற",      // Unstable
    "எளிய",         // Simple
    "முதன்மை",      // Primary/Main (*Noun*)
    "மகத்தான",      // Great/Grand
    "பிரம்மாண்டம்",  // Grandeur (*Noun*)
    "பிரம்மாண்ட",    // Grand
    "மாய",          // Illusory/Magical
    "மர்மம்",        // Mystery (*Noun*)
    "மர்மமான",      // Mysterious
    "தனி",          // Alone/Unique
    "ஒற்றை",        // Single
    "இரட்டை",       // Double/Pair (*Noun*)
    "காட்டு",        // Wild
    "அடங்காத",      // Untamed
    "சுடும்",        // Burning/Hot
    "குளிரும்",      // Cooling/Cold
    "மின்னும்",       // Shining/Sparkling
];

var nouns = [
    "தலை",          // Head
    "கிரீடம்",       // Crown
    "பல்",           // Tooth
    "கொம்பு",        // Horn
    "முடி",          // Hair / End
    "மண்டை",        // Skull
    "எலும்பு",       // Bone
    "நாக்கு",        // Tongue
    "தொண்டை",       // Throat
    "குரல்",         // Voice
    "மூக்கு",        // Nose
    "தாடை",         // Jaw
    "கண்",           // Eye
    "பார்வை",       // Sight / Vision
    "பேச்சாளர்",     // Speaker
    "பாடகர்",       // Singer
    "பாட்டு",        // Song
    "ஓதுபவர்",      // Reciter
    "கத்துவான்",     // Shouter (person)
    "சத்தமிடுபவர்", // One who makes noise
    "அழைப்பாளர்",   // Caller
    "கத்து",         // Shout (noun)
    "கடி",          // Bite (noun)
    "கடிப்பவர்",     // Biter (person)
    "கழுத்து",       // Neck
    "தோள்பட்டை",    // Shoulder
    "சிறகு",        // Wing
    "கை",           // Hand / Arm
    "தூக்குபவர்",    // Lifter (person)
    "பிடிப்பு",       // Grip / Hold
    "பிடிப்பவர்",    // Holder (person)
    "விரல்",         // Finger
    "கால்",          // Leg / Foot
    "கைவிரல்",      // Finger
    "கால்விரல்",     // Toe
    "தளிர்",        // Sprout / Shoot
    "தொடுகை",       // Touch (noun)
    "ஓட்டம்",        // Run / Race
    "நகம்",          // Nail / Claw
    "பறக்கும்",      // Flying (often used adjectivally)
    "பறப்பவன்",     // Flyer (person)
    "குதிப்பு",       // Jump / Leap
    "கர்ஜனை",       // Roar
    "சிணுங்கல்",     // Whimper
    "சிணுங்குபவர்",  // Whimperer (person)
    "மூழ்கல்",       // Dive / Sink (noun)
    "மூழ்குபவர்",    // Diver / Sinker (person)
    "மார்பு",        // Chest
    "முதுகு",        // Back
    "மலைச்சாரல்",   // Mountain slope
    "கால்கள்",       // Legs / Feet (plural)
    "வால்",          // Tail
    "நடப்பவர்",      // Walker (person)
    "அசைப்பவன்",    // Shaker (person)
    "அதிர்ச்சி",      // Shock
    "வேட்டை",       // Hunt (*Changed from வேட்டை ஆட்டம்*)
    "கலைஞர்",       // Artist (*Simplified from நெய்யும் கலைஞர்*)
    "கைவினை",      // Handicraft (*Simplified from கைவினைப்பயிற்சி*)
    "கட்டுபவர்",     // Builder (person)
    "எழுத்தர்",      // Clerk / Writer
    "உருவாக்குபவர்",// Creator (person)
    "கொல்லி",       // Killer (*Negative connotation*)
    "பாதை",         // Path
    "காயம்",         // Wound / Injury
    "பயம்",          // Fear
    "கொலைகாரன்",    // Murderer (*Negative connotation*)
    "இறப்பு",        // Death (*Sensitive*)
    "அழிவு",        // Destruction (*Sensitive*)
    "மருத்துவர்",    // Doctor
    "காப்பாளர்",     // Protector / Guardian
    "நண்பன்",        // Friend
    "பகைவர்",       // Enemy (*Negative connotation*)
    "காவலர்",       // Guard / Police
    "இடி",           // Thunder
    "மின்னல்",       // Lightning
    "மேகம்",         // Cloud
    "புயல்",         // Storm
    "தொகுப்பு",      // Collection / Compilation
    "நெடுமுடி",     // Long hair (*Noun phrase*)
    "நெற்றி",        // Forehead
    "தொந்தி",        // Paunch / Potbelly
    "திருடர்",       // Thief (*Negative connotation*)
    "கொள்ளையர்",    // Robber (*Negative connotation*)
    "அறுவை",        // Surgery / Disgust (*Review context*)
    "அளிப்பவர்",     // Giver (person)
    "எடுப்பவர்",     // Taker (person)
    "நடனக்காரன்",   // Dancer (person)
    "விளையாட்டுவீரர்",// Player / Athlete (*Joined word*)
    "சூதாடி",        // Gambler (*Negative connotation*)
    "சுழற்றுபவர்",   // Spinner (person)
    "திருப்புபவர்",   // Turner (person)
    "தொலைவு",       // Distance
    "நச்சு",         // Poison / Toxin (*Negative connotation*)
    "முள்",          // Thorn
    "உணவு",         // Food
    "தின்பவர்",      // Eater (person)
    "மகள்",         // Daughter
    "அரசன்",        // King
    "மன்னர்",       // King / Monarch
    "ஆசான்",        // Teacher / Master
    "மனைவி",       // Wife
    "இளவரசன்",     // Prince
    "இளவரசி",     // Princess
    "அரசி",         // Queen
    "சமுராய்",      // Samurai
    "நிஞ்சா",       // Ninja
    "வஞ்சகர்",      // Deceiver (*Negative connotation*)
    "பணியாளர்",     // Worker / Employee
    "ஏவலாளர்",      // Servant
    "ஞானி",         // Sage / Wise person
    "மந்திரவாதி",   // Magician / Wizard
    "பேயாட்டி",     // Exorcist (*Sensitive/Negative*)
    "கலங்கியோன்",   // Confused person
    "வீரன்",        // Warrior / Hero (*Simplified from யுத்த வீரன்*)
    "நகைச்சுவைக்காரன்",// Comedian
    "வியாபாரி",     // Merchant / Trader
    "வாள்",         // Sword
    "கவசம்",        // Armor
    "கத்தி",         // Knife
    "குறுக்கி",      // Dagger (?)
    "அம்பு",         // Arrow
    "வில்",          // Bow (*Simplified from வில்லு*)
    "சண்டையிடுபவர்",// Fighter (person)
    "விடுதலை",     // Freedom / Liberation
    "பின்தொடர்பவர்",// Follower (person)
    "தலைவர்",       // Leader
    "பாதிப்பு",      // Impact / Effect / Damage
    "கண்காணிப்பவர்",// Watcher / Supervisor
    "பூனை",         // Cat
    "கரடி",         // Bear
    "புலி",          // Tiger
    "குறும்பு",       // Mischief
    "சிறுத்தை",      // Leopard / Cheetah
    "நரி",          // Fox
    "நாய்",          // Dog
    "ஓநாய்",        // Wolf
    "பேய்",          // Ghost / Demon (*Negative connotation*)
    "குட்டி",        // Cub / Pup / Young one
    "வேட்டைநாய்",   // Hunting dog (*Joined word*)
    "கொக்கு",        // Crane / Stork
    "சேவல்",        // Rooster
    "குதிரை",       // Horse
    "கழுதை",        // Donkey
    "ஆண்குதிரை",    // Stallion (*Joined word*)
    "பெண்குதிரை",   // Mare (*Joined word*)
    "வரிக்குதிரை",  // Zebra
    "மான்",         // Deer
    "கடுகு",         // Mustard
    "நீர்யானை",    // Hippopotamus
    "சுறா",         // Shark
    "மீன்",          // Fish
    "சிறியமீன்",     // Small fish (*Joined word*)
    "பெரியமீன்",     // Big fish (*Joined word*)
    "கதிரவன்",      // Sun
    "ஓட்டர்",        // Otter
    "கடல்பறவை",     // Seabird (*Joined word*)
    "வாத்து",        // Duck
    "காகம்",         // Crow
    "கானகம்",       // Forest / Jungle
    "பறவை",         // Bird
    "கழுகு",        // Eagle / Vulture
    "மரங்கொத்தி",   // Woodpecker (*Changed from மரவேடன்*)
    "பருந்து",       // Eagle / Hawk / Kite
    "காட்டுமாடு",    // Bison / Wild Cow (*Joined word*)
    "ஆந்தை",        // Owl
    "நாரை",         // Stork / Heron
    "சிட்டுக்குருவி", // Sparrow (*Changed from சின்னக்குருவி*)
    "முத்து",        // Pearl
    "ஓணான்",        // Chameleon / Lizard
    "நாகம்",         // Cobra / Serpent
    "பாம்பு",        // Snake
    "மலைப்பாம்பு",   // Python (*Changed from பைதான்*)
    "நச்சுப்பாம்பு",  // Poisonous snake (*Negative connotation*)
    "பஞ்சு",         // Cotton
    "மூட்டைப்பூச்சி", // Bed bug (*Negative connotation*)
    "தேன்",          // Honey
    "முயல்",         // Rabbit
    "காட்டுக்குதிரை",// Wild horse (*Joined word*)
    "மாடு",         // Cow / Bull (*Simplified from நாட்டு மாடு*)
    "குழம்பு",       // Gravy / Confusion
    "நெருப்பு",      // Fire
    "முடிவு",        // End / Decision
    "விளக்கு",       // Lamp (*Simplified from மின்சார விளக்கு*)
    "பொறி",         // Spark / Trap
    "துவக்கு",       // Gun / Rifle
    "முழக்கம்",      // Roar / Slogan
    "மயக்கம்",       // Faint / Dizziness
    "எலி",          // Rat / Mouse
    "வளம்",         // Wealth / Fertility / Resource
    "சாட்டை",       // Whip
    "ஏறுபவர்",      // Climber (person)
    "ஆவி",          // Ghost / Spirit / Steam
    "வௌவால்",       // Bat (animal)
    "எரிவெடி",      // Firecracker / Bomb (*Sensitive*)
    "முடிப்பு",       // Knot / End
    "நகை",          // Jewel / Joke
    "அலங்காரம்",    // Decoration (*Changed from கழுத்து அலங்காரம்*)
    "முத்திரை",      // Seal / Stamp
    "புன்னகை",      // Smile
    "புதிர்",        // Puzzle / Riddle
    "ஊசல்",         // Swing / Pendulum
    "நுனி",         // Tip / Point
    "தேடுபவர்",      // Seeker (person)
    "காக்கை",       // Crow (alternate spelling)
    "குரங்கு",       // Monkey
    "கங்காரு",      // Kangaroo
    "தூக்கம்",       // Sleep
    "எறும்பு",       // Ant
    "வெட்டுபவர்",   // Cutter (person) (*Changed from வெட்டியன்/வெட்டியான்*)
    "முளை",         // Sprout
    "உண்பவர்",      // Eater (person)
    "சட்டை",        // Shirt
    "முகம்",         // Face
    "ஆடு",          // Goat
    "மனம்",         // Mind
    "மாற்றம்",       // Change
    "முள்ளம்பன்றி", // Porcupine (*Changed from முள்ளெலி*)
    "லாமா",         // Llama
    "வண்டு",        // Beetle
    "தொடுப்பு",      // Link / Touch (noun)
    "பூட்டு",        // Lock
    "அடிப்பவர்",     // Hitter / Beater (person)
    "படை",          // Army / Troops (*Simplified from படையினர்*)
    "பாய்மரம்",      // Mast (ship)
    "திரை"          // Screen / Curtain / Wave
];


function randomNoun(generator){
    generator = generator || Math.random;

    return nouns[Math.floor(generator()*nouns.length)];
}

function randomAdjective(generator){
    generator = generator || Math.random;

    return adjectives[Math.floor(generator()*adjectives.length)];
}

function generateStupidTamilName(generator) {
    var adjective = randomAdjective(generator);

    if (Math.random() < 0.5) {
        var noun = randomNoun(generator);
        return adjective + ' ' + noun;
    } else {
        var noun1 = randomNoun(generator);
        var noun2 = randomNoun(generator);
        return adjective + noun1 + ' ' + noun2;
    }
}

module.exports = generateStupidTamilName;
module.exports.randomNoun = randomNoun;
module.exports.randomAdjective = randomAdjective;
