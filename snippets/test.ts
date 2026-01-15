export async function carePlansVisitTypeSubmitHandler(
  req: ReactRouterRequest,
  res: Response
) {
  const formData = { ...(req.body || {}) } as Record<string, any>;
  const { _action } = formData;

  const normalize = (v: any) => (Array.isArray(v) ? v[v.length - 1] : v);

  const visitType = normalize(formData.visitType);

  switch (_action) {
    case FormActions.BACK: {
      return res.status(ResponseCode.SUCCESS).send(
        renderToStaticMarkup(
          CarePlansIntroForm({
            formData: { ...formData, visitType: visitType ?? "" },
            enableRevalidation: true,
          } as any)
        )
      );
    }

    case FormActions.NEXT: {
      // ✅ VALIDATION
      if (!visitType || !Object.values(VISIT_TYPES).includes(visitType)) {
        return res.status(ResponseCode.ERROR_RETURN_TO_FORM).send(
          renderToStaticMarkup(
            CarePlansVisitTypeForm({
              formData,
              errors: { visitType: "Please choose an option" },
            } as any)
          )
        );
      }

      // ✅ NEXT STEP
      return res.status(ResponseCode.SUCCESS).send(
        renderToStaticMarkup(
          CarePlansLocationForm({
            formData: { ...formData, visitType },
            errors: {},
          } as any)
        )
      );
    }

    default: {
      return res.status(ResponseCode.ERROR_RETURN_TO_FORM).send(
        renderToStaticMarkup(
          CarePlansVisitTypeForm({
            formData,
            errors: { visitType: "Invalid form action" },
          } as any)
        )
      );
    }
  }
}
