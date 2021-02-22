import { BASE_URI } from "../index"

export class MockWebpackDocumentClient {

  constructor(accountId, applicationId) {
    this.accountId = accountId; 
    this.applicationId = applicationId
  }

  getRenderedDocument(documentId) {
    
    return fetch(
      `${BASE_URI}/accounts/${this.accountId}/documents/${documentId}/rendered_content`,
    ).then(r => r.json())
  }

  getDocument(documentId) {
    
    return fetch(`${BASE_URI}/accounts/${this.accountId}/documents/${documentId}`)
      .then(r => r.json())
      .then(response => {
        const onGetDocumentEvent = new CustomEvent("onGetDocument", {
          detail: response,
        })

        window.dispatchEvent(onGetDocumentEvent)

        return response
      })
  }

  createDocumentFromTemplate(templateId) {
    
    return fetch(`${BASE_URI}/accounts/${this.accountId}/templates/{${templateId}}/documents`, {
      method: "POST",
    }).then(r => r.json())
  }

  updateDocument(documentId, json) {
    
    return fetch(`${BASE_URI}/accounts/${this.accountId}/documents/${documentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    })
      .then(r => {
        // this to catch fetch status error
        if (!r.ok) {
          throw Error(`${r.status} - ${r.statusText}(${r.url})`)
        }
        return r
      })
      .then(r => r.text())
      .catch(err => {
        throw err
      })
  }

  /**
   * Get templates
   * @return {Object}
   */
  getTemplates() {
    return fetch(`${BASE_URI}/applications/${this.applicationId}/template_views/Released`).then(r =>
      r.json(),
    )
  }
}
