import { Action } from "../../types/action";
import { SolanaAgentKit } from "../../agent";
import { z } from "zod";
import { getInference } from "../../tools";

const getInferenceAction: Action = {
  name: "ALLORA_GET_INFERENCE",
  similes: [
    "get price prediction for SOL in 10m",
    "get price inference for SOL in 10m",
    "get price forecast for SOL in 10m",
    "get allora price prediction for SOL in 10m",
    "get allora price inference for SOL in 10m",
    "get allora price forecast for SOL in 10m",
  ],
  description:
    "Get the inference for a given token and timeframe from Allora's API",
  examples: [
    [
      {
        input: {
          tokenSymbol: "SOL",
          timeframe: "10m",
        },
        output: {
          status: "success",
          message: "Inference fetched successfully",
          inference: "The price of SOL is expected to be 100 in 10 minutes",
        },
        explanation:
          "Get the inference for SOL/USD price feed for the next 10 minutes",
      },
    ],
  ],
  schema: z.object({
    tokenSymbol: z
      .string()
      .min(1)
      .describe("The token symbol to get the inference for"),
    timeframe: z
      .string()
      .min(1)
      .describe("The timeframe to get the inference for"),
  }),
  handler: async (agent: SolanaAgentKit, input: any) => {
    try {
      const { tokenSymbol, timeframe } = input;

      const inference = await getInference(agent, tokenSymbol, timeframe);
      return {
        status: "success",
        message: "Inference fetched successfully",
        inference: `The price of ${tokenSymbol} is expected to be ${inference} in ${timeframe}`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to fetch inference from Allora: ${error.message}`,
      };
    }
  },
};

export default getInferenceAction;
