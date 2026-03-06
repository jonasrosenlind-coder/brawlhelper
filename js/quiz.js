// ===== QUIZ.JS — Brawl Stars Quiz with Difficulty Levels =====

let quizBrawlers = [];
let quizLoaded = false;
let currentQuiz = null;
let currentDifficulty = null;
let megaOptions = 4;
let quizScore = 0;
let quizQuestionIndex = 0;
let usedQuestions = [];
const QUIZ_LENGTH = 10;

const DIFF_LABELS = {
    easy:    { name: 'Easy',    color: '#4caf50', emoji: '🟢' },
    medium:  { name: 'Medium',  color: '#ff9800', emoji: '🟡' },
    hard:    { name: 'Hard',    color: '#f44336', emoji: '🔴' },
    extreme: { name: 'Extreme', color: '#9c27b0', emoji: '💀' },
};

// ===== VOICELINES BY DIFFICULTY =====
const QUIZ_VOICELINES = {
    easy: {
        'El Primo': '"EEEEL PRIMOOOO!"',
        'Crow': '"Caw caw caw!"',
        'Spike': '"..."',
        'Mortis': '"Creature of the night!"',
        'Shelly': '"Shellyyy!"',
        'Dynamike': '"KABOOM!"',
        'Poco': '"Music to my ears!"',
        'Frank': '"FRAAANK! SMASH!"',
        'Leon': '"Now you see me..."',
        'Colt': '"Pew pew pew!"',
        'Nita': '"BEAR!"',
        'Bull': '"Here comes the Bull!"',
        'Jessie': '"Scrappy, get em!"',
        'Brock': '"Brock is OP!"',
    },
    medium: {
        'Emz': '"OMG, hashtag blessed!"',
        'Colette': '"I\'m your number one fan!"',
        'Edgar': '"Whatever!"',
        'Surge': '"SURGE PROTECTOR!"',
        'Bibi': '"Batter up!"',
        'Darryl': '"Rollin rollin rollin!"',
        'Piper': '"Sugar and spice!"',
        'Pam': '"Mama is here!"',
        'Buzz': '"No running by the pool!"',
        'Griff': '"Money money money!"',
        'Sandy': '"Five more minutes..."',
        'Amber': '"Fire fire fire!"',
        'Max': '"Gotta go fast!"',
        'Gene': '"Hablablabla!"',
        'Fang': '"Hiii-YAH!"',
    },
    hard: {
        'Carl': '"Geology rocks!"',
        'Rosa': '"For science!"',
        'Barley': '"One for the road!"',
        'Bea': '"Honey, I\'m home!"',
        'Penny': '"Plunder and profit!"',
        '8-Bit': '"Insert coin to continue!"',
        'Bo': '"The eagle has landed!"',
        'Rico': '"I always bounce back!"',
        'Gale': '"Stay frosty!"',
        'Jacky': '"Drill baby drill!"',
        'Belle': '"Dead or alive!"',
        'Ash': '"One man\'s trash!"',
        'Meg': '"Mech activated!"',
        'Byron': '"Trust me, I\'m a doctor!"',
        'Lola': '"Star quality!"',
        'Tara': '"Tara sees all!"',
    },
    extreme: {
        'Stu': '"Watch this trick!"',
        'Grom': '"Special delivery!"',
        'Ruffs': '"Colonel Ruffs, reporting!"',
        'Squeak': '"Squeak squeak squeak!"',
        'Lou': '"Brain freeze!"',
        'Sprout': '"Planting seeds!"',
        'Mr. P': '"Check in, please!"',
        'Otis': '"Shhhh! Quiet!"',
        'Sam': '"Say hello to my fist!"',
        'Gus': '"Spooky! Boo!"',
        'Chester': '"Pick a card!"',
        'Mandy': '"Sweet shot!"',
        'Hank': '"Watch out below!"',
        'Bonnie': '"Catch me if you can!"',
        'Janet': '"Ready for takeoff!"',
        'Eve': '"Splashhh!"',
        'Tick': '"Tick tick tick..."',
        'Nani': '"Peep, go!"',
        'Cordelius': '"You\'re trapped!"',
    },
};

