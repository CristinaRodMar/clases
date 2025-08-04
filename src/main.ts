import { Reserva } from "./modelo";

const iva = 1.21;
const personaAdicional = 40; 
const descuentoTourOperador = 0.85; 

class ImporteReserva {
    reservas: Reserva[];
    precioStandard: number;
    precioSuite: number;

    constructor(reservas: Reserva[], precioStandard: number, precioSuite: number) {
        this.reservas = reservas;
        this.precioStandard = precioStandard;
        this.precioSuite = precioSuite;
}

precioPorTipoHabitacion(tipoHabitacion: string): number {
    return tipoHabitacion.toLowerCase() === "standard" ? this.precioStandard : this.precioSuite;
}

precioPorPersonaAdicional(reserva: Reserva): number {
    const { pax } = reserva;
    return pax > 1 ? (pax - 1) * personaAdicional : 0;
}

calcularSubtotal(): number {
    let subtotal = 0;

    this.reservas.forEach((reserva) => {
        const precioHabitacion = this.precioPorTipoHabitacion(reserva.tipoHabitacion);
        const precioPersona = this.precioPorPersonaAdicional(reserva);
        const precioNoche = precioHabitacion + precioPersona;
        subtotal += precioNoche * reserva.noches;
    });

    return Number(subtotal.toFixed(2));
}

calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    return Number((subtotal * iva).toFixed(2));
    }
}

// Caso 1: Cliente Particular
class ImporteReservaClienteParticular extends ImporteReserva {
    constructor(reservas: Reserva[]) {
    super(reservas, 100, 150); 
    }
}

// Caso 2: Tour Operador
class ImporteReservaTourOperador extends ImporteReserva {
    constructor(reservas: Reserva[]) {
    super(reservas, 100, 100); // Todas las habitaciones a 100€
    }

    calcularSubtotal(): number {
    let subtotal = 0;

    this.reservas.forEach((reserva) => {
        const precioHabitacion = this.precioPorTipoHabitacion(reserva.tipoHabitacion);
        const precioPersona = this.precioPorPersonaAdicional(reserva);
        const precioNoche = precioHabitacion + precioPersona;
        subtotal += precioNoche * reserva.noches;
    });

    return Number((subtotal * descuentoTourOperador).toFixed(2));
    }
}

// Ejemplo de uso
const reservas: Reserva[] = [
  { tipoHabitacion: "standard", noches: 2, pax: 2 }, // 2 noches, 2 personas: (100 + 40) * 2 = 280€
  { tipoHabitacion: "suite", noches: 1, pax: 3 },   // 1 noche, 3 personas: (150 + 80) = 230€
];

// Cliente Particular
const calcularImporteParticular = new ImporteReservaClienteParticular(reservas);
const subtotalParticular = calcularImporteParticular.calcularSubtotal();
const totalParticular = calcularImporteParticular.calcularTotal();
console.log(`Subtotal Cliente Particular: ${subtotalParticular}€`);
console.log(`Total Cliente Particular (con IVA): ${totalParticular}€`);

// Tour Operador
const calcularImporteTourOperador = new ImporteReservaTourOperador(reservas);
const subtotalTourOperador = calcularImporteTourOperador.calcularSubtotal();
const totalTourOperador = calcularImporteTourOperador.calcularTotal();
console.log(`Subtotal Tour Operador: ${subtotalTourOperador}€`);
console.log(`Total Tour Operador (con IVA): ${totalTourOperador}€`);