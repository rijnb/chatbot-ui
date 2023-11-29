export enum OpenAIModelID {
  GPT_3_5 = "gpt-3.5-turbo",
  GPT_3_5_AZ = "gpt-35-turbo",
  GPT_3_5_AZ_16K = "gpt-35-turbo-16k",
  GPT_4 = "gpt-4",
  GPT_4_32K = "gpt-4-32k"
}

export interface OpenAIModel {
  id: OpenAIModelID
  name: string
  maxLength: number
  tokenLimit: number
}

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: OpenAIModelID.GPT_3_5,
    maxLength: 12000,
    tokenLimit: 4096
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: OpenAIModelID.GPT_3_5_AZ,
    maxLength: 12000,
    tokenLimit: 4096
  },
  [OpenAIModelID.GPT_3_5_AZ_16K]: {
    id: OpenAIModelID.GPT_3_5_AZ_16K,
    name: OpenAIModelID.GPT_3_5_AZ_16K,
    maxLength: 12000,
    tokenLimit: 16384
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: OpenAIModelID.GPT_4,
    maxLength: 24000,
    tokenLimit: 8192
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: OpenAIModelID.GPT_4_32K,
    maxLength: 96000,
    tokenLimit: 32768
  }
}

// In case the `OPENAI_DEFAULT_MODEL` environment variable is not set or set to an unsupported model.
export const FALLBACK_OPENAI_MODEL_ID = OpenAIModelID.GPT_4_32K
