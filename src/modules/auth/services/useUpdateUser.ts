import { useMutation } from "react-query"

import { UserPayload } from "../types";
import { api } from "../../../services/api";

const useUpdateUser = () => {
    return useMutation(
        (params: UserPayload) => api.patch(`user/${params.id}`, params),
      );
}

export default useUpdateUser