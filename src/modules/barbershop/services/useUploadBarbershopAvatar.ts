import { useMutation, useQueryClient } from "react-query"

import { api } from "../../../services/api";
import { BarbershopQueryKeys, UploadAvatarPayload } from "../types";

const useUploadBarbershopAvatar = () => {
  const cache = useQueryClient();
    return useMutation(
        async (params: UploadAvatarPayload) => {
          const {image, barbershopId} = params
          const formData = new FormData();
          formData.append("file", image);
          await api.patch(`/barbershop/avatar/${barbershopId}`, formData)
        },
        {onSuccess: () => {
          cache.invalidateQueries(BarbershopQueryKeys.BARBERSHOP)
        }}
      );
}

export default useUploadBarbershopAvatar