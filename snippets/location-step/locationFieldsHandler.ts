export async function locationFieldsHandler(
  req: ReactRouteRequest,
  res: Response
) {
  const logger = Logger.initWithSymbol(locationFieldsHandler);
  const formData = { ...(req.body || {}) };
  const visitType = formData.visitType; // 'in-home' or 'video'

  const locationDetails = parseGoogleAddressDetails(
    formData['careRecipientAddress-selected-address']
  );

  const derived = {
    city: locationDetails?.city ?? '',
    state: locationDetails?.stateCode ?? locationDetails?.state ?? '',
    zipCode: locationDetails?.zip ?? '',
  };

  console.log('derived', derived);

  const html = renderToStaticMarkup(
    visitType === 'in-home' ? (
      <CityStateZipFields
        formData={{ ...formData, ...derived }}
        errors={{}}
      />
    ) : (
      <StateZipFields
        formData={{ ...formData, ...derived }}
        errors={{}}
      />
    )
  );

  return res.status(200).send(html);
}