// ===== SUPER ABILITIES BY DIFFICULTY =====
const QUIZ_SUPERS = {
    easy: {
        'Shelly': 'A massive shotgun blast that destroys walls',
        'El Primo': 'Jumps high and lands with an elbow drop',
        'Nita': 'Summons a big bear to fight',
        'Jessie': 'Builds an automatic turret called Scrappy',
        'Poco': 'Heals all nearby teammates',
        'Bull': 'Charges forward, knocking enemies aside',
        'Brock': 'Fires a barrage of rockets over an area',
        'Mortis': 'Sends bats that deal damage and heal him',
        'Spike': 'Creates a field of cactus spines that slow enemies',
        'Leon': 'Becomes invisible for a few seconds',
        'Crow': 'Jumps in the air and throws daggers below',
    },
    medium: {
        'Colt': 'Fires a long burst of bullets in a straight line',
        'Dynamike': 'Throws a giant barrel of dynamite',
        'Frank': 'Slams the ground, stunning all nearby enemies',
        'Tara': 'Creates a black hole that pulls enemies in',
        'Gene': 'Grabs an enemy with a magic hand and pulls them close',
        'Sandy': 'Creates a sandstorm that makes teammates invisible inside it',
        'Surge': 'Teleports forward a short distance',
        'Bibi': 'Hits a powerful home run swing with her bat',
        'Edgar': 'Jumps toward enemies from long range',
        'Max': 'Gives the whole team a speed boost',
        'Colette': 'Dashes forward and back, dealing massive damage',
        'Amber': 'Throws an oil flask that creates fire on the ground',
    },
    hard: {
        'Barley': 'Throws bottles in a wide area around himself',
        'Rico': 'Fires a burst of bouncing balls everywhere',
        'Bo': 'Places hidden mines on the ground',
        'Penny': 'Places a cannon turret that lobs cannonballs',
        'Piper': 'Jumps into the air and drops bombs below',
        'Pam': 'Places a healing turret for teammates',
        'Bea': 'Sends out a swarm of bees',
        'Emz': 'Creates a slowing zone around herself',
        'Buzz': 'Throws a buoy and dashes toward the target',
        'Gale': 'Blows enemies away with a snowstorm',
        'Belle': 'Marks an enemy so they take extra damage from everyone',
        'Ash': 'Throws a robotic rat that charges forward',
        'Fang': 'Flies toward an enemy with a powerful kick',
        'Byron': 'Fires a healing missile that heals allies or damages enemies',
        'Stu': 'Leaves a trail of fire behind him as he dashes',
    },
    extreme: {
        '8-Bit': 'Places a damage-boosting turret',
        'Jacky': 'Pulls all nearby enemies toward her',
        'Gale': 'Creates a launch pad that launches anyone who steps on it',
        'Griff': 'Fires a storm of coins in a spread pattern',
        'Lola': 'Creates an ego clone that copies her attacks',
        'Meg': 'Calls in her giant battle mech',
        'Rosa': 'Gets a shield of bushes that absorbs damage',
        'Mr. P': 'Sends a suitcase turret that spawns mini porters',
        'Sprout': 'Creates a wall of plants that blocks paths',
        'Ruffs': 'Drops a power-up supply crate for an ally',
        'Squeak': 'Throws a giant sticky bomb',
        'Lou': 'Creates a slippery ice zone',
        'Otis': 'Silences an enemy so they can\'t attack or use abilities',
        'Grom': 'Throws a massive bomb in an area',
        'Sam': 'Throws his knuckle busters and dashes to them',
    },
};

// ===== TRUE/FALSE BY DIFFICULTY =====
const TRUE_FALSE = {
    easy: [
        { q: 'Shelly is the first brawler you unlock', a: true },
        { q: 'Spike can talk and has voice lines', a: false },
        { q: 'El Primo is a Tank', a: true },
        { q: 'Crow throws poisoned daggers', a: true },
        { q: 'Leon can become invisible with his Super', a: true },
        { q: 'Brawl Ball is a 3v3 game mode', a: true },
        { q: 'Mortis uses a shovel to attack', a: true },
        { q: 'Jessie\'s turret is called Scrappy', a: true },
        { q: 'Poco is a Damage Dealer', a: false },
        { q: 'Gem Grab requires 10 gems to win', a: true },
        { q: 'Showdown is a battle royale mode', a: true },
        { q: 'Nita summons a bear with her Super', a: true },
        { q: 'Frank uses a sword to attack', a: false },
        { q: 'Colt shoots one bullet per attack', a: false },
        { q: 'Bull charges forward with his Super', a: true },
    ],
    medium: [
        { q: 'Dynamike can jump over walls with his Star Power "Dyna-Jump"', a: true },
        { q: 'Piper does more damage at close range', a: false },
        { q: 'Rico\'s bullets can bounce off walls', a: true },
        { q: 'Frank can be interrupted while attacking', a: true },
        { q: '8-Bit moves faster than most brawlers', a: false },
        { q: 'Edgar charges his Super automatically over time', a: true },
        { q: 'Amber shoots individual fireballs', a: false },
        { q: 'Surge can upgrade himself during a match with his Super', a: true },
        { q: 'Sandy is a Legendary brawler', a: true },
        { q: 'Colette\'s attack does percentage-based damage', a: true },
        { q: 'Emz attacks with perfume spray', a: true },
        { q: 'Gene\'s Super pushes enemies away', a: false },
        { q: 'Buzz\'s Super stuns enemies when he hits them', a: true },
        { q: 'Max\'s Super only affects herself', a: false },
        { q: 'Bibi has a knockback bar on her home run swing', a: true },
    ],
    hard: [
        { q: 'Nita and Leon are siblings in the lore', a: true },
        { q: 'Pam is Jessie\'s mother', a: true },
        { q: 'Bo can see into bushes with his Star Power "Circling Eagle"', a: true },
        { q: 'Tick throws his own head as his Super', a: true },
        { q: 'Barley is a bartender robot', a: true },
        { q: 'Brock\'s attack explodes on impact in a small area', a: true },
        { q: 'Penny\'s cannon shoots where enemies currently are', a: false },
        { q: 'Bull moves faster when below 40% HP with his Star Power "Berserker"', a: true },
        { q: 'Rosa\'s Super makes her completely immune to all damage', a: false },
        { q: 'Sprout\'s Super creates a wall that lasts forever', a: false },
        { q: 'Mr. P\'s porters have the same HP as Mr. P', a: false },
        { q: 'Carl throws his pickaxe and it comes back to him', a: true },
        { q: 'Darryl\'s Super gives him a shield', a: true },
        { q: 'Gale\'s Star Power "Freezing Snow" slows enemies', a: true },
        { q: 'Byron\'s attack can heal allies AND damage enemies', a: true },
        { q: 'Jacky\'s attack goes through walls', a: true },
        { q: 'Belle\'s Super mark disappears when Belle is eliminated', a: false },
    ],
    extreme: [
        { q: 'Showdown has a maximum of 10 players in Solo mode', a: true },
        { q: 'Colt fires exactly 6 bullets per attack', a: true },
        { q: 'In Gem Grab, the countdown timer is 16 seconds', a: false },
        { q: 'Power League was originally called Power Play', a: true },
        { q: 'The maximum Power Level for a brawler is 11', a: true },
        { q: 'Brawl Stars was globally released in December 2018', a: true },
        { q: 'Brawl Stars was originally a portrait-mode game', a: true },
        { q: 'The poison cloud in Showdown deals 1000 damage per tick at first', a: false },
        { q: 'Mortis was originally a Mythic brawler', a: true },
        { q: 'Gears were introduced at Power Level 10 and 11', a: true },
        { q: 'Brawl Ball goals used to break all walls on the map', a: true },
        { q: 'Piper\'s Super was originally called "Poppin\'"', a: true },
        { q: 'Leon was the first Legendary brawler added after global launch', a: false },
        { q: 'The game was developed by Supercell\'s Helsinki studio', a: true },
        { q: 'Tick was the first brawler that throws his head as a Super', a: true },
        { q: 'Club League replaced Club Wars', a: false },
        { q: 'The fastest brawler in the game without abilities is Max', a: false },
        { q: 'Duo Showdown has 5 teams of 2 players', a: true },
        { q: 'Star Powers were added in the Brawl Stars global update', a: false },
        { q: 'Gadgets give each brawler 3 uses per match', a: true },
    ],
};

