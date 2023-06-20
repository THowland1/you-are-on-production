export async function getWebsites(): Promise<string | undefined> {
    const dict = await chrome.storage.sync.get('websites');
    return dict.websites;
}
export async function setWebsites(): Promise<void> {
    await chrome.storage.sync.set({ websites: String(Math.random()) });

}