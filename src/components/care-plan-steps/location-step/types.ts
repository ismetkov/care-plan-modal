/**
 * Location Step Types
 */

export interface LocationFormData {
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export type VisitType = 'in-home' | 'video' | null;

export interface LocationFormProps {
  formData: LocationFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  recipientName: string;
}
