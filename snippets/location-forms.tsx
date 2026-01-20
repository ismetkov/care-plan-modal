/**
 * Location Forms - In-Home vs Video Visit
 */

// components/
//   care-plan-steps/
//     location-step/
//       LocationStep.tsx          # Main component with isInHome conditional
//       InHomeForm.tsx            # In-home visit form
//       VideoForm.tsx             # Video visit form
//       LocationFields/
//         InHomeLocationFields.tsx   # HTMX fragment: City + State + ZIP
//         VideoLocationFields.tsx    # HTMX fragment: State + ZIP
//         constants.ts               # LOCATION_FIELDS_TARGET_ID, paths

const LOCATION_FIELDS_TARGET_ID = "location-fields-dynamic";

// ============================================================
// IN-HOME VISIT FORM
// ============================================================
{
  isInHome ? (
    <>
      <div
        hx-post={PATH_CARE_PLANS_IN_HOME_LOCATION_FIELDS_FRAGMENT}
        hx-trigger="change from:input[data-google-address-inner]"
        hx-target={`#${LOCATION_FIELDS_TARGET_ID}`}
        hx-swap="innerHTML"
      >
        <GoogleAddressSearch
          {...CarePlansLocationConfig[
            CarePlansLocationKeys.careRecipientAddress
          ]}
          label={`${formData.careRecipientFirstName}'s address`}
          placeholder="Address"
          error={errors?.careRecipientAddress}
          value={careRecipientAddress}
          enableRevalidation
        />
      </div>

      <Input
        {...CarePlansLocationConfig[
          CarePlansLocationKeys.careRecipientAddress2
        ]}
        value={careRecipientAddress2}
        error={errors?.careRecipientAddress2}
        enableRevalidation
      />

      {/* Returns: City + State + ZIP */}
      <div id={LOCATION_FIELDS_TARGET_ID}>
        <InHomeLocationFields errors={errors} formData={formData} />
      </div>

      <ContactInfoSection>
        <Input
          {...CarePlansLocationConfig[CarePlansLocationKeys.primaryContactInfo]}
          value={primaryContactInfo}
          error={errors?.primaryContactInfo}
          enableRevalidation
        />
      </ContactInfoSection>
    </>
  ) : (
    // ============================================================
    // VIDEO VISIT FORM
    // ============================================================
    <>
      <div
        hx-post={PATH_CARE_PLANS_VIDEO_LOCATION_FIELDS_FRAGMENT}
        hx-trigger="change from:input[data-google-address-inner]"
        hx-target={`#${LOCATION_FIELDS_TARGET_ID}`}
        hx-swap="innerHTML"
      >
        <GoogleAddressSearch
          {...CarePlansLocationConfig[CarePlansLocationKeys.city]}
          label={`${formData.careRecipientFirstName}'s City`}
          placeholder="City"
          error={errors?.city}
          value={city}
          enableRevalidation
        />
      </div>

      {/* Returns: State + ZIP only */}
      <div id={LOCATION_FIELDS_TARGET_ID}>
        <VideoLocationFields errors={errors} formData={formData} />
      </div>

      <ContactInfoSection>
        <Input
          {...CarePlansLocationConfig[CarePlansLocationKeys.primaryContactInfo]}
          value={primaryContactInfo}
          error={errors?.primaryContactInfo}
          enableRevalidation
        />
      </ContactInfoSection>
    </>
  );
}

// ============================================================
// HTMX FRAGMENT: IN-HOME (City + State + ZIP)
// ============================================================
const InHomeLocationFields = ({ errors, formData }) => {
  return (
    <>
      <Input
        {...CarePlansLocationConfig[CarePlansLocationKeys.city]}
        label={`${formData.careRecipientFirstName}'s City`}
        placeholder="City"
        value={formData?.city}
        error={errors?.city}
        enableRevalidation
      />

      <div className="flex gap-4 md:gap-6">
        <div className="flex-1">
          <Select
            {...CarePlansLocationConfig[CarePlansLocationKeys.state]}
            value={formData?.state}
            error={errors?.state}
            id={CarePlansLocationConfig.state.id}
            options={CarePlansLocationConfig.state.options!}
            enableRevalidation
          />
        </div>
        <div className="flex-1">
          <Input
            {...CarePlansLocationConfig[CarePlansLocationKeys.zipCode]}
            value={formData?.zipCode}
            error={errors?.zipCode}
            enableRevalidation
          />
        </div>
      </div>
    </>
  );
};

// ============================================================
// HTMX FRAGMENT: VIDEO (State + ZIP only)
// ============================================================
const VideoLocationFields = ({ errors, formData }) => {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex-1">
        <Select
          {...CarePlansLocationConfig[CarePlansLocationKeys.state]}
          value={formData?.state}
          error={errors?.state}
          id={CarePlansLocationConfig.state.id}
          options={CarePlansLocationConfig.state.options!}
          enableRevalidation
        />
      </div>
      <div className="flex-1">
        <Input
          {...CarePlansLocationConfig[CarePlansLocationKeys.zipCode]}
          value={formData?.zipCode}
          error={errors?.zipCode}
          enableRevalidation
        />
      </div>
    </div>
  );
};
