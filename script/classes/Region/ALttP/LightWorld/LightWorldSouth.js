class LightWorldSouth extends LightWorld {
  constructor(name = "LightWorld", subname = "South", buildLocations = true) {
    super(name, subname);
    let regionName = name + subname;
    if (this.buildLocations) {
      this.locations = new LocationCollection([
        new Location("Chest", "Link's House", "27.4%", "67.9%", regionName),
        new Location("Chest", "Aginah's Cave", "10.0%", "82.6%", regionName, {equipment: "%%bomb%%"}),
        //			new Location("Chest","Mini Moldorm Cave - Far Left","32.6%","93.4%",regionName,{equipment:"%%bomb%%"}),
        //			new Location("Chest","Mini Moldorm Cave - Left","32.6%","93.4%",regionName,{equipment:"%%bomb%%"}),
        //			new Location("Chest","Mini Moldorm Cave - Right","32.6%","93.4%",regionName,{equipment:"%%bomb%%"}),
        //			new Location("Chest","Mini Moldorm Cave - Far Right","32.6%","93.4%",regionName,{equipment:"%%bomb%%"}),
        new Location("Chest", "Ice Rod Cave", "44.7%", "76.9%", regionName, {equipment: "%%bomb%%"}),
        new Location("NPC", "Hobo", "35.4%", "69.7%", regionName, {equipment: "%%flippers%%"}),
        new Location("Tablet", "Bombos Tablet", "11.0%", "92.2%", regionName, {equipment: "%%mirror%%%%sword2%%%%book%%"}),
        new Location("Standing", "Cave 45", "14.1%", "84.1%", regionName, {equipment: "(South of Grove) %%mirror%%"}),
        new Location("Standing", "Checkerboard Cave", "8.8%", "77.3%", regionName, {equipment: "%%mirror%%"}),
        //			new Location("NPC","Mini Moldorm Cave - NPC","32.6%","93.4%",regionName,{equipment:"(+4)%%bomb%%"}),
        new Location("NPC", "Mini Moldorm Cave", "32.6%", "93.4%", regionName, {equipment: "(NPC + 4)%%bomb%%"}),
        new Location("Dash", "Library", "7.7%", "65.9%", regionName, {equipment: "%%boots%%"}),
        new Location("Standing", "Maze Race", "1.8%", "69.8%", regionName, {equipment: "%%bomb%%/%%boots%%"}),
        new Location("Standing", "Desert Ledge", "1.5%", "91.0%", regionName, {equipment: "%%book%%/%%mirror%%"}),
        new Location("Standing", "Lake Hylia Island", "36.1%", "82.9%", regionName, {equipment: "%%mirror%%"}),
        //new Location("Chest", "Floodgate Chest", "23.4%", "90.0%", regionName),
        new Location("Standing", "Sunken Treasure", "23.4%", "93.2%", regionName),
        new Location("Dig", "Flute Spot", "14.4%", "66.2%", regionName, {equipment: "%%shovel%%"})
      ], this);
    }
  }

  initNoMajorGlitches() {
    let region = this;

    if (this.buildLocations) {
      this.locations["Aginah's Cave"].glitchless = function () {
        return (!isBunny(region.name));
      }
      this.locations["Hobo"].glitchless = function () {
        return canSwim() && (!isBunny(region.name));
      }
      this.locations["Bombos Tablet"].glitchless = function () {
        let sdw = new DarkWorldSouth("", "", false);
        sdw.initNoMajorGlitches();

        let canAccessLedge = has("mirror") || has("state.inverted");

        return canActivateTablets() &&
          canAccessLedge && (!isBunny(region.name)) && sdw.canEnter.glitchless();
      }
      this.locations["Cave 45"].glitchless = function () {
        if (!has("state.inverted")) {
          let sdw = new DarkWorldSouth("", "", false);
          sdw.initNoMajorGlitches();

          return has("mirror") && sdw.canEnter.glitchless();
        } else if (has("state.inverted")) {
          return true;
        }
      }
      this.locations["Checkerboard Cave"].glitchless = function () {
        let canAccessArea = (canFly() && canLiftDarkRocks()) || (canAccessMiseryMirePortal() && canLiftRocks());

        if (canAccessArea && (!isBunny(region.name))) {
          if (!has("state.inverted")) {
            return has("mirror");
          } else if (has("state.inverted")) {
            return true;
          }
        }
      }
      this.locations["Mini Moldorm Cave"].glitchless = function () {
        return (!isBunny(region.name));
      }
      this.locations["Library"].glitchless = function () {
        return canDash() && (!isBunny(region.name));
      }
      this.locations["Maze Race"].glitchless = function () {
        return (!isBunny(region.name));
      }
      this.locations["Desert Ledge"].glitchless = function () {
        let dp = new DungeonsDesertPalace();
        dp.initNoMajorGlitches();

        return dp.canEnter.glitchless();
      }
      this.locations["Lake Hylia Island"].glitchless = function () {
        if (!has("state.inverted")) {
          let sdw = new DarkWorldSouth("", "", false);
          sdw.initNoMajorGlitches();

          let nedw = new DarkWorldNorthEast("", "", false);
          nedw.initNoMajorGlitches();

          return canSwim() && (!isBunny(region.name)) && has("mirror") &&
            (sdw.canEnter.glitchless() ||
              nedw.canEnter.glitchless());
        } else if ((has("state.inverted") && (!isBunny(region.name)))) {
          return has("flippers");
        }
      }
      //this.locations["Floodgate Chest"].glitchless =
      this.locations["Sunken Treasure"].glitchless = function () {
        return (!isBunny(region.name));
      }
      this.locations["Flute Spot"].glitchless = function () {
        return has("shovel") && (!isBunny(region.name));
      }
    }

    this.canEnter.glitchless = function () {
      return canAccessLightWorld();
    }
  }

  initMinorGlitches() {
    let region = this;

    this.initNoMajorGlitches();

    if (this.buildLocations) {
      this.locations["Hobo"].minorGlitches = function () {
        let ret = this.glitchless();
        if (ret) {
          return ret;
        }
        if (canFakeFlipper() && (!isBunny(region.name))) {
          return "glitchavailable";
        }
      }
      this.locations["Bombos Tablet"].minorGlitches = function () {
        let ret = this.glitchless();

        if (ret) {
          return ret;
        }

        let sdw = new DarkWorldSouth("", "", false);
        sdw.initMinorGlitches();

        let canAccessLedge = has("mirror") || has("state.inverted");

        if (canAccessLedge && sdw.canEnter.minorGlitches()) {
          let glitch = sdw.canEnter.minorGlitches();
          let type = typeof glitch;
          if (canActivateTablets() && (!isBunny(region.name))) {
            return type == "string" ? glitch : "available";
          }
          if (canRead()) {
            return type == "string" ? glitch : "viewable";
          }
        }

        if (canActivateTablets() &&
          (!isBunny(region.name)) && canAccessLedge && sdw.canEnter.minorGlitches()) {
          return sdw.canEnter.minorGlitches();
        }
      }
      this.locations["Cave 45"].minorGlitches = function () {
        let ret = this.glitchless();

        if (ret) {
          return ret;
        }

        let sdw = new DarkWorldSouth("", "", false);
        sdw.initMinorGlitches();

        if (has("mirror") && sdw.canEnter.minorGlitches()) {
          return sdw.canEnter.minorGlitches();
        }
      }
      this.locations["Mini Moldorm Cave"].minorGlitches = function () {
        let ret = this.glitchless();
        if (ret) {
          return ret;
        }
        return (!isBunny(region.name));
      }
      this.locations["Library"].minorGlitches = function () {
        let ret = this.glitchless();
        if (ret) {
          return ret;
        }
        if (region.canEnter.glitchless()) {
          return "viewable";
        }
      }
      this.locations["Maze Race"].minorGlitches = function () {
        let ret = this.glitchless();

        if (ret) {
          return ret;
        }
        if (isBunny(region.name)) {
          return "viewable";
        }
      }
      this.locations["Desert Ledge"].minorGlitches = function () {
        let ret = this.glitchless();
        if (ret) {
          return ret;
        }
        if (region.canEnter.glitchless()) {
          return "viewable";
        }
      }
      this.locations["Lake Hylia Island"].minorGlitches = function () {
        if (!has("state.inverted")) {
          let ret = this.glitchless();
          if (ret) {
            return ret;
          }
          if (canSwim() && (!isBunny(region.name)) && has("mirror")) {
            let dws = new DarkWorldSouth("", "", false);
            dws.initMinorGlitches();

            if (dws.canEnter.minorGlitches()) {
              return dws.canEnter.minorGlitches();
            }
          }
          if (region.canEnter.glitchless()) {
            return "viewable";
          }
        } else if (has("state.inverted")) {
          let ret = canSwim() && (!isBunny(region.name));

          if (ret) {
            return ret;
          } else {
            return "viewable";
          }
        }
      }
      this.locations["Sunken Treasure"].minorGlitches = function () {
        return (!isBunny(region.name));
      }
    }
  }
}
