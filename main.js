"use strict";

const cfg = require("./config.json");

//>> Init settings
//debugVehicleKeyID     = get the key id on http://keycode.info/
//trimDecimals          = defines how much digits the floats have

let debugVehicleKey = typeof cfg.debugVehicleKeyID !== "undefined" ? cfg.debugVehicleKeyID : 116;
let trimDecimals = typeof cfg.trimDecimals !== "undefined" ? cfg.trimDecimals : 4;

jcmp.events.AddRemoteCallable("getVehicleDebugInfo", (player) => {
    let veh = player.vehicle;
    if (typeof veh !== "undefined") {
        jcmp.events.CallRemote("sendVehicleDebugInfo", player, JSON.stringify({
            inVehicle: true,
            main: {
                driver: veh.driver.name,
                modelHash: veh.modelHash,
                dimension: veh.dimension,
                networkId: veh.networkId
            },
            position: {
                pos: {x: digits(veh.position.x), y: digits(veh.position.y), z: digits(veh.position.z)},
                aimpos: {x: digits(veh.aimPosition.x), y: digits(veh.aimPosition.y), z: digits(veh.aimPosition.z)},
                rot: {x: digits(veh.rotation.x), y: digits(veh.rotation.y), z: digits(veh.rotation.z)}
            },
            velocity: {
                linear: {x: digits(veh.linearVelocity.x), y: digits(veh.linearVelocity.y), z: digits(veh.linearVelocity.z)},
                angular: {x: digits(veh.angularVelocity.x), y: digits(veh.angularVelocity.y), z: digits(veh.angularVelocity.z)}
            },
            misc: {
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
    jcmp.events.CallRemote("sendSettings", player, debugVehicleKey);
});

function digits(input) {
    return input.toFixed(trimDecimals);
}
