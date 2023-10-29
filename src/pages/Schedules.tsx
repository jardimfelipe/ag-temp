import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../modules/auth/context/auth";
import { UserContextType, UserPrivileges } from "../modules/auth/types";
import useSchedulesQuery from "../modules/schedules/services/useSchedulesQuery";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  PersonOutline,
  Phone,
  CopyAll,
  Storefront,
  Streetview,
  EventBusy,
} from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import EmptyState from "../components/EmptyState";
import { NavLink } from "react-router-dom";

dayjs.extend(isBetween);

const { EmptyStateContainer, EmptyStateIcon, EmptyStateMessage } = EmptyState;

const Schedules = () => {
  const { user } = useContext(AuthContext) as UserContextType;
  const [filter, setFilter] = useState<"today" | "tomorrow" | "week" | "">("");
  const queryId =
    user?.privilege === UserPrivileges.MANAGER
      ? user?.manager.barbershopId
      : user?.id;

  const {
    data = [],
    isLoading,
    isFetched,
  } = useSchedulesQuery(queryId, user?.privilege as UserPrivileges);

  const filteredData = useMemo(() => {
    if (!filter) return data;
    if (filter === "today") {
      return data.filter(
        ({ start }) => dayjs(start).format("DD/MM") === dayjs().format("DD/MM")
      );
    }
    if (filter === "tomorrow") {
      return data.filter(
        ({ start }) =>
          dayjs(start).format("DD/MM") === dayjs().add(1, "d").format("DD/MM")
      );
    }
    if (filter === "week") {
      const date = dayjs().add(7, "d");
      return data.filter(({ start }) => dayjs(start).isBetween(dayjs(), date));
    }
    return data;
  }, [data, filter]);

  const formatHour = (date: Dayjs) => {
    return dayjs(date).format("HH:mm");
  };

  const copyToClipboard = (arg: string) => {
    navigator.clipboard.writeText(arg);
    toast.info("Copiado para área de transferência");
  };

  return (
    <Grid container gap={2} padding={2}>
      <Loader open={isLoading} />
      <Grid item xs={12}>
        <Typography variant="h6">Agendamentos</Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" gap={2} justifyContent="center">
          <Button
            onClick={() => setFilter("today")}
            variant={filter === "today" ? "contained" : "outlined"}
          >
            Hoje
          </Button>
          <Button
            onClick={() => setFilter("tomorrow")}
            variant={filter === "tomorrow" ? "contained" : "outlined"}
          >
            Amanhã
          </Button>
          <Button
            onClick={() => setFilter("week")}
            variant={filter === "week" ? "contained" : "outlined"}
          >
            Essa semana
          </Button>
        </Stack>
      </Grid>

      {isFetched && !filteredData.length ? (
        <Grid item xs={12}>
          <EmptyStateContainer>
            <EmptyStateIcon icon={EventBusy} />
            <EmptyStateMessage message="Ainda não há agendamentos" />
          </EmptyStateContainer>
        </Grid>
      ) : (
        <>
          {filteredData
            .sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf())
            .map((schedule) => (
              <Grid key={schedule.id} xs={12} item>
                <Card sx={{ borderRadius: "20px" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography>
                        {dayjs(schedule.start).format("DD/MM")} -{" "}
                        {schedule.title}
                      </Typography>

                      <Typography color="text.secondary" variant="subtitle2">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <AccessTime /> {formatHour(schedule.start)} -{" "}
                          {formatHour(schedule.end)}
                        </Box>
                      </Typography>

                      <Typography color="text.secondary" variant="subtitle2">
                        {user?.manager ? (
                          <Stack direction="row" gap={1} alignItems="center">
                            <PersonOutline />
                            {schedule.withUserClient.name}
                          </Stack>
                        ) : (
                          <Stack direction="row" gap={1} alignItems="center">
                            <Storefront />
                            <Link
                              component={NavLink}
                              to={`/barbearia/${schedule.withBarbershop.id}`}
                            >
                              {schedule.withBarbershop.name}
                            </Link>
                          </Stack>
                        )}
                      </Typography>
                      <Typography color="text.secondary" variant="subtitle2">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Phone /> {schedule.withUserClient.contact}
                          <IconButton
                            size="small"
                            onClick={() =>
                              copyToClipboard(schedule.withUserClient.contact)
                            }
                          >
                            <CopyAll color="disabled" />
                          </IconButton>
                        </Box>
                      </Typography>
                      {user?.privilege === UserPrivileges.CLIENT ? (
                        <Typography color="text.secondary" variant="subtitle2">
                          <Stack direction="row" gap={1} alignItems="center">
                            <Streetview />
                            {schedule.withBarbershop.address}
                          </Stack>
                        </Typography>
                      ) : null}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </>
      )}
    </Grid>
  );
};

export default Schedules;
