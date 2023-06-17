import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const classData = {
      class_name: data.class_name,
      image: data.image,
      instructor_name: user?.displayName,
      instructor_email: user?.email,
      total_seats: parseInt(data.available_seats),
      total_enrolled_students: 0,
      price: parseFloat(data.price),
      status: "pending"
    };
    axiosSecure.post("/add-class", classData).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Class Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-2/3">
      <h1 className="text-4xl font-bold text-center mb-8">Add A Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 mt-2 mb-3">
          <div>
            <label>
              <p className="text-md font-semibold">Class Name</p>
            </label>
            <input
              type="text"
              placeholder="Class Name"
              className="input input-bordered input-primary w-full"
              {...register("class_name", { required: true })}
            />
            {errors.class_name && (
              <span className="text-red-600">Class Name is required</span>
            )}
          </div>
          <div>
            <label>
              <p className="text-md font-semibold">Class Image</p>
            </label>
            <input
              type="file"
              placeholder="Class Image"
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
              value="Add Class"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
