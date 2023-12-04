import {OpenAIModelID} from "./openai"

export type Role = "system" | "assistant" | "user"

export interface Message {
  role: Role
  content: string
}

// This type is used to send a request to the API.
export interface ChatBody {
  apiKey: string
  messages: Message[]
  modelId: OpenAIModelID
  prompt: string
  temperature: number
  maxTokens: number
}

// This type is used to store a conversation in the store.
export interface Conversation {
  id: string
  name: string
  messages: Message[]
  tokenCount: number
  modelId: OpenAIModelID
  prompt: string
  temperature: number
  maxTokens: number
  folderId: string | undefined
  time: number
}
