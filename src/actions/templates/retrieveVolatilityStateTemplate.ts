import { z } from 'zod';

export const retrieveVolatilityStateTemplate = `
Extract query parameters for making an API call:
- **symbol** (string, required): The symbol of the token.

Supported symbols:
- ETH
- BTC

Provide the details in the following JSON format:
\`\`\`json
{
    "symbol": "<string>",
}
\`\`\`

Example for fetching volatility for Ethereum:
\`\`\`json
{
    "symbol": "ETH",
}
\`\`\`

Example for fetching volatility for Bitcoin:
\`\`\`json
{
    "symbol": "BTC",
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}
`;

export interface RetrieveVolatilityPredictionReq {
    symbol?: string;
}

export const RetrieveVolatilityPredictionSchema = z.object({
    symbol: z.string(),
});

export const isRetrieveVolatilityPrediction = (
    obj: unknown
): obj is RetrieveVolatilityPredictionReq => {
    return RetrieveVolatilityPredictionSchema.safeParse(obj).success;
};
