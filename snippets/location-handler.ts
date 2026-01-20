function parseSelectedAddress(raw: unknown): GoogleAddressOption | null {
  if (typeof raw !== "string" || !raw.trim()) return null;

  try {
    // 🔑 important: decode first
    const decoded = decodeURIComponent(raw);

    return JSON.parse(decoded) as GoogleAddressOption;
  } catch (err) {
    // extremely useful during dev
    console.warn("Failed to parse selected address", raw);
    return null;
  }
}

export async function locationFieldsHandler(
  req: ReactRouteRequest,
  res: Response,
) {
  const logger = Logger.initWithSymbol(locationFieldsHandler);

  const formData = { ...(req.body || {}) };
  logger.verbose("locationFields fragment", { formData });

  // ✅ EXACT key you provided
  const selectedRaw = formData["careRecipientAddress-selected-address"];
  const selected = parseSelectedAddress(selectedRaw);

  // derive values (always fallback to empty string)
  const derived = {
    careRecipientAddress: selected?.label ?? selected?.address ?? "",

    city: selected?.city ?? "",
    state: selected?.stateCode ?? selected?.state ?? "",
    zip: selected?.zip ?? "",
  };

  const html = renderToStaticMarkup(
    LocationFields({
      formData: {
        ...formData,
        ...derived,
      },
      errors: {},
    } as any),
  );

  return res.status(200).send(html);
}
