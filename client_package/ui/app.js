new Vue({
    el: '#app',
    data: {
		inVehicle: false,
		line1: {
            lineName: "Main",
			driver: "none",
			modelHash: "#ffffff",
			dimension: 0,
			networkId: 0
		},
		line2: {
            lineName: "Position",
			pos: {x: 0, y: 0, z: 0},
			aimpos: {x: 0, y: 0, z: 0},
			rot: {x: 0, y: 0, z: 0}
		},
		line3: {
            lineName: "Velocity",
			linear: {x: 0, y: 0, z: 0},
			angular: {x: 0, y: 0, z: 0}
		},
		line4: {
            lineName: "Misc",
			health: 0,
			primaryColor: 0,
			destroyed: false,
			nitro: false,
			turbojump: false
		}
	},
    methods: {
        GetCorrectValue: function(entry) {
            if(typeof entry === "object") {
                var buffer = "";
                for(var key in entry) {
                    buffer += key + ": ";
                    if(entry.hasOwnProperty(key)) {
                        buffer += entry[key] + " ";
                    }
                }
                return buffer;
            }
            return entry;
        }
    },
    mounted: function() {
        jcmp.AddEvent("applyVehicleDebugInfo", obj => {
            var data = JSON.parse(obj);
            this.$data.inVehicle = data.inVehicle;
            this.$data.line1 = data.line1;
            this.$data.line2 = data.line2;
            this.$data.line3 = data.line3;
            this.$data.line4 = data.line4;
        });

        setInterval(() => {
            jcmp.CallEvent("requestVehicleDebugInfo");
        }, 1000);
    }
});

(function () {
    var debugVehicleKey = 0;
    var switchViewKey = 0;

    //Sets the new settings
    jcmp.AddEvent("applySettings", settings => {
        var keys = JSON.parse(settings);
        debugVehicleKey = keys.debugVehicleKey;
        switchViewKey = keys.switchViewKey;
    });

    document.onkeydown = (event) => {
        if (event.keyCode == debugVehicleKey) {
            jcmp.CallEvent("OnDebugVehicleKey");
        }
        else if(event.keyCode == switchViewKey) {

        }
    };

    jcmp.CallEvent("scriptReady");
})();
