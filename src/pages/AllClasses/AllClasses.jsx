import { useQuery } from "@tanstack/react-query";
import { FaBookReader, FaDollarSign, FaUserGraduate } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";

const AllClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [userRole] = useUsers();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes");
      return res.json();
    },
  });

  const handleSelectClass = (classData) => {
    console.log(classData);
    if (user) {
      const classItem = {
        user_name: user.displayName,
        user_email: user.email,
        class_name: classData.class_name,
        image: classData.image,
        instructor_email: classData.instructor_email,
        instructor_name: classData.instructor_name,
        price: classData.price,
        class_id: classData._id,
      };
      axiosSecure.post("classes", classItem).then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item Selected Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please login to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="my-12">
      <h1 className="text-4xl font-bold text-center uppercase">
        Explore the Most <span className="text-primary">Popular Classes</span>
      </h1>
      <h3 className="text-lg font-medium text-center mt-3 mb-3">
        Join our highly sought-after classes and unlock your musical potential
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 justify-items-center">
        {classes.map((classData) => (
          <div
            key={classData._id}
            className={`${
              classData.total_seats - classData.total_enrolled_students
                ? "bg-base-100"
                : "bg-error text-base-100"
            } card card-compact w-96 shadow-xl mb-8`}
          >
            <figure>
              <img
                className="h-60 w-full"
                src={classData.image}
                alt={classData.class_name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{classData.class_name}</h2>
              <p className="flex items-center gap-2 font-medium text-md">
                <span className="flex items-center gap-2 font-bold">
                  <FaUserGraduate></FaUserGraduate>Instructor :
                </span>{" "}
                {classData.instructor_name}
              </p>
              <p className="flex items-center gap-2 font-medium text-md">
                <span className="flex items-center gap-2 font-bold">
                  <FaBookReader></FaBookReader> Available Seats :
                </span>{" "}
                {classData.total_seats - classData.total_enrolled_students}
              </p>
              <p className="flex items-center gap-2 font-medium text-md">
                <span className="flex items-center gap-2 font-bold">
                  <FaDollarSign></FaDollarSign> Price :
                </span>{" "}
                ${classData.price}
              </p>
              <button
                onClick={() => handleSelectClass(classData)}
                className="btn btn-primary mt-5"
                disabled={userRole !== "student"}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
