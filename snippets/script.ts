document.addEventListener("submit", (e: SubmitEvent) => {
  const form = e.target as HTMLFormElement;

  // Check if this is the visit form
  if (form?.id === "visit-form") {
    const btn = e.submitter as HTMLButtonElement;

    // If button has name="visitType", add _action=NEXT
    if (btn?.name === "visitType") {
      // Remove any existing hidden _action inputs first
      const existingAction = form.querySelector(
        'input[type="hidden"][name="_action"]'
      );
      if (existingAction) {
        existingAction.remove();
      }

      // Now add the fresh one
      const actionInput = document.createElement("input");
      actionInput.type = "hidden";
      actionInput.name = "_action";
      actionInput.value = "NEXT";
      form.appendChild(actionInput);
    }
  }
});

<form method="post" hx-post="/endpoint" id="visit-form">
  <button type="submit" name="_action" value="BACK">
    Back
  </button>

  <button type="submit" name="visitType" value="in-home">
    In-home
  </button>

  <button type="submit" name="visitType" value="virtual">
    Virtual
  </button>
</form>;
