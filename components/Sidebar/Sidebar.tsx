import {IconFolderPlus, IconMistOff, IconPlus} from "@tabler/icons-react"
import {ReactNode} from "react"
import {useTranslation} from "react-i18next"
import {CloseSidebarButton, OpenSidebarButton} from "./components/OpenCloseSidebarButton"
import Search from "../Search"

interface Props<T> {
  isOpen: boolean
  addItemButtonTitle: string
  side: "left" | "right"
  items: T[]
  listItem: ReactNode
  folderListItem: ReactNode
  footerComponent?: ReactNode
  searchTerm: string
  handleSearchTerm: (searchTerm: string) => void
  toggleOpen: () => void
  handleCreateItem: () => void
  handleCreateFolder: () => void
  handleDrop: (e: any) => void
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  listItem,
  folderListItem,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop
}: Props<T>) => {
  const {t} = useTranslation("promptbar")

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: any) => {
    e.target.style.background = "#343541"
  }

  const handleDragLeave = (e: any) => {
    e.target.style.background = "none"
  }

  return isOpen ? (
    <div>
      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[260px] flex-none flex-col space-y-2 bg-gray-100 p-2 text-[14px] transition-all dark:bg-[#202123] sm:relative sm:top-0`}
      >
        <div className="flex items-center">
          <button
            className="text-sidebar flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-gray-300 p-3 text-gray-800 transition-colors duration-200 hover:bg-gray-200/10 dark:border-gray-600/20 dark:text-white dark:hover:bg-gray-700/10"
            onClick={() => {
              handleCreateItem()
              handleSearchTerm("")
            }}
          >
            <IconPlus size={16} />
            {addItemButtonTitle}
          </button>

          <button
            className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-3 text-sm text-gray-800 transition-colors duration-200 hover:bg-gray-200/10 dark:border-gray-600/20 dark:text-white dark:hover:bg-gray-700/10"
            onClick={handleCreateFolder}
          >
            <IconFolderPlus size={16} />
          </button>
        </div>
        <Search placeholder={t("Search...")} searchTerm={searchTerm} onSearch={handleSearchTerm} />

        <div className="flex-grow overflow-auto">
          {items?.length > 0 && (
            <div className="flex border-b border-gray-200 pb-2 dark:border-gray-600/20">{folderListItem}</div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              {listItem}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-black opacity-50 dark:text-white">
              <IconMistOff className="mx-auto mb-3" />
              <span className="text-[14px] leading-normal">{t("Empty.")}</span>
            </div>
          )}
        </div>
        {footerComponent}
      </div>

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  )
}

export default Sidebar
