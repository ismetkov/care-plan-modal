// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

type AllCarePlansKeys =
  | CarePlansIntroKeys
  | CarePlansVisitTypeKeys
  | CarePlansLocationKeys;

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

let formSubmitAttempt = 0;

// ============================================================================
// VALIDATION FUNCTION
// ============================================================================

function validateField(
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  data: Record<string, string>,
): string | null {
  timeStart(LOG.PERFORMANCE + "validateField - " + field.name);

  const name = field.name as AllCarePlansKeys;
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

// ============================================================================
// FORM SUBMISSION HANDLER
// ============================================================================

function handleClientsideFormSubmission(e: any) {
  timeStart(LOG.PERFORMANCE + "handleClientsideFormSubmission");
  const form: HTMLFormElement = e.target;

  console.log("Form submission attempt:", form.getAttribute("id"));

  if (form === undefined || !VALID_FORM_IDS.includes(form.getAttribute("id"))) {
    return;
  }

  if (formSubmitAttempt === 0) {
    initFormFieldValidation(form, validateField);
  }

  formSubmitAttempt++;

  timeEnd(LOG.PERFORMANCE + "handleClientsideFormSubmission");
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializeFormValidation(form: HTMLFormElement) {
  const formId = form.getAttribute("id");

  if (!formId || !VALID_FORM_IDS.includes(formId)) {
    return;
  }

  console.log("Initializing validation for form:", formId);

  // Reset submit attempt for new form
  formSubmitAttempt = 0;

  // Attach the submission handler
  form.addEventListener("htmx:configRequest", handleClientsideFormSubmission);
}

// ============================================================================
// MAIN SETUP
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("Setting up form validation...");

  // Initialize any existing forms on page load
  const initialForms = document.querySelectorAll("form");
  initialForms.forEach((form: HTMLFormElement) => {
    initializeFormValidation(form);
  });

  // Handle HTMX content swaps (for multi-step forms)
  document.body.addEventListener("htmx:afterSwap", function (e: any) {
    console.log("HTMX content swapped");

    // Find and initialize any new forms in the swapped content
    const newForms = e.detail.target.querySelectorAll("form");
    newForms.forEach((form: HTMLFormElement) => {
      initializeFormValidation(form);
    });
  });

  // Also listen on htmx:configRequest event
  document.addEventListener(
    "htmx:configRequest",
    handleClientsideFormSubmission,
  );
});

// ###########
document.body.addEventListener("htmx:afterSwap", function (e: any) {
  console.group("🔵🔵🔵 FORM VALIDATION DEBUG");

  let formsToInitialize: HTMLFormElement[] = [];

  // Check if target is a form
  if (e.detail.target.tagName === "FORM") {
    formsToInitialize.push(e.detail.target);
  }

  // Check for forms inside target
  const formsInside = e.detail.target.querySelectorAll("form");
  if (formsInside.length > 0) {
    // @ts-ignore
    formsToInitialize.push(...Array.from(formsInside));
  }

  // Check parent form
  const parentForm = e.detail.target.closest("form");
  if (parentForm && !formsToInitialize.includes(parentForm)) {
    formsToInitialize.push(parentForm);
  }

  // ONLY log and initialize if we found forms
  if (formsToInitialize.length > 0) {
    console.log("Target element:", e.detail.target);
    console.log("Target tag name:", e.detail.target.tagName);
    console.log("📋 Total forms to initialize:", formsToInitialize.length);

    formsToInitialize.forEach((form: HTMLFormElement) => {
      const formId = form.getAttribute("id");
      console.log("Initializing form:", formId);
      initializeFormValidation(form);
    });
  } else {
    // Silent - don't log content-only swaps
    console.log("⏭️ Skipping - no forms in this swap (content update only)");
  }

  console.groupEnd();
});
