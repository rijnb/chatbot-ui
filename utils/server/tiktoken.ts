import {Tiktoken, TiktokenBPE} from "js-tiktoken/lite"

import {Message} from "@/types/chat"
import {OpenAILimitExceeded} from "@/utils/server/openAiClient"

export class TiktokenEncoder {
  private readonly encoding: Tiktoken

  private constructor(encoding: Tiktoken) {
    this.encoding = encoding
  }

  static async create(): Promise<TiktokenEncoder> {
    const cl100k_base = await import("js-tiktoken/ranks/cl100k_base")
    const encoding = new Tiktoken(cl100k_base.default)
    return new TiktokenEncoder(encoding)
  }

  static wrap(ranks: TiktokenBPE): TiktokenEncoder {
    const encoding = new Tiktoken(ranks)
    return new TiktokenEncoder(encoding)
  }

  /**
   * Returns the number of tokens in a conversation.
   * Simplified version from [OpenAI's cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb)
   */
  numberOfTokensInConversation(messages: Message[], modelId: string): number {
    const isModelGpt3 = modelId.startsWith("gpt-3") || modelId.includes("-gpt-3")
    const fixedTokensPerMessage = isModelGpt3
      ? 4 // every message follows <|im_start|>{role}\n{content}<|end|>\n - 4 tokens
      : 3 // every message follows <|im_start|>{role}<|im_sep|>{content}<|im_end|> - 3 tokens
    const fixedTokensPerReply = 3 // every reply is primed with <|im_start|>assistant<|im_sep|> - 3 tokens

    return messages
      .map(({role, content}) => {
        return fixedTokensPerMessage + this.encoding.encode(role).length + this.encoding.encode(content).length
      })
      .reduce((acc, cur) => acc + cur, fixedTokensPerReply)
  }

  numberOfTokensInString(content: string): number {
    return this.encoding.encode(content).length
  }

  /**
   * Prepares messages to send to OpenAI.
   * Drop messages starting from the second until the total number of tokens (prompt+reply) is below the model limit.
   * The user prompt (first message) and the last message (user intent) is always sent.
   * If it's not possible, error is thrown.
   */
  prepareMessagesToSend(
    inputTokenLimit: number,
    outputTokenLimit: number,
    prompt: string,
    messages: Message[],
    modelId: string
  ): Message[] {
    const [messagesToSend, requiredTokens] = this.reduceMessagesToSend(
      inputTokenLimit,
      outputTokenLimit,
      prompt,
      messages,
      modelId
    )

    if (requiredTokens > inputTokenLimit) {
      throw new OpenAILimitExceeded("Not enough tokens to send a message.", inputTokenLimit, requiredTokens)
    }

    return messagesToSend
  }

  /**
   * Reduces the number of messages to send in order to fit within the token limit.
   */
  private reduceMessagesToSend(
    inputTokenLimit: number,
    outputTokenLimit: number,
    prompt: string,
    messages: Message[],
    modelId: string
  ): [Message[], number] {
    const systemPrompt: Message = {role: "assistant", content: prompt}
    const messagesToSend: Message[] = messages.slice()
    const requiredTokens = () => {
      return this.numberOfTokensInConversation([systemPrompt, ...messagesToSend], modelId) + outputTokenLimit
    }

    console.log("requiredTokens", requiredTokens()) // !!TODO
    console.log("inputTokenLimit", inputTokenLimit) // !!TODO
    console.log("messagesToSend.length (before delete)", messagesToSend.length) // !!TODO
    while (messagesToSend.length > 1 && requiredTokens() > inputTokenLimit) {
      messagesToSend.splice(1, 1)
    }

    console.log("messagesToSend.length (after delete)", messagesToSend.length) // !!TODO
    return [messagesToSend, requiredTokens()]
  }
}
