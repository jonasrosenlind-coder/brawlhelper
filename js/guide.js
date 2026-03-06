// ===== GUIDE.JS — Brawl Guide: Brawler + Game Mode tips =====

let guideLoaded = false;
let guideBrawlers = [];

// Game modes for dropdown
const GUIDE_MODES = [
    'Gem Grab',
    'Brawl Ball',
    'Showdown',
    'Heist',
    'Bounty',
    'Hot Zone',
    'Knockout',
    'Duels'
];

// ===== GUIDE DATA =====
// Structure: brawlerName -> gameMode -> [tips]
const BRAWL_GUIDES = {
    'Shelly': {
        'Gem Grab': [
            'Stay near the middle and control the gem mine with your wide attack.',
            'Save your Super to knock back enemies who try to push.',
            'Play as a semi-tank — collect gems and fall back when you have many.'
        ],
        'Brawl Ball': [
            'Use Super to break walls in front of the goal and open up shot angles.',
            'Great as a defender — knockback from Super stops attackers.',
            'Run with the ball near walls and use Super to clear a path.'
        ],
        'Showdown': [
            'Hide in bushes and surprise enemies with full damage at close range.',
            'Collect power cubes early and avoid open areas.',
            'Save Super until someone gets close — a close-range Super kills most brawlers.'
        ],
        'Heist': [
            'Super does good damage to the safe — save it for pushing.',
            'Defend by standing near the safe and knocking back attackers.',
            'Break walls with Super to give your team an open path.'
        ],
        'Bounty': [
            'Avoid open areas — Shelly is weak at long range.',
            'Stick to bushes and wait for enemies to come close.',
            'Not the best pick for Bounty — switch if possible.'
        ],
        'Hot Zone': [
            'Stand in the zone and use Super to push enemies away.',
            'Great on tight Hot Zone maps with lots of bushes.',
            'Control the zone by threatening with Super at close range.'
        ],
        'Knockout': [
            'Play carefully and look for bushes near the center.',
            'Save Super for the decisive fight — a good Super can win the round.',
            'Avoid being the first to engage — let enemies come to you.'
        ],
        'Duels': [
            'Best against tanks and close-range brawlers — avoid sharpshooters.',
            'Use bushes and walls to your advantage.',
            'Charge Super quickly and finish with a powerful Super hit.'
        ]
    },
    'Colt': {
        'Gem Grab': [
            'Stay behind your tank and shoot down enemies from range.',
            'Break walls with Super to give your team better sight lines.',
            'Aim carefully — Colt\'s DPS is enormous if all shots hit.'
        ],
        'Brawl Ball': [
            'Use Super to destroy walls and open direct shot lines to the goal.',
            'Play as a fast striker — run with the ball and shoot through opponents.',
            'Keep distance from tanks and dodge with your fast movement.'
        ],
        'Showdown': [
            'Keep distance and chip-damage enemies — avoid close combat.',
            'With power cubes Colt becomes extremely dangerous — collect early.',
            'Break walls to remove hiding spots for bush-campers.'
        ],
        'Heist': [
            'Colt\'s DPS on the safe is incredible — focus on shooting it.',
            'Break all walls with Super to open straight lines to the safe.',
            'One of the best Heist brawlers — play aggressively.'
        ],
        'Bounty': [
            'Perfect Bounty brawler — keep distance and pick off kills.',
            'Aim with precision — every miss costs you.',
            'Control sight lines and force enemies to take detours.'
        ],
        'Hot Zone': [
            'Break walls around the zone to remove cover.',
            'Keep distance and shoot enemies trying to take the zone.',
            'Not the best in Hot Zone — better as lane control.'
        ],
        'Knockout': [
            'Strong sight lines and good burst — pick off an enemy early.',
            'Break walls to expose enemies behind cover.',
            'Play behind your team and focus damage.'
        ],
        'Duels': [
            'Keep distance and aim carefully — Colt wins at range.',
            'Break walls early with Super to remove cover.',
            'Strafe while shooting — make yourself harder to hit.'
        ]
    },
    'Bull': {
        'Gem Grab': [
            'Control the middle with your high HP and close-range damage.',
            'Collect gems and fall back — Bull is hard to kill in close combat.',
            'Use Super to escape if you have many gems and low HP.'
        ],
        'Brawl Ball': [
            'Bull is one of the best in Brawl Ball — tank + ball is dangerous.',
            'Use Super to charge past the defense with the ball.',
            'Stand in front of the goal as defender and kill anyone who comes close.'
        ],
        'Showdown': [
            'Bush-camping with Bull is a classic — hide and surprise.',
            'Bull\'s Super can save you from dangerous situations.',
            'Collect power cubes and become an unkillable close-range machine.'
        ],
        'Heist': [
            'Charge with Super straight at the safe — one of the best Heist strategies.',
            'Bull\'s close-range DPS destroys safes quickly.',
            'Protect your own safe by standing near it.'
        ],
        'Bounty': [
            'Not optimal — Bull has trouble reaching enemies in Bounty.',
            'If you must, stay in bushes and wait for overconfident enemies.',
            'Avoid open Bounty maps — switch to another brawler.'
        ],
        'Hot Zone': [
            'Stand in the zone and tank — Bull holds zones well.',
            'Use Super to knock enemies away from the zone.',
            'Best on tight Hot Zone maps with bushes.'
        ],
        'Knockout': [
            'Rush down weak enemies with your high burst damage.',
            'Save Super to close distance quickly.',
            'Avoid getting kited by long-range brawlers.'
        ],
        'Duels': [
            'Dominant against other close-range brawlers.',
            'Use bushes to get close without taking damage.',
            'Bull\'s double shotgun blasts kill most brawlers quickly in close combat.'
        ]
    },
    'Nita': {
        'Gem Grab': [
            'The bear controls the middle — send it forward to tank.',
            'Collect gems while the bear distracts the enemy.',
            'Nita\'s wide attack hits easily in tight Gem Grab maps.'
        ],
        'Brawl Ball': [
            'The bear can block goals and distract defenders.',
            'Shoot wide and charge Super fast — the bear changes the game.',
            'Great as a mid-lane controller with bear support.'
        ],
        'Showdown': [
            'The bear gives you a big advantage in 1v1 situations.',
            'Play aggressively with the bear as your bodyguard.',
            'Heal the bear with Star Power to keep it alive longer.'
        ],
        'Heist': [
            'Send the bear at the safe — it does good damage.',
            'Use the bear as a distraction while you shoot the safe.',
            'Great as a defensive brawler with the bear as a guard.'
        ],
        'Bounty': [
            'The bear can chase enemies and force them out of position.',
            'Nita\'s wide attack makes her decent in Bounty.',
            'Place the bear strategically to control an area.'
        ],
        'Hot Zone': [
            'The bear in the zone forces enemies to deal with it.',
            'Perfect for controlling Hot Zone — bear + attack = area denial.',
            'One of the better brawlers in Hot Zone.'
        ],
        'Knockout': [
            'The bear gives a numerical advantage — essentially 4 vs 3.',
            'Charge Super quickly and get the bear out early.',
            'The bear can force enemies out of cover.'
        ],
        'Duels': [
            'The bear gives you a huge advantage in Duels.',
            'The enemy has to deal with both you and the bear.',
            'Heal the bear while it tanks for maximum dominance.'
        ]
    },
    'Jessie': {
        'Gem Grab': [
            'Place the turret at the gem mine for area denial.',
            'Jessie\'s bouncing shots are perfect in tight Gem Grab maps.',
            'The turret draws aggro and gives your team room to play.'
        ],
        'Brawl Ball': [
            'The turret at the goal makes it hard for enemies to score.',
            'Bouncing shots hit easily when enemies clump together.',
            'Repair the turret by shooting it with your attack.'
        ],
        'Showdown': [
            'The turret gives you an advantage in the final circles.',
            'Place the turret strategically and play around it.',
            'Jessie is stronger late in the match with turret + power cubes.'
        ],
        'Heist': [
            'Place the turret so it shoots the safe.',
            'The turret does constant damage — great for chipping the safe.',
            'Protect your safe with the turret as an extra defender.'
        ],
        'Bounty': [
            'Bouncing shots punish enemies standing close together.',
            'The turret controls an area and forces enemies to move.',
            'Decent in Bounty but not optimal — better options exist.'
        ],
        'Hot Zone': [
            'The turret in the zone forces enemies to focus it instead of you.',
            'One of the best brawlers in Hot Zone with turret control.',
            'Bouncing shots + turret = massive area denial.'
        ],
        'Knockout': [
            'The turret provides extra firepower — like a fourth player.',
            'Place it in cover and let it chip enemies.',
            'Bouncing shots can unexpectedly hit enemies behind cover.'
        ],
        'Duels': [
            'The turret gives you a big advantage in 1v1.',
            'Place the turret and play around it — force the enemy to choose targets.',
            'Repair the turret constantly to keep it alive.'
        ]
    },
    'Brock': {
        'Gem Grab': [
            'Control lanes with long-range shots.',
            'Super destroys walls and opens up the map — timing is key.',
            'Stay behind your team and poke enemies out of position.'
        ],
        'Brawl Ball': [
            'Break walls in front of the goal with Super — open shot lines.',
            'Great as support — keep enemies away from the ball.',
            'Avoid carrying the ball — Brock is better as a shooter.'
        ],
        'Showdown': [
            'Keep distance and chip damage with rockets.',
            'Super destroys walls — remove bush-campers\' hiding spots.',
            'Brock is strong with power cubes thanks to his already high damage.'
        ],
        'Heist': [
            'Rockets do great damage to the safe from range.',
            'Break walls to get direct line of sight on the safe.',
            'Super on the safe does enormous damage.'
        ],
        'Bounty': [
            'One of the best Bounty brawlers — long range + high damage.',
            'Control sight lines and pick off kills from a safe distance.',
            'Aim where the enemy will be, not where they are.'
        ],
        'Hot Zone': [
            'Break walls around the zone to expose enemies.',
            'Super can clear an entire zone of enemies.',
            'Keep distance and shoot enemies trying to take the zone.'
        ],
        'Knockout': [
            'Strong in Knockout — one rocket can make a huge difference.',
            'Break walls early to remove cover.',
            'Play behind your team and focus one enemy at a time.'
        ],
        'Duels': [
            'Dominates on open maps with his range.',
            'Dodge enemy shots and counter with precision.',
            'Super can finish Duels matches quickly.'
        ]
    },
    'El Primo': {
        'Gem Grab': [
            'Tank the middle and collect gems — El Primo has the HP for it.',
            'Super can be used to escape with gems or kill the gem carrier.',
            'Play aggressively in the middle but fall back when you have 7+ gems.'
        ],
        'Brawl Ball': [
            'THE BEST Brawl Ball brawler — Super with ball = guaranteed goal.',
            'Tank the ball, build Super, jump into the goal.',
            'Block enemies\' path and push them away with Super.'
        ],
        'Showdown': [
            'Bush-camp and collect power cubes early.',
            'With cubes El Primo becomes an unkillable machine.',
            'Super can jump onto weak enemies or escape the zone.'
        ],
        'Heist': [
            'Super straight onto the safe does good damage.',
            'Tank in front of the safe and punch it — high DPS in close range.',
            'Less effective without a clear path to the safe.'
        ],
        'Bounty': [
            'Tough in Bounty — too easy to get kited.',
            'Avoid Bounty with El Primo if possible.',
            'If you must, hide in bushes and jump-surprise enemies.'
        ],
        'Hot Zone': [
            'Tank the zone with your high HP.',
            'Super can clear the zone of enemies.',
            'Great on tight Hot Zone maps where enemies can\'t escape.'
        ],
        'Knockout': [
            'Super can isolate and kill an enemy early.',
            'Play aggressively but smart — don\'t die without getting a kill.',
            'Combo: Super in, kill one, then it\'s 3v2.'
        ],
        'Duels': [
            'Dominant against most brawlers in close range.',
            'Close the distance and brawl — El Primo wins in close combat.',
            'Super can surprise-kill enemies trying to keep distance.'
        ]
    },
    'Poco': {
        'Gem Grab': [
            'Poco is KING in Gem Grab — heal your team constantly.',
            'Collect gems in the middle while healing tanks in front of you.',
            'Super heals through walls — save teammates in trouble.'
        ],
        'Brawl Ball': [
            'Heal your tank carrying the ball — you are a team.',
            'Poco\'s wide attack controls large areas.',
            'Super at the right moment can swing an entire fight.'
        ],
        'Showdown': [
            'Poco is weak in solo Showdown — avoid if possible.',
            'In duo Showdown, heal your partner constantly.',
            'Chip damage over time — Poco rarely kills quickly.'
        ],
        'Heist': [
            'Heal your team while they push the safe.',
            'Poco does little damage to the safe — focus on support.',
            'Better in defensive Heist comps.'
        ],
        'Bounty': [
            'Wide attack hits easily — great for poking.',
            'Heal teammates who took damage to prevent kills.',
            'Poco as support in Bounty can be surprisingly good.'
        ],
        'Hot Zone': [
            'Heal the team in the zone — keep everyone alive.',
            'Wide attack controls zones effectively.',
            'Poco + tank in Hot Zone is a very strong combo.'
        ],
        'Knockout': [
            'Heal the team to keep everyone alive throughout the round.',
            'Poco\'s healing can decide close rounds.',
            'Play behind the team and focus on supporting.'
        ],
        'Duels': [
            'Weak in Duels — Poco has low burst damage.',
            'Healing doesn\'t help much in 1v1.',
            'Avoid Duels with Poco if possible.'
        ]
    },
    'Rosa': {
        'Gem Grab': [
            'Perfect Gem Grab tank — control the middle with shield.',
            'Activate Super before entering fights.',
            'Rosa in bushes at the gem mine is extremely hard to deal with.'
        ],
        'Brawl Ball': [
            'Tank the ball with shield active — run through the defense.',
            'Rosa dominates in bushes near the goal.',
            'Shield + close-range damage = Brawl Ball machine.'
        ],
        'Showdown': [
            'Rosa with shield and power cubes is nearly unkillable.',
            'Control bushes and punish anyone who comes close.',
            'Collect cubes early and dominate the final circle.'
        ],
        'Heist': [
            'Tank forward with shield and punch the safe.',
            'Rosa does great close-range DPS on the safe.',
            'Protect your safe with shield active.'
        ],
        'Bounty': [
            'Tough in Bounty — too short range.',
            'Can work on bushy Bounty maps.',
            'Better to switch to another brawler in Bounty.'
        ],
        'Hot Zone': [
            'Rosa tanks the zone incredibly well with shield.',
            'One of the best Hot Zone brawlers.',
            'Activate shield and stand in the zone — enemies can\'t move you.'
        ],
        'Knockout': [
            'Shield gives you a big advantage in first fights.',
            'Rush down enemies with shield active.',
            'Great as an aggro tank in the Knockout team.'
        ],
        'Duels': [
            'Dominant in close range with shield.',
            'Charge Super quickly and activate for every fight.',
            'Hard to kill 1v1 with shield active.'
        ]
    },
    'Spike': {
        'Gem Grab': [
            'Spike\'s splash damage controls the middle perfectly.',
            'Super slows down enemies — perfect for catching the gem carrier.',
            'One of the best Gem Grab brawlers overall.'
        ],
        'Brawl Ball': [
            'Super at the goal prevents enemies from scoring.',
            'Splash damage punishes clustered enemies.',
            'Spike controls Brawl Ball matches with his Super.'
        ],
        'Showdown': [
            'Incredibly strong in Showdown — high damage and great control.',
            'Super catches enemies and makes them easy targets.',
            'Aim slightly to the side of enemies to hit with splinters.'
        ],
        'Heist': [
            'Splash damage on the safe + Super does enormous damage.',
            'Super on the safe slows enemies trying to defend.',
            'Spike does consistently good damage in Heist.'
        ],
        'Bounty': [
            'Great poke damage with splinter shots.',
            'Super catches enemies in open areas.',
            'Spike works well in Bounty on most maps.'
        ],
        'Hot Zone': [
            'Super in the zone = total control.',
            'Splash damage makes it hard for enemies to stand in the zone.',
            'One of the absolute best in Hot Zone.'
        ],
        'Knockout': [
            'High burst potential with well-placed shots.',
            'Super can catch enemies and give your team free kills.',
            'Play mid-range and control with splash.'
        ],
        'Duels': [
            'Very strong in Duels — high damage + slow Super.',
            'Aim splinter shots to maximize damage.',
            'Super in Duels is almost a guaranteed kill.'
        ]
    },
    'Crow': {
        'Gem Grab': [
            'Poison everyone — prevent enemies from healing.',
            'Crow is an annoyance — chip damage and force enemies to fall back.',
            'Super can finish weak enemies or escape with gems.'
        ],
        'Brawl Ball': [
            'Poison the ball carrier — they can\'t heal and become an easy target.',
            'Super can jump over defenders and score.',
            'Crow controls the tempo in Brawl Ball with his poison.'
        ],
        'Showdown': [
            'Crow\'s best game mode — chip damage and poke the entire match.',
            'Escape with Super if you get into trouble.',
            'Poison everyone and wait until they are weak.'
        ],
        'Heist': [
            'Not optimal in Heist — too little DPS on the safe.',
            'Better as a defender — poison attackers.',
            'Switch to a better Heist brawler if possible.'
        ],
        'Bounty': [
            'Excellent in Bounty — constant chip damage earns stars.',
            'Poison everyone and collect kills on weak enemies.',
            'Super to finish or escape — perfect Bounty kit.'
        ],
        'Hot Zone': [
            'Poison enemies in the zone — they have to fall back to heal.',
            'Crow controls zones indirectly through poison pressure.',
            'Not the best but decent with the right team.'
        ],
        'Knockout': [
            'Chip damage weakens enemies for the team to finish.',
            'Super to finish the last enemy.',
            'Great as a support damage dealer in Knockout.'
        ],
        'Duels': [
            'Dominant in Duels — constant poison prevents healing.',
            'Keep distance and chip, finish with Super.',
            'Crow is one of the best Duels brawlers.'
        ]
    },
    'Leon': {
        'Gem Grab': [
            'Use invisibility to sneak in and kill the gem carrier.',
            'Leon works as an assassin — pick off kills and fall back.',
            'Close the distance with Super before attacking.'
        ],
        'Brawl Ball': [
            'Invisible with ball = surprise goal.',
            'Leon can sneak past the entire defense.',
            'High burst damage kills defenders quickly.'
        ],
        'Showdown': [
            'Leon\'s best game mode — sneak up on weak enemies.',
            'Invisibility gives you total choice of engagements.',
            'Avoid revealing yourself until you are in kill range.'
        ],
        'Heist': [
            'Sneak in invisible and surprise at the safe.',
            'High close-range DPS — great against the safe.',
            'Better as a surprise pusher than a constant damage dealer.'
        ],
        'Bounty': [
            'Sneak in and pick off kills — perfect Bounty assassin.',
            'Leon\'s ranged damage is decent for poking too.',
            'Super in, kill, run out.'
        ],
        'Hot Zone': [
            'Not optimal in Hot Zone — Leon wants to assassinate, not hold zones.',
            'Can work as a flanker who kills enemies outside the zone.',
            'Better options exist for Hot Zone.'
        ],
        'Knockout': [
            'Invisibility gives you a free first kill.',
            'Leon in Knockout is extremely dangerous — sneak and kill.',
            'Play patient until Super is charged, then strike.'
        ],
        'Duels': [
            'Invisibility gives you an advantage in every fight.',
            'Close the distance invisibly and burst down the enemy.',
            'One of the strongest Duels brawlers.'
        ]
    },
    'Mortis': {
        'Gem Grab': [
            'Dash and pick up gems from dead enemies.',
            'Mortis hunts throwers and weak brawlers — avoid tanks.',
            'Save Super for healing — it keeps you alive.'
        ],
        'Brawl Ball': [
            'Mortis + ball = trick dribbling through the entire team.',
            'Dash past defenders and score.',
            'One of the most entertaining Brawl Ball brawlers.'
        ],
        'Showdown': [
            'Hunt weak brawlers and throwers.',
            'Avoid tanks like Bull and El Primo.',
            'Mortis requires skill — dash smart, not wastefully.'
        ],
        'Heist': [
            'Not good in Heist — avoid.',
            'Mortis does too little DPS on the safe.',
            'Switch to another brawler for Heist.'
        ],
        'Bounty': [
            'Great as an assassin — dash in, kill, dash out.',
            'Hunt snipers like Piper and Brock.',
            'Super for healing after a kill.'
        ],
        'Hot Zone': [
            'Not optimal — Mortis doesn\'t want to stand still in zones.',
            'Can flank and kill enemies controlling the zone.',
            'Better options exist.'
        ],
        'Knockout': [
            'Risky but rewarding — dash in and get an early kill.',
            'Mortis requires perfect timing in Knockout.',
            'Save Super for healing after engagements.'
        ],
        'Duels': [
            'Strong against squishies, weak against tanks.',
            'Dash and dodge shots — outplay the enemy.',
            'Healing Super makes Mortis hard to kill in Duels.'
        ]
    },
    'Piper': {
        'Gem Grab': [
            'Control lanes with long range.',
            'Piper dominates open Gem Grab maps.',
            'Super to escape if enemies close the distance.'
        ],
        'Brawl Ball': [
            'Not optimal — Piper doesn\'t like close combat.',
            'Can work on open Brawl Ball maps.',
            'Break walls with teammates and pick off kills from range.'
        ],
        'Showdown': [
            'Keep distance and snipe — Piper does enormous damage at range.',
            'Super to escape if someone closes the distance.',
            'Strong on open Showdown maps.'
        ],
        'Heist': [
            'Not good in Heist — too little DPS on the safe.',
            'Can control lanes but contributes little to the objective.',
            'Switch to a better Heist brawler.'
        ],
        'Bounty': [
            'THE BEST Bounty brawler — long range + high damage.',
            'Control the mid line and pick off kills.',
            'Super saves you from assassins.'
        ],
        'Hot Zone': [
            'Control zones from range — shoot those who try to take them.',
            'Not the best in Hot Zone but works.',
            'Better on open Hot Zone maps.'
        ],
        'Knockout': [
            'Excellent in Knockout — a good snipe can win the round.',
            'Pick off the most dangerous enemy first.',
            'Play behind your team and snipe.'
        ],
        'Duels': [
            'Strong in Duels if you keep distance.',
            'Super to escape if the enemy closes in.',
            'Practice predicting enemy movements.'
        ]
    },
    'Frank': {
        'Gem Grab': [
            'Tank the middle — Frank\'s HP and stun are perfect.',
            'Super stuns entire teams — game-changing in group fights.',
            'Be patient — Frank\'s attack has a delay.'
        ],
        'Brawl Ball': [
            'Frank\'s Super stuns + knocks — perfect for stopping attackers.',
            'Tank the ball through and let the team follow.',
            'Stun the entire defense and score.'
        ],
        'Showdown': [
            'Frank is better in team modes but can work in Showdown.',
            'His stun is strong against individual enemies.',
            'Avoid getting kited by ranged brawlers.'
        ],
        'Heist': [
            'Frank\'s attack does area damage — decent against the safe.',
            'Stun attackers trying to reach your safe.',
            'Great as a defensive Heist tank.'
        ],
        'Bounty': [
            'Not optimal — Frank is too slow for Bounty.',
            'Super can stun groups but Frank often dies on the way.',
            'Better options exist.'
        ],
        'Hot Zone': [
            'Stand in the zone and tank — stun enemies who challenge you.',
            'Frank holds zones well with his HP.',
            'Super clears the zone of all enemies.'
        ],
        'Knockout': [
            'Stun can turn the entire round.',
            'Play carefully and wait for the right stun opportunity.',
            'Frank\'s high HP makes him hard to kill quickly.'
        ],
        'Duels': [
            'Strong against other tanks in Duels.',
            'Stun + attack combo does enormous burst.',
            'Avoid fast brawlers who can kite you.'
        ]
    },
    'Dynamike': {
        'Gem Grab': [
            'Throw dynamite at chokepoints and the gem mine.',
            'Super does massive damage to groups.',
            'Stay behind walls and throw over them.'
        ],
        'Brawl Ball': [
            'Area denial in front of the goal — dynamite prevents pushes.',
            'Super can clear the entire defense.',
            'Avoid close combat — Dynamike dies quickly.'
        ],
        'Showdown': [
            'Dynamike\'s Super can instant-kill most brawlers.',
            'Dyna-Jump Star Power gives extremely fun mobility.',
            'Play defensively and throw dynamite from a safe distance.'
        ],
        'Heist': [
            'Super does enormous damage to the safe!',
            'Dynamike is one of the best Heist brawlers.',
            'Throw dynamite constantly at the safe from range.'
        ],
        'Bounty': [
            'Great in Bounty with area denial and poke.',
            'Throw dynamite in sight lines to control.',
            'Super can kill sniper groups.'
        ],
        'Hot Zone': [
            'Area denial in the zone — dynamite makes it hard to stand still.',
            'Super clears the entire zone instantly.',
            'Great in Hot Zone with proper positioning.'
        ],
        'Knockout': [
            'Dynamite at chokepoints forces enemies to move.',
            'Super can kill enemies behind cover.',
            'Play back and bombard.'
        ],
        'Duels': [
            'Tough in Duels — the enemy can dodge dynamite.',
            'Requires good prediction to hit.',
            'Super is your best chance to win.'
        ]
    },
    'Bo': {
        'Gem Grab': [
            'Bo\'s mines control the gem mine perfectly.',
            'Place mines at chokepoints to catch enemies.',
            'Totem gadget (Super Totem) charges the team\'s Supers.'
        ],
        'Brawl Ball': [
            'Mines in front of the goal prevent enemies from scoring.',
            'Bo\'s wide shots control the mid lane.',
            'Snare a Bear Star Power stuns enemies at mines.'
        ],
        'Showdown': [
            'Place mines in bushes — enemies walk into traps.',
            'Bo\'s attack is decent at medium range.',
            'Mines control areas and force enemies to be careful.'
        ],
        'Heist': [
            'Mines at the safe do damage and provide control.',
            'Great as a defensive brawler — mines protect.',
            'Decent but not optimal for Heist.'
        ],
        'Bounty': [
            'Mines in sight lines make Bounty maps dangerous.',
            'Bo\'s poke damage is good in Bounty.',
            'Control mid with attack + mines.'
        ],
        'Hot Zone': [
            'Mines in the zone make it dangerous to stand there.',
            'Great area denial with mines + attack.',
            'A good Bo player dominates Hot Zone.'
        ],
        'Knockout': [
            'Mines force enemies out of cover.',
            'Snare a Bear stun + team follow-up = guaranteed kill.',
            'Great as a control brawler in Knockout.'
        ],
        'Duels': [
            'Mines give you an advantage in Duels.',
            'Place mines and force the enemy to go around them.',
            'Decent in Duels with good mine placements.'
        ]
    },
    'Tick': {
        'Gem Grab': [
            'Tick\'s mines control the gem mine from a safe distance.',
            'Best area denial brawler in Gem Grab.',
            'Super (the head) chases the gem carrier — perfect timing can win the match.'
        ],
        'Brawl Ball': [
            'Mines in front of the goal make it impossible to push.',
            'Tick controls Brawl Ball but gets few direct kills.',
            'Super can stop ball carriers.'
        ],
        'Showdown': [
            'Tick is the weakest in Showdown — avoid.',
            'Lowest HP in the game makes Showdown dangerous.',
            'If you must, keep extreme distance.'
        ],
        'Heist': [
            'Mines do damage to the safe but slowly.',
            'Better as a defender — mines protect the safe.',
            'Not optimal for Heist.'
        ],
        'Bounty': [
            'Great area denial in Bounty — mines control the map.',
            'Super chases enemies with stars.',
            'Play extremely defensively.'
        ],
        'Hot Zone': [
            'Mines in the zone make it impossible to stand there.',
            'One of the best Hot Zone brawlers.',
            'Control zones without being near them.'
        ],
        'Knockout': [
            'Mines force enemies out of cover.',
            'Super can finish low-HP enemies.',
            'Play far back and bombard.'
        ],
        'Duels': [
            'Tough in Duels — the enemy can rush you.',
            'Tick has trouble surviving in 1v1.',
            'Avoid Duels with Tick.'
        ]
    },
    'Emz': {
        'Gem Grab': [
            'Emz controls the middle with her medium-range spray.',
            'Super slows and damages — perfect for defending gems.',
            'Keep enemies at sweet spot distance for max damage.'
        ],
        'Brawl Ball': [
            'Super stops enemies from pushing with the ball.',
            'Emz controls large areas with her attack.',
            'Great defensive brawler in Brawl Ball.'
        ],
        'Showdown': [
            'Emz is decent in Showdown — good control.',
            'Super catches aggressive enemies.',
            'Keep distance and spray damage.'
        ],
        'Heist': [
            'Decent DPS on the safe with constant spray.',
            'Super slows down attackers.',
            'Works but not optimal in Heist.'
        ],
        'Bounty': [
            'Great zone control in Bounty with spray.',
            'Super prevents enemies from pushing.',
            'Emz is solid in Bounty on the right maps.'
        ],
        'Hot Zone': [
            'ONE OF THE BEST in Hot Zone — spray + Super = total control.',
            'Emz dominates zones with her area damage.',
            'Super in the zone forces all enemies to fall back.'
        ],
        'Knockout': [
            'Control mid with spray and force enemies out of position.',
            'Super at the right moment can catch the entire team.',
            'Great as a control brawler.'
        ],
        'Duels': [
            'Decent in Duels — keep sweet spot distance.',
            'Super gives you an advantage in close engagements.',
            'Works against most brawlers.'
        ]
    },
    'Stu': {
        'Gem Grab': [
            'Dash around and pick up gems — Stu is extremely mobile.',
            'Super charges from a single hit — dash constantly!',
            'The fire trail does extra damage behind you.'
        ],
        'Brawl Ball': [
            'Dash through the defense with the ball.',
            'Stu is one of the most agile Brawl Ball brawlers.',
            'Dodge everything with constant dashes.'
        ],
        'Showdown': [
            'Stu can kite almost any brawler with his dashes.',
            'Aggressive playstyle — poke, dash, poke, dash.',
            'High skill cap but extremely rewarding.'
        ],
        'Heist': [
            'Dash in, shoot the safe, dash out.',
            'Stu does great burst damage with fast attacks.',
            'Fire trail at the safe does extra damage.'
        ],
        'Bounty': [
            'Poke and dash — hard to hit in Bounty.',
            'Stu can pick off kills and escape immediately.',
            'Very good in Bounty with the right playstyle.'
        ],
        'Hot Zone': [
            'Dash in and out of zones — control the tempo.',
            'Fire trail in the zone does area damage.',
            'Great in Hot Zone but requires skill.'
        ],
        'Knockout': [
            'Dash and dodge — Stu is hard to kill.',
            'Pick off kills with quick burst and dash out.',
            'One of the best Knockout brawlers in the right hands.'
        ],
        'Duels': [
            'Stu dominates Duels with his mobility.',
            'Constant dashes make you nearly impossible to hit.',
            'Poke, dash, poke — the enemy can\'t respond.'
        ]
    },
    'Surge': {
        'Gem Grab': [
            'Prioritize charging Super — every upgrade makes Surge stronger.',
            'Stage 3 Surge with teleport dominates Gem Grab.',
            'Avoid dying — you lose all upgrades!'
        ],
        'Brawl Ball': [
            'Upgraded Surge with teleport can make wild plays.',
            'Build up levels early and become a monster.',
            'Surge\'s burst damage increases with each stage.'
        ],
        'Showdown': [
            'Collect power cubes AND charge upgrades — double scaling.',
            'Surge with max upgrades + cubes is unstoppable.',
            'Avoid early fights — build up first.'
        ],
        'Heist': [
            'Teleport to the safe at stage 3.',
            'Surge\'s DPS increases per stage — great in Heist.',
            'Build stages quickly for maximum safe damage.'
        ],
        'Bounty': [
            'Decent in Bounty — upgrades increase your range and damage.',
            'At stage 3 Surge can jump in and pick off kills.',
            'Play carefully early, aggressively late.'
        ],
        'Hot Zone': [
            'Upgraded Surge controls zones well.',
            'Teleport in and out of the zone.',
            'Great in Hot Zone if you can upgrade quickly.'
        ],
        'Knockout': [
            'Every round starts at stage 1 again — keep that in mind.',
            'Build Super quickly each round.',
            'Surge is risky in Knockout due to reset.'
        ],
        'Duels': [
            'Build stages during the match — Surge scales.',
            'Strong in Duels if you survive the early stages.',
            'Stage 3 Surge wins most 1v1s.'
        ]
    },
    'Edgar': {
        'Gem Grab': [
            'Jump onto the gem carrier with Super — kill and take gems.',
            'Edgar charges Super automatically — jump in at the right moment.',
            'Play as an assassin — kill and run.'
        ],
        'Brawl Ball': [
            'Jump onto the ball carrier and kill.',
            'Edgar is fast — run with the ball after a kill.',
            'Avoid jumping into the entire team — pick your battles.'
        ],
        'Showdown': [
            'Edgar\'s best game mode — wait for Super and jump.',
            'Heals from dealing damage — fight aggressively in close range.',
            'Avoid sharpshooters who kill you before you land.'
        ],
        'Heist': [
            'Jump onto the safe and do burst damage.',
            'Edgar\'s lifesteal helps him survive at the safe.',
            'Risky but can work as a surprise pusher.'
        ],
        'Bounty': [
            'Jump in, kill, escape — classic Bounty assassin.',
            'Jump timing is everything — don\'t jump into groups.',
            'Great against isolated snipers.'
        ],
        'Hot Zone': [
            'Not optimal — Edgar wants to assassinate, not hold zones.',
            'Can flank and kill enemies outside the zone.',
            'Better options exist for Hot Zone.'
        ],
        'Knockout': [
            'Super jump in and get an early kill.',
            'Edgar in Knockout is about making it 3v2.',
            'Risky but rewarding with the right timing.'
        ],
        'Duels': [
            'Strong in Duels — lifesteal + burst = hard to beat.',
            'Jump in and fight — Edgar wins most close-range battles.',
            'Avoid brawlers with knockback (Shelly, Gale).'
        ]
    },
    'Belle': {
        'Gem Grab': [
            'Mark the gem carrier with Super — your whole team does extra damage.',
            'Belle\'s bouncing shots punish grouped enemies.',
            'Play as a control sniper.'
        ],
        'Brawl Ball': [
            'Mark the ball carrier — they take extra damage and die faster.',
            'Great as lane control in Brawl Ball.',
            'Bouncing shots can surprise enemies behind the ball carrier.'
        ],
        'Showdown': [
            'Belle with mark + poke = enemies can\'t heal safely.',
            'Great in Showdown — control distance and mark priority targets.',
            'Bouncing shots can hit campers in bushes.'
        ],
        'Heist': [
            'Mark the safe — oh wait, mark attackers instead.',
            'Great as a defender — mark the most dangerous attacker.',
            'Decent in Heist but not optimal.'
        ],
        'Bounty': [
            'ONE OF THE BEST in Bounty — mark + long range = total dominance.',
            'Mark the one with the most stars and pick them off.',
            'Bouncing shots can chain kills.'
        ],
        'Hot Zone': [
            'Great as lane control in Hot Zone.',
            'Mark whoever is standing in the zone the longest.',
            'Bouncing shots are effective in tight zones.'
        ],
        'Knockout': [
            'Mark the most dangerous enemy early.',
            'Belle in Knockout is top tier — mark + team focus = fast kills.',
            'Play safe and control with range.'
        ],
        'Duels': [
            'Mark in Duels gives you a constant advantage.',
            'Belle is strong in Duels on open maps.',
            'Keep distance and poke with mark bonus.'
        ]
    },
    'Sandy': {
        'Gem Grab': [
            'Sandstorm at the gem mine makes your team invisible — insane value.',
            'Sandy is one of the best Gem Grab brawlers.',
            'Wide attack controls lanes easily.'
        ],
        'Brawl Ball': [
            'Sandstorm at the goal = invisible attackers.',
            'Wide attack controls the midfield.',
            'Great as a support tank in Brawl Ball.'
        ],
        'Showdown': [
            'Sandstorm helps you hide in open areas.',
            'Decent in Showdown but better in team modes.',
            'Wide attack makes it easy to hit.'
        ],
        'Heist': [
            'Sandstorm at the safe hides your team while they deal damage.',
            'Decent support in Heist.',
            'Wide attack does consistent damage.'
        ],
        'Bounty': [
            'Sandstorm in Bounty gives your team invisibility mid-fight.',
            'Great as support — wide attack + sandstorm.',
            'Strong in Bounty with the right team.'
        ],
        'Hot Zone': [
            'Sandstorm in the zone = invisible team controlling the zone.',
            'One of the best in Hot Zone.',
            'Wide attack + sandstorm = total area control.'
        ],
        'Knockout': [
            'Sandstorm at the right moment can win the round.',
            'Wide attack makes Sandy easy to play in Knockout.',
            'Great as support/control.'
        ],
        'Duels': [
            'Decent in Duels — sandstorm helps you dodge.',
            'Wide attack is hard to miss.',
            'Works against most brawlers.'
        ]
    },
    'Amber': {
        'Gem Grab': [
            'Spray fire in the middle — enemies can\'t stand near.',
            'Super (fire pool) blocks the gem mine.',
            'Amber controls lanes with continuous fire.'
        ],
        'Brawl Ball': [
            'Fire spray in front of the goal stops all pushes.',
            'Super at the goal provides area denial.',
            'Amber controls the Brawl Ball tempo.'
        ],
        'Showdown': [
            'Amber does consistent damage — great in Showdown.',
            'Fire pool controls areas and forces enemies to move.',
            'Long range with spray — keep distance.'
        ],
        'Heist': [
            'Continuous fire on the safe = lots of damage over time.',
            'Fire pool at the safe does extra damage.',
            'One of the best Heist brawlers.'
        ],
        'Bounty': [
            'Great poke with long fire spray.',
            'Fire pool controls sight lines.',
            'Decent in Bounty but requires good ammo management.'
        ],
        'Hot Zone': [
            'Fire pool in the zone = total area denial.',
            'Amber dominates Hot Zone with spray + fire pool.',
            'One of the best Hot Zone brawlers.'
        ],
        'Knockout': [
            'Control areas with fire — force enemies out of cover.',
            'Fire pool at chokepoints is dangerous.',
            'Great as a control brawler in Knockout.'
        ],
        'Duels': [
            'Amber does consistent damage in Duels.',
            'Fire pool blocks enemies\' escape routes.',
            'Strong in Duels with good distance control.'
        ]
    },
    'Gale': {
        'Gem Grab': [
            'Blow enemies away from the gem mine with Super.',
            'Gale controls the middle with knockback.',
            'Spring Ejector gadget provides unexpected mobility.'
        ],
        'Brawl Ball': [
            'Super blows away the ball carrier — best defensive Super in Brawl Ball.',
            'Protect the goal by blowing enemies backwards.',
            'Gale is top-tier defensive in Brawl Ball.'
        ],
        'Showdown': [
            'Knockback keeps aggressive enemies away.',
            'Decent in Showdown but better in team modes.',
            'Super can push enemies into the poison.'
        ],
        'Heist': [
            'Blow attackers away from your safe.',
            'Gale is one of the best defensive Heist brawlers.',
            'Super stops pushes completely.'
        ],
        'Bounty': [
            'Knockback prevents assassins from closing the distance.',
            'Decent in Bounty but not optimal offensively.',
            'Great as defensive support.'
        ],
        'Hot Zone': [
            'Blow enemies out of the zone with Super — easy control.',
            'Gale dominates Hot Zone with knockback.',
            'Twister gadget in the zone prevents enemies from entering.'
        ],
        'Knockout': [
            'Super can blow enemies out of cover.',
            'Great defensive brawler — keep the team safe.',
            'Knockback at the right moment = round win.'
        ],
        'Duels': [
            'Knockback keeps enemies away while you chip.',
            'Decent in Duels — control distance.',
            'Super near walls can instantly knock out enemies.'
        ]
    },
    'Colette': {
        'Gem Grab': [
            'Colette does percentage-based damage — good against all HP levels.',
            'Super deals damage going AND coming back — position yourself right.',
            'Great all-round Gem Grab brawler.'
        ],
        'Brawl Ball': [
            'Super through the ball carrier does enormous burst.',
            'Colette works well against tanks in Brawl Ball.',
            'Percentage-based damage means she is effective against everyone.'
        ],
        'Showdown': [
            'Great against tanks — percentage damage takes them down fast.',
            'Super can kill most brawlers with the right combo.',
            'Decent in Showdown.'
        ],
        'Heist': [
            'Colette\'s percentage damage destroys the safe.',
            'Super against the safe does enormous damage.',
            'One of the best Heist brawlers.'
        ],
        'Bounty': [
            'Decent in Bounty — consistent damage output.',
            'Super can snipe kills.',
            'Great all-round.'
        ],
        'Hot Zone': [
            'Great in Hot Zone — consistent damage against all enemies.',
            'Super through the zone does area damage.',
            'Solid pick in Hot Zone.'
        ],
        'Knockout': [
            'Super is dangerous in Knockout — burst through enemies.',
            'Percentage damage works well against all team comps.',
            'Great versatile pick in Knockout.'
        ],
        'Duels': [
            'Strong in Duels — percentage damage = good against everyone.',
            'Super gives you extra burst to finish.',
            'Combo: attack + attack + Super kills most brawlers.'
        ]
    },
    'Byron': {
        'Gem Grab': [
            'Byron heals teammates AND damages enemies with the same attack!',
            'Best healer in Gem Grab — keep your team alive.',
            'Shots deal damage/healing over time — stack them.'
        ],
        'Brawl Ball': [
            'Heal your tank while they push with the ball.',
            'Byron is extremely valuable as support in Brawl Ball.',
            'Super heals the team and damages enemies in an area.'
        ],
        'Showdown': [
            'Great in duo — heal your partner.',
            'Solo Byron is weaker — avoid if possible.',
            'Poke damage is decent but burst is lacking.'
        ],
        'Heist': [
            'Heal the team while they damage the safe.',
            'Byron does little direct damage to the safe.',
            'Best as support in Heist.'
        ],
        'Bounty': [
            'Poke + heal = Bounty machine.',
            'Heal the team and kill enemies at the same time.',
            'Strong in Bounty as support.'
        ],
        'Hot Zone': [
            'Heal the team in the zone — they can stay longer.',
            'Great support in Hot Zone.',
            'Super in the zone heals everyone and damages enemies.'
        ],
        'Knockout': [
            'Healing in Knockout = your team has more HP after every fight.',
            'Byron can decide Knockout rounds with healing.',
            'Play behind the team and support.'
        ],
        'Duels': [
            'Healing makes Byron hard to kill in Duels.',
            'Poke and heal yourself — it\'s an endurance game.',
            'Decent in Duels thanks to self-sustain.'
        ]
    },
    'Rico': {
        'Gem Grab': [
            'Bouncing shots dominate tight Gem Grab maps.',
            'Rico controls lanes by shooting around corners.',
            'Best on maps with lots of walls.'
        ],
        'Brawl Ball': [
            'Bounces in corridors around the goal — extremely effective.',
            'Super bounces and does massive damage in tight spaces.',
            'Rico is top tier on tight Brawl Ball maps.'
        ],
        'Showdown': [
            'Great on maps with walls — bounces make it hard to hide.',
            'Rico can control areas by shooting around corners.',
            'Practice angles — a master of bounces is deadly.'
        ],
        'Heist': [
            'Bounces can hit the safe around walls.',
            'Great on Heist maps with corridors.',
            'Super bouncing off the safe = big damage.'
        ],
        'Bounty': [
            'Bounces make it hard for enemies to hide.',
            'Decent in Bounty on maps with walls.',
            'Control lanes with angled shots.'
        ],
        'Hot Zone': [
            'Bounces in the zone make it dangerous to stand there.',
            'Rico is great on tight Hot Zone maps.',
            'Super clears the zone with bouncing shots.'
        ],
        'Knockout': [
            'Bouncing around corners surprises enemies.',
            'Great on Knockout maps with walls.',
            'Control chokepoints with angled shots.'
        ],
        'Duels': [
            'Extremely strong on tight Duels maps.',
            'Bounces make it nearly impossible to avoid damage.',
            'Practice angles to maximize hits.'
        ]
    },
    'Bibi': {
        'Gem Grab': [
            'Knockback swing controls the middle.',
            'Bibi is fast and tanky — great gem carrier.',
            'Home run bar gives knockback — wait for it.'
        ],
        'Brawl Ball': [
            'ONE OF THE BEST in Brawl Ball — speed + knockback.',
            'Run with the ball and knock defenders away.',
            'Bubble Super controls large areas.'
        ],
        'Showdown': [
            'Bibi is fast — kite enemies and hit when they\'re close.',
            'Knockback helps you control distance.',
            'Decent in Showdown with the right playstyle.'
        ],
        'Heist': [
            'Bibi does great close-range DPS on the safe.',
            'Run in with speed and hit the safe.',
            'Decent in Heist as an aggro pusher.'
        ],
        'Bounty': [
            'Not optimal in Bounty — short range.',
            'Can work as an aggro assassin.',
            'Better options exist.'
        ],
        'Hot Zone': [
            'Great in Hot Zone — speed + knockback controls zones.',
            'Knock enemies away from the zone.',
            'Bibi tanks well in the zone.'
        ],
        'Knockout': [
            'Speed makes her hard to hit.',
            'Knockback at the right moment = kill setup.',
            'Decent in Knockout.'
        ],
        'Duels': [
            'Strong in Duels against close-range brawlers.',
            'Speed + knockback = hard to kill.',
            'Home run bar timing is the key.'
        ]
    },
    'Pam': {
        'Gem Grab': [
            'Pam is one of the best Gem Grab brawlers — HP + healing turret.',
            'Place the heal station at the gem mine.',
            'Tanky enough to carry gems herself.'
        ],
        'Brawl Ball': [
            'Heal station at the goal heals the entire team.',
            'Pam tanks well as a ball carrier.',
            'Wide attack controls the midfield.'
        ],
        'Showdown': [
            'Pam with heal station is extremely hard to kill.',
            'High HP + healing = endurance advantage.',
            'Decent in Showdown.'
        ],
        'Heist': [
            'Wide attack does good damage to the safe.',
            'Heal station at the safe heals the team.',
            'Great as a support tank in Heist.'
        ],
        'Bounty': [
            'Heal station keeps the team alive.',
            'Wide attack is decent in Bounty.',
            'Great support in Bounty.'
        ],
        'Hot Zone': [
            'Heal station in the zone = the team can stay without dying.',
            'Pam dominates Hot Zone with healing.',
            'One of the best Hot Zone brawlers.'
        ],
        'Knockout': [
            'Healing helps the team survive every round.',
            'Pam as support in Knockout is strong.',
            'High HP makes her hard to focus.'
        ],
        'Duels': [
            'Heal station gives you a massive advantage in Duels.',
            'Pam outlasts most brawlers.',
            'Wide attack hits easily in 1v1.'
        ]
    },
    'Barley': {
        'Gem Grab': [
            'Throw bottles over walls to control the gem mine without exposing yourself.',
            'Your area denial is excellent — keep enemies from collecting gems.',
            'Stack multiple bottles on choke points for massive damage.'
        ],
        'Brawl Ball': [
            'Block the goal area with bottles to prevent easy scores.',
            'Throw bottles ahead of ball carriers to cut off their path.',
            'Use Super to zone off large areas during key pushes.'
        ],
        'Showdown': [
            'Use walls to your advantage — attack over them safely.',
            'Avoid open areas where enemies can rush you easily.',
            'Stack bottles on power cube boxes to damage anyone nearby.'
        ],
        'Heist': [
            'Barley can deal consistent damage to the safe from behind walls.',
            'Use Super on the safe for huge burst damage.',
            'Zone off the path to your safe with area denial bottles.'
        ],
        'Bounty': [
            'Control key areas with bottles — force enemies to move predictably.',
            'Stay behind walls and chip away at enemies safely.',
            'Don\'t overextend — your low HP makes you easy to kill.'
        ],
        'Hot Zone': [
            'Throw bottles into the zone to prevent enemies from standing in it.',
            'One of the best Hot Zone brawlers — area denial keeps you in control.',
            'Stack bottles in the zone center for guaranteed damage.'
        ],
        'Knockout': [
            'Control areas with bottles and force enemies into bad positions.',
            'Stay behind cover — you\'re a high-value target due to your area control.',
            'Use Super to zone off enemies during final fights.'
        ],
        'Duels': [
            'Keep distance and throw over walls whenever possible.',
            'Predict enemy movement and lead your shots.',
            'Barley struggles against fast brawlers — save him for slow matchups.'
        ]
    },
    'Carl': {
        'Gem Grab': [
            'Use your boomerang to hit enemies at the gem mine and collect gems safely.',
            'Carl is tanky enough to be the gem carrier — play mid lane.',
            'Use Super to dive and push enemies back when your team has gem advantage.'
        ],
        'Brawl Ball': [
            'Super lets you run through enemies and dribble the ball forward.',
            'Use your pickaxe to control lanes while advancing with the ball.',
            'Great at breaking through defensive lines with Super.'
        ],
        'Showdown': [
            'Collect power cubes and fight at mid range — your boomerang hits twice.',
            'Super is a great escape tool or finisher in tight situations.',
            'Use walls to create double-hit opportunities with your pickaxe.'
        ],
        'Heist': [
            'Super deals great damage to the safe — spin on top of it.',
            'Use pickaxe to chip the safe from a safe distance.',
            'Carl is strong on attack — push aggressively with your team.'
        ],
        'Bounty': [
            'Your boomerang can hit enemies twice for good burst.',
            'Play carefully — Carl isn\'t great at long range.',
            'Use Super to chase kills or retreat safely.'
        ],
        'Hot Zone': [
            'Stand in the zone and use your boomerang to hit enemies approaching.',
            'Super clears the zone by threatening anyone standing in it.',
            'Carl\'s decent HP lets him hold zones well.'
        ],
        'Knockout': [
            'Play mid range and hit enemies behind cover with returning pickaxe.',
            'Save Super for finishing enemies or escaping bad trades.',
            'Stick with your team — Carl works best with support.'
        ],
        'Duels': [
            'Keep at mid range — the double-hit from boomerang gives you strong DPS.',
            'Use Super aggressively when enemy is low.',
            'Avoid long-range sharpshooters who can outrange you.'
        ]
    },
    'Darryl': {
        'Gem Grab': [
            'Use Super to roll onto the enemy gem carrier and steal control.',
            'Darryl\'s Super charges automatically — plan your engages accordingly.',
            'Play behind cover and roll in when enemies overextend.'
        ],
        'Brawl Ball': [
            'Roll onto the ball carrier to quickly steal possession.',
            'Use Super to roll past defenders and score.',
            'Great defender — roll onto enemies who try to score and knock them back.'
        ],
        'Showdown': [
            'Roll into bushes to surprise enemies at close range.',
            'Auto-charging Super makes Darryl great at ambush plays.',
            'Avoid long-range brawlers in the open — close the gap with Super.'
        ],
        'Heist': [
            'Roll onto the safe and unload both shotguns for massive damage.',
            'Darryl can be an amazing safe burster — time your roll with your team.',
            'On defense, roll onto attackers to push them away from the safe.'
        ],
        'Bounty': [
            'Roll onto squishy snipers for easy kills.',
            'Risky in Bounty — don\'t roll in unless you can secure the kill.',
            'Stay near walls and wait for your auto-charged Super.'
        ],
        'Hot Zone': [
            'Roll into the zone and use your shotgun burst to clear it.',
            'Decent zone holder thanks to decent HP and close-range power.',
            'Use Super to re-engage after falling back for healing.'
        ],
        'Knockout': [
            'Roll onto a key target early to gain a numbers advantage.',
            'One good roll can decide the entire round.',
            'Wait for the right moment — a missed roll leaves you vulnerable.'
        ],
        'Duels': [
            'Roll in and burst down enemies at point-blank range.',
            'Time your auto-charged Super for maximum impact.',
            'Strong against mid-range brawlers, weak against high-DPS close-range fighters like Shelly.'
        ]
    },
    'Penny': {
        'Gem Grab': [
            'Place your turret behind walls where it can\'t be easily destroyed.',
            'Your coins split on hit — aim at groups of enemies for splash damage.',
            'Control the gem mine by threatening with your turret\'s range.'
        ],
        'Brawl Ball': [
            'Place turret near the goal to defend while you push forward.',
            'Coin splash is great against clumped-up teams carrying the ball.',
            'Use turret to zone off the enemy goal area.'
        ],
        'Showdown': [
            'Find a good spot to set up your turret and defend your area.',
            'Coin splash is deadly when enemies line up — position to maximize hits.',
            'Turret can watch your back while you collect power cubes.'
        ],
        'Heist': [
            'Place turret where it can shoot the enemy safe continuously.',
            'Turret on defense can shred attackers trying to reach your safe.',
            'Coin splash is great for hitting enemies grouped behind their safe.'
        ],
        'Bounty': [
            'Coin splash punishes enemies who hide behind teammates.',
            'Place turret to control key sight lines.',
            'Stay behind your team and let your turret do the heavy lifting.'
        ],
        'Hot Zone': [
            'Turret covering the zone forces enemies to deal with it before contesting.',
            'Coin splash is great when enemies bunch up in the zone.',
            'Place turret in protected spots where it lasts longer.'
        ],
        'Knockout': [
            'Set up turret early to pressure the enemy team.',
            'Splash damage can hit multiple enemies during team fights.',
            'Protect your turret — it provides consistent extra DPS.'
        ],
        'Duels': [
            'Place turret and fight near it for extra damage output.',
            'Coin splash is hard to use in 1v1 — aim carefully.',
            'Turret gives you an advantage in drawn-out fights.'
        ]
    },
    'Gene': {
        'Gem Grab': [
            'Use Super to pull the enemy gem carrier and steal all their gems.',
            'Gene\'s pull can change the entire game — save it for high-value targets.',
            'Play mid lane and poke with your spread attack to build Super.'
        ],
        'Brawl Ball': [
            'Pull the ball carrier to your team for an easy steal.',
            'Play as a support — poke and heal teammates with Magic Puffs star power.',
            'A well-timed pull near the goal can set up a free score.'
        ],
        'Showdown': [
            'Gene isn\'t the strongest in Showdown — play passively and poke.',
            'Pull enemies into the gas or into close-range fights they can\'t win.',
            'Stay near the edge and avoid solo fights against high-DPS brawlers.'
        ],
        'Heist': [
            'Pull defenders away from the safe to let your team push.',
            'Gene\'s damage is low — focus on support rather than safe damage.',
            'Use pull to displace key defenders at crucial moments.'
        ],
        'Bounty': [
            'Pull high-star enemies to your team for easy kills.',
            'Poke enemies at mid range to build Super safely.',
            'One good pull can swing the entire match in Bounty.'
        ],
        'Hot Zone': [
            'Pull enemies out of the zone to give your team control.',
            'Gene\'s spread attack is decent for poking enemies in the zone.',
            'Focus on displacing enemies rather than raw damage.'
        ],
        'Knockout': [
            'A single pull can eliminate an enemy and give you a 3v2 advantage.',
            'Stay behind your team and look for pull opportunities.',
            'Gene is one of the best Knockout brawlers thanks to his pull.'
        ],
        'Duels': [
            'Pull enemies into close range where you can burst them down.',
            'Gene struggles in Duels against high-DPS brawlers.',
            'Use spread attack to chip from mid range and finish with pull combo.'
        ]
    },
    'Tara': {
        'Gem Grab': [
            'Use Super to pull multiple enemies together — devastating with team follow-up.',
            'Tara\'s piercing cards hit hard when enemies line up.',
            'Play mid and build Super through consistent poking.'
        ],
        'Brawl Ball': [
            'Super can pull the entire enemy team together for a team wipe.',
            'A well-placed Super near the goal clears the way for a score.',
            'Use piercing attack to hit both the ball carrier and their teammates.'
        ],
        'Showdown': [
            'Tara needs her Super to shine — poke and build it up first.',
            'Super into close-range burst can kill most brawlers instantly.',
            'Use shadows from Super to distract and overwhelm enemies.'
        ],
        'Heist': [
            'Pull defenders together and let your team wipe them out.',
            'Tara\'s DPS on the safe is decent at close range.',
            'Super is crucial — without it, Tara is much weaker.'
        ],
        'Bounty': [
            'Pull enemies together for multi-kills to swing the star count.',
            'Piercing cards are great for hitting enemies behind teammates.',
            'Save Super for game-changing moments rather than single kills.'
        ],
        'Hot Zone': [
            'Super into the zone pulls enemies out and gives your team control.',
            'Piercing attacks are strong when enemies cluster in the zone.',
            'Build Super quickly and use it to contest key zones.'
        ],
        'Knockout': [
            'A good Super can pull 2-3 enemies and let your team eliminate them.',
            'Tara is a high-impact pick — one Super can win the round.',
            'Play patiently and wait for the perfect moment to use Super.'
        ],
        'Duels': [
            'Build Super and use it to guarantee the kill.',
            'Piercing cards hit hard up close — play at mid range.',
            'Shadow spawns from Super give you an advantage in 1v1 fights.'
        ]
    },
    'Max': {
        'Gem Grab': [
            'Use Super to speed up your whole team for a fast push or retreat.',
            'Max\'s fast movement lets her dodge shots easily — strafe while shooting.',
            'Great gem carrier thanks to her speed and ability to escape.'
        ],
        'Brawl Ball': [
            'Speed boost your ball carrier for a fast rush to the goal.',
            'Max is great at dribbling — her speed makes her hard to catch.',
            'Use Super when pushing with the ball to overwhelm defenders.'
        ],
        'Showdown': [
            'Max\'s speed lets her escape fights she can\'t win.',
            'Chip enemies from mid range and use speed to stay alive.',
            'Avoid bush-campers — you can outrun most threats.'
        ],
        'Heist': [
            'Speed boost your team for a coordinated rush on the safe.',
            'Max\'s fast shots can chip the safe from range.',
            'Use mobility to harass enemy defenders and create openings.'
        ],
        'Bounty': [
            'Fast movement makes Max hard to hit — dodge and chip enemies.',
            'Speed boost helps your team reposition quickly.',
            'Play at mid range and strafe constantly to avoid shots.'
        ],
        'Hot Zone': [
            'Speed lets you rotate between zones quickly.',
            'Speed boost your team into the zone for a fast capture.',
            'Dodge enemy attacks while standing in the zone to hold it longer.'
        ],
        'Knockout': [
            'Speed boost gives your whole team a positioning advantage.',
            'Max is hard to kill — dodge and stay alive while your team fights.',
            'Use mobility to flank and catch enemies off guard.'
        ],
        'Duels': [
            'Strafe constantly — Max wins by dodging and out-DPSing opponents.',
            'Speed boost yourself to make fights unfair for slower brawlers.',
            'Avoid tanks who can absorb your damage and get close.'
        ]
    },
    'Mr. P': {
        'Gem Grab': [
            'Place your porter base behind walls where it\'s hard to destroy.',
            'Porters constantly pressure enemies and force them to deal with spawns.',
            'Bouncing suitcase attack hits enemies hiding behind cover.'
        ],
        'Brawl Ball': [
            'Porter base near the goal creates constant pressure on defense.',
            'Bouncing attack is hard to dodge in tight Brawl Ball maps.',
            'Place base in protected spots so it lasts through the match.'
        ],
        'Showdown': [
            'Porter base gives you a permanent companion in Showdown.',
            'Bouncing attack can surprise enemies behind walls.',
            'Mr. P struggles against aggressive brawlers — play defensively.'
        ],
        'Heist': [
            'Porters distract defenders while your team pushes the safe.',
            'Place base near the enemy safe — porters chip it down.',
            'Bouncing attack can reach the safe from behind obstacles.'
        ],
        'Bounty': [
            'Porters harass enemies and prevent them from healing.',
            'Bouncing suitcase is great for poking enemies behind cover.',
            'Play a supportive role — let porters do the work while you stay safe.'
        ],
        'Hot Zone': [
            'Place porter base near the zone — spawns will contest it for you.',
            'Porters in the zone force enemies to waste attacks on them.',
            'Great at maintaining zone presence through spawns.'
        ],
        'Knockout': [
            'Porter base adds extra pressure and distracts enemies.',
            'Bouncing attack is useful for chipping enemies in cover-heavy maps.',
            'Place base early to maximize value from spawns.'
        ],
        'Duels': [
            'Porters give you an unfair advantage in 1v1 — place base immediately.',
            'Bouncing attack hits enemies behind cover in small Duels maps.',
            'Keep distance and let your porters do extra damage.'
        ]
    },
    'Sprout': {
        'Gem Grab': [
            'Use Super wall to block off the gem mine or trap enemies.',
            'Lob attacks over walls to safely control the mid area.',
            'Sprout\'s wall can cut off enemy retreats after they grab gems.'
        ],
        'Brawl Ball': [
            'Place Super wall in front of the enemy goal to block scores.',
            'Wall off chokepoints to control the flow of the match.',
            'Lob attacks over walls to hit ball carriers in tight spaces.'
        ],
        'Showdown': [
            'Lob shots over obstacles to safely chip enemies.',
            'Use Super wall to block off areas or trap enemies in the gas.',
            'Sprout is fragile — stay behind walls and avoid direct fights.'
        ],
        'Heist': [
            'Wall off the path to your safe for great defense.',
            'Lob attacks can chip the safe from behind cover.',
            'Super wall placement is crucial — use it strategically to block pushes.'
        ],
        'Bounty': [
            'Lob shots safely from behind walls for consistent chip damage.',
            'Super wall can cut off enemy rotations.',
            'Sprout excels on maps with lots of walls to lob over.'
        ],
        'Hot Zone': [
            'Wall off the zone entrance to control who can enter.',
            'Lob attacks into the zone to hit enemies standing in it.',
            'Super wall can be used offensively or defensively on zones.'
        ],
        'Knockout': [
            'Wall off enemies to split them from their team.',
            'Lob attacks safely from cover — consistent chip wins rounds.',
            'A well-placed wall can trap an enemy and guarantee a kill.'
        ],
        'Duels': [
            'Lob shots over walls to safely out-chip your opponent.',
            'Use wall to trap enemies in corners for easy finishes.',
            'Sprout struggles against fast brawlers who can dodge lobs.'
        ]
    },
    'Lou': {
        'Gem Grab': [
            'Freeze enemies on the gem mine to prevent them from collecting.',
            'Lou\'s Super creates a slippery area that disrupts enemy movement.',
            'Stack freeze on priority targets to stun them completely.'
        ],
        'Brawl Ball': [
            'Place Super on the goal to make it impossible for enemies to score.',
            'Freeze the ball carrier to steal possession.',
            'Ice area forces enemies to slide unpredictably, ruining their aim.'
        ],
        'Showdown': [
            'Freeze enemies to slow them down and finish them off.',
            'Super on choke points controls enemy movement.',
            'Lou is average in Showdown — play around cover and freeze enemies.'
        ],
        'Heist': [
            'Freeze defenders to clear the path for your team.',
            'Super on the safe area disrupts enemy defense.',
            'Lou\'s DPS is low — focus on support and crowd control.'
        ],
        'Bounty': [
            'Freeze enemies to set up kills for your teammates.',
            'Lou\'s range and freeze mechanic are useful in Bounty.',
            'Stack frost on enemies behind cover with your projectiles.'
        ],
        'Hot Zone': [
            'Super on the zone makes it almost impossible for enemies to stand in it.',
            'Lou is excellent in Hot Zone — freeze and ice control the zone.',
            'Stack freeze on enemies contesting the zone.'
        ],
        'Knockout': [
            'Freeze an enemy early to give your team a numbers advantage.',
            'Super controls key areas and forces enemies to reposition.',
            'Play behind your team and stack freeze on priority targets.'
        ],
        'Duels': [
            'Stack freeze attacks and follow up with burst when they\'re stunned.',
            'Super makes the area slippery — use it to control spacing.',
            'Lou can struggle against fast brawlers who dodge his narrow attack.'
        ]
    },
    'Buzz': {
        'Gem Grab': [
            'Use Super grapple to dive onto the enemy gem carrier.',
            'Charge Super by standing near enemies — stay in the action.',
            'Buzz is a great aggro pick — dive in, get kills, and control the mid.'
        ],
        'Brawl Ball': [
            'Grapple onto defenders and stun them to clear the path for your team.',
            'Buzz is one of the best Brawl Ball brawlers — aggressive and tanky.',
            'Use Super on the ball carrier to steal possession immediately.'
        ],
        'Showdown': [
            'Charge Super passively by standing near enemies in bushes.',
            'Grapple in and burst down enemies at close range.',
            'Avoid long-range brawlers who can keep you away.'
        ],
        'Heist': [
            'Grapple onto defenders to eliminate them and open a path to the safe.',
            'Buzz can tank damage while your team attacks the safe.',
            'Super stun gives your team a window to push.'
        ],
        'Bounty': [
            'Grapple onto squishy enemies for easy picks.',
            'Buzz is risky in Bounty — one bad dive can cost you stars.',
            'Charge Super by staying close to the action without overcommitting.'
        ],
        'Hot Zone': [
            'Grapple into the zone and stun enemies to take control.',
            'Buzz can hold zones well with his decent HP and burst damage.',
            'Charge Super passively while standing in the zone.'
        ],
        'Knockout': [
            'A single grapple stun can guarantee a kill and win the round.',
            'Buzz is extremely strong in Knockout — dive and eliminate.',
            'Wait for the right moment — a bad grapple leaves you exposed.'
        ],
        'Duels': [
            'Grapple in and stun for a guaranteed burst combo.',
            'Buzz excels in close-range Duels matchups.',
            'Charge Super passively to always have a grapple ready.'
        ]
    },
    'Ash': {
        'Gem Grab': [
            'Build rage by taking damage, then unleash devastating close-range attacks.',
            'Ash is an excellent tank — push forward and absorb damage for your team.',
            'At full rage, your attack speed increases dramatically.'
        ],
        'Brawl Ball': [
            'Tank your way to the goal while building rage from enemy attacks.',
            'Ash excels in Brawl Ball — his tankiness and rage make him unstoppable.',
            'Use Super to summon rats that distract and damage enemies.'
        ],
        'Showdown': [
            'Get into fights to build rage and become more powerful.',
            'Ash is strong at close range — ambush from bushes.',
            'Collect power cubes while building rage through skirmishes.'
        ],
        'Heist': [
            'Tank damage on the way to the safe and deal massive DPS at full rage.',
            'Ash\'s Super rats can chip the safe while you fight defenders.',
            'Build rage quickly and unload on the safe for huge damage.'
        ],
        'Bounty': [
            'Ash struggles in Bounty — short range and slow movement are liabilities.',
            'If playing Ash in Bounty, stick to bushy maps and ambush.',
            'Build rage before engaging — low rage Ash is too weak.'
        ],
        'Hot Zone': [
            'Stand in the zone and build rage from enemy attacks.',
            'Ash is a great zone holder — tanky and increasingly dangerous.',
            'Summon rats with Super to help contest the zone.'
        ],
        'Knockout': [
            'Build rage early and use your power spike to eliminate enemies.',
            'Ash needs to take damage to be effective — don\'t play too passively.',
            'Super rats provide extra bodies to distract enemies in team fights.'
        ],
        'Duels': [
            'Build rage and overwhelm enemies with boosted attack speed.',
            'Ash wins close-range Duels — force the fight up close.',
            'Avoid sharpshooters who can keep you at bay without letting you rage up.'
        ]
    },
    '8-Bit': {
        'Gem Grab': [
            'Place your damage booster turret near the gem mine for your team.',
            '8-Bit has insane DPS but is very slow — position carefully.',
            'Stay near your booster and let enemies come to you.'
        ],
        'Brawl Ball': [
            '8-Bit is too slow for Brawl Ball — avoid picking him here.',
            'If forced, play defense and use your DPS to shred attackers.',
            'Place booster near the goal for maximum defensive value.'
        ],
        'Showdown': [
            '8-Bit is a Showdown monster — his DPS melts everyone.',
            'With power cubes, 8-Bit becomes nearly unstoppable in damage.',
            'Play near the center and control your area — your speed is your weakness.'
        ],
        'Heist': [
            'Park your booster near the safe and melt it with boosted DPS.',
            '8-Bit has some of the highest safe DPS in the game.',
            'Defend by standing near your safe and shredding attackers.'
        ],
        'Bounty': [
            'Incredible DPS at range — 8-Bit can dominate Bounty sight lines.',
            'Place booster in a central location to boost your team\'s damage.',
            'Your slow speed means positioning is everything — don\'t get flanked.'
        ],
        'Hot Zone': [
            'Place booster in the zone and out-DPS anyone who contests.',
            '8-Bit can hold zones by threatening massive damage output.',
            'Slow movement is less of an issue on small Hot Zone maps.'
        ],
        'Knockout': [
            'Set up your booster and let enemies walk into your damage.',
            '8-Bit is strong in Knockout — his DPS advantage wins trades.',
            'Stay behind your team and provide damage support.'
        ],
        'Duels': [
            'Place booster and fight near it — the damage boost wins most 1v1s.',
            '8-Bit has one of the highest DPS in the game — use it.',
            'Avoid fast brawlers who can dodge your shots and circle around you.'
        ]
    },
    'Jacky': {
        'Gem Grab': [
            'Jacky\'s ground pound hits everything around her — great for mid control.',
            'Tank damage for your team and push enemies away from the gem mine.',
            'Super pulls enemies toward you — use it to grab gem carriers.'
        ],
        'Brawl Ball': [
            'Jacky is a strong Brawl Ball tank — push through defenses.',
            'Super pulls enemies in, disrupting their positioning.',
            'Ground pound hits through walls — abuse this on tight maps.'
        ],
        'Showdown': [
            'Jacky hits hard at close range but has very limited range.',
            'Hide in bushes and ambush enemies — your burst is strong.',
            'Avoid sharpshooters who can chip you from far away.'
        ],
        'Heist': [
            'Tank your way to the safe and deal close-range damage.',
            'Super pulls defenders away from their safe.',
            'Jacky is a decent Heist pick on close-range maps.'
        ],
        'Bounty': [
            'Jacky is terrible in Bounty — avoid picking her here.',
            'If forced, stick to bushes and try to ambush.',
            'Your short range makes it hard to contribute on open Bounty maps.'
        ],
        'Hot Zone': [
            'Jacky is great in Hot Zone — stand in the zone and hit everyone around you.',
            'Ground pound hits through walls, making it hard for enemies to contest.',
            'Super pulls enemies off the zone or pulls them into your attacks.'
        ],
        'Knockout': [
            'Push forward and use your tankiness to absorb damage for your team.',
            'Super disrupts enemy positioning in team fights.',
            'Play behind walls and hit enemies with your piercing ground pound.'
        ],
        'Duels': [
            'Fight close and use your burst damage to overwhelm enemies.',
            'Super pulls enemies in for guaranteed hits.',
            'Avoid long-range brawlers who can kite you endlessly.'
        ]
    },
    'Bea': {
        'Gem Grab': [
            'Bea\'s supercharged shot deals massive damage — save it for key moments.',
            'Slow enemies with Super bees to control the gem mine area.',
            'Alternate between normal and supercharged shots for consistent DPS.'
        ],
        'Brawl Ball': [
            'Supercharged shot can one-hit squishy brawlers near the goal.',
            'Slow enemies with Super to prevent them from scoring.',
            'Bea is a strong lane controller in Brawl Ball — hold your side.'
        ],
        'Showdown': [
            'Supercharged shot can chunk any brawler for massive damage.',
            'Play at range and poke — Bea is fragile up close.',
            'Slow bees from Super protect you from aggressive pushes.'
        ],
        'Heist': [
            'Supercharged shots deal good burst to the safe.',
            'Slow defenders with Super bees while your team attacks the safe.',
            'Bea is decent in Heist but needs team support for big pushes.'
        ],
        'Bounty': [
            'Bea is excellent in Bounty — supercharged shot can pick off enemies from range.',
            'Hold long sight lines and alternate shots for maximum output.',
            'Slow enemies trying to escape with high star counts.'
        ],
        'Hot Zone': [
            'Slow enemies in the zone with Super bees to control it.',
            'Supercharged shot threatens anyone standing in the zone.',
            'Play at range and control the zone from a distance.'
        ],
        'Knockout': [
            'Supercharged shot can delete squishy enemies in one hit.',
            'Bea is a top-tier Knockout pick — one big shot can win the round.',
            'Save supercharged shots for guaranteed hits, not speculative pokes.'
        ],
        'Duels': [
            'Land your supercharged shot first — it gives you a huge HP advantage.',
            'Slow enemies with Super to control spacing.',
            'Bea wins against slow or low-HP brawlers, struggles against tanks.'
        ]
    },
    'Nani': {
        'Gem Grab': [
            'Nani\'s burst is insane — if all three orbs converge, it nearly one-shots.',
            'Use Peep (Super) to scout and snipe enemies from safety.',
            'Stay at the perfect distance where your orbs converge for max damage.'
        ],
        'Brawl Ball': [
            'Burst down ball carriers with a perfectly aimed triple-orb shot.',
            'Peep can be used to zone enemies away from the goal.',
            'Nani is hard to use in Brawl Ball — practice your aim.'
        ],
        'Showdown': [
            'Nani\'s burst kills most brawlers in 2 hits if orbs converge.',
            'Use Peep to finish off low-HP enemies hiding behind cover.',
            'Keep distance — Nani is fragile and needs good positioning.'
        ],
        'Heist': [
            'Peep does good damage to the safe — use it on offense.',
            'Nani\'s burst can eliminate defenders quickly.',
            'Hard to hit consistent shots on the safe — Peep is better for safe damage.'
        ],
        'Bounty': [
            'Nani is amazing in Bounty — perfect convergence kills nearly any brawler.',
            'Use Peep to scout enemies and get safe long-range kills.',
            'Stay at the sweet spot range where your orbs converge.'
        ],
        'Hot Zone': [
            'Burst down enemies standing in the zone with converged orbs.',
            'Use Peep to zone enemies out of the area.',
            'Nani\'s range and burst make her a solid Hot Zone pick.'
        ],
        'Knockout': [
            'One converged shot can delete an enemy and win the round.',
            'Peep for scouting and finishing injured enemies safely.',
            'Nani rewards good aim — practice the convergence distance.'
        ],
        'Duels': [
            'Land converged shots to chunk enemies for massive damage.',
            'Use Peep to finish off enemies who retreat behind walls.',
            'Nani wins against slow brawlers but struggles against dodgy ones.'
        ]
    },
    'Ruffs': {
        'Gem Grab': [
            'Super drops a power-up for a teammate — boost your gem carrier or DPS.',
            'Ruffs\' bouncing shots hit enemies behind cover.',
            'Play as support — keep your team buffed and poke from range.'
        ],
        'Brawl Ball': [
            'Power-up your ball carrier or tank for an even stronger push.',
            'Bouncing shots are great on wall-heavy Brawl Ball maps.',
            'Super buff gives HP and damage — use it on key teammates.'
        ],
        'Showdown': [
            'In Duo Showdown, Super power-up makes your teammate extremely strong.',
            'Bouncing shots can hit enemies around corners.',
            'Ruffs is average in Solo Showdown — play with a partner.'
        ],
        'Heist': [
            'Power-up your highest DPS teammate to melt the safe faster.',
            'Bouncing shots chip the safe from behind walls.',
            'Ruffs provides great team utility even if his own DPS is modest.'
        ],
        'Bounty': [
            'Bouncing shots are excellent for hitting enemies behind cover.',
            'Power-up a sniper teammate for devastating long-range damage.',
            'Ruffs is a solid Bounty support — play behind your team.'
        ],
        'Hot Zone': [
            'Power-up a teammate holding the zone for extra HP and damage.',
            'Bouncing shots poke enemies around cover near the zone.',
            'Play supportive and keep your team buffed and healthy.'
        ],
        'Knockout': [
            'Power-up your strongest fighter for a big advantage in round fights.',
            'Ruffs\' bouncing shots are great in Knockout\'s cover-heavy maps.',
            'Super at the start of the round to give your team an edge.'
        ],
        'Duels': [
            'Power-up has no teammate to buff — Ruffs is weaker in Duels.',
            'Bouncing shots can catch enemies behind walls.',
            'Play at mid range and use bouncing attack to your advantage.'
        ]
    },
    'Squeak': {
        'Gem Grab': [
            'Squeak\'s sticky bombs attach to enemies and explode with splash — great area denial.',
            'Control the gem mine by throwing bombs that force enemies to move.',
            'Super covers a huge area with sticky bombs — perfect for zoning.'
        ],
        'Brawl Ball': [
            'Throw sticky bombs on the goal to prevent enemy scores.',
            'Super on the enemy ball carrier forces them to drop the ball or take damage.',
            'Control chokepoints with delayed explosions.'
        ],
        'Showdown': [
            'Sticky bombs force enemies to reposition — use this for area control.',
            'Squeak is fragile — avoid close fights and poke from range.',
            'Super covers a wide area, great for zoning off entire sections of the map.'
        ],
        'Heist': [
            'Sticky bombs chip the safe when attached.',
            'Super on the safe area forces defenders to scatter.',
            'Squeak provides good area denial but low burst DPS on safes.'
        ],
        'Bounty': [
            'Sticky bombs zone enemies out of favorable positions.',
            'Control the map center with delayed explosions.',
            'Squeak is decent in Bounty — poke and zone consistently.'
        ],
        'Hot Zone': [
            'Squeak is excellent in Hot Zone — sticky bombs deny the zone completely.',
            'Super covers the zone area, making it dangerous for enemies to stand in.',
            'Throw bombs into the zone and force enemies to leave.'
        ],
        'Knockout': [
            'Sticky bombs force enemies out of cover — follow up with your team.',
            'Super can zone off large areas in the final fight.',
            'Play patiently and use area denial to control the round pace.'
        ],
        'Duels': [
            'Delayed explosions make Squeak tricky in Duels — predict movement.',
            'Throw bombs where enemies will be, not where they are.',
            'Squeak struggles against fast brawlers who can dodge easily.'
        ]
    },
    'Griff': {
        'Gem Grab': [
            'Griff\'s fan-shaped attack deals insane damage up close — shred gem carriers.',
            'Super fires a wave of coins forward and then back — hits twice for massive damage.',
            'Control the mid lane with your high DPS and punish anyone who gets close.'
        ],
        'Brawl Ball': [
            'Super can hit enemies twice — forward and returning — for devastating burst.',
            'Griff melts tanks at close range — great as a lane controller.',
            'Play aggressive on offense and shred defenders with full-hit attacks.'
        ],
        'Showdown': [
            'Griff\'s close-range DPS is among the highest in the game.',
            'Use bushes to ambush enemies and unload full attacks.',
            'Super deals great burst — throw it through enemies for a double hit.'
        ],
        'Heist': [
            'Griff\'s DPS is excellent against the safe at close range.',
            'Super deals significant damage to the safe with its double hit.',
            'Play aggressively and push with your team to reach the safe.'
        ],
        'Bounty': [
            'Griff needs to get closer than ideal for Bounty — be careful.',
            'Fan-shaped attack can hit multiple enemies when they group.',
            'Not the best Bounty pick — save Griff for other modes.'
        ],
        'Hot Zone': [
            'Stand in the zone and shred anyone who comes close.',
            'Super through the zone hits enemies coming and going.',
            'Griff is strong in Hot Zone — high DPS and decent HP.'
        ],
        'Knockout': [
            'Burst down enemies at close-mid range for quick eliminations.',
            'Super double-hit can delete squishier brawlers instantly.',
            'Play behind cover and wait for enemies to come into your range.'
        ],
        'Duels': [
            'Up close, Griff\'s DPS is nearly unmatched — force close fights.',
            'Super for double-hit burst that can swing the fight.',
            'Avoid long-range matchups where Griff can\'t hit full attacks.'
        ]
    },
    'Grom': {
        'Gem Grab': [
            'Lob attacks over walls to safely control the gem mine.',
            'Super throws a massive bomb that splits — devastating in chokepoints.',
            'Grom is excellent at mid-range zone control — hold your ground.'
        ],
        'Brawl Ball': [
            'Lob attacks into the goal area to zone off defenders.',
            'Super can break walls and clear paths to the goal.',
            'Great at controlling tight spaces around the goal.'
        ],
        'Showdown': [
            'Lob shots over walls to safely damage enemies.',
            'Super\'s splitting bomb clears large areas — use on groups.',
            'Grom is fragile — maintain distance and use cover.'
        ],
        'Heist': [
            'Lob attacks chip the safe from behind cover.',
            'Super deals great burst damage to the safe.',
            'Control defenders by lobbing over their cover.'
        ],
        'Bounty': [
            'Grom is strong in Bounty — lob shots hit hard from safety.',
            'Super can hit multiple enemies when they cluster.',
            'Stay behind walls and poke consistently for star advantage.'
        ],
        'Hot Zone': [
            'Lob attacks into the zone to damage enemies standing in it.',
            'Super clears the zone with splitting explosions.',
            'Great Hot Zone pick — control the zone from range.'
        ],
        'Knockout': [
            'Lob attacks are perfect for the cover-heavy Knockout maps.',
            'Super can flush enemies from cover for your team to finish.',
            'Stay safe behind walls and provide consistent artillery support.'
        ],
        'Duels': [
            'Predict enemy movement and lob shots accurately.',
            'Super is a great finisher — use when enemy HP is low.',
            'Grom struggles against fast assassins who can close the gap.'
        ]
    },
    'Fang': {
        'Gem Grab': [
            'Use Super kick to chain kills — it resets on elimination.',
            'Fang\'s shoe attack pierces through enemies — line up shots.',
            'Play aggressively and chain Supers for multi-kills.'
        ],
        'Brawl Ball': [
            'Chain Super kicks through defenders to clear the path to goal.',
            'Fang is incredible in Brawl Ball — his chain kill potential is unmatched.',
            'Kick onto the ball carrier and steal possession.'
        ],
        'Showdown': [
            'Fang\'s Super chain lets you wipe multiple enemies in Showdown.',
            'Get close and use shoe attack to build Super quickly.',
            'Save Super for moments when enemies are grouped for chain kills.'
        ],
        'Heist': [
            'Kick onto defenders and chain through them to reach the safe.',
            'Fang can quickly eliminate defenders with chained Super kicks.',
            'Focus on removing defenders rather than directly damaging the safe.'
        ],
        'Bounty': [
            'Chain Super kills can swing the star count massively in your favor.',
            'Pick off enemies with your long-range shoe attack.',
            'Fang is high-risk, high-reward in Bounty — commit to smart dives.'
        ],
        'Hot Zone': [
            'Kick into the zone and chain kills on enemies contesting it.',
            'Fang can clear an entire zone with chained Super kicks.',
            'Build Super quickly and use it to dominate zone fights.'
        ],
        'Knockout': [
            'Chained Super kicks can wipe the enemy team in one sequence.',
            'Fang is devastating in Knockout — one chain can end the round.',
            'Wait for enemies to group before committing your Super.'
        ],
        'Duels': [
            'Super kick provides guaranteed burst damage in 1v1.',
            'Shoe attack gives decent range for an assassin — use it to poke.',
            'Fang excels in Duels — great burst and mobility.'
        ]
    },
    'Eve': {
        'Gem Grab': [
            'Eve floats over water — use this to access unique positions on maps.',
            'Hatchlings from attacks provide extra pressure and chip damage.',
            'Control the gem mine from unexpected angles using water tiles.'
        ],
        'Brawl Ball': [
            'Float over water to take shortcuts others can\'t.',
            'Hatchlings distract defenders while you or your team scores.',
            'Eve is versatile in Brawl Ball — use water mobility creatively.'
        ],
        'Showdown': [
            'Use water tiles as safe zones — most brawlers can\'t follow you.',
            'Hatchlings from your attack harass enemies consistently.',
            'Eve is strong in Showdown on water-heavy maps.'
        ],
        'Heist': [
            'Float over water to find alternative routes to the safe.',
            'Hatchlings chip the safe while you fight defenders.',
            'Eve\'s unique pathing can surprise enemies on offense.'
        ],
        'Bounty': [
            'Eve\'s range and hatchlings make her a solid Bounty pick.',
            'Use water positions that enemies can\'t reach to play safely.',
            'Poke from range and let hatchlings add extra chip damage.'
        ],
        'Hot Zone': [
            'Float over water near the zone for unique positioning advantages.',
            'Hatchlings contest the zone even when you\'re not in it.',
            'Eve is good in Hot Zone on maps with water near the zone.'
        ],
        'Knockout': [
            'Water mobility gives you unexpected angles in Knockout.',
            'Hatchlings add pressure and distract enemies during fights.',
            'Play at mid range and use your unique mobility advantage.'
        ],
        'Duels': [
            'Hatchlings give you extra damage in 1v1 fights.',
            'Use water to reposition if available on the Duels map.',
            'Eve is a solid Duels pick with consistent damage output.'
        ]
    },
    'Janet': {
        'Gem Grab': [
            'Janet\'s Super lets her fly — use it to escape with gems or reposition.',
            'Strong at mid range — poke enemies consistently with her note attacks.',
            'Fly over walls to reach the gem mine from unexpected directions.'
        ],
        'Brawl Ball': [
            'Fly over defenders to score or reposition with the ball.',
            'Janet\'s range makes her a good lane controller.',
            'Super fly is invulnerable — use it to escape pressure situations.'
        ],
        'Showdown': [
            'Fly away from danger when you\'re outnumbered.',
            'Janet\'s consistent damage and mobility make her solid in Showdown.',
            'Use Super to escape the closing gas or reposition to safety.'
        ],
        'Heist': [
            'Fly over defenders to get behind them and attack the safe.',
            'Janet\'s DPS is decent — focus on consistent safe damage.',
            'Super lets you bypass walls and defenses entirely.'
        ],
        'Bounty': [
            'Janet is great in Bounty — fly away when you have high stars.',
            'Poke from mid range and build Super for safety.',
            'Use flight to escape after getting kills and saving your stars.'
        ],
        'Hot Zone': [
            'Fly into or out of the zone to control engagements.',
            'Poke enemies in the zone from mid range consistently.',
            'Janet\'s mobility makes her flexible in Hot Zone.'
        ],
        'Knockout': [
            'Fly to reposition and catch enemies off guard.',
            'Consistent mid-range damage helps win trades.',
            'Super is a great escape if you\'re about to die — stay alive for your team.'
        ],
        'Duels': [
            'Fly to reposition and reset fights in your favor.',
            'Janet\'s consistent damage wins mid-range 1v1s.',
            'Use Super to dodge enemy Supers or bursts.'
        ]
    },
    'Bonnie': {
        'Gem Grab': [
            'Bonnie has two forms — long-range cannon and close-range melee.',
            'Use cannon form to poke from range, then switch to melee to finish.',
            'Great gem carrier — melee form is fast and tanky.'
        ],
        'Brawl Ball': [
            'Switch to melee form and rush the goal with speed.',
            'Cannon form controls lanes, melee form pushes aggressively.',
            'Bonnie\'s dual form makes her unpredictable in Brawl Ball.'
        ],
        'Showdown': [
            'Poke from cannon form and finish kills in melee form.',
            'Melee form has high burst and mobility — ambush from bushes.',
            'Switch between forms based on the situation — adapt constantly.'
        ],
        'Heist': [
            'Melee form deals great DPS to the safe up close.',
            'Use cannon form to chip from range, then switch for burst.',
            'Push the safe aggressively in melee form with your team.'
        ],
        'Bounty': [
            'Cannon form is strong in Bounty — long range and good damage.',
            'Switch to melee only when you can guarantee a kill.',
            'Stay in cannon form most of the time for safe Bounty play.'
        ],
        'Hot Zone': [
            'Melee form holds zones well with speed and burst.',
            'Switch between forms based on whether you\'re contesting or poking.',
            'Bonnie is versatile in Hot Zone — adapt your form to the situation.'
        ],
        'Knockout': [
            'Open with cannon shots, then switch to melee to finish kills.',
            'Two forms give you flexibility in different round situations.',
            'Melee form burst can quickly eliminate enemies in close fights.'
        ],
        'Duels': [
            'Switch forms to keep your opponent guessing.',
            'Open at range in cannon form, close in with melee for the kill.',
            'Bonnie is excellent in Duels — versatile and hard to counter.'
        ]
    },
    'Otis': {
        'Gem Grab': [
            'Otis\'s Super silences an enemy — they can\'t attack, use Super, or use gadget.',
            'Silence the enemy gem carrier to make them a free kill.',
            'Paint attacks deal consistent chip damage — build Super steadily.'
        ],
        'Brawl Ball': [
            'Silence the ball carrier to force them to drop the ball.',
            'Otis\'s silence is one of the strongest abilities in Brawl Ball.',
            'Control lanes with your paint attack and save Super for key moments.'
        ],
        'Showdown': [
            'Silence an enemy in a fight to guarantee the kill.',
            'Otis is average in Showdown — his strength is in team modes.',
            'Play cautiously and save Super for critical encounters.'
        ],
        'Heist': [
            'Silence key defenders to let your team push the safe.',
            'Paint attacks chip consistently but aren\'t great for safe damage.',
            'Use silence to shut down enemy tanks or high-DPS defenders.'
        ],
        'Bounty': [
            'Silence a key enemy to remove their ability to fight back.',
            'Otis is useful in Bounty — silencing high-star enemies is huge.',
            'Poke to build Super and use it at the right moment.'
        ],
        'Hot Zone': [
            'Silence enemies in the zone to make them easy targets.',
            'Otis can control zones by threatening silence on anyone contesting.',
            'Build Super quickly and use it to swing zone control.'
        ],
        'Knockout': [
            'Silence an enemy to guarantee a kill and gain numbers advantage.',
            'Otis\'s Super can single-handedly win a Knockout round.',
            'Save Super for the most dangerous enemy on the other team.'
        ],
        'Duels': [
            'Silence your opponent and burst them down while they can\'t fight back.',
            'Otis excels in Duels — silence is devastating in 1v1.',
            'Build Super from poke damage and use it to win the fight.'
        ]
    },
    'Sam': {
        'Gem Grab': [
            'Sam throws his knuckle busters and recalls them — dealing damage both ways.',
            'When his fists are out, Sam has extended melee range near the knuckles.',
            'Control the gem mine by throwing knuckles and fighting near them.'
        ],
        'Brawl Ball': [
            'Throw knuckles near the goal and fight there for extended range.',
            'Sam is a strong tank in Brawl Ball — push aggressively.',
            'Use Super to pull enemies toward your knuckle busters.'
        ],
        'Showdown': [
            'Throw knuckles and fight near them for devastating extended attacks.',
            'Sam is tanky and hits hard — great for close-range fights.',
            'Collect power cubes and dominate the late game with extended range.'
        ],
        'Heist': [
            'Throw knuckles near the safe and deal extended-range damage.',
            'Sam is a solid Heist pick — tanky and high DPS near his knuckles.',
            'Push to the safe and recall knuckles through defenders for damage.'
        ],
        'Bounty': [
            'Sam struggles in Bounty — short range and slow movement.',
            'If playing Sam in Bounty, stick to close-quarters maps.',
            'Throw knuckles to extend your threat range as much as possible.'
        ],
        'Hot Zone': [
            'Throw knuckles into the zone and fight near them for extended range.',
            'Sam is excellent in Hot Zone — tanky enough to hold zones.',
            'Use Super to pull enemies into your knuckle zone.'
        ],
        'Knockout': [
            'Extended range near your knuckles gives you an edge in fights.',
            'Sam is a strong brawler in Knockout — tanky and hard-hitting.',
            'Position your knuckles carefully to maximize your effective range.'
        ],
        'Duels': [
            'Throw knuckles and fight near them for extended-range burst.',
            'Sam wins most close-range Duels thanks to his extended attacks.',
            'Avoid long-range matchups where you can\'t reach your opponent.'
        ]
    },
    'Gus': {
        'Gem Grab': [
            'Gus\'s Super creates a shield for himself or teammates — great support.',
            'Soul orbs from defeated enemies heal and charge your shield.',
            'Play as a support — shield your gem carrier and poke from mid range.'
        ],
        'Brawl Ball': [
            'Shield your ball carrier to help them survive the push to the goal.',
            'Collect soul orbs from fallen enemies to maintain shields.',
            'Gus provides great utility in Brawl Ball as a support healer.'
        ],
        'Showdown': [
            'Soul orbs from eliminations keep your shield charged.',
            'Shield absorbs damage — makes you tougher in fights.',
            'Gus is decent in Showdown with his self-sustain from shields.'
        ],
        'Heist': [
            'Shield your DPS brawler as they push toward the safe.',
            'Gus\'s own damage is low — focus on supporting teammates.',
            'Soul orbs keep you shielded while defending.'
        ],
        'Bounty': [
            'Shield teammates with high star counts to keep them alive.',
            'Poke from range and build up your shield mechanic.',
            'Gus is a solid Bounty support with good range and utility.'
        ],
        'Hot Zone': [
            'Shield teammates holding the zone to make them harder to kill.',
            'Soul orbs from zone fights keep your shield available.',
            'Play behind the frontline and provide shields to zone holders.'
        ],
        'Knockout': [
            'Shield your key teammate to give them an HP advantage.',
            'Soul orbs from eliminations power your next shield.',
            'Gus adds great value in Knockout through shielding alone.'
        ],
        'Duels': [
            'Self-shield makes you tougher to kill in 1v1 fights.',
            'Collect soul orbs to maintain your shield between fights.',
            'Gus is average in Duels — his support kit is better in team modes.'
        ]
    },
    'Buster': {
        'Gem Grab': [
            'Buster\'s Super creates a shield wall that blocks all projectiles.',
            'Use shield wall to protect your team while pushing the gem mine.',
            'Tank damage and fight at close range — Buster has strong burst.'
        ],
        'Brawl Ball': [
            'Shield wall blocks shots aimed at your ball carrier.',
            'Buster is an excellent Brawl Ball tank — push through with shield wall.',
            'Close-range burst damage shreds defenders.'
        ],
        'Showdown': [
            'Shield wall blocks enemy attacks — great for clutch defense.',
            'Buster\'s close-range damage is strong — ambush from bushes.',
            'Use shield wall to survive 1v1 fights you\'d otherwise lose.'
        ],
        'Heist': [
            'Shield wall blocks defender shots while your team attacks the safe.',
            'Buster is a great Heist tank — push to the safe and deal burst damage.',
            'Use shield to cover your team\'s approach.'
        ],
        'Bounty': [
            'Shield wall can block key sniper shots and save teammates.',
            'Buster is not ideal for Bounty but his shield has utility.',
            'Stay back and use shield wall to protect your team from burst.'
        ],
        'Hot Zone': [
            'Shield wall in the zone blocks incoming damage while you hold it.',
            'Buster is strong in Hot Zone — tanky and great at holding ground.',
            'Use shield to protect teammates contesting the zone.'
        ],
        'Knockout': [
            'Shield wall can block enemy Supers and key abilities.',
            'Buster is a strong Knockout pick — his shield can win crucial fights.',
            'Use shield wall at the right moment — timing is everything.'
        ],
        'Duels': [
            'Shield wall blocks enemy attacks in 1v1 — huge defensive advantage.',
            'Buster wins most close-range Duels with shield and burst damage.',
            'Avoid long-range enemies who can wait out your shield.'
        ]
    },
    'Gray': {
        'Gem Grab': [
            'Gray\'s Super links two portals — teleport between them or let teammates use them.',
            'Portal link lets you escape with gems or reposition your team.',
            'Gray is a unique support — use portals to control map positioning.'
        ],
        'Brawl Ball': [
            'Set up portals to teleport the ball carrier past defenders.',
            'Gray\'s portal play can create unexpected scoring opportunities.',
            'Use portals defensively to get back to your goal quickly.'
        ],
        'Showdown': [
            'Portals let you escape dangerous situations instantly.',
            'Gray is tricky in Showdown — use portals for creative plays.',
            'Set up an escape portal before engaging risky fights.'
        ],
        'Heist': [
            'Teleport teammates past defenders to reach the safe.',
            'Portal play can bypass walls and defenses entirely.',
            'Gray\'s portals are incredible for coordinated Heist pushes.'
        ],
        'Bounty': [
            'Escape with high stars through portals.',
            'Reposition your team with well-placed portal links.',
            'Gray is a unique Bounty pick — his portals change the game flow.'
        ],
        'Hot Zone': [
            'Teleport into or out of zones for quick rotation.',
            'Portals let your team contest zones from unexpected angles.',
            'Gray\'s portal play is strong in multi-zone Hot Zone maps.'
        ],
        'Knockout': [
            'Portal lets you reposition your team during critical fights.',
            'Escape from losing fights through pre-placed portals.',
            'Gray adds unique utility to Knockout — creative portal use wins rounds.'
        ],
        'Duels': [
            'Set up portals for escape routes in 1v1 fights.',
            'Gray is average in Duels — his portal kit shines more in teams.',
            'Use portals to dodge enemy Supers and reposition.'
        ]
    },
    'Mandy': {
        'Gem Grab': [
            'Mandy has the longest range in the game — snipe enemies from far away.',
            'Charge your attack for maximum damage — the focused beam hits incredibly hard.',
            'Control the gem mine from long range — nobody can safely contest.'
        ],
        'Brawl Ball': [
            'Snipe ball carriers from across the map.',
            'Focused beam deals devastating damage — charge it for key shots.',
            'Mandy is a strong lane controller in Brawl Ball with her range.'
        ],
        'Showdown': [
            'Pick off enemies from extreme range before they can react.',
            'Charged beam is your main damage source — aim carefully.',
            'Avoid close-range fighters — Mandy is fragile up close.'
        ],
        'Heist': [
            'Focused beam can chip the safe from incredible range.',
            'Control defenders from far away while your team pushes.',
            'Mandy is decent in Heist but better at eliminating defenders.'
        ],
        'Bounty': [
            'Mandy is a top Bounty pick — her range is unmatched.',
            'Charged beam picks off enemies for easy star advantage.',
            'Stay far back and snipe — never engage up close.'
        ],
        'Hot Zone': [
            'Snipe enemies in the zone from extreme range.',
            'Focused beam threatens anyone standing still in the zone.',
            'Mandy controls Hot Zone maps with long sight lines.'
        ],
        'Knockout': [
            'Pick off enemies from range to give your team a numbers advantage.',
            'Charged beam can nearly one-shot squishy brawlers.',
            'Mandy is excellent in Knockout — play far back and snipe.'
        ],
        'Duels': [
            'Keep maximum distance and charge your beam for huge damage.',
            'Mandy wins most long-range Duels matchups.',
            'Avoid fast brawlers who can close the distance quickly.'
        ]
    },
    'Chester': {
        'Gem Grab': [
            'Chester\'s Super is random — you never know what you\'ll get.',
            'Play around your basic attacks which cycle through different patterns.',
            'Chester is a wild card — adapt to whatever Super you roll.'
        ],
        'Brawl Ball': [
            'Rotating attack patterns keep enemies guessing.',
            'Some Super results are great for Brawl Ball — hope for a good roll.',
            'Play mid range and chip with your attack patterns.'
        ],
        'Showdown': [
            'Chester\'s random Super can be game-changing — or useless.',
            'Attack patterns cycle — learn the rhythm to use each one effectively.',
            'Play unpredictably — that\'s Chester\'s strength.'
        ],
        'Heist': [
            'Some of Chester\'s Supers deal good safe damage.',
            'Cycling attacks keep enemies off balance while pushing.',
            'Chester is inconsistent in Heist due to random Supers.'
        ],
        'Bounty': [
            'Some attack patterns are better for Bounty than others — adapt.',
            'Chester can poke effectively at mid range.',
            'Random Super means unpredictable results — play around it.'
        ],
        'Hot Zone': [
            'Chester\'s area coverage from different attack patterns is decent.',
            'Some Supers are great for zone control — others less so.',
            'Play around whatever Super you get and adapt your strategy.'
        ],
        'Knockout': [
            'Random Supers add chaos to Knockout — can be good or bad.',
            'Attack patterns give decent consistent damage.',
            'Chester rewards adaptable players who can play with any Super.'
        ],
        'Duels': [
            'Chester\'s randomness can work for or against you in Duels.',
            'Learn to maximize each attack pattern in the cycle.',
            'Adapt to whatever Super you roll and play accordingly.'
        ]
    },
    'R-T': {
        'Gem Grab': [
            'R-T marks enemies when hitting them — marked enemies take more damage.',
            'Split R-T apart to control two areas at once.',
            'Marked enemies are easier for your team to eliminate — focus fire them.'
        ],
        'Brawl Ball': [
            'Mark defenders and push through with boosted damage.',
            'Split form can block multiple angles simultaneously.',
            'R-T\'s marking mechanic makes him a strong team player in Brawl Ball.'
        ],
        'Showdown': [
            'Mark enemies and deal extra damage while they\'re tagged.',
            'R-T is decent in Showdown — marking gives you an edge in fights.',
            'Split form lets you cover more area for safety.'
        ],
        'Heist': [
            'Split form can distract defenders while one half attacks the safe.',
            'Marking defenders helps your team deal more damage overall.',
            'R-T has decent safe DPS with consistent attacks.'
        ],
        'Bounty': [
            'Mark enemies to make them easier for your team to pick off.',
            'R-T works as a team-oriented damage dealer in Bounty.',
            'Split form gives you flexibility in positioning.'
        ],
        'Hot Zone': [
            'Split form lets you contest two zones or areas at once.',
            'Mark enemies in the zone for your team to eliminate.',
            'R-T is interesting in Hot Zone with his dual presence.'
        ],
        'Knockout': [
            'Mark a key enemy for your team to focus down.',
            'R-T\'s marking makes coordinated eliminations easier.',
            'Split form can confuse enemies about your positioning.'
        ],
        'Duels': [
            'Mark your opponent for extra damage on all your hits.',
            'R-T is solid in Duels — the mark gives consistent damage advantage.',
            'Split form can help you dodge and reposition in 1v1s.'
        ]
    },
    'Willow': {
        'Gem Grab': [
            'Willow\'s Super mind-controls an enemy — they fight for you temporarily.',
            'Mind-control the gem carrier to force them to walk toward your team.',
            'Build Super with consistent poke and use it on high-value targets.'
        ],
        'Brawl Ball': [
            'Mind-control the ball carrier to disrupt enemy plays.',
            'Willow\'s mind-control can turn a defender against their own team.',
            'Play at mid range and look for opportunities to use Super on key enemies.'
        ],
        'Showdown': [
            'Mind-control an enemy to force them to fight their allies.',
            'Willow is strong in Showdown — mind-control disrupts enemy plans.',
            'Play behind cover and save Super for critical moments.'
        ],
        'Heist': [
            'Mind-control a defender to remove them from the equation.',
            'Willow\'s mind-control can turn an enemy tank against their own safe.',
            'Focus on disruption rather than direct safe damage.'
        ],
        'Bounty': [
            'Mind-control a high-star enemy to turn them against their team.',
            'Willow is strong in Bounty — mind-control is incredibly disruptive.',
            'Poke consistently to build Super and use it at the right moment.'
        ],
        'Hot Zone': [
            'Mind-control enemies in the zone to clear it for your team.',
            'Willow\'s Super disrupts zone control entirely.',
            'Play behind your team and look for mind-control opportunities.'
        ],
        'Knockout': [
            'Mind-controlling an enemy in Knockout essentially gives you a 4v2.',
            'Willow is devastating in Knockout — one Super can decide the round.',
            'Save Super for the most dangerous enemy on the other team.'
        ],
        'Duels': [
            'Mind-control doesn\'t have teammates to turn against in Duels — less effective.',
            'Willow is weaker in Duels — mind-control is better in team modes.',
            'Poke at mid range and use Super to waste enemy time if available.'
        ]
    },
    'Doug': {
        'Gem Grab': [
            'Doug\'s Super lets him heal teammates by feeding them — strong support.',
            'Play behind your team and keep your gem carrier healed.',
            'Doug is a pure support — focus on keeping teammates alive.'
        ],
        'Brawl Ball': [
            'Heal your ball carrier as they push toward the goal.',
            'Doug\'s healing sustain can keep your team pushing indefinitely.',
            'Support your tanks and damage dealers — don\'t try to carry.'
        ],
        'Showdown': [
            'Doug struggles in Solo Showdown — he\'s a support brawler.',
            'In Duo Showdown, Doug keeps his partner alive incredibly well.',
            'Play defensively and heal yourself when possible.'
        ],
        'Heist': [
            'Heal teammates as they push the safe for sustained pressure.',
            'Doug extends your team\'s push by keeping everyone healthy.',
            'Focus entirely on supporting — Doug\'s own DPS is low.'
        ],
        'Bounty': [
            'Keep teammates alive to protect their star bounties.',
            'Doug is useful in Bounty — preventing deaths is preventing stars.',
            'Stay behind your team and heal consistently.'
        ],
        'Hot Zone': [
            'Heal teammates holding the zone to extend their survival.',
            'Doug makes zone holders much harder to remove.',
            'Play next to your team and keep them topped up.'
        ],
        'Knockout': [
            'Healing a teammate can give them an HP advantage that wins the fight.',
            'Doug is valuable in Knockout — sustain wins close rounds.',
            'Stick with your strongest teammate and keep them healthy.'
        ],
        'Duels': [
            'Doug is weak in Duels — his support kit doesn\'t help in 1v1.',
            'Self-healing is his only advantage — play patiently.',
            'Avoid picking Doug in Duels when possible.'
        ]
    },
    'Hank': {
        'Gem Grab': [
            'Hank\'s charged breath attack deals massive area damage at close range.',
            'Hold your attack to charge it up — release for devastating burst.',
            'Push enemies off the gem mine with your charged attack threat.'
        ],
        'Brawl Ball': [
            'Charged attack clears multiple defenders at once.',
            'Hank is a powerful Brawl Ball pick — charged breath destroys teams.',
            'Tank forward and release charged attack when enemies are grouped.'
        ],
        'Showdown': [
            'Charge your attack behind bushes and surprise enemies with massive burst.',
            'Hank\'s burst potential is one of the highest — one charged attack kills.',
            'Avoid fighting without a charged attack — Hank is weak uncharged.'
        ],
        'Heist': [
            'Charged attack deals great burst damage to the safe.',
            'Tank toward the safe and release for huge damage.',
            'Hank is decent in Heist with his burst damage potential.'
        ],
        'Bounty': [
            'Charged attack can hit multiple enemies at once for multi-kills.',
            'Hank is risky in Bounty — needs to get close to be effective.',
            'Play near cover and charge attacks before peeking.'
        ],
        'Hot Zone': [
            'Charged attack clears the zone of multiple enemies.',
            'Hank is great in Hot Zone — his area burst clears zones effectively.',
            'Hold the zone and threaten with charged attacks.'
        ],
        'Knockout': [
            'One charged attack can eliminate enemies and swing the round.',
            'Hank is strong in Knockout — burst damage wins fights quickly.',
            'Charge behind cover and release when enemies are in range.'
        ],
        'Duels': [
            'Charge your attack and release for massive 1v1 burst.',
            'Hank wins close-range Duels with charged attack burst.',
            'Avoid enemies who can keep distance while you charge.'
        ]
    },
    'Pearl': {
        'Gem Grab': [
            'Pearl\'s heat mechanic increases her damage as she fires consecutively.',
            'Build up heat and unleash maximum damage on the enemy gem carrier.',
            'Control the gem mine by ramping up damage with sustained fire.'
        ],
        'Brawl Ball': [
            'Ramp up heat before engaging defenders for maximum damage.',
            'Pearl is a strong damage dealer in Brawl Ball — heat up and push.',
            'Super can be used to burst down enemies or clear paths.'
        ],
        'Showdown': [
            'Keep heat high by constantly poking enemies.',
            'Pearl gets stronger the longer she fights — engage and ramp up.',
            'Avoid losing heat by staying in combat when possible.'
        ],
        'Heist': [
            'Sustained fire on the safe builds heat and increases DPS over time.',
            'Pearl\'s DPS ramps up the longer she shoots — excellent for Heist.',
            'Keep firing to maintain heat and deal maximum safe damage.'
        ],
        'Bounty': [
            'Ramp up heat from poke fights and deal increasing damage.',
            'Pearl is solid in Bounty — her damage scales during fights.',
            'Maintain heat between engagements for maximum pressure.'
        ],
        'Hot Zone': [
            'Stand in the zone and ramp up damage against anyone who contests.',
            'Pearl excels in Hot Zone — sustained fighting keeps her heat high.',
            'Hold the zone and out-DPS enemies with ramped-up heat.'
        ],
        'Knockout': [
            'Pre-heat by poking before the main fight for maximum damage.',
            'Pearl rewards sustained fighting — don\'t disengage and lose heat.',
            'High heat Pearl can quickly eliminate enemies in Knockout.'
        ],
        'Duels': [
            'Ramp up heat fast and overwhelm your opponent with increasing DPS.',
            'Pearl is strong in Duels — heat mechanic gives her scaling power.',
            'Avoid disengaging — you lose heat and damage advantage.'
        ]
    },
    'Chuck': {
        'Gem Grab': [
            'Chuck moves along rails for fast repositioning across the map.',
            'Rail movement lets you quickly rotate between lanes.',
            'Control the gem mine by using rails for surprise attacks and escapes.'
        ],
        'Brawl Ball': [
            'Use rails to rush past defenders and score.',
            'Chuck\'s rail mobility makes him a unique Brawl Ball pick.',
            'Place rails strategically for quick offensive pushes.'
        ],
        'Showdown': [
            'Rails let you escape from fights and reposition quickly.',
            'Chuck can cover ground faster than any other brawler using rails.',
            'Use rail mobility to collect power cubes and avoid danger.'
        ],
        'Heist': [
            'Rail directly to the enemy safe for a fast push.',
            'Chuck can bypass defenders by riding rails past them.',
            'Place rails strategically for repeated safe rushes.'
        ],
        'Bounty': [
            'Use rails to reposition and find better angles on enemies.',
            'Chuck is unique in Bounty — rail movement adds unpredictability.',
            'Escape with stars by riding rails to safety.'
        ],
        'Hot Zone': [
            'Rail into the zone quickly and contest before enemies can react.',
            'Rotate between zones faster than any other brawler.',
            'Chuck excels on multi-zone Hot Zone maps with rail mobility.'
        ],
        'Knockout': [
            'Rail into flanking positions to catch enemies off guard.',
            'Quick repositioning helps you avoid danger in Knockout.',
            'Place rails at the start of rounds for maximum mobility options.'
        ],
        'Duels': [
            'Rail movement gives you unique escape and engage options.',
            'Chuck is tricky in Duels — use rails to control spacing.',
            'Place rails and use them to dodge and reposition.'
        ]
    },
    'Charlie': {
        'Gem Grab': [
            'Charlie\'s Super traps an enemy in a cocoon — they can\'t move or attack.',
            'Cocoon the gem carrier to isolate them and steal gems.',
            'Build Super with consistent poke and use it on high-value targets.'
        ],
        'Brawl Ball': [
            'Cocoon the ball carrier to stop them completely.',
            'Charlie is extremely strong in Brawl Ball — her cocoon disrupts everything.',
            'Play at mid range and save Super for game-changing moments.'
        ],
        'Showdown': [
            'Cocoon an enemy during a fight to make it a free kill.',
            'Charlie\'s cocoon is powerful even in Showdown — use it wisely.',
            'Play patiently and wait for the right moment to use Super.'
        ],
        'Heist': [
            'Cocoon key defenders to let your team push the safe freely.',
            'Charlie\'s cocoon removes a defender from the fight entirely.',
            'Focus on disruption — cocoon the most dangerous enemy.'
        ],
        'Bounty': [
            'Cocoon a high-star enemy to isolate and eliminate them.',
            'Charlie is great in Bounty — cocoon disrupts enemy positioning.',
            'Poke to build Super and use cocoon at the perfect moment.'
        ],
        'Hot Zone': [
            'Cocoon enemies in the zone to stop them from contesting.',
            'Charlie\'s cocoon is excellent zone denial.',
            'Build Super and use it to control zone fights.'
        ],
        'Knockout': [
            'Cocoon an enemy to create a numbers advantage instantly.',
            'Charlie is devastating in Knockout — cocoon wins rounds.',
            'Save Super for the enemy\'s strongest brawler.'
        ],
        'Duels': [
            'Cocoon your opponent for a free damage window.',
            'Charlie is strong in Duels — cocoon guarantees hits.',
            'Build Super and use it to control the 1v1 tempo.'
        ]
    },
    'Maisie': {
        'Gem Grab': [
            'Maisie\'s Super dash is a powerful engage or escape tool.',
            'Build up her damage bar for stronger shots over time.',
            'Control the gem mine area with consistent mid-range damage.'
        ],
        'Brawl Ball': [
            'Dash through defenders to create scoring opportunities.',
            'Maisie is a strong Brawl Ball pick — mobile and high damage.',
            'Use dash to reposition after grabbing the ball.'
        ],
        'Showdown': [
            'Dash away from danger or into kills for flexible play.',
            'Maisie\'s scaling damage rewards sustained fighting.',
            'Play at mid range and use dash for mobility.'
        ],
        'Heist': [
            'Dash past defenders to reach the safe.',
            'Maisie\'s consistent damage is good for chipping the safe.',
            'Use dash to engage and retreat from the safe area.'
        ],
        'Bounty': [
            'Maisie is great in Bounty — mid range damage and dash mobility.',
            'Dash away when you have high stars to survive.',
            'Build damage and pick off enemies from mid range.'
        ],
        'Hot Zone': [
            'Dash into the zone and contest with strong damage output.',
            'Maisie holds zones well with mobility and damage.',
            'Use dash to quickly rotate between zones.'
        ],
        'Knockout': [
            'Dash into fights for burst or dash out to survive.',
            'Maisie is versatile in Knockout — good damage and mobility.',
            'Scaling damage rewards you for staying in the fight.'
        ],
        'Duels': [
            'Dash gives you mobility advantage in 1v1 fights.',
            'Maisie is a solid Duels pick with consistent damage.',
            'Use dash to dodge enemy attacks and reposition.'
        ]
    },
    'Melodie': {
        'Gem Grab': [
            'Melodie\'s notes orbit her and deal damage — build them up before engaging.',
            'Dash through enemies with Super for aggressive plays.',
            'With full orbiting notes, Melodie deals massive close-range damage.'
        ],
        'Brawl Ball': [
            'Dash through defenders while orbiting notes shred them.',
            'Melodie is a strong aggro pick — build notes and dive in.',
            'Full orbiting notes make you a walking damage zone.'
        ],
        'Showdown': [
            'Build orbiting notes before engaging fights.',
            'Dash into enemies with full notes for devastating burst.',
            'Melodie excels at close range with orbiting notes active.'
        ],
        'Heist': [
            'Orbiting notes deal damage to the safe while you\'re near it.',
            'Dash past defenders and let notes hit the safe.',
            'Build notes before pushing for maximum safe damage.'
        ],
        'Bounty': [
            'Melodie is risky in Bounty — she needs to get close.',
            'Build notes and commit to dives only when you can secure kills.',
            'Dash is a good escape after getting a kill.'
        ],
        'Hot Zone': [
            'Stand in the zone with orbiting notes — enemies take damage just being near you.',
            'Melodie is excellent in Hot Zone — orbiting notes deny the zone.',
            'Build notes and contest the zone aggressively.'
        ],
        'Knockout': [
            'Full orbiting notes and a dash can eliminate enemies quickly.',
            'Melodie is a high-impact Knockout pick — build and dive.',
            'Save dash for the crucial moment — don\'t waste it early.'
        ],
        'Duels': [
            'Build orbiting notes and overwhelm opponents at close range.',
            'Dash gives you engage and escape options in 1v1.',
            'Melodie wins close-range Duels when notes are fully built.'
        ]
    },
    'Lily': {
        'Gem Grab': [
            'Lily can dash to enemies and deal burst damage — excellent assassin.',
            'Target the gem carrier with your dash for maximum impact.',
            'Play in bushes and wait for the right moment to dash and eliminate.'
        ],
        'Brawl Ball': [
            'Dash onto ball carriers to steal possession.',
            'Lily is a strong Brawl Ball assassin — burst down defenders.',
            'Use your dash aggressively to create scoring opportunities.'
        ],
        'Showdown': [
            'Dash onto enemies from bushes for surprise kills.',
            'Lily excels at assassination — pick off weakened enemies.',
            'Avoid direct fights without your dash available.'
        ],
        'Heist': [
            'Dash onto defenders and eliminate them to open a path to the safe.',
            'Lily focuses on killing defenders rather than damaging the safe.',
            'Assassinate key targets during your team\'s push.'
        ],
        'Bounty': [
            'Dash onto enemies with high star bounties for maximum value.',
            'Lily is great at picking off targets in Bounty.',
            'Play patiently and wait for the perfect assassination opportunity.'
        ],
        'Hot Zone': [
            'Dash onto enemies in the zone to clear it.',
            'Lily can quickly eliminate zone holders with her burst.',
            'Play near the zone and look for dash opportunities.'
        ],
        'Knockout': [
            'Dash and eliminate an enemy early to create a numbers advantage.',
            'Lily is a high-impact Knockout assassin.',
            'Wait for the right moment — a failed dash leaves you vulnerable.'
        ],
        'Duels': [
            'Dash gives you burst engage potential in 1v1.',
            'Lily excels in Duels against squishy targets.',
            'Avoid tanky brawlers who can survive your burst.'
        ]
    },
    'Angelo': {
        'Gem Grab': [
            'Angelo can hover in the air — use this to fly over walls and scout.',
            'Poison enemies with your attacks for consistent chip damage.',
            'Control the gem mine area from above with your hover ability.'
        ],
        'Brawl Ball': [
            'Hover over walls to find unique scoring angles.',
            'Poison attacks chip defenders down before your team pushes.',
            'Angelo\'s flight gives him unique positioning in Brawl Ball.'
        ],
        'Showdown': [
            'Hover to escape danger and fly over obstacles.',
            'Poison chips enemies down — let the damage do the work.',
            'Angelo is a safe Showdown pick with his escape mobility.'
        ],
        'Heist': [
            'Fly over walls to reach the safe from unexpected angles.',
            'Poison chips the safe consistently.',
            'Angelo can bypass defenses entirely with his hover.'
        ],
        'Bounty': [
            'Angelo is strong in Bounty — poison and flight keep you safe.',
            'Poke from range and fly away when threatened.',
            'Poison damage adds up over time for consistent star advantage.'
        ],
        'Hot Zone': [
            'Hover over the zone and poison enemies below.',
            'Angelo\'s flight lets him contest zones from above.',
            'Poison enemies in the zone for area denial.'
        ],
        'Knockout': [
            'Poison enemies and fly to safety — chip them down over time.',
            'Angelo is a patient Knockout pick — poison and survive.',
            'Use hover to avoid enemy attacks and reposition.'
        ],
        'Duels': [
            'Poison and fly — chip down opponents over time.',
            'Angelo is decent in Duels with his sustain damage and mobility.',
            'Avoid burst-heavy brawlers who can kill you during landing.'
        ]
    },
    'Draco': {
        'Gem Grab': [
            'Draco\'s dragon fire deals massive area damage.',
            'Use Super to transform into a powerful dragon form with boosted attacks.',
            'Control the gem mine with dragon fire area denial.'
        ],
        'Brawl Ball': [
            'Dragon form Super gives Draco boosted power for pushing the goal.',
            'Area fire clears defenders — great for opening scoring paths.',
            'Draco is a strong Brawl Ball pick with his transformation power.'
        ],
        'Showdown': [
            'Dragon form in Showdown makes you a massive threat.',
            'Area fire melts enemies who try to get close.',
            'Save Super for fights — dragon form is your power spike.'
        ],
        'Heist': [
            'Dragon fire deals great area damage to the safe.',
            'Transform and push the safe for huge burst damage.',
            'Draco\'s Super makes him a heist carry during pushes.'
        ],
        'Bounty': [
            'Area fire can hit multiple enemies for multi-kill potential.',
            'Dragon form gives you the power to dominate fights.',
            'Draco is decent in Bounty — save transform for key moments.'
        ],
        'Hot Zone': [
            'Dragon fire clears zones with devastating area damage.',
            'Transform in the zone to become nearly impossible to contest.',
            'Draco dominates Hot Zone with area damage and tankiness.'
        ],
        'Knockout': [
            'Transform at the right moment to overpower enemies.',
            'Area fire can hit multiple enemies during team fights.',
            'Draco is a high-impact Knockout pick — one transform wins rounds.'
        ],
        'Duels': [
            'Transform and overwhelm your opponent with boosted power.',
            'Dragon form gives you a massive advantage in 1v1.',
            'Save Super for the right moment — don\'t waste it.'
        ]
    },
    'Kenji': {
        'Gem Grab': [
            'Kenji\'s dash attack slashes through enemies — chain dashes for multi-kills.',
            'Deflect projectiles with your sword — incredible defensive ability.',
            'Control the gem mine with aggressive dashes and projectile deflection.'
        ],
        'Brawl Ball': [
            'Dash through defenders and deflect their shots.',
            'Kenji is incredible in Brawl Ball — dash and deflect dominate.',
            'Use dash to engage and deflect to survive counterattacks.'
        ],
        'Showdown': [
            'Dash onto enemies and deflect their attacks for easy kills.',
            'Kenji is a top-tier Showdown pick with dash and deflect.',
            'Play aggressively — your kit is designed for fighting.'
        ],
        'Heist': [
            'Dash past defenders and attack the safe directly.',
            'Deflect defender shots while your team damages the safe.',
            'Kenji can bypass defense and deal burst damage to safes.'
        ],
        'Bounty': [
            'Dash onto squishy enemies for quick kills.',
            'Deflect shots from snipers — turn their damage against them.',
            'Kenji is risky but rewarding in Bounty — commit to smart dashes.'
        ],
        'Hot Zone': [
            'Dash into the zone and deflect enemy attacks to hold it.',
            'Kenji is strong in Hot Zone — aggressive play with defensive tools.',
            'Control zones with dashes and deflection.'
        ],
        'Knockout': [
            'One dash can eliminate an enemy and win the round.',
            'Deflect enemy attacks during critical fights.',
            'Kenji is devastating in Knockout with his burst potential.'
        ],
        'Duels': [
            'Dash and deflect make Kenji one of the best Duels brawlers.',
            'Deflect enemy attacks to turn their damage against them.',
            'Time your dashes to guarantee hits in 1v1.'
        ]
    },
    'Juju': {
        'Gem Grab': [
            'Juju curses enemies — cursed enemies take increased damage.',
            'Apply curse to the gem carrier so your team can burst them down.',
            'Control the gem mine by cursing enemies and making them vulnerable.'
        ],
        'Brawl Ball': [
            'Curse defenders before your team pushes — they take more damage.',
            'Juju is a strong support in Brawl Ball — curses enable team pushes.',
            'Focus on cursing key targets rather than dealing damage yourself.'
        ],
        'Showdown': [
            'Curse enemies before engaging for a damage advantage.',
            'Juju is good in Showdown — curse gives you the edge in fights.',
            'Play at mid range and curse before committing to fights.'
        ],
        'Heist': [
            'Curse defenders to help your team eliminate them faster.',
            'Juju is a utility pick in Heist — curses enable your team.',
            'Support your DPS teammates with consistent curse application.'
        ],
        'Bounty': [
            'Curse high-value targets for your team to pick off.',
            'Juju is useful in Bounty — curses make eliminations easier.',
            'Play supportive and focus on debuffing enemies.'
        ],
        'Hot Zone': [
            'Curse enemies in the zone to make them easier to eliminate.',
            'Juju\'s curse weakens zone holders for your team.',
            'Control zone fights by keeping enemies cursed.'
        ],
        'Knockout': [
            'Curse the priority target for your team to focus down.',
            'Juju is strong in Knockout — cursed enemies die much faster.',
            'Apply curse early in each round for maximum impact.'
        ],
        'Duels': [
            'Curse your opponent for a damage advantage throughout the fight.',
            'Juju is solid in Duels — curse gives consistent bonus damage.',
            'Apply curse early and play aggressively while it\'s active.'
        ]
    },
    'Moe': {
        'Gem Grab': [
            'Moe\'s drill attack can travel underground and hit enemies from unexpected angles.',
            'Zone off the gem mine with drill attacks that control the ground.',
            'Play at mid range and use drills to deny enemy positioning.'
        ],
        'Brawl Ball': [
            'Drill attacks can hit ball carriers from unexpected angles.',
            'Moe\'s area control is strong for defending the goal.',
            'Use drills to zone off chokepoints near the goal.'
        ],
        'Showdown': [
            'Drill attacks travel along the ground — use terrain to your advantage.',
            'Moe is decent in Showdown with his unique attack pattern.',
            'Control areas with drills and force enemies to move predictably.'
        ],
        'Heist': [
            'Drill attacks can chip the safe from safe positions.',
            'Zone off the safe area with drills to slow enemy pushes.',
            'Moe provides consistent chip damage and area denial in Heist.'
        ],
        'Bounty': [
            'Drills control the map and force enemies into unfavorable positions.',
            'Moe is decent in Bounty — area denial keeps enemies moving.',
            'Use drills to cut off escape routes.'
        ],
        'Hot Zone': [
            'Drill attacks are perfect for Hot Zone — deny the zone from range.',
            'Moe excels at controlling who can stand in the zone.',
            'Place drills in the zone to force enemies to reposition.'
        ],
        'Knockout': [
            'Area control from drills can decide fights in Knockout.',
            'Force enemies out of cover with ground-traveling attacks.',
            'Moe is solid in Knockout — control the pace with drills.'
        ],
        'Duels': [
            'Drills limit enemy movement options in 1v1 maps.',
            'Moe can control spacing effectively with ground attacks.',
            'Predict enemy movement and place drills accordingly.'
        ]
    },
    'Berry': {
        'Gem Grab': [
            'Berry\'s Super slows and damages enemies in an area — great for gem mine control.',
            'Support your team by slowing enemies who try to contest gems.',
            'Play mid range and use area denial to control the center.'
        ],
        'Brawl Ball': [
            'Slow enemies near the goal to prevent them from scoring.',
            'Berry\'s area slow disrupts enemy ball carrying.',
            'Support your team\'s push with consistent area control.'
        ],
        'Showdown': [
            'Area slow can trap enemies and make them easy targets.',
            'Berry is a solid Showdown pick with area control.',
            'Use slow abilities to control fights and limit enemy movement.'
        ],
        'Heist': [
            'Slow defenders near the safe to help your team push.',
            'Berry\'s area denial helps control the safe area.',
            'Support your team with slows and consistent chip damage.'
        ],
        'Bounty': [
            'Slow enemies to set up easy picks for your team.',
            'Berry is useful in Bounty — slows make enemies predictable.',
            'Control the map center with area slowing abilities.'
        ],
        'Hot Zone': [
            'Slow enemies in the zone to make them easy targets.',
            'Berry excels in Hot Zone — area denial controls who holds the zone.',
            'Use slows on the zone to prevent enemy contestation.'
        ],
        'Knockout': [
            'Slow key enemies to help your team focus them down.',
            'Berry\'s area control is valuable in Knockout team fights.',
            'Play support and focus on slowing rather than killing.'
        ],
        'Duels': [
            'Slow your opponent to control spacing in 1v1.',
            'Berry is decent in Duels with area denial.',
            'Use slows to limit enemy dodging ability.'
        ]
    },
    'Shade': {
        'Gem Grab': [
            'Shade can turn invisible and reposition — perfect for surprise attacks.',
            'Ambush the gem carrier while invisible for devastating plays.',
            'Use invisibility to scout and gather information for your team.'
        ],
        'Brawl Ball': [
            'Go invisible and steal the ball from unsuspecting carriers.',
            'Shade is tricky in Brawl Ball — invisibility creates chaos.',
            'Ambush defenders while they\'re focused on your teammates.'
        ],
        'Showdown': [
            'Invisibility lets you ambush enemies from unexpected positions.',
            'Shade excels at picking off unsuspecting enemies in Showdown.',
            'Use stealth to avoid fights you can\'t win.'
        ],
        'Heist': [
            'Go invisible and bypass defenders to attack the safe.',
            'Shade can sneak past the entire defense with invisibility.',
            'Focus on eliminating defenders through surprise attacks.'
        ],
        'Bounty': [
            'Invisible ambushes on high-star enemies are devastating.',
            'Shade is solid in Bounty — stealth enables safe picks.',
            'Use invisibility to escape when you have high stars.'
        ],
        'Hot Zone': [
            'Go invisible and contest the zone before enemies notice.',
            'Shade can sneak into zones and ambush holders.',
            'Use stealth to rotate between zones undetected.'
        ],
        'Knockout': [
            'Invisible flank can eliminate an enemy before the fight starts.',
            'Shade is strong in Knockout — stealth creates information advantage.',
            'Ambush the most dangerous enemy on the opposing team.'
        ],
        'Duels': [
            'Invisibility gives you the first-strike advantage in 1v1.',
            'Shade is excellent in Duels — stealth controls the fight tempo.',
            'Ambush your opponent and deal burst before they can react.'
        ]
    },
    'Ollie': {
        'Gem Grab': [
            'Ollie\'s Super places a turret that controls an area.',
            'Use turret to lock down the gem mine and deny enemy access.',
            'Play around your turret — it\'s your main source of zone control.'
        ],
        'Brawl Ball': [
            'Place turret near the goal for strong area defense.',
            'Ollie\'s turret forces enemies to deal with it before scoring.',
            'Control chokepoints with well-placed turrets.'
        ],
        'Showdown': [
            'Turret gives you an advantage in holding a territory.',
            'Ollie is decent in Showdown with turret-based area control.',
            'Place turret and fight near it for maximum value.'
        ],
        'Heist': [
            'Turret on defense shreds attackers trying to reach your safe.',
            'Place turret where it can chip the enemy safe from safety.',
            'Ollie provides consistent area denial in Heist.'
        ],
        'Bounty': [
            'Turret controls key areas and provides extra damage output.',
            'Ollie is useful in Bounty — turret adds passive pressure.',
            'Place turret in central locations for maximum value.'
        ],
        'Hot Zone': [
            'Place turret in the zone — enemies must destroy it to take control.',
            'Ollie is excellent in Hot Zone — turret contests the zone for you.',
            'Fight near your turret for combined damage.'
        ],
        'Knockout': [
            'Turret adds extra pressure in Knockout team fights.',
            'Place turret early to establish area control.',
            'Ollie\'s turret can swing fights by providing sustained extra damage.'
        ],
        'Duels': [
            'Turret gives you a significant DPS advantage in 1v1.',
            'Place turret and fight near it — the combined damage is hard to beat.',
            'Ollie is strong in Duels with turret support.'
        ]
    },
    'Meeple': {
        'Gem Grab': [
            'Meeple\'s attacks have unique bounce mechanics — use walls to your advantage.',
            'Control the gem mine with bouncing projectiles that cover multiple angles.',
            'Play around walls to maximize your bouncing attack effectiveness.'
        ],
        'Brawl Ball': [
            'Bouncing attacks hit enemies around corners and behind cover.',
            'Meeple is tricky in Brawl Ball — use walls for creative angles.',
            'Control tight spaces with bouncing projectiles.'
        ],
        'Showdown': [
            'Bouncing attacks are great on wall-heavy maps.',
            'Meeple excels in Showdown when there are lots of walls to bounce off.',
            'Use bouncing mechanics to hit enemies hiding behind cover.'
        ],
        'Heist': [
            'Bouncing attacks can reach the safe from around corners.',
            'Meeple is decent in Heist — bouncing projectiles find unexpected paths.',
            'Use walls creatively to hit the safe from safety.'
        ],
        'Bounty': [
            'Bouncing attacks catch enemies who think they\'re safe behind cover.',
            'Meeple is good in Bounty on wall-heavy maps.',
            'Use walls to hit enemies from unexpected angles.'
        ],
        'Hot Zone': [
            'Bounce projectiles into the zone from behind cover.',
            'Meeple can control zones without exposing himself directly.',
            'Use wall bounces to hit enemies standing in the zone.'
        ],
        'Knockout': [
            'Bouncing attacks are perfect for cover-heavy Knockout maps.',
            'Hit enemies behind walls with well-aimed bouncing shots.',
            'Meeple rewards creative players who use map geometry.'
        ],
        'Duels': [
            'Bounce attacks off walls for hits enemies don\'t expect.',
            'Meeple is decent in Duels — wall bounces give unique angles.',
            'Play on wall-heavy maps for maximum effectiveness.'
        ]
    },
    'Clancy': {
        'Gem Grab': [
            'Clancy\'s attacks change based on his ammo count — manage it carefully.',
            'Different ammo levels give different attack patterns — learn all three.',
            'Control the gem mine by using the right ammo pattern for each situation.'
        ],
        'Brawl Ball': [
            'Manage ammo patterns to match offensive and defensive needs.',
            'Clancy is versatile in Brawl Ball — adapt your attack pattern to the situation.',
            'Use full ammo burst for maximum damage when pushing.'
        ],
        'Showdown': [
            'Ammo management is key — different levels give different advantages.',
            'Clancy rewards skilled players who manage their attack patterns.',
            'Play at mid range and use the right ammo pattern for each fight.'
        ],
        'Heist': [
            'Use full ammo burst for maximum safe damage.',
            'Clancy can deal good damage when ammo patterns align.',
            'Manage your ammo carefully for consistent safe DPS.'
        ],
        'Bounty': [
            'Different ammo patterns suit different Bounty situations.',
            'Clancy is decent in Bounty — adapt your pattern to the fight.',
            'Learn which ammo level is best for poking vs. bursting.'
        ],
        'Hot Zone': [
            'Use area-covering ammo patterns to control the zone.',
            'Clancy\'s versatile attacks are useful for Hot Zone control.',
            'Adapt ammo patterns based on whether you\'re attacking or defending the zone.'
        ],
        'Knockout': [
            'Manage ammo to have the right pattern for each fight.',
            'Clancy rewards preparation — enter fights with the right ammo state.',
            'Burst patterns can quickly eliminate enemies in Knockout.'
        ],
        'Duels': [
            'Ammo management decides fights — enter with the right pattern.',
            'Clancy is solid in Duels for skilled players.',
            'Learn which ammo level gives you the best 1v1 burst.'
        ]
    },
    'Larry & Lawrie': {
        'Gem Grab': [
            'Larry & Lawrie are two brawlers in one — control two positions simultaneously.',
            'Split up to cover more ground and converge for team fights.',
            'One can collect gems while the other fights — great flexibility.'
        ],
        'Brawl Ball': [
            'Two bodies on the field create numerical advantages.',
            'One can carry the ball while the other fights defenders.',
            'Larry & Lawrie are strong in Brawl Ball with their dual presence.'
        ],
        'Showdown': [
            'Two characters mean double the presence in Showdown.',
            'Larry & Lawrie can collect power cubes faster with two bodies.',
            'Coordinate both characters for overwhelming fights.'
        ],
        'Heist': [
            'One attacks the safe while the other distracts defenders.',
            'Larry & Lawrie provide excellent multi-tasking in Heist.',
            'Split up to create confusion and pressure from multiple angles.'
        ],
        'Bounty': [
            'Two bodies make it harder for enemies to track and shoot.',
            'Split up to control different areas of the Bounty map.',
            'Converge on enemies for coordinated eliminations.'
        ],
        'Hot Zone': [
            'Two characters can contest two zones simultaneously.',
            'Larry & Lawrie are excellent on multi-zone Hot Zone maps.',
            'Split up for zone control, converge for team fights.'
        ],
        'Knockout': [
            'Two bodies create a natural numbers advantage.',
            'Enemies have to decide which one to focus — use this confusion.',
            'Coordinate both characters for maximum impact in Knockout.'
        ],
        'Duels': [
            'Two characters in a 1v1 gives you an inherent advantage.',
            'Larry & Lawrie are strong in Duels — overwhelming with two bodies.',
            'Use both characters to attack from different angles.'
        ]
    },
    'Lola': {
        'Gem Grab': [
            'Lola\'s Super creates a clone that mimics her attacks — double the firepower.',
            'Place your clone at the gem mine for area denial.',
            'Clone doubles your damage output — position it to cover key areas.'
        ],
        'Brawl Ball': [
            'Clone provides extra firepower to clear defenders.',
            'Place clone near the goal for double-damage defense.',
            'Lola is strong in Brawl Ball — clone adds massive DPS.'
        ],
        'Showdown': [
            'Clone gives you a permanent damage boost — always place it.',
            'Position clone to cover angles while you fight.',
            'Lola is a strong Showdown pick — clone gives consistent advantage.'
        ],
        'Heist': [
            'Place clone near the safe for double damage output.',
            'Clone can chip the safe while you fight off defenders.',
            'Lola\'s clone provides incredible sustained safe DPS.'
        ],
        'Bounty': [
            'Clone doubles your ranged damage — devastating in Bounty.',
            'Position clone at long range for maximum poke damage.',
            'Lola is a great Bounty pick — clone adds consistent pressure.'
        ],
        'Hot Zone': [
            'Place clone in the zone — it counts as area denial.',
            'Double damage from clone makes zone control much easier.',
            'Lola excels in Hot Zone with clone-boosted damage.'
        ],
        'Knockout': [
            'Clone provides extra damage that can swing fights.',
            'Place clone strategically to cover multiple angles.',
            'Lola is strong in Knockout — clone advantage wins trades.'
        ],
        'Duels': [
            'Clone effectively makes it a 2v1 — massive advantage.',
            'Position clone to maximize overlapping damage in 1v1.',
            'Lola is one of the best Duels brawlers thanks to her clone.'
        ]
    },
    'Meg': {
        'Gem Grab': [
            'Meg transforms into a powerful mech suit with her Super — save it for key moments.',
            'In mech form, Meg has massively boosted HP and damage.',
            'Build Super quickly and transform for mid-game dominance.'
        ],
        'Brawl Ball': [
            'Mech form turns Meg into an unstoppable tank — push the goal.',
            'Transform and rush through defenders with boosted power.',
            'Meg is amazing in Brawl Ball once she gets her mech.'
        ],
        'Showdown': [
            'Mech form makes Meg one of the strongest brawlers on the field.',
            'Build Super early and transform to dominate late game.',
            'Without mech, Meg is very fragile — play cautiously until you transform.'
        ],
        'Heist': [
            'Mech form deals massive damage to the safe.',
            'Transform and tank your way to the safe for huge burst.',
            'Meg is strong in Heist once she transforms — focus on building Super.'
        ],
        'Bounty': [
            'Mech form makes you a dominant threat in Bounty.',
            'Build Super safely and transform to control the game.',
            'Without mech, Meg is too fragile for Bounty — be careful early.'
        ],
        'Hot Zone': [
            'Mech form holds zones incredibly well with boosted stats.',
            'Transform and stand in the zone — you become very hard to remove.',
            'Meg is excellent in Hot Zone once she has her mech.'
        ],
        'Knockout': [
            'Mech transformation can single-handedly win Knockout rounds.',
            'Build Super in the early exchange and transform for the decisive fight.',
            'Meg without mech is a liability — protect her until she transforms.'
        ],
        'Duels': [
            'Mech form gives you a massive stat advantage in 1v1.',
            'Build Super and transform — mech Meg is nearly unbeatable.',
            'Without mech, play defensively and focus on charging Super.'
        ]
    },
    'Kit': {
        'Gem Grab': [
            'Kit can attach to teammates and heal them while riding — unique support.',
            'Attach to your gem carrier to keep them alive and boost their survival.',
            'Kit\'s healing presence makes any teammate significantly harder to kill.'
        ],
        'Brawl Ball': [
            'Attach to your ball carrier to make them nearly unkillable.',
            'Kit is one of the best supports in Brawl Ball — ride and heal.',
            'Detach to fight independently when needed, then reattach.'
        ],
        'Showdown': [
            'In Duo Showdown, attach to your partner for incredible sustain.',
            'Kit is weak solo in Showdown — better suited for team modes.',
            'If solo, play cautiously and avoid direct confrontations.'
        ],
        'Heist': [
            'Attach to your DPS teammate as they push the safe — heal and boost them.',
            'Kit enables aggressive pushes by keeping teammates alive.',
            'Ride your tank to the safe and provide healing sustain.'
        ],
        'Bounty': [
            'Attach to teammates with high stars to keep them alive.',
            'Kit is a great Bounty support — preventing deaths saves stars.',
            'Heal key teammates during fights for sustained advantage.'
        ],
        'Hot Zone': [
            'Attach to a zone holder to make them extremely hard to remove.',
            'Kit is excellent in Hot Zone — healing teammates in the zone is huge.',
            'Support your frontline by providing constant healing.'
        ],
        'Knockout': [
            'Attach to your strongest teammate and keep them alive.',
            'Kit\'s healing can turn close fights in your favor.',
            'Play as a pure support — your job is to keep teammates healthy.'
        ],
        'Duels': [
            'Kit has no teammate to attach to in Duels — much weaker.',
            'Play independently and rely on your own attacks.',
            'Kit is not recommended for Duels — save him for team modes.'
        ]
    },
    'Mico': {
        'Gem Grab': [
            'Mico dashes to enemies with his Super and deals burst damage.',
            'Dive onto the gem carrier for devastating assassination plays.',
            'Play aggressively — Mico is an assassin who thrives on action.'
        ],
        'Brawl Ball': [
            'Dash onto ball carriers to steal possession.',
            'Mico is a strong Brawl Ball assassin — burst and mobility.',
            'Use Super dash to engage and eliminate key defenders.'
        ],
        'Showdown': [
            'Dash onto weakened enemies for easy eliminations.',
            'Mico is a good Showdown assassin — ambush and finish.',
            'Avoid fights without Super — your kill pressure drops significantly.'
        ],
        'Heist': [
            'Dash past defenders and attack the safe.',
            'Mico can bypass defenses with his mobility.',
            'Focus on eliminating defenders through aggressive dashes.'
        ],
        'Bounty': [
            'Dash onto high-star enemies for maximum value kills.',
            'Mico is risky in Bounty — commit only to guaranteed kills.',
            'Build Super and look for assassination opportunities.'
        ],
        'Hot Zone': [
            'Dash into the zone and burst down enemies contesting it.',
            'Mico can quickly clear zones with his burst damage.',
            'Play around the zone edges and dash in when ready.'
        ],
        'Knockout': [
            'One dash elimination can win the entire Knockout round.',
            'Mico is a high-risk, high-reward Knockout pick.',
            'Wait for the right target — a failed dash can cost you everything.'
        ],
        'Duels': [
            'Dash and burst — Mico excels at aggressive 1v1 play.',
            'Build Super and use it for guaranteed damage in Duels.',
            'Avoid tanky enemies who survive your burst.'
        ]
    },
    'Najia': {
        'Gem Grab': [
            'Najia\'s snake attacks can pierce and hit multiple enemies.',
            'Control the gem mine area with piercing attacks through enemy formations.',
            'Najia is a strong mid-lane brawler — pierce through grouped enemies.'
        ],
        'Brawl Ball': [
            'Pierce through defenders grouped near the goal.',
            'Najia\'s attacks cut through multiple enemies — great for clearing.',
            'Play at mid range and pierce through enemy lines.'
        ],
        'Showdown': [
            'Piercing attacks hit enemies hiding behind each other.',
            'Najia is solid in Showdown — pierce damage adds up quickly.',
            'Play at mid range and use piercing to maximize damage.'
        ],
        'Heist': [
            'Pierce through defenders to chip the safe behind them.',
            'Najia can hit both defenders and the safe in the same attack.',
            'Piercing attacks provide good sustained damage in Heist.'
        ],
        'Bounty': [
            'Pierce through enemies for multi-hit damage on groups.',
            'Najia is decent in Bounty — piercing gives her solid poke.',
            'Control sight lines with attacks that go through multiple targets.'
        ],
        'Hot Zone': [
            'Pierce through enemies clustered in the zone.',
            'Najia is effective in Hot Zone — piercing hits multiple zone holders.',
            'Control the zone by threatening everyone standing in it.'
        ],
        'Knockout': [
            'Piercing attacks damage multiple enemies during team fights.',
            'Najia can weaken the entire enemy team with well-aimed piercing shots.',
            'Play at mid range and pierce through enemy formations.'
        ],
        'Duels': [
            'Piercing is less valuable in 1v1 — only one target to hit.',
            'Najia is average in Duels — her strength is in team modes.',
            'Play at mid range and aim carefully for consistent damage.'
        ]
    }
};

