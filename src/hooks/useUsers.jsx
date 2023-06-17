import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: userRole, isLoading: isLoading} = useQuery({
        queryKey: ['users-role', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role?email=${user?.email}`);
            return res.data.userRole;
        }
    })
    return [userRole, isLoading]
};

export default useUsers;