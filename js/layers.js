addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "rgba(0, 200, 0 , 1)",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 23)) mult = mult.times(upgradeEffect('p', 23))
        if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Basic Multiplier",
            description: "Double points gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Basic Multiplier Again",
            description: "Triple points gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Same As Before",
            description: "Quadruple points gain.",
            cost: new Decimal(6),
        },
        14: {
            title: "Over and Over",
            description: "Quintuple points gain.",
            cost: new Decimal(24),
        },
        15: {
            title: "I Got Lazy",
            description: "Sextuple points gain.",
            cost: new Decimal(120),
        },
        21: {
            effect() {
                return player[this.layer].points.add(10).log10(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "New Type!",
            description: "Multiply Points By Log10(Prestige Points + 10)",
            cost: new Decimal(500),
        },
        22: {
            effect() {
                return player.points.add(10).log10(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Self Powered",
            description: "Multiply Points By Log10(Points + 10)",
            cost: new Decimal(1000),
        },
        23: {
            effect() {
                return player[this.layer].points.add(10).log10(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Copy Paste",
            description: "Multiply Prestige Points By Log10(Prestige Points + 10)",
            cost: new Decimal(2500),
        },
        24: {
            effect() {
                return player.points.add(10).log10(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Once Again",
            description: "Multiply Prestige Points By Log10(Points + 10)",
            cost: new Decimal(7500),
        },
        25: {
            effect() {
                return player["p"].upgrades.length
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Direct Multiplier",
            description: "Multiply Points By Prestige Upgrades Bought",
            cost: new Decimal(7500),
        },
    }
    
})
