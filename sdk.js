
const unityHandler = {
  sdkBridgeName: "[VK SDK]",
  send(method, data) {
    if (data) {
      unityInstance.SendMessage(this.sdkBridgeName, method, data)
    }
    else {
      unityInstance.SendMessage(this.sdkBridgeName, method)
    }
  }
}

// vkBridge.send("VKWebAppCheckAllowedScopes", {scopes: "menu"}).then(console.log); // [{scope: 'menu', allowed: true}]

vkBridge.send("VKWebAppInit")

function showInviteBox() {
  vkBridge.send("VKWebAppShowInviteBox")
}

function showSettingsBox() {
  vkBridge.send("VKWebAppAddToFavorites")
}

function showShareBoxDemo() {
  vkBridge.send("VKWebAppShowWallPostBox", { "message": "browserplay лучший", "attachments": "photo673897297_457239089,https://browserplay.ru/" })
}

function showShareBoxWithParams(message, attachments) {
  vkBridge.send("VKWebAppShowWallPostBox", { message, attachments })
}

async function showFullscreenAdv() {
  try {
    const data = await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "interstitial" })
    unityHandler.send("OnInterstitialClosed")
  }
  catch(error) {
    console.log(error)
    unityHandler.send("OnInterstitialError")
  }
}

async function showRewardedAdv(id) {
  try {
    const { result } = await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "reward" })
    if (result) {
      unityHandler.send("OnRewardedAdWatched", id)
    }
    else {
      unityHandler.send("OnRewardedAdError")
    }
  }
  catch(error) {
    console.log(error)
    unityHandler.send("OnRewardedAdError")
  }
}