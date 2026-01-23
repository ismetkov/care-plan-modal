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
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any existing forms on page load
  const initialForms = document.querySelectorAll("form");
  initialForms.forEach((form: HTMLFormElement) => {
    initializeFormValidation(form);
  });

  // Handle HTMX content swaps
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

    console.log("Target tag name:", e.detail.target.tagName);
    console.log("📋 Forms found:", formsToInitialize.length);

    formsToInitialize.forEach((form: HTMLFormElement) => {
      initializeFormValidation(form);
    });

    console.groupEnd();
  });
});

document.body.addEventListener("htmx:configRequest", function (e: any) {
  console.group("🚀🚀🚀 HTMX CONFIG REQUEST TEST");
  console.log("Target:", e.target);
  console.log("Target ID:", e.target.getAttribute("id"));
  console.groupEnd();
});

// ######### heeeeey
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

// THIS IS WHERE initializedForms COMES FROM
let formSubmitAttempt = 0;
const initializedForms = new Set<string>();

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
  console.group("🟢🟢🟢 HANDLE FORM SUBMISSION");

  timeStart(LOG.PERFORMANCE + "handleClientsideFormSubmission");
  const form: HTMLFormElement = e.target;

  console.log("Form:", form);
  console.log("Form ID:", form.getAttribute("id"));

  if (form === undefined || !VALID_FORM_IDS.includes(form.getAttribute("id"))) {
    console.log("❌ Form not in valid list");
    console.groupEnd();
    return;
  }

  console.log("✅ Valid form, proceeding");

  if (formSubmitAttempt === 0) {
    console.log("🔧 First attempt - initializing field validation");
    initFormFieldValidation(form, validateField);
  }

  formSubmitAttempt++;
  console.log("📊 Submit attempt:", formSubmitAttempt);

  timeEnd(LOG.PERFORMANCE + "handleClientsideFormSubmission");
  console.groupEnd();
}

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

function initializeFormValidation(form: HTMLFormElement) {
  const formId = form.getAttribute("id");

  console.group("🔧🔧🔧 INITIALIZE FORM VALIDATION");
  console.log("Form ID:", formId);

  if (!formId || !VALID_FORM_IDS.includes(formId)) {
    console.log("❌ Form not in valid list");
    console.groupEnd();
    return;
  }

  if (initializedForms.has(formId)) {
    console.log("⏭️ Form already initialized");
    console.groupEnd();
    return;
  }

  console.log("✅ Adding event listener to form");
  initializedForms.add(formId);
  formSubmitAttempt = 0;

  form.addEventListener("htmx:configRequest", handleClientsideFormSubmission);

  console.log("🔗 Event listener attached successfully");
  console.groupEnd();
}

// ============================================================================
// MAIN SETUP
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize any existing forms on page load
  const initialForms = document.querySelectorAll("form");
  initialForms.forEach((form: HTMLFormElement) => {
    initializeFormValidation(form);
  });

  // Handle HTMX content swaps
  document.body.addEventListener("htmx:afterSwap", function (e: any) {
    console.group("🔵🔵🔵 FORM VALIDATION DEBUG");

    let formsToInitialize: HTMLFormElement[] = [];

    if (e.detail.target.tagName === "FORM") {
      formsToInitialize.push(e.detail.target);
    }

    const formsInside = e.detail.target.querySelectorAll("form");
    if (formsInside.length > 0) {
      // @ts-ignore
      formsToInitialize.push(...Array.from(formsInside));
    }

    console.log("Target tag name:", e.detail.target.tagName);
    console.log("📋 Forms found:", formsToInitialize.length);

    formsToInitialize.forEach((form: HTMLFormElement) => {
      initializeFormValidation(form);
    });

    console.groupEnd();
  });
});
