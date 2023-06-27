import { z } from "zod";


export const PART_OPTIONS = ['protocol', 'domain', 'host', 'hostname', 'origin', 'pathname'] as const;
export const TYPE_OPTIONS = ['equals', 'starts with', 'ends with', 'matches (regex)'] as const;
const RuleSchema = z.object({
    id: z.string(),
    part: z.enum(PART_OPTIONS),
    type: z.enum(TYPE_OPTIONS),
    value: z.string(),
    enabled: z.boolean()
})
const RulesSchema = z.array(RuleSchema);

export type Rule = z.infer<typeof RuleSchema>;


export async function getRules(): Promise<Rule[]> {
    const dict = await chrome.storage.sync.get('rules');
    const rulesAttempt = RulesSchema.safeParse(dict.rules);
    return rulesAttempt.success ? rulesAttempt.data : []
}
export async function setRules(rules: Rule[]): Promise<void> {
    await chrome.storage.sync.set({ rules: rules });
}
export async function getUrl(): Promise<URL | null> {
    try {
        const url_query = await chrome.tabs.query({ currentWindow: true, active: true });
        return new URL(url_query[0].url || '')
    } catch (error) {
        return null
    }
}


// export async function getRules(): Promise<Rule[]> {
//     const dict = localStorage.getItem('rules');
//     const dictt = JSON.parse(dict ?? '[]');
//     const rulesAttempt = RulesSchema.safeParse(dictt);
//     return rulesAttempt.success ? rulesAttempt.data : []
// }
// export async function setRules(rules: Rule[]): Promise<void> {
//     const value = JSON.stringify(rules);
//     localStorage.setItem('rules', value)
// }