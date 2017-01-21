new Vue({
    el: '#app',
    data: {
        inVehicle: false,
        vehicle: {
            main: {
    			driver: "none",
    			modelHash: 0,
    			dimension: 0,
    			networkId: 0
    		},
    		position: {
    			pos: {x: 0, y: 0, z: 0},
    			aimpos: {x: 0, y: 0, z: 0},
    			rotation: {x: 0, y: 0, z: 0}
    		},
    		velocity: {
    			linear: {x: 0, y: 0, z: 0},
    			angular: {x: 0, y: 0, z: 0}
    		},
    		misc: {
    			health: 0,
    			primaryColor: 0,
    			destroyed: false,
    			nitro: false,
    			turbojump: false
    		}
        },
        player: {
            main: {
                model: 0,
                ping: 0,
                dimension: 0,
                health: 0,
                invulnerable: false,
                networkId: 0
            },
            position: {
                pos: {x: 0, y: 0, z: 0},
                aimpos: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                respawn: {x: 0, y: 0, z: 0}
            },
            remoteClient: {
                ip: "0.0.0.0",
                steamId: 00000000000000000,
                steamAuth: false
            }
        }
	},
    methods: {
        shown: function(name) {
            if(name == 'player' && !this.inVehicle) return true;
            else if(name == 'vehicle' && this.inVehicle) return true;
            return false;
        },
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
        jcmp.AddEvent("applyDebugInfo", (obj) => {
            var d = JSON.parse(obj);

            this.$data.inVehicle = d.inVehicle;
            if(d.inVehicle) {
                this.$data.vehicle = d.vehicle;
            } else {
                this.$data.player = d.player;
            }
        });

        setInterval(() => {
            jcmp.CallEvent("requestDebugInfo");
        }, 1000);
    }
});

(function () {
    var openWindowKey = 0;

    //Sets the new settings
    jcmp.AddEvent("applySettings", (settings) => {
        openWindowKey = settings;
    });

    document.onkeydown = (event) => {
        if (event.keyCode == openWindowKey) {
            jcmp.CallEvent("OnDebugKey");
        }
    };

    jcmp.CallEvent("scriptReady");
})();
