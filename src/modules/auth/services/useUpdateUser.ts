import { useMutation } from "react-query"

import { api } from "../../../services/api";
import { UserPayload } from "../types";

const useUpdateUser = () => {
    return useMutation(
        (params: UserPayload) => api.patch(`user/${params.id}`, params),
      );
}

export default useUpdateUser