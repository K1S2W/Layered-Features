addLayer("u", {
    name: "upgrade", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: () => colors[getThemeName()].u, // Dynamic color based on theme
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "upgrade points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('u', 23)) mult = mult.times(upgradeEffect('u', 23))
        if (hasUpgrade('u', 24)) mult = mult.times(upgradeEffect('u', 24))
        if (hasUpgrade('u', 35)) mult = mult.times(upgradeEffect('u', 25))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for upgrade points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Basic Multiplier",
            description: "Double Points Gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Basic Multiplier Again",
            description: "Triple Points Gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Same As Before",
            description: "Quadruple Points Gain.",
            cost: new Decimal(6),
        },
        14: {
            title: "Over and Over",
            description: "Quintuple Points Gain.",
            cost: new Decimal(24),
        },
        15: {
            title: "I Got Lazy",
            description: "Sextuple Points Gain.",
            cost: new Decimal(120),
        },
        21: {
            unlocked() {return hasUpgrade('u', 15)},
            effect() {
                if (hasUpgrade(this.layer, 31)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "New Type!",
            description: "Multiply Points By Upgrade Points.",
            tooltip() {
                if (hasUpgrade(this.layer, 31)) return "Log9(Upgrade Points + 9)"
                return "Log10(Upgrade Points + 10)"
            },
            cost: new Decimal(500),
        },
        22: {
            unlocked() {return hasUpgrade('u', 15)},
            effect() {
                if (hasUpgrade(this.layer, 32)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Self Powered",
            description: "Multiply Points By Itself.",
            tooltip() {
                if (hasUpgrade(this.layer, 32)) return "Log9(Points + 9)"
                return "Log10(Points + 10)"
            },
            cost: new Decimal(1000),
        },
        23: {
            unlocked() {return hasUpgrade('u', 15)},
            effect() {
                if (hasUpgrade(this.layer, 33)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Copy Paste",
            description: "Multiply Upgrade Points By Itself.",
            tooltip() {
                if (hasUpgrade(this.layer, 33)) return "Log9(Upgrade Points + 9)"
                return "Log10(Upgrade Points + 10)"
            },
            cost: new Decimal(2500),
        },
        24: {
            unlocked() {return hasUpgrade('u', 15)},
            effect() {
                if (hasUpgrade(this.layer, 34)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Once Again",
            description: "Multiply Upgrade Points By Points.",
            tooltip() {
                if (hasUpgrade(this.layer, 34)) return "Log9(Points + 9)"
                return "Log10(Points + 10)"
            },
            cost: new Decimal(7500),
        },
        25: {
            unlocked() {return hasUpgrade('u', 15)},
            effect() {
                return player["u"].upgrades.length
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            title: "Direct Multiplier",
            description() {
                if (hasUpgrade(this.layer, 35)) return "Multiply Points And Upgrade Points By Upgrade Upgrades Bought."
                return "Multiply Points By UpgradeUpgrades Bought."
            },
            tooltip: "(Upgrade Upgrades)^1",
            cost: new Decimal(25000),
        },
        31: {
            unlocked() {return hasUpgrade('u', 25)},
            title: "Improvement",
            description: "Improves \"New Type!\" Formula.",
            cost: new Decimal(75000),
        },
        32: {
            unlocked() {return hasUpgrade('u', 25)},
            title: "<-",
            description: "Improves \"Self Powered\" Formula.",
            cost: new Decimal(125000),
        },
        33: {
            unlocked() {return hasUpgrade('u', 25)},
            title: "These Are Useless",
            description: "Improves \"Copy Paste\" Formula.",
            cost: new Decimal(175000),
        },
        34: {
            unlocked() {return hasUpgrade('u', 25)},
            title: "Why?",
            description: "Improves \"Once Again\" Formula.",
            cost: new Decimal(225000),
        },
        35: {
            unlocked() {return hasUpgrade('u', 25)},
            title: "Worth The Wait",
            description: "\"Direct Multiplier\" Also Applies To Upgrade Point Gain, Unlock Achievements.",
            cost: new Decimal(300000),
        },
    },
})

// Global Achievements Layer
addLayer("a", {
    name: "Achievements",
    symbol: "A",
    position: 1,
    row: "side", // Side layer for achievements
    startData() { return {unlocked: true}},
    color: () => colors[getThemeName()].a, // Dynamic color based on theme
    tooltip: "Achievements",
    layerShown() { return hasUpgrade("u", 35) },
    achievements: {
        11: {
            name: "Passive Generation",
            done() {return player.points.gte(10000000) && hasUpgrade("u", 35)}, // Check if player has 10M points and has the upgrade
            goalTooltip: "Reach 10M Points.",
            reward: "Generates 1% of Upgrade Point gain per second.",
        },
        // Add more achievements here
    },
    update(diff) {
        // If achievement 11 is unlocked, generate 1% of Upgrade Point gain per second
        if (hasAchievement("a", 11)) {
            let gain = tmp.u.resetGain.times(0.01).times(diff)
            player.u.points = player.u.points.add(gain)
        }
    },
})
