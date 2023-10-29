import { useMutation } from "react-query"

import { SchedulePayload } from "../types";
import { api } from "../../../services/api";

const usePostSchedule = () => {
    return useMutation(
        (params: SchedulePayload) => api.post("/schedule", params),
      );
}

export default usePostSchedule