// ===== GADGETS BY DIFFICULTY =====
const QUIZ_GADGETS = {
    easy: {
        'Shelly': 'Clay Pigeons — Fires a focused burst of shells in a narrow spread',
        'Colt': 'Speedloader — Instantly reloads all ammo',
        'Bull': 'T-Bone Injector — Heals himself over time',
        'Jessie': 'Spark Plug — Scrappy zaps nearby enemies',
        'Nita': 'Bear Paws — Bruce stuns nearby enemies',
        'Dynamike': 'Fidget Spinner — Spins and throws dynamite in all directions',
        'El Primo': 'Suplex Supplement — Grabs the nearest enemy and throws them',
        'Poco': 'Tuning Fork — Heals himself and nearby allies',
        'Mortis': 'Combo Spinner — Spins and attacks all enemies around him',
        'Spike': 'Popping Prickles — Active cactus explodes around him',
    },
    medium: {
        'Brock': 'Rocket Laces — Jumps with his rocket boots',
        'Rico': 'Multiball Launcher — Fires a burst of bouncing balls everywhere',
        'Barley': 'Sticky Syrup Mixer — Leaves a sticky puddle that slows enemies',
        'Piper': 'Auto Aimer — Drops a homing bullet at her feet',
        'Pam': 'Pulse Modulator — Healing station pulses to heal',
        'Frank': 'Active Noise Canceling — Becomes immune to stuns briefly',
        'Bibi': 'Vitamin Booster — Gets a speed boost',
        'Bea': 'Rattled Hive — Sends out bees that attack nearby enemies',
        'Penny': 'Pocket Detonator — Destroys her turret causing splash damage',
        'Carl': 'Flying Hook — Pulls himself to his pickaxe mid-flight',
        'Emz': 'Friendzoner — Pushes back nearby enemies',
        'Edgar': 'Let\'s Fly — Instantly charges his Super halfway',
    },
    hard: {
        'Darryl': 'Recoiling Rotator — Spins and shoots in all directions',
        'Tara': 'Psychic Enhancer — Reveals enemies hidden in bushes',
        'Gene': 'Lamp Blowout — Pushes back all nearby enemies',
        'Max': 'Phase Shifter — Dashes forward and becomes immune briefly',
        'Sandy': 'Sleep Stimulator — Heals while inside his own sandstorm',
        'Surge': 'Power Surge — Teleports to the nearest enemy',
        'Colette': 'Na-ah! — Pushes back enemies from her path',
        'Lou': 'Ice Block — Becomes a block of ice, immune but can\'t move',
        'Ruffs': 'Take Cover — Deploys sandbags as cover',
        'Gale': 'Twister — Places a small tornado that pushes enemies away',
        'Crow': 'Defense Booster — Reduces all damage taken by 40%',
        'Leon': 'Clone Projector — Creates a decoy clone of himself',
    },
    extreme: {
        'Sprout': 'Garden Mulcher — Eats a nearby wall to heal',
        'Jacky': 'Pneumatic Booster — Dashes forward a short distance',
        'Mr. P': 'Porter Reinforcements — Next porter spawns with more HP',
        '8-Bit': 'Plugged In — Teleports to his damage booster',
        'Stu': 'Speed Zone — Leaves a speed boost pad after dashing',
        'Byron': 'Shot In The Arm — Heals himself over time when hitting enemies',
        'Buzz': 'Reserve Buoy — Stuns enemies around him',
        'Ash': 'Chill Pill — Instantly fills his rage meter',
        'Lola': 'Freeze Frame — Her ego clone freezes in place and becomes a shield',
        'Fang': 'Corn-Fu — Throws popcorn in all directions',
        'Belle': 'Nest Egg — Places an invisible trap that deals damage',
        'Bonnie': 'Sugar Rush — Gets a speed boost when switching forms',
        'Grom': 'Watchtower — Reveals enemies in nearby bushes',
    },
};

