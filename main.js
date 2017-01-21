"use strict";

const cfg = require("./config.json");

//>> Init settings
//openWindowKey         = get the key id on http://keycode.info/
//trimDecimals          = defines how much digits the floats have

const openWindowKey = typeof cfg.openWindowKeyID !== "undefined" ? cfg.openWindowKeyID : 117;
const trimDecimals = typeof cfg.trimDecimals !== "undefined" ? cfg.trimDecimals : 4;

jcmp.events.AddRemoteCallable("getDebugInfo", (player) => {
    let veh = player.vehicle;
    if (typeof veh !== "undefined") {
        jcmp.events.CallRemote("sendDebugInfo", player, JSON.stringify({
            inVehicle: true,
            vehicle: {
                main: {
                    driver: veh.driver.name,
                    modelHash: veh.modelHash,
                    dimension: veh.dimension,
                    networkId: veh.networkId
                },
                position: {
                    pos: {x: digits(veh.position.x), y: digits(veh.position.y), z: digits(veh.position.z)},
                    aimpos: {x: digits(veh.aimPosition.x), y: digits(veh.aimPosition.y), z: digits(veh.aimPosition.z)},
                    rotation: {x: digits(veh.rotation.x), y: digits(veh.rotation.y), z: digits(veh.rotation.z)}
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
            }
        }));
    } else {
        jcmp.events.CallRemote("sendDebugInfo", player, JSON.stringify({
            inVehicle: false,
            player: {
                main: {
                    model: player.model,
                    ping: player.client.ping + " ms",
                    dimension: player.dimension,
                    health: player.health,
                    invulnerable: player.invulnerable,
                    networkId: player.networkId
                },
                position: {
                    pos: {x: digits(player.position.x), y: digits(player.position.y), z: digits(player.position.z)},
                    aimpos: {x: digits(player.aimPosition.x), y: digits(player.aimPosition.y), z: digits(player.aimPosition.z)},
                    rotation: {x: digits(player.rotation.x), y: digits(player.rotation.y), z: digits(player.rotation.z)},
                    respawn: {x: digits(player.respawnPosition.x), y: digits(player.respawnPosition.y), z: digits(player.respawnPosition.z)}
                },
                remoteClient: {
                    ip: player.client.ipAddress,
                    steamId: player.client.steamId,
                    steamAuth: player.client.steamAuthenticated
                }
            }
        }));
        console.log(player.weapons);
    }
});

//Returns the debug-vehicle key to the client
jcmp.events.AddRemoteCallable("getSettings", (player) => {
    jcmp.events.CallRemote("sendSettings", player, openWindowKey);
});

function digits(input) {
    return input.toFixed(trimDecimals);
}
