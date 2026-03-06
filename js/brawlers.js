// ===== BRAWLERS.JS — Brawler List, Details & Favorites =====

let allBrawlers = [];
let brawlersLoaded = false;
let currentCategory = 'all';
let currentSearch = '';

// Manual class mapping for brawlers that the API lists as "Unknown"
const manualClassMap = {
    'Najia': 'Assassin',
    'Clancy': 'Damage Dealer',
    'Berry': 'Support',
    'Shade': 'Assassin',
    'Moe': 'Artillery',
    'Draco': 'Tank',
    'Kenji': 'Assassin',
    'Juju': 'Controller',
    'Meeple': 'Damage Dealer',
    'Ollie': 'Controller',
    'Lily': 'Assassin',
    'Chuck': 'Damage Dealer',
    'Charlie': 'Controller',
    'Melodie': 'Assassin',
    'Angelo': 'Marksman',
    'Larry & Lawrie': 'Damage Dealer',
    'Bea': 'Marksman',
    'Bonnie': 'Marksman',
    'Buster': 'Tank',
    'Chester': 'Controller',
    'Doug': 'Support',
    'Eve': 'Artillery',
    'Fang': 'Assassin',
    'Gray': 'Support',
    'Griff': 'Damage Dealer',
    'Grom': 'Artillery',
    'Gus': 'Support',
    'Hank': 'Tank',
    'Janet': 'Marksman',
    'Kit': 'Support',
    'Lola': 'Damage Dealer',
    'Maisie': 'Marksman',
    'Mandy': 'Marksman',
    'Meg': 'Damage Dealer',
    'Mico': 'Assassin',
    'Nani': 'Marksman',
    'Otis': 'Controller',
    'Pearl': 'Marksman',
    'R-T': 'Damage Dealer',
    'Ruffs': 'Support',
    'Sam': 'Tank',
    'Squeak': 'Controller',
    'Willow': 'Controller',
};

// ===== FAVORITES (localStorage) =====
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('bh_favorites') || '[]');
    } catch { return []; }
}

function saveFavorites(favs) {
    localStorage.setItem('bh_favorites', JSON.stringify(favs));
}

function toggleFavorite(brawlerId, event) {
    event.stopPropagation();
    let favs = getFavorites();
    if (favs.includes(brawlerId)) {
        favs = favs.filter(id => id !== brawlerId);
    } else {
        favs.push(brawlerId);
    }
    saveFavorites(favs);
    renderBrawlers(allBrawlers);
}

function isFavorite(brawlerId) {
    return getFavorites().includes(brawlerId);
}