// ===== STAR POWERS BY DIFFICULTY =====
const QUIZ_STAR_POWERS = {
    easy: {
        'Shelly': 'Shell Shock — Super shells slow down enemies',
        'Colt': 'Slick Boots — Moves faster than normal',
        'Nita': 'Bear With Me — Nita heals Bear when she attacks and vice versa',
        'Bull': 'Berserker — Moves faster when below 60% HP',
        'El Primo': 'El Fuego — Super sets enemies on fire',
        'Jessie': 'Energize — Attacks on Scrappy heal it',
        'Mortis': 'Creepy Harvest — Heals when defeating enemies',
        'Spike': 'Fertilize — Heals himself while standing in his Super',
        'Crow': 'Extra Toxic — Enemies deal 25% less damage while poisoned',
        'Leon': 'Smoke Trails — Moves faster while invisible',
    },
    medium: {
        'Poco': 'Da Capo! — Attacks heal friendly brawlers they pass through',
        'Brock': 'Incendiary — Rockets leave a fire zone on impact',
        'Dynamike': 'Dyna-Jump — Can jump by standing on his own dynamite',
        'Rico': 'Super Bouncy — Bullets bounce faster and deal more damage',
        'Piper': 'Ambush — Deals extra damage while hiding in bushes',
        'Pam': 'Mama\'s Hug — Heals nearby allies when she hits enemies',
        'Frank': 'Sponge — Gains extra max HP',
        'Bo': 'Circling Eagle — Can see further into bushes',
        'Bibi': 'Home Run — Gets a speed boost when her Home Run bar is charged',
        'Emz': 'Bad Karma — Enemies take more damage the longer they stay in her attack',
        'Edgar': 'Hard Landing — Deals damage when landing from Super',
        'Gene': 'Magic Puffs — Slowly heals all nearby allies',
    },
    hard: {
        'Barley': 'Medical Use — Heals himself when throwing attacks',
        'Penny': 'Last Blast — Cannon fires a burst when destroyed',
        'Carl': 'Power Throw — Pickaxe travels faster',
        'Darryl': 'Steel Hoops — Gets a shield during his Super',
        'Tara': 'Black Portal — Shadow spawns from defeated enemies',
        'Sandy': 'Rude Sands — Sandstorm damages enemies inside it',
        'Surge': 'To The Max! — Shots split at max range',
        'Colette': 'Push It — Super pushes enemies to the end of her dash',
        'Bea': 'Insta Beaload — Instantly charges her supercharged shot after missing',
        'Max': 'Run N\' Gun — Reloads faster while moving',
        'Amber': 'Scorchin\' Siphon — Refills ammo when her Super hits enemies',
        'Stu': 'Zero Drag — Super dash travels further',
        'Buzz': 'Tougher Torpedo — Gets a shield while dashing with Super',
    },
    extreme: {
        '8-Bit': 'Boosted Booster — Damage booster also boosts speed',
        'Jacky': 'Counter Crush — Returns some damage to melee attackers',
        'Mr. P': 'Revolving Door — Porters respawn faster',
        'Sprout': 'Photosynthesis — Gets a shield while inside bushes',
        'Gale': 'Freezing Snow — Blizzard slows enemies',
        'Lou': 'Supercool — Super freezes enemies faster',
        'Ruffs': 'Air Superiority — Supply drop also damages enemies when landing',
        'Belle': 'Grounded — Marked enemies move slower',
        'Ash': 'First Bash — First attack charges rage meter more',
        'Byron': 'Malaise — Super reduces enemy healing by 75%',
        'Lola': 'Improvise — Ego clone attacks deal more damage',
        'Fang': 'Fresh Kicks — Super charges faster from kicking enemies',
        'Bonnie': 'Black Powder — Clyde\'s attacks push enemies back',
    },
};

// ===== ATTACKS BY DIFFICULTY =====
const QUIZ_ATTACKS = {
    easy: {
        'Shelly': 'Fires a spread of shells at close range',
        'Colt': 'Fires a burst of bullets in a straight line',
        'Bull': 'Blasts a short-range spread of heavy shells',
        'Nita': 'Throws a shockwave that travels through enemies',
        'El Primo': 'Punches enemies with his fists at melee range',
        'Jessie': 'Fires an energy orb that bounces between enemies',
        'Dynamike': 'Tosses sticks of dynamite over walls',
        'Poco': 'Strums a wide chord that hits all enemies in a wide area',
        'Mortis': 'Dashes forward, dealing damage to enemies in his path',
        'Spike': 'Throws a cactus that explodes into spikes in all directions',
    },
    medium: {
        'Crow': 'Throws three poisoned daggers in a spread pattern',
        'Leon': 'Fires spinning blades that deal more damage up close',
        'Brock': 'Fires a long-range rocket that explodes on impact',
        'Barley': 'Throws a bottle that splashes the ground with liquid',
        'Piper': 'Fires a single sniper bullet that does more damage at longer range',
        'Rico': 'Fires bullets that bounce off walls',
        'Penny': 'Fires a pouch of gold that splits on hit, hitting enemies behind',
        'Bo': 'Fires three exploding arrows in a spread',
        'Bibi': 'Swings a baseball bat that has a knockback bar',
        'Bea': 'Fires a long-range bee shot — if it hits, the next shot is supercharged',
        'Frank': 'Slams his hammer on the ground in a wide area (has a wind-up delay)',
        'Pam': 'Fires a burst of scrap metal in a spread pattern',
    },
    hard: {
        'Emz': 'Sprays a cloud of hairspray that does damage over time',
        'Carl': 'Throws a pickaxe that boomerangs back to him',
        'Darryl': 'Fires two short-range shotgun blasts from both barrels',
        'Jacky': 'Creates a ground-shock that hits nearby enemies through walls',
        'Rosa': 'Throws a flurry of punches in front of her',
        'Tara': 'Throws tarot cards in a spread pattern',
        'Gene': 'Fires a puff of smoke that splits at the end',
        'Max': 'Fires four fast projectiles in quick succession',
        'Sandy': 'Throws a pebble that creates a sandy area of splash damage',
        'Amber': 'Sprays a continuous stream of fire',
        'Surge': 'Fires a juice projectile that splits when upgraded',
        'Colette': 'Fires a heart that deals percentage-based damage',
        'Stu': 'Fires two flaming wheels in quick succession',
        'Edgar': 'Throws fast punches that heal him for part of the damage dealt',
    },
    extreme: {
        'Gale': 'Fires a burst of snowballs in a spread',
        '8-Bit': 'Fires a beam of lasers that does high damage but he moves slowly',
        'Mr. P': 'Throws a suitcase that bounces over enemies and lands behind them',
        'Sprout': 'Lobs a seed bomb that bounces off walls before exploding',
        'Tick': 'Throws mines that arm after landing and explode when enemies walk over them',
        'Byron': 'Fires a dart that heals allies or damages enemies it passes through',
        'Lou': 'Fires a brain freeze snowcone that fills up the enemy\'s freeze meter',
        'Ruffs': 'Fires two parallel laser beams that bounce off walls',
        'Buzz': 'Fires a long-range torpedo shot',
        'Belle': 'Fires an electro bolt that bounces to a nearby enemy if it hits',
        'Ash': 'Swings his broom in a wide arc',
        'Fang': 'Throws a flying kick projectile at long range',
        'Grom': 'Throws a bomb that explodes in a plus-shaped pattern',
    },
};

