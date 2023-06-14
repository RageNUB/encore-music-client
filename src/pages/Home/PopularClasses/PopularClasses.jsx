import { useQuery } from "@tanstack/react-query";
import { FaBookReader, FaDollarSign, FaUserGraduate } from "react-icons/fa";

const PopularClasses = () => {
  const { isLoading, data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes");
      return res.json();
    },
  });
  console.log(isLoading, classes.slice(0, 6));

  return (
    <div className="my-12">
      <h1 className="text-4xl font-bold text-center uppercase">
        Explore the Most <span className="text-primary">Popular Classes</span>
      </h1>
      <h3 className="text-lg font-medium text-center mt-3 mb-3">Join our highly sought-after classes and unlock your musical potential</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {classes.slice(0, 6).map((classData) => (
          <div
            key={classData._id}
            className="card card-compact w-96 bg-base-100 shadow-xl mb-8"
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
                  <FaBookReader></FaBookReader> Student Enrolled :
                </span>{" "}
                {classData.total_enrolled_students}
              </p>
              <p className="flex items-center gap-2 font-medium text-md">
                <span className="flex items-center gap-2 font-bold">
                  <FaDollarSign></FaDollarSign> Price :
                </span>{" "}
                ${classData.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