// ===== TIPS =====
const brawlerTips = {
    'Shelly': [
        'Save your Super until the enemy is close — it deals the most damage at short range.',
        'Use bushes to ambush enemies and land a full Super hit.',
        'In Showdown, collect power cubes early and avoid unnecessary fights.',
        'Shelly\'s Super can break through walls — use it strategically.'
    ],
    'Nita': [
        'Send the bear forward to tank damage while you shoot from behind.',
        'The bear is great for controlling an area or chasing low-HP enemies.',
        'Aim to charge your Super quickly by hitting multiple enemies.',
        'In Gem Grab, the bear can collect gems and distract the enemy.'
    ],
    'Colt': [
        'Aim carefully — all shots need to hit to deal full damage.',
        'Use your Super to destroy walls and open up the map.',
        'Keep your distance and play hit-and-run against tanks.',
        'Strafe (move sideways) while shooting to be harder to hit.'
    ],
    'Bull': [
        'Hide in bushes near the center and ambush enemies.',
        'Use your Super to escape dangerous situations or close the distance.',
        'Bull dominates at close range — avoid open areas.',
        'In Heist, use the Super to charge straight at the safe.'
    ],
    'Jessie': [
        'Place the turret behind walls or in protected positions.',
        'Jessie\'s shots bounce — position yourself to hit multiple enemies.',
        'The turret can be used as a distraction while you and your team push.',
        'Repair the turret by shooting it with your attack.'
    ],
    'Brock': [
        'Keep long range and aim where the enemy is heading.',
        'The Super destroys walls and deals large area damage — perfect for opening up the map.',
        'Avoid close combat at all costs.',
        'Great in Bounty and Knockout — control sightlines from a safe distance.'
    ],
    'Dynamike': [
        'Throw dynamite where the enemy will be, not where they are.',
        'The Super can deal massive damage to groups — save it for the right moment.',
        'Use the Star Power "Dyna-Jump" to escape and surprise enemies.',
        'Behind walls you are safe — throw over them!'
    ],
    'Bo': [
        'Place mines at choke points and bushes for maximum effect.',
        'Bo is great in Gem Grab — control the center with mines.',
        'His shots spread out — aim at medium range for the best hit chance.',
        'With the "Snare a Bear" Star Power, enemies that step on mines get stunned.'
    ],
    'El Primo': [
        'The Super is perfect for jumping on low-HP enemies.',
        'In Brawl Ball, use the Super with the ball to score goals.',
        'Collect power-ups in bushes and avoid sharpshooters like Brock and Piper.',
        'El Primo is best in close combat — avoid chasing enemies across open areas.'
    ],
    'Poco': [
        'Healing is your most important ability — keep your team alive.',
        'Poco\'s attack hits wide — hit multiple enemies at once.',
        'Stay close to your teammates and heal them constantly.',
        'The Super heals through walls — use it to save teammates.'
    ],
    'Rosa': [
        'The Super gives you a shield — activate it before entering a fight.',
        'Rosa dominates in bushes — use them to your advantage.',
        'Perfect tank in Brawl Ball and Gem Grab.',
        'With shield active, you can push aggressively without taking much damage.'
    ],
    'Barley': [
        'Throw bottles behind walls to control areas.',
        'Barley is perfect in Heist — throw at the safe from a safe distance.',
        'The Super covers a large area — use it to block enemies.',
        'Keep moving at all times — never stand still with Barley.'
    ],
    'Spike': [
        'Spike\'s attack spreads out — aim slightly to the side to hit with the spikes.',
        'The Super slows down enemies and deals damage — perfect for area control.',
        'Spike has low HP — keep your distance and avoid tanks.',
        'One of the best brawlers in the game — can be played in almost all game modes.'
    ],
    'Crow': [
        'Poison prevents enemies from healing — keep them poisoned.',
        'Crow is great at chipping damage — you don\'t need to kill right away.',
        'The Super can be used offensively to finish or defensively to escape.',
        'Best in Showdown and Bounty where his poke damage shines.'
    ],
    'Leon': [
        'The Super makes you invisible — use it to sneak up on enemies.',
        'Leon deals the most damage at close range — close the distance before revealing yourself.',
        'Invisibility disappears when you attack — wait until you are close.',
        'Best in Showdown — sneak up on weakened enemies.'
    ],
    'Mortis': [
        'Dash through enemies and collect energy — avoid dashing into tanks.',
        'Mortis is great at chasing throwers (Dynamike, Barley, Tick).',
        'Save the Super until you are low HP — it heals you.',
        'In Brawl Ball, Mortis can dash past the entire team with the ball.'
    ],
    'Piper': [
        'Piper deals more damage at longer range — stay as far away as possible.',
        'The Super launches you into the air — use it to escape close combat.',
        'Best on open maps like Bounty and Knockout.',
        'Aim where the enemy will move, not where they are standing.'
    ],
    'Pam': [
        'Place the healing station strategically — it can decide matches.',
        'Pam has high HP and good damage — she can tank and deal damage.',
        'In Gem Grab, place the healing station near the gem mine.',
        'Her attack spreads out — great for controlling large areas.'
    ],
    'Frank': [
        'Frank\'s attack has a delay — predict where the enemy will be.',
        'The Super stuns all enemies it hits — a game-changer in team fights.',
        'Avoid attacking near the edge — you can get knocked off the map.',
        'Frank is extremely strong with the "Power Grab" Star Power.'
    ],
    'Darryl': [
        'The Super charges automatically — use it to roll into enemies.',
        'Darryl deals double damage up close — roll in and shoot immediately.',
        'Great in Heist — roll straight into the safe.',
        'Use bushes and roll out from them for a surprise attack.'
    ],
    'Penny': [
        'Penny\'s shot splits behind the first enemy — aim at the one standing in front.',
        'The cannon is strong — place it behind walls where the enemy can\'t reach it.',
        'In Gem Grab, place the cannon to control the center.',
        'The cannon can deal massive damage if the enemy ignores it.'
    ],
    'Gene': [
        'Gene\'s Super pulls enemies to you — perfect for isolating an enemy.',
        'Pull enemies into your team for an easy kill.',
        'Gene\'s attack splits if it doesn\'t hit — great for poking.',
        'In Gem Grab, you can pull the gem carrier for a comeback.'
    ],
    'Tara': [
        'Tara\'s Super pulls in all enemies — combo with your team\'s attacks.',
        'Save the Super until multiple enemies are close together.',
        'Tara\'s attack pierces through enemies — position yourself to hit multiple targets.',
        'The shadow from Star Power can scout bushes and distract enemies.'
    ],
    'Max': [
        'Max is all about speed — keep your team fast with the Super.',
        'Her attack fires quickly — keep moving constantly while shooting.',
        'The Super gives the entire team a speed boost — perfect for pushing.',
        'Great in almost all game modes thanks to her versatility.'
    ],
    'Mr. P': [
        'The porter station spawns porters that distract the enemy — place it wisely.',
        'Mr. P\'s shot bounces on miss — it often hits anyway.',
        'Great in control-based game modes like Gem Grab and Hot Zone.',
        'The porters can pressure enemies and gather information.'
    ],
    'Sprout': [
        'The Super creates a wall — block enemies or protect your team.',
        'Sprout\'s shots bounce — you can hit enemies behind walls.',
        'Extremely good in Gem Grab and Hot Zone with its area control.',
        'Think tactically with the wall — it can trap enemies or block their escape.'
    ],
    'Surge': [
        'Each Super upgrades Surge — prioritize charging your Super.',
        'Stage 3 (teleport) makes Surge extremely dangerous — play aggressively then.',
        'Avoid dying — you lose your upgrades.',
        'Surge is weak at the start — play carefully until you have upgraded.'
    ],
    'Edgar': [
        'Edgar\'s Super charges automatically — jump on weakened enemies.',
        'He heals by dealing damage — fight aggressively in close combat.',
        'Best in Showdown — wait until enemies are weak and jump in.',
        'Avoid sharpshooters like Brock and Piper — they will kill you before you reach them.'
    ],
    'Stu': [
        'Stu\'s Super charges from a single hit — dash constantly!',
        'Use the dash to dodge shots and chase enemies.',
        'The fire trail deals damage — dash through enemies.',
        'Extremely high skill ceiling — practice dash timing to get really good.'
    ],
    'Belle': [
        'Belle\'s Super marks an enemy to take extra damage — focus on them.',
        'Her shots bounce — position yourself to hit multiple targets.',
        'Great in Bounty and Knockout — mark the most dangerous enemy.',
        'Play as a sniper — keep your distance and chip away at their health.'
    ],
    'Buzz': [
        'The Super pulls you to the enemy and stuns — combo with an attack immediately.',
        'Buzz charges Super faster near enemies — be aggressive.',
        'Best at close-medium range — close the distance with the Super.',
        'In Brawl Ball, stun the ball carrier and take the ball.'
    ],
    'Ash': [
        'Ash gets stronger the more rage he has — take damage intentionally sometimes.',
        'At full rage, Ash is one of the most dangerous tanks in the game.',
        'Great in Gem Grab and Brawl Ball — his rage builds quickly in team fights.',
        'The Super spawns rats that build rage — use it early.'
    ],
    'Amber': [
        'Amber has a continuous flame — move around and spray enemies.',
        'The Super places a fire pool on the ground — great for area denial.',
        'She has long range and good damage — control the lanes.',
        'Be careful with ammo — she can burn through it all quickly.'
    ],
    'Sandy': [
        'Sandy\'s Super creates a sandstorm that makes your team invisible.',
        'Great in Gem Grab — invisibility at the gem mine is invaluable.',
        'Sandy\'s attack hits wide — great for controlling groups.',
        'The sandstorm works defensively (hiding) and offensively (ambushing).'
    ],
    'Gale': [
        'The Super blows enemies away — perfect for defending the goal in Brawl Ball.',
        'Gale\'s attack spreads out — great at medium range.',
        'The Spring Ejector gadget can give your team unexpected mobility.',
        'Great defensive brawler — protect your team by pushing enemies back.'
    ],
    'Colette': [
        'Colette deals percentage-based damage — she is great against high-HP tanks.',
        'The Super deals damage going forward AND coming back — position yourself for a double hit.',
        'Great in Heist — she deals heavy damage to the safe.',
        'Combo: attack + attack + Super kills most brawlers.'
    ],
    'Lou': [
        'Lou\'s Super creates a slippery surface — enemies can\'t control their movement.',
        'The freeze meter builds up — keep hitting the same enemy to freeze them.',
        'Great in Hot Zone and Gem Grab — control zones with ice.',
        'Slippery surfaces are extremely annoying for enemies — use them strategically.'
    ],
    'Byron': [
        'Byron heals teammates and damages enemies with the same attack!',
        'His shots deal damage/heal over time — stack hits.',
        'The Super heals the team and damages enemies in an area.',
        'Best healer in the game — play behind your team and support.'
    ],
    'Tick': [
        'Tick\'s mines control areas — throw them at choke points.',
        'The Super sends a head that chases enemies — great for finishing.',
        'Tick has the lowest HP in the game — ALWAYS stay behind walls.',
        'Perfect in Gem Grab and Knockout for area denial.'
    ],
    'Emz': [
        'Emz deals the most damage at medium range — not too close, not too far.',
        'The Super slows down enemies and deals damage — great for team fights.',
        'Keep enemies at sweet spot range for maximum damage.',
        'Great in Hot Zone — her attack controls zones perfectly.'
    ],
    'Bibi': [
        'Bibi\'s home run bar gives knockback — wait for it before swinging.',
        'The Super sends a bubble that bounces — great for checking bushes.',
        'Bibi is fast — run around enemies and hit from the side.',
        'Great in Brawl Ball — knockback + speed makes her perfect.'
    ],
    'Carl': [
        'Carl\'s attack comes back — position yourself to hit going out AND coming back.',
        'The Super makes him fast and deals damage around him — perfect in close combat.',
        'Great in Gem Grab and Hot Zone — his attack controls lanes.',
        'Wait until the pickaxe comes back before shooting again.'
    ],
    'Rico': [
        'Rico\'s shots bounce off walls — use it to hit around corners.',
        'On tight maps, Rico is extremely strong thanks to bouncing shots.',
        'The Super bounces too — really dangerous in corridors.',
        'Practice your angles — a good Rico player can land impossible shots.'
    ],
    'Jacky': [
        'Jacky\'s attack hits around her — she needs to be close.',
        'The Super pulls enemies closer — combo with your attack.',
        'Great tank in Gem Grab and Brawl Ball.',
        'Her attack goes through walls — use it against hidden enemies.'
    ],
    '8-Bit': [
        '8-Bit\'s turret boosts damage — place it strategically.',
        'He is slow but deals massive damage — position yourself correctly.',
        'In Showdown, 8-Bit is dangerous with turret + power cubes.',
        'Play defensively and let enemies come to you.'
    ],
    'Bea': [
        'Bea\'s supercharged shot deals massive damage — never waste it on a miss.',
        'After landing a hit, your next shot is powered up — aim carefully to maximize burst.',
        'Her slow from the Super makes it easy to land the supercharged follow-up shot.',
        'Keep distance and poke — Bea has low HP but incredible single-shot damage potential.'
    ],
    'Nani': [
        'Nani\'s orbs converge at max range — she deals the most damage at that sweet spot distance.',
        'Peep (her Super) can be steered into enemies for massive damage — use it behind cover.',
        'Protect Peep from enemy fire while controlling it — if destroyed it deals no damage.',
        'In Bounty and Knockout, Nani can one-shot many brawlers if all three orbs connect.'
    ],
    'Ruffs': [
        'Ruffs\' Super drops a power-up that permanently boosts an ally\'s HP and damage — prioritize your carry.',
        'His shots bounce off walls — use corridors and tight spaces to land extra hits.',
        'Give the power-up to a tank or assassin to make them even more dangerous.',
        'Great in Gem Grab and Bounty — the power-up can swing team fights decisively.'
    ],
    'Squeak': [
        'Squeak\'s bombs stick to enemies and explode after a delay — aim ahead of moving targets.',
        'His Super throws a large bomb that splits — perfect for area denial on objectives.',
        'Zone out enemies from choke points by placing sticky bombs at key positions.',
        'Best in Hot Zone and Gem Grab where enemies must stand in specific areas.'
    ],
    'Griff': [
        'Griff\'s attack spreads out over distance — he deals more total damage up close.',
        'The Super sends a wave of coins that deals high damage and recharges quickly.',
        'In Heist, Griff can shred the safe with close-range attacks and Super combos.',
        'Play mid-range and use your spread to hit multiple enemies simultaneously.'
    ],
    'Grom': [
        'Grom\'s attack explodes in an X pattern — aim at the center of enemy groups.',
        'His Super throws a massive bomb that deals heavy damage over a large area.',
        'Use walls to protect yourself — Grom can throw over them easily.',
        'Predict enemy movement carefully — the explosion delay means you must aim ahead.'
    ],
    'Fang': [
        'Fang\'s Super kick chains to nearby enemies — engage when enemies are grouped up.',
        'One Super kill resets it, allowing chain eliminations across the entire team.',
        'His shoe projectile charges Super quickly — poke from mid-range to build it up.',
        'In Brawl Ball, a chained Super can wipe the entire defending team.'
    ],
    'Eve': [
        'Eve\'s hatchlings from her attack deal extra damage — they\'re especially deadly at close range.',
        'She can float over water — use this to take unique positions enemies can\'t reach.',
        'Her Super spawns a hatchling egg that chases enemies — great for zoning.',
        'Control the map by hovering over water tiles and shooting from unexpected angles.'
    ],
    'Janet': [
        'Janet\'s Super lets her fly over the entire map — use it to escape or reposition.',
        'While flying, you can drop bombs on enemies below — aim for grouped-up targets.',
        'She deals solid damage at range — play her as a mid-to-long range damage dealer.',
        'Save the Super for clutch escapes or to fly over walls and surprise enemies.'
    ],
    'Bonnie': [
        'Bonnie has two forms: cannon (long-range) and melee (short-range) — switch based on the situation.',
        'In cannon form, poke from distance and build your Super to launch into melee form.',
        'Melee form has high speed and damage — use it to burst down enemies up close.',
        'Switch back to cannon form when low on HP to disengage safely.'
    ],
    'Otis': [
        'Otis\' Super silences an enemy — they can\'t attack, use Super, or gadget for several seconds.',
        'Silence the biggest threat on the enemy team to neutralize them in key moments.',
        'His attack shoots in a spread pattern — most effective at medium range.',
        'In Gem Grab, silencing the gem carrier can lead to easy team wipes.'
    ],
    'Sam': [
        'Sam throws his knuckle busters forward — when they\'re out, he punches at close range with more damage.',
        'Recall the knuckle busters to pull enemies toward you — great for finishing off kills.',
        'Sam is extremely tanky — play aggressively and get in the enemy\'s face.',
        'Use the knuckle busters throw to zone enemies away from objectives.'
    ],
    'Gus': [
        'Gus\' defeated spirit orb grants a shield to whoever picks it up — position to grab it yourself or give it to allies.',
        'His attack passes through enemies — line up shots to hit multiple targets.',
        'The shield is crucial for surviving burst damage — time your attacks to generate spirits.',
        'Great in Gem Grab and Bounty — the shields keep your team alive in crucial moments.'
    ],
    'Buster': [
        'Buster\'s Super creates a shield that absorbs enemy projectiles and converts them to HP.',
        'Face your shield toward the biggest damage threat to absorb the most damage.',
        'He deals good close-range damage — combine the shield with aggressive pushes.',
        'In team fights, shielding your teammates from incoming fire can turn the fight around.'
    ],
    'Gray': [
        'Gray\'s Super creates a portal link between himself and an ally — they can teleport to each other.',
        'Use the portal to save teammates who are in danger or to reposition quickly.',
        'His attack deals moderate damage in a line — focus on supporting your team rather than fragging.',
        'The portal link is incredibly powerful for objective modes — link with your gem carrier or ball carrier.'
    ],
    'Mandy': [
        'Mandy\'s attack focuses into a narrow beam the longer you aim — fully focused shots deal massive damage.',
        'Take your time to aim — a focused shot can delete squishy enemies from extreme range.',
        'She\'s one of the longest-range brawlers in the game — never get close to enemies.',
        'In Bounty and Knockout, Mandy controls sightlines better than almost any other brawler.'
    ],
    'Chester': [
        'Chester\'s Super is random each time — adapt your playstyle based on what you get.',
        'His attacks cycle through different patterns — learn all of them to know when to push.',
        'Unpredictability is Chester\'s strength — enemies can\'t prepare for what\'s coming next.',
        'Play aggressively when you roll a strong Super, and defensively if you get a weaker one.'
    ],
    'R-T': [
        'R-T splits into two halves when his Super is used — each half attacks independently.',
        'The area between R-T\'s two halves deals damage — trap enemies between them.',
        'Reuniting both halves ends the Super — time it carefully to maximize damage.',
        'Great in Hot Zone — split to cover multiple zones simultaneously.'
    ],
    'Willow': [
        'Willow\'s Super possesses an enemy — you control their brawler and can attack their own team.',
        'Possess the most dangerous enemy to turn their firepower against their own team.',
        'Her normal attack deals decent damage over time — keep enemies poisoned.',
        'In Gem Grab, possessing the gem carrier and walking them into your team is devastating.'
    ],
    'Doug': [
        'Doug heals allies by throwing food at them — aim at teammates who need HP.',
        'His Super creates a hotdog stand where he cooks — allies who walk through it get healed.',
        'Balance between dealing damage and healing your team — don\'t focus on just one.',
        'Place the hotdog stand near objectives where your team will naturally group up.'
    ],
    'Hank': [
        'Hank charges up a powerful blast — the longer you hold, the more damage and wider the shot.',
        'A fully charged attack deals devastating damage — be patient and aim well.',
        'His Super gives him a bubble shield that absorbs damage — use it to survive while charging.',
        'Play corners and walls — peek out with a fully charged blast and duck back behind cover.'
    ],
    'Pearl': [
        'Pearl\'s heat mechanic increases her damage the more she attacks — keep firing to maximize output.',
        'At max heat, her shots deal significantly more damage — push aggressively when heated up.',
        'Her Super dashes forward and deals damage — great for finishing low-HP enemies.',
        'Avoid long pauses between attacks or your heat drops — maintain pressure constantly.'
    ],
    'Chuck': [
        'Chuck rides rails on the map — use them to move quickly and surprise enemies.',
        'His Super places a new rail — create paths to reach strategic positions fast.',
        'While riding rails, Chuck moves very fast and deals damage on contact.',
        'Plan your rail routes to connect objectives — mobility is Chuck\'s biggest advantage.'
    ],
    'Charlie': [
        'Charlie places webs that trap and slow enemies — use them to control choke points.',
        'Her Super spins a large web that blocks a wide area — perfect for area denial.',
        'Trapped enemies are easy targets for your team — coordinate with allies for kills.',
        'Best in Hot Zone and Gem Grab where enemies are forced into specific areas.'
    ],
    'Maisie': [
        'Maisie charges a powerful shot by dealing damage — her charged attack hits hard.',
        'Focus on landing regular hits to build up the charged shot as fast as possible.',
        'Her Super dashes her backward — use it to escape after landing a charged shot.',
        'Play at medium-to-long range and poke to charge up, then burst with the powered shot.'
    ],
    'Melodie': [
        'Melodie\'s notes orbit around her after hitting enemies — they deal damage to nearby foes.',
        'With three orbiting notes, she becomes deadly in close range — walk into enemies to shred them.',
        'Her Super dashes forward — use it to close the gap and let orbiting notes do the work.',
        'Build up notes from a safe distance, then dive in with Super for devastating burst damage.'
    ],
    'Lily': [
        'Lily\'s Super gives her a fast dash that deals damage — use it to engage or escape.',
        'Her thorns extend her attack range after hitting an enemy — stay at the right distance.',
        'She\'s squishy but deadly — pick the right moment to dive in and eliminate a target.',
        'In Showdown, wait for enemies to weaken each other, then dash in for the finish.'
    ],
    'Angelo': [
        'Angelo can fly with his Super — use the aerial view to spot enemies and reposition.',
        'His poison arrows deal damage over time — keep enemies poisoned to prevent healing.',
        'While flying, Angelo can shoot down at enemies — rain arrows from above.',
        'Great in open maps where his long range and flight ability give maximum value.'
    ],
    'Draco': [
        'Draco breathes fire that deals heavy damage up close — get in the enemy\'s face.',
        'His Super launches him forward and deals area damage on landing — great for engaging.',
        'As a tank, Draco excels in Brawl Ball and Gem Grab where close combat is frequent.',
        'Use the fire breath to control areas and force enemies away from objectives.'
    ],
    'Kenji': [
        'Kenji\'s Super dashes forward with a katana slash — it can one-shot low-HP brawlers.',
        'His normal attacks build up his dash meter — stay aggressive to charge it faster.',
        'Time the dash carefully — missing leaves you vulnerable in the middle of enemies.',
        'Best against squishy targets — avoid dashing into tanks who can survive and fight back.'
    ],
    'Juju': [
        'Juju\'s attacks curse enemies — cursed enemies take more damage from all sources.',
        'His Super places a totem that curses enemies in an area — great for zone control.',
        'Coordinate with teammates to focus cursed enemies for quick eliminations.',
        'In Hot Zone, place the curse totem on the zone to punish enemies who contest it.'
    ],
    'Moe': [
        'Moe throws dynamite from his minecart — his attacks arc over walls.',
        'His Super sends the minecart rolling, dealing damage to everything in its path.',
        'Play behind cover and lob explosives — Moe excels as a thrower with unique mobility.',
        'Use the minecart Super to zone enemies away from objectives or finish off low-HP targets.'
    ],
    'Berry': [
        'Berry\'s attacks freeze enemies over time — keep hitting the same target to freeze them.',
        'Frozen enemies can\'t move or attack — focus one enemy down to take them out of the fight.',
        'His Super creates a freezing area — perfect for controlling zones and choke points.',
        'Great in Hot Zone and Gem Grab — freeze enemies contesting the objective.'
    ],
    'Shade': [
        'Shade can stealth and become invisible — use it to sneak behind enemy lines.',
        'His attacks deal more damage from stealth — always try to open with a stealth attack.',
        'The Super enhances his stealth abilities — save it for key assassination moments.',
        'Best in Showdown and Bounty where picking off isolated targets is most valuable.'
    ],
    'Ollie': [
        'Ollie swaps between two forms — each form has different attack patterns.',
        'Learn both forms\' strengths — switch at the right time to maximize effectiveness.',
        'One form is better for area control, the other for direct damage — adapt to the situation.',
        'In Hot Zone, use the area-control form to hold zones and switch for kills when needed.'
    ],
    'Meeple': [
        'Meeple\'s board game mechanic gives him unique abilities — learn each one.',
        'His attacks change based on his current space — adapt your playstyle accordingly.',
        'The Super advances him on the board — plan ahead for the power-up you want.',
        'Versatile in many game modes — his changing abilities keep enemies guessing.'
    ],
    'Clancy': [
        'Clancy\'s attacks evolve as he levels up during a match — he gets stronger over time.',
        'At higher evolution stages, his attacks deal more damage and have better patterns.',
        'Avoid dying — you lose evolution progress, weakening your attacks significantly.',
        'Play safely early on and ramp up aggression as your evolution increases.'
    ],
    'Larry & Lawrie': [
        'Larry & Lawrie split into two brawlers — control both to cover more ground.',
        'When one is eliminated, you switch to the other — position them apart for a second chance.',
        'Use one as a distraction while the other attacks from a different angle.',
        'Great in Gem Grab — spread out to collect gems from multiple positions.'
    ],
    'Lola': [
        'Lola\'s Super places an ego clone that copies her attacks — double your firepower.',
        'Position the clone to create crossfire — enemies caught between you and the clone take massive damage.',
        'The clone mimics your aim direction — place it where both you and the clone can hit the same target.',
        'In Bounty and Knockout, the clone\'s extra damage makes Lola a threat at any range.'
    ],
    'Meg': [
        'Meg\'s Super transforms her into a powerful mech — charge it as fast as possible.',
        'In mech form, she has massively increased HP and damage — play aggressively.',
        'Without the mech, Meg is very weak — stay behind your team and poke safely.',
        'Losing the mech drops you back to base Meg — be aware of your mech\'s HP.'
    ],
    'Kit': [
        'Kit can attach to allies with his Super — he heals them and boosts their abilities.',
        'While attached, Kit is hard to hit — let your ally do the fighting while you support.',
        'Detach and reattach strategically — switch to the teammate who needs help most.',
        'In Gem Grab, attach to the gem carrier to keep them alive through heavy fire.'
    ],
    'Mico': [
        'Mico\'s sound-based attacks bounce off walls — use tight maps to maximize damage.',
        'His Super lets him jump over walls — surprise enemies with unexpected angles.',
        'Play aggressively as an assassin — get in, deal burst damage, and jump out.',
        'Best on maps with lots of walls — his wall-bouncing attacks become much harder to dodge.'
    ],
    'Najia': [
        'Najia\'s snake attacks travel along the ground and deal damage over time.',
        'Her Super sends a large snake that controls a wide area — use it to zone enemies.',
        'As an assassin, look for isolated targets and strike when they\'re away from their team.',
        'The snakes can hit enemies behind cover — use them to flush out hiding brawlers.'
    ]
};

