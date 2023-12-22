import {v4 as uuidv4} from "uuid"

import {FolderInterface, FolderType} from "@/types/folder"
import {localStorageSafeGetItem, localStorageSafeRemoveItem, localStorageSafeSetItem} from "@/utils/app/storage"

export const STORAGE_KEY_FOLDERS = "folders"

export const createNewFolder = (name: string, type: FolderType): FolderInterface => {
  return {id: uuidv4(), name, type, factory: undefined}
}

export const getFolders = (): FolderInterface[] => {
  const foldersAsString = localStorageSafeGetItem(STORAGE_KEY_FOLDERS)
  try {
    return foldersAsString ? (JSON.parse(foldersAsString) as FolderInterface[]) : []
  } catch (error) {
    console.error(`Local storage error:${error}`)
    return []
  }
}

export const saveFolders = (folders: FolderInterface[]) => {
  localStorageSafeSetItem(STORAGE_KEY_FOLDERS, JSON.stringify(folders))
}

export const removeFolders = () => localStorageSafeRemoveItem(STORAGE_KEY_FOLDERS)
