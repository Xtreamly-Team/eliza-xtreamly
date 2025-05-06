import { z } from 'zod';

export const openLoopTradingTemplate = `
Extract query parameters for making an API call:
- **amount** (number, required): A number greater than 0.
- **stopLoss** (number, required): A number between 0 and 100 (percentage).
- **risk** (boolean, required): Whether risk mode is enabled.

⚠️ All fields are required. If any is missing, ask the user to provide it. Do not make assumptions or guesses.

Provide the details in the following JSON format:
\`\`\`json
{
    "amount": <number>,
    "stopLoss": <number>,
    "risk": <boolean>
}
\`\`\`

Example:
\`\`\`json
{
    "amount": 1000,
    "stopLoss": 10,
    "risk": false
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}
`;

export interface OpenLoopTradingReq {
    amount: number;
    stopLoss: number;
    risk: boolean;
}

export const OpenLoopTradingSchema = z.object({
    amount: z.number().gt(0, { message: 'Amount must be greater than 0' }),
    stopLoss: z.number().min(0, { message: 'Stop loss must be at least 0%' }).max(100, { message: 'Stop loss cannot exceed 100%' }),
    risk: z.boolean({ required_error: 'Risk must be true or false' }),
});

export const isOpenLoopTrading = (
    obj: unknown
): obj is OpenLoopTradingReq => {
    const result = OpenLoopTradingSchema.safeParse(obj);
    if (!result.success) {
        const missingFields = result.error.errors.map((e) => e.message).join(', ');
        console.error('Missing or invalid fields:', missingFields);
    }
    return result.success;
};
