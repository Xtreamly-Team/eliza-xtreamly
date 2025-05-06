import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    elizaLogger,
    ModelClass,
    composeContext,
    generateObject,
} from '@elizaos/core';
import { XtreamlyAPI, VolatilityAPI } from '@xtreamlyio/sdk';
import {
    openLoopTradingTemplate,
    OpenLoopTradingSchema,
    isOpenLoopTrading
} from './templates/openLoopTradingTemplate.ts';


export const openLoopTrading: Action = {
    name: 'OPEN_LOOP_TRADING',
    similes: ['OPEN_LOOP_TRADING'],
    description: 'Opens a new loop trading strategy.',

    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        elizaLogger.log('Validating runtime for OPEN_LOOP_TRADING...');
        return true;
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State,
        _options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        try {
            elizaLogger.log('Composing state for message:', message);
            let currentState = state;
            if (!currentState) {
                currentState = (await runtime.composeState(message)) as State;
            } else {
                currentState = await runtime.updateRecentMessageState(currentState);
            }

            const context = composeContext({
                state: currentState,
                template: openLoopTradingTemplate,
            });

            const queryParams = await generateObject({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
                schema: OpenLoopTradingSchema,
            });

            if (!isOpenLoopTrading(queryParams.object)) {
                callback(
                    {
                        text: 'Invalid query params. Please check the inputs.',
                    },
                    []
                );
                return;
            }

            const {
                amount,
                stopLoss,
                risk
            } = queryParams.object;

            elizaLogger.log(`Opening a loop trading strategy for: amount ${amount} stopLoss ${stopLoss} high risk ${risk}` );
            // const prediction = await new VolatilityAPI().state(symbol);
            
            callback({
                text: `Opened a loop trading strategy for: $${amount} | stopLoss ${stopLoss}% | ${risk ? 'high' : 'low'} risk`,
            });
        } catch (error) {
            elizaLogger.error('Error in retrieveVolatilityState:', error.message);
            callback({
                text: '❌ An error occurred while opening your loop trading position. Please try again later.',
            });
        }
    },
    examples: [
        [
            {
                user: 'user',
                content: {
                    text: 'Open my loop trading position for $1000, with stop loss 14 and be risky.',
                    action: 'OPEN_LOOP_TRADING',
                },
            },
            {
                user: 'assistant',
                content: {
                    text: 'Opened a loop trading strategy for: amount $1000 | stopLoss 14% | high risk true',
                },
            },
        ],
    ],
};