import { useMutation } from "react-query"

import { api } from "../../../services/api";
import { SchedulePayload } from "../types";

const usePostSchedule = () => {
    return useMutation(
        (params: SchedulePayload) => api.post("/schedule", params),
      );
}

export default usePostSchedule