// ===== EMOJI QUIZ =====
const EMOJI_BRAWLERS = {
    easy: {
        'El Primo': '💪🤼🔥',
        'Crow': '🐦🗡️☠️',
        'Spike': '🌵😶🤫',
        'Mortis': '🦇⚰️🌙',
        'Leon': '🦎👻🔮',
        'Nita': '🐻👧🌲',
        'Jessie': '🔧⚡🤖',
        'Poco': '🎸💀🎵',
        'Frank': '🔨💀⚡',
        'Bull': '🐂😤💥',
        'Dynamike': '💣🐦👴',
        'Shelly': '🔫💪🤠',
    },
    medium: {
        'Piper': '☂️💋🎀',
        'Brock': '🚀🎧😎',
        'Barley': '🍺🤖🔥',
        'Penny': '🏴‍☠️💰🔫',
        'Rosa': '🌹🥊🔬',
        'Emz': '💅📱💀',
        'Edgar': '🧣😒⬆️',
        'Amber': '🔥🔥💃',
        'Sandy': '😴🏜️💤',
        'Buzz': '🏊‍♂️📣🦕',
        'Colette': '📔😍✨',
        'Surge': '⚡🥤🎮',
    },
    hard: {
        'Bo': '🏹🦅🪶',
        'Rico': '🤖🔴⭕',
        'Carl': '⛏️🪨🤓',
        'Tara': '🔮🃏👁️',
        'Gene': '🧞💨✋',
        'Bibi': '⚾🏏💪',
        'Bea': '🐝🍯🔬',
        'Darryl': '🛢️🏴‍☠️🔫',
        'Max': '⚡👟🥤',
        'Pam': '🔧❤️👩',
        'Gale': '❄️💨👴',
        '8-Bit': '🕹️👾🎮',
        'Jacky': '🔨🚧🤬',
        'Stu': '🏍️🔥🤪',
    },
    extreme: {
        'Sprout': '🌱🤖🌿',
        'Mr. P': '🐧🧳🏨',
        'Tick': '💣⏰😬',
        'Byron': '💉🎩🐍',
        'Lou': '🍦❄️😊',
        'Ruffs': '🐕🎖️📦',
        'Squeak': '💧💣🐶',
        'Belle': '🔫🤠⚡',
        'Ash': '🗑️🧹😡',
        'Fang': '🥋👟🎬',
        'Eve': '🥚👽🌊',
        'Lola': '⭐💄🎭',
        'Meg': '🤖👧🔧',
        'Bonnie': '🎪🔫👧',
        'Grom': '📦💣📫',
        'Chester': '🎪🃏😜',
    },
};