// ===== FALLBACK TIPS =====
// Generic tips per game mode (shown when brawler has no specific tips)
const FALLBACK_MODE_TIPS = {
    'Gem Grab': [
        'Collect gems but don\'t take unnecessary risks — dying with gems costs your team.',
        'Control the center of the map — that\'s where gems spawn.',
        'Fall back when your team has 10 gems and run down the timer.',
        'Focus on maintaining control, not chasing kills.'
    ],
    'Brawl Ball': [
        'Pass the ball to teammates if you\'re under pressure.',
        'Break walls to open up shot lines toward the goal.',
        'A good defender is just as important as a good attacker.',
        'Use your Super at the right moment to clear a path to the goal.'
    ],
    'Showdown': [
        'Collect power cubes early — they make a huge difference.',
        'Avoid unnecessary fights — let others battle it out and pick off the survivors.',
        'The poison gas forces you inward — be ready to fight.',
        'Bushes are your best friend — use them to catch enemies off guard.'
    ],
    'Heist': [
        'Focus on the safe — kills are secondary.',
        'A coordinated push with your whole team does the most damage.',
        'Defend your own safe — balance offense and defense.',
        'Break walls to get a direct line of sight on the enemy safe.'
    ],
    'Bounty': [
        'Don\'t die with a lot of stars — play it safe when you\'re in the lead.',
        'Focus on the enemy carrying the most stars.',
        'Control the center of the map for the best positioning.',
        'Teamwork and focus-fire are the keys to winning Bounty.'
    ],
    'Hot Zone': [
        'Stand in the zone — that\'s the whole point.',
        'Control the zone through area denial and positioning.',
        'A brawler in the zone is worth more than a kill outside of it.',
        'Rotate between zones if there are multiple.'
    ],
    'Knockout': [
        'Don\'t be the first to die — every player counts.',
        'Having a numbers advantage (3v2) usually wins the round.',
        'Stick with your team — don\'t go in alone.',
        'Every round is a fresh start — don\'t give up after a loss.'
    ],
    'Duels': [
        'Pick your brawlers based on what your opponent is playing.',
        'Save your best brawler for last if possible.',
        'Learn matchups — who beats who in a 1v1?',
        'Control spacing based on your brawler\'s strengths.'
    ]
};

