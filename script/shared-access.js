function Availability(
   glitchless = "unavailable",
   minorGlitches = "unavailable",
   owGlitches = "unavailable",
   majorGlitches = "unavailable"
) {
   this._glitchless = glitchless;
   this._normalLogic = glitchless;
   this._minorGlitches = minorGlitches;
   this._owGlitches = owGlitches;
   this._hardLogic = owGlitches;
   this._majorGlitches = majorGlitches;

   this.getClassName = function () {
      return this[trackerData[selectedGame].mapLogic];
   };
}

Object.defineProperty(Availability.prototype, "normalLogic", {
   get: function () {
      return this._normalLogic;
   },
   set: function (value) {
      this._normalLogic = value;
      this._hardLogic = value;
   },
});

Object.defineProperty(Availability.prototype, "glitchless", {
   get: function () {
      return this._glitchless;
   },
   set: function (value) {
      this._glitchless = value;
      this._minorGlitches = value;
      this._owGlitches = value;
      this._majorGlitches = value;
   },
});

Object.defineProperty(Availability.prototype, "minorGlitches", {
   get: function () {
      return this._minorGlitches;
   },
   set: function (value) {
      this._minorGlitches = value;
      this._owGlitches = value;
      this._majorGlitches = value;
   },
});

Object.defineProperty(Availability.prototype, "owGlitches", {
   get: function () {
      return this._owGlitches;
   },
   set: function (value) {
      this._owGlitches = value;
      this._majorGlitches = value;
   },
});

Object.defineProperty(Availability.prototype, "hardLogic", {
   get: function () {
      return this._hardLogic;
   },
   set: function (value) {
      this._hardLogic = value;
   },
});

Object.defineProperty(Availability.prototype, "majorGlitches", {
   get: function () {
      return this._majorGlitches;
   },
   set: function (value) {
      this._majorGlitches = value;
   },
});

function getHas(item) {
   var val = 0;
   if (
      trackerData[selectedGame] &&
      trackerData[selectedGame].items &&
      trackerData[selectedGame].items[item]
   ) {
      val = trackerData[selectedGame].items[item];
   } else if (
      trackerData.zelda3 &&
      trackerData.zelda3.items &&
      trackerData.zelda3.items[item]
   ) {
      val = trackerData.zelda3.items[item];
   } else if (
      trackerData.metroid3 &&
      trackerData.metroid3.items &&
      trackerData.metroid3.items[item]
   ) {
      val = trackerData.metroid3.items[item];
   }
   return val;
}

