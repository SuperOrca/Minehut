const viewButton = document.getElementById("view");
const input = document.getElementById("input");
const output = document.getElementById("output");

const api = "https://api.minehut.com/server/";

var out;

const view = async () => {
    viewButton.disabled = true;
    const servers = input.value
        .split("\n")
        .filter(
            (str) =>
                str.length >= 4 && str.length <= 12 && /^[a-zA-Z]+$/.test(str)
        );
    out = "";

    for (const server of servers) {
        try {
            await fetch(api + server + "?byName=true").then((res) => {
                if (!res.ok) updateOutput(server);
            });
        } catch (err) {
            addOutput(server);
        }
    }

    if (out.length === 0) {
        out = "All names are taken.";
    }

    viewButton.disabled = false;
};

function addOutput(server) {
    out += server + "\n";
    output.value = out;
    output.scrollTop = output.scrollHeight;
}
