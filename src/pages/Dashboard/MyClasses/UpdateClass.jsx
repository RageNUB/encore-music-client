import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateClass = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const updatedClass = {
        image: data.image,
        total_seats: data.available_seats,
        price: data.price
    }
    axiosSecure.put(`/myClasses/${loadedData._id}`, updatedClass).then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Class Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  return (
    <div className="w-2/3">
        <Helmet>
        <title>Encore Music Academy | Update Class</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">Update <span className="text-primary">{loadedData.class_name}</span></h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 mt-2 mb-3">
          <div>
            <label>
              <p className="text-md font-semibold">Class Name</p>
            </label>
            <input
              type="text"
              placeholder="Class Name"
              defaultValue={loadedData.class_name}
              className="input input-bordered input-primary w-full"
              disabled
            />
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Class Image URL</p>
            </label>
            <input
              type="text"
              placeholder="Class Image URL"
              className="file-input file-input-bordered file-input-primary w-full"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-600">Image is required</span>
            )}
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Instructor Name</p>
            </label>
            <input
              type="text"
              placeholder="Instructor Name"
              defaultValue={user?.displayName}
              className="input input-bordered input-primary w-full"
              disabled
            />
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Instructor Email</p>
            </label>
            <input
              type="email"
              placeholder="Instructor Email"
              defaultValue={user?.email}
              className="input input-bordered input-primary w-full"
              disabled
            />
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Available Seats</p>
            </label>
            <input
              type="text"
              placeholder="Available Seats"
              defaultValue={loadedData.total_seats}
              className="input input-bordered input-primary w-full"
              {...register("available_seats", { required: true })}
            />
            {errors.available_seats && (
              <span className="text-red-600">Available Seats is required</span>
            )}
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Price</p>
            </label>
            <input
              type="text"
              name="price"
              placeholder="Price-$"
              defaultValue={loadedData.price}
              className="input input-bordered input-primary w-full"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-600">Price is required</span>
            )}
          </div>
          <label className="col-span-2">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Update Class"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
