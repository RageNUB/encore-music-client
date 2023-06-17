import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure();
  const {
    data: classesData = [],
  } = useQuery({
    queryKey: ["enrolled-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolledClasses?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="w-full">
        <Helmet>
        <title>Encore Music Academy | Enrolled Classes</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">
        My Enrolled Classes
      </h1>
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
                            alt={classData.item_name}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{classData.item_name}</td>
                  <td>{classData.instructor_name}</td>
                  <td className="font-medium">${classData.price}</td>
                  <td>{classData.user_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClasses;
