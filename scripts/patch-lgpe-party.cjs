const fs = require('fs')

const path = 'src/core/save/LGPESAV.ts'
let text = fs.readFileSync(path, 'utf8')

const needle = '  getDisplayData() {\n'
const insert = `  getDisplayPkms() {
    return this.pokeListHeader.partyIndices
      .slice(0, 6)
      .map((monIndex, partySlot) => {
        if (monIndex < 0 || monIndex >= BOX_SLOTS_TOTAL) {
          return {
            mon: undefined,
            description: \`Party \${partySlot + 1}\`,
          }
        }

        const mon = this.getMonAtIndex(monIndex)
        return {
          mon: mon ?? undefined,
          description: \`Party \${partySlot + 1}\`,
        }
      })
  }

  getDisplayData() {
`

if (!text.includes(needle)) {
  throw new Error('Could not find LGPE getDisplayData insertion point')
}

if (!text.includes('getDisplayPkms()')) {
  text = text.replace(needle, insert)
  fs.writeFileSync(path, text, 'utf8')
}

console.log('LGPE party display patch applied')
