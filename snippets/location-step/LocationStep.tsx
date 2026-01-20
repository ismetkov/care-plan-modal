/**
 * Location Step - Main Component
 * Renders In-Home or Video visit fields based on visit type
 */

import {
  LOCATION_FIELDS_TARGET_ID,
  PATH_CARE_PLANS_CITY_STATE_ZIP_FRAGMENT,
  PATH_CARE_PLANS_STATE_ZIP_FRAGMENT,
} from './constants';

const LocationStep = ({ isInHome, formData, errors }) => {
  return isInHome ? (
    // ============================================================
    // IN-HOME VISIT
    // ============================================================
    <>
      <div
        hx-post={PATH_CARE_PLANS_CITY_STATE_ZIP_FRAGMENT}
        hx-trigger="change from:input[data-google-address-inner]"
        hx-target={`#${LOCATION_FIELDS_TARGET_ID}`}
        hx-swap="innerHTML"
      >
        <GoogleAddressSearch
          {...CarePlansLocationConfig[CarePlansLocationKeys.careRecipientAddress]}
          label={`${formData.careRecipientFirstName}'s address`}
          placeholder="Address"
          error={errors?.careRecipientAddress}
          value={formData?.careRecipientAddress}
          enableRevalidation
        />
      </div>

      <Input
        {...CarePlansLocationConfig[CarePlansLocationKeys.careRecipientAddress2]}
        value={formData?.careRecipientAddress2}
        error={errors?.careRecipientAddress2}
        enableRevalidation
      />

      <div id={LOCATION_FIELDS_TARGET_ID}>
        <CityStateZipFields errors={errors} formData={formData} />
      </div>

      <ContactInfoSection>
        <Input
          {...CarePlansLocationConfig[CarePlansLocationKeys.primaryContactInfo]}
          value={formData?.primaryContactInfo}
          error={errors?.primaryContactInfo}
          enableRevalidation
        />
      </ContactInfoSection>
    </>
  ) : (
    // ============================================================
    // VIDEO VISIT
    // ============================================================
    <>
      <div
        hx-post={PATH_CARE_PLANS_STATE_ZIP_FRAGMENT}
        hx-trigger="change from:input[data-google-address-inner]"
        hx-target={`#${LOCATION_FIELDS_TARGET_ID}`}
        hx-swap="innerHTML"
      >
        <GoogleAddressSearch
          {...CarePlansLocationConfig[CarePlansLocationKeys.city]}
          label={`${formData.careRecipientFirstName}'s City`}
          placeholder="City"
          error={errors?.city}
          value={formData?.city}
          enableRevalidation
        />
      </div>

      <div id={LOCATION_FIELDS_TARGET_ID}>
        <StateZipFields errors={errors} formData={formData} />
      </div>

      <ContactInfoSection>
        <Input
          {...CarePlansLocationConfig[CarePlansLocationKeys.primaryContactInfo]}
          value={formData?.primaryContactInfo}
          error={errors?.primaryContactInfo}
          enableRevalidation
        />
      </ContactInfoSection>
    </>
  );
};
