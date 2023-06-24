import type { Rule } from "./storage";


export function isOnProduction(url: URL, rules: Rule[]) {
    for (const rule of rules) {
        if (!rule.enabled) {
            continue;
        }
        switch (rule.type) {
            case 'starts with':
                if (url.toString().startsWith(rule.value)) {
                    return true;
                }
        }
    }
    return false;
}