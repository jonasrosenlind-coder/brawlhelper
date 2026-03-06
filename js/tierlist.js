// ===== TIERLIST.JS — Meta Tier List / Rankings per Game Mode =====

let tierListLoaded = false;
let tierBrawlers = [];

const TIER_DATA = {
    'Overall': {
        S: ['Melodie', 'Kenji', 'Lily', 'Draco', 'Berry', 'Moe', 'Angelo', 'Cordelius', 'Kit'],
        A: ['Leon', 'Sandy', 'Crow', 'Surge', 'Buzz', 'Fang', 'Stu', 'Shade', 'Mico', 'Edgar', 'Mortis', 'Belle', 'Amber', 'Max', 'Charlie', 'Willow', 'Spike', 'Byron'],
        B: ['Bea', 'Piper', 'Colette', 'Gale', 'Ash', 'Bibi', 'Frank', 'Darryl', 'Tara', 'Gene', 'Emz', 'Bonnie', 'Eve', 'Janet', 'Meg', 'Lola', 'Nani', 'Otis', 'Ruffs', 'Hank', 'Maisie', 'Pam', 'Rosa', 'Bo', 'Ollie', 'Juju'],
        C: ['Colt', 'Rico', 'Brock', 'Jessie', 'Penny', 'Nita', 'Poco', 'Mr. P', 'Sprout', 'Lou', 'Griff', 'Grom', 'Sam', 'Gus', 'Buster', 'Gray', 'Mandy', 'Chester', 'Doug', 'Pearl', 'Chuck', 'Meeple', 'Clancy', 'Larry & Lawrie', 'Najia'],
        D: ['Shelly', 'Bull', 'El Primo', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Carl', 'Jacky', 'R-T', 'Squeak']
    },
    'Gem Grab': {
        S: ['Sandy', 'Byron', 'Charlie', 'Willow', 'Berry', 'Kit', 'Melodie'],
        A: ['Gene', 'Tara', 'Max', 'Emz', 'Amber', 'Spike', 'Pam', 'Rosa', 'Ash', 'Belle', 'Surge', 'Juju', 'Ollie'],
        B: ['Poco', 'Jessie', 'Bo', 'Mr. P', 'Sprout', 'Lou', 'Ruffs', 'Gus', 'Gray', 'Otis', 'Lola', 'Meg', 'Maisie', 'Hank', 'Colette', 'Nani', 'Bea', 'Crow', 'Eve'],
        C: ['Nita', 'Penny', 'Frank', 'Bibi', 'Gale', 'Griff', 'Buster', 'Doug', 'Chester', 'Mandy', 'Pearl', 'Chuck', 'Moe', 'Clancy', 'Meeple', 'Leon', 'Fang', 'Buzz', 'Bonnie', 'Janet', 'Najia', 'Angelo', 'Shade', 'Mico'],
        D: ['Shelly', 'Colt', 'Bull', 'Brock', 'Dynamike', 'El Primo', 'Barley', 'Tick', '8-Bit', 'Carl', 'Jacky', 'R-T', 'Squeak', 'Piper', 'Darryl', 'Rico', 'Stu', 'Edgar', 'Mortis', 'Sam', 'Grom', 'Kenji', 'Lily', 'Draco', 'Larry & Lawrie', 'Cordelius']
    },
    'Brawl Ball': {
        S: ['Frank', 'Bibi', 'Darryl', 'Mortis', 'Fang', 'Melodie', 'Draco', 'Kenji'],
        A: ['El Primo', 'Rosa', 'Bull', 'Ash', 'Buzz', 'Surge', 'Stu', 'Colette', 'Gale', 'Max', 'Tara', 'Lily', 'Sam', 'Hank', 'Shade'],
        B: ['Shelly', 'Nita', 'Poco', 'Emz', 'Gene', 'Sandy', 'Amber', 'Meg', 'Lola', 'Bonnie', 'Buster', 'Mico', 'Edgar', 'Pam', 'Ollie', 'Cordelius', 'Berry'],
        C: ['Colt', 'Jessie', 'Rico', 'Carl', 'Jacky', 'Penny', 'Bo', 'Sprout', 'Lou', 'Ruffs', 'Griff', 'Gus', 'Doug', 'Mandy', 'Pearl', 'Chuck', 'Maisie', 'Juju', 'Meeple', 'Najia', 'Eve', 'Janet', 'Crow', 'Leon', 'Clancy', 'Larry & Lawrie'],
        D: ['Brock', 'Piper', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Belle', 'Nani', 'Grom', 'R-T', 'Squeak', 'Chester', 'Bea', 'Mr. P', 'Byron', 'Otis', 'Willow', 'Gray', 'Angelo', 'Charlie']
    },
    'Showdown': {
        S: ['Leon', 'Surge', 'Edgar', 'Melodie', 'Lily', 'Draco', 'Kenji', 'Shade', 'Mico'],
        A: ['Shelly', 'Bull', 'Darryl', 'Buzz', 'Crow', 'Spike', 'Amber', 'Fang', 'Stu', 'Mortis', 'Angelo', 'Moe', 'Berry', 'Kit', 'Cordelius'],
        B: ['El Primo', 'Rosa', 'Bibi', 'Frank', 'Bo', 'Colette', 'Ash', 'Meg', 'Bonnie', 'Sam', 'Hank', 'Pearl', 'Buster', 'Clancy', 'Larry & Lawrie', 'Najia'],
        C: ['Nita', 'Colt', 'Brock', 'Jessie', 'Poco', 'Pam', 'Tara', 'Gene', 'Max', 'Emz', 'Gale', 'Sandy', 'Carl', 'Rico', 'Jacky', 'Penny', 'Lola', 'Chester', 'Chuck', 'Charlie', 'Meeple', 'Eve', 'Janet', 'Nani', 'Bea'],
        D: ['Piper', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Mr. P', 'Sprout', 'Lou', 'Byron', 'Belle', 'Grom', 'R-T', 'Squeak', 'Otis', 'Willow', 'Gray', 'Doug', 'Ruffs', 'Griff', 'Gus', 'Mandy', 'Ollie', 'Juju', 'Maisie']
    },
    'Heist': {
        S: ['Colt', 'Brock', 'Surge', 'Moe', 'Draco', 'Kenji', 'Amber'],
        A: ['Bull', 'Darryl', 'Rico', 'Colette', 'Spike', 'Fang', 'Stu', 'Bonnie', 'Meg', 'Pearl', 'Clancy', 'Barley', 'Dynamike'],
        B: ['Shelly', 'Nita', 'Jessie', 'Bibi', 'Frank', 'Carl', 'Edgar', 'Belle', 'Ash', 'Griff', 'Sam', 'Hank', 'Buster', 'Lola', 'Maisie', 'Angelo', 'Melodie', 'Lily', 'Eve', 'Najia'],
        C: ['El Primo', 'Rosa', 'Pam', 'Bo', 'Penny', 'Gale', 'Emz', 'Tara', 'Max', 'Sandy', 'Buzz', 'Ruffs', 'Gus', 'Mandy', 'Chester', 'Chuck', 'Charlie', 'Meeple', 'Larry & Lawrie', 'Berry', 'Nani', 'Bea', 'Janet', 'Shade', 'Mico', 'Kit'],
        D: ['Poco', 'Piper', 'Gene', 'Tick', '8-Bit', 'Jacky', 'Mr. P', 'Sprout', 'Lou', 'Byron', 'Mortis', 'Grom', 'R-T', 'Squeak', 'Otis', 'Willow', 'Gray', 'Doug', 'Crow', 'Leon', 'Ollie', 'Juju', 'Cordelius']
    },
    'Bounty': {
        S: ['Piper', 'Belle', 'Angelo', 'Melodie', 'Lily', 'Byron', 'Berry'],
        A: ['Brock', 'Crow', 'Spike', 'Nani', 'Mandy', 'Maisie', 'Bea', 'Stu', 'Surge', 'Bo', 'Emz', 'Willow', 'Charlie'],
        B: ['Colt', 'Leon', 'Mortis', 'Tara', 'Gene', 'Sandy', 'Max', 'Amber', 'Colette', 'Fang', 'Gale', 'Otis', 'Lola', 'Janet', 'Pearl', 'Shade', 'Mico', 'Kit', 'Kenji', 'Juju', 'Eve', 'Cordelius'],
        C: ['Jessie', 'Poco', 'Penny', 'Mr. P', 'Sprout', 'Lou', 'Buzz', 'Ruffs', 'Griff', 'Gus', 'Gray', 'Chester', 'Doug', 'Chuck', 'Meg', 'Bonnie', 'Hank', 'Moe', 'Meeple', 'Ollie', 'Clancy', 'Larry & Lawrie', 'Najia', 'Nita'],
        D: ['Shelly', 'Bull', 'El Primo', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Carl', 'Jacky', 'Rosa', 'Frank', 'Bibi', 'Darryl', 'Pam', 'Rico', 'R-T', 'Squeak', 'Ash', 'Edgar', 'Buster', 'Sam', 'Grom', 'Draco']
    },
    'Hot Zone': {
        S: ['Sandy', 'Emz', 'Amber', 'Willow', 'Berry', 'Juju', 'Melodie'],
        A: ['Poco', 'Rosa', 'Bo', 'Sprout', 'Gale', 'Ash', 'Pam', 'Gene', 'Byron', 'Spike', 'Max', 'Lou', 'Charlie', 'Ollie', 'Kit'],
        B: ['Nita', 'Jessie', 'Frank', 'Bibi', 'Tara', 'Mr. P', 'Ruffs', 'Griff', 'Gus', 'Buster', 'Otis', 'Lola', 'Meg', 'Hank', 'Colette', 'Sam', 'Pearl', 'Maisie', 'Draco', 'Cordelius'],
        C: ['Shelly', 'Colt', 'Brock', 'Penny', 'Carl', 'Rico', 'Darryl', 'Surge', 'Belle', 'Fang', 'Stu', 'Buzz', 'Edgar', 'Bonnie', 'Janet', 'Mandy', 'Chester', 'Doug', 'Chuck', 'Nani', 'Moe', 'Meeple', 'Clancy', 'Eve', 'Najia'],
        D: ['Bull', 'El Primo', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Jacky', 'Piper', 'Mortis', 'Crow', 'Leon', 'R-T', 'Squeak', 'Grom', 'Gray', 'Bea', 'Angelo', 'Larry & Lawrie', 'Kenji', 'Shade', 'Mico', 'Lily']
    },
    'Knockout': {
        S: ['Belle', 'Piper', 'Angelo', 'Melodie', 'Berry', 'Kenji', 'Lily'],
        A: ['Brock', 'Bo', 'Spike', 'Nani', 'Mandy', 'Bea', 'Byron', 'Emz', 'Crow', 'Surge', 'Stu', 'Fang', 'Shade', 'Mico', 'Maisie', 'Willow', 'Charlie'],
        B: ['Colt', 'Leon', 'Mortis', 'Tara', 'Gene', 'Max', 'Sandy', 'Amber', 'Gale', 'Colette', 'Ruffs', 'Otis', 'Lola', 'Janet', 'Pearl', 'Meg', 'Bonnie', 'Hank', 'Kit', 'Juju', 'Ollie', 'Eve', 'Cordelius', 'Najia'],
        C: ['Nita', 'Jessie', 'Poco', 'Penny', 'Frank', 'Bibi', 'Rico', 'Carl', 'Mr. P', 'Sprout', 'Lou', 'Buzz', 'Griff', 'Gus', 'Gray', 'Chester', 'Doug', 'Chuck', 'Moe', 'Meeple', 'Clancy'],
        D: ['Shelly', 'Bull', 'El Primo', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Jacky', 'Rosa', 'Pam', 'Darryl', 'R-T', 'Squeak', 'Ash', 'Edgar', 'Buster', 'Sam', 'Draco', 'Larry & Lawrie']
    },
    'Duels': {
        S: ['Melodie', 'Kenji', 'Lily', 'Draco', 'Shade', 'Mico', 'Berry'],
        A: ['Leon', 'Surge', 'Fang', 'Stu', 'Edgar', 'Buzz', 'Mortis', 'Spike', 'Crow', 'Angelo', 'Kit', 'Cordelius'],
        B: ['Shelly', 'Bull', 'Darryl', 'Bibi', 'Frank', 'Colette', 'Emz', 'Max', 'Amber', 'Bonnie', 'Meg', 'Lola', 'Sam', 'Hank', 'Pearl', 'Bea', 'Maisie', 'Ash', 'Najia'],
        C: ['Colt', 'Brock', 'Nita', 'El Primo', 'Rosa', 'Carl', 'Rico', 'Tara', 'Gene', 'Sandy', 'Gale', 'Bo', 'Pam', 'Ruffs', 'Griff', 'Gus', 'Chester', 'Mandy', 'Chuck', 'Moe', 'Clancy', 'Larry & Lawrie', 'Meeple', 'Eve', 'Janet'],
        D: ['Jessie', 'Poco', 'Piper', 'Dynamike', 'Barley', 'Tick', '8-Bit', 'Jacky', 'Penny', 'Mr. P', 'Sprout', 'Lou', 'Byron', 'Belle', 'Nani', 'Grom', 'R-T', 'Squeak', 'Otis', 'Willow', 'Gray', 'Doug', 'Charlie', 'Buster', 'Juju', 'Ollie']
    }
};

// 3 reasons per brawler per mode
const TIER_REASONS = {
    'Overall': {
        // S-TIER
        'Melodie': [
            'Orbiting notes deal passive damage to anyone nearby, making her punishing to approach.',
            'Very few brawlers can reliably counter her once notes are active.',
            'Excels in both aggro and mid-range roles with consistent auto-damage pressure.'
        ],
        'Kenji': [
            'Katana dash delivers devastating burst damage that deletes squishies instantly.',
            'High mobility lets him reposition and dodge attacks between engagements.',
            'Lethal combo chains allow him to wipe multiple enemies in rapid succession.'
        ],
        'Lily': [
            'Fast dash makes her one of the best engage and disengage assassins in the game.',
            'Thorns damage punishes enemies who try to trade shots at close range.',
            'Exceptional at picking off low-HP targets and escaping before the enemy team can react.'
        ],
        'Draco': [
            'Fire breath combined with tank-level HP makes him nearly impossible to out-trade up close.',
            'High sustained damage shreds enemies who cannot maintain distance.',
            'Dominates close-range engagements where most brawlers simply cannot survive against him.'
        ],
        'Berry': [
            'Freeze mechanic locks down enemies, removing their ability to dodge or retreat.',
            'Excellent area control that denies zones and choke points for extended periods.',
            'Disrupts coordinated enemy plays by freezing key targets at critical moments.'
        ],
        'Moe': [
            'Artillery splash damage hits safely from extreme range with large area coverage.',
            'Minecart super provides powerful zone control that forces enemies to reposition.',
            'Can pressure objectives and enemies without ever exposing himself to danger.'
        ],
        'Angelo': [
            'Poison arrows apply persistent damage that chips enemies down over time.',
            'Flight ability grants unmatched mobility and lets him cross walls and water.',
            'Controls map flow by denying areas with poison and repositioning with flight.'
        ],
        'Cordelius': [
            'Shadow realm super isolates a single target for a guaranteed 1v1 duel.',
            'Extremely strong duelist who wins most isolated matchups thanks to stat boosts in shadow.',
            'Forces enemies to play grouped up, limiting their strategic options and rotations.'
        ],
        'Kit': [
            'Attaches to allied brawlers, providing constant healing while being nearly untargetable.',
            'Extremely hard to hit while attached, making him one of the safest supports.',
            'Transforms any teammate into a sustained-fight powerhouse with persistent heal output.'
        ],
        // A-TIER
        'Leon': [
            'Invisibility super allows him to ambush unsuspecting targets with no counterplay window.',
            'High burst damage at close range deletes squishies before they can react.',
            'Forces enemies to play defensively and check bushes constantly, creating psychological pressure.'
        ],
        'Sandy': [
            'Sandstorm super grants team-wide invisibility, enabling coordinated pushes and ambushes.',
            'Solid area damage and range make him effective at controlling lanes independently.',
            'One of the best team-support brawlers with a super that swings entire fights.'
        ],
        'Crow': [
            'Poison chip damage reduces enemy healing by 40%, crippling sustain-based compositions.',
            'Excellent at poking from range and preventing enemies from recovering between engagements.',
            'High mobility with his super lets him finish off weakened targets or escape danger.'
        ],
        'Surge': [
            'Upgrade scaling makes him progressively stronger each time he uses his super.',
            'At max stage he gains split shots and massive range that dominate open maps.',
            'Teleport super gives him burst mobility to close gaps or dodge lethal attacks.'
        ],
        'Buzz': [
            'Stun combo from his grapple super guarantees follow-up damage on any target he hits.',
            'Charges super passively by being near enemies, making him a constant threat.',
            'Excels as a lane bully who punishes anyone who steps too close to his zone.'
        ],
        'Fang': [
            'Chain super kicks allow him to bounce between multiple enemies for devastating team wipes.',
            'Super charges from defeating enemies, snowballing fights once the first kill lands.',
            'Strong gap-closing ability makes it hard for ranged brawlers to keep him at bay.'
        ],
        'Stu': [
            'One-hit super charge gives him unmatched dash frequency for constant repositioning.',
            'Extremely agile playstyle that makes him difficult to pin down or predict.',
            'Can chain dashes to dodge attacks while continuously dealing damage.'
        ],
        'Shade': [
            'Shadow stealth mechanic lets him turn invisible and reposition for ambush attacks.',
            'High burst damage from stealth catches enemies off guard with little reaction time.',
            'Excels at flanking and picking off key targets behind enemy lines.'
        ],
        'Mico': [
            'Wall jump ability provides unique mobility that most brawlers cannot match or escape.',
            'Burst damage output is high enough to eliminate squishies in a single engage.',
            'Can access unusual angles and positions that make him unpredictable in fights.'
        ],
        'Edgar': [
            'Auto-charging super lets him engage without needing to hit enemies first.',
            'Lifesteal on attacks gives him sustain that lets him outlast opponents in close combat.',
            'Terrifying dive threat that forces squishy brawlers to always respect his jump range.'
        ],
        'Mortis': [
            'Dash attacks let him close gaps instantly and chain kills on weakened enemies.',
            'Healing super restores significant HP, allowing him to survive extended team fights.',
            'One of the best brawlers at punishing out-of-position squishies and throwers.'
        ],
        'Belle': [
            'Mark super causes the target to take extra damage from all sources, enabling focus-fire.',
            'Long range and consistent damage make her a strong lane holder on open maps.',
            'Bouncing shots punish enemies who cluster together or hide behind teammates.'
        ],
        'Amber': [
            'Continuous flame stream deals massive sustained DPS at medium range without reloading.',
            'Huge ammo pool lets her pressure enemies non-stop while others must reload.',
            'Fire puddle super creates area denial that controls choke points and objectives.'
        ],
        'Max': [
            'Team speed boost super increases the entire team\'s mobility for aggressive pushes.',
            'Fast movement speed makes her naturally hard to hit with skill shots.',
            'Consistent mid-range damage output and utility make her valuable in every team composition.'
        ],
        'Charlie': [
            'Web super traps enemies in place, setting up easy follow-up damage from teammates.',
            'Strong area control that denies movement through key parts of the map.',
            'Versatile kit that works well in both aggressive and defensive team compositions.'
        ],
        'Willow': [
            'Possession super takes control of an enemy brawler, turning them against their own team.',
            'One of the most disruptive abilities in the game that can swing any fight instantly.',
            'Solid poking damage at range lets her charge her game-changing super consistently.'
        ],
        'Spike': [
            'Burst damage from a well-aimed cactus grenade can eliminate squishies in two hits.',
            'Super creates a slowing area that denies movement and makes follow-up kills easy.',
            'Split projectile pattern covers a wide area, making him effective even without perfect aim.'
        ],
        'Byron': [
            'Heals allies and damages enemies simultaneously with every single attack he lands.',
            'Stacking poison creates immense pressure that forces enemies to disengage or die.',
            'One of the strongest supports in the game with unmatched offensive healing versatility.'
        ],
        // B-TIER
        'Bea': [
            'Charged shot deals massive burst damage that can two-shot most brawlers.',
            'Supercharged mechanic rewards accurate players with devastating follow-up potential.',
            'Held back by reliance on hitting the charged shot — missing it leaves her vulnerable.'
        ],
        'Piper': [
            'Longest effective range in the game with damage that increases at max distance.',
            'Excels on open maps where she can snipe enemies from safety.',
            'Falls to B-tier because she struggles heavily on close-range and wall-heavy maps.'
        ],
        'Colette': [
            'Percentage-based damage makes her the best counter to high-HP tanks in the game.',
            'Super charges through enemies and back, guaranteeing damage on grouped targets.',
            'Struggles against squishies where her percentage damage deals less total output.'
        ],
        'Gale': [
            'Pushback super and gadget provide excellent defensive utility against aggressive comps.',
            'Can deny enemy pushes and protect objectives with his knockback abilities.',
            'Lacks the raw damage output to carry games, keeping him in the B-tier range.'
        ],
        'Ash': [
            'Rage mechanic increases his damage and movement speed as he takes hits.',
            'Becomes extremely dangerous at full rage, forcing enemies to burst him down quickly.',
            'Slow start and need to build rage before peaking keeps him from higher tiers.'
        ],
        'Bibi': [
            'Speed boost on charged swing lets her chase down enemies or escape danger.',
            'Knockback on home-run swing creates space and disrupts enemy positioning.',
            'Solid melee brawler but outclassed by S-tier close-range options like Draco and Kenji.'
        ],
        'Frank': [
            'Stun super is one of the most impactful crowd control abilities when it lands.',
            'Highest base HP in the game makes him extremely durable in sustained fights.',
            'Long attack wind-up makes him vulnerable to interrupts and mobile assassins.'
        ],
        'Darryl': [
            'Auto-charging roll lets him engage on targets without needing to land attacks first.',
            'Strong burst damage at point-blank range after rolling into enemies.',
            'Predictable engage pattern and vulnerability after rolling keep him from higher tiers.'
        ],
        'Tara': [
            'Group pull super is one of the best team-fight abilities that can win games instantly.',
            'Shadow clones from gadgets provide scouting and additional pressure in fights.',
            'Relies heavily on landing her super to be impactful, making her inconsistent otherwise.'
        ],
        'Gene': [
            'Pull super grabs a single enemy into your team, almost guaranteeing their elimination.',
            'Decent poke damage and healing star power make him a well-rounded support.',
            'Dependent on landing his super to create value, which can be dodged by mobile brawlers.'
        ],
        'Emz': [
            'Medium-range spray deals increasing damage the longer enemies stay in her cloud.',
            'Excellent at holding lanes and punishing enemies who try to push through choke points.',
            'Vulnerable to long-range snipers and fast assassins who can bypass her spray zone.'
        ],
        'Bonnie': [
            'Dual form lets her switch between long-range cannon and close-range melee mode.',
            'Versatile playstyle that adapts to different situations within a single match.',
            'Neither form is top-tier on its own, making her a jack-of-all-trades but master of none.'
        ],
        'Eve': [
            'Water float ability lets her access areas of the map that most brawlers cannot reach.',
            'Hatchling spawns from her super provide persistent pressure and area control.',
            'Moderate damage output and reliance on water maps limit her overall consistency.'
        ],
        'Janet': [
            'Fly super makes her completely untargetable while she repositions across the map.',
            'Good sustained damage with her singing attack at medium range.',
            'Flying super is mainly for repositioning — she cannot attack during flight, limiting its value.'
        ],
        'Meg': [
            'Mech transformation gives her massive HP and damage, essentially becoming two brawlers.',
            'In mech form she is one of the most threatening brawlers on the field.',
            'Base form is extremely weak with low HP and damage, making her risky before first super.'
        ],
        'Lola': [
            'Ego clone copies her attacks, effectively doubling her damage output from one position.',
            'Strong burst potential when both her and her clone hit the same target.',
            'Clone is stationary and can be avoided by mobile enemies, reducing her effectiveness.'
        ],
        'Nani': [
            'Converging orb pattern deals devastating damage when all three projectiles connect.',
            'Peep super provides scouting and targeted burst damage from anywhere on the map.',
            'Extremely difficult to consistently land all orbs, making her high-skill and inconsistent.'
        ],
        'Otis': [
            'Silence super completely shuts down an enemy\'s attacks and abilities for several seconds.',
            'Can neutralize key threats during critical moments of a fight.',
            'Mediocre base damage and short range outside of his super limit his standalone impact.'
        ],
        'Ruffs': [
            'Power-up drops permanently boost an ally\'s HP and damage for the rest of the match.',
            'Team-oriented kit that makes his teammates significantly stronger over time.',
            'Relatively low personal combat power means he relies on teammates to capitalize on buffs.'
        ],
        'Hank': [
            'Charged blast deals massive area damage that can hit multiple enemies at once.',
            'Tank-level HP lets him absorb punishment while charging his devastating attack.',
            'Slow charge time and predictable attack pattern make him easy to play around.'
        ],
        'Maisie': [
            'Charged shot mechanic rewards patience with a high-damage precision attack.',
            'Solid range and consistent poke damage between charged shots.',
            'Outclassed by other sharpshooters who provide more utility or higher burst.'
        ],
        'Pam': [
            'Healing station super provides sustained area healing for her entire team.',
            'High HP and decent damage make her a durable frontline support.',
            'Healing station is stationary and can be destroyed, limiting its reliability in mobile fights.'
        ],
        'Rosa': [
            'Shield super makes her nearly unkillable for its duration in close-range fights.',
            'Strong lane presence with consistent melee damage and high base HP.',
            'Limited range means she can be kited by ranged brawlers on open maps.'
        ],
        'Bo': [
            'Mine placement provides vision control and area denial on key map positions.',
            'Totem gadget charges team supers faster, accelerating the entire team\'s gameplan.',
            'Mines can be dodged or triggered safely, reducing their impact against experienced players.'
        ],
        'Ollie': [
            'Dual form allows him to switch between a control mode and a more aggressive mode.',
            'Provides solid area control with abilities that restrict enemy movement.',
            'Complexity of managing two forms can reduce effectiveness without practiced coordination.'
        ],
        'Juju': [
            'Curse mechanic applies a debuff that deals damage over time to affected enemies.',
            'Good zone control by placing curses on key areas of the map.',
            'Curse damage is avoidable and takes time to deal full effect, limiting burst potential.'
        ],
        // C-TIER
        'Colt': [
            'High DPS output when all bullets connect makes him lethal against stationary targets.',
            'Silver Bullet gadget can break walls to reshape the map in his favor.',
            'Narrow bullet spread is extremely hard to land against mobile enemies, reducing his consistency.'
        ],
        'Rico': [
            'Wall bounce shots let him hit enemies behind cover with precise geometry.',
            'Excels in tight corridor maps where bouncing bullets are nearly unavoidable.',
            'Very niche — on open maps without walls to bounce off, his effectiveness drops sharply.'
        ],
        'Brock': [
            'Rocket damage is high per hit with decent splash and wall-breaking capability.',
            'Good at opening up maps by destroying cover to benefit his team\'s ranged composition.',
            'Slow projectile speed and low HP make him easy to dodge and punish at close range.'
        ],
        'Jessie': [
            'Scrappy turret provides persistent area pressure and an additional damage source.',
            'Bounce shots chain between grouped enemies, punishing teams that stack together.',
            'Low individual damage and fragile turret make her easily countered by experienced players.'
        ],
        'Penny': [
            'Cannon turret provides long-range area splash that zones enemies off objectives.',
            'Split shot from her main attack punishes enemies standing behind each other.',
            'Both Penny and her turret are relatively easy to destroy, limiting her overall threat.'
        ],
        'Nita': [
            'Bear summon creates a tanky distraction that splits enemy attention in fights.',
            'Bear and Nita can pressure from two angles simultaneously for flanking potential.',
            'Bear AI is predictable and easy to kite, reducing its impact against skilled opponents.'
        ],
        'Poco': [
            'Best pure healer in the game with area-of-effect healing super for the whole team.',
            'Da Capo star power heals allies with every attack, providing constant sustain.',
            'Extremely low damage output means he cannot threaten enemies or defend himself alone.'
        ],
        'Mr. P': [
            'Porter station continuously spawns mini-porters that pressure enemies and control space.',
            'Bouncing suitcase attack reaches behind cover to hit enemies in unexpected positions.',
            'Low damage per hit and fragile porters make him easy to overwhelm with burst damage.'
        ],
        'Sprout': [
            'Wall super reshapes the map by blocking pathways and creating new cover.',
            'Lobbing attack reaches over walls, making him effective from protected positions.',
            'Slow reload and predictable projectile arc make him vulnerable when caught in the open.'
        ],
        'Lou': [
            'Freeze and slip mechanics disrupt enemy movement and prevent them from attacking.',
            'Super creates a slippery zone that makes enemies unable to control their movement.',
            'Freeze buildup is slow and requires multiple hits, making it unreliable against fast enemies.'
        ],
        'Griff': [
            'Coin spread attack deals high damage at close range when all projectiles connect.',
            'Good burst potential with super that sends a wave of coins in a wide arc.',
            'Spread pattern becomes too wide at range, making him ineffective outside close-mid range.'
        ],
        'Grom': [
            'X-pattern artillery covers a unique area that catches enemies dodging in predictable paths.',
            'Can deal massive damage to enemies who walk into the center of his explosion pattern.',
            'Very difficult to land consistently and extremely vulnerable to assassins who close the gap.'
        ],
        'Sam': [
            'Knuckle buster throw creates a damage zone and lets him teleport to it.',
            'Decent HP and close-range damage make him a capable brawler in melee exchanges.',
            'Telegraphed engage pattern through knuckle placement makes him predictable and easy to avoid.'
        ],
        'Gus': [
            'Spirit shield provides a damage-absorbing barrier that protects himself or allies.',
            'Good poke damage at medium range with a supportive utility kit.',
            'Shield requires charging through damage dealt and disappears quickly, limiting its reliability.'
        ],
        'Buster': [
            'Absorb shield blocks incoming damage and converts it into a powerful counterattack.',
            'Can protect teammates by standing in front and absorbing enemy fire.',
            'Shield timing is difficult and enemies can simply wait it out, making him inconsistent.'
        ],
        'Gray': [
            'Portal link connects two points on the map, enabling rapid team rotations.',
            'Provides unique utility that no other brawler can replicate for team movement.',
            'Low combat stats and reliance on portal for value make him weak in direct fights.'
        ],
        'Mandy': [
            'Focused beam deals high damage in a precise line after charging up.',
            'Long range and accuracy reward skilled players with consistent poke damage.',
            'Charge-up time and narrow beam make her outclassed by other sharpshooters who fire faster.'
        ],
        'Chester': [
            'Random super abilities create unpredictable situations that can catch enemies off guard.',
            'Unique randomness factor makes every match play out differently.',
            'Inconsistency from random abilities means he cannot be relied on for specific strategies.'
        ],
        'Doug': [
            'Hotdog healing mechanic lets him support teammates with food-based HP restoration.',
            'Can sustain teammates in prolonged fights with his unique healing approach.',
            'Healing output is lower and less reliable than dedicated supports like Byron or Poco.'
        ],
        'Pearl': [
            'Heat mechanic increases her damage the more she fires, rewarding sustained aggression.',
            'Can ramp up to very high DPS if she maintains continuous fire on enemies.',
            'Needs time to build heat and loses it when not firing, making her inconsistent in poke wars.'
        ],
        'Chuck': [
            'Rail rider ability lets him dash along walls for rapid repositioning across the map.',
            'Unique movement mechanic provides unexpected engage and escape angles.',
            'Wall-dependent mobility means he is far less effective on open maps without rail paths.'
        ],
        'Meeple': [
            'Board game mechanic provides unique strategic options that vary each match.',
            'Can adapt his playstyle based on the random buffs and effects he receives.',
            'Randomness and complexity of his kit make him unreliable compared to straightforward brawlers.'
        ],
        'Clancy': [
            'Evolving attacks change form as he uses his super, increasing in power each stage.',
            'At max evolution his attacks become significantly more threatening.',
            'Needs to build up through multiple supers, making him weak in the early stages of a match.'
        ],
        'Larry & Lawrie': [
            'Split duo mechanic lets the player control two units for map presence.',
            'Can cover more ground and apply pressure from two positions simultaneously.',
            'Both units are individually weak and losing one significantly reduces combat effectiveness.'
        ],
        'Najia': [
            'Snake attacks provide a unique projectile pattern that weaves around obstacles.',
            'Good at hitting enemies in unusual positions with her curving attack path.',
            'Difficult to aim consistently and damage output is middling compared to other mid-range options.'
        ],
        // D-TIER
        'Shelly': [
            'Close range only — she is completely outclassed by other shotgunners at every level of play.',
            'Easily kited by any brawler with moderate range, leaving her unable to deal damage.',
            'Starter brawler kit with no unique strengths that other brawlers don\'t do better.'
        ],
        'Bull': [
            'Heavily map dependent — completely useless on open maps where he cannot close distance.',
            'Any brawler with knockback or slow can prevent him from ever reaching his effective range.',
            'Predictable charge super is easy to dodge and leaves him overextended in enemy territory.'
        ],
        'El Primo': [
            'Only truly viable in Brawl Ball where his super can carry the ball to the goal.',
            'Gets kited and poked down before he can reach enemies on most other game modes.',
            'Lacks any ranged damage option, making him useless until he is directly on top of an enemy.'
        ],
        'Dynamike': [
            'Extremely hard to hit with lobbed attacks against any enemy with basic movement skills.',
            'Free food for assassins who can dodge his slow projectiles and burst him down.',
            'Requires exceptional prediction skills to be effective, and even then better options exist.'
        ],
        'Barley': [
            'Fragile area denial brawler who dies instantly to any gap-closing enemy.',
            'Damage over time is easily walked out of by aware opponents.',
            'Outclassed by other throwers and area controllers who bring more value to a team.'
        ],
        'Tick': [
            'Lowest HP in the entire game makes him die to virtually any attack that connects.',
            'Mines are slow to land and easy to dodge for any brawler paying attention.',
            'Completely dependent on teammates to protect him since he cannot defend himself at all.'
        ],
        '8-Bit': [
            'Slowest movement speed in the game makes him an easy target for every brawler.',
            'Cannot dodge attacks or reposition effectively, leaving him stranded in bad positions.',
            'Damage boost turret is stationary and forces him to stay in one predictable location.'
        ],
        'Carl': [
            'Predictable pickaxe boomerang trajectory makes his damage easy to sidestep.',
            'Must wait for pickaxe to return before attacking again, creating exploitable windows.',
            'Outclassed by other mid-range brawlers who have faster attack cycles and better mobility.'
        ],
        'Jacky': [
            'Extremely short attack range means she is kited by almost every brawler in the game.',
            'Cannot reach enemies unless they walk directly into her tiny effective range.',
            'Other tanks like Draco and Frank bring far more value with better range or crowd control.'
        ],
        'R-T': [
            'Niche split mechanic is complex and provides little payoff for the effort required.',
            'Both halves are weak individually and easy for enemies to clean up separately.',
            'Outclassed by virtually every other brawler in every game mode with no standout niche.'
        ],
        'Squeak': [
            'Slow-detonating sticky bombs are trivially easy to dodge by walking away.',
            'Delayed damage means enemies always have time to escape the blast radius.',
            'Provides almost no immediate threat, allowing opponents to play aggressively without fear.'
        ]
    },
    'Gem Grab': {
        // S-TIER
        'Sandy': [
            'Sandstorm super grants team-wide invisibility over the gem mine, enabling total mid control.',
            'Wide-spread attacks let him hold the center lane and deny gem pickups from enemies.',
            'One of the best gem carriers — his super lets him collect safely while invisible.'
        ],
        'Byron': [
            'Heals the gem carrier from the backline while simultaneously poisoning enemy aggressors.',
            'Stacking poison forces mid-lane enemies to retreat, giving his team free gem control.',
            'Unmatched sustain support keeps the gem carrier alive through prolonged mid-lane fights.'
        ],
        'Charlie': [
            'Web super traps enemies contesting the gem mine, locking down mid control for her team.',
            'Area denial from webs forces opponents off the gem spawn for multiple seconds.',
            'Versatile enough to play as a mid controller or aggressive support depending on the matchup.'
        ],
        'Willow': [
            'Possession super can take control of the enemy gem carrier, disrupting their entire strategy.',
            'Poking from range builds super quickly in the constant mid-lane skirmishes of Gem Grab.',
            'Possessing a gem-loaded enemy can swing the gem count instantly in her team\'s favor.'
        ],
        'Berry': [
            'Freeze mechanic locks down enemies contesting the gem mine, securing control for her team.',
            'Area denial around the gem spawn prevents opponents from safely collecting gems.',
            'Frozen enemies drop their defensive positioning, letting teammates push in for easy eliminations.'
        ],
        'Kit': [
            'Attaches to the gem carrier, providing constant healing that makes them nearly unkillable in mid.',
            'Nearly untargetable while attached, making him the safest support for gem carrier compositions.',
            'Enables aggressive gem carriers to push forward without fear of being burst down.'
        ],
        'Melodie': [
            'Orbiting notes zone out enemies from the gem mine without requiring precise aim.',
            'Excellent gem carrier — approaching her is dangerous, so enemies struggle to recover gems.',
            'High mobility lets her reposition around the mid area and dodge incoming attacks with ease.'
        ],
        // A-TIER
        'Gene': [
            'Pull super can grab the enemy gem carrier into your team, instantly swinging the gem count.',
            'Solid mid-lane poke keeps enemies off the gem mine and charges super consistently.',
            'Healing star power sustains teammates during prolonged mid-lane fights over gem control.'
        ],
        'Tara': [
            'Group pull super is devastating in the tight mid-lane of Gem Grab, catching multiple enemies.',
            'Shadow clones scout bushes near the gem mine to prevent ambushes from enemy aggro players.',
            'Consistent mid-range damage makes her a reliable lane holder alongside the gem carrier.'
        ],
        'Max': [
            'Speed boost super lets the entire team rush the mid area or retreat after grabbing gems.',
            'Fast movement makes her a viable gem carrier who can dodge attacks and reposition quickly.',
            'Consistent damage at medium range keeps enemies from comfortably holding their lane.'
        ],
        'Emz': [
            'Spray damage punishes enemies who group up around the gem mine for extended control.',
            'Excellent at holding mid lane — enemies take increasing damage the longer they stay in her cloud.',
            'Slowing super prevents enemy pushes toward your gem carrier and protects the backline.'
        ],
        'Amber': [
            'Continuous flame stream shreds enemies who try to contest the gem mine in close quarters.',
            'Fire puddle super placed on the gem spawn denies enemy collection for several seconds.',
            'High sustained DPS makes her a dominant mid-lane presence that enemies must respect.'
        ],
        'Spike': [
            'Cactus grenade covers the gem mine area with spike projectiles, punishing anyone contesting.',
            'Slowing super placed on the gem spawn area forces enemies to walk through it or give up gems.',
            'Burst potential from well-aimed grenades can eliminate gem carriers before they retreat to safety.'
        ],
        'Pam': [
            'Healing turret placed near the gem mine provides sustained HP for the entire team in mid.',
            'Tanky enough to hold center lane and absorb damage while teammates collect gems behind her.',
            'Wide shot spread covers the gem area, dealing chip damage to all nearby enemies consistently.'
        ],
        'Rosa': [
            'Shield super lets her tank damage on the gem mine and body-block enemies from collecting.',
            'High HP and close-range damage make her a dominant presence in the tight mid-lane area.',
            'Grass bushes near mid on many gem maps allow her to ambush enemies approaching the mine.'
        ],
        'Ash': [
            'Rage mechanic charges quickly in the constant mid-lane fighting of Gem Grab.',
            'At full rage he dominates the gem mine area with increased speed and damage output.',
            'Durable enough to hold the gem area as a frontline while teammates deal damage from behind.'
        ],
        'Belle': [
            'Mark super on the enemy gem carrier causes them to take bonus damage, forcing a retreat.',
            'Long range lets her poke mid from the backline without risking her own position.',
            'Bouncing shots punish enemies who stack near the gem mine, hitting multiple targets consistently.'
        ],
        'Surge': [
            'Teleport super allows him to jump onto the gem mine for aggressive gem grabs.',
            'At max stage his split shots dominate the mid-lane area with wide-angle projectiles.',
            'Scaling power means he becomes progressively more dangerous as the match goes on.'
        ],
        'Juju': [
            'Curse placed on the gem mine area forces enemies to either take damage or concede gems.',
            'Solid zone control that restricts enemy movement around the central gem spawn.',
            'Consistent area denial makes him a reliable pick for teams that want sustained mid control.'
        ],
        'Ollie': [
            'Dual-form abilities provide strong area control around the contested gem mine.',
            'Can switch between defensive control and aggressive pressure depending on the gem situation.',
            'Solid mid-lane presence that restricts enemy movement and protects the gem carrier.'
        ],
        // B-TIER
        'Poco': [
            'Area healing super keeps the gem carrier alive during mid-lane fights over gem control.',
            'Da Capo star power provides constant sustain but his damage output is too low to threaten enemies.',
            'Decent support for gem carrier comps but outclassed by Byron and Kit in the healing role.'
        ],
        'Jessie': [
            'Scrappy turret placed on the gem mine provides persistent area control and pressure.',
            'Bounce shots punish enemies grouping near mid, chaining between multiple targets.',
            'Turret is easy to destroy and her individual damage is too low to dominate the lane.'
        ],
        'Bo': [
            'Mines placed on the gem spawn area deny enemy collection and control the center.',
            'Super totem charges teammates\' supers faster, accelerating the team\'s Gem Grab gameplan.',
            'Mine detection from star power reveals enemy positions near the gem mine for team awareness.'
        ],
        'Mr. P': [
            'Porter station near the gem mine spawns continuous porters that pressure mid and control space.',
            'Bouncing suitcase reaches enemies hiding behind walls near the gem area.',
            'Low individual damage and fragile porters make him easy to overwhelm during aggressive pushes.'
        ],
        'Sprout': [
            'Wall super can block off pathways to the gem mine, forcing enemies to take longer routes.',
            'Lobbing attacks reach over walls near mid, hitting enemies from protected positions.',
            'Map control from walls is strong but predictable and can be played around by experienced teams.'
        ],
        'Lou': [
            'Freeze buildup on enemies contesting the gem mine disrupts their ability to collect or fight.',
            'Slippery zone super placed on the gem spawn makes enemy collection extremely difficult.',
            'Freeze requires multiple hits to activate, making him unreliable against enemies who dodge well.'
        ],
        'Ruffs': [
            'Power-up drops on the gem carrier permanently increase their survivability in mid.',
            'Team-oriented kit buffs allies to win extended mid-lane fights over gem control.',
            'Low personal combat power means he depends on teammates to capitalize on the power-ups.'
        ],
        'Gus': [
            'Spirit shield placed on the gem carrier absorbs burst damage, keeping them alive in mid.',
            'Decent poke at medium range helps contest the gem mine area from a safe position.',
            'Shield uptime is inconsistent and he lacks the damage to pressure enemies off the mine alone.'
        ],
        'Gray': [
            'Portal link lets teammates rotate quickly between lanes and the gem mine for rapid repositioning.',
            'Unique utility enables creative plays like teleporting the gem carrier to safety.',
            'Low combat stats make him a liability in direct mid-lane fights over gem control.'
        ],
        'Otis': [
            'Silence super on the enemy gem carrier strips their abilities, making them easy to eliminate.',
            'Can shut down key enemy brawlers during critical moments of gem contestation.',
            'Mediocre damage and short range make it hard for him to hold mid lane independently.'
        ],
        'Lola': [
            'Ego clone placed near the gem mine doubles her damage output on enemies contesting mid.',
            'Burst potential is high when both her and her clone hit the same target on the gem area.',
            'Stationary clone can be avoided by mobile enemies, reducing her control over the gem mine.'
        ],
        'Meg': [
            'Mech form dominates the gem mine area with high HP and damage, controlling mid completely.',
            'In mech she can hold the gem area as an aggressive frontline tank.',
            'Base form is very weak and vulnerable — losing mech in mid means losing gem control entirely.'
        ],
        'Maisie': [
            'Charged shot can threaten enemies contesting the gem mine from a safe backline position.',
            'Consistent poke helps wear down mid-lane opponents and charge super for defensive plays.',
            'Outclassed by other sharpshooters who offer more utility or better gem control in mid.'
        ],
        'Hank': [
            'Charged blast can hit multiple enemies grouped on the gem mine for massive area damage.',
            'Tanky HP lets him absorb damage while holding a position near mid for gem collection.',
            'Slow charge time is exploitable and enemies can dodge his telegraph attack around the mine.'
        ],
        'Colette': [
            'Percentage damage is effective against tanky gem carriers, shredding their HP pools.',
            'Super charges through the gem mine area hitting all enemies in its path and return.',
            'Struggles against squishy mid-lane controllers where her percentage damage is less impactful.'
        ],
        'Nani': [
            'Converging orbs deal massive damage to enemies standing still on the gem mine.',
            'Peep super scouts the enemy side and can burst a gem carrier from long range.',
            'Extremely difficult to land all orbs consistently in the chaotic mid-lane of Gem Grab.'
        ],
        'Bea': [
            'Charged shot can two-shot enemies contesting the gem mine from a safe distance.',
            'Supercharged mechanic rewards accurate players with devastating follow-up on gem carriers.',
            'Missing the charged shot leaves a big vulnerability window where enemies can push mid freely.'
        ],
        'Crow': [
            'Poison chip reduces healing on the enemy gem carrier, weakening their sustain in mid.',
            'Poke from range keeps enemies low HP and discourages them from contesting gems aggressively.',
            'Lacks the control and damage output to truly dominate mid lane in organized Gem Grab matches.'
        ],
        'Eve': [
            'Hatchling spawns from super provide persistent pressure near the gem mine area.',
            'Water traversal on certain Gem Grab maps gives her unique positional advantages.',
            'Moderate damage and niche map dependency keep her from being a reliable mid controller.'
        ],
        // C-TIER
        'Nita': [
            'Bear summon near the gem mine creates a distraction but is easily kited by mid controllers.',
            'Bear and Nita can pressure from two angles on mid but both deal limited damage.',
            'Outclassed by stronger mid-lane controllers who provide more consistent gem area control.'
        ],
        'Penny': [
            'Cannon turret near mid provides splash zone control but is easily destroyed by enemies.',
            'Split shots can chain in mid when enemies group near the gem mine.',
            'Both Penny and her turret are fragile, making her an unreliable mid-lane option.'
        ],
        'Frank': [
            'Stun super can hit multiple enemies on the gem mine but his wind-up is easily interrupted.',
            'High HP lets him stand on the gem mine and absorb damage as a frontline.',
            'Slow attack animation and vulnerability to knockbacks make him a poor choice for mid control.'
        ],
        'Bibi': [
            'Speed boost on charged swing helps her rush the gem mine and grab contested gems.',
            'Knockback disrupts enemy positioning around mid, pushing them off the gem spawn.',
            'Limited range means she is kited by mid-lane controllers like Emz and Sandy consistently.'
        ],
        'Gale': [
            'Pushback super clears enemies off the gem mine for temporary control of the center.',
            'Can deny enemy pushes toward your gem carrier with knockback abilities.',
            'Lacks sustained damage to hold mid lane and gets outpoked by stronger controllers.'
        ],
        'Griff': [
            'Coin burst deals solid damage to enemies grouped on the gem mine at close range.',
            'Super wave covers the mid area and hits enemies trying to collect gems.',
            'Spread pattern becomes ineffective at range, making him unable to contest mid from safe positions.'
        ],
        'Buster': [
            'Shield absorb can block damage aimed at the gem carrier, protecting them in mid.',
            'Counterattack from absorbed damage can punish enemies who commit to mid-lane fights.',
            'Shield timing is predictable and enemies can wait it out, reducing his mid-lane reliability.'
        ],
        'Doug': [
            'Healing support for the gem carrier is useful but inferior to Byron or Kit in every way.',
            'Can sustain teammates in mid-lane fights but his damage contribution is negligible.',
            'Outclassed by dedicated supports who provide better healing and more combat utility.'
        ],
        'Chester': [
            'Random super abilities make him unpredictable in mid-lane fights for gem control.',
            'Occasionally gets a strong super that can swing a gem fight in his team\'s favor.',
            'Inconsistency makes him impossible to build a reliable gem strategy around.'
        ],
        'Mandy': [
            'Focused beam can snipe enemies on the gem mine from long range with high accuracy.',
            'Charge-up time means enemies can grab gems and retreat before she fires.',
            'Outclassed by other sharpshooters who fire faster and provide better mid-lane pressure.'
        ],
        'Pearl': [
            'Heat mechanic can ramp up damage in sustained mid-lane fights near the gem mine.',
            'Decent mid-range presence when she maintains heat against grouped enemies.',
            'Loses heat quickly between fights, making her damage inconsistent in the start-stop flow of Gem Grab.'
        ],
        'Chuck': [
            'Rail dashing along walls near mid can reposition him quickly for surprise gem grabs.',
            'Wall movement provides unique angles to contest the gem mine from unexpected directions.',
            'Heavily dependent on wall layouts — many Gem Grab maps lack good rail paths near mid.'
        ],
        'Moe': [
            'Artillery splash can hit the gem mine area from extreme range without exposing himself.',
            'Minecart super zones enemies off the gem spawn for temporary control.',
            'Delayed impact and enemies\' ability to dodge makes him unreliable at securing mid consistently.'
        ],
        'Clancy': [
            'Evolving attacks become stronger over time, rewarding sustained mid-lane presence.',
            'At max evolution he can threaten the gem mine area with powerful attacks.',
            'Needs multiple supers to reach max power, making him weak during the crucial early gem fights.'
        ],
        'Meeple': [
            'Board game mechanic provides varying buffs that can sometimes benefit gem control.',
            'Adaptable playstyle might occasionally provide strong mid-lane tools.',
            'Randomness makes him unreliable for consistent gem control strategy.'
        ],
        'Leon': [
            'Invisibility allows surprise gem grabs but his squishy HP makes holding gems risky.',
            'Can assassinate the enemy gem carrier if he gets close enough while invisible.',
            'Lacks sustained mid control and is outclassed by dedicated controllers in organized play.'
        ],
        'Fang': [
            'Chain kicks can hit multiple enemies near the gem mine if they cluster together.',
            'Gap-closing super threatens enemy backline gem carriers from a distance.',
            'Relies on getting kills to snowball, and failing the initial engage leaves him exposed in mid.'
        ],
        'Buzz': [
            'Stun grapple can lock down the enemy gem carrier for a quick elimination.',
            'Passive super charge near enemies gives him threat presence around the gem mine.',
            'Grapple is easily dodged by aware players, making his engage unreliable at higher levels.'
        ],
        'Bonnie': [
            'Dual forms let her switch between safe ranged poke and aggressive melee for gem fights.',
            'Cannon form pokes mid lane while melee form can rush in for gem grabs.',
            'Neither form excels in gem control specifically, making her mediocre compared to dedicated picks.'
        ],
        'Janet': [
            'Flight super repositions her over the gem mine area but she cannot attack while flying.',
            'Decent sustained damage helps contest mid lane at medium range.',
            'Flight is mainly for repositioning and does not directly contribute to gem control.'
        ],
        'Najia': [
            'Curving snake attacks can hit enemies hiding behind walls near the gem mine.',
            'Decent at poking mid-lane opponents from unusual angles.',
            'Middling damage and lack of strong control abilities make her unreliable for gem zone dominance.'
        ],
        'Angelo': [
            'Poison arrows chip enemies off the gem mine over time with persistent damage.',
            'Flight repositioning lets him cross the map for flanking plays near mid.',
            'Chip damage is too slow to secure gem control against enemies who heal or disengage quickly.'
        ],
        'Shade': [
            'Shadow stealth allows surprise attacks on the enemy gem carrier from unexpected angles.',
            'Burst damage from stealth can eliminate a gem-loaded target before they react.',
            'Lacks sustained mid control and contributes little to team gem collection after his burst combo.'
        ],
        'Mico': [
            'Wall jumps provide unique angles to reach the gem mine from unexpected positions.',
            'Burst damage can eliminate an enemy gem carrier in a single engage.',
            'Low HP and short range make him vulnerable in the sustained mid-lane fights of Gem Grab.'
        ],
        // D-TIER
        'Shelly': [
            'Close-range only — mid-lane controllers easily keep her away from the gem mine.',
            'Cannot hold center lane against any brawler with decent range, leaving her useless for gem control.',
            'Contributes nothing to Gem Grab strategy since she lacks control, support, and mid-lane presence.'
        ],
        'Colt': [
            'Narrow bullet spread is impossible to land consistently in the chaotic mid-lane of Gem Grab.',
            'Squishy and lacks any utility for gem control, making him a liability on the team.',
            'Other sharpshooters like Belle provide far more value for backline gem support roles.'
        ],
        'Bull': [
            'Close-range tank with no way to reach mid lane against competent controllers.',
            'Gets poked down before reaching the gem mine and cannot collect gems safely.',
            'Completely outclassed by Rosa and other tanks who have better tools for holding mid.'
        ],
        'Brock': [
            'Slow rockets are easy to dodge around the gem mine, providing unreliable damage.',
            'Low HP makes him vulnerable to aggressive plays from enemy mid-lane brawlers.',
            'Wall-breaking is occasionally useful but does not compensate for his poor gem control abilities.'
        ],
        'Dynamike': [
            'Lobbed attacks miss constantly in the fast-paced mid-lane fighting of Gem Grab.',
            'Assassins immediately target and eliminate him, making him unable to hold any position.',
            'Far too inconsistent and fragile to be viable in a mode that demands sustained mid presence.'
        ],
        'El Primo': [
            'Gets kited by every mid-lane controller, never reaching the gem mine in a meaningful way.',
            'No ranged options mean he stands around taking poke damage while contributing nothing.',
            'Only useful if he already has super, and even then mobile enemies dodge his jump easily.'
        ],
        'Barley': [
            'Area denial over the gem mine is easily walked through by aware opponents.',
            'Dies instantly to any aggro brawler who closes the gap, losing all his gems.',
            'Outclassed by Sprout and other controllers who deny areas more effectively and survive longer.'
        ],
        'Tick': [
            'Lowest HP in the game makes him the first target eliminated in mid-lane fights.',
            'Mines on the gem area are too slow to land, letting enemies grab gems between detonations.',
            'Completely dependent on protection and provides minimal value if the enemy team pushes aggressively.'
        ],
        '8-Bit': [
            'Slowest brawler in the game cannot rotate between lanes or reposition around mid effectively.',
            'Gets surrounded and eliminated easily because he cannot escape from aggressive plays.',
            'Damage turret forces him to stay in one spot, making gem collection and retreating impossible.'
        ],
        'Carl': [
            'Boomerang pickaxe is easy to dodge in mid-lane, providing inconsistent gem area pressure.',
            'Must wait for pickaxe return before attacking again, creating windows for enemies to grab gems.',
            'Outclassed by every dedicated mid controller who can fire more frequently and control space better.'
        ],
        'Jacky': [
            'Extremely short range means she never reaches the gem mine against any competent team.',
            'Gets kited endlessly by mid controllers while contributing no damage or control.',
            'Other tanks like Rosa provide far better gem area presence with better range and shields.'
        ],
        'R-T': [
            'Split mechanic is clumsy in the tight mid-lane area and both halves are easy to eliminate.',
            'Neither form provides meaningful gem control or pressure on the mine.',
            'Outclassed by every other brawler for mid-lane presence in Gem Grab.'
        ],
        'Squeak': [
            'Sticky bombs detonate too slowly — enemies grab gems and walk away before they explode.',
            'Delayed damage provides zero immediate threat to anyone contesting the gem mine.',
            'Cannot prevent enemy gem collection because all his damage arrives after they have already moved.'
        ],
        'Piper': [
            'High damage at range but cannot hold mid lane where fights are predominantly close-to-mid range.',
            'Squishy HP means any aggro brawler eliminates her instantly if they push mid.',
            'Gem Grab maps are too wall-heavy and tight for her long-range sniping to be effective.'
        ],
        'Darryl': [
            'Auto-roll engage is predictable and mid controllers easily dodge or punish his arrival.',
            'Squishy after his initial burst, leaving him stranded in mid with no way to retreat safely.',
            'Has no tools for sustained gem control — he either gets a kill or dies trying.'
        ],
        'Rico': [
            'Bounce shots can be useful in tight Gem Grab corridors but his squishy HP is a liability.',
            'Lacks any utility or control for the gem mine area beyond raw damage.',
            'Gets outperformed by dedicated mid controllers who provide area denial along with damage.'
        ],
        'Stu': [
            'Dash mobility is useful but he lacks the HP and control to hold mid lane effectively.',
            'Good at poking but cannot secure gem control against dedicated mid controllers like Sandy.',
            'Too fragile to carry gems — he gets focused and eliminated before retreating with gems.'
        ],
        'Edgar': [
            'Jump engage is telegraphed and mid controllers easily punish him when he lands.',
            'Cannot hold mid lane or carry gems — he exists only to dive and hope for a kill.',
            'Lifesteal is irrelevant when multiple enemies focus him down immediately after jumping in.'
        ],
        'Mortis': [
            'Dash engage into the mid-lane gets punished by grouped enemies protecting their gem carrier.',
            'Cannot hold a lane or control the gem mine — he relies entirely on picks that rarely work.',
            'Gets destroyed by mid controllers like Emz and Sandy who counter his close-range playstyle.'
        ],
        'Sam': [
            'Knuckle throw is telegraphed, letting enemies dodge and punish him at the gem mine.',
            'Teleport engage into mid is predictable and easily countered by positioned teams.',
            'Lacks sustained control and provides no utility for gem collection or defense.'
        ],
        'Grom': [
            'X-pattern artillery is too inconsistent to reliably hit enemies at the gem mine.',
            'Assassins immediately delete him, and Gem Grab has many paths for flanking aggro players.',
            'Outclassed by other throwers and controllers who provide more consistent mid-lane value.'
        ],
        'Kenji': [
            'Katana dash aggro is strong but Gem Grab punishes hyper-aggressive playstyles.',
            'Cannot hold gems effectively — his role is eliminations, not collection and control.',
            'Gets countered by mid controllers and supports who sustain through his burst damage.'
        ],
        'Lily': [
            'Fast dash engage is punished in the grouped-up mid-lane fights of Gem Grab.',
            'Assassin playstyle conflicts with the mode\'s need for sustained gem control and defense.',
            'Contributes kills occasionally but not the consistent mid presence Gem Grab demands.'
        ],
        'Draco': [
            'Close-range fire breath is strong but mid controllers keep him at distance and kite him.',
            'Cannot reach the gem mine against organized teams who maintain range advantage.',
            'Excels in other modes but Gem Grab\'s emphasis on mid control counters his engage-heavy kit.'
        ],
        'Larry & Lawrie': [
            'Split duo is individually too weak to contest the gem mine against mid controllers.',
            'Losing one unit halves his combat power, which happens frequently in the constant mid fighting.',
            'Neither unit provides meaningful gem control, making them a liability in organized Gem Grab play.'
        ],
        'Cordelius': [
            'Shadow realm isolates one enemy but leaves your team 2v2 on the gem mine while you duel.',
            'Pulling someone into shadow realm does not help control gems if your team loses the surface fight.',
            'Gem Grab is a team-focused mode where his 1v1 isolation mechanic works against the team\'s needs.'
        ]
    },
    'Brawl Ball': {
        // S-TIER
        'Frank': [
            'Stun super catches multiple enemies grouped near the ball or goal for devastating team wipes.',
            'Highest HP in the game lets him body-block the goal and absorb all incoming damage.',
            'Active Noise Cancelling gadget prevents interrupts, letting him guarantee his stun lands.'
        ],
        'Bibi': [
            'Knockback home-run swing sends the ball flying across the field toward the enemy goal.',
            'Speed boost on charged swing makes her one of the fastest ball carriers in the game.',
            'Strong melee damage and HP let her brawl her way through defenders to score.'
        ],
        'Darryl': [
            'Auto-charging roll lets him barrel straight into the goal area carrying the ball.',
            'High close-range burst eliminates defenders and clears the path for scoring.',
            'Steel Hoops shield on roll makes him tanky enough to survive the dive into enemy territory.'
        ],
        'Mortis': [
            'Dash attacks let him pick up the ball and dash through the entire enemy team to score.',
            'Best ball carrier in the game — three rapid dashes cover massive distance toward the goal.',
            'Can chain kills on weakened enemies with healing super, then walk the ball in unopposed.'
        ],
        'Fang': [
            'Chain super kicks through multiple defenders clearing the path to the goal in seconds.',
            'Speed and gap-closing ability make him an excellent ball carrier who is hard to stop.',
            'Super resets on kill, allowing him to wipe the entire defense and score in one sequence.'
        ],
        'Melodie': [
            'Orbiting notes damage any defender who tries to stop her while she carries the ball.',
            'High mobility lets her weave through the defense and reach the goal with the ball.',
            'Passive damage aura makes her punishing to approach, giving her free ball-carry space.'
        ],
        'Draco': [
            'Fire breath shreds any defender who stands between him and the goal at close range.',
            'Tank-level HP means he absorbs defensive hits while carrying the ball into scoring range.',
            'Dominates the tight spaces near the goal where defenders must contest his ball carry.'
        ],
        'Kenji': [
            'Katana dash with the ball covers enormous distance and cuts through defenders instantly.',
            'Burst damage eliminates defenders in one combo, opening a clear path to the goal.',
            'Speed and lethality make him the most threatening ball carrier when his super is charged.'
        ],
        // A-TIER
        'El Primo': [
            'Super jump while holding the ball carries it directly into the goal from mid-field.',
            'Tankiest ball carrier who absorbs all defensive damage while walking it in.',
            'One of the most reliable goal scorers — super plus ball equals almost guaranteed goal.'
        ],
        'Rosa': [
            'Shield super makes her nearly unkillable while she carries the ball through defenders.',
            'High HP and close-range damage let her brawl through enemies near the goal.',
            'Grass control from super provides cover for sneaky ball advances near the sides.'
        ],
        'Bull': [
            'Charge super with the ball carries it at high speed directly toward the enemy goal.',
            'Close-range burst damage eliminates any single defender who tries to stop his charge.',
            'Tanky enough to survive hits while bull-rushing the ball into scoring position.'
        ],
        'Ash': [
            'Rage mechanic activates quickly in the constant fighting of Brawl Ball, boosting damage and speed.',
            'At full rage he outruns defenders and deals massive damage to anyone contesting the ball.',
            'Durable frontline presence clears space near the goal for teammates to score.'
        ],
        'Buzz': [
            'Stun grapple locks down the last defender, creating an open goal for the ball carrier.',
            'Passive super charge near the ball contest area gives him constant grapple threat.',
            'Strong at peeling defenders off the ball carrier with his stun combo.'
        ],
        'Surge': [
            'Teleport super lets him jump past defenders and receive a ball pass near the goal.',
            'At max stage his split shots clear the defensive line from range.',
            'Scaling power makes him increasingly dangerous as the match progresses into overtime.'
        ],
        'Stu': [
            'One-hit super charge gives him constant dashes to carry the ball with extreme agility.',
            'Can dodge defensive attacks while maintaining ball possession through rapid dash chains.',
            'Fire trail from dashes zones defenders off his ball-carry path.'
        ],
        'Colette': [
            'Percentage damage shreds tanky defenders like Frank who try to body-block the goal.',
            'Super charges through defenders and back, hitting all enemies guarding the goal line.',
            'Best counter to tank-heavy Brawl Ball compositions that rely on HP to defend.'
        ],
        'Gale': [
            'Pushback super and gadget blow enemies away from the goal, clearing scoring opportunities.',
            'Spring pad gadget launches the ball carrier over walls directly toward the goal.',
            'Defensive knockback prevents enemy ball carries by pushing them back repeatedly.'
        ],
        'Max': [
            'Speed boost super turns any teammate into a fast ball carrier who outruns defenders.',
            'Her own high speed makes her a viable ball carrier who dodges defensive attempts.',
            'Consistent damage output helps soften defenders before the ball-carry push.'
        ],
        'Tara': [
            'Group pull super near the goal gathers all defenders together for a team wipe.',
            'One well-placed super can disable the entire defense, leaving an open goal for scoring.',
            'Solid damage and shadow clones provide scouting and pressure during ball advances.'
        ],
        'Lily': [
            'Fast dash with the ball crosses half the field in seconds, outrunning most defenders.',
            'Burst damage eliminates the last defender between her and the goal instantly.',
            'Thorns punish defenders who try to trade shots at close range near the goal.'
        ],
        'Sam': [
            'Knuckle buster creates a damage zone in front of the goal, then teleports to it for scoring.',
            'Decent HP and close-range damage let him contest the ball in physical mid-field fights.',
            'Teleport mechanic allows creative goal approaches that bypass standard defensive positioning.'
        ],
        'Hank': [
            'Charged blast clears multiple defenders off the goal line with massive area damage.',
            'Tank-level HP lets him absorb shots while advancing the ball toward the enemy goal.',
            'Wall-breaking from attacks opens up new scoring lanes on certain Brawl Ball maps.'
        ],
        'Shade': [
            'Shadow stealth while carrying the ball makes him invisible — defenders cannot target him.',
            'Burst damage from stealth eliminates the goalkeeper before they can react.',
            'Stealth ball-carry is one of the most difficult mechanics for the enemy team to counter.'
        ],
        // B-TIER
        'Shelly': [
            'Super chain at close range can clear defenders near the goal with knockback.',
            'Bush camping on Brawl Ball maps lets her ambush ball carriers at close range.',
            'Decent in casual play but her lack of range makes her unreliable at higher levels.'
        ],
        'Nita': [
            'Bear summon near the goal creates a tanky distraction that defenders must deal with.',
            'Bear can body-block the goal while Nita pushes the ball in from behind.',
            'Both Nita and bear have limited damage, making them easy to clear for coordinated defenses.'
        ],
        'Poco': [
            'Area healing super keeps ball carriers alive through the defensive gauntlet near the goal.',
            'Da Capo passive healing sustains the team during prolonged ball-fight exchanges.',
            'Zero damage threat means defenders can completely ignore him and focus on the ball carrier.'
        ],
        'Emz': [
            'Spray damage punishes defenders who group up near the goal, clearing space for scoring.',
            'Slowing super prevents enemy ball carries and gives her team time to set up defense.',
            'Lacks the mobility or HP to carry the ball herself, limiting her to a support role.'
        ],
        'Gene': [
            'Pull super can yank the ball carrier into his team for an instant turnover.',
            'Decent poke damage softens defenders before the ball-carry push begins.',
            'Relies entirely on landing his pull — missing it leaves him with low impact in ball fights.'
        ],
        'Sandy': [
            'Sandstorm invisibility lets the ball carrier advance unseen toward the enemy goal.',
            'Wide attacks help contest the ball in mid-field scraps and clear space.',
            'Better suited to control modes — Brawl Ball\'s fast pace does not fully leverage his sandstorm.'
        ],
        'Amber': [
            'Continuous flame stream melts defenders grouped near the goal at mid range.',
            'Fire puddle super on the goal line prevents enemy scoring attempts.',
            'Lacks the ball-carrying tools and HP to be a primary scorer herself.'
        ],
        'Meg': [
            'Mech form is a dominant ball carrier with massive HP and damage that defenders cannot stop.',
            'In mech she can walk through the entire defense and score almost unopposed.',
            'Base form is a massive liability — losing mech mid-play often results in conceding a goal.'
        ],
        'Lola': [
            'Ego clone placed near the goal doubles her defensive or offensive damage output.',
            'Can zone defenders off the goal with clone damage while her team pushes the ball.',
            'Stationary clone is limited in a mode where positioning shifts constantly around the ball.'
        ],
        'Bonnie': [
            'Cannon form pokes defenders from range while melee form rushes in to carry the ball.',
            'Dual-form versatility lets her adapt between defense and ball-carry within a single play.',
            'Neither form is top-tier for ball-carrying, making her a jack of all trades in Brawl Ball.'
        ],
        'Buster': [
            'Shield absorb blocks defensive fire aimed at the ball carrier, protecting team scoring plays.',
            'Counterattack from absorbed damage can punish defenders who try to stop the push.',
            'Predictable shield timing lets defenders wait it out before resuming their defensive play.'
        ],
        'Mico': [
            'Wall jumps let him approach the goal from unexpected angles while carrying the ball.',
            'Burst damage eliminates a single defender to create a gap in the goal defense.',
            'Low HP means he often dies before reaching the goal against coordinated defensive teams.'
        ],
        'Edgar': [
            'Jump super directly onto the goal area while holding the ball for a surprise score attempt.',
            'Lifesteal keeps him alive during the close-range brawl near the goal line.',
            'Telegraphed jump is easily countered by defenders who save knockback abilities for his landing.'
        ],
        'Pam': [
            'Healing turret placed near mid sustains the team during extended ball-fight exchanges.',
            'Tanky enough to hold the ball and absorb hits while teammates push forward.',
            'Slow movement and lack of ball-carry speed make her an easy target for fast defenders.'
        ],
        'Ollie': [
            'Area control abilities restrict defender movement near the goal, creating scoring lanes.',
            'Dual form lets him switch between defensive hold and aggressive ball support.',
            'Complexity of managing forms in the fast pace of Brawl Ball reduces his consistency.'
        ],
        'Cordelius': [
            'Shadow realm pulls one defender out of the fight, creating a numbers advantage for scoring.',
            'Strong 1v1 dueling in shadow means the pulled defender rarely returns alive.',
            'Team is 2v2 on the surface while he duels, which can backfire if the ball situation changes.'
        ],
        'Berry': [
            'Freeze on defenders locks them in place, letting the ball carrier walk past to score.',
            'Area denial near the goal prevents defenders from positioning effectively.',
            'Better suited to control modes — Brawl Ball\'s fast pace does not always let freeze build up.'
        ],
        // C-TIER
        'Colt': [
            'Silver Bullet gadget breaks walls to open up direct scoring lanes on any map.',
            'High DPS can shred a defender if all shots connect during a ball push.',
            'Narrow spread misses constantly in chaotic ball fights, making his damage unreliable.'
        ],
        'Jessie': [
            'Scrappy turret placed near the goal provides persistent defensive pressure.',
            'Bounce shots chain between grouped attackers pushing the ball, hitting multiple targets.',
            'Low individual damage and fragile turret make her easy to overrun during coordinated pushes.'
        ],
        'Rico': [
            'Bounce shots off walls near the goal can hit defenders hiding behind cover.',
            'Excels on Brawl Ball maps with tight corridors and lots of walls to bounce off.',
            'Squishy HP and wall-dependency make him a niche pick that only works on specific maps.'
        ],
        'Carl': [
            'Pickaxe provides consistent mid-range damage during ball-fight exchanges.',
            'Super spin attack can clear space around the ball and push through defenders.',
            'Predictable boomerang and slow attack cycle let defenders easily play around him.'
        ],
        'Jacky': [
            'Ground pound attack hits in an area around her, useful in the tight spaces near goals.',
            'High HP lets her tank shots while contesting the ball in close-range scraps.',
            'Extremely short range means she is kited by any defender with basic movement skills.'
        ],
        'Penny': [
            'Cannon turret behind the defense provides splash damage on grouped ball carriers.',
            'Split shot chains between enemies pushing the ball together.',
            'Both Penny and turret are fragile, and turret is static in a mode where the action moves constantly.'
        ],
        'Bo': [
            'Mines placed near the goal create a defensive trap zone that enemies must avoid.',
            'Totem gadget charges team supers faster, accelerating defensive and offensive super plays.',
            'Mines are avoidable and his damage is mediocre for the direct combat Brawl Ball demands.'
        ],
        'Sprout': [
            'Wall super blocks the goal entrance or creates cover for ball-carry advances.',
            'Lobbing attack reaches over walls to hit defenders positioned behind cover near the goal.',
            'Wall placement can accidentally trap your own teammates or block your own scoring attempts.'
        ],
        'Lou': [
            'Freeze buildup on ball carriers disrupts their ability to score by slowing and stunning them.',
            'Slippery zone super on the goal area makes it extremely hard for enemies to score.',
            'Freeze takes too many hits to activate, and fast ball carriers run through before it procs.'
        ],
        'Ruffs': [
            'Power-up drops on ball carriers permanently increase their HP for surviving defensive hits.',
            'Team buff approach makes the primary ball carrier more durable over time.',
            'Low personal combat means he contributes little to the physical ball fights himself.'
        ],
        'Griff': [
            'Coin burst deals high damage to enemies grouped near the ball in close range.',
            'Super wave can clear defenders off the goal line for a brief scoring window.',
            'Spread pattern is ineffective at range, making him only useful in point-blank ball scraps.'
        ],
        'Gus': [
            'Spirit shield on the ball carrier absorbs a hit that would otherwise stop their advance.',
            'Poke damage softens defenders from mid range before the ball push.',
            'Inconsistent shield uptime and low damage make him a weak support option in Brawl Ball.'
        ],
        'Doug': [
            'Healing the ball carrier keeps them alive through the defensive line on their scoring run.',
            'Support sustain is useful but far less impactful than Poco or Byron in this role.',
            'Provides almost no defensive value when the enemy team has the ball.'
        ],
        'Mandy': [
            'Focused beam can snipe defenders from long range to thin out the defense before a push.',
            'Charge-up delay means fast ball carriers bypass her before she fires.',
            'Cannot contest the ball in close range and provides no mobility for scoring plays.'
        ],
        'Pearl': [
            'Heat ramp-up deals strong sustained damage in prolonged ball-fight exchanges near the goal.',
            'Mid-range presence helps soften defenders during the approach to the goal.',
            'Loses heat between engagements and lacks ball-carrying tools, limiting her Brawl Ball impact.'
        ],
        'Chuck': [
            'Rail dash along walls can reposition him quickly to intercept ball carriers or make scoring runs.',
            'Unique movement provides unexpected defensive rotations on wall-heavy maps.',
            'Wall-dependent mobility fails on open Brawl Ball maps and makes him predictable.'
        ],
        'Maisie': [
            'Charged shot can eliminate a defender from safe range before the ball push starts.',
            'Consistent poke helps wear down the defense during the build-up to a scoring play.',
            'Lacks ball-carrying speed and close-range tools to actually push the ball into the goal.'
        ],
        'Juju': [
            'Curse on defenders forces them to either take damage or abandon their defensive position.',
            'Zone control near the goal area can restrict where defenders stand.',
            'Curse damage is too slow for the fast pace of Brawl Ball — enemies score before it procs.'
        ],
        'Meeple': [
            'Random buffs can occasionally provide useful bonuses for ball fights.',
            'Adaptable kit might sometimes give him ball-carrying or defensive advantages.',
            'Randomness is terrible for a mode that demands consistent and reliable plays.'
        ],
        'Najia': [
            'Curving attacks hit defenders positioned behind walls near the goal.',
            'Unique attack angle provides coverage that straight-shooting brawlers cannot match.',
            'Middling damage and no ball-carrying tools make her a weak pick for Brawl Ball.'
        ],
        'Eve': [
            'Hatchling spawns from super create distractions near the goal for defenders to deal with.',
            'Water traversal is occasionally useful on specific Brawl Ball maps with water features.',
            'Moderate damage and map-dependent utility make her an inconsistent choice.'
        ],
        'Janet': [
            'Flight super repositions over the defense but she cannot carry the ball while flying.',
            'Decent damage helps thin out defenders from mid range before a push.',
            'Cannot attack or hold the ball during flight, severely limiting her scoring potential.'
        ],
        'Crow': [
            'Poison reduces healing on defenders, weakening their ability to sustain against ball pushes.',
            'High mobility lets him poke defenders and retreat safely before committing to a push.',
            'Low damage and squishy HP make him unable to carry the ball through any serious defense.'
        ],
        'Leon': [
            'Invisibility can set up surprise ball grabs and sneaky scoring runs.',
            'Close-range burst damage eliminates a single defender for a brief numbers advantage.',
            'Squishy HP means he gets deleted if the defense spots him, wasting the scoring opportunity.'
        ],
        'Clancy': [
            'Evolving attacks become stronger each super, rewarding sustained presence in ball fights.',
            'At max evolution he can threaten the goal area with powerful attacks.',
            'Needs multiple supers to reach full power — most Brawl Ball games end before he peaks.'
        ],
        'Larry & Lawrie': [
            'Split duo can cover more defensive ground with two bodies near the goal.',
            'One unit can contest the ball while the other covers a passing lane.',
            'Both units are individually too weak to contest the ball against any real ball carrier.'
        ],
        // D-TIER
        'Brock': [
            'Slow rockets miss constantly in the fast-paced ball fights around the goal.',
            'Lowest HP tier means any ball carrier runs through him without slowing down.',
            'Wall-breaking is his only Brawl Ball utility, but it is not worth a team slot.'
        ],
        'Piper': [
            'Cannot function in Brawl Ball — every fight happens at close range around the ball.',
            'Zero close-range damage means any ball carrier walks past her for a free goal.',
            'One of the worst brawlers in Brawl Ball with no ball-carrying, defending, or scoring ability.'
        ],
        'Dynamike': [
            'Lobbed attacks miss every ball carrier who is moving at normal speed toward the goal.',
            'Assassins and ball carriers immediately target and eliminate him from the field.',
            'His only value is Dyna-Jump trick shots that require extraordinary skill and rarely work.'
        ],
        'Barley': [
            'Area denial on the goal is walked through by any ball carrier with basic awareness.',
            'Dies instantly to any brawler who approaches him with the ball.',
            'Damage over time is far too slow to stop a fast ball-carry push toward the goal.'
        ],
        'Tick': [
            'Lowest HP in the game — literally any ball carrier one-shots him on the way to the goal.',
            'Mines land too slowly to stop a ball advance in progress.',
            'Completely unable to carry, defend, or contest the ball in any meaningful way.'
        ],
        '8-Bit': [
            'Slowest movement speed makes him unable to contest the ball or defend against fast carriers.',
            'Cannot rotate between defense and offense quickly enough for the mode\'s rapid pace.',
            'Static damage turret is useless in a mode where the action moves constantly across the field.'
        ],
        'Belle': [
            'Mark super has some value but she cannot physically contest the ball at any range.',
            'Squishy and immobile — ball carriers run past her and she cannot chase them down.',
            'Long-range playstyle is completely mismatched with Brawl Ball\'s close-quarters ball fights.'
        ],
        'Nani': [
            'Converging orbs require precision that is nearly impossible in chaotic ball-fight situations.',
            'Peep super is slow and useless in a mode where split-second plays decide goals.',
            'Cannot carry, defend, or contest the ball — she exists only to occasionally snipe from range.'
        ],
        'Grom': [
            'X-pattern bombs are too slow and inconsistent to hit ball carriers in motion.',
            'Immediately targeted by ball carriers who see him as a free kill on the way to goal.',
            'Zero ball-carrying or defensive ability makes him a wasted team slot in Brawl Ball.'
        ],
        'R-T': [
            'Split mechanic is clumsy around the ball and both halves are too weak to contest.',
            'Neither form can carry the ball effectively or defend the goal against real threats.',
            'One of the worst possible picks for Brawl Ball with no synergy for the mode.'
        ],
        'Squeak': [
            'Sticky bombs detonate long after the ball carrier has already scored the goal.',
            'Zero immediate threat means ball carriers completely ignore him during scoring runs.',
            'Delayed damage is the worst possible mechanic for a mode that demands instant impact.'
        ],
        'Chester': [
            'Random super abilities cannot be relied on for consistent ball defense or scoring.',
            'Sometimes gets a useful super, but more often gets something completely useless for the situation.',
            'Brawl Ball demands reliability and Chester is the definition of inconsistent.'
        ],
        'Bea': [
            'Charged shot can eliminate one defender but she has no tools for ball play beyond that.',
            'Squishy HP and slow follow-up after charged shot leave her vulnerable to ball carriers.',
            'One-dimensional sniper playstyle does not translate to Brawl Ball\'s physical ball contests.'
        ],
        'Mr. P': [
            'Porter station is static and the ball fight moves away from it within seconds.',
            'Low damage per hit means ball carriers shrug off his attacks while scoring.',
            'Porters are too weak and slow to meaningfully interfere with ball advances toward the goal.'
        ],
        'Byron': [
            'Healing support is useful but he cannot physically contest the ball or defend the goal.',
            'Squishy and slow — ball carriers target him as the weakest link on the defense.',
            'Better in control modes where sustained healing has time to provide value over ball-carry speed.'
        ],
        'Otis': [
            'Silence super can shut down one ball carrier but his damage is too low to follow up alone.',
            'Short range and mediocre stats make him a liability in the physical ball fights.',
            'Other brawlers provide better crowd control options that actually stop ball advances.'
        ],
        'Willow': [
            'Possession super on the ball carrier is strong in theory but slow to charge in Brawl Ball.',
            'Cannot contest the ball physically and relies entirely on her super for impact.',
            'Squishy and immobile, making her an easy target for aggressive ball carriers.'
        ],
        'Gray': [
            'Portal link provides creative rotation options but he lacks any ball-fight presence.',
            'Lowest combat stats make him the first elimination in any ball contest near the goal.',
            'Teleporting teammates is niche and rarely more valuable than just having a stronger brawler.'
        ],
        'Angelo': [
            'Poison chip damage is too slow to stop ball carriers who are already running toward the goal.',
            'Flight repositioning cannot carry the ball and is mainly for escape, not scoring.',
            'Zero ball-carrying, zero immediate defensive impact — a wasted slot in Brawl Ball.'
        ],
        'Charlie': [
            'Web traps can slow ball carriers but they are avoidable and her damage is mediocre.',
            'Control-oriented kit is mismatched with Brawl Ball\'s need for speed and physical ball play.',
            'Better in modes where area denial has more time to provide value than fast-paced Brawl Ball.'
        ]
    }
,
    'Showdown': {
        // S-TIER
        'Leon': [
            'Invisibility super is the best ambush tool in Showdown, letting him pick fights on his own terms.',
            'High burst damage at close range ensures he wins most 1v1 encounters after going invisible.',
            'Can scout for power cubes and steal them safely while invisible, snowballing into the late game.'
        ],
        'Surge': [
            'Each super upgrade permanently increases his power, making him scale harder than any other brawler in Showdown.',
            'At max stage his split shots and extended range let him dominate the final circles with ease.',
            'Teleport super helps him escape pinches and reposition when the poison cloud forces confrontations.'
        ],
        'Edgar': [
            'Auto-charging super lets him jump on unsuspecting enemies collecting power cubes without warning.',
            'Lifesteal sustain means he can chain fights back-to-back without needing to heal between engagements.',
            'Thrives in Showdown\'s chaotic environment where isolated squishies are easy prey for his dive.'
        ],
        'Melodie': [
            'Orbiting notes punish anyone who tries to bush camp near her, making her safe in close quarters.',
            'Excellent 1v1 ability since most brawlers cannot approach her without taking passive note damage.',
            'Strong late-game presence where the shrinking map forces enemies into her deadly close-range orbit.'
        ],
        'Lily': [
            'Fast dash lets her engage or escape at will, giving her total control over which fights she takes.',
            'Thorn damage punishes enemies who try to trade at close range, winning her most 1v1 duels.',
            'Exceptional at hunting down weakened brawlers and finishing them off before they can heal or hide.'
        ],
        'Draco': [
            'Fire breath combined with massive HP makes him nearly unbeatable in the 1v1 fights Showdown revolves around.',
            'Power cubes amplify his already huge HP pool, turning him into an unkillable monster in the late game.',
            'Dominates bush encounters where enemies stumble into his close-range fire breath and get melted instantly.'
        ],
        'Kenji': [
            'Katana dash delivers instant burst kills on isolated targets, perfect for Showdown\'s solo format.',
            'High mobility lets him chase fleeing enemies and secure eliminations before they escape.',
            'Chain combo potential lets him clean up multiple weakened brawlers during chaotic late-game engagements.'
        ],
        'Shade': [
            'Stealth mechanic makes him nearly impossible to track in Showdown\'s bush-heavy maps.',
            'Ambush damage from stealth wins 1v1 fights before enemies can react or fight back.',
            'Can safely scout power cube locations while invisible, collecting cubes with minimal risk.'
        ],
        'Mico': [
            'Wall jump mobility lets him escape pinches and access power cubes in hard-to-reach locations.',
            'Burst damage eliminates enemies quickly in solo encounters, securing power cubes from kills.',
            'Unpredictable movement angles make him extremely hard to pin down when multiple enemies are nearby.'
        ],
        // A-TIER
        'Shelly': [
            'Super chain with her shotgun can melt anyone at point blank, making bush camping very effective.',
            'Strong in close-range bush encounters that frequently occur on most Showdown maps.',
            'Easy to play and scales well with power cubes due to her raw burst damage output.'
        ],
        'Bull': [
            'Massive close-range damage destroys anyone who walks into his bush, making him a lethal camper.',
            'High HP pool makes him durable in 1v1 brawls and lets him survive encounters that would kill others.',
            'Charge super provides an escape when the poison cloud closes in or multiple enemies converge.'
        ],
        'Darryl': [
            'Auto-charging roll lets him ambush enemies on demand without needing to land attacks first.',
            'Strong burst damage after rolling into targets secures quick kills and power cube steals.',
            'Steel hoops protection during his roll makes him deceptively tanky when initiating fights.'
        ],
        'Buzz': [
            'Grapple stun guarantees follow-up damage, making his 1v1 potential extremely strong in solo play.',
            'Passive super charge from nearby enemies means he always has his engage ready during encounters.',
            'Excels at punishing enemies who linger too close to bushes or choke points on the map.'
        ],
        'Crow': [
            'Poison prevents enemy healing between fights, giving him a massive advantage in Showdown\'s attrition-style gameplay.',
            'Can chip enemies from a distance and then finish them off with his dive super when they\'re low.',
            'Excellent at third-partying weakened survivors and stealing kills at the perfect moment.'
        ],
        'Spike': [
            'Burst damage from a well-aimed cactus grenade can instantly eliminate enemies holding power cubes.',
            'Slowing super zone traps enemies in the shrinking map, making it nearly impossible for them to escape.',
            'Split projectiles are effective at checking bushes and poking enemies out of hiding spots.'
        ],
        'Amber': [
            'Continuous flame stream is devastating in bush encounters where enemies cannot dodge the sustained damage.',
            'Fire puddle super controls choke points on the shrinking map, denying escape routes to enemies.',
            'Huge ammo pool lets her pressure and zone multiple enemies without running out of firepower.'
        ],
        'Fang': [
            'Chain super kicks let him snowball fights by bouncing between weakened enemies for multiple eliminations.',
            'Strong gap-closing ability makes it hard for ranged brawlers to kite him in 1v1 scenarios.',
            'Super resets on kill allow him to chain eliminations during chaotic late-game situations.'
        ],
        'Stu': [
            'One-hit super charge gives him constant dashes to dodge attacks and reposition in every fight.',
            'Extremely agile playstyle makes him nearly impossible to pin down in the open field.',
            'Can weave between multiple enemies during the final circles without committing to any losing fight.'
        ],
        'Mortis': [
            'Dash attacks let him chase down fleeing enemies and secure eliminations that others would miss.',
            'Healing super sustains him through back-to-back fights, keeping him alive during extended encounters.',
            'Punishes squishies and throwers who lack the close-range tools to duel him effectively.'
        ],
        'Angelo': [
            'Poison arrows chip enemies down from range, softening targets for a finishing engage.',
            'Flight ability provides unmatched scouting and escape potential on any Showdown map.',
            'Can safely poke into bushes from the air, revealing campers without putting himself at risk.'
        ],
        'Moe': [
            'Artillery splash safely farms damage from extreme range, letting him weaken targets before committing.',
            'Minecart super zones enemies into unfavorable positions during the chaotic final circles.',
            'Can contest power cubes from a distance without ever exposing himself to direct combat.'
        ],
        'Berry': [
            'Freeze mechanic locks down enemies in 1v1 fights, removing their ability to dodge or fight back.',
            'Excellent at punishing aggressive players who try to rush him by freezing them mid-approach.',
            'Area denial with freeze zones controls the shrinking map and forces enemies into bad positions.'
        ],
        'Kit': [
            'In solo Showdown his attach mechanic works as a self-heal, giving him strong sustain between fights.',
            'Hard to pin down due to his small hitbox and mobility, making him slippery in 1v1 encounters.',
            'Can outlast many brawlers in prolonged duels thanks to persistent self-sustain mechanics.'
        ],
        'Cordelius': [
            'Shadow realm super guarantees an isolated 1v1 duel, which is exactly what Showdown is about.',
            'Stat boosts in the shadow realm mean he wins nearly every forced duel against trapped opponents.',
            'Forces enemies to keep their distance, giving him space to collect power cubes safely.'
        ],
        // B-TIER
        'El Primo': [
            'High HP and power cube scaling can turn him into an unstoppable tank in the late game.',
            'Devastating in bush encounters where enemies cannot avoid his close-range punches.',
            'Gets kited by ranged brawlers in the open, making him inconsistent until the map shrinks.'
        ],
        'Rosa': [
            'Shield super makes her nearly unkillable in 1v1 fights for its duration.',
            'Strong in bush-heavy maps where she can force close-range engagements on her terms.',
            'Limited range means she struggles to collect power cubes on open areas of the map.'
        ],
        'Bibi': [
            'Speed boost on charged swing helps her chase enemies or flee from losing fights.',
            'Knockback home-run swing creates distance against aggressive brawlers in 1v1 encounters.',
            'Solid melee stats but outclassed by S-tier close-range brawlers like Draco and Kenji.'
        ],
        'Frank': [
            'Highest base HP in the game makes him extremely hard to kill, especially with power cubes.',
            'Stun super can lock down enemies in crucial 1v1 moments, guaranteeing follow-up damage.',
            'Slow attack wind-up makes him vulnerable to mobile assassins who can dodge and punish him.'
        ],
        'Bo': [
            'Mines provide area denial and vision control, revealing bush campers and protecting his position.',
            'Decent range lets him poke safely while his mines cover flanks and escape routes.',
            'Lacks the 1v1 burst damage to finish enemies quickly, making him vulnerable to aggressive brawlers.'
        ],
        'Colette': [
            'Percentage-based damage shreds power cube-stacked tanks that other brawlers cannot deal with.',
            'Super charges through enemies for guaranteed damage, making her strong against bulky late-game targets.',
            'Struggles against squishies and low-cube targets where her percentage damage yields low total output.'
        ],
        'Ash': [
            'Rage mechanic rewards taking damage, which is unavoidable in Showdown\'s constant skirmishing.',
            'At full rage his damage and speed make him a terrifying force in close-range encounters.',
            'Needs to build rage before reaching peak power, leaving him vulnerable in early surprise fights.'
        ],
        'Meg': [
            'Mech transformation creates a massive HP and damage spike that can dominate the late game.',
            'In mech form she is one of the most threatening brawlers in any 1v1 encounter.',
            'Base form is extremely fragile, making her an easy target before she builds her first super.'
        ],
        'Bonnie': [
            'Dual form switching provides versatility to handle both ranged poke and close-range brawls.',
            'Melee form cannon jump can finish off weakened enemies or escape dangerous situations.',
            'Neither form excels enough to dominate, keeping her a solid but not exceptional pick.'
        ],
        'Sam': [
            'Knuckle buster teleport gives him engage and disengage options in 1v1 fights.',
            'Decent HP and close-range damage let him hold his own in most solo encounters.',
            'Telegraphed knuckle placement makes his engage predictable against experienced opponents.'
        ],
        'Hank': [
            'Charged blast deals massive damage that can eliminate power cube holders in one well-timed shot.',
            'High HP lets him survive encounters and charge his devastating attack between exchanges.',
            'Slow charge time gives enemies a window to burst him down before he can fire.'
        ],
        'Pearl': [
            'Heat mechanic ramps her damage up during sustained fights, rewarding aggressive playstyles.',
            'Strong in prolonged 1v1 encounters where she can maintain continuous fire on the enemy.',
            'Loses heat stacks when disengaging, making her weaker in the poke-and-hide Showdown playstyle.'
        ],
        'Buster': [
            'Absorb shield can block incoming burst damage and convert it into a powerful counterattack.',
            'Effective against enemies who commit to an all-in fight without baiting out his shield first.',
            'Shield timing is tricky and experienced players will wait it out, reducing his reliability.'
        ],
        'Clancy': [
            'Evolved attacks become powerful in the late game after building through multiple supers.',
            'Can snowball with power cubes and super upgrades into a formidable late-game threat.',
            'Weak in early encounters before he has evolved, making the early cube race difficult.'
        ],
        'Larry & Lawrie': [
            'Split duo covers more ground for scouting power cubes and watching for approaching enemies.',
            'Can pressure from two angles in fights, confusing opponents on which unit to target.',
            'Both units are individually weak, and losing one cripples their overall combat effectiveness.'
        ],
        'Najia': [
            'Snake attacks can hit enemies hiding behind cover or in bushes with curving projectiles.',
            'Decent at checking bushes safely from a distance, reducing the risk of camping ambushes.',
            'Middling damage output means she struggles to secure kills before enemies escape or heal.'
        ],
        // C-TIER
        'Nita': [
            'Bear summon creates a distraction that can tank damage while Nita deals damage from safety.',
            'Bear provides scouting by detecting bush campers when sent into suspicious areas.',
            'Bear AI is predictable and both Nita and her bear are easy targets for experienced players.'
        ],
        'Colt': [
            'High DPS when all bullets connect makes him dangerous against targets walking in straight lines.',
            'Silver Bullet wall-break can expose bush campers and create new sightlines.',
            'Narrow bullet spread is extremely hard to land in 1v1 fights against mobile enemies.'
        ],
        'Brock': [
            'Rocket damage and wall-breaking ability can expose hiding spots and deal solid burst from range.',
            'Good at poking enemies from a distance before committing to a fight.',
            'Low HP makes him an easy kill for any assassin or close-range brawler who gets near him.'
        ],
        'Jessie': [
            'Scrappy turret provides a decoy and extra damage source that helps in 1v1 duels.',
            'Turret can guard power cube locations while Jessie farms from a safer position.',
            'Low individual damage means she loses most direct 1v1 fights against meta brawlers.'
        ],
        'Poco': [
            'Self-healing abilities give him sustain between fights, letting him outlast opponents over time.',
            'Da Capo and healing super keep him alive through chip damage in prolonged encounters.',
            'Extremely low damage output means he cannot threaten or eliminate enemies efficiently.'
        ],
        'Pam': [
            'Healing station provides a safe zone for recovery between Showdown encounters.',
            'High HP and decent damage make her a capable fighter who can survive most 1v1 brawls.',
            'Stationary healing turret limits her mobility on a mode where repositioning is critical.'
        ],
        'Tara': [
            'Group pull super can catch enemies off guard in tight late-game circles for devastating damage.',
            'Shadow clones provide scouting to check bushes and reveal camper positions.',
            'Relies on landing her super to be effective, and missing it leaves her outmatched in 1v1 fights.'
        ],
        'Gene': [
            'Pull super can drag a single target into a losing position, securing an easy elimination.',
            'Decent poke damage at medium range lets him chip enemies from relative safety.',
            'Fragile HP and reliance on hitting his super make him a risky pick in Showdown\'s chaotic fights.'
        ],
        'Max': [
            'Speed boost helps her escape pinches and reposition when multiple enemies are nearby.',
            'Fast movement makes her naturally hard to hit, extending her survivability in the open.',
            'Damage output is too low to win 1v1 fights against most meta brawlers without a significant cube lead.'
        ],
        'Emz': [
            'Spray damage punishes enemies who try to push through choke points on the shrinking map.',
            'Strong at holding her ground against melee brawlers who walk into her damage zone.',
            'Vulnerable to long-range snipers and fast assassins who can attack from outside her spray range.'
        ],
        'Gale': [
            'Pushback super and gadget can save him from aggressive enemies trying to rush him down.',
            'Decent at creating space and denying enemy approaches during the final circles.',
            'Lacks the damage output to finish enemies off, often just delaying his own elimination.'
        ],
        'Sandy': [
            'Sandstorm super provides invisibility that is useful for sneaking up on enemies in solo mode.',
            'Solid area damage can hit enemies through bushes, deterring campers.',
            'In solo Showdown his team-oriented kit loses most of its value without allies to benefit.'
        ],
        'Carl': [
            'Pickaxe boomerang can check bushes at range and deals decent damage on both passes.',
            'Super spin provides burst damage in close encounters, helping him in 1v1 duels.',
            'Predictable attack pattern and forced wait for pickaxe return create exploitable openings.'
        ],
        'Rico': [
            'Wall bounce shots dominate tight corridors and wall-heavy Showdown maps.',
            'Can hit enemies around corners and in bushes using precise bounce geometry.',
            'Completely map-dependent — on open maps he loses his primary advantage and becomes weak.'
        ],
        'Jacky': [
            'Area ground pound hits through walls, letting her damage bush campers from safety.',
            'High HP makes her durable enough to survive most ambush encounters.',
            'Extremely short range means nearly every brawler can kite her on open Showdown maps.'
        ],
        'Penny': [
            'Cannon turret provides area denial and scouting that controls key map positions.',
            'Split shot punishes enemies standing behind each other in tight corridors.',
            'Both Penny and her cannon are fragile and easily destroyed by focused fire.'
        ],
        'Lola': [
            'Ego clone doubles her damage output when both she and her clone target the same enemy.',
            'Strong burst potential can win 1v1 fights when clone is positioned correctly.',
            'Stationary clone is easily avoided by mobile enemies, limiting her effectiveness in open areas.'
        ],
        'Chester': [
            'Random super abilities can occasionally provide a powerful advantage in a 1v1 duel.',
            'Unpredictable kit catches some enemies off guard who don\'t know what super he rolled.',
            'Inconsistency from random abilities makes him unreliable when you need a specific tool to survive.'
        ],
        'Chuck': [
            'Rail riding provides fast rotations and escape potential on wall-heavy Showdown maps.',
            'Can access power cubes quickly by dashing along walls across the map.',
            'Wall-dependent mobility makes him far less effective on open maps or after walls are destroyed.'
        ],
        'Charlie': [
            'Web super can trap enemies in late-game circles, setting up easy follow-up damage.',
            'Area control abilities restrict enemy movement in tight spaces as the map shrinks.',
            'Damage output is too low for aggressive play, making her a passive and predictable pick.'
        ],
        'Meeple': [
            'Random buffs can occasionally give him a combat edge in power cube fights.',
            'Adaptable playstyle based on the effects he receives each match.',
            'Randomness makes him unreliable — sometimes he gets useless buffs and becomes dead weight.'
        ],
        'Eve': [
            'Water float gives her access to safe areas of the map that most enemies cannot reach.',
            'Hatchling spawns pressure nearby enemies and help contest power cube positions.',
            'Moderate damage and map-dependent mobility limit her consistency across Showdown maps.'
        ],
        'Janet': [
            'Flight super makes her untargetable, providing a guaranteed escape from losing situations.',
            'Can scout the map from the air to plan her next move and locate remaining enemies.',
            'Cannot attack during flight and deals mediocre ground damage, limiting her kill potential.'
        ],
        'Nani': [
            'Converging orbs deal devastating burst when all three connect, winning 1v1 fights instantly.',
            'Peep super provides remote scouting and burst damage from safety.',
            'Extremely difficult to land all orbs consistently, making her a high-risk pick in most encounters.'
        ],
        'Bea': [
            'Charged shot deals massive burst damage that can two-shot most enemies in a 1v1 duel.',
            'Strong at punishing enemies walking in predictable paths toward power cubes.',
            'Missing the charged shot leaves her extremely vulnerable with low follow-up damage.'
        ],
        // D-TIER
        'Piper': [
            'Long range means nothing when enemies can close the gap using bushes and walls.',
            'Extremely fragile HP makes her an instant kill for any ambush or bush encounter.',
            'Cannot defend herself at close range, which is where most Showdown fights take place.'
        ],
        'Dynamike': [
            'Lobbed attacks are trivially easy to dodge in 1v1 scenarios against any mobile brawler.',
            'Free food for every assassin on the map who will jump him for easy power cubes.',
            'Requires perfect prediction to land attacks, and even then his damage is too slow to kill first.'
        ],
        'Barley': [
            'Area denial is less effective in Showdown where enemies simply walk away from his puddles.',
            'Fragile HP means any close-range encounter is an instant death for him.',
            'Outclassed by brawlers who deal immediate damage rather than damage-over-time that enemies avoid.'
        ],
        'Tick': [
            'Lowest HP in the game makes him die to literally any brawler who finds him in a bush.',
            'Mines are slow and easy to dodge in 1v1 situations where the enemy is focused on him.',
            'Has zero self-defense capability, making him a free elimination for anyone who approaches.'
        ],
        '8-Bit': [
            'Slowest brawler in the game cannot escape the poison cloud or reposition during fights.',
            'Easy target for every assassin and mobile brawler due to his inability to dodge anything.',
            'Damage boost turret forces him to stay stationary in a mode that demands constant movement.'
        ],
        'Mr. P': [
            'Porter spawns are too weak and slow to make an impact in fast-paced 1v1 Showdown fights.',
            'Low damage output means he cannot win direct confrontations against any meta brawler.',
            'Suitcase bounce is easy to dodge in solo encounters where the opponent is fully focused on him.'
        ],
        'Sprout': [
            'Wall super is useful for blocking paths but does not help him win actual 1v1 duels.',
            'Slow lobbing attack is easy to dodge when the enemy is watching his every move.',
            'Fragile and immobile, making him an easy elimination for any brawler that closes the gap.'
        ],
        'Lou': [
            'Freeze buildup requires multiple hits, which is too slow against brawlers who burst him down first.',
            'Slip zone super is avoidable and does not deal enough immediate damage to win fights.',
            'Outclassed by brawlers who deal instant damage instead of relying on slow freeze stacking.'
        ],
        'Byron': [
            'Heals are useless without teammates to support in solo Showdown.',
            'Stacking poison takes too long to kill enemies who can simply burst him down in one engage.',
            'Fragile HP and no self-defense tools make him easy prey for any aggressive brawler.'
        ],
        'Belle': [
            'Damage mark is designed for team focus-fire, which does not exist in solo Showdown.',
            'Decent range but her damage output is too low to win 1v1 fights against most brawlers.',
            'Bouncing shots have no value without grouped enemies, removing a core part of her kit.'
        ],
        'Grom': [
            'X-pattern artillery is nearly impossible to land against a single focused opponent in a 1v1.',
            'Extremely vulnerable to any brawler who closes the gap, which is easy to do in Showdown.',
            'Prediction-based attacks are unreliable when the enemy is solely focused on dodging him.'
        ],
        'R-T': [
            'Split mechanic provides no meaningful advantage in Showdown\'s solo survival format.',
            'Both halves are weak individually and easy for any brawler to eliminate separately.',
            'Completely outclassed by every other brawler with no niche that benefits him in this mode.'
        ],
        'Squeak': [
            'Delayed sticky bombs give enemies plenty of time to walk away before they detonate.',
            'No immediate damage threat means enemies can play aggressively against him without fear.',
            'Fragile HP and slow damage mean any direct confrontation ends badly for him.'
        ],
        'Otis': [
            'Silence super is less impactful in 1v1 fights where raw damage matters more than ability denial.',
            'Mediocre damage output and short range make him lose most Showdown encounters.',
            'Cannot trade effectively with meta brawlers who outdamage and outrange him consistently.'
        ],
        'Willow': [
            'Possession super has limited value in solo Showdown where there are no teammates to follow up.',
            'Base damage is too low to win 1v1 fights against most brawlers without her super.',
            'Fragile and slow, making her an easy target for aggressive enemies hunting power cubes.'
        ],
        'Gray': [
            'Portal link is a team utility tool with almost no value in solo Showdown.',
            'Low combat stats make him one of the weakest duelists in any direct 1v1 encounter.',
            'Provides no survival tools or damage output to compete with meta Showdown picks.'
        ],
        'Doug': [
            'Healing mechanic is team-oriented and provides minimal value in solo Showdown.',
            'Low damage output means he cannot threaten enemies or secure kills efficiently.',
            'Outclassed by every other brawler who can actually win fights and collect power cubes.'
        ],
        'Ruffs': [
            'Power-up drops are designed for teammates, making his super nearly useless in solo play.',
            'Low personal combat stats leave him outmatched in every 1v1 encounter.',
            'Team-oriented kit has no place in a solo survival mode where he must fight alone.'
        ],
        'Griff': [
            'Coin spread becomes inaccurate at range, and most Showdown fights start outside his optimal distance.',
            'Decent burst potential but outclassed by brawlers who can engage and disengage more safely.',
            'Lacks mobility and survivability tools needed to navigate the chaotic Showdown environment.'
        ],
        'Gus': [
            'Spirit shield decays quickly and does not provide enough protection to survive Showdown ambushes.',
            'Mediocre damage output means he cannot win 1v1 fights against most meta brawlers.',
            'Support-oriented kit loses value in a solo mode where he has no allies to shield.'
        ],
        'Mandy': [
            'Charged beam requires standing still, which is suicidal in Showdown\'s constant-movement gameplay.',
            'Narrow beam is easy to dodge in open 1v1 fights where enemies have full freedom to strafe.',
            'Outclassed by other sharpshooters who can fire faster and do not need to charge their shots.'
        ],
        'Ollie': [
            'Dual form complexity provides little payoff in Showdown\'s straightforward combat encounters.',
            'Neither form excels at 1v1 fighting, leaving him outmatched by dedicated combat brawlers.',
            'Control abilities are designed for team play and lose effectiveness in solo survival.'
        ],
        'Juju': [
            'Curse damage is slow and avoidable, giving enemies time to burst him down before it takes effect.',
            'Zone control tools are less valuable in Showdown where enemies can simply walk to a different area.',
            'Low immediate damage output makes him a weak duelist in the 1v1 fights that decide Showdown.'
        ],
        'Maisie': [
            'Charged shot mechanic requires patience that Showdown\'s fast-paced ambush fights do not allow.',
            'Damage output between charged shots is too low to compete with aggressive meta brawlers.',
            'Outclassed by other sharpshooters and has no survival tools to compensate for her fragility.'
        ]
    },
    'Heist': {
        // S-TIER
        'Colt': [
            'Highest sustained DPS in the game tears through the safe at incredible speed from medium range.',
            'Silver Bullet gadget breaks walls protecting the safe, opening direct lines of fire for his team.',
            'Narrow bullet spread becomes an advantage against a stationary safe target that cannot dodge.'
        ],
        'Brock': [
            'Rockets deal heavy damage to the safe from long range with consistent splash.',
            'Wall-breaking super and gadgets strip away cover that protects the safe, exposing it to the whole team.',
            'Safe range means he can damage the safe while staying behind his own defensive line.'
        ],
        'Surge': [
            'Upgraded split shots at max stage deal massive damage to the safe from extended range.',
            'Teleport super lets him bypass defenders and land directly on the safe for burst damage.',
            'Scaling power means he becomes more dangerous every time he uses his super throughout the match.'
        ],
        'Moe': [
            'Artillery splash pounds the safe from extreme range without ever needing to push past defenders.',
            'Minecart super controls the lane and forces defenders to reposition, opening the safe to damage.',
            'Can deal consistent safe damage from behind walls where the enemy team cannot reach him.'
        ],
        'Draco': [
            'Fire breath melts the safe at close range with some of the highest sustained DPS in the game.',
            'Massive HP pool lets him absorb defender damage while tanking his way to the enemy safe.',
            'Once he reaches the safe, very few brawlers can out-trade him fast enough to stop the damage.'
        ],
        'Kenji': [
            'Katana dash cuts through defenders and deals devastating burst damage directly to the safe.',
            'High mobility lets him slip past the enemy frontline and reach the safe quickly.',
            'Chain combos eliminate defenders one by one, clearing the path for his team\'s push.'
        ],
        'Amber': [
            'Continuous flame stream deals the highest sustained DPS to the safe without any reload downtime.',
            'Huge ammo pool lets her melt the safe non-stop while other brawlers must pause to reload.',
            'Fire puddle super provides area denial that prevents defenders from contesting her safe damage.'
        ],
        // A-TIER
        'Bull': [
            'Charge super closes the gap to the safe instantly, delivering massive point-blank burst damage.',
            'Highest close-range DPS combined with high HP makes him a wrecking ball once he reaches the safe.',
            'Can tank defender damage while unloading his full clip into the safe for devastating burst.'
        ],
        'Darryl': [
            'Auto-charging roll lets him reach the safe on demand without needing to build up through attacks.',
            'Strong burst damage at point blank shreds the safe quickly after rolling into position.',
            'Can roll in, unload damage on the safe, and use his second roll to escape or reposition.'
        ],
        'Rico': [
            'Bouncing bullets deal double damage in the tight corridors surrounding the safe.',
            'Wall bounces let him damage the safe from angles that defenders cannot easily block.',
            'Excels on wall-heavy Heist maps where his ricochet shots are nearly unavoidable.'
        ],
        'Colette': [
            'Percentage-based damage shreds high-HP tanks that try to defend or push toward the safe.',
            'Super charges through defenders, dealing guaranteed damage and disrupting their positioning.',
            'Strong defensive utility by eliminating tanky pushers before they can reach her team\'s safe.'
        ],
        'Spike': [
            'Burst damage from well-aimed grenades deals significant safe damage from medium range.',
            'Slowing super zone traps defenders and prevents them from contesting safe pushes.',
            'Split projectiles cover a wide area, making it easy to hit the safe even from awkward angles.'
        ],
        'Fang': [
            'Chain super kicks eliminate multiple defenders in rapid succession, opening the lane to the safe.',
            'Strong gap-closing ability lets him reach the safe past defender formations.',
            'Super resets on kills allow him to clear the entire enemy defense in one snowballing play.'
        ],
        'Stu': [
            'One-hit super charge lets him dash repeatedly to dodge defender fire while pushing toward the safe.',
            'High mobility keeps him alive longer on offense, allowing more damage output on the safe.',
            'Fire trail from dashes provides area denial that discourages defenders from chasing him.'
        ],
        'Bonnie': [
            'Cannon form pokes from range, then melee form jumps in to burst the safe at close range.',
            'Dual form versatility lets her switch between defending at range and attacking the safe up close.',
            'Melee cannon slam delivers strong burst damage directly to the safe when she closes the gap.'
        ],
        'Meg': [
            'Mech form provides massive HP and high DPS that overwhelms defenders and melts the safe.',
            'Transformed mech can absorb defender fire while dealing devastating sustained damage to the safe.',
            'Even if the mech is destroyed, she rebuilds it quickly in the constant fighting of Heist.'
        ],
        'Pearl': [
            'Heat mechanic ramps her damage to extreme levels during sustained safe attacks.',
            'Can maintain continuous fire on the safe without pause, maximizing her heat-boosted DPS.',
            'Strong at both offense and defense with her scaling damage output that rewards aggression.'
        ],
        'Clancy': [
            'Evolved attacks at max stage deal massive damage to the safe from a safe distance.',
            'Each super upgrade permanently increases his damage output, making him stronger as the match progresses.',
            'Can build up his evolution through defender fights and then unleash devastating safe damage.'
        ],
        'Barley': [
            'Area denial puddles deal consistent damage to the safe over time from behind walls.',
            'Can lob attacks over walls to damage the safe without ever exposing himself to defenders.',
            'Extra Noxious star power adds bonus tick damage that accumulates heavily on the stationary safe.'
        ],
        'Dynamike': [
            'Lobbed dynamite deals heavy splash damage to the safe from behind walls and cover.',
            'Demolition star power massively boosts his super damage, chunking the safe for huge burst.',
            'Wall-breaking super opens up the safe for his entire team\'s ranged damage dealers.'
        ],
        // B-TIER
        'Shelly': [
            'Super chain at close range can deal burst damage to the safe when she manages to get close.',
            'Decent defensive ability with her knockback super that pushes attackers away from her safe.',
            'Struggles to reach the enemy safe against coordinated defenders who keep her at range.'
        ],
        'Nita': [
            'Bear summon tanks defender fire and deals supplementary damage to the safe simultaneously.',
            'Bear can be sent to attack the safe while Nita defends or fights from a different angle.',
            'Moderate individual damage limits her safe-melting potential compared to dedicated DPS brawlers.'
        ],
        'Jessie': [
            'Scrappy turret provides persistent safe damage while Jessie fights defenders or plays defense.',
            'Bounce shots chain between grouped defenders, softening them up for teammates to finish.',
            'Turret and Jessie both have low individual damage, making her a slow but steady safe attacker.'
        ],
        'Bibi': [
            'Speed boost and knockback help her push through defenders to reach the enemy safe.',
            'Strong melee damage can chunk the safe quickly once she gets into close range.',
            'Lacks the tools to consistently reach the safe against teams with strong defensive setups.'
        ],
        'Frank': [
            'Stun super disables multiple defenders at once, opening a window for the team to push the safe.',
            'Highest HP in the game lets him absorb massive punishment while attacking the safe.',
            'Slow attack wind-up gives defenders time to burst him down before he can deal meaningful safe damage.'
        ],
        'Carl': [
            'Super spin deals high sustained DPS to the safe when he manages to get close.',
            'Pickaxe throw provides consistent poke damage from medium range between spin cooldowns.',
            'Needs to get close for his best damage, but lacks gap-closing tools to bypass defenders.'
        ],
        'Edgar': [
            'Jump super lets him bypass defenders and land directly on the safe for burst damage.',
            'Lifesteal sustain keeps him alive while he attacks the safe under defender pressure.',
            'Low HP means defenders can eliminate him quickly before he deals significant safe damage.'
        ],
        'Belle': [
            'Damage mark super on a safe-attacker forces the team to focus fire that target for extra damage.',
            'Long range lets her poke the safe consistently from a safe distance behind her frontline.',
            'Bouncing shots punish defenders who group up near the safe, dealing splash to multiple targets.'
        ],
        'Ash': [
            'Full rage mode turns him into a high-DPS machine that melts the safe at close range.',
            'High HP lets him push through defenders and tank hits while attacking the safe.',
            'Needs to build rage first, which delays his peak damage output against the safe.'
        ],
        'Griff': [
            'Coin blast deals heavy damage to the safe at close range when all projectiles connect.',
            'Super sends a wave of coins that deals significant burst to the safe from medium distance.',
            'Spread becomes inaccurate at range, requiring him to get dangerously close for maximum damage.'
        ],
        'Sam': [
            'Knuckle buster teleport lets him jump to the safe and start dealing close-range damage.',
            'Decent HP and DPS allow him to survive and deal meaningful damage once he reaches the safe.',
            'Predictable knuckle placement alerts defenders to exactly where he will appear.'
        ],
        'Hank': [
            'Charged blast deals massive single-hit damage to the safe when fully charged.',
            'Tank-level HP lets him absorb defender damage while winding up his devastating attack.',
            'Slow charge time means he deals damage in bursts rather than sustained DPS, giving defenders recovery windows.'
        ],
        'Buster': [
            'Shield absorb converts defender damage into a powerful counterattack aimed at the safe.',
            'Can protect teammates pushing the safe by standing in front and absorbing enemy fire.',
            'Shield timing is punishable — experienced defenders simply wait it out before firing.'
        ],
        'Lola': [
            'Ego clone doubles her DPS on the safe when positioned to fire alongside her.',
            'Strong burst potential when both Lola and her clone unload into the safe simultaneously.',
            'Stationary clone is easy for defenders to destroy, removing her doubled damage advantage.'
        ],
        'Maisie': [
            'Charged shot deals significant burst damage to the safe from a safe distance.',
            'Consistent poke between charged shots adds up to meaningful safe damage over time.',
            'Outclassed by dedicated DPS brawlers who deal more sustained damage without charge-up delays.'
        ],
        'Angelo': [
            'Poison arrows provide chip damage that slowly wears down the safe over time.',
            'Flight ability lets him reposition to find angles on the safe that bypass defenders.',
            'Poison DPS is too slow compared to direct damage dealers who can melt the safe faster.'
        ],
        'Melodie': [
            'Orbiting notes deal passive damage to defenders and the safe when she gets close.',
            'Strong at eliminating defenders who stand near the safe, clearing the way for teammates.',
            'Needs to get close to deal meaningful damage, which is difficult against strong defensive setups.'
        ],
        'Lily': [
            'Fast dash lets her reach the safe quickly and deal burst damage before retreating.',
            'Thorn damage punishes defenders who try to fight her near the safe.',
            'Assassin playstyle is better suited for eliminating defenders than dealing sustained safe damage.'
        ],
        'Eve': [
            'Hatchling spawns provide persistent pressure and chip damage on the safe.',
            'Water float lets her access unusual angles to damage the safe on maps with water.',
            'Moderate damage output and map dependency limit her consistency as a Heist pick.'
        ],
        'Najia': [
            'Curving snake attacks can hit the safe from unusual angles around walls and defenders.',
            'Decent at bypassing cover to land consistent poke damage on the safe.',
            'Damage output is middling and she lacks the burst to quickly chunk the safe.'
        ],
        // C-TIER
        'El Primo': [
            'Can jump onto the safe with his super, but defenders easily push him away afterward.',
            'High HP lets him survive near the safe for a few seconds of close-range damage.',
            'Lacks the DPS to justify his risky all-in playstyle compared to other safe rushers.'
        ],
        'Rosa': [
            'Shield super lets her tank defender damage while attacking the safe at close range.',
            'Decent sustained melee damage can add up if she maintains position near the safe.',
            'Limited range and no gap-closer mean she struggles to reach the safe against smart defenders.'
        ],
        'Pam': [
            'Healing station sustains teammates pushing toward the safe, keeping the offense alive longer.',
            'High HP and decent damage let her contribute on both offense and defense.',
            'Stationary healing turret limits offensive push flexibility and is easily destroyed by enemies.'
        ],
        'Bo': [
            'Mines provide defensive area denial that slows down enemy pushes toward your safe.',
            'Totem gadget accelerates team super charge, enabling faster offensive pushes.',
            'Mines are easily triggered or dodged, and his personal DPS contribution to the safe is low.'
        ],
        'Penny': [
            'Cannon turret provides supplementary safe damage from long range while Penny fights defenders.',
            'Can set up cannon to continuously shell the enemy safe while she defends her own.',
            'Both Penny and her cannon deal low damage individually, making her a slow and weak option.'
        ],
        'Gale': [
            'Pushback super and gadget can deny enemy rushes toward your team\'s safe effectively.',
            'Decent at peeling aggressive safe attackers off with knockback abilities.',
            'Provides no meaningful offensive safe damage, making him a defense-only pick with limited value.'
        ],
        'Emz': [
            'Spray damage punishes defenders who group up near the safe, dealing strong area damage.',
            'Good at holding defensive positions and slowing down enemy pushes toward your safe.',
            'Cannot reach the enemy safe from range and lacks the tools to push past defenders.'
        ],
        'Tara': [
            'Group pull super can disable multiple defenders at once, opening a window to damage the safe.',
            'Shadow clones provide scouting and distraction near the safe area.',
            'Relies completely on her super to create openings, and her base DPS on the safe is low.'
        ],
        'Max': [
            'Team speed boost helps the entire squad rush the safe faster during coordinated pushes.',
            'Fast movement speed makes her hard to hit while she pokes at defenders.',
            'Low individual damage means she barely dents the safe herself without team follow-up.'
        ],
        'Sandy': [
            'Sandstorm super lets the team approach the safe invisibly for a surprise burst push.',
            'Decent area damage helps clear defenders from around the safe.',
            'Team-oriented invisibility is his main value, but his personal safe damage is mediocre.'
        ],
        'Buzz': [
            'Stun grapple can disable a key defender, opening the safe for teammate damage.',
            'Aggressive gap-closer can bypass frontlines and reach the safe area.',
            'Low sustained DPS means he is better at eliminating defenders than actually damaging the safe.'
        ],
        'Ruffs': [
            'Power-up drops boost an ally\'s DPS, making a safe-focused teammate even more dangerous.',
            'Decent poke damage at range contributes some chip to the safe over time.',
            'Team-reliant kit means he cannot create openings alone and his own safe damage is low.'
        ],
        'Gus': [
            'Spirit shield can protect a pushing teammate, keeping them alive longer near the safe.',
            'Medium-range poke provides some chip damage to the safe from a safe distance.',
            'Shield fades quickly and his damage output is too low to be a meaningful safe threat.'
        ],
        'Mandy': [
            'Charged beam deals decent damage to the safe from long range with precision.',
            'Can poke the safe consistently from behind her team\'s defensive line.',
            'Charge time and narrow beam make her DPS too slow compared to other ranged safe damage dealers.'
        ],
        'Chester': [
            'Random super can occasionally provide a strong tool for pushing the safe or defending.',
            'Decent base damage contributes some value to both offense and defense.',
            'Inconsistency from random abilities makes him an unreliable pick for Heist\'s strategic format.'
        ],
        'Chuck': [
            'Rail riding provides fast rotations between offense and defense on the map.',
            'Can quickly reposition to contest or protect the safe when needed.',
            'Wall-dependent mobility and low DPS make him an underwhelming contributor in most Heist matches.'
        ],
        'Charlie': [
            'Web super can trap attackers near your safe, preventing them from dealing damage.',
            'Area control abilities slow down enemy pushes and protect defensive positions.',
            'Low damage output provides almost no offensive safe threat, making her defense-only.'
        ],
        'Meeple': [
            'Random buffs can occasionally boost his combat effectiveness for a push or defense.',
            'Adaptable playstyle can fill gaps in team composition when buffs align well.',
            'Randomness makes him unreliable in Heist\'s structured offense-defense format.'
        ],
        'Larry & Lawrie': [
            'Split duo can simultaneously attack the safe and defend against counter-pushes.',
            'One unit can poke the safe while the other watches for incoming attackers.',
            'Both units deal low individual damage and are easily eliminated by focused defender fire.'
        ],
        'Berry': [
            'Freeze mechanic can lock down attackers near the safe, preventing them from dealing damage.',
            'Area denial with freeze zones helps protect the safe from aggressive pushers.',
            'Provides almost no offensive safe damage, making her a purely defensive and limited pick.'
        ],
        'Nani': [
            'Converging orbs deal high burst to the safe when all three connect from the right angle.',
            'Peep super can be piloted directly into the safe for guaranteed remote damage.',
            'Difficult to consistently land all orbs on the safe with defenders pressuring her aim.'
        ],
        'Bea': [
            'Charged shot deals significant single-hit damage to the safe from long range.',
            'Consistent poke between charged shots contributes some safe damage over time.',
            'Lower sustained DPS than dedicated Heist brawlers and charged shot misses are punishing.'
        ],
        'Janet': [
            'Flight super repositions her past defenders to get angles on the safe.',
            'Decent sustained damage can contribute when she has a clear line to the safe.',
            'Cannot attack during flight and her ground DPS is outclassed by S-tier safe damage dealers.'
        ],
        'Shade': [
            'Stealth mechanic lets him sneak past defenders and reach the safe undetected.',
            'Burst damage from stealth can chunk the safe before defenders react.',
            'Assassin kit is designed for eliminating brawlers, not dealing sustained safe damage.'
        ],
        'Mico': [
            'Wall jump mobility lets him bypass defenders and reach the safe from unusual angles.',
            'Burst damage can deal a quick chunk to the safe before retreating.',
            'Low sustained DPS and fragile HP mean he cannot stay on the safe long enough to be impactful.'
        ],
        'Kit': [
            'Can attach to a pushing ally, healing them while they focus on damaging the safe.',
            'Provides sustain that keeps offensive teammates alive longer near the enemy safe.',
            'Zero personal safe damage and fully reliant on teammates to deal the actual damage.'
        ],
        // D-TIER
        'Poco': [
            'Healing is valuable but his near-zero damage output provides nothing for safe offense.',
            'Cannot threaten the safe in any meaningful way, making him dead weight on attack.',
            'Team healing is outclassed by brawlers who heal AND deal damage to the safe.'
        ],
        'Piper': [
            'Long range means nothing when the safe is surrounded by walls and tight corridors.',
            'Fragile HP makes her an easy elimination before she can deal sustained safe damage.',
            'Damage drops off at close range where most safe fights take place, negating her strengths.'
        ],
        'Gene': [
            'Pull super has some value for displacing defenders, but his safe damage is negligible.',
            'Mediocre DPS contributes almost nothing to the safe on offense or defense.',
            'Support kit is wasted in a mode that demands raw damage output above all else.'
        ],
        'Tick': [
            'Mines deal delayed damage that is trivially avoided by defenders near the safe.',
            'Lowest HP in the game means he dies instantly to any safe-pushing brawler.',
            'Cannot defend the safe against aggressive pushers who simply walk through his slow mines.'
        ],
        '8-Bit': [
            'Damage boost turret increases team DPS on the safe, but he cannot reach it himself.',
            'Slowest movement in the game makes him unable to push past defenders to reach the safe.',
            'Stationary playstyle is easily punished by mobile attackers who ignore him and rush the safe.'
        ],
        'Jacky': [
            'Extremely short range means she must stand directly on the safe to deal damage.',
            'Cannot get past any defender with moderate range, making her useless on offense.',
            'Defensive presence is also weak since attackers can poke the safe from outside her tiny range.'
        ],
        'Mr. P': [
            'Porter spawns deal negligible damage to the safe and are easily destroyed.',
            'Low personal DPS provides no meaningful contribution to safe offense or defense.',
            'Suitcase bounce is designed for hitting brawlers, not stationary objectives like the safe.'
        ],
        'Sprout': [
            'Wall super can block paths to the safe, but that is his only Heist-relevant contribution.',
            'Lobbing attack deals mediocre damage to the safe and is outclassed by actual DPS brawlers.',
            'Fragile and unable to push offensively, limiting him to a niche defensive wall-placer.'
        ],
        'Lou': [
            'Freeze and slip mechanics only affect brawlers, providing zero value against the safe.',
            'Low damage output makes him useless for both safe offense and direct defense.',
            'Super creates a zone that enemies can simply avoid, contributing nothing to safe protection.'
        ],
        'Byron': [
            'Healing is useful for sustaining pushers, but his personal safe damage is nearly zero.',
            'Poison stacking works on brawlers but not the safe, negating his core damage mechanic.',
            'Better supports exist who also bring meaningful DPS to the Heist format.'
        ],
        'Mortis': [
            'Dash attacks are designed for killing brawlers, not dealing damage to a stationary safe.',
            'Cannot contribute meaningful DPS to the safe in any phase of the game.',
            'Assassin kit has no place in a mode that rewards sustained ranged damage output.'
        ],
        'Grom': [
            'X-pattern artillery is designed for hitting moving targets, not a stationary safe.',
            'Low consistent DPS compared to other long-range safe damage dealers like Brock and Colt.',
            'Vulnerable to safe-rushing enemies and cannot defend himself at close range.'
        ],
        'R-T': [
            'Split mechanic provides no benefit in Heist\'s straightforward damage-the-safe objective.',
            'Both halves deal low damage individually, contributing almost nothing to safe offense.',
            'Outclassed by every other option with no niche that benefits the Heist format.'
        ],
        'Squeak': [
            'Delayed sticky bombs give defenders time to walk away before detonation near the safe.',
            'Negligible safe damage since his kit is designed for area denial on moving brawlers.',
            'Provides no offensive threat to the safe and limited defensive value against coordinated pushes.'
        ],
        'Otis': [
            'Silence super disables brawler abilities but does nothing to help damage or protect the safe.',
            'Low DPS makes him useless for safe offense, wasting a team slot on minimal output.',
            'Short range means he cannot poke the safe from a safe distance and must overcommit to contribute.'
        ],
        'Willow': [
            'Possession super can turn a defender temporarily, but her personal safe damage is negligible.',
            'Disruption value is niche and unreliable compared to brawlers who simply deal high DPS.',
            'Fragile HP and low damage make her a liability in Heist\'s DPS-focused format.'
        ],
        'Gray': [
            'Portal link has some rotational value but contributes nothing to actual safe damage.',
            'Lowest combat stats make him useless in direct fights around the safe.',
            'No DPS contribution means his team is effectively fighting 2v3 on every offensive push.'
        ],
        'Doug': [
            'Healing support is less valuable in Heist than raw DPS that can melt the safe.',
            'Cannot threaten the safe himself and his healing output is low compared to dedicated supports.',
            'Wastes a team slot that could be used by a brawler who actually deals meaningful safe damage.'
        ],
        'Crow': [
            'Poison chip damage is designed for wearing down brawlers, not dealing with a stationary safe.',
            'Low DPS provides almost no safe damage on offense, wasting offensive potential.',
            'Assassin dive super is useful for killing brawlers but does minimal safe burst damage.'
        ],
        'Leon': [
            'Invisibility is designed for ambushing brawlers, not for dealing sustained safe damage.',
            'Close-range burst is decent but he lacks the DPS output to compete with S-tier safe melters.',
            'Assassin kit thrives in elimination modes, not objective-based damage modes like Heist.'
        ],
        'Ollie': [
            'Dual form control tools are designed for team fights, not safe damage.',
            'Neither form provides meaningful DPS against the safe or strong defensive presence.',
            'Complex kit offers no advantage in Heist\'s straightforward damage-the-objective format.'
        ],
        'Juju': [
            'Curse damage is slow and provides negligible chip against the safe.',
            'Zone control tools have some defensive value but contribute nothing to safe offense.',
            'Outclassed by every dedicated DPS brawler who can actually damage the safe efficiently.'
        ],
        'Cordelius': [
            'Shadow realm super isolates a single defender, but his team loses DPS during the duel.',
            'Personal damage output is low and not suited for melting a stationary safe objective.',
            'Assassin dueling kit has no place in a mode where safe damage is the only win condition.'
        ]
    },
    'Bounty': {
        // S-TIER
        'Piper': [
            'Maximum damage at long range lets her secure kills from safety and collect stars without risk.',
            'Auto Aimer gadget guarantees a close-range escape, letting her survive assassination attempts and keep her stars.',
            'Dominates open Bounty maps where sightlines are long and she can snipe enemies before they can trade back.'
        ],
        'Belle': [
            'Mark super causes the tagged enemy to take increased damage from all sources, making team focus-fire deadly for star collection.',
            'Bouncing shots punish grouped enemies and allow her to chip multiple targets, building super while farming stars.',
            'Exceptional range and consistent damage let her win long-range poke wars that define most Bounty matches.'
        ],
        'Angelo': [
            'Poison arrows apply lingering damage that finishes off retreating enemies, securing stars that would otherwise escape.',
            'Flight ability lets him reposition to safe high-ground angles where enemies cannot trade back effectively.',
            'Persistent poison chip prevents enemy healing and forces them to play passively or risk dying to the damage over time.'
        ],
        'Melodie': [
            'Orbiting notes punish any enemy who tries to dive her, keeping her alive and protecting her star bounty.',
            'High mobility lets her chase down low-HP enemies to secure kills and collect valuable stars.',
            'Self-peeling capability means she rarely dies, denying the enemy team star income from eliminating her.'
        ],
        'Lily': [
            'Fast dash engage secures kills on squishy targets instantly, collecting their stars before the enemy team can react.',
            'Thorn damage punishes enemies who try to trade at close range, winning most 1v1 exchanges cleanly.',
            'Can pick off high-value targets carrying multiple stars and escape with her dash before being focused down.'
        ],
        'Byron': [
            'Heals allies from range while simultaneously poisoning enemies, enabling his team to win sustained poke trades.',
            'Stacking poison creates enormous pressure that forces enemies to disengage or die, preventing them from collecting stars.',
            'Keeps his team alive through chip fights that define Bounty, ensuring they hold their star advantage over time.'
        ],
        'Berry': [
            'Freeze mechanic locks down enemies mid-fight, setting up easy kills for teammates to secure stars.',
            'Area denial with frozen zones controls key sightlines and prevents enemy rotations on Bounty maps.',
            'Disrupts enemy positioning at critical moments, turning even trades into favorable star exchanges for the team.'
        ],
        // A-TIER
        'Brock': [
            'Long-range rockets deal solid burst damage and can finish off enemies retreating with stars.',
            'Wall-breaking super opens up the map, creating longer sightlines that benefit his team\'s ranged composition.',
            'Rocket fuel gadget provides a devastating burst option that can one-shot low-HP enemies carrying high star bounties.'
        ],
        'Crow': [
            'Poison chip damage reduces enemy healing by 40%, crippling their ability to sustain through Bounty\'s poke-heavy gameplay.',
            'Excellent at weakening multiple enemies simultaneously, setting up teammates to secure kills and collect stars.',
            'High mobility with his super lets him finish off weakened targets carrying valuable stars or escape when overextended.'
        ],
        'Spike': [
            'Well-placed cactus grenades deal devastating burst damage that can eliminate enemies and claim their stars.',
            'Slowing super zone denies escape routes, trapping enemies so teammates can finish them off for star collection.',
            'Split projectile coverage makes it difficult for enemies to dodge all fragments during poke wars.'
        ],
        'Nani': [
            'Converging orbs deal massive burst damage when all three connect, capable of one-shotting enemies to instantly claim stars.',
            'Peep super scouts enemy positions and delivers targeted burst damage from anywhere on the map.',
            'Rewards precise aim with some of the highest single-attack damage in the game, perfect for securing eliminations in Bounty.'
        ],
        'Mandy': [
            'Focused beam provides precise long-range damage that excels in the sightline-heavy Bounty maps.',
            'Consistent poke output keeps enemies low, forcing them to play passively or risk giving up stars.',
            'Accuracy rewards skilled players with reliable kill-securing potential at ranges where most brawlers cannot trade back.'
        ],
        'Maisie': [
            'Charged shot provides a high-damage precision attack that can eliminate enemies carrying star bounties.',
            'Solid base range and consistent poke damage let her contribute between charged shots in poke wars.',
            'Good survivability for a sharpshooter, allowing her to stay alive and deny enemies the stars on her head.'
        ],
        'Bea': [
            'Supercharged shot deals devastating burst that can two-shot most brawlers, securing quick star pickups.',
            'Honey slow from her super limits enemy mobility, making them easier targets for her and her team.',
            'Alternating normal and charged shots create a rhythm of constant pressure in Bounty\'s ranged engagements.'
        ],
        'Stu': [
            'One-hit super charge gives him constant dash availability to dodge incoming shots and survive in Bounty.',
            'Agile playstyle makes him extremely difficult to pin down, protecting the stars he carries.',
            'Can weave in and out of engagements to finish off weakened enemies without committing to risky trades.'
        ],
        'Surge': [
            'Upgrade scaling makes him progressively more dangerous, with max-stage split shots dominating open Bounty maps.',
            'Teleport super provides burst repositioning to dodge lethal attacks and stay alive with accumulated stars.',
            'At full upgrades his range and split damage make him a constant threat across the map\'s sightlines.'
        ],
        'Bo': [
            'Mine placement provides area denial on key positions where enemies try to advance for star trades.',
            'Tripwire mines can secure kills on unaware enemies, instantly claiming their stars.',
            'Totem gadget charges team supers faster, accelerating the team\'s ability to secure kills and control the Bounty map.'
        ],
        'Emz': [
            'Spray damage zone controls the mid-range space that most Bounty fights occur in.',
            'Enemies who overstay in her cloud take escalating damage, punishing aggressive pushes for star trades.',
            'Bad Karma super slows and damages grouped enemies, creating team-wipe opportunities for star collection.'
        ],
        'Willow': [
            'Possession super takes control of an enemy brawler, potentially causing them to walk into your team and give up stars.',
            'Solid poke damage at range lets her charge her game-changing super consistently during Bounty trades.',
            'One of the most disruptive abilities in Bounty where controlling a high-star-value enemy can swing the entire match.'
        ],
        'Charlie': [
            'Web super traps enemies in place, setting up easy follow-up kills to claim their stars.',
            'Area control with web zones denies enemy movement through critical Bounty sightlines.',
            'Versatile control kit prevents enemies from trading effectively and limits their star collection opportunities.'
        ],
        // B-TIER
        'Colt': [
            'High DPS when all bullets connect can shred enemies quickly, but his narrow spread is hard to land at Bounty ranges.',
            'Silver Bullet wall-break can reshape the map to create favorable sightlines for his team.',
            'Lacks the consistent accuracy of dedicated snipers, making him less reliable for securing star-earning kills.'
        ],
        'Leon': [
            'Invisibility super allows him to ambush high-star-value targets for assassination plays.',
            'High burst damage at close range can delete enemies before they react, stealing their stars.',
            'Struggles in Bounty\'s ranged meta where long sightlines make it hard to approach invisibly without being predicted.'
        ],
        'Mortis': [
            'Dash attacks let him chain kills on weakened enemies to rapidly collect multiple stars.',
            'Healing super restores HP mid-fight, keeping him alive when he dives to secure star-carrying targets.',
            'Risky playstyle in Bounty\'s ranged meta means failed dives gift the enemy team significant star value.'
        ],
        'Tara': [
            'Group pull super gathers enemies together for devastating follow-up damage and multi-star collection.',
            'Poke damage from her card spread charges super steadily during Bounty\'s poke-heavy engagements.',
            'Relies heavily on landing super to create value — without it she is outclassed by dedicated Bounty picks.'
        ],
        'Gene': [
            'Pull super grabs a single enemy into your team, almost guaranteeing their elimination and star claim.',
            'Decent poke range lets him chip enemies and charge super during Bounty\'s lane-based fights.',
            'Pull is powerful but can be dodged by mobile targets, and his damage alone is insufficient for Bounty.'
        ],
        'Sandy': [
            'Sandstorm super provides team invisibility for coordinated star-securing pushes on grouped enemies.',
            'Solid area damage lets him hold his lane and control mid-range space in Bounty matches.',
            'Outclassed by dedicated snipers in Bounty but his utility and team support keep him viable.'
        ],
        'Max': [
            'Team speed boost helps her squad dodge incoming shots and reposition for safer star trades.',
            'Fast base movement speed makes her naturally hard to hit in Bounty\'s poke-heavy fights.',
            'Lacks the raw killing power of S-tier picks, making her more of a supportive option than a carry.'
        ],
        'Amber': [
            'Continuous flame stream deals heavy sustained damage in mid-range Bounty engagements.',
            'Fire puddle super provides area denial that controls chokepoints and limits enemy movement.',
            'Shorter effective range compared to dedicated snipers limits her dominance on open Bounty maps.'
        ],
        'Colette': [
            'Percentage-based damage helps her finish off weakened enemies to claim their stars.',
            'Push-it super charges through enemies for guaranteed damage and can secure key kills.',
            'Not ideal for Bounty\'s long-range meta as she needs to get close to deal her best damage.'
        ],
        'Fang': [
            'Chain super kicks can bounce between grouped enemies for multi-kill star collection opportunities.',
            'Super recharge on kills creates snowball potential once the first elimination is secured.',
            'Needs to close distance to be effective, which is difficult against Bounty\'s many long-range threats.'
        ],
        'Gale': [
            'Pushback super and gadget provide defensive utility to protect teammates carrying high star bounties.',
            'Can deny enemy dives and keep assassins away from squishy sniper teammates.',
            'Low kill-securing potential means he relies on teammates to convert his crowd control into star claims.'
        ],
        'Otis': [
            'Silence super completely shuts down an enemy\'s attacks and abilities, setting up free star-securing kills.',
            'Can neutralize key enemy threats during critical bounty trade moments.',
            'Mediocre base damage and limited range reduce his ability to independently contribute to star collection.'
        ],
        'Lola': [
            'Ego clone doubles her damage output, providing strong burst potential to secure kills from range.',
            'Clone positioned on a sightline creates crossfire that enemies must respect or risk elimination.',
            'Stationary clone can be avoided by mobile enemies, limiting her effectiveness against skilled Bounty players.'
        ],
        'Janet': [
            'Flight super provides untargetable repositioning to escape when carrying a high star bounty.',
            'Decent sustained damage at medium range allows her to contribute to poke wars.',
            'Cannot attack during flight and lacks the burst damage needed to consistently secure kills in Bounty.'
        ],
        'Pearl': [
            'Heat mechanic ramps up damage over sustained engagements, rewarding continuous fire in Bounty\'s poke wars.',
            'Can reach high DPS when heat is built up, capable of burning down enemies for star claims.',
            'Needs time to build heat and loses it during repositioning, making her inconsistent in Bounty\'s stop-and-go fights.'
        ],
        'Shade': [
            'Shadow stealth enables ambush plays on high-value targets carrying multiple stars.',
            'High burst from stealth can eliminate enemies before they can react or trade back.',
            'Stealth approach can be predicted by experienced players, and failed engages in Bounty cost significant star value.'
        ],
        'Mico': [
            'Wall jump mobility provides unique engage angles to reach backline enemies carrying stars.',
            'Burst damage is high enough to delete squishies and claim their accumulated stars.',
            'Close-range assassin archetype struggles in Bounty\'s ranged meta where snipers dominate the sightlines.'
        ],
        'Kit': [
            'Attachment healing keeps key teammates alive through Bounty\'s poke fights, preserving their star bounties.',
            'Nearly untargetable while attached, making him extremely hard to kill for enemy star collection.',
            'Relies entirely on his host brawler\'s effectiveness — if the host is outranged, Kit provides limited offensive value.'
        ],
        'Kenji': [
            'Katana dash delivers devastating burst damage that can instantly eliminate star-carrying targets.',
            'High mobility allows rapid repositioning to secure kills and escape before the enemy team retaliates.',
            'Melee-focused kit is a liability in Bounty\'s ranged-dominant meta where snipers control the sightlines.'
        ],
        'Juju': [
            'Curse debuff applies pressure over time, weakening enemies and setting up star-securing kills for teammates.',
            'Zone control with curse placement restricts enemy movement through critical Bounty sightlines.',
            'Slow damage application lacks the instant burst needed to reliably secure kills and claim stars quickly.'
        ],
        'Eve': [
            'Hatchling spawns from super provide persistent area pressure that forces enemies to reposition.',
            'Can float over water to access unique positions and angles on certain Bounty maps.',
            'Moderate damage output and map-dependent water mechanic limit her consistency across the Bounty map pool.'
        ],
        'Cordelius': [
            'Shadow realm super isolates a single target for a guaranteed 1v1, claiming their stars if victorious.',
            'Extremely strong duelist who wins most isolated matchups in his shadow realm with stat boosts.',
            'Must get close to use his super, which is difficult against Bounty\'s ranged meta and open sightlines.'
        ],
        // C-TIER
        'Jessie': [
            'Scrappy turret provides some area control but is easily destroyed by Bounty\'s long-range brawlers.',
            'Bounce shots can chip grouped enemies but deal insufficient damage to secure kills for star collection.',
            'Low individual damage output leaves her unable to compete with snipers in Bounty\'s poke-heavy fights.'
        ],
        'Poco': [
            'Team healing keeps allies alive through poke damage, preserving their star bounties over time.',
            'Da Capo provides passive sustain that can win prolonged trades in slower Bounty matches.',
            'Extremely low damage output means he cannot threaten enemies or secure kills for star collection himself.'
        ],
        'Penny': [
            'Cannon turret provides long-range splash that zones enemies off key Bounty positions.',
            'Split shot punishes enemies who line up behind each other in predictable Bounty formations.',
            'Both Penny and her turret are fragile and easily destroyed by the snipers that dominate Bounty.'
        ],
        'Mr. P': [
            'Porter station spawns mini-porters that apply persistent pressure and force enemies to waste ammo.',
            'Bouncing suitcase reaches behind walls to chip enemies in cover during Bounty\'s defensive phases.',
            'Low damage per hit makes it very difficult to secure kills and actually collect stars from eliminations.'
        ],
        'Sprout': [
            'Wall super can block sightlines and create cover on open Bounty maps, altering engagement angles.',
            'Lobbing attack reaches over walls to chip enemies from protected positions.',
            'Slow reload and predictable arc make his poke unreliable against the mobile, long-range enemies that thrive in Bounty.'
        ],
        'Lou': [
            'Freeze buildup disrupts enemy movement, potentially locking them in place for teammates to secure star kills.',
            'Slippery zone super creates area denial that forces enemies out of favorable positions.',
            'Slow freeze accumulation and low burst damage make it hard to convert control into actual star-earning eliminations.'
        ],
        'Buzz': [
            'Stun grapple can catch out-of-position enemies for a guaranteed kill and star collection.',
            'Passive super charge near enemies creates zoning pressure in mid-range Bounty fights.',
            'Short effective range means he struggles to engage against the snipers and long-range picks that dominate Bounty.'
        ],
        'Ruffs': [
            'Power-up drops permanently boost an ally\'s HP and damage, strengthening the team\'s star-trading potential.',
            'Sandbag gadget provides cover on open Bounty maps where protection is valuable.',
            'Low personal combat power and inability to secure kills independently limit his star collection contribution.'
        ],
        'Griff': [
            'Coin burst deals high damage at close-mid range and can surprise enemies with its spread.',
            'Super wave provides decent area coverage for finishing off retreating enemies with stars.',
            'Spread becomes too wide at Bounty\'s typical engagement ranges, making him ineffective at securing kills from distance.'
        ],
        'Gus': [
            'Spirit shield absorbs damage for himself or allies, helping the team survive poke trades and keep their stars.',
            'Decent medium-range poke contributes to Bounty\'s chip damage meta between shield charges.',
            'Shield requires charging through damage dealt and disappears quickly, making it less reliable than dedicated healing.'
        ],
        'Gray': [
            'Portal link enables rapid team rotations for flanking plays to catch enemies off guard.',
            'Unique repositioning utility can create unexpected angles on Bounty maps.',
            'Low combat stats mean he cannot threaten enemies or secure star-earning kills without teammate follow-up.'
        ],
        'Chester': [
            'Random super abilities occasionally provide powerful burst that can secure star-earning kills.',
            'Unpredictable nature can catch enemies off guard in Bounty\'s usually methodical gameplay.',
            'Inconsistency from random abilities makes him impossible to rely on for Bounty\'s strategic star management.'
        ],
        'Doug': [
            'Hotdog healing can sustain teammates through poke damage, helping them retain their star bounties.',
            'Provides supplementary healing that helps the team survive longer Bounty engagements.',
            'Healing output is far lower than Byron or Poco, and his damage contribution is negligible for star collection.'
        ],
        'Chuck': [
            'Rail riding lets him reposition quickly along walls to find new angles in Bounty.',
            'Unique mobility can create unexpected flanking opportunities on wall-heavy Bounty maps.',
            'Wall-dependent movement limits him on open Bounty maps, and his damage output is insufficient for consistent kills.'
        ],
        'Meg': [
            'Mech form provides massive HP and damage that can dominate Bounty fights once achieved.',
            'In mech she becomes extremely threatening, able to tank damage and secure kills for star collection.',
            'Base form is extremely weak with low HP, making her an easy star donation before she can build super.'
        ],
        'Bonnie': [
            'Cannon form provides decent long-range poke for Bounty\'s sightline-based gameplay.',
            'Can switch to melee form to finish off weakened enemies and claim their stars up close.',
            'Neither form excels in Bounty — cannon lacks burst and melee form exposes her to snipers.'
        ],
        'Hank': [
            'Charged blast deals massive area damage that can hit multiple enemies grouped on Bounty maps.',
            'Tank-level HP lets him absorb poke damage and survive longer during star accumulation phases.',
            'Slow charge time is easily exploited by Bounty\'s many sharpshooters who punish his stationary charging.'
        ],
        'Moe': [
            'Artillery splash hits from extreme range, providing some poke value in Bounty\'s ranged engagements.',
            'Minecart super can zone enemies out of favorable positions on certain Bounty maps.',
            'Inconsistent damage application and map-dependent utility make him unreliable for Bounty\'s kill-focused star economy.'
        ],
        'Meeple': [
            'Board game mechanics provide varied utility that can occasionally benefit Bounty\'s strategic requirements.',
            'Adaptable playstyle offers some flexibility in how he approaches star trades.',
            'Randomness and complexity make him unreliable in Bounty where consistent star collection is paramount.'
        ],
        'Ollie': [
            'Dual form provides some versatility for adapting to different phases of Bounty matches.',
            'Control abilities can restrict enemy movement through key Bounty sightlines.',
            'Neither form provides the damage output or range needed to compete with Bounty\'s top-tier snipers.'
        ],
        'Clancy': [
            'Evolving attacks become stronger with each super usage, potentially reaching threatening levels late in Bounty.',
            'At max evolution his attacks can contribute meaningful damage to Bounty\'s poke fights.',
            'Requires multiple supers to reach full power, and Bounty\'s fast-kill meta punishes his slow scaling.'
        ],
        'Larry & Lawrie': [
            'Split duo mechanic covers more ground for map awareness and scouting enemy positions in Bounty.',
            'Two units can pressure from separate angles, creating crossfire opportunities for star collection.',
            'Both units are individually weak and each death donates easy stars to the enemy team.'
        ],
        'Najia': [
            'Snake attack pattern can weave around obstacles to chip enemies in cover on Bounty maps.',
            'Curving projectiles offer unusual angles that enemies may not expect during poke trades.',
            'Difficult to aim consistently and mediocre damage make her outclassed by dedicated Bounty sharpshooters.'
        ],
        'Nita': [
            'Bear summon splits enemy attention and can body-block incoming shots from snipers.',
            'Bear pressure from one angle while Nita attacks from another creates flanking potential for star kills.',
            'Both Nita and her bear lack the range to compete in Bounty\'s long-range engagements effectively.'
        ],
        // D-TIER
        'Shelly': [
            'Close-range only kit is completely useless on Bounty\'s open, sniper-dominated maps.',
            'Cannot close distance against long-range enemies who kite her effortlessly across the sightlines.',
            'Every death donates stars and she has no way to secure kills against Bounty\'s dominant ranged brawlers.'
        ],
        'Bull': [
            'Cannot reach enemies on open Bounty maps where snipers control every sightline from safety.',
            'Charge super is predictable and easily dodged, leaving him stranded in enemy territory to be eliminated for stars.',
            'Completely outclassed by every ranged brawler in Bounty\'s poke-heavy, position-based gameplay.'
        ],
        'El Primo': [
            'No ranged attack means he is poked down to zero before he can reach any enemy on Bounty maps.',
            'Jump super is telegraphed and easily dodged, wasting his only gap-closing option and leaving him exposed.',
            'Free star donation for enemy snipers who farm him from range with zero risk of retaliation.'
        ],
        'Dynamike': [
            'Lobbed attacks are too slow and easy to dodge against Bounty\'s mobile, long-range meta.',
            'Assassins dive him for free star collection since he cannot defend himself at close range.',
            'Completely outclassed by every dedicated sniper who deals more reliable damage at greater range in Bounty.'
        ],
        'Barley': [
            'Area denial puddles are easily walked out of by aware opponents on open Bounty maps.',
            'Fragile HP pool makes him an easy star donation for any enemy who can reach him.',
            'Outclassed by every other area controller and thrower in Bounty\'s range-focused engagements.'
        ],
        'Tick': [
            'Lowest HP in the game makes him a priority target and free star income for the enemy team.',
            'Mines are trivially easy to dodge at Bounty\'s typical engagement ranges.',
            'Cannot defend himself against any aggressor, and each death gives away stars he cannot earn back.'
        ],
        '8-Bit': [
            'Slowest movement in the game makes him a stationary target for snipers who dominate Bounty.',
            'Cannot dodge attacks or reposition to safety, accumulating stars only to donate them upon death.',
            'Damage boost turret forces him to stand still in a mode where positioning and mobility are essential.'
        ],
        'Carl': [
            'Predictable boomerang trajectory is easily sidestepped by the precise, experienced players in Bounty.',
            'Must wait for pickaxe return before attacking again, leaving exploitable gaps in his damage output.',
            'Outclassed by every mid-range and long-range brawler in Bounty\'s poke-focused engagements.'
        ],
        'Jacky': [
            'Extremely short attack range means she can never reach enemies on Bounty\'s open maps.',
            'Gets kited and poked to death by snipers while dealing zero damage in return.',
            'Tank HP is meaningless when she cannot close distance to deal any damage or secure star-earning kills.'
        ],
        'Rosa': [
            'Short melee range prevents her from contributing to Bounty\'s ranged poke fights in any meaningful way.',
            'Shield super is wasted when enemies simply walk away and shoot her from beyond her reach.',
            'Every approach attempt on open Bounty maps results in taking massive damage for zero star return.'
        ],
        'Frank': [
            'Long attack wind-up leaves him vulnerable to interrupts from the many snipers who control Bounty.',
            'Stun super requires getting close, which is nearly impossible against Bounty\'s ranged compositions.',
            'High HP pool only delays the inevitable on maps where enemies can kite him indefinitely for free.'
        ],
        'Bibi': [
            'Melee range locks her out of Bounty\'s long-range engagements where all star trades occur.',
            'Speed boost on charged swing is not enough to close the gap against snipers with full map control.',
            'Every failed approach costs stars and she lacks the range to threaten anyone from a safe distance.'
        ],
        'Darryl': [
            'Auto-charging roll is predictable and easily punished by Bounty\'s ranged brawlers who see it coming.',
            'After rolling in he is stranded at close range with no escape, making him an easy star donation.',
            'Tank-assassin hybrid has no place in Bounty\'s long-range meta where snipers control every engagement.'
        ],
        'Pam': [
            'Healing station is stationary and easily destroyed by the long-range damage that floods Bounty maps.',
            'Spread attack pattern lacks precision at the ranges where Bounty fights typically take place.',
            'Too slow and bulky to contribute meaningfully in a mode defined by precise long-range star trading.'
        ],
        'Rico': [
            'Wall bounce shots require walls that are often absent or irrelevant on open Bounty maps.',
            'Without geometry to exploit, his straight-line damage is outclassed by every dedicated sniper.',
            'Niche wall-bounce playstyle has minimal value in Bounty\'s wide-open, sightline-dominated map pool.'
        ],
        'R-T': [
            'Split mechanic is complex and provides no meaningful advantage in Bounty\'s star collection economy.',
            'Both halves are weak individually and easy for snipers to pick off for free star income.',
            'Outclassed by virtually every brawler in Bounty with no niche that compensates for his weaknesses.'
        ],
        'Squeak': [
            'Slow-detonating sticky bombs are trivially dodged by every brawler at Bounty\'s engagement ranges.',
            'Delayed damage means enemies always escape the blast, preventing him from securing star-earning kills.',
            'Provides no immediate threat, allowing opponents to play aggressively and farm stars off his fragile HP pool.'
        ],
        'Ash': [
            'Rage mechanic requires taking damage to power up, which costs stars in a mode where survival is paramount.',
            'Short melee range prevents him from engaging Bounty\'s ranged brawlers without being chunked first.',
            'Building rage through damage means he donates stars to the enemy before he even reaches his power spike.'
        ],
        'Edgar': [
            'Auto-charging jump super is predictable and easily countered by aware Bounty players who keep distance.',
            'Lifesteal sustain is irrelevant when snipers burst him down from range before he can close the gap.',
            'Every failed dive costs stars and Bounty\'s open maps give enemies ample space to avoid his engage.'
        ],
        'Buster': [
            'Absorb shield can block some incoming damage, but enemies in Bounty simply wait it out from range.',
            'Counter-attack requires absorbing hits at a range where Bounty\'s snipers can easily disengage and re-poke.',
            'Shield timing is difficult and the counterplay is trivial for experienced ranged players in Bounty.'
        ],
        'Sam': [
            'Knuckle buster placement is telegraphed and easily avoided by Bounty\'s ranged, position-aware players.',
            'Close-range damage potential is wasted when enemies maintain distance across Bounty\'s open sightlines.',
            'Predictable engage pattern through knuckle throw makes him easy to kite and punish for star donation.'
        ],
        'Grom': [
            'X-pattern artillery occasionally catches enemies dodging predictably on Bounty maps.',
            'Can deal damage from behind walls on specific Bounty positions with careful placement.',
            'Extremely vulnerable to assassins, and inconsistent landing makes him less reliable than any dedicated sniper in Bounty.'
        ],
        'Draco': [
            'Fire breath requires close range that he can never reliably reach against Bounty\'s sniper-heavy compositions.',
            'Tank HP only delays his elimination on open maps where enemies kite him from safety.',
            'Completely lacks the range needed to participate in Bounty\'s long-distance star trading engagements.'
        ]
    },
    'Hot Zone': {
        // S-TIER
        'Sandy': [
            'Sandstorm super grants team-wide invisibility on the zone, letting allies contest without being targeted.',
            'Wide area damage clears enemies off the zone efficiently while holding space for his team.',
            'One of the strongest zone controllers in the game whose super single-handedly wins contested Hot Zone points.'
        ],
        'Emz': [
            'Spray damage zone perfectly covers Hot Zone circles, dealing escalating damage to anyone contesting inside.',
            'Enemies who try to hold the zone through her cloud take increasing punishment the longer they stay.',
            'Bad Karma super slows enemies on the point, making it nearly impossible for them to escape or contest effectively.'
        ],
        'Amber': [
            'Continuous flame stream provides unmatched sustained DPS for clearing enemies off contested Hot Zones.',
            'Massive ammo pool lets her pressure the zone non-stop while other brawlers must reload.',
            'Fire puddle super placed on the zone creates persistent area denial that enemies cannot ignore.'
        ],
        'Willow': [
            'Possession super takes control of an enemy contesting the zone, removing them from the fight entirely.',
            'Solid poke damage keeps enemies off the zone and charges her game-changing super consistently.',
            'Possessing a tank or key enemy on the Hot Zone swings the capture percentage dramatically in her team\'s favor.'
        ],
        'Berry': [
            'Freeze mechanic locks down enemies on the zone, removing their ability to contest or escape.',
            'Area control with frozen zones directly overlaps with Hot Zone circles, denying enemy presence.',
            'Disrupts coordinated enemy zone pushes by freezing key targets at critical contesting moments.'
        ],
        'Juju': [
            'Curse placement on the Hot Zone applies persistent damage to anyone trying to contest the area.',
            'Zone control with curses perfectly synergizes with Hot Zone\'s objective of holding specific areas.',
            'Forces enemies to choose between eating curse damage on the zone or giving up capture percentage.'
        ],
        'Melodie': [
            'Orbiting notes deal passive damage to anyone contesting the zone near her, making her punishing to approach.',
            'High mobility lets her rotate between multiple Hot Zone points quickly to contest where needed.',
            'Self-peeling capability keeps her alive on the zone longer than most brawlers, sustaining capture percentage.'
        ],
        // A-TIER
        'Poco': [
            'Area-of-effect healing super keeps the entire team alive while contesting the Hot Zone together.',
            'Da Capo star power provides passive healing with every attack, sustaining teammates on the zone constantly.',
            'Best pure team healer for prolonged zone fights where sustained HP advantage wins the capture race.'
        ],
        'Rosa': [
            'Shield super makes her nearly unkillable while standing on the zone, securing extended capture time.',
            'High base HP and consistent melee damage let her brawl on the zone and force enemies off.',
            'Excellent at tanking damage for her team while they contest the Hot Zone behind her protection.'
        ],
        'Bo': [
            'Mine placement directly on the Hot Zone provides area denial that punishes enemies who step on the point.',
            'Tripwire mines can burst enemies off the zone, clearing it for his team to capture.',
            'Totem gadget charges team supers faster, accelerating the squad\'s zone-controlling capabilities.'
        ],
        'Sprout': [
            'Wall super blocks enemy pathways to the zone, delaying their ability to contest and buying capture time.',
            'Lobbing attack reaches over walls to hit enemies on the zone from safe, protected positions.',
            'Map reshaping with walls creates chokepoints that limit how enemies approach the Hot Zone.'
        ],
        'Gale': [
            'Pushback super clears enemies off the Hot Zone, resetting their contest and buying capture time.',
            'Spring pad gadget provides rapid team movement to reach or rotate between zone points.',
            'Defensive utility protects teammates standing on the zone by preventing enemy dives and pushes.'
        ],
        'Ash': [
            'Rage mechanic builds quickly in the sustained fights around Hot Zone points, making him increasingly dangerous.',
            'At full rage his damage and speed spike lets him dominate the zone and force enemies off.',
            'Tanky enough to hold the zone while building rage from incoming fire, turning defense into offense.'
        ],
        'Pam': [
            'Healing station placed on the Hot Zone provides sustained area healing for the entire team contesting.',
            'High HP makes her durable enough to hold the zone while healing turret keeps her team healthy.',
            'Team sustain from her turret creates a significant advantage in the attrition fights that define Hot Zone.'
        ],
        'Gene': [
            'Pull super yanks enemies off the zone into his team, removing their contest and securing captures.',
            'Decent area poke damage helps maintain zone control while charging his powerful displacement super.',
            'Pulling a key defender off the Hot Zone can swing the capture percentage decisively.'
        ],
        'Byron': [
            'Heals allies on the zone while simultaneously poisoning enemies contesting, winning attrition trades.',
            'Stacking poison forces enemies to leave the zone or die, effectively denying their capture presence.',
            'Long-range healing keeps teammates alive on the point without Byron needing to expose himself on the zone.'
        ],
        'Spike': [
            'Slowing super placed on the Hot Zone traps enemies in place, making them easy targets for the team.',
            'Burst damage from well-aimed grenades can quickly eliminate enemies contesting the zone.',
            'Cactus split pattern covers wide areas, punishing grouped enemies trying to hold the Hot Zone together.'
        ],
        'Max': [
            'Team speed boost super lets her squad rotate to and from zones faster than the enemy team.',
            'Fast movement makes her excellent at contesting zones and dodging incoming fire simultaneously.',
            'Mobility advantage helps the team contest multiple Hot Zone points efficiently throughout the match.'
        ],
        'Lou': [
            'Freeze buildup on enemies standing on the zone eventually locks them in place for easy elimination.',
            'Slippery zone super directly on the Hot Zone makes enemies unable to control their movement while contesting.',
            'Sustained ice attacks chip enemies and build freeze, punishing prolonged zone presence.'
        ],
        'Charlie': [
            'Web super traps enemies on or near the zone, preventing them from retreating or repositioning.',
            'Area control webs deny enemy movement through critical paths leading to the Hot Zone.',
            'Versatile control kit pairs well with Hot Zone\'s static objective by locking enemies in unfavorable positions.'
        ],
        'Ollie': [
            'Dual form provides versatility for both contesting the zone aggressively and controlling it defensively.',
            'Area control abilities restrict enemy movement onto the Hot Zone point.',
            'Solid team utility with abilities that complement zone-holding strategies in Hot Zone.'
        ],
        'Kit': [
            'Attachment healing keeps the team\'s zone holder alive indefinitely during contested Hot Zone fights.',
            'Nearly untargetable while attached, making him extremely hard to remove from the zone.',
            'Transforms any tanky teammate into a sustained zone-holding powerhouse with persistent heal output.'
        ],
        // B-TIER
        'Nita': [
            'Bear summon creates an additional body on the zone, contesting and splitting enemy attention.',
            'Bear and Nita can hold two separate Hot Zone points simultaneously for maximum capture coverage.',
            'Bear absorbs damage that would otherwise hit teammates, extending the team\'s zone presence.'
        ],
        'Jessie': [
            'Scrappy turret placed on the zone provides persistent damage and an additional contesting body.',
            'Bounce shots punish grouped enemies stacking on the Hot Zone point together.',
            'Turret draws enemy fire away from teammates, effectively increasing the team\'s durability on the zone.'
        ],
        'Frank': [
            'Stun super is devastating when it lands on multiple enemies grouped on the Hot Zone point.',
            'Highest base HP in the game makes him extremely durable when contesting the zone.',
            'Long attack wind-up makes him vulnerable to interrupts, but in zone fights enemies must commit to the point.'
        ],
        'Bibi': [
            'Knockback on home-run swing pushes enemies off the Hot Zone, disrupting their capture progress.',
            'Speed boost on charged swing helps her rotate between zones and contest quickly.',
            'Solid melee durability lets her brawl on the point, but she is outclassed by S-tier zone controllers.'
        ],
        'Tara': [
            'Group pull super on the Hot Zone gathers enemies for devastating team follow-up while contesting.',
            'Shadow clones provide additional bodies on the zone for brief capture contribution.',
            'Relies on landing super to create zone-winning value — without it she is a mediocre zone contester.'
        ],
        'Mr. P': [
            'Porter station spawns mini-porters that continuously contest the zone and force enemies to deal with them.',
            'Persistent porter presence on the Hot Zone chips enemies and wastes their ammo and attention.',
            'Low direct combat power means he relies on porter swarm and team support to actually hold the zone.'
        ],
        'Ruffs': [
            'Power-up drops permanently boost an ally\'s HP and damage, strengthening the team\'s zone-holding capability.',
            'Sandbag cover gadget placed near the zone provides protection for teammates contesting the point.',
            'Low personal combat power means he depends on buffed teammates to do the actual zone holding.'
        ],
        'Griff': [
            'Coin burst deals high damage at close-mid range, effective for clearing enemies off the zone.',
            'Super wave covers decent area for punishing enemies grouped on the Hot Zone point.',
            'Effective range is limited, but Hot Zone\'s condensed fighting spaces suit his spread pattern.'
        ],
        'Gus': [
            'Spirit shield absorbs damage for teammates holding the zone, extending their contesting duration.',
            'Medium-range poke contributes consistent chip damage in zone fights between shield charges.',
            'Shield is temporary and requires charging, making it less reliable than dedicated healing for sustained zone fights.'
        ],
        'Buster': [
            'Absorb shield blocks incoming damage while standing on the zone, protecting himself and contesting.',
            'Counter-attack after absorbing delivers burst damage to enemies trying to push him off the zone.',
            'Shield timing is difficult, but zone fights give him predictable incoming damage to absorb.'
        ],
        'Otis': [
            'Silence super shuts down a key enemy\'s abilities while they try to contest the zone.',
            'Neutralizing a tank or healer on the zone lets his team overwhelm the remaining enemies.',
            'Mediocre base damage limits his ability to independently hold or clear enemies from the zone.'
        ],
        'Lola': [
            'Ego clone placed on the zone doubles her damage output against enemies trying to contest.',
            'Clone provides an additional damage source that enemies must respect while holding the point.',
            'Stationary clone is predictable on the fixed Hot Zone circles, but still provides solid zone pressure.'
        ],
        'Meg': [
            'Mech form provides massive HP and damage for dominating the zone once transformation is achieved.',
            'In mech she can hold the Hot Zone point solo, tanking damage while dealing devastating output.',
            'Base form is extremely vulnerable and contributes almost nothing to zone contesting before getting super.'
        ],
        'Hank': [
            'Charged blast deals massive area damage that can clear multiple enemies off the zone simultaneously.',
            'Tank-level HP lets him absorb punishment while contesting the Hot Zone directly.',
            'Slow charge time is punished by zone fighters who pressure him while he charges.'
        ],
        'Colette': [
            'Percentage-based damage effectively counters the tanks that commonly hold Hot Zone points.',
            'Push-it super charges through the zone, dealing guaranteed damage to anyone contesting.',
            'Strong against tanks but weaker against squishies, making her matchup-dependent in zone fights.'
        ],
        'Sam': [
            'Knuckle buster throw on the zone creates a damage area and lets him teleport to the point.',
            'Decent HP and close-range damage help him brawl on the zone in melee exchanges.',
            'Telegraphed engage is less of an issue on Hot Zone where enemies must commit to the static point.'
        ],
        'Pearl': [
            'Heat mechanic ramps quickly in sustained zone fights, reaching high DPS against enemies on the point.',
            'Continuous fire on enemies contesting the zone keeps her heat high for maximum damage output.',
            'Zone fights suit her sustained-fire playstyle better than most modes, making her more effective here.'
        ],
        'Maisie': [
            'Charged shot provides burst damage to eliminate key enemies holding the Hot Zone point.',
            'Consistent poke between charged shots contributes to zone pressure and area control.',
            'Outclassed by dedicated zone controllers but her ranged burst adds value in clearing defenders.'
        ],
        'Draco': [
            'Fire breath combined with tank HP lets him brawl directly on the zone and force enemies off.',
            'High sustained damage shreds enemies who try to contest the Hot Zone in close range.',
            'Limited range means he is effective only when the fight is directly on the zone point.'
        ],
        'Cordelius': [
            'Shadow realm super isolates a key defender from the zone, creating a numbers advantage for his team.',
            'Wins most 1v1 duels in shadow realm, permanently removing that enemy from the zone contest.',
            'Must get close to use super, which is feasible in Hot Zone\'s condensed fighting around objectives.'
        ],
        // C-TIER
        'Shelly': [
            'Shotgun blast has decent damage on the zone at close range but she is easily kited by zone controllers.',
            'Super knockback can push enemies off the point, temporarily disrupting their capture progress.',
            'Outclassed by every dedicated tank and zone controller for sustained Hot Zone presence.'
        ],
        'Colt': [
            'High DPS can shred enemies on the zone when bullets connect, but his narrow spread misses often.',
            'Silver Bullet wall-break reshapes the map around zone points, creating new sightlines.',
            'Fragile and inaccurate at the close-mid range where Hot Zone fights typically occur.'
        ],
        'Brock': [
            'Rocket splash damage can hit multiple enemies grouped on the zone for decent area damage.',
            'Wall-breaking super opens up the map around zone points for better team sightlines.',
            'Low HP makes him too fragile to contest the zone directly, limiting him to ranged support.'
        ],
        'Penny': [
            'Cannon turret near the zone provides persistent splash damage on enemies trying to contest.',
            'Split shot punishes enemies who stack on the Hot Zone point together.',
            'Both Penny and her turret are easily destroyed in the chaotic close-range zone fights.'
        ],
        'Carl': [
            'Boomerang attack can hit enemies on the zone twice — going out and coming back.',
            'Super spin provides area damage useful for clearing enemies off the Hot Zone point.',
            'Predictable attack pattern and moderate damage make him outclassed by better zone fighters.'
        ],
        'Rico': [
            'Wall bounce shots can clear enemies off the zone from unusual angles behind cover.',
            'Effective on wall-heavy Hot Zone maps where bouncing bullets are nearly unavoidable.',
            'Very map-dependent and ineffective on open zone layouts without walls to exploit.'
        ],
        'Darryl': [
            'Auto-charging roll lets him engage directly onto the zone to contest and disrupt enemies.',
            'Strong burst damage at point-blank range after rolling onto the Hot Zone point.',
            'Short-lived impact — after his burst he is vulnerable and easily overwhelmed on the zone.'
        ],
        'Surge': [
            'Upgrade scaling makes him progressively more threatening on the zone with split shots and range.',
            'Teleport super provides repositioning to get onto or escape from contested zone points.',
            'Needs to build upgrades to become effective, and early stages are weak for zone contesting.'
        ],
        'Belle': [
            'Mark super makes a zone defender take extra damage, helping the team focus them down and clear the point.',
            'Bouncing shots punish grouped enemies on the Hot Zone with chain damage.',
            'Lacks the sustained presence and area control needed to hold zones — better suited for pick-focused modes.'
        ],
        'Fang': [
            'Chain super kicks on grouped zone defenders can wipe multiple enemies off the Hot Zone.',
            'Super recharge on kills enables snowball wipes when enemies cluster on the point.',
            'Needs enemies grouped for maximum value, and smart zone rotations can deny his chain opportunities.'
        ],
        'Stu': [
            'One-hit super charge lets him dash in and out of the zone to contest while dodging attacks.',
            'Agile playstyle makes him difficult to pin down while he contests Hot Zone points.',
            'Low HP and damage mean he contests the zone but struggles to actually force enemies off it.'
        ],
        'Buzz': [
            'Stun grapple onto a zone defender can knock them out of the fight, opening the zone for his team.',
            'Passive super charge works well when enemies are nearby contesting the same zone.',
            'Short effective range is less of a weakness in Hot Zone\'s condensed fighting spaces.'
        ],
        'Edgar': [
            'Jump super lets him land directly on the zone to contest and lifesteal against enemies.',
            'Lifesteal sustain helps him survive longer in the sustained brawling that Hot Zone demands.',
            'Predictable dive is easily countered by zone controllers who expect his jump and punish the landing.'
        ],
        'Bonnie': [
            'Can switch between long-range poke and close-range zone contesting as the situation demands.',
            'Melee form provides decent burst for clearing enemies off the point at close range.',
            'Neither form specializes in zone control, making her a generalist outclassed by dedicated zone holders.'
        ],
        'Janet': [
            'Flight super repositions her onto or away from the zone without taking damage.',
            'Decent sustained damage at medium range contributes to zone fights.',
            'Cannot attack during flight, limiting her zone impact during her most unique ability.'
        ],
        'Mandy': [
            'Focused beam provides precise damage to pick off enemies contesting the zone from range.',
            'Charge-up time means she cannot rapidly respond to zone contests as they develop.',
            'Long-range specialist struggles in Hot Zone\'s close-quarters fighting around the objective.'
        ],
        'Chester': [
            'Random super abilities sometimes provide useful zone control or burst for clearing the point.',
            'Unpredictability can occasionally swing zone fights in his favor with a lucky super.',
            'Inconsistency makes him unreliable for Hot Zone\'s constant zone-contesting demands.'
        ],
        'Doug': [
            'Hotdog healing provides some team sustain during prolonged zone fights.',
            'Can support teammates on the zone with supplementary healing and body presence.',
            'Healing output is far lower than Poco, Pam, or Byron who fill the sustain role much better in Hot Zone.'
        ],
        'Chuck': [
            'Rail riding provides rapid rotation between multiple Hot Zone points on wall-heavy maps.',
            'Unique mobility helps him contest zones that other brawlers reach more slowly.',
            'Wall-dependent movement is unreliable on open zone layouts, and his damage is mediocre for zone fights.'
        ],
        'Nani': [
            'Converging orbs can deal devastating damage to enemies standing still on the Hot Zone.',
            'Peep super scouts zone positions and delivers targeted burst from safety.',
            'Orbs are extremely hard to land consistently in chaotic zone fights, making her unreliable for contesting.'
        ],
        'Moe': [
            'Artillery splash can hit enemies grouped on the zone from safe range behind cover.',
            'Minecart super placed on the zone provides some area denial for contesting.',
            'Inconsistent damage application and limited zone presence make him outclassed by dedicated Hot Zone picks.'
        ],
        'Meeple': [
            'Board game mechanics occasionally provide useful utility for zone fights.',
            'Adaptable playstyle can sometimes suit Hot Zone\'s varied map layouts.',
            'Randomness makes him unreliable when consistent zone control is what Hot Zone demands.'
        ],
        'Clancy': [
            'Evolving attacks become stronger through supers, eventually providing solid zone pressure.',
            'At max evolution his area damage contributes meaningfully to zone clearing.',
            'Slow scaling means he is weak early when zone control is already being decided.'
        ],
        'Eve': [
            'Hatchling spawns contest the zone as additional bodies, forcing enemies to deal with them.',
            'Water float provides unique positioning on specific Hot Zone maps with water.',
            'Moderate damage and map-dependent float mechanic limit her consistency across the Hot Zone map pool.'
        ],
        'Najia': [
            'Curving snake attacks can weave around obstacles to hit enemies contesting the zone.',
            'Unusual projectile angles occasionally catch zone defenders off guard.',
            'Difficult to aim and mediocre damage make her outclassed by better zone controllers in Hot Zone.'
        ],
        // D-TIER
        'Bull': [
            'Short range means zone controllers easily kite him and deny his ability to contest the Hot Zone.',
            'Charge super into the zone is predictable and punished by knockback and crowd control abilities.',
            'Completely outclassed by other tanks like Rosa and Ash who bring more zone-holding value.'
        ],
        'El Primo': [
            'No ranged attack means he gets poked off the zone before he can establish any contesting presence.',
            'Jump super onto the zone is easily anticipated and punished by zone controllers waiting for it.',
            'Gets kited around the zone by any brawler with moderate range, contributing nothing to capture percentage.'
        ],
        'Dynamike': [
            'Lobbed attacks are too slow to reliably hit mobile enemies contesting the zone.',
            'Fragile HP pool means he dies instantly when enemies push the zone and reach him.',
            'Cannot hold or contest the zone himself and his area denial is outclassed by Barley and Sprout.'
        ],
        'Barley': [
            'Area denial puddles on the zone are easily walked through by tanky zone controllers.',
            'Fragile HP prevents him from contesting directly, and his damage is insufficient to keep enemies off.',
            'Outclassed by every other area controller for sustained Hot Zone presence and team utility.'
        ],
        'Tick': [
            'Lowest HP makes him completely unable to survive on the zone for any meaningful contest time.',
            'Mines on the zone are easily dodged or tanked through by dedicated zone-holding brawlers.',
            'Cannot defend himself and contributes nothing to the direct zone contesting that Hot Zone demands.'
        ],
        '8-Bit': [
            'Slowest movement prevents him from rotating between zones or repositioning during contested fights.',
            'Cannot dodge attacks on the zone, making him easy to focus down and remove from the point.',
            'Damage boost turret is stationary and forces him into predictable positions near the zone.'
        ],
        'Jacky': [
            'Extremely short range means she struggles to hit enemies who kite just outside the zone.',
            'Gets outranged by every area controller who can damage her while staying on the point.',
            'Other close-range brawlers like Rosa bring shields and better utility for zone contesting.'
        ],
        'Piper': [
            'Damage decreases at close range where all Hot Zone fights occur, making her nearly useless on the objective.',
            'Cannot contest the zone directly and her long-range sniping has minimal impact on zone capture.',
            'Every strength she has in Bounty becomes a weakness in Hot Zone\'s close-quarters zone fighting.'
        ],
        'Mortis': [
            'Dash attacks lack the sustained damage needed to hold zones against dedicated area controllers.',
            'Cannot stay on the zone without getting overwhelmed by the sustained fire that zone fights produce.',
            'Assassin playstyle is poorly suited for Hot Zone\'s objective of holding static positions over time.'
        ],
        'Crow': [
            'Poison chip damage does not provide the sustained presence needed to actually capture and hold zones.',
            'Low base damage means enemies on the zone can out-heal or out-sustain his poison easily.',
            'Poke-and-run playstyle is the opposite of what Hot Zone demands — standing on the objective.'
        ],
        'Leon': [
            'Invisibility super does not help hold zones since enemies know exactly where the zone is.',
            'Assassination playstyle conflicts with Hot Zone\'s need for sustained area presence and control.',
            'Gets overwhelmed by area damage when trying to contest the zone, negating his stealth advantage.'
        ],
        'R-T': [
            'Split mechanic provides no meaningful advantage for holding or contesting Hot Zone objectives.',
            'Both halves are individually weak and easily eliminated from the zone by area damage.',
            'Outclassed by every other brawler for zone contesting with no niche that compensates.'
        ],
        'Squeak': [
            'Slow-detonating bombs are walked out of by zone fighters who simply step away and return.',
            'Delayed damage means enemies can contest the zone freely between his explosions.',
            'Cannot deny zones effectively when enemies can easily time their movement around his slow blasts.'
        ],
        'Grom': [
            'X-pattern artillery misses frequently in the chaotic close-quarters fights around Hot Zone points.',
            'Extremely vulnerable to the aggressive zone pushes that close-range fighters use in Hot Zone.',
            'Cannot contest the zone directly and his inconsistent area damage fails to keep enemies off the point.'
        ],
        'Gray': [
            'Portal utility does not translate well to Hot Zone where the objectives are fixed and well-known.',
            'Low combat stats make him unable to hold or contest zones in any meaningful way.',
            'Team rotation portals are unnecessary when zones are static and both teams know exactly where to fight.'
        ],
        'Bea': [
            'Charged shot burst is strong but she lacks the sustained damage needed for prolonged zone fights.',
            'Fragile HP means she cannot survive on the zone against area damage dealers who dominate Hot Zone.',
            'One-shot burst playstyle conflicts with Hot Zone\'s need for consistent, sustained zone presence.'
        ],
        'Angelo': [
            'Poison arrows lack the sustained area pressure needed to control fixed Hot Zone points.',
            'Flight ability repositions him away from the zone, reducing his capture contribution.',
            'Better suited for open-map poking modes — Hot Zone demands direct zone presence he cannot provide.'
        ],
        'Larry & Lawrie': [
            'Both units are individually weak and easily cleared off the zone by area damage abilities.',
            'Split duo presence on the zone is negated by the splash damage that zone controllers use.',
            'Losing one unit dramatically reduces their ability to contribute to zone fights or capture percentage.'
        ],
        'Kenji': [
            'Katana dash burst kills individual targets but does not provide sustained zone presence or area control.',
            'Assassin playstyle poorly matches Hot Zone\'s need for holding static positions over extended periods.',
            'After dashing in for a kill he is left vulnerable on the zone against the remaining defenders.'
        ],
        'Shade': [
            'Stealth ambush mechanic is wasted in Hot Zone where enemies know exactly where to expect him — on the zone.',
            'Burst assassination does not translate to zone control or sustained area presence.',
            'Gets overwhelmed by area damage when trying to hold the zone, as stealth does not help while contesting.'
        ],
        'Mico': [
            'Wall jump mobility does not compensate for his inability to sustain presence on fixed zone points.',
            'Burst damage kills individual targets but does not help hold or deny the Hot Zone area.',
            'Assassin archetype is poorly suited for Hot Zone\'s objective-based, sustained-presence gameplay.'
        ],
        'Lily': [
            'Dash assassin kit is built for picks, not for holding and contesting static zone objectives.',
            'Thorn damage is close-range only, making her vulnerable to the area controllers who dominate Hot Zone.',
            'Every strength she has as an assassin becomes a liability in a mode that rewards sustained area presence.'
        ]
    },
    'Knockout': {
        // S-TIER
        'Belle': [
            'Bouncing shot punishes grouped enemies in elimination rounds where every HP point matters.',
            'Super marks a target to take increased damage, letting the team focus-fire for quick picks.',
            'Exceptional at opening rounds with long-range poke that forces enemies into unfavorable positions.'
        ],
        'Piper': [
            'Highest single-shot damage at max range makes her the premier first-pick sniper in Knockout.',
            'One well-placed shot can chunk an enemy to half HP, giving her team a massive advantage in the round.',
            'Auto Aimer gadget provides instant burst that can clutch a 1v1 in the final moments of a round.'
        ],
        'Angelo': [
            'Poison-tipped arrows apply lingering damage that denies healing and finishes low-HP enemies behind cover.',
            'Flight ability provides unmatched scouting and repositioning between elimination exchanges.',
            'Consistent long-range poke slowly bleeds out enemy teams who cannot afford to lose HP in Knockout.'
        ],
        'Melodie': [
            'Orbiting notes punish anyone who tries to rush her, making her nearly impossible to trade with up close.',
            'Incredible survivability lets her stay alive in clutch 1v1 and 2v1 endgame scenarios.',
            'Dash super provides an escape tool that keeps her alive when the round comes down to the wire.'
        ],
        'Berry': [
            'Freeze mechanic removes an enemy from the fight entirely, creating free elimination opportunities.',
            'Area denial forces enemies out of strong positions during critical round engagements.',
            'Disrupts enemy coordination by locking down key targets at the start of team fights.'
        ],
        'Kenji': [
            'Katana dash burst can instantly eliminate a squishy target to win the numbers advantage in a round.',
            'High mobility lets him dodge incoming fire and reposition between cover in open Knockout maps.',
            'Clutch potential is enormous — his dash resets allow him to chain kills in endgame 1v2 situations.'
        ],
        'Lily': [
            'Fast dash engage catches enemies off guard and secures eliminations before they can react.',
            'Thorn damage punishes enemies who try to trade at close range, winning most duels she initiates.',
            'Excels at cleaning up weakened targets in the final seconds of an elimination round.'
        ],
        // A-TIER
        'Brock': [
            'Long-range rockets deal high burst damage per hit, chunking enemies in poke-heavy Knockout maps.',
            'Rocket Rain super covers a wide area and forces enemies out of defensive positions.',
            'Incendiary star power adds area denial that limits enemy movement options during round engagements.'
        ],
        'Bo': [
            'Mines provide crucial area denial that controls choke points and punishes careless movement.',
            'Tripwire gadget detonates mines on demand for burst damage that can secure surprise eliminations.',
            'Consistent three-arrow spread gives him reliable poke at mid-range to soften targets for teammates.'
        ],
        'Spike': [
            'Exploding cactus needles deal massive damage when all spikes connect at close-mid range.',
            'Curveball star power makes projectiles curve unpredictably, catching enemies who think they dodged.',
            'Super slows enemies in a zone, setting up easy eliminations for the entire team.'
        ],
        'Nani': [
            'Highest damage per shot among sharpshooters when all orbs converge on a single target.',
            'Peep super provides scouting and a targeted missile that can finish off hiding enemies.',
            'Punishes stationary or predictable enemies with devastating burst that two-shots most brawlers.'
        ],
        'Mandy': [
            'Focused beam reaches extreme range with pinpoint accuracy, perfect for Knockout\'s open sightlines.',
            'Charged shots deal massive damage that forces enemies to stay behind cover or risk elimination.',
            'Cookie Crumbs gadget provides temporary vision denial that disrupts enemy team coordination.'
        ],
        'Bea': [
            'Supercharged shot deals enormous damage that can two-shot most brawlers in the game.',
            'Honey Coat star power grants a one-time shield that can save her in clutch moments.',
            'Slow effect from her super restricts enemy movement, setting up easy follow-up eliminations.'
        ],
        'Byron': [
            'Healing over time keeps teammates alive through sustained poke exchanges across rounds.',
            'Poison damage on enemies prevents natural regeneration, slowly grinding them down over the round.',
            'Injection super heals allies and damages enemies simultaneously, swinging team fights in his favor.'
        ],
        'Emz': [
            'Spray attack covers a wide area and deals heavy damage to enemies caught in the optimal range.',
            'Friendzoner gadget pushes away assassins and tanks who try to close the gap.',
            'Bad Karma star power stacks increasing damage the longer enemies stay in her spray zone.'
        ],
        'Crow': [
            'Poison prevents enemy healing for the entire duration, slowly wearing down the opposing team.',
            'Extra Toxic star power reduces poisoned enemies\' damage output by 25%, weakening their trade potential.',
            'Super provides a clutch escape or engage tool that can turn the tide in final-round situations.'
        ],
        'Surge': [
            'Upgrade mechanic rewards surviving — each stage makes him progressively more dangerous.',
            'Teleport super allows aggressive repositioning to catch enemies off guard or escape danger.',
            'At max upgrade his split shots cover a massive area, making him extremely hard to play against.'
        ],
        'Stu': [
            'Dash super charges from a single hit, giving him unmatched mobility in elimination rounds.',
            'Can dodge almost any attack with properly timed dashes, making him incredibly hard to eliminate.',
            'Aggressive dash chains let him pursue and finish weakened enemies before they can heal.'
        ],
        'Fang': [
            'Super chain kicks can wipe multiple enemies in a single engagement if properly aimed.',
            'Shoe gadget provides a free engage tool to close distance on long-range enemies.',
            'Fresh Kicks star power recharges super on each elimination, enabling devastating multi-kill chains.'
        ],
        'Shade': [
            'Shadow dash provides stealth engage that catches enemies completely unprepared.',
            'Burst damage from stealth can instantly delete squishy targets before they can react or flee.',
            'Excels at flanking during round standoffs when both teams are playing passively from cover.'
        ],
        'Mico': [
            'Wall-bouncing attack reaches enemies hiding behind cover in ways they don\'t expect.',
            'High mobility allows aggressive dives onto snipers and support brawlers in the backline.',
            'Super provides a gap-closing engage that can catch retreating enemies for the elimination.'
        ],
        'Maisie': [
            'Charged super provides a powerful targeted shot that deals massive burst damage from safety.',
            'Consistent mid-range damage output lets her contribute steady poke throughout the round.',
            'Disengage ability helps her escape overcommitted fights and survive to the end of the round.'
        ],
        'Willow': [
            'Mind control super forces an enemy to attack their own team, creating chaos in coordinated plays.',
            'Long-range poke with homing projectiles makes her difficult to dodge in open Knockout maps.',
            'Possession of a key enemy target at the right moment can single-handedly win a round.'
        ],
        'Charlie': [
            'Web trap catches enemies who step on it, locking them in place for easy team follow-up.',
            'Spider swarm super covers a wide area with persistent damage that zones enemies out.',
            'Excellent at controlling choke points and forcing enemies into unfavorable engagements.'
        ],
        // B-TIER
        'Colt': [
            'High damage potential if all bullets connect, capable of shredding enemies in open sightlines.',
            'Silver Bullet gadget pierces walls, catching enemies hiding behind cover for a surprise elimination.',
            'Requires precise aim that is hard to maintain consistently across multiple elimination rounds.'
        ],
        'Leon': [
            'Invisibility super allows sneaky flanks that can catch isolated enemies for a quick pick.',
            'Strong burst damage at close range can delete squishy targets before they can call for help.',
            'Lacks the range to contribute in poke-heavy standoffs that define many Knockout rounds.'
        ],
        'Mortis': [
            'Dash attacks let him dive backline snipers and supports for quick eliminations.',
            'Coiled Snake star power gives him extended dash range for surprise engages from unexpected angles.',
            'High risk playstyle — a failed dive means giving the enemy team a free numbers advantage.'
        ],
        'Tara': [
            'Black Hole super groups enemies together for devastating team wipe potential.',
            'Support from the Shadows star power spawns a shadow that provides extra damage and distraction.',
            'Reliable mid-range poke with her tarot cards softens enemies before committing to a fight.'
        ],
        'Gene': [
            'Magic Hand super pulls an enemy out of position, creating a guaranteed team focus opportunity.',
            'Consistent mid-range poke with splitting projectile helps wear down enemies safely.',
            'Landing a pull on a key target at the right moment can instantly decide the round.'
        ],
        'Max': [
            'Speed boost super lets the entire team reposition aggressively or retreat from bad fights.',
            'Fast movement speed makes her difficult to hit with projectile-based attacks.',
            'Phase Shifter gadget provides temporary invulnerability for clutch survival moments.'
        ],
        'Sandy': [
            'Sandstorm super creates a stealth zone that hides the entire team\'s movement from enemies.',
            'Consistent area damage from wide-spread attack helps chip down enemies in group engagements.',
            'Stealth field enables surprise pushes that catch enemy teams completely off guard.'
        ],
        'Amber': [
            'Continuous fire stream deals massive sustained damage when she can maintain line of sight.',
            'Fire puddles provide area denial that restricts enemy positioning during round engagements.',
            'Struggles against long-range snipers who can outrange her effective fire distance.'
        ],
        'Gale': [
            'Knockback super disrupts enemy positioning and can push them into the open for follow-up shots.',
            'Spring Ejector gadget provides team mobility through a jump pad for repositioning.',
            'Twister gadget creates a tornado that blocks enemy projectiles and disrupts their sightlines.'
        ],
        'Colette': [
            'Percentage-based damage shreds high-HP tanks who try to front-line for their team.',
            'Push It super charges through enemies dealing damage, useful for clutch eliminations.',
            'Consistent damage output regardless of enemy HP makes her versatile in any team composition.'
        ],
        'Ruffs': [
            'Power-Up super drops a permanent stat boost for a teammate, stacking the numbers advantage.',
            'Bouncing shots ricochet off walls, hitting enemies in positions they thought were safe.',
            'Sandbags gadget provides deployable cover that gives the team extra defensive options on open maps.'
        ],
        'Otis': [
            'Super silences an enemy, preventing them from using attacks and abilities for several seconds.',
            'Silencing a key target during a round engagement removes their contribution from the fight entirely.',
            'Consistent ink spray damage provides solid mid-range poke to support the team.'
        ],
        'Lola': [
            'Ego super creates a clone that doubles her damage output in a specific area.',
            'Strong burst potential when both Lola and her clone focus the same target.',
            'Good range and damage make her a solid mid-range presence in Knockout lineups.'
        ],
        'Janet': [
            'Flight super provides temporary invulnerability and repositioning over the entire map.',
            'Can fly over walls to chase down hiding enemies or escape dangerous situations.',
            'Vocal projectiles deal good damage at long range, contributing to poke wars effectively.'
        ],
        'Pearl': [
            'Heat mechanic ramps up her damage the longer she fires, rewarding sustained aggression.',
            'Can output devastating DPS once fully heated, melting enemies who underestimate her.',
            'Needs time to build heat — loses effectiveness in quick burst exchanges that Knockout often demands.'
        ],
        'Meg': [
            'Mech form transforms her into a tanky powerhouse with high damage and HP.',
            'Surviving in mech form gives her team an enormous advantage in raw stats.',
            'Without mech she is extremely vulnerable — dying early in a round wastes her potential.'
        ],
        'Bonnie': [
            'Form switching between cannon and melee gives her flexibility in both range and close combat.',
            'Cannon form provides solid long-range poke; melee form delivers burst damage for finishing.',
            'Landing cannon shots charges her super quickly, enabling aggressive form switches.'
        ],
        'Hank': [
            'Charged bubble attack deals massive area damage that can hit multiple enemies at once.',
            'Balloon super launches him into the air, providing escape and repositioning capability.',
            'Charge-up time on his attack makes him predictable and easy to dodge for skilled opponents.'
        ],
        'Kit': [
            'Grapple super lets him attach to teammates for healing or enemies for damage.',
            'High mobility with grapple mechanics allows unique positioning that other brawlers cannot replicate.',
            'Small hitbox and healing sustain make him surprisingly difficult to eliminate in clutch situations.'
        ],
        'Juju': [
            'Cursed projectiles apply a debuff that increases damage taken from all sources.',
            'Curse stacking on a single target makes them incredibly vulnerable to team focus fire.',
            'Range and damage output are moderate, requiring team coordination to maximize his curse value.'
        ],
        'Ollie': [
            'Skateboard super provides a mobile turret that deals damage and zones enemies.',
            'Good area control that denies enemy movement through key chokepoints.',
            'Effective at locking down positions during round standoffs when both teams play defensively.'
        ],
        'Eve': [
            'Hatchling spawns from missed shots create persistent pressure that forces enemy repositioning.',
            'Can attack over water terrain, gaining positional advantages on specific maps.',
            'Mid-range damage is decent but outclassed by dedicated snipers in long-range Knockout exchanges.'
        ],
        'Cordelius': [
            'Shadow Realm super isolates a single enemy for a guaranteed 1v1 duel.',
            'Excels at removing a key enemy target from the team fight, creating a temporary numbers advantage.',
            'If he wins the Shadow Realm duel, the enemy team loses a member without any counterplay possible.'
        ],
        'Najia': [
            'Snake projectiles curve around obstacles, hitting enemies in positions they think are safe.',
            'Unique attack path catches enemies off guard when they dodge in predictable directions.',
            'Damage output is moderate and requires precise aim to consistently land the curving shots.'
        ],
        // C-TIER
        'Nita': [
            'Bear summon provides a distraction and secondary damage source in elimination rounds.',
            'Hyper Bear star power increases the bear\'s attack speed, making it dangerous up close.',
            'Bear is easily kited and focused down by coordinated teams, reducing her value in Knockout.'
        ],
        'Jessie': [
            'Turret provides static area denial, but is easily destroyed by focused enemy fire.',
            'Bounce shots punish grouped enemies, but skilled teams spread out to avoid this.',
            'Low individual damage makes her reliant on turret value, which is unreliable against good players.'
        ],
        'Poco': [
            'Healing super keeps teammates alive through damage exchanges, extending round survivability.',
            'Da Capo star power adds healing to his main attack, providing passive sustain.',
            'Low damage output means the team sacrifices firepower for sustain, which is risky in Knockout.'
        ],
        'Penny': [
            'Cannon turret provides long-range area denial that zones enemies from key positions.',
            'Splash damage from her attack punishes enemies standing behind each other.',
            'Turret is stationary and easily avoided or destroyed, limiting its impact in mobile Knockout fights.'
        ],
        'Frank': [
            'Massive HP pool lets him tank damage and survive longer than most brawlers in a round.',
            'Stun super can lock down multiple enemies for devastating team follow-up plays.',
            'Extremely slow attack windup makes him easy to outplay, and he gets kited by ranged enemies.'
        ],
        'Bibi': [
            'Home Run bar increases her movement speed, helping her close gaps on ranged enemies.',
            'Knockback from charged swing disrupts enemy positioning in close-range engagements.',
            'Short range limits her effectiveness in the long-range poke wars common in Knockout maps.'
        ],
        'Rico': [
            'Bouncing bullets ricochet off walls for unexpected angles that catch enemies off guard.',
            'Super Bouncy star power increases bounce damage, rewarding skilled wall-bank shots.',
            'Requires walls to maximize his potential — many Knockout maps have open sightlines instead.'
        ],
        'Carl': [
            'Pickaxe boomerang provides consistent poke at mid-range with guaranteed return damage.',
            'Flying Hook super gives him temporary mobility and damage for aggressive engages.',
            'Predictable attack pattern and wait time between throws make him easy to play around.'
        ],
        'Mr. P': [
            'Porters from his suitcase provide persistent pressure and distraction on the battlefield.',
            'Handle With Care star power lets his suitcase bounce farther for additional poke range.',
            'Low individual damage and fragile porters make him a weak contributor in elimination rounds.'
        ],
        'Sprout': [
            'Wall super creates temporary terrain that blocks enemy movement and sightlines.',
            'Lobbed attack reaches over obstacles to hit enemies in positions other brawlers cannot reach.',
            'Slow projectile speed and predictable arc make his attacks easy to dodge for aware opponents.'
        ],
        'Lou': [
            'Freeze meter builds up on enemies, eventually stunning them in place for free damage.',
            'Super creates an icy area that slows enemies and makes them slide uncontrollably.',
            'Slow freeze buildup means enemies can disengage before getting frozen, reducing his threat.'
        ],
        'Buzz': [
            'Grapple super closes distance instantly for a stun-into-burst combo on isolated targets.',
            'Stun duration gives teammates time to follow up and secure the elimination.',
            'Requires charging his super through proximity, which is difficult against teams that maintain range.'
        ],
        'Griff': [
            'Coin spread deals massive damage at close-mid range when all projectiles connect.',
            'Business Resilience star power provides healing when he takes damage, improving his survivability.',
            'Damage falloff at range makes him ineffective in the long-range poke exchanges Knockout demands.'
        ],
        'Gus': [
            'Spirit shield absorbs incoming damage, giving him or an ally a temporary HP buffer.',
            'Decent mid-range poke contributes to softening enemies during standoff phases.',
            'Shield requires charging and disappears quickly, making it less reliable than consistent healing.'
        ],
        'Gray': [
            'Portal link enables rapid team rotations that can catch enemies from unexpected angles.',
            'Unique teleport utility provides map-wide repositioning for the entire team.',
            'Low combat stats make him a liability in direct fights, and portal is predictable once placed.'
        ],
        'Chester': [
            'Random super abilities occasionally produce powerful effects that swing round outcomes.',
            'Constant attack spam provides chip damage that wears down enemies over time.',
            'Randomness means he cannot be relied upon for a specific strategy in elimination rounds.'
        ],
        'Doug': [
            'Healing ability sustains teammates through poke exchanges, extending their survival.',
            'Can keep a wounded ally alive long enough to turn a round in the team\'s favor.',
            'Low damage output and weaker healing than other supports make him an underwhelming pick.'
        ],
        'Chuck': [
            'Rail movement along walls provides unique repositioning that catches enemies off guard.',
            'Can quickly rotate between cover positions faster than any other brawler.',
            'Completely wall-dependent — open Knockout maps remove his primary mobility advantage.'
        ],
        'Moe': [
            'Drill super repositions him underground to a targeted location for surprise attacks.',
            'Can bypass enemy defensive lines and appear behind them for unexpected eliminations.',
            'Telegraphed drill travel path gives enemies time to react and reposition before he surfaces.'
        ],
        'Meeple': [
            'Board game mechanics provide varied buffs that can situationally benefit the team.',
            'Adaptable playstyle based on the random effects received each round.',
            'Inconsistency of random mechanics makes him unreliable in the high-stakes Knockout format.'
        ],
        'Clancy': [
            'Evolved attacks increase in power through each stage, rewarding survival across rounds.',
            'At max evolution he becomes a significant threat with enhanced attack patterns.',
            'Needs multiple supers to reach full power — often eliminated before he can fully evolve.'
        ],
        // D-TIER
        'Shelly': [
            'No range to contribute in the poke phase that defines most Knockout rounds.',
            'Gets picked off by snipers and long-range brawlers before she can close the distance.',
            'Super chain is her only threat, and smart teams simply avoid letting her get close enough.'
        ],
        'Bull': [
            'Cannot close distance on open Knockout maps where long-range brawlers dominate.',
            'Charge super is predictable and leaves him stranded if he doesn\'t secure the kill.',
            'Any team with decent spacing completely neutralizes his kit for the entire round.'
        ],
        'El Primo': [
            'Easily kited by every long-range brawler that appears on standard Knockout maps.',
            'Meteor Rush speed boost is his only gap-closer, and it is not enough against coordinated teams.',
            'Provides no ranged poke or team utility, making him dead weight in elimination standoffs.'
        ],
        'Dynamike': [
            'Lobbed attacks are too slow to reliably hit skilled players who dodge in Knockout.',
            'Free elimination for any assassin who closes the gap on him during a round.',
            'Outclassed by every other long-range option who deals damage faster and more consistently.'
        ],
        'Barley': [
            'Area denial is walked out of easily, and his low HP makes him a prime elimination target.',
            'Cannot trade effectively with any brawler at range due to slow projectile and low burst.',
            'Teams can simply avoid his puddles and focus him down for a quick numbers advantage.'
        ],
        'Tick': [
            'Lowest HP in the game means a single sniper shot nearly eliminates him outright.',
            'Mine placement is slow and predictable, providing minimal threat to attentive opponents.',
            'Needs babysitting from teammates to survive, draining team resources in a mode about eliminations.'
        ],
        '8-Bit': [
            'Slowest movement speed makes him a stationary target that every sniper dreams of facing.',
            'Cannot dodge attacks or reposition when the fight shifts, leaving him exposed and eliminated.',
            'Damage boost turret forces him to stand still in a mode where repositioning is essential.'
        ],
        'Jacky': [
            'Tiny attack range means she never reaches enemies who maintain basic spacing in Knockout.',
            'Gets poked down for free by every ranged brawler while slowly walking toward them.',
            'Offers nothing to the team in elimination rounds where ranged damage and picks are everything.'
        ],
        'Rosa': [
            'Short range and no gap-closer make her unable to reach enemies on open Knockout maps.',
            'Shield super only helps if she is already in melee range, which rarely happens against ranged teams.',
            'Completely outclassed by other tanks who bring crowd control or mobility to close distance.'
        ],
        'Pam': [
            'Healing station is stationary and encourages camping, which is punished by aggressive teams.',
            'Wide attack spread makes her damage inconsistent at the ranges Knockout is typically played at.',
            'Better supports exist who provide more impactful utility without requiring a fixed position.'
        ],
        'Darryl': [
            'Barrel roll super closes distance, but he is easily burst down after landing in the enemy team.',
            'Short effective range means he contributes nothing during the poke phase of a round.',
            'Predictable engage pattern lets enemies save their knockback or stun abilities to counter him.'
        ],
        'R-T': [
            'Split mechanic is too slow and clunky to provide value in fast-paced elimination rounds.',
            'Both halves are individually weak and easily picked off by focused enemy fire.',
            'Offers no meaningful utility that other brawlers don\'t provide better in every aspect.'
        ],
        'Squeak': [
            'Sticky bombs detonate slowly, giving enemies ample time to dodge before damage is dealt.',
            'No immediate burst damage means he cannot secure eliminations when it matters most.',
            'Provides zero threat to enemies who simply walk away from his slow-detonating attacks.'
        ],
        'Ash': [
            'Rage mechanic requires taking damage to power up, which is counterproductive in a survival mode.',
            'Needs to be hit repeatedly before becoming dangerous, and teams can just avoid him during rage.',
            'Short range and reliance on rage stacks make him a weak pick in ranged Knockout engagements.'
        ],
        'Edgar': [
            'Jump super is his only gap-closer, and it is predictable enough for enemies to counter.',
            'After jumping in, he either gets the kill or dies — no escape plan or team utility.',
            'Gets shredded by any coordinated team that focuses him the moment he lands.'
        ],
        'Buster': [
            'Shield timing is difficult to use reactively in the fast exchanges of Knockout rounds.',
            'Enemies can simply wait out his shield and then burst him while it is on cooldown.',
            'Low damage output without shield conversion makes him a weak contributor to team firepower.'
        ],
        'Sam': [
            'Knuckle buster engage is telegraphed and easy to dodge for opponents who see it coming.',
            'Short effective range limits his contribution during the ranged poke phase of rounds.',
            'Outclassed by other melee brawlers who have better mobility or burst to secure eliminations.'
        ],
        'Draco': [
            'Short fire-breath range means he gets poked down by snipers before he can deal any damage.',
            'Lacks gap-closing ability to reach long-range enemies on open Knockout maps.',
            'His tank stats are wasted when enemies simply maintain distance and chip him down safely.'
        ],
        'Larry & Lawrie': [
            'Split units are individually weak and easily picked off by coordinated sniper focus.',
            'Losing one unit severely reduces combat effectiveness for the rest of the round.',
            'Neither unit brings enough damage or utility to justify the risk in elimination-based play.'
        ]
    },
    'Duels': {
        // S-TIER
        'Melodie': [
            'Orbiting notes deal automatic damage to any enemy within range, winning most close-range trades.',
            'Dash super lets her close distance or escape, adapting to any opponent\'s playstyle.',
            'Very few brawlers can beat her in a 1v1 once her notes are active and orbiting.'
        ],
        'Kenji': [
            'Katana dash burst deletes most brawlers before they can output enough damage to trade back.',
            'High mobility between dashes lets him dodge attacks and reposition mid-duel effortlessly.',
            'Dominates both aggro and mid-range matchups with lethal combo potential.'
        ],
        'Lily': [
            'Fast dash engage catches opponents off guard and secures eliminations before they can kite.',
            'Thorn damage punishes enemies who try to trade shots at close range, winning most exchanges.',
            'Exceptional at chasing down fleeing opponents who try to play passively and avoid the fight.'
        ],
        'Draco': [
            'Tank HP combined with fire breath damage makes him nearly impossible to out-trade in melee.',
            'Self-sustain from gadgets and star powers lets him outlast opponents in extended exchanges.',
            'Dominates the majority of 1v1 matchups where enemies cannot maintain distance from his flames.'
        ],
        'Shade': [
            'Stealth dash enables surprise burst damage that eliminates opponents before they can react.',
            'Shadow form provides damage mitigation and repositioning that most duelists cannot match.',
            'Wins most 1v1 engagements by dictating when and how the fight begins through stealth timing.'
        ],
        'Mico': [
            'Wall-bouncing attacks hit enemies from unexpected angles, making him incredibly difficult to dodge.',
            'High mobility and gap-closing ability let him stick to opponents who try to kite or retreat.',
            'Burst damage output is high enough to eliminate most brawlers before they can fight back.'
        ],
        'Berry': [
            'Freeze mechanic immobilizes the opponent, removing their ability to dodge or retaliate.',
            'Once frozen, the enemy takes free damage with no counterplay available to them.',
            'Area denial forces the opponent into unfavorable positions in the confined 1v1 arena.'
        ],
        // A-TIER
        'Leon': [
            'Invisibility super lets him reposition and ambush the opponent from an unexpected angle.',
            'High burst damage at close range shreds enemies before they can react to his engage.',
            'Clone gadget creates a decoy that wastes the opponent\'s ammo and reveals their position.'
        ],
        'Surge': [
            'Each upgrade stage makes him progressively stronger, snowballing from round wins.',
            'Teleport super provides instant repositioning to dodge attacks or close distance aggressively.',
            'At max stage his split shots make him nearly impossible to dodge in the confined duel arena.'
        ],
        'Fang': [
            'Super kick provides a gap-closing engage with high burst that catches opponents off guard.',
            'Fresh Kicks star power recharges super on kill, maintaining momentum between duel rounds.',
            'Shoe gadget gives him a free engage tool that opponents must constantly play around.'
        ],
        'Stu': [
            'Dash super charges from a single hit, giving him the best dodge mobility in any 1v1.',
            'Can chain dashes to stay almost permanently mobile, making him extremely hard to hit.',
            'Burn damage from dashes adds up over time, winning extended duels through attrition.'
        ],
        'Edgar': [
            'Self-healing on each punch sustains him through close-range brawls that other melee fighters lose.',
            'Jump super closes distance on any opponent, forcing the fight to his preferred close range.',
            'Extremely fast unload speed lets him burst down opponents before they can fully react.'
        ],
        'Buzz': [
            'Grapple super stuns the opponent on contact, guaranteeing free follow-up damage.',
            'Stun duration is long enough to unload a full burst combo for an elimination.',
            'Close-range damage output is devastating once he lands his grapple engage.'
        ],
        'Mortis': [
            'Dash attacks let him dodge projectiles while simultaneously dealing damage.',
            'Coiled Snake star power extends his first dash range, catching opponents at unexpected distance.',
            'Super healing keeps him alive in extended fights, allowing him to outlast many opponents.'
        ],
        'Spike': [
            'Cactus needles deal devastating damage when all spikes land on a single target up close.',
            'Curveball star power makes projectiles curve, catching dodging opponents by surprise.',
            'Slowing super zone restricts the opponent\'s movement, making follow-up shots almost guaranteed.'
        ],
        'Crow': [
            'Poison prevents enemy healing for its full duration, denying sustain in extended duels.',
            'Extra Toxic star power reduces the poisoned opponent\'s damage by 25%, weakening their trades.',
            'Super provides both an escape and an engage, giving him unmatched flexibility in 1v1 scenarios.'
        ],
        'Angelo': [
            'Poison-tipped arrows apply lingering damage that ticks down the opponent\'s HP over time.',
            'Flight ability provides unmatched repositioning to maintain optimal range in the duel.',
            'Consistent ranged poke forces melee opponents to play on his terms or slowly bleed out.'
        ],
        'Kit': [
            'Grapple ability provides high mobility that lets him dodge attacks and reposition freely.',
            'Healing sustain from his kit makes him surprisingly durable in extended 1v1 exchanges.',
            'Small hitbox makes him difficult to hit consistently, causing opponents to waste ammo.'
        ],
        'Cordelius': [
            'Shadow Realm super is his natural habitat — Duels is essentially his entire gameplan.',
            'Gains stat bonuses inside the Shadow Realm that make him stronger than almost any opponent.',
            'Sustained damage and healing in shadow form let him outlast brawlers who rely on burst.'
        ],
        // B-TIER
        'Shelly': [
            'Super chain combo deals devastating damage up close, deleting enemies who let her get in range.',
            'Shell Shock star power slows enemies hit by her super, preventing escape after the first hit.',
            'Struggles against any opponent who maintains distance and pokes her down from range.'
        ],
        'Bull': [
            'Highest close-range DPS shreds any opponent who gets caught within his shotgun range.',
            'Berserker star power increases reload speed at low HP, giving him a comeback mechanic.',
            'Charge super closes distance but is predictable, and ranged opponents kite him for free.'
        ],
        'Darryl': [
            'Barrel roll super closes distance instantly for a point-blank burst combo.',
            'Steel Hoops star power reduces damage during the roll, helping him survive the engage.',
            'Consistent close-range DPS lets him win most fights once he is on top of the opponent.'
        ],
        'Bibi': [
            'Home Run bar speed boost helps her close distance on ranged opponents in the small arena.',
            'Knockback from charged swing disrupts opponent positioning and creates space for follow-ups.',
            'Decent HP and melee damage let her trade effectively against other close-range duelists.'
        ],
        'Frank': [
            'Massive HP pool lets him absorb damage and outlast opponents in extended exchanges.',
            'Stun super locks down the opponent for guaranteed follow-up damage.',
            'Extremely slow attack wind-up is easily dodged by mobile opponents in the 1v1 arena.'
        ],
        'Colette': [
            'Percentage-based damage means she deals consistent damage regardless of opponent HP.',
            'Push It super charges through the opponent for burst damage and repositioning.',
            'Effective against tanks and high-HP brawlers who cannot sustain through her percentage shred.'
        ],
        'Emz': [
            'Spray damage creates a kill zone at optimal range that punishes enemies who stand still.',
            'Friendzoner gadget pushes away melee opponents who try to close the gap.',
            'Bad Karma star power stacks increasing damage the longer the opponent stays in her spray.'
        ],
        'Max': [
            'Fastest base movement speed makes her incredibly hard to hit with projectile attacks.',
            'Phase Shifter gadget provides temporary invulnerability for clutch dodge moments.',
            'Sustained damage output from rapid-fire attacks wears down opponents over extended fights.'
        ],
        'Amber': [
            'Continuous fire stream deals massive sustained damage when she maintains line of sight.',
            'Fire puddles from her super restrict opponent movement in the small duel arena.',
            'Struggles against burst brawlers who kill her before she can ramp up her sustained damage.'
        ],
        'Bonnie': [
            'Form switching provides flexibility to fight at both long range and close range.',
            'Cannon form delivers strong poke; melee form provides burst damage for finishing opponents.',
            'Dual forms let her adapt to any opponent\'s preferred fighting distance.'
        ],
        'Meg': [
            'Mech form provides massive HP and damage buffs that overwhelm most opponents in 1v1.',
            'Once in mech, very few brawlers can trade effectively against her stat advantage.',
            'Without mech she is extremely fragile — losing it mid-duel often means losing the round.'
        ],
        'Lola': [
            'Clone super doubles her damage when both she and the clone focus the same target.',
            'Strong burst potential makes her dangerous in the quick exchanges Duels demands.',
            'Decent range and consistent damage output let her compete against most mid-range opponents.'
        ],
        'Sam': [
            'Knuckle buster teleport provides a unique engage and reposition tool in 1v1 scenarios.',
            'High HP and close-range damage let him brawl effectively against other melee fighters.',
            'Struggles against ranged opponents who can dodge his knuckle and kite him around the arena.'
        ],
        'Hank': [
            'Fully charged bubble attack deals devastating burst damage in a single shot.',
            'Balloon super provides escape or aggressive repositioning during the duel.',
            'Charge-up time is a major weakness — aggressive opponents rush him before he can fire.'
        ],
        'Pearl': [
            'Heat mechanic ramps up her DPS the longer she fires, rewarding sustained aggression.',
            'At max heat she outputs some of the highest sustained damage in the game.',
            'Needs time to build heat — burst brawlers can kill her before she reaches full power.'
        ],
        'Bea': [
            'Supercharged shot deals enormous burst damage that two-shots most brawlers.',
            'Honey Coat star power provides a one-time shield that can survive a lethal hit.',
            'Slow projectile speed means skilled opponents can dodge her key supercharged shot.'
        ],
        'Maisie': [
            'Charged super provides a powerful burst shot that can chunk opponents from mid-range.',
            'Consistent damage output at mid-range lets her compete in sustained poke exchanges.',
            'Disengage ability helps her reset fights when the opponent gets too close for comfort.'
        ],
        'Ash': [
            'Rage mechanic makes him progressively stronger the more damage he takes in the fight.',
            'At full rage his attack speed and damage are devastating in close-range brawls.',
            'Opponents who fail to burst him down quickly face an increasingly dangerous melee monster.'
        ],
        'Najia': [
            'Curving snake projectiles catch opponents who dodge in predictable directions.',
            'Unique attack pattern is difficult for enemies to read and avoid consistently.',
            'Moderate damage output means she needs multiple hits to secure eliminations in 1v1.'
        ],
        // C-TIER
        'Colt': [
            'High DPS if all bullets connect, but requires near-perfect aim against a dodging opponent.',
            'Silver Bullet gadget pierces walls for surprise burst that can turn a losing fight.',
            'Narrow bullet spread is easily sidestepped by mobile opponents in the open duel arena.'
        ],
        'Brock': [
            'Long-range rockets deal solid burst damage per hit against stationary or predictable opponents.',
            'Rocket Fuel gadget fires a supercharged rocket for extra burst in clutch moments.',
            'Slow projectile speed makes his rockets dodgeable by fast-moving duel opponents.'
        ],
        'Nita': [
            'Bear summon creates a 2v1 scenario that overwhelms many opponents.',
            'Hyper Bear star power makes the bear attack fast enough to shred close-range opponents.',
            'Bear is easily kited by mobile brawlers, and without it Nita\'s damage is low.'
        ],
        'El Primo': [
            'Meteor Rush star power provides speed boost after super, helping him stick to opponents.',
            'High HP and close-range burst let him trade effectively against other melee brawlers.',
            'Gets kited and poked down by any ranged opponent who maintains distance.'
        ],
        'Rosa': [
            'Shield super makes her nearly unkillable for its duration, winning trades she would otherwise lose.',
            'Strong close-range DPS with fast attack speed lets her shred melee opponents.',
            'No gap-closer means ranged opponents can kite her indefinitely around the arena.'
        ],
        'Carl': [
            'Pickaxe boomerang provides consistent mid-range poke with guaranteed return damage.',
            'Flying Hook super gives him temporary mobility and close-range damage.',
            'Predictable attack pattern and wait time between throws are easily exploited in 1v1.'
        ],
        'Rico': [
            'Bouncing bullets ricochet off walls for unexpected angle shots in the duel arena.',
            'Super Bouncy star power increases bounce damage, rewarding smart wall-bank plays.',
            'Requires walls to maximize potential — without bounces his damage is average.'
        ],
        'Tara': [
            'Black Hole super pulls the opponent in for guaranteed burst damage follow-up.',
            'Shadow from Support from the Shadows provides extra damage and distraction.',
            'Needs her super to be truly threatening — without it she is a below-average mid-range fighter.'
        ],
        'Gene': [
            'Magic Hand pull drags the opponent directly to him for point-blank burst damage.',
            'Landing a pull against most brawlers guarantees enough damage for an elimination.',
            'Without his super, Gene\'s damage output and combat ability are mediocre in 1v1.'
        ],
        'Sandy': [
            'Sandstorm stealth zone hides his position, making the opponent guess where he is.',
            'Wide attack spread makes him hard to miss with, providing consistent chip damage.',
            'Low burst damage means he struggles to quickly eliminate opponents who fight back aggressively.'
        ],
        'Gale': [
            'Knockback super disrupts the opponent\'s positioning and can push them into corners.',
            'Twister gadget blocks projectiles and disrupts the opponent\'s aim and pathing.',
            'Low individual damage means he struggles to finish off opponents who sustain through his poke.'
        ],
        'Bo': [
            'Mines provide area denial that restricts opponent movement in the small duel arena.',
            'Tripwire gadget detonates mines on demand for burst damage at a specific location.',
            'Predictable mine placement and moderate attack damage make him outclassed by dedicated duelists.'
        ],
        'Pam': [
            'Healing station provides sustain that lets her outlast opponents in extended exchanges.',
            'Wide attack spread makes her damage consistent at mid-range without precision aiming.',
            'Stationary turret and moderate DPS make her too passive against aggressive duel opponents.'
        ],
        'Ruffs': [
            'Power-Up super drops a stat boost that makes him significantly stronger for the round.',
            'Bouncing shots ricochet off walls, hitting opponents from unexpected angles.',
            'Without the power-up buff his stats are mediocre, making him reliant on landing the super early.'
        ],
        'Griff': [
            'Coin burst deals massive damage at point-blank range when all projectiles connect.',
            'Business Resilience healing gives him sustain advantage in extended 1v1 brawls.',
            'Damage drops off significantly at range, making him weak against opponents who maintain distance.'
        ],
        'Gus': [
            'Spirit shield provides a damage buffer that absorbs one hit before breaking.',
            'Decent mid-range poke helps him chip down opponents over time.',
            'Shield is a one-time buffer that disappears quickly, leaving him without sustain for the rest of the fight.'
        ],
        'Chester': [
            'Random super effects occasionally produce powerful abilities that swing the duel.',
            'Rapid-fire attack spam provides consistent chip damage that wears opponents down.',
            'Cannot rely on any specific super ability, making him unpredictable but inconsistent.'
        ],
        'Mandy': [
            'Focused beam deals high damage at extreme range when fully charged.',
            'Can poke down opponents from a distance they cannot effectively return fire.',
            'Charge-up time and narrow beam make her easy to dodge for mobile 1v1 opponents.'
        ],
        'Chuck': [
            'Rail movement provides unique repositioning that catches opponents off guard.',
            'Can quickly dodge attacks by jumping onto nearby walls and riding them.',
            'Wall-dependent mobility — arena layouts without good walls cripple his playstyle.'
        ],
        'Moe': [
            'Drill super repositions him for surprise flanks in the confined duel arena.',
            'Can bypass the opponent\'s defensive position and appear behind them unexpectedly.',
            'Telegraphed drill path gives attentive opponents time to react and counter.'
        ],
        'Clancy': [
            'Evolved attacks grow stronger through super stages, rewarding survival across rounds.',
            'At max evolution his attacks become a significant 1v1 threat.',
            'Needs multiple supers to reach full power — most duels end before he fully evolves.'
        ],
        'Larry & Lawrie': [
            'Split units create a 2v1 scenario that overwhelms certain opponents.',
            'Both units can attack from different angles, making it hard to dodge both simultaneously.',
            'Each unit is individually weak and easily destroyed, reducing their combined effectiveness.'
        ],
        'Meeple': [
            'Board game buffs can occasionally provide powerful advantages in the right matchup.',
            'Adaptable playstyle based on random effects gives him varied tools each round.',
            'Random mechanics make him unreliable — he cannot plan a consistent dueling strategy.'
        ],
        'Eve': [
            'Hatchling spawns from missed shots create persistent pressure in the small arena.',
            'Can attack over water terrain for positional advantage on specific arena layouts.',
            'Mid-range damage is outclassed by dedicated duelists who output more burst or sustain.'
        ],
        'Janet': [
            'Flight super provides temporary safety and repositioning above the arena.',
            'Can buy time to regenerate HP by flying out of the opponent\'s attack range.',
            'Deals no damage while flying and loses initiative, letting the opponent reposition freely.'
        ],
        // D-TIER
        'Jessie': [
            'Turret is easily destroyed in 1v1, removing her primary source of additional damage.',
            'Bounce shots require hitting a target standing next to the turret, which is predictable.',
            'Low individual combat stats make her one of the weakest direct fighters in the game.'
        ],
        'Poco': [
            'Lowest damage output in the game — he simply cannot kill opponents fast enough in 1v1.',
            'Healing super is designed for teammates, providing minimal value in a solo duel.',
            'His entire kit is built around team support, making him fundamentally unfit for Duels.'
        ],
        'Piper': [
            'Damage scales with distance, but the small duel arena limits her ability to maintain max range.',
            'Extremely fragile — any opponent who closes distance eliminates her almost instantly.',
            'Auto Aimer gadget is her only close-range option, and it is not enough to survive melee pressure.'
        ],
        'Dynamike': [
            'Lobbed attacks are easily dodged by a single attentive opponent in 1v1.',
            'Any mobile opponent walks through his bombs and bursts him down before he can react.',
            'Dyna-Jump star power provides escape mobility but sacrifices his own HP to use it.'
        ],
        'Barley': [
            'Area denial is walked out of trivially in 1v1 where the opponent focuses solely on him.',
            'Fragile HP means any opponent who closes the gap eliminates him in seconds.',
            'Slow damage ticks give opponents ample time to heal and re-engage on their terms.'
        ],
        'Tick': [
            'Lowest HP in the game — nearly any brawler two-shots him in direct 1v1 combat.',
            'Mine placement is slow and easily dodged by a single focused opponent.',
            'Has no self-defense capability once an opponent reaches close range.'
        ],
        '8-Bit': [
            'Slowest movement speed makes him unable to dodge attacks or chase fleeing opponents.',
            'Damage booster turret is irrelevant when he cannot survive long enough to use it.',
            'Mobile opponents simply kite around him, dealing damage while he waddles toward them.'
        ],
        'Jacky': [
            'Extremely short attack range means she must walk directly into the opponent\'s damage.',
            'Gets poked down to nothing before she reaches any brawler with moderate range.',
            'No gap-closer or mobility option to compensate for her tiny effective range.'
        ],
        'Penny': [
            'Turret is stationary and easily destroyed by any opponent who focuses it in 1v1.',
            'Low individual damage and slow attack speed make her weak in direct combat exchanges.',
            'Splash mechanic requires hitting a target standing behind something — useless in 1v1.'
        ],
        'Mr. P': [
            'Porters are fragile and easily one-shot by most opponents, providing minimal distraction.',
            'Low base damage and slow attack speed make him a poor 1v1 combatant.',
            'His entire kit is designed for persistent team pressure, not direct solo dueling.'
        ],
        'Sprout': [
            'Wall super blocks movement but provides little damage advantage in the small arena.',
            'Lobbed attacks are slow and predictable against a single focused opponent.',
            'Fragile HP and no self-defense tools make him an easy target for any aggressive duelist.'
        ],
        'Lou': [
            'Freeze buildup is too slow to lock down opponents before they burst him down.',
            'Super ice zone is walked out of easily by a single opponent who is focused on him.',
            'Low damage output means he cannot threaten opponents fast enough to win trades.'
        ],
        'Byron': [
            'Healing over time is designed for sustained team support, not burst 1v1 combat.',
            'Low damage per shot means he loses trades against almost any dedicated duelist.',
            'Cannot kill fast enough — opponents heal naturally between his slow-ticking poison shots.'
        ],
        'Belle': [
            'Mark super increases damage taken, but she lacks the burst to capitalize in 1v1.',
            'Bounce shot requires a second target nearby, which does not exist in solo Duels.',
            'Outclassed by other sharpshooters who deal more immediate damage in direct combat.'
        ],
        'Nani': [
            'Orb convergence requires precise aim that is extremely difficult against a dodging opponent.',
            'Missing a shot wastes massive potential damage, and opponents punish her during reload.',
            'Peep super is slow to deploy and easily dodged in the close-range duel arena.'
        ],
        'Grom': [
            'Lobbed attack with a specific detonation range is difficult to land consistently in 1v1.',
            'Enemies who close the gap or stay outside his optimal range negate his entire kit.',
            'Fragile HP and no escape tools make him vulnerable to any opponent who rushes him.'
        ],
        'R-T': [
            'Split mechanic is clunky and provides little benefit in the fast-paced 1v1 format.',
            'Both halves are individually weak and easily dealt with by any competent duelist.',
            'Offers no unique advantage in Duels — every aspect of his kit is done better by others.'
        ],
        'Squeak': [
            'Sticky bombs detonate slowly, giving the opponent ample time to walk away from them.',
            'No burst damage means he cannot threaten opponents who play around his slow timers.',
            'One of the least threatening brawlers in direct 1v1 combat due to his delayed damage.'
        ],
        'Otis': [
            'Silence super is less impactful in 1v1 since opponents rely more on basic attacks anyway.',
            'Low damage output means he loses most straight-up fights against dedicated duelists.',
            'His utility is team-oriented — silencing one opponent is less impactful when there is only one.'
        ],
        'Willow': [
            'Mind control super has no value in 1v1 — there are no teammates for the opponent to attack.',
            'Low damage output from her homing projectiles is not enough to win direct trades.',
            'Her entire kit is designed around team disruption, making her fundamentally unfit for Duels.'
        ],
        'Gray': [
            'Portal link is designed for team rotations — useless utility in a solo 1v1 duel.',
            'Lowest combat stats in the game make him an easy target for any opponent.',
            'His entire value comes from team utility, which does not exist in the Duels format.'
        ],
        'Doug': [
            'Healing mechanic is designed for supporting teammates, providing less value in solo combat.',
            'Low damage output means he cannot threaten opponents in direct 1v1 exchanges.',
            'Gets out-damaged by virtually every brawler who is focused solely on fighting him.'
        ],
        'Charlie': [
            'Web traps are designed for team follow-up — trapping an opponent alone provides limited value.',
            'Spider swarm requires area control that is less impactful in the small 1v1 arena.',
            'Her kit is built around team disruption, making her fundamentally weaker in solo Duels.'
        ],
        'Buster': [
            'Shield is designed to block damage for teammates, losing most of its value in solo play.',
            'Enemies can simply wait out his shield and then burst him during the cooldown window.',
            'Low base damage without shield conversion makes him a weak direct combatant in 1v1.'
        ],
        'Juju': [
            'Curse debuff is designed for team focus fire — solo he cannot capitalize on it fast enough.',
            'Low individual damage means the curse amplification is wasted without team follow-up.',
            'His entire kit relies on teammates dealing damage to cursed targets, which Duels does not provide.'
        ],
        'Ollie': [
            'Skateboard turret is designed for zone control in team modes, not 1v1 dueling.',
            'Low direct combat damage makes him a weak fighter without his turret\'s supplementary damage.',
            'Opponents easily destroy the turret and then focus him down with their full attention.'
        ]
    }
};

const TIER_COLORS = {
    S: { bg: '#ff4444', text: '#fff', label: 'S' },
    A: { bg: '#ff8c00', text: '#fff', label: 'A' },
    B: { bg: '#ffd700', text: '#1a1a2e', label: 'B' },
    C: { bg: '#4caf50', text: '#fff', label: 'C' },
    D: { bg: '#666', text: '#fff', label: 'D' }
};

const TIER_MODES = ['Overall', 'Gem Grab', 'Brawl Ball', 'Showdown', 'Heist', 'Bounty', 'Hot Zone', 'Knockout', 'Duels'];

let currentTierMode = 'Overall';

async function loadTierList() {
    if (tierListLoaded) return;

    const container = document.getElementById('tierlist-container');
    container.innerHTML = '<div class="loader"></div>';

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        tierBrawlers = data.list || data;
        tierListLoaded = true;

        document.querySelectorAll('.tier-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tier-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTierMode = btn.dataset.mode;
                renderTierList(currentTierMode);
            });
        });

        renderTierList('Overall');
    } catch (err) {
        console.error('Failed to load tier list:', err);
        container.innerHTML = '<p class="error-message">Could not load brawler data. Please try again later.</p>';
    }
}

function renderTierList(mode) {
    const container = document.getElementById('tierlist-container');
    const tiers = TIER_DATA[mode];
    if (!tiers) { container.innerHTML = '<p class="error-message">No tier data for this mode.</p>'; return; }

    let html = '';
    for (const tier of ['S', 'A', 'B', 'C', 'D']) {
        const brawlerNames = tiers[tier] || [];
        const colors = TIER_COLORS[tier];
        html += `<div class="tier-row"><div class="tier-label" style="background:${colors.bg};color:${colors.text};">${colors.label}</div><div class="tier-brawlers">${brawlerNames.map(name => {
            const brawler = tierBrawlers.find(b => b.name === name);
            if (!brawler) return '';
            return `<div class="tier-brawler" onclick="showTierReason('${name.replace(/'/g, "\\'")}','${mode}')" title="${name}"><img src="${brawler.imageUrl || brawler.imageUrl2 || ''}" alt="${name}" loading="lazy"><span class="tier-brawler-name">${name}</span></div>`;
        }).join('')}</div></div>`;
    }
    container.innerHTML = html;
}

function showTierReason(name, mode) {
    const reasons = TIER_REASONS[mode];
    const reason = reasons ? reasons[name] : null;
    const brawler = tierBrawlers.find(b => b.name === name);

    const tiers = TIER_DATA[mode];
    let tierLabel = '?';
    for (const t of ['S', 'A', 'B', 'C', 'D']) {
        if (tiers[t] && tiers[t].includes(name)) { tierLabel = t; break; }
    }
    const colors = TIER_COLORS[tierLabel] || { bg: '#666', text: '#fff' };

    const reasonList = Array.isArray(reason) ? reason : (reason ? [reason] : ['No specific analysis available for this brawler in this mode.']);

    const popup = document.getElementById('tier-reason-popup');
    const content = document.getElementById('tier-reason-content');
    content.innerHTML = `
        <div class="tier-reason-header">
            ${brawler ? `<img src="${brawler.imageUrl || brawler.imageUrl2 || ''}" alt="${name}">` : ''}
            <div>
                <h3>${name}</h3>
                <span class="tier-reason-badge" style="background:${colors.bg};color:${colors.text};">Tier ${tierLabel}</span>
                <span class="tier-reason-mode">${mode}</span>
            </div>
        </div>
        <ul class="tier-reason-list">${reasonList.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
    popup.classList.remove('hidden');
}

function closeTierReason() {
    document.getElementById('tier-reason-popup').classList.add('hidden');
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeTierReason(); });
document.getElementById('tier-reason-popup').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTierReason(); });
