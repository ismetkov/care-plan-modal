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
  if (typeof raw !== 'string' || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } cat