import { useContext } from "react";
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";

import { AxiosResponse } from "axios";

import { api } from "../../../services/api";
import { saveState } from "../../../utils/localStorage";
import { AuthContext } from "../context/auth";
import { LoginPayload, UserContextType, UserPrivileges } from "../types";


const FEED_USER_PRIVILEGES = [
  UserPrivileges.ADMIN,
  UserPrivileges.CLIENT,
];

const useLogin = () => {
  const navigate = useNavigate()
  const {insertUser} = useContext(AuthContext) as UserContextType
    return useMutation(
        (params: LoginPayload) => api.post("login/client", params),
        {
          onSuccess: async (response) => {
            const {data}:AxiosResponse<UserPrivileges> = await api.get("login/get/privilege", {
                headers: {
                    Authorization: response.data.token,
                },
            })
            const user = {...response.data.user, privilege: data}

            saveState("token", response.data.token)
            insertUser(user)

            if (FEED_USER_PRIVILEGES.includes(data)) {
              navigate("/feed");
              return data;
            }

            if(data === UserPrivileges.MANAGER) {
              navigate(`/barbearia/${user.manager.barbershopId}`)
              return data
            }

            if(data === UserPrivileges.ADMIN) {
              navigate(`/admin`)
              return data
            }

            navigate("/meu-perfil");
            return data
          },
        }
      );
}

export default useLogin