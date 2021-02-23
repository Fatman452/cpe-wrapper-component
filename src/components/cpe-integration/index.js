import React, { FC, useEffect, useState } from "react"
import CPE, { ServiceManager } from "cross-platform-editor"
import "./cpe-integration.scss"
import { MockWebpackDocumentClient } from "./api/MockWebpackDocumentClient"
import { EmailCustomerAccountService } from "./api/EmailCustomerAccountService"
import { AccountService } from "./api/AccountService"
import { VimeoService } from "./api/VimeoService"
import { CommonDataService } from "./api/CommonDataService"
import { MockSettingsService } from "./api/MockSettingsService"
import { ContactsService } from "./api/ContactsService"
import { MockMyLibraryService } from "./api/MockMyLibraryService"
import { ShoppableProductService } from "./api/ShoppableProductService"
import { ActionblockPltService } from "./api/ActionblockPltService"
import { ShoppingcartService } from "./api/ShoppingcartService"
import { WebExtractService } from "./api/WebExtractService"
import { mockDistUI } from "./mockDistUI"
// import { getQueryStringValue } from "../../util"
//mock dist UI
mockDistUI()

const services = {
  contacts: ContactsService,
  emailCustomerAccount: EmailCustomerAccountService,
  library: MockMyLibraryService,
  shoppableProducts: ShoppableProductService,
  actionblockPlt: ActionblockPltService,
  shoppingcartSvc: ShoppingcartService,
  account: AccountService,
  settings: MockSettingsService,
  webExtract: WebExtractService,
  vimeo: VimeoService,
  commonData: CommonDataService,
}

const CpeIntegration = ({ documentId, accountId, applicationId }) => {
  const [cpeComponent, setCpeComponent] = useState("")
  const [cursorStyle, setCursorStyle] = useState("pointer")

  useEffect(() => {

    const documentService = new MockWebpackDocumentClient(accountId, applicationId)
    ServiceManager.registerService("document", documentService)
    ServiceManager.registerService("emailCustomerAccount", new EmailCustomerAccountService())
    ServiceManager.registerService("account", new AccountService())
    ServiceManager.registerService("commonData", new CommonDataService())
    ServiceManager.registerService("vimeo", new VimeoService())

    const cpeInstance = new CPE({
      el: ".editor-document",
      paletteEl: ".editor-palette",
      accountId: accountId,
      documentId: documentId,
      config: {},
      autoSave: true,
      services,
      console: {
        success: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        log: console.log,
      },
      editorData: {
        builderTokenPresent: true,
      },
      consumerEditorConfig: {
        layout: {
          dynamicContent: {
            enabled: true,
            allowed: true,
          },
        },
      },
      paletteEditorConfig: {
        poll: {
          shouldShowBlock: true,
        },
        rsvp: {
          shouldShowBlock: true,
          allowed: true,
        },
      },
      plugins: {
        whatsNew: {
          enabled: false,
        },
      },
    })

    window.addEventListener("onGetDocument", event => {
      if (cpeInstance) {
        cpeInstance.config.documentId = event.detail.metadata.document_id
        setCpeComponent(cpeInstance)
      }
    })
    cpeInstance.eventChannel.on("document-auto-save", async () => {
      console.log("save", await cpeInstance.saveDocument())
    })
    cpeInstance.start().then()
    setCpeComponent(cpeInstance)
  }, [])

  const continueButton = () => {
    cpeComponent.saveDocument()
  }

  const saveButton = () => {
    setCursorStyle("wait")
    cpeComponent.saveDocument().then(_ => {
      setCursorStyle("pointer")
    })
  }
  return (
    <div>
      <div className="editor">
        <div className="editor-header">
          <section className="fed-wrapper">
            <header className="CommonHeader CommonHeader--editable u-bgWhite">
              <div className="CommonHeader-column CommonHeader-column--title">
                <div className="CommonHeader-column Form CommonHeader-column--title">
                  <div className="Form-inputGroup CommonHeader-title">
                    {/*<input
                      type="text"
                      className="Form-input"
                      value={documentName}
                      onChange={(e) => {setDocumentName(e.target.value)}}
                    />*/}
                    <span className="Form-inputAddOn u-valignMiddle">
                      {/*<label>
                        <i className="Icon Icon--pencil"></i>
                      </label>*/}
                    </span>
                  </div>
                </div>
              </div>
              {/*
               <div className="CommonHeader-column u-paddingFlush">
                <div className="ButtonGroup">
                  <button type="button" className="Button Button--mini controls">
                    Controls
                  </button>
                  <button type="button" className="Button Button--mini redraw">
                    Reload Document
                  </button>
                  <button type="button" className="Button Button--mini Button--hoverWarn delete">
                    Delete Document
                  </button>
                </div>
              </div> */}
              <div className="CommonHeader-column u-paddingFlush">
                <span className="editor-status-region">
                  <span className="CommonHeader-action u-marginRight save-status"></span>
                </span>
                <span className="u-marginRightHalf">
                  <button
                    className="Button Button--link"
                    id="save-button"
                    type="button"
                    title="Save your edits"
                    onClick={saveButton}
                    style={{ cursor: cursorStyle }}
                  // disabled
                  >
                    <i className="Icon--disk"></i>
                    <span>Save</span>
                  </button>
                </span>
                {/* <span className="undo-redo-controls">
                  <span className="u-marginRightHalf">
                    <button
                      className="Button Button--link"
                      id="undo"
                      type="button"
                      title="Undo last action"
                      disabled
                    >
                      <i className="Icon--undo"></i>
                      <span className="b2-u-showInlineBlock" aria-hidden="true">
                        Undo
                      </span>
                    </button>
                  </span>
                  <span className="u-marginRightHalf">
                    <button
                      className="Button Button--link"
                      id="redo"
                      type="button"
                      title="Redo last undo action"
                      disabled
                    >
                      <i className="Icon--redo"></i>
                      <span className="b2-u-showInlineBlock" aria-hidden="true">
                        Redo
                      </span>
                    </button>
                  </span>
                </span>
                <span className="u-marginRightHalf">
                  <button
                    className="Button"
                    id="test"
                    type="button"
                    title="Preview and send a test email"
                  >
                    Preview
                  </button>
                </span>
                 */}
                <span className="u-marginRightFlush">
                  <button
                    className="Button Button--primary"
                    id="nextButton"
                    type="button"
                    data-qe-id="nextButton"
                    title="Choose recipients and schedule when to send"
                    onClick={continueButton}
                  >
                    Continue
                  </button>
                </span>
              </div>
            </header>
          </section>
        </div>
        <div className="editor-body">
          <div className="editor-left">
            <div className="editor-palette"></div>
          </div>
          <div className="editor-right">
            <div className="editor-console"></div>
            <div className="editor-message-settings"></div>
            <div id="editor-document" className="editor-document"></div>
          </div>
        </div>
        <div className="survey-container"></div>
      </div>
    </div>
  )
}

export default CpeIntegration
