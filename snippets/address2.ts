const root = btn.closest("[${GOOGLE_ADDRESS_ROOT}]");

// after you parse `details` and set hiddenInput.value...
root.dispatchEvent(
  new CustomEvent("google-address:selected", {
    bubbles: true,
    detail: details,
  }),
);

document.addEventListener("google-address:selected", (e) => {
  const ce = e as CustomEvent; // detail exists now
  const target = ce.target;

  // target must be an Element to use closest()
  const root =
    target instanceof Element
      ? (target.closest("[data-google-address-root]") ?? target)
      : null;

  if (!root) return;

  const form = root.closest("form");
  if (!form) return;

  const details = ce.detail;

  const set = (selector: string, value: any) => {
    const el = form.querySelector(selector) as HTMLInputElement | null;
    if (!el) return;

    // always overwrite (clears stale values)
    el.value = value ?? "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  set('input[name="location"]', details?.address);
  set('input[name="city"]', details?.city);
  set('input[name="zip"]', details?.zip);
  set('input[name="state"]', details?.stateCode);
});
