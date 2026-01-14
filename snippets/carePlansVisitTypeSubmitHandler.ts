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

    // Valid selection - proceed to next step
    const html = renderToStaticMarkup(
      CarePlansLocationForm({ formData: { ...formData, visitType }, errors: {} } as any)
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
