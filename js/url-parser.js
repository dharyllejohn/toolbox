const input = document.getElementById("urlInput");
const output = document.getElementById("output");

document.getElementById("parseBtn").onclick = () => {

    try {

        const url = new URL(input.value);

        output.value =
`Protocol : ${url.protocol}
Host     : ${url.host}
Hostname : ${url.hostname}
Port     : ${url.port || "(default)"}
Pathname : ${url.pathname}
Query    : ${url.search}
Hash     : ${url.hash}
Origin   : ${url.origin}`;

    } catch {

        output.value = "Invalid URL";

    }

};