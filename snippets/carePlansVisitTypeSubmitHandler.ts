export const VISIT_TYPES = {
  VIRTUAL: 'virtual',
  IN_HOME: 'in-home',
} as const;

type VisitTypeValue = typeof VISIT_TYPES[keyof typeof VISIT_TYPES];

export async function carePlansVisitTypeSubmitHandler(
  res: Response
) {
  const logger = Logger.initWithSymbol(carePlansVisitTypeSubmitHandler);
  const formData = { ...(req.body || {}) };
  const { _action, visitType } = req.body || {};

  logger.verbose('intro submit', { action: _action, visitType, formData });
  logger.verbose('FORM DATA', formData);

  if (_action === FormActions.BACK) {
    const html = renderToStaticMarkup(
      CarePlansIntroForm({ formData, enableRevalidation: true } as any)
    );
    return res.status(ResponseCode.SUCCESS).send(html);
  }

  // Visit type selection - clicking a card submits visitType
  if (visitType) {
    // Validate it's a valid option
    if (!Object.values(VISIT_TYPES).includes(visitType)) {
      return res
        .status(ResponseCode.ERROR_RETURN_TO_FORM)
        .send(
          renderToStaticMarkup(
            CarePlansVisitTypeForm({ formData, errors: { visitType: 'Invalid selection' } } as any)
          )
        );
    }

    // Clear address fields if visit type changed to prevent data persistence between types
    const previousVisitType = formData.visitType;
    const visitTypeChanged = previousVisitType && previousVisitType !== visitType;

    logger.verbose('visit type change check', {
      previousVisitType,
      newVisitType: visitType,
      visitTypeChanged,
    });

    const nextFormData = visitTypeChanged
      ? {
          ...formData,
          visitType,
          // Clear all address-related fields when visit type changes
          address: '',
          apartment: '',
          city: '',
          state: '',
          zip: '',
        }
      : { ...formData, visitType };

    logger.verbose('next form data after visit type selection', {
      visitTypeChanged,
      clearedFields: visitTypeChanged ? ['address', 'apartment', 'city', 'state', 'zip'] : [],
      nextFormData,
    });

    // Valid selection - proceed to next step
    const html = renderToStaticMarkup(
      CarePlansLocationForm({ formData: nextFormData, errors: {} } as any)
    );
    return res.status(ResponseCode.SUCCESS).send(html);
  }

  // submit or unknown action -> return error page
  logger.error('Invalid action or submit action received:', _action);
  const errorPage = createError({
    errors: [{ message: 'Invalid form action' }],
  });
  return res
    .status(ResponseCode.ERROR_RETURN_TO_FORM)
    .send(
      renderToStaticMarkup(
        CarePlansLocationForm({ formData, errors: {}, errorPage } as any)
      )
    );
}
