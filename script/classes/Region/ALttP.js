effectiveVersion = "v29.2";

class ALttP extends Region {}
class DarkWorld extends ALttP {}
class DeathMountain extends ALttP {}
class LightWorld extends ALttP {}
class DarkWorldDeathMountain extends DarkWorld {}
class HyruleWarps extends ALttP {}
class ZebesPortals extends ALttP {}
class Dungeons extends ALttP {
   constructor(name, subname) {
      super(name, subname);
      Dungeons.prototype.boss = new Boss();
      this.canGetChest = {
         glitchless: function () {
            return true;
         },
         minorGlitches: function () {
            return this.glitchless();
         },
         owGlitches: function () {
            return this.minorGlitches();
         },
         majorGlitches: function () {
            return this.owGlitches();
         },
      };
      this.hasMedallion = function () {
         return false;
      };
      this.mayHaveMedallion = function () {
         return false;
      };
      this.mayEnter = {
         glitchless: function () {
            return false;
         },
         minorGlitches: function () {
            return this.glitchless();
         },
         owGlitches: function () {
            return this.minorGlitches();
         },
         majorGlitches: function () {
            return this.owGlitches();
         },
      };
   }
}
