import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: classesData = [] } = useQuery({
    queryKey: ["my-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myClasses?email=${user?.email}`
      );
      return res.data;
    },
  });
  
  return (
    <div className="w-full">
        <Helmet>
        <title>Encore Music Academy | My Classes</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">My Classes</h1>
      <div className="mt-8">
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 rounded-lg text-sm">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Enrolled Students</th>
                <th>Feedback</th>
                <th>Update</th>
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
                  <td className="font-medium">${classData.price}</td>
                  <th className="font-medium">{classData.status}</th>
                  <th className="font-medium">{classData.total_enrolled_students}</th>
                  <th className="font-medium text-xs">{classData.feedback}</th>
                  { classData.status !== "denied" && <th><Link to={`/dashboard/update-class/${classData._id}`}><button className="btn btn-ghost btn-xs">Update</button></Link></th>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
