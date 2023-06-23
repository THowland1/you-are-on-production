import { z } from "zod";

const RuleSchema = z.object({
    id: z.string(),
    type: z.enum(['starts with']),
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