/**
 * HTMX Fragment: City + State + ZIP
 * Used by In-Home Visit - gets swapped in when address is selected
 */

const CityStateZipFields = ({ errors, formData }) => {
  return (
    <>
      <Input
        {...CarePlansLocationConfig[CarePlansLocationKeys.city]}
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