// ===== BRAWLER TRIVIA =====
const BRAWLER_TRIVIA = {
    easy: [
        { q: 'Which brawler is Jessie\'s mother?', a: 'Pam' },
        { q: 'Which brawler is Leon\'s sister?', a: 'Nita' },
        { q: 'Which brawler is a cactus that cannot talk?', a: 'Spike' },
        { q: 'Which brawler is a vampire-like creature with a shovel?', a: 'Mortis' },
        { q: 'Which brawler is a wrestler from Mexico?', a: 'El Primo' },
        { q: 'Which brawler is the first one every player unlocks?', a: 'Shelly' },
        { q: 'Which brawler summons a bear called Bruce?', a: 'Nita' },
        { q: 'Which brawler is a skeleton who plays guitar?', a: 'Poco' },
        { q: 'Which brawler shoots poison daggers and is a crow?', a: 'Crow' },
        { q: 'Which brawler can turn invisible?', a: 'Leon' },
    ],
    medium: [
        { q: 'Which brawler was a bartender robot?', a: 'Barley' },
        { q: 'Which brawler\'s turret is called Scrappy?', a: 'Jessie' },
        { q: 'Which brawler is obsessed with social media and hashtags?', a: 'Emz' },
        { q: 'Which brawler is Colette\'s biggest obsession?', a: 'Spike' },
        { q: 'Which brawler is a lifeguard at the pool?', a: 'Buzz' },
        { q: 'Which brawler charges their Super automatically over time?', a: 'Edgar' },
        { q: 'Which brawler upgrades during a match using their Super?', a: 'Surge' },
        { q: 'Which brawler runs a hotel?', a: 'Mr. P' },
        { q: 'Which brawler is a miner who loves canaries?', a: 'Dynamike' },
        { q: 'Which brawler is a botanist who loves plants?', a: 'Rosa' },
        { q: 'Which brawler is a fortune teller with tarot cards?', a: 'Tara' },
        { q: 'Which brawler is an old man with a snow blower?', a: 'Gale' },
    ],
    hard: [
        { q: 'Which two brawlers are siblings?', a: 'Nita' },
        { q: 'Which brawler was originally classified as Mythic before being changed?', a: 'Mortis' },
        { q: 'Which brawler is a stunt performer robot?', a: 'Stu' },
        { q: 'Which brawler is a trash collector who loves garbage?', a: 'Ash' },
        { q: 'Which brawler throws their own head as a Super?', a: 'Tick' },
        { q: 'Which brawler is a snake oil salesman who heals and poisons?', a: 'Byron' },
        { q: 'Which brawler\'s attack bounces between enemies?', a: 'Jessie' },
        { q: 'Which brawler creates a sandstorm for stealth?', a: 'Sandy' },
        { q: 'Which brawler is a grumpy ice cream seller?', a: 'Lou' },
        { q: 'Which brawler is Pam and Jessie\'s relative that fixes things?', a: 'Jessie' },
        { q: 'Which brawler\'s attack goes through walls using ground vibrations?', a: 'Jacky' },
        { q: 'Which brawler marks enemies so everyone deals extra damage to them?', a: 'Belle' },
    ],
    extreme: [
        { q: 'Which brawler was the first Chromatic rarity brawler ever released?', a: 'Gale' },
        { q: 'Which brawler\'s porters come from a suitcase turret?', a: 'Mr. P' },
        { q: 'Which brawler can eat walls to heal with a Gadget?', a: 'Sprout' },
        { q: 'Which brawler pilots a giant mech suit?', a: 'Meg' },
        { q: 'Which brawler is a kung fu movie star?', a: 'Fang' },
        { q: 'Which brawler hatches baby aliens?', a: 'Eve' },
        { q: 'Which brawler creates a fashion clone of herself?', a: 'Lola' },
        { q: 'Which brawler is Colonel of the space dogs?', a: 'Ruffs' },
        { q: 'Which brawler silences enemies preventing them from attacking?', a: 'Otis' },
        { q: 'Which brawler is a mail carrier who throws bombs?', a: 'Grom' },
        { q: 'Which brawler is a jester/clown who uses magic tricks?', a: 'Chester' },
        { q: 'Which brawler has two forms — a cannon and a close-range fighter?', a: 'Bonnie' },
    ],
};

// ===== DIFFICULTY CONFIG =====
const DIFF_CONFIG = {
    easy:    { options: 3, blurLevel: 0,  timerHint: true },
    medium:  { options: 4, blurLevel: 8,  timerHint: false },
    hard:    { options: 5, blurLevel: 15, timerHint: false },
    extreme: { options: 6, blurLevel: 25, timerHint: false },
};

async function initQuizPage() {
    if (quizLoaded) return;
    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        quizBrawlers = data.list || data;
        quizLoaded = true;
    } catch (err) {
        console.error('Failed to load brawlers for quiz:', err);
    }
}

function backToQuizMenu() {
    document.getElementById('quiz-menu').style.display = '';
    document.getElementById('quiz-game').classList.add('hidden');
    document.getElementById('quiz-diff-select').classList.add('hidden');
    document.getElementById('diff-normal').classList.remove('hidden');
    document.getElementById('diff-mega').classList.add('hidden');
    currentQuiz = null;
    currentDifficulty = null;
}

function selectQuiz(type) {
    currentQuiz = type;
    document.getElementById('quiz-menu').style.display = 'none';
    document.getElementById('quiz-diff-select').classList.remove('hidden');

    if (type === 'mega') {
        document.getElementById('diff-normal').classList.add('hidden');
        document.getElementById('diff-mega').classList.remove('hidden');
    } else {
        document.getElementById('diff-normal').classList.remove('hidden');
        document.getElementById('diff-mega').classList.add('hidden');
    }
}

function startQuiz(difficulty) {
    currentDifficulty = difficulty;
    quizScore = 0;
    quizQuestionIndex = 0;
    usedQuestions = [];

    document.getElementById('quiz-diff-select').classList.add('hidden');
    document.getElementById('quiz-game').classList.remove('hidden');
    document.getElementById('quiz-score').textContent = '0';
    document.getElementById('quiz-total').textContent = QUIZ_LENGTH;

    const diffInfo = DIFF_LABELS[difficulty];
    const badge = document.getElementById('quiz-difficulty-badge');
    badge.textContent = `${diffInfo.emoji} ${diffInfo.name}`;
    badge.style.color = diffInfo.color;

    nextQuestion();
}

function startMega(numOptions) {
    megaOptions = numOptions;
    currentDifficulty = 'medium';
    quizScore = 0;
    quizQuestionIndex = 0;
    usedQuestions = [];

    document.getElementById('quiz-diff-select').classList.add('hidden');
    document.getElementById('quiz-game').classList.remove('hidden');
    document.getElementById('quiz-score').textContent = '0';
    document.getElementById('quiz-total').textContent = QUIZ_LENGTH;

    const badge = document.getElementById('quiz-difficulty-badge');
    badge.textContent = `🔥 MEGA MIX (${numOptions} options)`;
    badge.style.color = '#ff6400';

    nextQuestion();
}

