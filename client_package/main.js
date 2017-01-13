const ui = new WebUIWindow("vehicle-debugger", "package://vehicle-debugger/ui/index.html", new Vector2(420, 300));
ui.position = new Vector2(1475, 550);
ui.hidden = true;
ui.captureMouseInput = false;

jcmp.ui.AddEvent("OnDebugVehicleKey", () => {
    ui.hidden = !ui.hidden;
});

//Sends server request if the client script is ready
jcmp.ui.AddEvent("scriptReady", () => {
    jcmp.events.CallRemote("getSettings");
});

//Catches server response and applys settings to the client script
jcmp.events.AddRemoteCallable("sendSettings", settings => {
    jcmp.ui.CallEvent("applySettings", settings);
});

//Sends server request if the client needs updated data
jcmp.ui.AddEvent("requestVehicleDebugInfo", () => {
    if(!ui.hidden) {
        jcmp.events.CallRemote("getVehicleDebugInfo");
    }
});

//Catches server response and applys the vehicle data to the client script
jcmp.events.AddRemoteCallable("sendVehicleDebugInfo", obj => {
    jcmp.ui.CallEvent("applyVehicleDebugInfo", obj);
});