function has(item, amount = -1) {
   var ret = false;
   var val = -1;

   var globalReplace = {
      lamp: "lantern",
      pearl: "moonpearl",
   };

   if (item in globalReplace) {
      item = globalReplace[item];
   }

   if (item.indexOf(".") == -1) {
      if (
         trackerData[selectedGame] &&
         trackerData[selectedGame].items &&
         trackerData[selectedGame].items[item]
      ) {
         ret = true;
         val = trackerData[selectedGame].items[item];
      } else if (
         trackerData.zelda3 &&
         trackerData.zelda3.items &&
         trackerData.zelda3.items[item]
      ) {
         ret = true;
         val = trackerData.zelda3.items[item];
      } else if (
         trackerData.metroid3 &&
         trackerData.metroid3.items &&
         trackerData.metroid3.items[item]
      ) {
         ret = true;
         val = trackerData.metroid3.items[item];
      }
      if (ret) {
         if (amount > -1 && val < amount) {
            ret = false;
         }
      }
   } else {
      if (["zelda3", "metroid3"].indexOf(selectedGame) > -1) {
         if (item.indexOf("state") > -1) {
            let open = trackerData.zelda3.mapState == "open";
            let inverted = trackerData.zelda3.mapState == "inverted";
            if (item.indexOf("open") > -1) {
               return open;
            }
            if (item.indexOf("inverted") > -1) {
               return inverted;
            }
         } else if (item.indexOf("placement") > -1) {
            let basic = trackerData.zelda3.itemPlacement == "basic";
            let advanced = trackerData.zelda3.itemPlacement == "advanced";
            if (item.indexOf("basic") > -1) {
               return basic;
            }
            if (item.indexOf("advanced") > -1) {
               return advanced;
            }
         } else if (item.indexOf("swords") > -1) {
            if (
               item.indexOf("swordless") > -1 &&
               trackerData.zelda3.mapSwords == false
            ) {
               return true;
            }
         } else if (item.indexOf("variation") > -1) {
            if (item.indexOf("ohko") > -1 && trackerData.zelda3.mapOHKO) {
               return true;
            }
         }
      }
   }

   if (
      item.indexOf("key") > -1 || // FIXME: Keys for Dungeons
      item.indexOf("crystal") > -1 ||
      item.indexOf("pendant") > -1 ||
      item.indexOf("medallion") > -1
   ) {
      let checkBK = item.indexOf("bigkey") > -1;
      let checkKey = item.indexOf("key") > -1;
      let checkCrystal = item.indexOf("crystal") > -1;
      let checkRedCrystal =
         checkCrystal && (item.indexOf("5") > -1 || item.indexOf("6") > -1);
      let checkPendant = item.indexOf("pendant") > -1;
      let checkGreenPendant = checkPendant && item.indexOf("green") > -1;
      let checkPrize = checkCrystal || checkPendant;
      let checkMedallion = item.indexOf("medallion") > -1;

      if (checkBK) {
         return true;
      } else if (checkKey) {
         return true;
      } else if (checkPrize) {
         trackerData.zelda3.gotprizes = [0, 0, 0, 0];
         for (let k = 0; k < 10; k++) {
            for (let j = 0; j < 4; j++) {
               if (
                  trackerData.zelda3 &&
                  trackerData.zelda3.prizes &&
                  trackerData.zelda3.prizes[k] == j &&
                  trackerData.zelda3.items["boss" + k] === 2
               ) {
                  trackerData.zelda3.gotprizes[j] += 1;
               }
            }
         }

         let prizes = trackerData.zelda3.gotprizes;

         if (item.indexOf("crystal") > -1) {
            if (item.indexOf("all") > -1) {
               return prizes[CRYSTAL] == 5 && prizes[OJCRYSTAL] == 2;
            } else if (item.indexOf("5") > -1) {
               return prizes[OJCRYSTAL] >= 1;
            } else if (item.indexOf("6") > -1) {
               return prizes[OJCRYSTAL] == 2;
            }
         } else if (item.indexOf("pendant") > -1) {
            if (item.indexOf("all") > -1) {
               return prizes[OFFPENDANT] == 2 && prizes[GREENPENDANT] == 1;
            } else if (item.indexOf("red") > -1) {
               return prizes[OFFPENDANT] >= 1;
            } else if (item.indexOf("blue") > -1) {
               return prizes[OFFPENDANT] == 2;
            } else if (item.indexOf("green") > -1) {
               return prizes[GREENPENDANT] == 1;
            }
         }
      } else if (checkMedallion) {
         let dung = "";
         if (item.indexOf("mire") > -1) {
            dung = "mire";
         } else if (item.indexOf("trock") > -1) {
            dung = "trock";
         }
         return true;
      }
   }

   return ret;
}

// Helper functions to simplify logic.
// ALttP Ability Functions
function canDash() {
   return has("boots");
}

function canActivateTablets() {
   return has("book") && hasSword(2);
}

function canActivateMedallions() {
   return hasSword() || has("swords.swordless");
}

function hasSword(min_level = 1) {
   switch (min_level) {
      case 4:
         return has("sword", 4);
      case 3:
         return has("sword", 3);
      case 2:
         return has("sword", 2) || (has("swords.swordless") && has("hammer"));
      case 1:
         return has("sword", 1);
      default:
         return has("sword") || (has("swords.swordless") && has("hammer"));
   }
}

function canGrapple() {
   return has("hookshot");
}

function canInvul() {
   return has("cape") || has("byrna");
}

function canRead() {
   return has("book");
}

