class DungeonsHyruleCastleEscape extends Dungeons {
  constructor(name = "Dungeons", subname = "HyruleCastleEscape", buildLocations = true) {
    super(name, subname, buildLocations);
    let regionName = name + subname;
    if (this.buildLocations) {
      this.locations = new LocationCollection([
        new Location("Chest", "Sanctuary", "23.0%", "28.0%", regionName),
        //			new Location("Chest","Sewers - Secret Room - Left","26.8%","32.4%",regionName,{equipment:"%%bomb%%/%%boots%%"}),
        //			new Location("Chest","Sewers - Secret Room - Middle","26.8%","32.4%",regionName,{equipment:"%%bomb%%/%%boots%%"}),
        //			new Location("Chest","Sewers - Secret Room - Right","26.8%","32.4%",regionName,{equipment:"%%bomb%%/%%boots%%"}),
        new Location("Chest", "Sewers - Secret Room (3)", "26.8%", "32.4%", regionName, {equipment: "%%bomb%%/%%boots%%"}),
        new Location("Chest", "Sewers - Dark Cross", "26.8%", "38.0%", regionName, {equipment: "%%lantern%%"}),
        //			new Location("Chest","Hyrule Castle - Boomerang Chest","24.9%","44.1%",regionName),
        //			new Location("Chest","Hyrule Castle - Map Chest","24.9%","44.1%",regionName),
        //			new Location("Chest","Hyrule Castle - Zelda's Cell","24.9%","44.1%",regionName),
        new Location("Chest", "Hyrule Castle (3)", "24.9%", "44.1%", regionName),
        new Location("NPC", "Link's Uncle", "29.8%", "41.0%", regionName),
        //new Location("Chest", "Secret Passage", "29.8%", "43.0%", regionName)
      ], this);
    }
  }

  initNoMajorGlitches() {
    let region = this;

    this.locations["Sanctuary"].glitchless = function () {
      if (has("state.open")) {
        return true;
      } else {
        let sanc = chests.zelda3.find(function (e) {
          return e.name == "Sanctuary";
        });
        sanc.isOpened = true;
      }
      return (!isBunny(region.name)) && canKillEscapeThings() && has("keyh1");
    }

    if (this.buildLocations) {
      //		this.locations["Sewers - Secret Room - Left"].glitchless =
      //		this.locations["Sewers - Secret Room - Middle"].glitchless =
      //		this.locations["Sewers - Secret Room - Right"].glitchless
      this.locations["Sewers - Secret Room (3)"].glitchless = function () {
        if (has("state.open")) {
          // Gloves: Fall from Graveyard
          // Torches along the way, need key for Dark Cross door
          return (!isBunny(region.name)) && (canLiftRocks() || (torchCheck() && has("keyh1")));
        }
        return (!isBunny(region.name)) && (canKillEscapeThings() && has("keyh1"));
      }
      this.locations["Sewers - Dark Cross"].glitchless = function () {
        if (has("state.open")) {
          return (!isBunny(region.name)) && (torchCheck() && has("keyh1"));
        }
        return (!isBunny(region.name)) && (canKillEscapeThings() && has("keyh1"));
      }
      //		this.locations["Hyrule Castle - Boomerang Chest"].glitchless =
      //		this.locations["Hyrule Castle - Map Chest"].glitchless =
      //		this.locations["Hyrule Castle - Zelda's Cell"].glitchless = function() {
      //			if(has("state.open")) {
      //				return has("keyh1");
      //			}
      //			return canKillEscapeThings();
      //		}
      this.locations["Link's Uncle"].glitchless = function () {
        return (!isBunny(region.name));
      }
      /*this.locations["Secret Passage"].glitchless = function () {
        if (has("state.open")) {
          return (!isBunny(region.name)) && true;
        } else {
          let passage = chests.zelda3.find(function (e) {
            return e.name == "Secret Passage";
          });
          passage.isOpened = true;
        }
        return (!isBunny(region.name)) && (canKillEscapeThings());
      }*/
    }

    this.canEnter.glitchless = function () {
      return canAccessLightWorld();
    }
    this.canComplete.glitchless = function () {
      if (has("state.open")) {
        return true;
      }
      return this.locations["Sanctuary"].glitchless();
    }
  }
}
