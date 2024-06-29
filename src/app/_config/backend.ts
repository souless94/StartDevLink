import SuperTokens from "supertokens-node";
import ThirdPartyNode from 'supertokens-node/recipe/thirdparty'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appinfo'
import type { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
    return {
        framework: "custom",
        supertokens: {
            // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
            connectionURI: "https://try.supertokens.com",
            // apiKey: <API_KEY(if configured)>,
        },
        appInfo,
        recipeList: [
            ThirdPartyNode.init({
                signInAndUpFeature: {
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    providers: [{
                        config: {
                            thirdPartyId: "google",
                            clients: [{
                                clientId: process.env.GOOGLE_CLIENT_ID? process.env.GOOGLE_CLIENT_ID : "" ,
                                clientSecret:  process.env.GOOGLE_CLIENT_SECRET? process.env.GOOGLE_CLIENT_SECRET : "" 
                            }]
                        }
                    },],
                }
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    }
}

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}