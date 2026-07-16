const input = document.getElementById("xmlInput");
const output = document.getElementById("xmlOutput");

document.getElementById("formatBtn").onclick = () => {

    try {

        const parser = new DOMParser();
        const xml = parser.parseFromString(input.value, "application/xml");

        if (xml.getElementsByTagName("parsererror").length) {
            output.value = "Invalid XML";
            return;
        }

        const serializer = new XMLSerializer();
        output.value = serializer.serializeToString(xml);

    } catch {

        output.value = "Invalid XML";

    }

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};