// ===== VOICES.JS — Brawler Voicelines with Audio Playback =====

const VOICE_SFX_BASE = 'https://raw.githubusercontent.com/tailsjs/brawl-stars-assets/master/66.262/sfx';

// Mapping: brawler name → { files[] }
// files[] = voice-only audio filenames (start, kill, lead, ulti)
// Uses tailsjs/brawl-stars-assets repo (all files in flat sfx folder)
const VOICE_AUDIO_MAP = {
    'Shelly': { files: [
        'shelly_start_01','shelly_start_02','shelly_start_03','shelly_start_04',
        'shelly_kill_01','shelly_kill_02','shelly_kill_03','shelly_kill_04','shelly_kill_05',
        'shelly_lead_01','shelly_lead_02','shelly_lead_03','shelly_lead_04',
        'shelly_ulti_01','shelly_ulti_02','shelly_ulti_03','shelly_ulti_04'
    ]},
    'Colt': { files: [
        'hotshot_start_01','hotshot_start_02','hotshot_start_03','hotshot_start_04',
        'hotshot_kill_01','hotshot_kill_02','hotshot_kill_03','hotshot_kill_04','hotshot_kill_05','hotshot_kill_06','hotshot_kill_07',
        'hotshot_lead_01','hotshot_lead_02','hotshot_lead_03','hotshot_lead_04','hotshot_lead_05',
        'hotshot_ulti_01','hotshot_ulti_02','hotshot_ulti_03','hotshot_ulti_04'
    ]},
    'Bull': { files: [
        'bull_start_vo_01','bull_start_vo_02','bull_start_vo_03',
        'bull_kill_vo_01','bull_kill_vo_02','bull_kill_vo_03','bull_kill_vo_04',
        'bull_lead_vo_01','bull_lead_vo_02','bull_lead_vo_03','bull_lead_vo_04',
        'bull_ulti_vo_01','bull_ulti_vo_02','bull_ulti_vo_03','bull_ulti_vo_04'
    ]},
    'Nita': { files: [
        'nita_start_vo_01','nita_start_vo_02','nita_start_vo_03',
        'nita_kill_vo_01','nita_kill_vo_02','nita_kill_vo_03',
        'nita_lead_01','nita_lead_02','nita_lead_03',
        'nita_ulti_01','nita_ulti_02','nita_ulti_03'
    ]},
    'Jessie': { files: [
        'jess_start_vo_01','jess_start_vo_02','jess_start_vo_03','jess_start_vo_04','jess_start_vo_05',
        'jess_kill_01','jess_kill_02','jess_kill_03','jess_kill_04','jess_kill_05','jess_kill_06','jess_kill_07',
        'jess_lead_01','jess_lead_02','jess_lead_03','jess_lead_04','jess_lead_05',
        'jess_ulti_01','jess_ulti_02','jess_ulti_03','jess_ulti_04','jess_ulti_05','jess_ulti_06'
    ]},
    'Brock': { files: [
        'brock_start_vo_01','brock_start_vo_02','brock_start_vo_03','brock_start_vo_04','brock_start_vo_05','brock_start_vo_06','brock_start_vo_07',
        'brock_kill_vo_01','brock_kill_vo_02','brock_kill_vo_03','brock_kill_vo_04',
        'brock_lead_vo_01','brock_lead_vo_02','brock_lead_vo_03','brock_lead_vo_04','brock_lead_vo_05','brock_lead_vo_06',
        'brock_ulti_vo_01','brock_ulti_vo_02','brock_ulti_vo_03','brock_ulti_vo_04','brock_ulti_vo_05'
    ]},
    'Dynamike': { files: [
        'tnt_guy_start_vo_01','tnt_guy_start_vo_02','tnt_guy_start_vo_03','tnt_guy_start_vo_04',
        'tnt_guy_kill_01','tnt_guy_kill_02','tnt_guy_kill_03','tnt_guy_kill_04',
        'tnt_guy_lead_01','tnt_guy_lead_02',
        'tnt_guy_ulti_01','tnt_guy_ulti_02'
    ]},
    'Bo': { files: [
        'bo_start_vo_01','bo_start_vo_02','bo_start_vo_03','bo_start_vo_04','bo_start_vo_05',
        'bo_kill_vo_01','bo_kill_vo_02','bo_kill_vo_03','bo_kill_vo_04',
        'bo_lead_vo_01','bo_lead_vo_02','bo_lead_vo_03','bo_lead_vo_04',
        'bo_ulti_vo_01','bo_ulti_vo_02','bo_ulti_vo_03','bo_ulti_vo_04'
    ]},
    'El Primo': { files: [
        'el_primo_start_vo_01','el_primo_start_vo_02','el_primo_start_vo_03','el_primo_start_vo_04','el_primo_start_vo_05','el_primo_start_vo_06','el_primo_start_vo_07',
        'el_primo_kill_01','el_primo_kill_02','el_primo_kill_03',
        'el_primo_lead_01','el_primo_lead_02','el_primo_lead_03',
        'el_primo_ulti_01','el_primo_ulti_02'
    ]},
    'Barley': { files: [
        'barley_start_01','barley_start_02','barley_start_03','barley_start_04',
        'barley_kill_01','barley_kill_02','barley_kill_03','barley_kill_04',
        'barley_lead_01',
        'barley_ulti_01','barley_ulti_02'
    ]},
    'Poco': { files: [
        'poco_start_01','poco_start_02','poco_start_03','poco_start_04',
        'poco_kill_01','poco_kill_02','poco_kill_03',
        'poco_lead_01','poco_lead_02','poco_lead_03',
        'poco_ulti_01','poco_ulti_02','poco_ulti_03','poco_ulti_04'
    ]},
    'Rosa': { files: [
        'rosa_start_01','rosa_start_02','rosa_start_03','rosa_start_04',
        'rosa_kill_01','rosa_kill_02','rosa_kill_03','rosa_kill_04','rosa_kill_05',
        'rosa_lead_01','rosa_lead_02','rosa_lead_03',
        'rosa_ulti_vo_01','rosa_ulti_vo_02','rosa_ulti_vo_03','rosa_ulti_vo_04'
    ]},
    'Rico': { files: [
        'rick_start_vo_01','rick_start_vo_02','rick_start_vo_03','rick_start_vo_04','rick_start_vo_05','rick_start_vo_06',
        'rick_kill_vo_01','rick_kill_vo_02','rick_kill_vo_03','rick_kill_vo_04','rick_kill_vo_05','rick_kill_vo_06','rick_kill_vo_07',
        'rick_lead_01','rick_lead_02','rick_lead_03','rick_lead_04','rick_lead_05',
        'rick_ulti_01','rick_ulti_02','rick_ulti_03','rick_ulti_04','rick_ulti_05','rick_ulti_06'
    ]},
    'Penny': { files: [
        'penny_start_vo_01','penny_start_vo_02','penny_start_vo_03',
        'penny_kill_vo_01','penny_kill_vo_02','penny_kill_vo_03','penny_kill_vo_04','penny_kill_vo_05',
        'penny_lead_vo_01','penny_lead_vo_02','penny_lead_vo_03',
        'penny_ulti_vo_01','penny_ulti_vo_02','penny_ulti_vo_03'
    ]},
    'Carl': { files: [
        'carl_start_vo_01','carl_start_vo_02','carl_start_vo_03','carl_start_vo_04','carl_start_vo_05','carl_start_vo_06','carl_start_vo_07',
        'carl_kill_vo_01','carl_kill_vo_02','carl_kill_vo_03','carl_kill_vo_04','carl_kill_vo_05',
        'carl_lead_vo_01','carl_lead_vo_02','carl_lead_vo_03','carl_lead_vo_04',
        'carl_ulti_vo_01','carl_ulti_vo_02'
    ]},
    'Darryl': { files: [
        'darryl_start_vo_01','darryl_start_vo_02','darryl_start_vo_03','darryl_start_vo_04','darryl_start_vo_05','darryl_start_vo_06','darryl_start_vo_07',
        'darryl_kill_vo_01','darryl_kill_vo_02','darryl_kill_vo_03','darryl_kill_vo_04','darryl_kill_vo_05','darryl_kill_vo_06',
        'darryl_lead_vo_01','darryl_lead_vo_02','darryl_lead_vo_03','darryl_lead_vo_04','darryl_lead_vo_05','darryl_lead_vo_06','darryl_lead_vo_07',
        'darryl_ulti_vo_01','darryl_ulti_vo_02','darryl_ulti_vo_03','darryl_ulti_vo_04','darryl_ulti_vo_05','darryl_ulti_vo_06','darryl_ulti_vo_07'
    ]},
    'Jacky': { files: [
        'jackie_start_vo_01','jackie_start_vo_02','jackie_start_vo_03','jackie_start_vo_04',
        'jackie_kill_vo_01','jackie_kill_vo_02','jackie_kill_vo_03','jackie_kill_vo_04','jackie_kill_vo_05',
        'jackie_lead_vo_01','jackie_lead_vo_02','jackie_lead_vo_03','jackie_lead_vo_04',
        'jackie_ulti_vo_01','jackie_ulti_vo_02','jackie_ulti_vo_03','jackie_ulti_vo_04','jackie_ulti_vo_05','jackie_ulti_vo_06'
    ]},
    'Piper': { files: [
        'piper_start_vo_01','piper_start_vo_02','piper_start_vo_03','piper_start_vo_04',
        'piper_kill_vo_01','piper_kill_vo_02','piper_kill_vo_03','piper_kill_vo_04',
        'piper_lead_vo_01','piper_lead_vo_02','piper_lead_vo_03','piper_lead_vo_04',
        'piper_ulti_vo_01','piper_ulti_vo_02'
    ]},
    'Pam': { files: [
        'pam_start_vo_01','pam_start_vo_02','pam_start_vo_03','pam_start_vo_04',
        'pam_kill_vo_01','pam_kill_vo_02','pam_kill_vo_03','pam_kill_vo_04',
        'pam_lead_vo_01','pam_lead_vo_02','pam_lead_vo_03','pam_lead_vo_04',
        'pam_ulti_vo_01','pam_ulti_vo_02','pam_ulti_vo_03','pam_ulti_vo_04'
    ]},
    'Frank': { files: [
        'frank_vo_01','frank_vo_02','frank_vo_03','frank_vo_04','frank_vo_05','frank_vo_06'
    ]},
    'Bibi': { files: [
        'bibi_start_vo_01','bibi_start_vo_02','bibi_start_vo_03','bibi_start_vo_04','bibi_start_vo_05','bibi_start_vo_06',
        'bibi_kill_vo_01','bibi_kill_vo_02','bibi_kill_vo_03','bibi_kill_vo_04',
        'bibi_lead_vo_01','bibi_lead_vo_02','bibi_lead_vo_03','bibi_lead_vo_04',
        'bibi_ulti_vo_01','bibi_ulti_vo_02','bibi_ulti_vo_03','bibi_ulti_vo_04'
    ]},
    'Bea': { files: [
        'bea_start_vo_01','bea_start_vo_02','bea_start_vo_03','bea_start_vo_04','bea_start_vo_05',
        'bea_kill_vo_01','bea_kill_vo_02','bea_kill_vo_03','bea_kill_vo_04',
        'bea_lead_vo_01','bea_lead_vo_02','bea_lead_vo_03','bea_lead_vo_04','bea_lead_vo_05',
        'bea_ulti_vo_01','bea_ulti_vo_02','bea_ulti_vo_03','bea_ulti_vo_04'
    ]},
    'Mortis': { files: [
        'mortis_start_01','mortis_start_02','mortis_start_03','mortis_start_04',
        'mortis_kill_01','mortis_kill_02','mortis_kill_03','mortis_kill_04','mortis_kill_05',
        'mortis_lead_01','mortis_lead_02','mortis_lead_03',
        'mortis_ulti_vo_01','mortis_ulti_vo_02','mortis_ulti_vo_03'
    ]},
    'Tara': { files: [
        'tara_start_vo_01','tara_start_vo_02','tara_start_vo_03',
        'tara_kill_vo_01','tara_kill_vo_02','tara_kill_vo_03','tara_kill_vo_04',
        'tara_lead_vo_01','tara_lead_vo_02','tara_lead_vo_03'
    ]},
    'Gene': { files: [
        'gene_vo_01','gene_vo_02','gene_vo_03','gene_vo_04','gene_vo_05','gene_vo_06','gene_vo_07',
        'gene_vo_08','gene_vo_09','gene_vo_10','gene_vo_11','gene_vo_12','gene_vo_13','gene_vo_14'
    ]},
    'Max': { files: [
        'max_start_vo_01','max_start_vo_02','max_start_vo_03','max_start_vo_04','max_start_vo_05',
        'max_kill_vo_01','max_kill_vo_02','max_kill_vo_03','max_kill_vo_04','max_kill_vo_05',
        'max_lead_vo_01','max_lead_vo_02','max_lead_vo_03','max_lead_vo_04','max_lead_vo_05',
        'max_ulti_vo_01','max_ulti_vo_02','max_ulti_vo_03','max_ulti_vo_04'
    ]},
    'Surge': { files: [
        'surge_start_vo_01','surge_start_vo_02','surge_start_vo_03','surge_start_vo_04','surge_start_vo_05','surge_start_vo_06',
        'surge_kill_vo_01','surge_kill_vo_02','surge_kill_vo_03','surge_kill_vo_04','surge_kill_vo_05','surge_kill_vo_06',
        'surge_lead_vo_01','surge_lead_vo_02','surge_lead_vo_03','surge_lead_vo_04',
        'surge_ulti_vo_01','surge_ulti_vo_02','surge_ulti_vo_03','surge_ulti_vo_04'
    ]},
    'Leon': { files: [
        'leon_start_vo_01','leon_start_vo_02','leon_start_vo_03','leon_start_vo_04','leon_start_vo_05',
        'leon_kill_vo_01','leon_kill_vo_02','leon_kill_vo_03','leon_kill_vo_04','leon_kill_vo_05','leon_kill_vo_06',
        'leon_lead_vo_01','leon_lead_vo_02','leon_lead_vo_03','leon_lead_vo_04','leon_lead_vo_05',
        'leon_ulti_vo_01','leon_ulti_vo_02','leon_ulti_vo_04','leon_ulti_vo_05'
    ]},
    'Crow': { files: [
        'crow_start_01','crow_start_02','crow_start_03',
        'crow_kills_01','crow_kills_02','crow_kills_03',
        'crow_lead_01','crow_lead_02','crow_lead_03'
    ]},
    'Sandy': { files: [
        'sandy_start_vo_01','sandy_start_vo_02','sandy_start_vo_03','sandy_start_vo_04','sandy_start_vo_05','sandy_start_vo_06',
        'sandy_kill_vo_01','sandy_kill_vo_02','sandy_kill_vo_03','sandy_kill_vo_04','sandy_kill_vo_05',
        'sandy_lead_vo_01','sandy_lead_vo_02','sandy_lead_vo_03','sandy_lead_vo_04','sandy_lead_vo_05',
        'sandy_ulti_vo_01','sandy_ulti_vo_02'
    ]},
    'Amber': { files: [
        'amber_start_vo_01','amber_start_vo_02',
        'amber_lead_vo_01','amber_lead_vo_02',
        'amber_ulti_vo_01','amber_ulti_vo_02'
    ]},
    'Emz': { files: [
        'emz_start_vo_01','emz_start_vo_02','emz_start_vo_03','emz_start_vo_04','emz_start_vo_05',
        'emz_kill_vo_01','emz_kill_vo_02','emz_kill_vo_03','emz_kill_vo_04','emz_kill_vo_05','emz_kill_vo_06',
        'emz_lead_vo_01','emz_lead_vo_02','emz_lead_vo_03',
        'emz_ulti_vo_01','emz_ulti_vo_02'
    ]},
    'Stu': { files: [
        'stu_start_vo_01','stu_start_vo_02','stu_start_vo_03',
        'stu_kill_vo_01','stu_kill_vo_02','stu_kill_vo_03',
        'stu_lead_vo_01','stu_lead_vo_02',
        'stu_ulti_vo_01','stu_ulti_vo_02'
    ]},
    'Edgar': { files: [
        'edgar_start_vo_01','edgar_start_vo_02','edgar_start_vo_03',
        'edgar_kill_vo_01','edgar_kill_vo_02','edgar_kill_vo_03',
        'edgar_lead_vo_01','edgar_lead_vo_02',
        'edgar_ulti_vo_01','edgar_ulti_vo_02'
    ]},
    'Byron': { files: [
        'byron_start_vo_01','byron_start_vo_02','byron_start_vo_03',
        'byron_kill_vo_01','byron_kill_vo_02',
        'byron_lead_vo_01','byron_lead_vo_02',
        'byron_ulti_vo_01','byron_ulti_vo_02'
    ]},
    'Buzz': { files: [
        'buzz_start_vo_01','buzz_start_vo_03',
        'buzz_kill_vo_01','buzz_kill_vo_03',
        'buzz_lead_vo_01','buzz_lead_vo_03',
        'buzz_ulti_vo_01','buzz_ulti_vo_03'
    ]},
    'Belle': { files: [
        'belle_start_vo_01','belle_start_vo_03',
        'belle_kill_vo_01','belle_kill_vo_02',
        'belle_lead_vo_01','belle_lead_vo_02',
        'belle_ulti_vo_01','belle_ulti_vo_02'
    ]},
    'Ash': { files: [
        'ash_start_vo_01','ash_start_vo_02',
        'ash_kill_vo_01','ash_kill_vo_02',
        'ash_lead_vo_01','ash_lead_vo_02',
        'ash_ulti_vo_01','ash_ulti_vo_02'
    ]},
    'Colette': { files: [
        'colette_start_vo_01','colette_start_vo_02','colette_start_vo_03','colette_start_vo_04','colette_start_vo_05','colette_start_vo_06','colette_start_vo_07',
        'colette_kill_vo_01','colette_kill_vo_02','colette_kill_vo_03','colette_kill_vo_04',
        'colette_lead_vo_01','colette_lead_vo_02','colette_lead_vo_03','colette_lead_vo_04',
        'colette_ulti_vo_01','colette_ulti_vo_02','colette_ulti_vo_03','colette_ulti_vo_04'
    ]},
    'Gale': { files: [
        'gale_start_vo_01','gale_start_vo_02','gale_start_vo_03','gale_start_vo_04',
        'gale_kill_vo_01','gale_kill_vo_02','gale_kill_vo_03','gale_kill_vo_04','gale_kill_vo_05',
        'gale_lead_vo_01','gale_lead_vo_02','gale_lead_vo_03','gale_lead_vo_04',
        'gale_ulti_vo_01','gale_ulti_vo_02','gale_ulti_vo_03','gale_ulti_vo_04'
    ]},
    'Sprout': { files: [
        'sprout_start_vo_01','sprout_start_vo_02','sprout_start_vo_03','sprout_start_vo_04',
        'sprout_kill_vo_01','sprout_kill_vo_02','sprout_kill_vo_03','sprout_kill_vo_04','sprout_kill_vo_05',
        'sprout_lead_vo_01','sprout_lead_vo_02','sprout_lead_vo_03','sprout_lead_vo_04',
        'sprout_ulti_vo_01','sprout_ulti_vo_02','sprout_ulti_vo_03','sprout_ulti_vo_04'
    ]},
    'Tick': { files: [
        'tick_vo_01v2','tick_vo_02v2','tick_vo_03','tick_vo_04','tick_vo_05','tick_vo_06'
    ]},
    '8-Bit': { files: [
        '8bit_start_vo_01','8bit_start_vo_03',
        '8bit_kill_vo_01','8bit_kill_vo_02','8bit_kill_vo_03','8bit_kill_vo_04',
        '8bit_lead_vo_01','8bit_lead_vo_02','8bit_lead_vo_03','8bit_lead_vo_04',
        '8bit_ulti_vo_01'
    ]},
    'Mr. P': { files: [
        'mrp_start_vo_01','mrp_start_vo_02','mrp_start_vo_03','mrp_start_vo_04','mrp_start_vo_05',
        'mrp_kill_vo_01','mrp_kill_vo_02','mrp_kill_vo_03','mrp_kill_vo_04','mrp_kill_vo_05',
        'mrp_lead_vo_01','mrp_lead_vo_02','mrp_lead_vo_03',
        'mrp_ulti_vo_01','mrp_ulti_vo_02','mrp_ulti_vo_03','mrp_ulti_vo_04'
    ]},
    'Nani': { files: [
        'nani_start_vo_01','nani_start_vo_02','nani_start_vo_03','nani_start_vo_04',
        'nani_kill_vo_01','nani_kill_vo_02','nani_kill_vo_03','nani_kill_vo_04',
        'nani_lead_vo_01','nani_lead_vo_02','nani_lead_vo_03','nani_lead_vo_04'
    ]},
    'Lou': { files: [
        'lou_start_vo_01','lou_start_vo_02',
        'lou_kill_vo_01','lou_kill_vo_02',
        'lou_lead_vo_01','lou_lead_vo_02',
        'lou_ulti_vo_01','lou_ulti_vo_02'
    ]},
    'Ruffs': { files: [
        'ruffs_start_vo_01','ruffs_start_vo_02',
        'ruffs_kill_vo_01','ruffs_kill_vo_02',
        'ruffs_lead_vo_01','ruffs_lead_vo_02',
        'ruffs_ulti_vo_01','ruffs_ulti_vo_02'
    ]},
    'Lola': { files: [
        'lola_start_vo_01','lola_start_vo_02',
        'lola_kill_vo_01','lola_kill_vo_02',
        'lola_lead_vo_01','lola_lead_vo_02',
        'lola_ulti_vo_01','lola_ulti_vo_02'
    ]},
    'Fang': { files: [
        'fang_start_vo_01','fang_start_vo_02',
        'fang_kill_vo_01','fang_kill_vo_02',
        'fang_lead_vo_01','fang_lead_vo_02',
        'fang_ulti_vo_01','fang_ulti_vo_02'
    ]},
    'Eve': { files: [
        'eve_start_vo_01','eve_start_vo_02',
        'eve_kill_vo_01','eve_kill_vo_02',
        'eve_lead_vo_01','eve_lead_vo_02',
        'eve_ulti_vo_01','eve_ulti_vo_02'
    ]},
    'Janet': { files: [
        'janet_start_vo_01','janet_start_vo_02',
        'janet_kill_vo_01','janet_kill_vo_02',
        'janet_lead_vo_01','janet_lead_vo_02',
        'janet_ulti_vo_01','janet_ulti_vo_02'
    ]},
    'Bonnie': { files: [
        'bonnie_start_vo_01','bonnie_start_vo_02',
        'bonnie_kill_vo_01','bonnie_kill_vo_02',
        'bonnie_lead_vo_01','bonnie_lead_vo_02',
        'bonnie_ulti_vo_01','bonnie_ulti_vo_02'
    ]},
    'Sam': { files: [
        'sam_start_vo_01','sam_start_vo_02',
        'sam_kill_vo_01','sam_kill_vo_02',
        'sam_lead_vo_01','sam_lead_vo_02',
        'sam_ulti_vo_01','sam_ulti_vo_02'
    ]},
    'Gus': { files: [
        'gus_start_vo_01','gus_start_vo_02',
        'gus_kill_vo_01','gus_kill_vo_02',
        'gus_lead_vo_01','gus_lead_vo_02',
        'gus_ulti_vo_01','gus_ulti_vo_02'
    ]},
    'Chester': { files: [
        'chester_start_vo_01','chester_start_vo_02',
        'chester_kill_vo_01','chester_kill_vo_02',
        'chester_lead_vo_01','chester_lead_vo_02',
        'chester_ulti_vo_01','chester_ulti_vo_02'
    ]},
    'Mandy': { files: [
        'mandy_start_vo_01','mandy_start_vo_02',
        'mandy_kill_vo_01','mandy_kill_vo_02',
        'mandy_lead_vo_01','mandy_lead_vo_02',
        'mandy_ulti_vo_01','mandy_ulti_vo_02'
    ]},
    'Griff': { files: [
        'griff_start_vo_01','griff_start_vo_02',
        'griff_kill_vo_01','griff_kill_vo_02',
        'griff_lead_vo_01','griff_lead_vo_02',
        'griff_ulti_vo_01','griff_ulti_vo_02'
    ]},
    'Gray': { files: [
        'gray_start_vo_01','gray_start_vo_02',
        'gray_kill_vo_01','gray_kill_vo_02',
        'gray_lead_vo_01','gray_lead_vo_02',
        'gray_ulti_vo_01','gray_ulti_vo_02'
    ]},
    'Lily': { files: [
        'lily_start_vo_01','lily_start_vo_02',
        'lily_kill_vo_01','lily_kill_vo_02',
        'lily_lead_vo_01','lily_lead_vo_02',
        'lily_ulti_vo_01','lily_ulti_vo_02'
    ]},
    'Kit': { files: [
        'kit_start_vo_01','kit_start_vo_02',
        'kit_kill_vo_01','kit_kill_vo_02',
        'kit_lead_vo_01','kit_lead_vo_02',
        'kit_ulti_vo_01','kit_ulti_vo_02'
    ]},
    'Meg': { files: [
        'meg_start_vo_01','meg_start_vo_02',
        'meg_kill_vo_01','meg_kill_vo_02',
        'meg_lead_vo_01','meg_lead_vo_02',
        'meg_ulti_vo_01','meg_ulti_vo_02'
    ]},
    'Squeak': { files: [
        'squeak_start_vo_01','squeak_start_vo_02',
        'squeak_kill_vo_01','squeak_kill_vo_02',
        'squeak_lead_vo_01','squeak_lead_vo_02',
        'squeak_ulti_vo_01','squeak_ulti_vo_02'
    ]},
    'Grom': { files: [
        'grom_start_vo_01','grom_start_vo_02',
        'grom_kill_vo_01','grom_kill_vo_02',
        'grom_lead_vo_01','grom_lead_vo_02',
        'grom_ulti_vo_01','grom_ulti_vo_02'
    ]},
    'Otis': { files: [
        'otis_start_vo_01','otis_start_vo_02',
        'otis_kill_vo_01','otis_kill_vo_02',
        'otis_lead_vo_01','otis_lead_vo_02',
        'otis_ulti_vo_01','otis_ulti_vo_02'
    ]},
    'Hank': { files: [
        'hank_start_vo_01','hank_start_vo_02',
        'hank_kill_vo_01','hank_kill_vo_02',
        'hank_lead_vo_01','hank_lead_vo_02',
        'hank_ulti_vo_01','hank_ulti_vo_02'
    ]},
    'Pearl': { files: [
        'pearl_start_vo_01','pearl_start_vo_02',
        'pearl_kill_vo_01','pearl_kill_vo_02',
        'pearl_lead_vo_01','pearl_lead_vo_02',
        'pearl_ulti_vo_01','pearl_ulti_vo_02'
    ]},
    'Larry & Lawrie': { files: [
        'larry_start_vo_01','larry_start_vo_02',
        'larry_kill_vo_01','larry_kill_vo_02',
        'larry_lead_vo_01','larry_lead_vo_02',
        'larry_ulti_vo_01','larry_ulti_vo_02'
    ]},
    'Angelo': { files: [
        'angelo_start_vo_01','angelo_start_vo_02',
        'angelo_kill_vo_01','angelo_kill_vo_02',
        'angelo_lead_vo_01','angelo_lead_vo_02',
        'angelo_ulti_vo_01','angelo_ulti_vo_02'
    ]},
    'Berry': { files: [
        'berry_start_vo_01','berry_start_vo_02',
        'berry_kill_vo_01','berry_kill_vo_02',
        'berry_lead_vo_01','berry_lead_vo_02',
        'berry_ulti_vo_01','berry_ulti_vo_02'
    ]},
    'Shade': { files: [
        'shade_start_vo_01','shade_start_vo_02',
        'shade_kill_vo_01','shade_kill_vo_02',
        'shade_lead_vo_01','shade_lead_vo_02',
        'shade_ulti_vo_01','shade_ulti_vo_02'
    ]},
    'Moe': { files: [
        'moe_start_vo_01','moe_start_vo_02',
        'moe_kill_vo_01','moe_kill_vo_02',
        'moe_lead_vo_01','moe_lead_vo_02',
        'moe_ulti_vo_01','moe_ulti_vo_02'
    ]},
    'Draco': { files: [
        'draco_start_vo_01','draco_start_vo_02',
        'draco_kill_vo_01','draco_kill_vo_02',
        'draco_lead_vo_01','draco_lead_vo_02',
        'draco_ulti_vo_01','draco_ulti_vo_02'
    ]},
    'Kenji': { files: [
        'kenji_start_vo_01','kenji_start_vo_02',
        'kenji_kill_vo_01','kenji_kill_vo_02',
        'kenji_lead_vo_01','kenji_lead_vo_02',
        'kenji_ulti_vo_01','kenji_ulti_vo_02'
    ]},
    'Juju': { files: [
        'juju_start_vo_01','juju_start_vo_02',
        'juju_kill_vo_01','juju_kill_vo_02',
        'juju_lead_vo_01','juju_lead_vo_02',
        'juju_ulti_vo_01','juju_ulti_vo_02'
    ]},
    'Meeple': { files: [
        'meeple_start_vo_01','meeple_start_vo_02',
        'meeple_kill_vo_01','meeple_kill_vo_02',
        'meeple_lead_vo_01','meeple_lead_vo_02',
        'meeple_ulti_vo_01','meeple_ulti_vo_02'
    ]},
    'Lumi': { files: [
        'lumi_start_vo_01','lumi_start_vo_02',
        'lumi_kill_vo_01','lumi_kill_vo_02',
        'lumi_lead_vo_01','lumi_lead_vo_02',
        'lumi_ulti_vo_01','lumi_ulti_vo_02'
    ]},
    'Clancy': { files: [
        'clancy_start_vo_01','clancy_start_vo_02',
        'clancy_kill_vo_01','clancy_kill_vo_02',
        'clancy_lead_vo_01','clancy_lead_vo_02',
        'clancy_ulti_vo_01','clancy_ulti_vo_02'
    ]},
    'Melodie': { files: [
        'melodie_start_vo_01','melodie_start_vo_02',
        'melodie_kill_vo_01','melodie_kill_vo_02',
        'melodie_lead_vo_01','melodie_lead_vo_02',
        'melodie_ulti_vo_01','melodie_ulti_vo_02'
    ]},
    'Chuck': { files: [
        'chuck_start_vo_01','chuck_start_vo_02',
        'chuck_kill_vo_01','chuck_kill_vo_02',
        'chuck_lead_vo_01','chuck_lead_vo_02',
        'chuck_ulti_vo_01','chuck_ulti_vo_02'
    ]},
    'Charlie': { files: [
        'charlie_start_vo_01','charlie_start_vo_02',
        'charlie_kill_vo_01','charlie_kill_vo_02',
        'charlie_lead_vo_01','charlie_lead_vo_02',
        'charlie_ulti_vo_01','charlie_ulti_vo_02'
    ]},
    'Mico': { files: [
        'mico_start_vo_01','mico_start_vo_02',
        'mico_kill_vo_01','mico_kill_vo_02',
        'mico_lead_vo_01','mico_lead_vo_02',
        'mico_ulti_vo_01','mico_ulti_vo_02'
    ]},
    'Willow': { files: [
        'willow_start_vo_01','willow_start_vo_02',
        'willow_kill_vo_01','willow_kill_vo_02',
        'willow_lead_vo_01','willow_lead_vo_02',
        'willow_ulti_vo_01','willow_ulti_vo_02'
    ]},
    'Cordelius': { files: [
        'cordelius_start_vo_01','cordelius_start_vo_02',
        'cordelius_kill_vo_01','cordelius_kill_vo_02',
        'cordelius_lead_vo_01','cordelius_lead_vo_02',
        'cordelius_ulti_vo_01','cordelius_ulti_vo_02'
    ]},
    'Doug': { files: [
        'doug_start_vo_01','doug_start_vo_02',
        'doug_kill_vo_01','doug_kill_vo_02',
        'doug_lead_vo_01','doug_lead_vo_02',
        'doug_ulti_vo_01','doug_ulti_vo_02'
    ]},
    'Buster': { files: [
        'buster_start_vo_01','buster_start_vo_02',
        'buster_kill_vo_01','buster_kill_vo_02',
        'buster_lead_vo_01','buster_lead_vo_02',
        'buster_ulti_vo_01','buster_ulti_vo_02'
    ]},
    'R-T': { files: [
        'rt_start_vo_01','rt_start_vo_02',
        'rt_kill_vo_01','rt_kill_vo_02',
        'rt_lead_vo_01','rt_lead_vo_02',
        'rt_ulti_vo_01','rt_ulti_vo_02'
    ]},
    'Gigi': { files: [
        'gigi_start_vo_01','gigi_start_vo_02',
        'gigi_kill_vo_01','gigi_kill_vo_02',
        'gigi_lead_vo_01','gigi_lead_vo_02',
        'gigi_ulti_vo_01','gigi_ulti_vo_02'
    ]},
    'Finx': { files: [
        'finx_start_vo_01','finx_start_vo_02',
        'finx_kill_vo_01','finx_kill_vo_02',
        'finx_lead_vo_01','finx_lead_vo_02',
        'finx_ulti_vo_01','finx_ulti_vo_02'
    ]},
    'Maisie': { files: [
        'maisie_start_vo_01','maisie_start_vo_02',
        'maisie_kill_vo_01','maisie_kill_vo_02',
        'maisie_lead_vo_01','maisie_lead_vo_02',
        'maisie_ulti_vo_01','maisie_ulti_vo_02'
    ]},
    'Alli': { files: [
        'alli_start_vo_01','alli_start_vo_02',
        'alli_kill_vo_01','alli_kill_vo_02',
        'alli_lead_vo_01','alli_lead_vo_02',
        'alli_ulti_vo_01','alli_ulti_vo_02'
    ]},
    'Ollie': { files: [
        'ollie_start_vo_01','ollie_start_vo_02',
        'ollie_kill_vo_01','ollie_kill_vo_02',
        'ollie_lead_vo_01','ollie_lead_vo_02',
        'ollie_ulti_vo_01','ollie_ulti_vo_02'
    ]},
    'Sirius': { files: [
        'sirius_start_vo_01','sirius_start_vo_02',
        'sirius_kill_vo_01','sirius_kill_vo_02',
        'sirius_lead_vo_01','sirius_lead_vo_02',
        'sirius_ulti_vo_01','sirius_ulti_vo_02'
    ]},
    'Najia': { files: [
        'najia_start_vo_01','najia_start_vo_02',
        'najia_kill_vo_01','najia_kill_vo_02',
        'najia_lead_vo_01','najia_lead_vo_02',
        'najia_ulti_vo_01','najia_ulti_vo_02'
    ]},
    'Trunk': { files: [
        'trunk_start_vo_01','trunk_start_vo_02',
        'trunk_kill_vo_01','trunk_kill_vo_02',
        'trunk_lead_vo_01','trunk_lead_vo_02',
        'trunk_ulti_vo_01','trunk_ulti_vo_02'
    ]},
    'Ziggy': { files: [
        'ziggy_start_vo_01','ziggy_start_vo_02',
        'ziggy_kill_vo_01','ziggy_kill_vo_02',
        'ziggy_lead_vo_01','ziggy_lead_vo_02',
        'ziggy_ulti_vo_01','ziggy_ulti_vo_02'
    ]},
    'Kaze': { files: [
        'kaze_start_vo_01','kaze_start_vo_02',
        'kaze_kill_vo_01','kaze_kill_vo_02',
        'kaze_lead_vo_01','kaze_lead_vo_02',
        'kaze_ulti_vo_01','kaze_ulti_vo_02'
    ]},
    'Jae-Yong': { files: [
        'jaeyong_start_vo_01','jaeyong_start_vo_02',
        'jaeyong_kill_vo_01','jaeyong_kill_vo_02',
        'jaeyong_lead_vo_01','jaeyong_lead_vo_02',
        'jaeyong_ulti_vo_01','jaeyong_ulti_vo_02'
    ]},
    'Pierce': { files: [
        'pierce_start_vo_01','pierce_start_vo_02',
        'pierce_kill_vo_01','pierce_kill_vo_02',
        'pierce_lead_vo_01','pierce_lead_vo_02',
        'pierce_ulti_vo_01','pierce_ulti_vo_02'
    ]},
    'Glowbert': { files: [
        'glowbert_start_vo_01','glowbert_start_vo_02',
        'glowbert_kill_vo_01','glowbert_kill_vo_02',
        'glowbert_lead_vo_01','glowbert_lead_vo_02',
        'glowbert_ulti_vo_01','glowbert_ulti_vo_02'
    ]},
    'Mina': { files: [
        'mina_start_vo_01','mina_start_vo_02',
        'mina_kill_vo_01','mina_kill_vo_02',
        'mina_lead_vo_01','mina_lead_vo_02',
        'mina_ulti_vo_01','mina_ulti_vo_02'
    ]},
    'Spike': { files: [] },
};

