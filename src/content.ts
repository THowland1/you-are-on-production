import { getWebsites, setWebsites } from "./lib/storage"
import { wow } from "./wow"
// wow()

(async () => {
    const websites = await getWebsites();
    await setWebsites()
    // alert(websites)
})()