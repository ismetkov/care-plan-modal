type SelectedGoogleAddress = {
  label?: string;
  address?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  zip?: string;
  lat?: number;
  lng?: number;
};

function parseSelectedAddress(raw: unknown): SelectedGoogleAddress | null {
  if (typeof raw !== "string" || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
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
