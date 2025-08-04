export interface Reserva {
    tipoHabitacion: "standard" | "suite";
    pax: number;
    noches: number;
}

export const reservas: Reserva[] = [
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 3,
    },
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 4,
    },
    {
        tipoHabitacion: "suite",
        pax: 2,
        noches: 1,
    },
];