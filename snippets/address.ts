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
  // always use currentTarget (not target)
  const btn = event.currentTarget;

  // find google search root + form
  const root = btn.closest('[${GOOGLE_ADDRESS_ROOT}]');
  const form = root?.closest('form');

  if (!root || !form) {
    console.warn('[GoogleAddressSearch] root or form not found');
    return;
  }

  // inputs inside google search
  const googleInput = root.querySelector('input[${GOOGLE_ADDRESS_SEARCH}]');
  const hiddenInput = root.querySelector('input[${GOOGLE_ADDRESS_INNER}]');

  // parse address details from option
  const details = JSON.parse(
    decodeURIComponent(btn.getAttribute('data-address-details'))
  );

  console.group('GoogleAddressSearch select');
  console.log('details:', details);

  // update google visible input
  if (googleInput) {
    googleInput.value = details.address || '';
    googleInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // update hidden selected-address input
  if (hiddenInput) {
    hiddenInput.value = JSON.stringify(details);
  }

  // read populate map from root
  const rawMap = root.getAttribute('data-google-address-populate');
  if (rawMap) {
    const populateMap = JSON.parse(decodeURIComponent(rawMap));
    console.log('populateMap:', populateMap);

    // values available from Google details
    const valueMap = {
      location: details.address,
      city: details.city,
      zip: details.zip,
      state: details.stateCode,
    };

    // 1) CLEAR all mapped fields first
    Object.values(populateMap).forEach((selector) => {
      const el = form.querySelector(selector);
      if (el) {
        el.value = '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // 2) SET new values (or empty string if missing)
    Object.entries(populateMap).forEach(([key, selector]) => {
      const el = form.querySelector(selector);
      if (!el) return;

      const val = valueMap[key] ?? '';
      el.value = val;

      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));

      console.log('populated:', key, '→', selector, 'value:', val);
    });
  }

  // close dropdown listbox
  btn.closest('[role="listbox"]')?.remove();

  // refocus google input
  googleInput?.focus();

  console.groupEnd();
`}