// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
var self = this;

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is installed for first time.
  try {
    const applicationServerKey = urlB64ToUint8Array(
	'BKwpE_Ph0Eql5-9Z8m23YNZFTYwSVVO07vGvpjaUNAk1qGDhgHL6rSb3x4qD-Jg5nCtg7aGHyeSl90LXWMjQCCQ'
    )

    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    localStorage.setItem("subscription", subscription);
    //console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text())
    showLocalNotification('Notification', event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  }
  swRegistration.showNotification(title, options)
}
