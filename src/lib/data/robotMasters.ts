
export type RobotMaster =
    'Bomb' | 'Cut' | 'Elec' | 'Fire' | 'Guts' | 'Ice' |
    'Air' | 'Bubble' | 'Crash' | 'Flash' | 'Heat' | 'Metal' | 'Quick' | 'Wood' |
    'Gemini' | 'Hard' | 'Magnet' | 'Needle' | 'Shadow' | 'Snake' | 'Spark' | 'Top' | 'Doc' |
    'Bright' | 'Dive' | 'Drill' | 'Dust' | 'Pharaoh' | 'Ring' | 'Skull' | 'Toad' |
    'Charge' | 'Crystal' | 'Gravity' | 'Gyro' | 'Napalm' | 'Star' | 'Stone' | 'Wave' |
    'Blizzard' | 'Centaur' | 'Flame' | 'Knight' | 'Plant' | 'Tomahawk' | 'Wind' | 'Yamato'

export const RMPosition: Record<RobotMaster, {x: number, y: number}> = {
    Bomb: { y: 0, x: 0 },
    Cut: { y: 0, x: 1 },
    Elec: { y: 0, x: 2 },
    Fire: { y: 0, x: 3 },
    Guts: { y: 0, x: 4 },
    Ice: { y: 0, x: 5 },
    Air: { y: 1, x: 0 },
    Bubble: { y: 1, x: 1 },
    Crash: { y: 1, x: 2 },
    Flash: { y: 1, x: 3 },
    Heat: { y: 1, x: 4 },
    Metal: { y: 1, x: 5 },
    Quick: { y: 1, x: 6 },
    Wood: { y: 1, x: 7 },
    Gemini: { y: 2, x: 0 },
    Hard: { y: 2, x: 1 },
    Magnet: { y: 2, x: 2 },
    Needle: { y: 2, x: 3 },
    Shadow: { y: 2, x: 4 },
    Snake: { y: 2, x: 5 },
    Spark: { y: 2, x: 6 },
    Top: { y: 2, x: 7 },
    Doc: { y: 2, x: 8 },
    Bright: { y: 3, x: 0 },
    Dive: { y: 3, x: 1 },
    Drill: { y: 3, x: 2 },
    Dust: { y: 3, x: 3 },
    Pharaoh: { y: 3, x: 4 },
    Ring: { y: 3, x: 5 },
    Skull: { y: 3, x: 6 },
    Toad: { y: 3, x: 7 },
    Charge: { y: 4, x: 0 },
    Crystal: { y: 4, x: 1 },
    Gravity: { y: 4, x: 2 },
    Gyro: { y: 4, x: 3 },
    Napalm: { y: 4, x: 4 },
    Star: { y: 4, x: 5 },
    Stone: { y: 4, x: 6 },
    Wave: { y: 4, x: 7 },
    Blizzard: { y: 5, x: 0 },
    Centaur: { y: 5, x: 1 },
    Flame: { y: 5, x: 2 },
    Knight: { y: 5, x: 3 },
    Plant: { y: 5, x: 4 },
    Tomahawk: { y: 5, x: 5 },
    Wind: { y: 5, x: 6 },
    Yamato: { y: 5, x: 7 }
}