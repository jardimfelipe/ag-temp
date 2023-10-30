import { useContext, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import dayjs, { Dayjs } from "dayjs";

import { AccessTime, ChevronLeft, Close, Paid } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ContactButton from "../components/ContactButton";
import ContainedIconButton from "../components/ContainedIconButton";
import DaysButtons from "../components/DaysButtons";
import { AuthContext } from "../modules/auth/context/auth";
import { UserContextType } from "../modules/auth/types";
import BarbersList from "../modules/barbershop/components/BarbersList";
import HoursList from "../modules/barbershop/components/HoursList";
import LocationInfo from "../modules/barbershop/components/LocationInfo";
import { ServiceList } from "../modules/barbershop/components/ServiceList";
import useBarbershopByIdQuery from "../modules/barbershop/services/useBarberShopByIdQuery";
import useBarbershopServicesQuery from "../modules/barbershop/services/useBarbershopServicesQuery";
import usePostSchedule from "../modules/barbershop/services/usePostSchedule";
import { SchedulesQueryKeys } from "../modules/schedules/types";

type RouteParams = {
  barbershopId: string;
  serviceId?: string;
};

const CreateSchedule = () => {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const { user } = useContext(AuthContext) as UserContextType;
  const { barbershopId } = useParams<RouteParams>();

  const createSchedule = usePostSchedule();
  const { data: services = [] } = useBarbershopServicesQuery(
    barbershopId as string
  );
  const { data: barbershop } = useBarbershopByIdQuery(barbershopId);
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateIndex, setDateIndex] = useState<number | null>(null);
  const [barberId, setBarberId] = useState<string>("");
  const [time, setTime] = useState<string | null>(null);

  const selectedService = useMemo(() => {
    const serviceId = searchParams.get("serviceId");
    return services.find((service) => service.id === serviceId);
  }, [searchParams, services]);

  const showSubmitButton =
    !!searchParams.get("serviceId") && !!barberId && !!dateIndex;

  const goBack = () => {
    navigate("/feed");
  };

  const selectService = (serviceId: string) => {
    setSearchParams({ serviceId });
  };

  const nextSevenDays = [...new Array(7)].map((_, index) =>
    dayjs().add(index, "day")
  );

  const removeService = () => {
    setSearchParams("");
  };

  const setDate = (index: number | null) => {
    setDateIndex(index);
  };

  const setBarber = (barberId: string) => {
    setBarberId(barberId);
  };

  const handleHour = (hour: Dayjs | null) => {
    setTime(dayjs(hour).format("HH:mm"));
  };

  const getHourAsNumber = () => {
    const start = barbershop?.startTime || "09:00";
    const end = barbershop?.endTime || "21:00";

    return {
      start: +start.split(":")[0],
      end: +end.split(":")[0],
    };
  };

  const setSchedule = () => {
    if (!selectedService || !dateIndex || !barberId || !user || !time) return;
    const [hour, minute] = time.split(":");
    const dateWithHour = nextSevenDays[dateIndex].hour(+hour).minute(+minute);
    const model = {
      title: selectedService.name,
      start: nextSevenDays[dateIndex].hour(+hour).minute(+minute),
      end: dateWithHour.add(40, "m"),
      withServicesBarberId: selectedService.id,
      withUserClientId: user.id,
      withBarberId: barberId,
      withBarbershopId: barbershopId as string,
    };
    createSchedule.mutate(model, {
      onSuccess: () => {
        navigate("/feed");
        cache.invalidateQueries([SchedulesQueryKeys.SCHEDULES]);
        toast.success("Agendado com sucesso!");
      },
      onError: () => {
        toast.error("Ocorreu um erro, tente novamente!");
      },
    });
  };

  return (
    <Grid container gap={2} padding={2}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ContainedIconButton onClick={goBack}>
            <ChevronLeft />
          </ContainedIconButton>
          <Typography variant="body1">{barbershop?.name}</Typography>
          <ContactButton phone={""} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <LocationInfo barbershop={barbershop} />
      </Grid>
      {!searchParams.get("serviceId") ? (
        <Grid item xs={12}>
          <Stack gap={2}>
            <ServiceList
              barbershopId={barbershopId as string}
              onServiceSelect={selectService}
            />
          </Stack>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Card
              sx={{
                position: "relative",
                backgroundColor: "transparent",
                border: (theme) => `3px solid ${theme.palette.primary.dark}`,
              }}
            >
              <IconButton
                color="error"
                sx={{ position: "absolute", top: "-10px", right: "-10px" }}
                onClick={removeService}
              >
                <Close />
              </IconButton>
              <CardContent>
                <Typography variant="h5">{selectedService?.name}</Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {selectedService?.description}
                </Typography>
                <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
                  <Chip icon={<Paid />} label={`R$${selectedService?.price}`} />
                  <Chip
                    icon={<AccessTime />}
                    label={`${selectedService?.duration} mins`}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <DaysButtons
              selectedIndex={dateIndex}
              onSelect={setDate}
              days={nextSevenDays}
            />
          </Grid>
        </>
      )}
      {dateIndex !== null && !time ? (
        <HoursList
          startTime={getHourAsNumber().start}
          endTime={getHourAsNumber().end}
          onChange={handleHour}
        />
      ) : null}

      {time ? (
        <>
          <Chip color="primary" label={time} onDelete={() => setTime("")} />
          <BarbersList
            selectedBarberId={barberId}
            onSelect={setBarber}
            barbershopId={barbershopId as string}
          />
        </>
      ) : null}

      {showSubmitButton ? (
        <Grid item xs={12}>
          <LoadingButton
            onClick={setSchedule}
            variant="contained"
            loading={createSchedule.isLoading}
            fullWidth
            startIcon={<AccessTime />}
          >
            Agendar
          </LoadingButton>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default CreateSchedule;