// Fallback tips per brawler class
const FALLBACK_CLASS_TIPS = {
    'Tank': [
        'As a tank, stay on the front line and protect your team.',
        'Use bushes and walls to get close to enemies.',
        'Tanks dominate close range — avoid open areas.'
    ],
    'Damage Dealer': [
        'Keep the right distance — too close or too far reduces your effectiveness.',
        'Focus your damage on one enemy at a time.',
        'Play behind your tank and deal damage safely.'
    ],
    'Assassin': [
        'Wait for the right moment to strike — don\'t go in too early.',
        'Assassins kill weak enemies quickly — choose your targets.',
        'Escape after a kill — don\'t stay and fight the entire team.'
    ],
    'Marksman': [
        'Keep your distance — your strength is long range.',
        'Positioning is everything — stand where you can shoot safely.',
        'Aim where the enemy will move, not where they are.'
    ],
    'Artillery': [
        'Throw/shoot behind walls — you don\'t need direct line of sight.',
        'Area denial is your strength — control areas with your shots.',
        'Keep moving at all times — never stand still as an artillerist.'
    ],
    'Controller': [
        'Control areas and chokepoints with your abilities.',
        'Your role is to make it hard for enemies to move freely.',
        'Support your team by creating space and control.'
    ],
    'Support': [
        'Keep your team alive — healing/buffs are your most important job.',
        'Stay near the team — a lone support is a dead support.',
        'Prioritize healing whoever is contributing the most to the team.'
    ]
};


