const VersionSystem = (() => {

    async function getLocalVersion() {
        const response = await fetch("version.json");
        const data = await response.json();
        return data.version;
    }

    return {
        getLocalVersion
    };

})();
