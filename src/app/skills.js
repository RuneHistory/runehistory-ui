const skillDefinitions = {
  overall: {
    name: 'overall',
    colour: '#0cfcff',
  },
  attack: {
    name: 'attack',
    colour: '#0bffad',
  },
  defence: {
    name: 'defence',
    colour: '#12ff15',
  },
  strength: {
    name: 'strength',
    colour: '#abff09',
  },
  hitpoints: {
    name: 'hitpoints',
    colour: '#feff0a',
  },
  ranged: {
    name: 'ranged',
    colour: '#ffdd08',
  },
  prayer: {
    name: 'prayer',
    colour: '#ff9d09',
  },
  magic: {
    name: 'magic',
    colour: '#ff720a',
  },
  cooking: {
    name: 'cooking',
    colour: '#ff3605',
  },
  woodcutting: {
    name: 'woodcutting',
    colour: '#ff064a',
  },
  fletching: {
    name: 'fletching',
    colour: '#ff0784',
  },
  fishing: {
    name: 'fishing',
    colour: '#ff0db2',
  },
  firemaking: {
    name: 'firemaking',
    colour: '#fb05ff',
  },
  crafting: {
    name: 'crafting',
    colour: '#ea09ff',
  },
  smithing: {
    name: 'smithing',
    colour: '#c639ff',
  },
  mining: {
    name: 'mining',
    colour: '#8209ff',
  },
  herblore: {
    name: 'herblore',
    colour: '#4a05ff',
  },
  agility: {
    name: 'agility',
    colour: '#0d0eff',
  },
  theiving: {
    name: 'theiving',
    colour: '#0b54ff',
  },
  slayer: {
    name: 'slayer',
    colour: '#426aff',
  },
  farming: {
    name: 'farming',
    colour: '#34b1ff',
  },
  hunter: {
    name: 'hunter',
    colour: '#37dfff',
  },
}

export const skills = Object.keys(skillDefinitions)

export const colours = {}
skills.forEach((skill) => {
  colours[skill] = skillDefinitions[skill].colour
})
