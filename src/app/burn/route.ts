import {
    ActionPostResponse,
    ACTIONS_CORS_HEADERS,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
} from "@solana/actions";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import {
    DEFAULT_SOL_ADDRESS,
    DEFAULT_SPL_AMOUNT,
    SOLANA_MAINNET_USDC_PUBKEY,
} from "./const";

export const GET = async (req: Request) => {
    try {
        const requestUrl = new URL(req.url);
        const { toPubkey } = validatedQueryParams(requestUrl);

        const baseHref = new URL(
            `/burn?amount=`,
            requestUrl.origin,
        ).toString();

        const payload: ActionGetResponse = {
            title: "FABS.fun",
            icon: new URL("/fabs-burn.png", requestUrl.origin).toString(),
            description: "If you ❤️ something, let it 🔥",
            label: "Burn", // this value will be ignored since `links.actions` exists
            links: {
                actions: [
                    {
                        label: "Burn 1 FAB", // button text
                        href: `${baseHref}${"1"}`,
                    },
                    {
                        label: "Burn 69 FABS", // button text
                        href: `${baseHref}${"69"}`,
                    },
                    {
                        label: "Burn 420 FABS", // button text
                        href: `${baseHref}${"420"}`,
                    },
                    {
                        label: "Burn FABS", // button text
                        href: `${baseHref}{amount}`, // this href will have a text input
                        parameters: [
                            {
                                name: "amount", // parameter name in the `href` above
                                label: "How many FABS to 🔥 burn?", // placeholder of the text input
                                required: true,
                            },
                        ],
                    },
                ],
            },
        };

        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (err) {
        console.log(err);
        let message = "An unknown error occurred";
        if (typeof err == "string") message = err;
        return new Response(message, {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
        });
    }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export const POST = async (req: Request) => {
    try {
        const requestUrl = new URL(req.url);
        const { amount, toPubkey } = validatedQueryParams(requestUrl);

        const body: ActionPostRequest = await req.json();

        // validate the client provided input
        let account: PublicKey;
        try {
            account = new PublicKey(body.account);
        } catch (err) {
            return new Response('Invalid "account" provided', {
                status: 400,
                headers: ACTIONS_CORS_HEADERS,
            });
        }

        const connection = new Connection(
            process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
        );
        const decimals = 5; // In the example, we use 6 decimals for USDC, but you can use any SPL token and change this value
        const mintAddress = new PublicKey(SOLANA_MAINNET_USDC_PUBKEY); // replace this with any SPL token mint address

        // converting value to fractional units

        let transferAmount: any = parseFloat(amount.toString());
        transferAmount = transferAmount.toFixed(decimals);
        transferAmount = transferAmount * Math.pow(10, decimals);

        const fromTokenAccount = await splToken.getAssociatedTokenAddress(
            mintAddress,
            account,
            false,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        // let toTokenAccount = await splToken.getAssociatedTokenAddress(
        //     mintAddress,
        //     toPubkey,
        //     true,
        //     splToken.TOKEN_PROGRAM_ID,
        //     splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        // );

        // const ifexists = await connection.getAccountInfo(toTokenAccount);

        let instructions = [];

        // if (!ifexists || !ifexists.data) {
        //     let createATAiX = splToken.createAssociatedTokenAccountInstruction(
        //         account,
        //         toTokenAccount,
        //         toPubkey,
        //         mintAddress,
        //         splToken.TOKEN_PROGRAM_ID,
        //         splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        //     );
        //     instructions.push(createATAiX);
        // }

        // let transferInstruction = splToken.createTransferInstruction(
        //     fromTokenAccount,
        //     toTokenAccount,
        //     account,
        //     transferAmount,
        // );
        // instructions.push(transferInstruction);

        let burnInstruction = splToken.createBurnInstruction(
            fromTokenAccount,
            mintAddress,
            account,
            transferAmount,
        );
        instructions.push(burnInstruction);

        const transaction = new Transaction();
        transaction.feePayer = account;

        transaction.add(...instructions);

        // set the end user as the fee payer
        transaction.feePayer = account;

        transaction.recentBlockhash = (
            await connection.getLatestBlockhash()
        ).blockhash;

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Burn ${amount} FABS`,
            },
            // note: no additional signers are needed
            // signers: [],
        });

        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (err) {
        console.log(err);
        let message = "An unknown error occurred";
        if (typeof err == "string") message = err;
        return new Response(message, {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
        });
    }
};

function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
    let amount: number = DEFAULT_SPL_AMOUNT;

    try {
        if (requestUrl.searchParams.get("to")) {
            toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
        }
    } catch (err) {
        throw "Invalid input query parameter: to";
    }

    try {
        if (requestUrl.searchParams.get("amount")) {
            amount = parseFloat(requestUrl.searchParams.get("amount")!);
        }

        if (amount <= 0) throw "amount is too small";
    } catch (err) {
        throw "Invalid input query parameter: amount";
    }

    return {
        amount,
        toPubkey,
    };
}