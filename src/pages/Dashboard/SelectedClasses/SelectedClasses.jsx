import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SelectedClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    data: classesData = [],
    refetch,
  } = useQuery({
    queryKey: ["selected-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/selectedClasses?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-error ml-4 text-white",
          cancelButton: "btn btn-success",
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            const res = axiosSecure.delete(`/classes/${id}`)
            console.log(res)
            refetch();
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your selected class has been deleted.",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Cancelled Successfully",
              "error"
            );
          }
        });
  }

  return (
    <div className="w-full">
        <Helmet>
        <title>Encore Music Academy | Selected Classes</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center">My Selected Classes</h1>
      <div className="mt-8">
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 rounded-lg text-sm">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {classesData.map((classData, index) => (
                <tr key={classData._id} className="text-base">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={classData.image}
                            alt={classData.class_name}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{classData.class_name}</td>
                  <td>{classData.instructor_name}</td>
                  <td className="font-medium">${classData.price}</td>
                  <td>{classData.user_email}</td>
                  <th>
                    <button onClick={() => handleDelete(classData._id)} className="btn btn-ghost btn-xs">Delete</button>
                  </th>
                  <th>
                    <Link to={`payment/${classData._id}`}><button className="btn btn-ghost btn-xs">Pay</button></Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelectedClasses;