const defaultTips = [
    'Learn the brawler\'s range and play at the right distance.',
    'Save your Super for the right moment — don\'t waste it.',
    'Communicate with your team and play the objective.',
    'Practice in the training area to understand shot patterns and timing.'
];

// ===== LOAD & RENDER =====
function getBrawlerClass(brawler) {
    const apiClass = brawler.class?.name;
    if (apiClass && apiClass !== 'Unknown') return apiClass;
    return manualClassMap[brawler.name] || 'Damage Dealer';
}

function getFilteredBrawlers() {
    return allBrawlers.filter(b => {
        const matchesSearch = !currentSearch || b.name.toLowerCase().includes(currentSearch);
        const matchesCategory = currentCategory === 'all' || getBrawlerClass(b) === currentCategory;
        return matchesSearch && matchesCategory;
    });
}

async function loadBrawlers() {
    if (brawlersLoaded) return;

    const container = document.getElementById('brawler-list');

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        allBrawlers = data.list || data;

        renderBrawlers(getFilteredBrawlers());
        brawlersLoaded = true;

        // Set up search
        document.getElementById('brawler-search').addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            renderBrawlers(getFilteredBrawlers());
        });

        // Set up category filters
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.cat;
                renderBrawlers(getFilteredBrawlers());
            });
        });
    } catch (err) {
        console.error('Failed to load brawlers:', err);
        container.innerHTML = '<p class="error-message">Could not load brawlers. Please try again later.</p>';
    }
}

