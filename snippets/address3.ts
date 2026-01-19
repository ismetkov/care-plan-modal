hiddenInput.value = JSON.stringify(details);
hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));

document.addEventListener("change", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLInputElement)) return;

  // pick the hidden input by a stable attribute / name
  if (target.name !== "selectedGoogleAddress") return; // <-- adjust to your real name

  let details: any;
  try {
    details = JSON.parse(target.value || "{}");
  } catch {
    details = {};
  }

  const form = target.closest("form");
  if (!form) return;

  const set = (selector: string, value: any) => {
    const el = form.querySelector(selector) as HTMLInputElement | null;
    if (!el) return;
    el.value = value ?? ""; // ✅ clears stale values
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  set('input[name="location"]', details.address);
  set('input[name="city"]', details.city);
  set('input[name="zip"]', details.zip);
  set('input[name="state"]', details.stateCode);
});
