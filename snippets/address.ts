export type GoogleAddressField = 'location' | 'city' | 'zip' | 'state';
export type GoogleAddressPopulateMap = Partial<Record<GoogleAddressField, string>>;

type Props = {
  // ...your existing props
  populateMap?: GoogleAddressPopulateMap;
};

export const GoogleAddressSearch = ({ populateMap, ...rest }: Props) => {
  // ...
  return (
    <div
      className="w-full relative"
      {...{ [GOOGLE_ADDRESS_ROOT]: true }}
      data-google-address-populate={
        populateMap ? encodeURIComponent(JSON.stringify(populateMap)) : undefined
      }
      data-load-scripts="googleAddressSearch.js"
      {...hxProps}
    >
      {/* your existing Input + hidden input */}
    </div>
  );
};

data-hx-on-click={`
  const btn = event.currentTarget;
  const root = btn.closest('[${GOOGLE_ADDRESS_ROOT}]');
  const form = root?.closest('form');

  const input = root?.querySelector('input[${GOOGLE_ADDRESS_SEARCH}]');
  const hiddenInput = root?.querySelector('input[${GOOGLE_ADDRESS_INNER}]');

  const details = JSON.parse(
    decodeURIComponent(btn.getAttribute('data-address-details'))
  );

  // existing behavior
  if (input) input.value = details.address || '';
  if (hiddenInput) hiddenInput.value = JSON.stringify(details);

  // ✅ NEW: populate fields declared by parent
  const rawMap = root?.getAttribute('data-google-address-populate');
  if (rawMap && form) {
    const populateMap = JSON.parse(decodeURIComponent(rawMap));

    const valueMap = {
      location: details.address,
      city: details.city,
      zip: details.zip,
      state: details.stateCode,
    };

    Object.entries(populateMap).forEach(([key, selector]) => {
      const el = form.querySelector(selector);
      const val = valueMap[key];

      if (el && val != null) {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  // close dropdown (safer than event.target.parentNode)
  btn.closest('[role="listbox"]')?.remove();
  input?.focus();
`}