let voicesLoaded = false;
let voicesBrawlers = [];
let currentVoiceAudio = null;

async function loadVoices() {
    if (voicesLoaded) return;

    try {
        const data = await apiFetch(`${BRAWLIFY_BASE}/brawlers`);
        voicesBrawlers = (data.list || data).sort((a, b) => a.name.localeCompare(b.name));
        renderVoicesBrawlerList();
        voicesLoaded = true;
    } catch (err) {
        console.error('Failed to load brawlers for voices:', err);
        document.getElementById('voices-content').innerHTML = '<p class="error-message">Could not load brawlers.</p>';
    }
}

function renderVoicesBrawlerList() {
    const container = document.getElementById('voices-content');

    container.innerHTML = `
        <div class="voices-grid">
            ${voicesBrawlers.map(b => {
                const lines = VOICELINES[b.name] || getGenericVoicelines(b.name);
                const hasAudio = !!VOICE_AUDIO_MAP[b.name];
                return `
                    <div class="voices-card" onclick="showBrawlerVoices('${b.name.replace(/'/g, "\\'")}')">
                        <img src="${b.imageUrl || b.imageUrl2 || ''}" alt="${b.name}" loading="lazy">
                        <div class="voices-card-name">${b.name}</div>
                        <div class="voices-card-count">${lines.length} voicelines${hasAudio ? ' 🔊' : ''}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showBrawlerVoices(brawlerName) {
    const container = document.getElementById('voices-content');
    const brawler = voicesBrawlers.find(b => b.name === brawlerName);
    if (!brawler) return;

    const lines = VOICELINES[brawlerName] || getGenericVoicelines(brawlerName);
    const img = brawler.imageUrl || brawler.imageUrl2 || '';
    const audioData = VOICE_AUDIO_MAP[brawlerName];

    container.innerHTML = `
        <button class="btn-back" onclick="stopVoiceAudio(); renderVoicesBrawlerList()">&larr; All Brawlers</button>
        <div class="voices-detail">
            <div class="voices-detail-header">
                ${img ? `<img src="${img}" alt="${brawlerName}" class="voices-detail-img">` : ''}
                <div>
                    <h3>${brawlerName}</h3>
                    <span class="voices-detail-count">${lines.length} voicelines</span>
                    ${audioData ? '<span class="voices-audio-badge">Real voice audio available</span>' : ''}
                </div>
            </div>
            <ul class="voices-line-list">
                ${lines.map((line, i) => `
                    <li class="voices-line">
                        ${audioData ? `<button class="voice-play-btn" onclick="event.stopPropagation(); playVoiceLine('${brawlerName.replace(/'/g, "\\'")}', ${i})" title="Play voice clip">&#9654;</button>` : ''}
                        <span class="voice-line-text">${line}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function playVoiceLine(brawlerName, lineIndex) {
    const audioData = VOICE_AUDIO_MAP[brawlerName];
    if (!audioData || !audioData.files.length) return;

    // Stop any currently playing audio
    stopVoiceAudio();

    // Pick a random audio file from this brawler
    const fileIndex = Math.floor(Math.random() * audioData.files.length);
    const fileName = audioData.files[fileIndex];
    const url = `${VOICE_SFX_BASE}/${fileName}.ogg`;

    currentVoiceAudio = new Audio(url);
    currentVoiceAudio.volume = 0.7;

    // Highlight the playing line
    const allBtns = document.querySelectorAll('.voice-play-btn');
    allBtns.forEach(btn => btn.classList.remove('voice-playing'));
    if (allBtns[lineIndex]) allBtns[lineIndex].classList.add('voice-playing');

    currentVoiceAudio.addEventListener('ended', () => {
        allBtns.forEach(btn => btn.classList.remove('voice-playing'));
        currentVoiceAudio = null;
    });

    currentVoiceAudio.addEventListener('error', () => {
        allBtns.forEach(btn => btn.classList.remove('voice-playing'));
        currentVoiceAudio = null;
    });

    currentVoiceAudio.play().catch(() => {});
}

function stopVoiceAudio() {
    if (currentVoiceAudio) {
        currentVoiceAudio.pause();
        currentVoiceAudio = null;
    }
    document.querySelectorAll('.voice-play-btn').forEach(btn => btn.classList.remove('voice-playing'));
}
