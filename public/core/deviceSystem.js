const DeviceSystem = (() => {

    const STORAGE_KEY = "domador_device";

    function gerarUUID() {
        return crypto.randomUUID();
    }

    function init() {
        let device = localStorage.getItem(STORAGE_KEY);

        if (!device) {
            const newDevice = {
                deviceID: gerarUUID(),
                createdAt: Date.now()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newDevice));
            console.log("Novo dispositivo registrado:", newDevice.deviceID);
            return newDevice;
        }

        return JSON.parse(device);
    }

    function getDevice() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    return {
        init,
        getDevice
    };

})();
