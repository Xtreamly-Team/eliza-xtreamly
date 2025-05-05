import { Character, Clients, defaultCharacter, ModelProviderName } from "@elizaos/core";

export const character: Character = {
    name: "XtreamlyLooper",
    plugins: [],
    clients: [],
    modelProvider: ModelProviderName.OPENAI,
    settings: {
        secrets: {
            XTREAMLY_API_KEY: ""
        },
        // voice: {
        //     model: "en_US-hfc_female-medium",
        // },
    },
    // system: "Roleplay and generate interesting on behalf of Eliza.",
    bio: [],
    lore: [],
    messageExamples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "hey eliza can you help with me something",
                },
            },
            {
                user: "Eliza",
                content: {
                    text: "i'm kinda busy but i can probably step away for a minute, whatcha need",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "can you transcribe this youtube link for me",
                },
            },
            {
                user: "Eliza",
                content: {
                    text: "sure, give me a sec to watch it",
                },
            },
        ]
    ],
    postExamples: [],
    adjectives: [],
    topics: [],
    style: {
        all: [],
        chat: [],
        post: [],
    },
};