function canSwim() {
   return has("flippers");
}

function canLiftRocks() {
   return has("glove", 1);
}

function canLiftDarkRocks() {
   return has("glove", 2);
}

function canLightTorches() {
   return has("firerod") || has("lantern");
}

function canMeltThings() {
   return has("firerod") || (has("bombos") && canActivateMedallions());
}

function canFly() {
   return has("flute", 2);
}

function canSpinSpeed() {
   return canDash() && (has("sword", 1) || canGrapple());
}

function canShootArrows() {
   return has("bow");
}

function canBlockLasers() {
   return has("shield", 3);
}

function canExtendMagic() {
   return has("mpupgrade", 1) || has("bottle", 1);
}

function canKillEscapeThings() {
   return (
      hasSword() ||
      has("somaria") ||
      has("bomb") ||
      has("byrna") ||
      canShootArrows() ||
      has("hammer") ||
      has("firerod")
   );
}

function canKillMostThings(enemies = 5) {
   return (
      hasSword() ||
      has("somaria") ||
      (has("bomb") && enemies < 6) ||
      (has("byrna") && (enemies < 6 || canExtendMagic())) ||
      canShootArrows() ||
      has("hammer") ||
      has("firerod")
   );
}

function canGetGoodBee() {
   return (
      has("net") && has("bottle") && (canDash() || (hasSword() && has("quake")))
   );
}

function canBeatAga1(logic) {
   let darkNav = logic == "minor" && canDarkNav();
   let haveLamp = has("lantern");
   let ret = !has("agahnim") && (has("cape") || hasSword(2)) && hasSword();

   if (ret) {
      if (haveLamp) {
         return "agahnim";
      } else if (darkNav) {
         return "glitchagahnim";
      }
   } else {
      return false;
   }
}

function canOpenGT() {
   let ret = true;

   for (i = 1; i <= 7; i++) {
      if (!has("crystal" + i)) {
         ret = false;
      }
   }

   if (
      roomid == "smalttpr" &&
      trackerData &&
      ((trackerData.zelda3 && trackerData.zelda3.showPortals) ||
         (trackerData.metroid3 && trackerData.metroid3.showPortals))
   ) {
      ret = ret && has("motherbrain");
   }

   return ret;
}

function isBunny(regionName = "", regionSubname = "") {
   let darkRegions = [
      "PalaceOfDarkness",
      "SwampPalace",
      "ThievesTown",
      "SkullWoods",
      "IcePalace",
      "MiseryMire",
      "TurtleRock",
   ];

   let notBunny = "light";
   let bunny = "dark";

   if (has("state.inverted")) {
      notBunny = "dark";
      bunny = "light";
   } else {
      darkRegions.push("GanonsTower");
   }

   let world = "light";
   if (
      regionName.toLowerCase().indexOf("dark") > -1 ||
      darkRegions.indexOf(regionName) > -1
   ) {
      world = "dark";
   }

   return world == bunny && !has("moonpearl");
}

function canAccessLightWorld() {
   if (!has("state.inverted")) {
      return true;
   } else if (has("state.inverted")) {
      let warps = new HyruleWarpsMain();
      warps.initNoMajorGlitches();
      let south =
         warps.locations["South Hyrule Teleporter (Dark)"].glitchless();
      let east = warps.locations["East Hyrule Teleporter (Dark)"].glitchless();
      let west = warps.locations["Kakariko Teleporter (Dark)"].glitchless();
      let gate = warps.locations["Castle Gate (Dark)"].glitchless();

      return south || east || west || gate;
   }
}

function bookCheck() {
   // Basic: Yes Book
   return (
      (has("itemplacement.basic") && canRead()) ||
      // Advanced: No Book
      has("itemplacement.advanced")
   );
}

function gapCheck() {
   // Basic: Hookshot
   return (
      (has("itemplacement.basic") && canGrapple()) ||
      // Advanced: Hookshot or Boots
      (has("itemplacement.advanced") && (canDash() || canGrapple()))
   );
}

