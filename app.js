const viewButton = document.getElementById("view");
const input = document.getElementById("input");
const output = document.getElementById("output");

const api = "https://api.minehut.com/server/";

const view = async () => {
    viewButton.disabled = true;
    const servers = input.value
        .split("\n")
        .filter((str) => str.length >= 4 && str.length <= 12);
    let out = "";

    for (const server of servers) {
        try {
            await fetch(api + server + "?byName=true").then((res) => {
                if (!res.ok) {
                    out += server + "\n";
                    output.value = out;
                }
            });
        } catch (err) {
            out += server + "\n";
            output.value = out;
        }
    }

    if (out.length === 0) {
        out = "All names are taken.";
    }

    viewButton.disabled = false;
};
