type AllCarePlansKeys = CarePlansIntroKeys | CarePlansLocationKeys;

function validateField(
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  data: Record<string, string>,
): string | null {
  timeStart(LOG.PERFORMANCE + "validateField - " + field.name);

  const name = field.name as AllCarePlansKeys;

  const RULE_SETS: Record<string, any> = {
    [FormId.CARE_PLANS_INTRO]: CarePlansIntroRules,
    [FormId.CARE_PLANS_LOCATION]: CarePlansLocationRules,
  };

  const form = field.closest("form");
  const formId = form?.getAttribute("id");

  if (!formId || !RULE_SETS[formId]) {
    timeEnd(LOG.PERFORMANCE + "validateField - " + field.name);
    return null;
  }

  const rules = RULE_SETS[formId];
  const validator = rules[name];

  if (validator) {
    const result = validator.validate(field.value, data);
    timeEnd(LOG.PERFORMANCE + "validateField - " + field.name);
    return result;
  }

  timeEnd(LOG.PERFORMANCE + "validateField - " + field.name);
  return null;
}