function renderBrawlers(brawlers) {
    const container = document.getElementById('brawler-list');
    const favs = getFavorites();

    if (brawlers.length === 0) {
        container.innerHTML = '<p class="error-message">No brawlers found.</p>';
        return;
    }

    // Split into favorites and rest
    const favBrawlers = brawlers.filter(b => favs.includes(b.id));
    const otherBrawlers = brawlers.filter(b => !favs.includes(b.id));

    let html = '';

    // Favorites section
    if (favBrawlers.length > 0) {
        html += `
            <div class="favorites-section" style="grid-column: 1 / -1;">
                <div class="section-title" style="margin-bottom: 0.8rem;">
                    <h3 style="font-size: 1.1rem;">Favorites</h3>
                </div>
                <div class="favorites-grid">
                    ${favBrawlers.map(b => renderBrawlerCard(b, true)).join('')}
                </div>
            </div>
        `;
    }

    // All other brawlers
    html += otherBrawlers.map(b => renderBrawlerCard(b, false)).join('');

    container.innerHTML = html;
}

function renderBrawlerCard(brawler, isFav) {
    const bClass = getBrawlerClass(brawler);
    return `
        <div class="brawler-card ${isFav ? 'is-favorite' : ''}" onclick="showBrawlerDetail(${brawler.id})">
            <button class="fav-btn ${isFav ? 'is-fav' : ''}"
                    onclick="toggleFavorite(${brawler.id}, event)"
                    title="${isFav ? 'Remove favorite' : 'Add to favorites'}">
                ${isFav ? '&#9829;' : '&#9825;'}
            </button>
            <img src="${brawler.imageUrl || brawler.imageUrl2 || ''}" alt="${brawler.name}" loading="lazy">
            <div class="brawler-name">${brawler.name}</div>
            <div class="brawler-rarity" style="color: ${brawler.rarity?.color || 'inherit'}">${brawler.rarity?.name || ''}</div>
            <div class="brawler-class-tag">${bClass}</div>
        </div>
    `;
}