function nextQuestion() {
    if (currentQuiz === 'mega') {
        const types = ['guess-brawler', 'voiceline', 'ability', 'true-false', 'gadget', 'starpower', 'rarity', 'emoji', 'attack', 'trivia'];
        const type = types[Math.floor(Math.random() * types.length)];
        runQuizType(type);
    } else {
        runQuizType(currentQuiz);
    }
}

function runQuizType(type) {
    if (type === 'guess-brawler') generateGuessBrawler();
    else if (type === 'voiceline') generateVoiceline();
    else if (type === 'ability') generateAbility();
    else if (type === 'true-false') generateTrueFalse();
    else if (type === 'gadget') generateGadget();
    else if (type === 'starpower') generateStarPower();
    else if (type === 'rarity') generateRarity();
    else if (type === 'emoji') generateEmoji();
    else if (type === 'attack') generateAttack();
    else if (type === 'trivia') generateTrivia();
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRandom(arr, n) {
    return shuffle(arr).slice(0, n);
}

function getWrongOptions(correctName, count) {
    const others = quizBrawlers.filter(b => b.name !== correctName);
    return pickRandom(others, count).map(b => b.name);
}

function handleAnswer(btn, correct, allBtns) {
    allBtns.forEach(b => b.disabled = true);

    if (btn.dataset.answer === correct) {
        btn.classList.add('correct');
        quizScore++;
        document.getElementById('quiz-score').textContent = quizScore;
    } else {
        btn.classList.add('wrong');
        allBtns.forEach(b => {
            if (b.dataset.answer === correct) b.classList.add('correct');
        });
    }

    quizQuestionIndex++;
    if (quizQuestionIndex >= QUIZ_LENGTH) {
        setTimeout(showResult, 1200);
    } else {
        setTimeout(nextQuestion, 1000);
    }
}

function showResult() {
    const pct = Math.round((quizScore / QUIZ_LENGTH) * 100);
    let grade, msg;
    if (pct === 100) { grade = 'perfect'; msg = 'PERFECT! You are a true Brawl Stars master!'; }
    else if (pct >= 70) { grade = 'great'; msg = 'Really good! You know your brawlers!'; }
    else if (pct >= 40) { grade = 'ok'; msg = 'Not bad! Keep practicing and you will get better!'; }
    else { grade = 'bad'; msg = 'Practice more! Play some Brawl Stars and try again!'; }

    const isMega = currentQuiz === 'mega';
    const diffInfo = DIFF_LABELS[currentDifficulty] || { name: 'Mega', color: '#ff6400', emoji: '🔥' };
    const badgeText = isMega ? `🔥 MEGA MIX (${megaOptions} options)` : `${diffInfo.emoji} ${diffInfo.name}`;
    const badgeColor = isMega ? '#ff6400' : diffInfo.color;
    const replayBtn = isMega
        ? `<button class="btn-primary" onclick="startMega(${megaOptions})">Play again</button>`
        : `<button class="btn-primary" onclick="startQuiz('${currentDifficulty}')">Play again</button>`;

    document.getElementById('quiz-content').innerHTML = `
        <div class="quiz-result">
            <h3>Quiz Complete!</h3>
            <p style="color: ${badgeColor}; font-weight: 800;">${badgeText}</p>
            <div class="result-score ${grade}">${quizScore} / ${QUIZ_LENGTH}</div>
            <p>${msg}</p>
            ${replayBtn}
            <button class="btn-back" style="margin-left: 0.8rem;" onclick="backToQuizMenu()">All quizzes</button>
        </div>
    `;
}

// ===== QUIZ 1: Guess the Brawler =====
function getOptionCount() {
    if (currentQuiz === 'mega') return megaOptions;
    return DIFF_CONFIG[currentDifficulty].options;
}

function generateGuessBrawler() {
    if (quizBrawlers.length < 8) return;
    const config = DIFF_CONFIG[currentDifficulty];
    const numOptions = getOptionCount();

    const correct = quizBrawlers[Math.floor(Math.random() * quizBrawlers.length)];
    const wrongNames = getWrongOptions(correct.name, numOptions - 1);
    const options = shuffle([correct.name, ...wrongNames]);

    const blurClass = currentDifficulty === 'extreme' ? 'silhouette'
                    : config.blurLevel > 0 ? 'blurred' : '';
    const blurStyle = config.blurLevel > 0 ? `filter: blur(${config.blurLevel}px) brightness(0.7);` : '';

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler is this?</h4>
            <img class="quiz-image ${blurClass}" src="${correct.imageUrl2 || correct.imageUrl}" alt="?"
                 id="quiz-img" style="${blurStyle}">
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const revealDelay = currentDifficulty === 'easy' ? 0 : currentDifficulty === 'medium' ? 1200 : 2000;
    if (revealDelay > 0) {
        setTimeout(() => {
            const img = document.getElementById('quiz-img');
            if (img) {
                img.style.filter = '';
                img.classList.remove('blurred', 'silhouette');
            }
        }, revealDelay);
    }

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correct.name, btns));
    });
}

