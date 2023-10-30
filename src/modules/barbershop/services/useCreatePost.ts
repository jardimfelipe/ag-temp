import { useMutation, useQueryClient } from "react-query"

import { api } from "../../../services/api";
import { BarbershopQueryKeys, UploadAvatarPayload } from "../types";

const useCreatePost = () => {
  const cache = useQueryClient();
    return useMutation(
        async (params: UploadAvatarPayload) => {
          const {image, barbershopId} = params
          const formData = new FormData();
          formData.append("file", image);
          await api.post(`/barbershop/post/${barbershopId}`, formData)
        },
        {onSuccess: () => {
          cache.invalidateQueries(BarbershopQueryKeys.BARBERSHOP)
        }}
      );
}

export default useCreatePost