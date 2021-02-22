export const mockDistUI = () => {
  console.warn("DistUI is mocked out")

  // No-op on distui functions
  window.distui = {
    /**
     * addEventListener
     */
    addEventListener: () => {},
    /**
     * removeEventListener
     */
    removeEventListener: () => {},
    /**
     * showOverlay
     */
    showOverlay: () => {},
    /**
     * track
     */
    track: () => {},
  }

  // distui-helper is looking for onDistUiReady event
  // https://github.roving.com/ES/distui-helpers/blob/1f561f28835ca18db5ea27e4b9a1e173862bc0ac/src/js/distUI.js#L78
  window.DistUI = {
    instance: { ...window.distui },
    ...window.distui,
  }
  const fakeOnDistUiReadyEvent = new CustomEvent("onDistUiReady", {})
  window.document.dispatchEvent(fakeOnDistUiReadyEvent)
}
