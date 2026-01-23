const RULE_SETS: Record<string, any> = {
  [FormId.CARE_PLANS_INTRO]: CarePlansIntroRules,
  [FormId.CARE_PLANS_VISIT_TYPE]: CarePlansVisitTypeRules,
  [FormId.CARE_PLANS_LOCATION]: CarePlansLocationRules,
};

type AllCarePlansKeys =
  | CarePlansIntroKeys
  | CarePlansVisitTypeKeys
  | CarePlansLocationKeys;

let formSubmitAttempt = 0;

// Validate a single field
function validateField(
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  data: Record<string, string>,
): string | null {
  console.group("🔍🔍🔍 VALIDATE FIELD");

  const name = field.name as AllCarePlansKeys;
  const form = field.closest("form");
  const formId = form?.getAttribute("id");

  console.log("Field name:", name);
  console.log("Form ID:", formId);

  if (!formId || !RULE_SETS[formId]) {
    console.log("No rules for this form");
    console.groupEnd();
    return null;
  }

  const rules = RULE_SETS[formId];
  const validator = rules[name];

  if (validator) {
    console.log("Validator found, running validation...");
    const result = validator.validate(field.value, data);
    console.log("Validation result:", result || "PASSED ✅");
    console.groupEnd();
    return result;
  }

  console.log("No validator for this field");
  console.groupEnd();
  return null;
}

// Update handleFormSubmit to call validation
function handleFormSubmit(e: any) {
  console.group("🟢🟢🟢 HANDLE SUBMIT");

  const form: HTMLFormElement = e.target;
  const formId = form.getAttribute("id");

  console.log("Step X: Form ID =", formId);
  console.log("Step Y: Form is valid?", VALID_FORM_IDS.includes(formId));

  if (formSubmitAttempt === 0) {
    console.log("Step Z: First submit attempt - initializing field validation");
    initFormFieldValidation(form, validateField);
  }

  formSubmitAttempt++;
  console.log("Submit attempt count:", formSubmitAttempt);

  console.groupEnd();
}
