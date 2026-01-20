type GoogleAddressDetails = NonNullable<GoogleAddressOption['addressDetails']>;

function parseGoogleAddressDetails(raw: unknown): GoogleAddressDetails | null {
  if (typeof raw !== 'string') return null;

  const s = raw.trim();
  if (!s) return null;

  // raw can be encoded or plain
  const candidates = [s];
  try {
    candidates.unshift(decodeURIComponent(s));
  } catch {}

  for (const c of candidates) {
    try {
      const obj = JSON.parse(c);

      // ✅ minimal validation: must be an object
      if (!obj || typeof obj !== 'object') continue;

      // optional: require at least one useful field
      const hasAny =
        typeof (obj as any).address === 'string' ||
        typeof (obj as any).city === 'string' ||
        typeof (obj as any).zip === 'string' ||
        typeof (obj as any).stateCode === 'string';

      if (!hasAny) continue;

      return obj as GoogleAddressDetails;
    } catch {
      // try next candidate
    }
  }

  return null;
}

export async function locationFieldsHandler(req: ReactRouteRequest, res: Response) {
  const formData = { ...(req.body || {}) };

  const details = parseGoogleAddressDetails(
    formData['careRecipientAddress-selected-address']
  );

  const derived = {
    city: details?.city ?? '',
    state: details?.stateCode ?? details?.state ?? '',
    zip: details?.zip ?? '',
  };

  const html = renderToStaticMarkup(
    <LocationFields
      formData={{ ...formData, ...derived }}
      errors={{}}
    />
  );

  return res.status(200).send(html);
}



// make HTMX "see" the update
hiddenInput.dispatchEvent(new Event("input",  { bubbles: true }));
hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));

<div
  hx-post="..."
  hx-trigger="change from:input[data-google-address-inner]"
>