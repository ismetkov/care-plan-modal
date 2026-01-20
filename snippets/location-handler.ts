function parseSelectedAddress(raw: unknown): GoogleAddressOption | null {
  if (typeof raw !== "string") return null;

  const s = raw.trim();
  if (!s) return null;

  // raw is usually form-urlencoded; try decoded first, then plain
  const tryParse = (v: string) => {
    try {
      return JSON.parse(v) as GoogleAddressOption;
    } catch {
      return null;
    }
  };

  return tryParse(decodeURIComponent(s)) ?? tryParse(s);
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