// ===== QUIZ 2: Voiceline =====
function generateVoiceline() {
    // For mega, pick from all difficulties
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, QUIZ_VOICELINES[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('v_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('v_')); return generateVoiceline(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('v_' + correctName);
    const line = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Who says this?</h4>
            <div class="quiz-voiceline">${line}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 3: Which Super? =====
function generateAbility() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, QUIZ_SUPERS[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('s_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('s_')); return generateAbility(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('s_' + correctName);
    const superDesc = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler has this Super?</h4>
            <div class="quiz-voiceline">${superDesc}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 4: True or False =====
function generateTrueFalse() {
    // For mega, pick from all difficulties
    let pool;
    if (currentQuiz === 'mega') {
        pool = [...TRUE_FALSE.easy, ...TRUE_FALSE.medium, ...TRUE_FALSE.hard, ...TRUE_FALSE.extreme];
    } else {
        pool = TRUE_FALSE[currentDifficulty] || TRUE_FALSE.easy;
    }
    const available = pool.filter((_, i) => !usedQuestions.includes('tf_' + i));
    if (available.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('tf_')); return generateTrueFalse(); }

    const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
    usedQuestions.push('tf_' + idx);
    const q = pool[idx];
    const correctAnswer = q.a ? 'True' : 'False';

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>True or False?</h4>
            <div class="quiz-voiceline">${q.q}</div>
            <div class="quiz-options" id="quiz-options">
                <button class="quiz-option" data-answer="True">True</button>
                <button class="quiz-option" data-answer="False">False</button>
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctAnswer, btns));
    });
}

// ===== QUIZ 5: Gadget Quiz =====
function generateGadget() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, QUIZ_GADGETS[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('g_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('g_')); return generateGadget(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('g_' + correctName);
    const desc = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler has this Gadget?</h4>
            <div class="quiz-voiceline">🔧 ${desc}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 6: Star Power Quiz =====
function generateStarPower() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, QUIZ_STAR_POWERS[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('sp_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('sp_')); return generateStarPower(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('sp_' + correctName);
    const desc = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler has this Star Power?</h4>
            <div class="quiz-voiceline">⭐ ${desc}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 7: Guess the Rarity =====
function generateRarity() {
    if (quizBrawlers.length < 8) return;

    const brawlersWithRarity = quizBrawlers.filter(b => b.rarity && b.rarity.name);
    if (brawlersWithRarity.length === 0) return generateGuessBrawler();

    const correct = brawlersWithRarity[Math.floor(Math.random() * brawlersWithRarity.length)];
    const correctRarity = correct.rarity.name;

    const allRarities = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary', 'Chromatic'];
    const wrongRarities = shuffle(allRarities.filter(r => r !== correctRarity)).slice(0, Math.min(getOptionCount() - 1, allRarities.length - 1));
    const options = shuffle([correctRarity, ...wrongRarities]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>What rarity is this brawler?</h4>
            <img class="quiz-image" src="${correct.imageUrl2 || correct.imageUrl}" alt="${correct.name}">
            <p style="font-weight:800; font-size:1.2rem; margin: 0.5rem 0;">${correct.name}</p>
            <div class="quiz-options quiz-options-${options.length}" id="quiz-options">
                ${options.map(r => `<button class="quiz-option" data-answer="${r}">${r}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctRarity, btns));
    });
}

// ===== QUIZ 8: Emoji Quiz =====
function generateEmoji() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, EMOJI_BRAWLERS[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('e_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('e_')); return generateEmoji(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('e_' + correctName);
    const emojis = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler do these emojis represent?</h4>
            <div class="quiz-emoji-clue">${emojis}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 9: Guess the Attack =====
function generateAttack() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let allPool = {};
    diffKeys.forEach(d => Object.assign(allPool, QUIZ_ATTACKS[d] || {}));

    const keys = Object.keys(allPool).filter(k => !usedQuestions.includes('a_' + k));
    if (keys.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('a_')); return generateAttack(); }

    const correctName = keys[Math.floor(Math.random() * keys.length)];
    usedQuestions.push('a_' + correctName);
    const desc = allPool[correctName];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(correctName, numOptions - 1);
    const options = shuffle([correctName, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>Which brawler has this attack?</h4>
            <div class="quiz-voiceline">💥 ${desc}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, correctName, btns));
    });
}

// ===== QUIZ 10: Brawler Trivia =====
function generateTrivia() {
    const diffKeys = currentQuiz === 'mega' ? ['easy', 'medium', 'hard', 'extreme'] : [currentDifficulty];
    let pool = [];
    diffKeys.forEach(d => { if (BRAWLER_TRIVIA[d]) pool = pool.concat(BRAWLER_TRIVIA[d]); });

    const available = pool.filter((_, i) => !usedQuestions.includes('tr_' + i));
    if (available.length === 0) { usedQuestions = usedQuestions.filter(q => !q.startsWith('tr_')); return generateTrivia(); }

    const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
    usedQuestions.push('tr_' + idx);
    const q = pool[idx];

    const numOptions = getOptionCount();
    const wrongNames = getWrongOptions(q.a, numOptions - 1);
    const options = shuffle([q.a, ...wrongNames]);

    const content = document.getElementById('quiz-content');
    content.innerHTML = `
        <div class="quiz-question-card">
            <p class="quiz-hint">Question ${quizQuestionIndex + 1} of ${QUIZ_LENGTH}</p>
            <h4>🧠 Brawler Trivia</h4>
            <div class="quiz-voiceline">${q.q}</div>
            <div class="quiz-options quiz-options-${numOptions}" id="quiz-options">
                ${options.map(name => `<button class="quiz-option" data-answer="${name}">${name}</button>`).join('')}
            </div>
        </div>
    `;

    const btns = content.querySelectorAll('.quiz-option');
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, q.a, btns));
    });
}
