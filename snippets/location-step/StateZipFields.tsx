/**
 * HTMX Fragment: State + ZIP
 * Used by Video Visit - gets swapped in when city is selected
 */

const StateZipFields = ({ errors, formData }) => {
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
