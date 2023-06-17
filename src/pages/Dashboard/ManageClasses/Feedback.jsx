import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Feedback = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loadedData = useLoaderData();
  console.log(loadedData);

  const onSubmit = (data) => {
    const feedback = {
        feedback: data.feedback
    };
    axiosSecure.put(`/feedback/${loadedData._id}`, feedback).then((data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback Send Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">
        Send Your Feedback for{" "}
        <span className="text-primary">{loadedData.class_name}</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="Type your feedback here"
          className="textarea textarea-bordered textarea-primary textarea-sm w-full max-w-lg"
          {...register("feedback", { required: true })}
        ></textarea>
        {errors.feedback && (
          <span className="text-red-600">Class Name is required</span>
        )}

        <input
          className="btn btn-primary btn-wide"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
};

export default Feedback;
