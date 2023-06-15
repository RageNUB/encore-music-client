import { useQuery } from "@tanstack/react-query";

const PopularInstructor = () => {
  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/instructors");
      return res.json();
    },
  });

  return (
    <div className="my-12">
      <h1 className="text-4xl font-bold text-center uppercase">
        Meet Our Highly{" "}
        <span className="text-primary">Acclaimed Instructors</span>
      </h1>
      <h3 className="text-lg font-medium text-center mt-3 mb-3">
        Learn from the best in the field and be inspired by their expertise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {instructors.slice(0, 6).map((instructor) => (
          <div
            key={instructor._id}
            className="card card-compact w-96 bg-base-100 shadow-xl mt-8"
          >
            <figure>
              <img
                className="h-60 w-full"
                src={instructor.instructor_image}
                alt={instructor.instructor_name}
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="text-2xl font-semibold">
                {instructor.instructor_name}
              </h2>
              <h2 className="text-base font-medium">
                {instructor.instructor_email}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;