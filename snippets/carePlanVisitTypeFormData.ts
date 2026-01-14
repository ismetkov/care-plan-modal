// CarePlanVisitType
export const VISIT_TYPES = {
  VIRTUAL: 'virtual',
  IN_HOME: 'in-home',
} as const;

export type VisitTypeValue = (typeof VISIT_TYPES)[keyof typeof VISIT_TYPES];

export enum CarePlansVisitTypeKeys {
  visitType = 'visitType',
}

type carePlansVisitTypeType = {
  [key in keyof typeof CarePlansVisitTypeKeys]: string;
};

export interface CarePlanVisitTypeFormData
  extends FormData,
    CarePlansIntroFormData,
    carePlansVisitTypeType {
  visitType: VisitTypeValue;
}

export const CarePlansVisitTypeKeys_to_label: Record<
  CarePlansVisitTypeKeys,
  string
> = {
  [CarePlansVisitTypeKeys.visitType]: 'Visit type',
};

export const CarePlansVisitTypeRules: Record<
  CarePlansVisitTypeKeys,
  FieldValidator
> = {
  [CarePlansVisitTypeKeys.visitType]: v().required().oneOf(Object.values(VISIT_TYPES)),
};