// ===== DETAIL VIEW =====
function showBrawlerDetail(brawlerId) {
    const brawler = allBrawlers.find(b => b.id === brawlerId);
    if (!brawler) return;

    const tips = brawlerTips[brawler.name] || defaultTips;
    const fav = isFavorite(brawlerId);
    const content = document.getElementById('brawler-detail-content');

    const starPowersHtml = (brawler.starPowers || []).map(sp => `
        <div class="ability-card">
            ${sp.imageUrl ? `<img src="${sp.imageUrl}" alt="${sp.name}">` : ''}
            <div class="ability-info">
                <div class="ability-name">${sp.name}</div>
                <div class="ability-desc">${sp.description || ''}</div>
            </div>
        </div>
    `).join('');

    const gadgetsHtml = (brawler.gadgets || []).map(g => `
        <div class="ability-card">
            ${g.imageUrl ? `<img src="${g.imageUrl}" alt="${g.name}">` : ''}
            <div class="ability-info">
                <div class="ability-name">${g.name}</div>
                <div class="ability-desc">${g.description || ''}</div>
            </div>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="brawler-detail-header">
            <img src="${brawler.imageUrl || brawler.imageUrl2 || ''}" alt="${brawler.name}">
            <div class="info">
                <h2>
                    ${brawler.name}
                    <button class="fav-btn ${fav ? 'is-fav' : ''}" style="position:relative;top:auto;right:auto;display:inline-block;vertical-align:middle;margin-left:8px;"
                            onclick="toggleFavorite(${brawler.id}, event); showBrawlerDetail(${brawler.id});"
                            title="${fav ? 'Remove favorite' : 'Add to favorites'}">
                        ${fav ? '&#9829;' : '&#9825;'}
                    </button>
                </h2>
                <div class="meta">
                    ${brawler.class?.name ? `<span class="badge">${brawler.class.name}</span>` : ''}
                    ${brawler.rarity?.name ? `<span class="badge rarity" style="color: ${brawler.rarity.color || 'inherit'}">${brawler.rarity.name}</span>` : ''}
                </div>
            </div>
        </div>

        ${brawler.description ? `<p class="brawler-description">${brawler.description}</p>` : ''}

        ${starPowersHtml ? `
        <div class="detail-section">
            <h4>Star Powers</h4>
            ${starPowersHtml}
        </div>
        ` : ''}

        ${gadgetsHtml ? `
        <div class="detail-section">
            <h4>Gadgets</h4>
            ${gadgetsHtml}
        </div>
        ` : ''}

        <div class="detail-section">
            <h4>Tips & Strategy</h4>
            <ul class="tips-list">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('brawler-detail').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeBrawlerDetail() {
    document.getElementById('brawler-detail').classList.add('hidden');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBrawlerDetail();
});

// Close modal on clicking outside
document.getElementById('brawler-detail').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeBrawlerDetail();
});
