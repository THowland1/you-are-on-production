import type { Rule } from "./storage";
import { getDomain } from "./get-domain";


export function isOnProduction(url: URL, rules: Rule[]) {

    const part_values: Record<Rule['part'], string> = {
        "protocol": url.protocol,
        "domain": getDomain(url),
        "host": url.host,
        "hostname": url.hostname,
        "origin": url.origin,
        "pathname": url.pathname,
    };

    const check_functions: Record<Rule['type'], (part_value: string, rule_value: string) => boolean> = {
        "ends with": (part_value, rule_value) => part_value.endsWith(rule_value),
        "starts with": (part_value, rule_value) => part_value.startsWith(rule_value),
        "equals": (part_value, rule_value) => part_value === (rule_value),
        "matches (regex)": (part_value, rule_value) => new RegExp(rule_value).test(part_value),
    }


    for (const rule of rules) {
        if (!rule.enabled) {
            continue;
        }
        const part_value = part_values[rule.part]

        const check_function = check_functions[rule.type];
        if (check_function(part_value, rule.value)) {
            return true;
        }
    }
    return false;
}

