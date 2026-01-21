export async function locationFieldsHandler(
  req: ReactRouteRequest,
  res: Response
) {
  const logger = Logger.initWithSymbol(locationFieldsHandler);
  const formData = { ...(req.body || {}) };
  const visitType = formData.visitType; // 'in-home' or 'video'

  const selectedAddressKey =
    visitType === 'in-home'
      ? 'careRecipientAddress-selected-address'
      : 'city-selected-address';

  const locationDetails = parseGoogleAddressDetails(
    formData[selectedAddressKey]
  );

  const derived = {
    city: locationDetails?.city ?? '',
    state: locationDetails?.stateCode ?? locationDetails?.state ?? '',
    zipCode: locationDetails?.zip ?? '',
  };

  console.log('derived', derived);

  delete formData[selectedAddressKey];

  const mergedFormData = { ...formData, ...derived };

  const html = renderToStaticMarkup(
    visitType === 'in-home' ? (
      <CityStateZipFields formData={mergedFormData} errors={{}} />
    ) : (
      <StateZipFields formData={mergedFormData} errors={{}} />
    )
  );

  return res.status(200).send(html);
}
