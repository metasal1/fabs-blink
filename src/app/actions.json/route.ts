import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
    const payload: ActionsJson = {
        rules: [
            {
                pathPattern: "/burn/*",
                apiPath: "https://run.fabs.fun/burn/*"
            }, {
                pathPattern: "/burn",
                apiPath: "https://run.fabs.fun/burn"
            },
        ],
    };

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;