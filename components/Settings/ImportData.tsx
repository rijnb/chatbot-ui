import {IconFileImport} from "@tabler/icons-react"
import {FC, useState} from "react"

import {isValidFile} from "@/utils/app/import"

import {SupportedExportFormats} from "@/types/export"

import {SidebarButton} from "../Sidebar/SidebarButton"


interface Props {
  id: string
  text: string
  onImport: (data: SupportedExportFormats) => void
}

export const ImportData: FC<Props> = ({id, text, onImport}) => {
  const [errors, setErrors] = useState<string[]>([])
  return (
    <>
      <input
        id={`import-${id}`}
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        multiple
        onChange={(e) => {
          console.info(`Importing file ${e.target.files?.length} files`)
          if (!e.target.files?.length) {
            return
          }

          Array.from(e.target.files).forEach((file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              try {
                let json = JSON.parse(e.target?.result as string)
                const validationResult = isValidFile(json)
                if (validationResult.length === 0) {
                  onImport(json)
                  setErrors([])
                } else {
                  setErrors(validationResult)
                }
              } catch (error) {
                setErrors(["Invalid JSON file"])
              }
            }
            reader.readAsText(file)
          })

          // Change the value of the input to make sure onChange fires next time.
          e.target.value = ""
        }}
      />

      <SidebarButton
        text={text}
        icon={<IconFileImport size={18} />}
        onClick={() => {
          const importFile = document.querySelector(`#import-${id}`) as HTMLInputElement
          if (importFile) {
            importFile.click()
          }
        }}
      />
      {errors.length > 0 && (
        <div className="error-messages">
          Errors in JSON file, not imported:
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </>
  )
}