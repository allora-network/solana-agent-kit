import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";
import { AlloraInferenceResponse } from "../../index";
import { PricePredictionTimeframe } from "@alloralabs/allora-sdk";
import { PricePredictionToken } from "@alloralabs/allora-sdk";

export class SolanaAlloraGetInference extends Tool {
  name = "solana_allora_get_inference";
  description = `Get the inference for a given token and timeframe from Allora's API
    Inputs:
    tokenSymbol: string, e.g., BTC for bitcoin
    timeframe: string, e.g., 5m for 5 minutes`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  async _call(input: string): Promise<string> {
    try {
      const { tokenSymbol, timeframe } = JSON.parse(input);

      const inference = await this.solanaKit.getInference(
        tokenSymbol as PricePredictionToken,
        timeframe as PricePredictionTimeframe,
      );

      const response: AlloraInferenceResponse = {
        status: "success",
        message: "Inference fetched successfully",
        tokenSymbol,
        timeframe,
        inference,
      };

      return JSON.stringify(response);
    } catch (error: any) {
      const response: AlloraInferenceResponse = {
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      };
      return JSON.stringify(response);
    }
  }
}
