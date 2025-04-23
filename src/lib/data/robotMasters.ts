
export type RobotMaster =
    'Bomb' | 'Cut' | 'Elec' | 'Fire' | 'Guts' | 'Ice' |
    'Air' | 'Bubble' | 'Crash' | 'Flash' | 'Heat' | 'Metal' | 'Quick' | 'Wood' |
    'Gemini' | 'Hard' | 'Magnet' | 'Needle' | 'Shadow' | 'Snake' | 'Spark' | 'Top' | 'Doc' |
    'Bright' | 'Dive' | 'Drill' | 'Dust' | 'Pharaoh' | 'Ring' | 'Skull' | 'Toad' |
    'Charge' | 'Crystal' | 'Gravity' | 'Gyro' | 'Napalm' | 'Star' | 'Stone' | 'Wave' |
    'Blizzard' | 'Centaur' | 'Flame' | 'Knight' | 'Plant' | 'Tomahawk' | 'Wind' | 'Yamato'

export const RMPosition: Record<RobotMaster, {x: number, y: number}> = {
    Bomb: { x: 1, y: 1 },
    Cut: { x: 1, y: 2 },
    Elec: { x: 1, y: 3 },
    Fire: { x: 1, y: 4 },
    Guts: { x: 1, y: 5 },
    Ice: { x: 1, y: 6 },
    Air: { x: 2, y: 1 },
    Bubble: { x: 2, y: 2 },
    Crash: { x: 2, y: 3 },
    Flash: { x: 2, y: 4 },
    Heat: { x: 2, y: 5 },
    Metal: { x: 2, y: 6 },
    Quick: { x: 2, y: 7 },
    Wood: { x: 2, y: 8 },
    Gemini: { x: 3, y: 1 },
    Hard: { x: 3, y: 2 },
    Magnet: { x: 3, y: 3 },
    Needle: { x: 3, y: 4 },
    Shadow: { x: 3, y: 5 },
    Snake: { x: 3, y: 6 },
    Spark: { x: 3, y: 7 },
    Top: { x: 3, y: 8 },
    Doc: { x: 3, y: 9 },
    Bright: { x: 4, y: 1 },
    Dive: { x: 4, y: 2 },
    Drill: { x: 4, y: 3 },
    Dust: { x: 4, y: 4 },
    Pharaoh: { x: 4, y: 5 },
    Ring: { x: 4, y: 6 },
    Skull: { x: 4, y: 7 },
    Toad: { x: 4, y: 8 },
    Charge: { x: 5, y: 1 },
    Crystal: { x: 5, y: 2 },
    Gravity: { x: 5, y: 3 },
    Gyro: { x: 5, y: 4 },
    Napalm: { x: 5, y: 5 },
    Star: { x: 5, y: 6 },
    Stone: { x: 5, y: 7 },
    Wave: { x: 5, y: 8 },
    Blizzard: { x: 6, y: 1 },
    Centaur: { x: 6, y: 2 },
    Flame: { x: 6, y: 3 },
    Knight: { x: 6, y: 4 },
    Plant: { x: 6, y: 5 },
    Tomahawk: { x: 6, y: 6 },
    Wind: { x: 6, y: 7 },
    Yamato: { x: 6, y: 8 },
}