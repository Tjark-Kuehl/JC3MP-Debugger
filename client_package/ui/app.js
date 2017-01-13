new Vue({
    el: '#app',
    data: {
		inVehicle: false,
		main: {
			driver: "none",
			modelHash: "#ffffff",
			dimension: 0,
			networkId: 0
		},
		position: {
			pos: {x: 1000.1234, y: 1000.1234, z: 1000.1234},
			aimpos: {x: 1000.1234, y: 1000.1234, z: 1000.1234},
			rot: {x: 1000.1234, y: 1000.1234, z: 1000.1234}
		},
		velocity: {
			linear: {x: 1000.1234, y: 1000.1234, z: 1000.1234},
			angular: {x: 1000.1234, y: 1000.1234, z: 1000.1234}
		},
		misc: {
			health: 1000,
			primaryColor: 0,
			destroyed: false,
			nitro: false,
			turbojump: false
		}
	},
    mounted: function() {
        jcmp.AddEvent("applyVehicleDebugInfo", obj => {
            var data = JSON.parse(obj);
            this.$data.inVehicle = data.inVehicle;
            this.$data.main = data.main;
            this.$data.position = data.position;
            this.$data.velocity = data.velocity;
            this.$data.misc = data.misc;
        });

        setInterval(() => {
            jcmp.CallEvent("requestVehicleDebugInfo");
        }, 1000);
    }
});

(function () {
    var keyID = 0;

    //Sets the new settings
    jcmp.AddEvent("applySettings", settings => {
        keyID = settings;
    });

    document.onkeydown = (event) => {
        if (event.keyCode == keyID) {
            jcmp.CallEvent("OnDebugVehicleKey");
        }
    };

    jcmp.CallEvent("scriptReady");
})();
