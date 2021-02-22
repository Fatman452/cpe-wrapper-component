import { BASE_URI } from "../index"

export class MockSettingsService {
  getCpeSettingByName(settingName) {
    return fetch(`${BASE_URI}/settings/cpe/${settingName}`).then(r => r.json())
  }

  updateCpeSetting(settingName, settingValue) {
    return fetch(`${BASE_URI}/settings/cpe/${settingName}`, {
      method: "POST",
      body: { settingValue },
    }).then(r => r.json())
  }
}
