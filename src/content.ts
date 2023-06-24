import { getRules, setRules } from "./lib/storage"
import { wow } from "./wow"
// wow()

// (async () => {
//     const rules = await getRules();
//     rules.push({
//         id: String(Math.random()),
//         type: 'starts with',
//         enabled: true,
//         value: 'hello.com'
//     });
//     await setRules(rules);
//     console.log(rules)
//     // alert(websites)
// })()