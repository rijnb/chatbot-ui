import {PluginKey} from "@/types/plugin"
import {localStorageSafeGetItem, localStorageSafeRemoveItem, localStorageSafeSetItem} from "@/utils/app/storage"

export const STORAGE_KEY_PLUGIN_KEYS = "pluginKeys"

export const getPluginKeys = (): PluginKey[] => {
  const PluginKeyAsString = localStorageSafeGetItem(STORAGE_KEY_PLUGIN_KEYS)
  try {
    return PluginKeyAsString ? (JSON.parse(PluginKeyAsString) as PluginKey[]) : []
  } catch (error) {
    console.error(`Local storage error:${error}`)
    return []
  }
}

export const savePluginKeys = (pluginKeys: PluginKey[]) =>
  localStorageSafeSetItem(STORAGE_KEY_PLUGIN_KEYS, JSON.stringify(pluginKeys))

export const removePluginKeys = () => {
  localStorageSafeRemoveItem(STORAGE_KEY_PLUGIN_KEYS)
}
