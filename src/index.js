const { hex2string, string2hex } = require("./utilities");
const ArtController = require("./controller/artController");
const fetch = require("node-fetch");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

async function handle_advance(data) {
    console.log("Received advance request data " + JSON.stringify(data));
    const metadata = data.metadata;
    const sender = metadata.msg_sender;
    const payload = data.payload;

    let action = hex2string(payload);
    let response;

    if (action === "create_art") {
        response = JSON.stringify(await ArtController.createArtPiece({
            ...data.payload,
            creator: sender
        }));
    }

    const notice_req = await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });
    return "accept";
}

async function handle_inspect(data) {
    console.log("Received inspect request data " + JSON.stringify(data));
    const payload = data.payload;

    const route = hex2string(payload);

    let response;

    if (route === "list_art") {
        response = JSON.stringify(await ArtController.getAllArtPieces());
    } else if (route.startsWith("art/")) {
        response = JSON.stringify(await ArtController.getArtPieceById([route.substring(4)]));
    }

    const report_req = await fetch(rollup_server + "/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });
    return "accept";
}

var handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
};

(async () => {
    while (true) {
        const finish_req = await fetch(rollup_server + "/finish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "accept" }),
        });

        console.log("Received finish status " + finish_req.status);

        if (finish_req.status == 202) {
            console.log("No pending rollup request, trying again");
        } else {
            const rollup_req = await finish_req.json();
            const handler = handlers[rollup_req["request_type"]];
            await handler(rollup_req["data"]);
        }
    }
})();
