import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: classesData = [], refetch } = useQuery({
    queryKey: ["manage-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manageClasses`);
      return res.data;
    },
  });

  const handleApprove = (id) => {
    const status = {
      status: "approved",
    };
    axiosSecure.put(`/manageClasses/${id}`, status).then((data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Status Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleDeny = (id) => {
    const status = {
      status: "denied",
    };
    axiosSecure.put(`/manageClasses/${id}`, status).then((data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Status Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Classes</h1>
      <div className="mt-8">
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 rounded-lg text-sm">
              <tr>
                <th>Photo</th>
                <th>Class Name</th>
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classesData.map((classData) => (
                <tr key={classData._id} className="text-base">
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
                  <td className="font-medium">{classData.instructor_name}</td>
                  <th className="font-medium">{classData.instructor_email}</th>
                  <th className="font-medium">
                    {classData.total_seats - classData.total_enrolled_students}
                  </th>
                  <th className="font-medium">${classData.price}</th>
                  <th className="font-medium">{classData.status}</th>
                  <th className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(classData._id)}
                      disabled={classData.status !== "pending"}
                      className="btn btn-primary btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(classData._id)}
                      disabled={classData.status !== "pending"}
                      className="btn btn-primary btn-xs"
                    >
                      Denied
                    </button>
                    {classData.status === "denied" && (
                      <Link to={`/dashboard/feedback/${classData._id}`}>
                        <button className="btn btn-primary btn-xs">
                          Feedback
                        </button>
                      </Link>
                    )}
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

export default ManageClasses;
