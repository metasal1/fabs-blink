import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
    const payload: ActionsJson = {
        rules: [
            // map all root level routes to an action
            {
                pathPattern: "/*",
                apiPath: "https://run.fabs.fun/api/burn/*",
            },
            // idempotent rule as the fallback
            {
                pathPattern: "/**",
                apiPath: "https://run.fabs.fun/api/burn"
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