function torchCheck() {
   // Basic: Lantern
   return (
      (has("itemplacement.basic") && has("lantern")) ||
      // Advanced: Lantern or Fire Rod
      (has("itemplacement.advanced") && (has("firerod") || has("lantern")))
   );
}

function canDarkNav() {
   return !has("lantern");
}

function canFakeFlipper() {
   return !canSwim();
}

function canWaterwalk() {
   return canFakeFlipper() && has("moonpearl");
}

function canWaterwalkStored() {
   //	return canWaterwalk();
   return false;
}

function canFakePowder() {
   let potionShop = chests.zelda3.find(function (e) {
      return e.name == "Potion Shop";
   });
   return has("somaria") && has("mushroom") && !potionShop.isOpened;
}

function glitchedLinkInDarkWorld() {
   return has("moonpearl") || has("bottle", 1);
}

function canGoBeatAgahnim1(allowOutOfLogicGlitches) {
   return (
      !has("agahnim") &&
      (has("lantern") || allowOutOfLogicGlitches) &&
      (has("cape") || hasSword(2)) &&
      hasSword()
   );
}

function canEnterNorthEastDarkWorld(
   logic,
   agahnimCheck,
   allowOutOfLogicGlitches
) {
   if (logic === "majorGlitches") {
      return (
         has("agahnim") ||
         (agahnimCheck && canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
         (has("moonpearl") &&
            ((canLiftDarkRocks() && (canDash() || canSwim())) ||
               (has("hammer") && canLiftRocks()))) ||
         (canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
            (has("bottle", 1) ||
               (has("mirror") && canSpinSpeed()) ||
               (has("moonpearl") && (has("mirror") || canDash()))))
      );
   } else if (logic === "owGlitches") {
      return (
         has("agahnim") ||
         (agahnimCheck && canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
         (has("moonpearl") &&
            ((canLiftDarkRocks() && (canDash() || canSwim())) ||
               (has("hammer") && canLiftRocks()))) ||
         (canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
            ((has("mirror") && canSpinSpeed()) ||
               (has("moonpearl") && (has("mirror") || canDash()))))
      );
   } else if (logic === "glitchless") {
      return (
         has("agahnim") ||
         (agahnimCheck && canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
         (has("hammer") && canLiftRocks() && has("moonpearl")) ||
         (canLiftDarkRocks() && canSwim() && has("moonpearl")) ||
         (canAccessDarkWorldPortal() && canSwim() && has("moonpearl"))
      );
   }
}

function canEnterNorthWestDarkWorld(
   logic,
   agahnimCheck,
   allowOutOfLogicGlitches
) {
   if (logic === "majorGlitches") {
      return (
         canEnterWestDeathMountain("majorGlitches", allowOutOfLogicGlitches) ||
         (has("moonpearl") &&
            (canLiftDarkRocks() ||
               (has("hammer") && canLiftRocks()) ||
               ((has("agahnim") ||
                  (agahnimCheck &&
                     canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
                  canGrapple() &&
                  (has("hammer") || canLiftRocks() || canSwim()))))
      );
   } else if (logic === "owGlitches") {
      return (
         (canEnterWestDeathMountain("owGlitches", allowOutOfLogicGlitches) &&
            (has("mirror") || (canDash() && has("moonpearl")))) ||
         (has("moonpearl") &&
            (canLiftDarkRocks() ||
               (has("hammer") && canLiftRocks()) ||
               ((has("agahnim") ||
                  (agahnimCheck &&
                     canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
                  canGrapple() &&
                  (has("hammer") || canLiftRocks() || canSwim()))))
      );
   } else if (logic === "glitchless") {
      return (
         has("moonpearl") &&
         ((canEnterNorthEastDarkWorld(
            "glitchless",
            agahnimCheck,
            allowOutOfLogicGlitches
         ) &&
            canGrapple() &&
            (canSwim() || canLiftRocks() || has("hammer"))) ||
            (has("hammer") && canLiftRocks()) ||
            canLiftDarkRocks())
      );
   }
}

function canEnterSouthDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches) {
   if (logic === "majorGlitches") {
      return (
         canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) ||
         (has("moonpearl") &&
            (canLiftDarkRocks() ||
               (has("hammer") && canLiftRocks()) ||
               ((has("agahnim") ||
                  (agahnimCheck &&
                     canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
                  (has("hammer") ||
                     (canGrapple() && (canSwim() || canLiftRocks()))))))
      );
   } else if (logic === "owGlitches") {
      return (
         (has("moonpearl") &&
            (canLiftDarkRocks() ||
               (has("hammer") && canLiftRocks()) ||
               (has("agahnim") &&
                  (has("hammer") ||
                     (canGrapple() && (canLiftRocks() || canSwim())))))) ||
         ((has("mirror") || (canDash() && has("moonpearl"))) &&
            canEnterWestDeathMountain(logic, allowOutOfLogicGlitches)) ||
         (canAccessDarkWorldPortal() && canSwim())
      );
   } else if (logic === "glitchless") {
      return (
         has("moonpearl") &&
         (canLiftDarkRocks() ||
            (has("hammer") && canLiftRocks()) ||
            (canEnterNorthEastDarkWorld(
               "glitchless",
               agahnimCheck,
               allowOutOfLogicGlitches
            ) &&
               (has("hammer") ||
                  (canGrapple() && (canSwim() || canLiftRocks())))))
      );
   }
}

function canEnterMireArea(logic, agahnimCheck, allowOutOfLogicGlitches) {
   if (logic === "majorGlitches") {
      return (
         (has("bottle") &&
            canEnterWestDeathMountain(
               "majorGlitches",
               allowOutOfLogicGlitches
            )) ||
         (canLiftDarkRocks() && (canFly() || has("bottle") || canDash())) ||
         (glitchedLinkInDarkWorld() &&
            canDash() &&
            canEnterSouthDarkWorld(
               "majorGlitches",
               agahnimCheck,
               allowOutOfLogicGlitches
            ))
      );
   } else if (logic === "owGlitches") {
      return (
         (canLiftDarkRocks() && (canFly() || canDash())) ||
         (has("moonpearl") &&
            has("boots") &&
            canEnterSouthDarkWorld(
               "owGlitches",
               agahnimCheck,
               allowOutOfLogicGlitches
            ))
      );
   } else if (logic === "glitchless") {
      return (canFly() && canLiftDarkRocks()) || canAccessMiseryMirePortal();
   }
}

function canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) {
   if (logic === "majorGlitches") {
      return (
         canDash() ||
         has("bottle", 1) ||
         canFly() ||
         (canLiftRocks() && (has("lantern") || allowOutOfLogicGlitches))
      );
   } else if (logic === "owGlitches") {
      return (
         canDash() ||
         canFly() ||
         (canLiftRocks() && (has("lantern") || allowOutOfLogicGlitches))
      );
   } else if (logic === "glitchless") {
      return (
         canFly() ||
         (canLiftRocks() && (has("lantern") || allowOutOfLogicGlitches)) ||
         canAccessDeathMountainPortal()
      );
   }
}

function canEnterEastDeathMountain(logic, allowOutOfLogicGlitches) {
   if (logic === "majorGlitches") {
      return (
         canDash() ||
         (canEnterWestDeathMountain("majorGlitches", allowOutOfLogicGlitches) &&
            (canGrapple() || has("mirror")))
      );
   } else if (logic === "owGlitches") {
      return (
         canDash() ||
         (canEnterWestDeathMountain("owGlitches", allowOutOfLogicGlitches) &&
            (canGrapple() || (has("mirror") && has("hammer"))))
      );
   } else if (logic === "glitchless") {
      return (
         canEnterWestDeathMountain("glitchless", allowOutOfLogicGlitches) &&
         (canGrapple() || (has("mirror") && has("hammer")))
      );
   }
}

function canEnterEastDarkWorldDeathMountain(logic, allowOutOfLogicGlitches) {
   if (logic === "majorGlitches") {
      return (
         has("moonpearl") ||
         (has("bottle") && canDash()) ||
         ((canLiftDarkRocks() || (has("hammer") && canDash())) &&
            canEnterEastDeathMountain(
               "majorGlitches",
               allowOutOfLogicGlitches
            )) ||
         (has("mirror") &&
            canEnterWestDeathMountain("majorGlitches", allowOutOfLogicGlitches))
      );
   } else if (logic === "owGlitches") {
      return (
         (has("moonpearl") && canDash()) ||
         ((canLiftDarkRocks() || (has("hammer") && canDash())) &&
            canEnterEastDeathMountain("owGlitches", allowOutOfLogicGlitches))
      );
   } else if (logic === "glitchless") {
      return (
         canLiftDarkRocks() &&
         canEnterEastDeathMountain("glitchless", allowOutOfLogicGlitches)
      );
   }
}

// app/Support/ItemCollection.php
// SM Ability functions
function canDestroyBombWalls() {
   // Morph Ball, Bombs || Power Bombs, Screw Attack; Can pass through barriers that must be destroyed
   return (
      (canMorph() && (canUseMorphBombs() || canUsePowerBombs())) || has("screw")
   );
}

function canEnterAndLeaveGauntlet() {
   // Gauntlet area is complicated apparently
   if (trackerData.metroid3.mapLogic == "normalLogic") {
      return (
         canMorph() &&
         (canFlySM() || canDashSM()) &&
         (canIbj() ||
            (canUsePowerBombs() && has("powerbomb", 2)) ||
            has("screw"))
      );
   } else if (trackerData.metroid3.mapLogic == "hardLogic") {
      return (
         (canMorph() && (canUseMorphBombs() || has("powerbomb", 2))) ||
         has("screw") ||
         (canDashSM() && canUsePowerBombs() && hasEnergyReserves(2))
      );
   }
}

function canCrystalFlash() {
   // Refill HP
   return (
      has("missile", 2) &&
      has("supermissile", 2) &&
      has("powerbomb", 3) &&
      canMorph()
   );
}

function canCwj() {
   // FIXME: Not Casual
   return true;
}

function canDashSM() {
   // SM: Speed Booster
   return has("speed");
}

function canDamageBoostJump() {
   // Requires accurate positioning, #FIXME: Not Casual
   return true;
}

function canFlySM() {
   // SM: Infinite Bomb Jump or Space Jump
   return canIbj() || has("space");
}

function canGrappleSM() {
   // SM: Grapple Beam
   return has("grappling");
}

function canGravityJump() {
   // FIXME: Not Casual
   return canSwimSM();
}

function canHellRun() {
   // Varia or enough health
   return heatProof() || hasEnergyReserves(5);
}

function canHiJump() {
   return has("hijump");
}

function canIbj() {
   // Infinite Bomb Jump, #FIXME: Not Casual
   return canUseMorphBombs();
}

function canMachball() {
   // #FIXME: Not Casual
   return canMorph();
}

function canMorph() {
   return has("morph");
}

function canOpenGreenDoors() {
   return has("supermissile", 1);
}

function canGGG() {
   return canOpenGreenDoors();
}

function canOpenRedDoors() {
   return has("missile", 1) || canOpenGreenDoors();
}

function canOpenYellowDoors() {
   return canUsePowerBombs();
}

function canPassBombPassages() {
   // Power Bombs || Infinite Bomb Jump
   return canUsePowerBombs() || canIbj();
}

function canShortCharge() {
   // FIXME: Not Casual
   return canDashSM();
}

function canSpringBall() {
   return canMorph() && has("springball");
}

function canSpringBallJump() {
   // FIXME: Not Casual
   return has("springball");
}

function canSwimSM() {
   // SM: Gravity Suit
   return has("gravity");
}

function canUseMorphBombs() {
   return canMorph() && has("bombs");
}

function canUsePowerBombs() {
   return canMorph() && has("powerbomb");
}

function canWalljump() {
   return true;
}

function canYba($amount = 1) {
   // FIXME: Not Casual
   return has("bottle", $amount);
}

function hasEnergyReserves(amount) {
   // Total Energy Tanks (including Reserve Tanks)
   return getHas("etank") + getHas("rtank") >= amount;
}

function heatProof() {
   // Varia Suit
   return has("varia");
}

// SM Bosses
function canDefeatBotwoon() {
   switch (trackerData.metroid3.mapLogic) {
      case "hardLogic":
         return has("ice") || canDashSM() || canAccessMaridiaPortal();
      case "normalLogic":
         return canDashSM() || canAccessMaridiaPortal();
   }
}

function canDefeatDraygon() {
   switch (trackerData.metroid3.mapLogic) {
      case "hardLogic":
         return (
            canDefeatBotwoon() &&
            canSwimSM() &&
            ((canDashSM() && canHiJump()) || canFlySM())
         );
      case "normalLogic":
         return canDefeatBotwoon() && canSwimSM();
   }
}

// SM -> ALttP portals
function canAccessLightWorldPortal() {
   // Crateria Map Room -> Link's Fortune Teller
   return true;
}

function canAccessDeathMountainPortal() {
   // Norfair Map Room -> DM (Old Man exit)
   return (
      (canDestroyBombWalls() || canDashSM()) &&
      canOpenGreenDoors() &&
      canMorph()
   );
}

function canAccessMiseryMirePortal() {
   // Lower Norfair (Golden Torizo Energy Refill) -> Mire (Great Fairy, east "Entrance")
   if (trackerData.metroid3.mapLogic == "normalLogic") {
      return (
         heatProof() &&
         canOpenGreenDoors() &&
         canOpenYellowDoors() &&
         canSwimSM() &&
         has("space")
      );
   } else if (trackerData.metroid3.mapLogic == "hardLogic") {
      return (
         heatProof() &&
         canOpenGreenDoors() &&
         (canHiJump() || canSwimSM()) &&
         canOpenYellowDoors()
      );
   }
}

function canAccessDarkWorldPortal() {
   // Maridia Missile Refill -> DW (DW Ice Rod Right)
   if (trackerData.metroid3.mapLogic == "normalLogic") {
      return (
         canUsePowerBombs() && canOpenGreenDoors() && canSwimSM() && canDashSM()
      );
   } else if (trackerData.metroid3.mapLogic == "hardLogic") {
      return (
         canUsePowerBombs() &&
         canOpenGreenDoors() &&
         (has("charge") || (canOpenGreenDoors() && canOpenRedDoors())) &&
         (canSwimSM() || (canHiJump() && has("ice") && canGrappleSM())) &&
         (has("ice") || (canDashSM() && canSwimSM()))
      );
   }
}

// ALttP -> SM portals
function canAccessCrateriaPortal() {
   // Fortune Teller -> Crateria Map Room
   return !isBunny("light");
}

function canAccessNorfairPortal() {
   // DM (Old Man exit) -> Norfair Map Room
   // Death Mountain Access
   return !isBunny("light") && (canFly() || (canLiftRocks() && has("lantern")));
}

function canAccessLowerNorfairPortal() {
   // Mire (Great Fairy, east "Entrance") -> Lower Norfair (Golden Torizo Energy Refill)
   return !isBunny("light") && canFly() && canLiftDarkRocks();
}

function canAccessMaridiaPortal() {
   // DW (DW Ice Rod Right) -> Maridia Missile Refill
   if (trackerData.metroid3.mapLogic == "normalLogic") {
      return (
         !isBunny("dark") &&
         canSwim() &&
         canSwimSM() &&
         canMorph() &&
         (has("agahnim") ||
            (has("hammer") && canLiftRocks()) ||
            canLiftDarkRocks())
      );
   } else if (trackerData.metroid3.mapLogic == "hardLogic") {
      return (
         !isBunny("dark") &&
         canSwim() &&
         (canSpringBallJump() || canHiJump() || canSwimSM()) &&
         canMorph() &&
         (has("agahnim") ||
            (has("hammer") && canLiftRocks()) ||
            canLiftDarkRocks())
      );
   }
}
