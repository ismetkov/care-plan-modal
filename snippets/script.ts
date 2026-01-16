document
  .getElementById("visit-form")
  ?.addEventListener("submit", (e: SubmitEvent) => {
    const btn = e.submitter as HTMLButtonElement;
    const form = e.target as HTMLFormElement;

    // If button has name="visitType", add _action=NEXT
    if (btn?.name === "visitType") {
      const actionInput = document.createElement("input");
      actionInput.type = "hidden";
      actionInput.name = "_action";
      actionInput.value = "NEXT";
      form.appendChild(actionInput);
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
