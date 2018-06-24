class Region {
  constructor(name,subname,buildLocations = true) {
    Region.prototype.name = name;
    Region.prototype.subname = subname;
    Region.prototype.buildLocations = buildLocations;
    this.canEnter = {
		glitchless: function() { return true; },
		minorGlitches: function() { return this.glitchless(); },
		owGlitches: function() { return this.minorGlitches(); },
		majorGlitches: function() { return this.owGlitches(); },
		casualLogic: function() { return true; },
		tourneyLogic: function() { return this.casualLogic(); }
	};
    this.canComplete = {
		glitchless: function() { return canEnter.glitchless(); },
		minorGlitches: function() { return this.glitchless(); },
		owGlitches: function() { return this.minorGlitches(); },
		majorGlitches: function() { return this.owGlitches(); },
		casualLogic: function() { return canEnter.casualLogic(); },
		tourneyLogic: function() { return this.casualLogic(); }
	};
    Region.prototype.initNone = function() { };
    Region.prototype.initNoMajorGlitches = function() { };
    Region.prototype.initMinorGlitches = function() { this.initNoMajorGlitches(); };
    Region.prototype.initOverworldGlitches = function() { this.initMinorGlitches(); };
    Region.prototype.initmajorGlitches = function() { this.initOverworldGlitches(); };
    Region.prototype.initCasual = function() { };
    Region.prototype.initTournament = function() { this.initCasual(); };
    this.locations = [];
  }
}
