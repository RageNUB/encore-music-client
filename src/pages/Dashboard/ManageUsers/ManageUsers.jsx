import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = id => {
    const role = {
        role: "admin",
      };
      axiosSecure.put(`/manageUsers/${id}`, role).then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Role Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  }

  const handleMakeInstructor = id => {
    const role = {
        role: "instructor",
      };
      axiosSecure.put(`/manageUsers/${id}`, role).then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Role Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Users</h1>
      <div className="mt-8">
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 rounded-lg text-sm">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Upadate Role</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((userData, index) => (
                <tr key={userData._id} className="text-base">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={userData.image}
                            alt={userData.displayName}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{userData.name}</td>
                  <td className="font-medium">{userData.email}</td>
                  <th className="font-medium uppercase text-primary">
                    {userData.role}
                  </th>
                  <th className="font-medium flex gap-2">
                    <button
                      onClick={() => handleMakeAdmin(userData._id)}
                      disabled={userData.role === "admin"}
                      className="btn btn-primary btn-sm"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => handleMakeInstructor(userData._id)}
                      disabled={userData.role === "admin"}
                      className="btn btn-primary btn-sm"
                    >
                      Instructor
                    </button>
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

export default ManageUsers;