// ===== GUIDE LOGIC =====

async function loadGuide() {
    if (guideLoaded) return;

    const brawlerSelect = document.getElementById('guide-brawler-select');
    if (!brawlerSelect) return;

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        guideBrawlers = data.list || data;

        // Populate brawler dropdown
        brawlerSelect.innerHTML = '<option value="">-- Select brawler --</option>';
        guideBrawlers
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.name;
                opt.textContent = b.name;
                brawlerSelect.appendChild(opt);
            });

        guideLoaded = true;
    } catch (err) {
        console.error('Failed to load brawlers for guide:', err);
        brawlerSelect.innerHTML = '<option value="">Could not load brawlers</option>';
    }
}

function showGuide() {
    const brawlerName = document.getElementById('guide-brawler-select').value;
    const modeName = document.getElementById('guide-mode-select').value;
    const resultDiv = document.getElementById('guide-result');

    if (!brawlerName || !modeName) {
        resultDiv.innerHTML = '<p class="guide-hint">Select both a brawler and a game mode!</p>';
        resultDiv.classList.remove('hidden');
        return;
    }

    // Find brawler data for image
    const brawler = guideBrawlers.find(b => b.name === brawlerName);
    const brawlerImg = brawler ? (brawler.imageUrl || brawler.imageUrl2 || '') : '';
    const brawlerClass = brawler ? getBrawlerClassForGuide(brawler) : '';

    // Get tips
    const specificTips = BRAWL_GUIDES[brawlerName]?.[modeName] || null;
    const modeFallback = FALLBACK_MODE_TIPS[modeName] || [];
    const classFallback = FALLBACK_CLASS_TIPS[brawlerClass] || [];

    let html = `
        <div class="guide-header">
            ${brawlerImg ? `<img src="${brawlerImg}" alt="${brawlerName}" class="guide-brawler-img">` : ''}
            <div class="guide-header-info">
                <h3>${brawlerName}</h3>
                <span class="guide-mode-badge">${modeName}</span>
                ${brawlerClass ? `<span class="guide-class-badge">${brawlerClass}</span>` : ''}
            </div>
        </div>
    `;

    if (specificTips) {
        html += `
            <div class="guide-tips-section">
                <h4>Tips for ${brawlerName} in ${modeName}</h4>
                <ul class="guide-tips-list">
                    ${specificTips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        html += `
            <div class="guide-tips-section guide-fallback">
                <h4>General tips for ${modeName}</h4>
                <p class="guide-fallback-note">We don't have specific tips for ${brawlerName} in ${modeName} yet, but here are some general tips!</p>
                <ul class="guide-tips-list">
                    ${modeFallback.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Always show general game mode tips if specific tips exist
    if (specificTips && modeFallback.length > 0) {
        html += `
            <div class="guide-tips-section guide-extra">
                <h4>General ${modeName} tips</h4>
                <ul class="guide-tips-list">
                    ${modeFallback.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Class tips
    if (classFallback.length > 0) {
        html += `
            <div class="guide-tips-section guide-extra">
                <h4>Tips for the ${brawlerClass} class</h4>
                <ul class="guide-tips-list">
                    ${classFallback.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
}

// Get brawler class (same logic as brawlers.js)
function getBrawlerClassForGuide(brawler) {
    const apiClass = brawler.class?.name;
    if (apiClass && apiClass !== 'Unknown') return apiClass;
    // Manual mapping (duplicated from brawlers.js to avoid dependency)
    const classMap = {
        'Najia': 'Assassin', 'Clancy': 'Damage Dealer', 'Berry': 'Support',
        'Shade': 'Assassin', 'Moe': 'Artillery', 'Draco': 'Tank',
        'Kenji': 'Assassin', 'Juju': 'Controller', 'Meeple': 'Damage Dealer',
        'Ollie': 'Controller', 'Lily': 'Assassin', 'Chuck': 'Damage Dealer',
        'Charlie': 'Controller', 'Melodie': 'Assassin', 'Angelo': 'Marksman',
        'Larry & Lawrie': 'Damage Dealer',
        'Bea': 'Marksman', 'Bonnie': 'Marksman', 'Buster': 'Tank', 'Chester': 'Controller',
        'Doug': 'Support', 'Eve': 'Artillery', 'Fang': 'Assassin', 'Gray': 'Support',
        'Griff': 'Damage Dealer', 'Grom': 'Artillery', 'Gus': 'Support', 'Hank': 'Tank',
        'Janet': 'Marksman', 'Kit': 'Support', 'Lola': 'Damage Dealer', 'Maisie': 'Marksman',
        'Mandy': 'Marksman', 'Meg': 'Damage Dealer', 'Mico': 'Assassin', 'Nani': 'Marksman',
        'Otis': 'Controller', 'Pearl': 'Marksman', 'R-T': 'Damage Dealer', 'Ruffs': 'Support',
        'Sam': 'Tank', 'Squeak': 'Controller', 'Willow': 'Controller',
    };
    return classMap[brawler.name] || 'Damage Dealer';
}
