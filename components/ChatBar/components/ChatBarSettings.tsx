import {IconFileExport} from "@tabler/icons-react"
import {useTranslation} from "next-i18next"
import React, {useContext} from "react"

import ChatBarContext from "@/components/ChatBar/ChatBar.context"
import ClearConversations from "@/components/ChatBar/components/ClearConversations"
import {ToolConfiguration} from "@/components/ChatBar/components/Tools/ToolConfiguration"
import useConversationsOperations from "@/components/Conversation/useConversationsOperations"
import ApiKey from "@/components/Settings/ApiKey"
import ImportData from "@/components/Settings/ImportData"
import SidebarButton from "@/components/Sidebar/SidebarButton"
import {UnlockCodeEditor, useUnlock} from "@/components/UnlockCode"
import {useHomeContext} from "@/pages/api/home/home.context"

export const ChatBarSettings = () => {
  const {t} = useTranslation("common")

  const {isProtected, code, setCode} = useUnlock()

  const {
    state: {apiKey, serverSideApiKeyIsSet, tools}
  } = useHomeContext()

  const {handleApiKeyChange, handleToolConfigurationChange, handleClearToolConfiguration} = useContext(ChatBarContext)

  const {conversations, clearConversations, importConversations, exportConversations} = useConversationsOperations()

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? <ClearConversations onClearConversations={clearConversations} /> : null}

      <ImportData id="conversations" text={t("Import conversations")} onImport={importConversations} />
      {conversations.length > 0 ? (
        <SidebarButton
          text={t("Export conversations")}
          icon={<IconFileExport size={18} />}
          onClick={exportConversations}
        />
      ) : null}
      {!serverSideApiKeyIsSet ? <ApiKey apiKey={apiKey} onApiKeyChange={handleApiKeyChange} /> : null}
      {tools
        .filter((t) => !t.hasServerConfiguration)
        .map((t) => (
          <ToolConfiguration
            key={t.id}
            tool={t}
            onConfigurationChange={(c) => handleToolConfigurationChange(t.id, c)}
            onClearConfiguration={() => handleClearToolConfiguration(t.id)}
          />
        ))}
      {isProtected ? <UnlockCodeEditor unlockCode={code} onUnlockCodeChange={setCode} /> : null}
    </div>
  )
}

export default ChatBarSettings
