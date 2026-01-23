const VALID_FORM_IDS: string[] = [
  FormId.CARE_PLANS_INTRO,
  FormId.CARE_PLANS_VISIT_TYPE,
  FormId.CARE_PLANS_LOCATION,
];

const RULE_SETS: Record<string, any> = {
  [FormId.CARE_PLANS_INTRO]: CarePlansIntroRules,
  [FormId.CARE_PLANS_VISIT_TYPE]: CarePlansVisitTypeRules,
  [FormId.CARE_PLANS_LOCATION]: CarePlansLocationRules,
};

type AllCarePlansKeys =
  | CarePlansIntroKeys
  | CarePlansVisitTypeKeys
  | CarePlansLocationKeys;

const initializedForms = new Set<string>();
let formSubmitAttempt = 0;

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

function initializeFormValidation(form: HTMLFormElement) {
  console.group("🔧🔧🔧 INITIALIZE VALIDATION");

  const formId = form.getAttribute("id");
  console.log("Step A: Form ID =", formId);

  if (!formId || !VALID_FORM_IDS.includes(formId)) {
    console.log("Step B: Form NOT in valid list, skipping");
    console.groupEnd();
    return;
  }

  if (initializedForms.has(formId)) {
    console.log("Step C: Form already initialized, skipping");
    console.groupEnd();
    return;
  }

  console.log("Step D: Adding to initialized forms set");
  initializedForms.add(formId);

  console.log("Step E: Attaching htmx:configRequest listener");
  form.addEventListener("htmx:configRequest", handleFormSubmit);

  console.log("Step F: Initialization complete ✅");
  console.groupEnd();
}

document.addEventListener("DOMContentLoaded", function () {
  console.group("✅✅✅ PAGE LOAD");
  console.log("Step 1: Page loaded");

  const initialForms = document.querySelectorAll("form");
  console.log("Step 2: Found", initialForms.length, "forms on page load");

  initialForms.forEach((form: HTMLFormElement, index) => {
    console.log(`Step 3.${index}: Form ID =`, form.getAttribute("id"));
    initializeFormValidation(form);
  });
  console.groupEnd();

  document.body.addEventListener("htmx:afterSwap", function (e: any) {
    console.group("🔵🔵🔵 HTMX SWAP");
    console.log("Step 4: Content swapped");

    let formsToInitialize: HTMLFormElement[] = [];

    if (e.detail.target.tagName === "FORM") {
      console.log("Step 5: Target IS a form");
      formsToInitialize.push(e.detail.target);
    } else {
      console.log(
        "Step 5: Target is NOT a form, it is:",
        e.detail.target.tagName,
      );
    }

    const formsInside = e.detail.target.querySelectorAll("form");
    console.log("Step 6: Found", formsInside.length, "forms inside target");

    if (formsInside.length > 0) {
      formsToInitialize.push(...Array.from(formsInside));
    }

    console.log("Step 7: Target tag name:", e.detail.target.tagName);
    console.log("Step 8: Total forms to process:", formsToInitialize.length);

    formsToInitialize.forEach((form: HTMLFormElement, index) => {
      console.log(
        `Step 9.${index}: Processing form ID =`,
        form.getAttribute("id"),
      );
      initializeFormValidation(form);
    });

    console.groupEnd();
  });
});

document.body.addEventListener("htmx:configRequest", function (e: any) {
  console.group("🚀🚀🚀 FORM SUBMIT");
  console.log("Step 10: Form submission triggered");
  console.log("Step 11: Target:", e.target);
  console.log("Step 12: Target ID:", e.target.getAttribute("id"));
  console.groupEnd();
});
