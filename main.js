"use strict";

const cfg = require("./config.json");

//>> Init settings
//debugVehicleKey       = get the key id on http://keycode.info/
//switchViewKey         = key for switching between vehile and player
//trimDecimals          = defines how much digits the floats have

let debugVehicleKey = typeof cfg.debugVehicleKeyID !== "undefined" ? cfg.debugVehicleKeyID : 117;
let switchViewKey = typeof cfg.switchViewKeyID !== "undefined" ? cfg.switchViewKeyID : 118;
let trimDecimals = typeof cfg.trimDecimals !== "undefined" ? cfg.trimDecimals : 4;

jcmp.events.AddRemoteCallable("getVehicleDebugInfo", (player) => {
    let veh = player.vehicle;
    if (typeof veh !== "undefined") {
        jcmp.events.CallRemote("sendVehicleDebugInfo", player, JSON.stringify({
            inVehicle: true,
            line1: {
                lineName: "Main",
                driver: veh.driver.name,
                modelHash: veh.modelHash,
                dimension: veh.dimension,
                networkId: veh.networkId
            },
            line2: {
                lineName: "Position",
                pos: {x: digits(veh.position.x), y: digits(veh.position.y), z: digits(veh.position.z)},
                aimpos: {x: digits(veh.aimPosition.x), y: digits(veh.aimPosition.y), z: digits(veh.aimPosition.z)},
                rot: {x: digits(veh.rotation.x), y: digits(veh.rotation.y), z: digits(veh.rotation.z)}
            },
            line3: {
                lineName: "Velocity",
                linear: {x: digits(veh.linearVelocity.x), y: digits(veh.linearVelocity.y), z: digits(veh.linearVelocity.z)},
                angular: {x: digits(veh.angularVelocity.x), y: digits(veh.angularVelocity.y), z: digits(veh.angularVelocity.z)}
            },
            line4: {
                lineName: "Misc",
                health: veh.health,
                primaryColor: veh.primaryColor,
                destroyed: veh.destroyed,
                nitro: veh.nitroEnabled,
                turbojump: veh.turboJumpEnabled
            }
        }));
    }
    else {
        jcmp.events.CallRemote("sendVehicleDebugInfo", player, JSON.stringify({inVehicle: false}));
    }
});

//Returns the debug-vehicle key to the client
jcmp.events.AddRemoteCallable("getSettings", player => {
    jcmp.events.CallRemote("sendSettings", player, JSON.stringify({
        debugVehicleKey: debugVehicleKey,
        switchViewKey: switchViewKey
    }));
});

function digits(input) {
    return input.toFixed(trimDecimals);
}
