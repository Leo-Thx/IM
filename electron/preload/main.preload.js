const { VueElectron } = require("./../VueElectron");

Reflect.defineProperty(window, "VueElectron", {
	value: VueElectron
});
