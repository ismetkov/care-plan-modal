const root = btn.closest("[${GOOGLE_ADDRESS_ROOT}]");

// after you parse `details` and set hiddenInput.value...
root.dispatchEvent(
  new CustomEvent("google-address:selected", {
    bubbles: true,
    detail: details,
  }),
);

document.addEventListener("google-address:selected", (e) => {
  const root = e.target.closest("[data-google-address-root]") || e.target;
  const form = root.closest("form");
  if (!form) return;

  const details = e.detail;

  // clear + set (always overwrite)
  const set = (selector, value) => {
    const el = form.querySelector(selector);
    if (!el) return;
    el.value = value ?? "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  set('input[name="location"]', details.address);
  set('input[name="city"]', details.city);
  set('input[name="zip"]', details.zip);
  set('input[name="state"]', details.stateCode);
});
