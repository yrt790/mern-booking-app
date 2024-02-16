import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    //Watch the video form guest
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 bg-gray-400 gap-3">
        <label className="flex flex-col min-w-full px-5 py-10">
          Adults
          <input
            type="number"
            min={1}
            className="rounded-sm px-2"
            {...register('adultCount', {
              required: 'This field is required',
              min: 1,
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex flex-col min-w-full px-5 py-10">
          Children
          <input
            type="number"
            min={0}
            className="rounded-sm px-2"
            {...register('childCount', {
              required: 'This field is required',
              min: 0
            })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestsSection;
