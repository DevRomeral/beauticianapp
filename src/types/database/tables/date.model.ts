/**
 * Citas asignadas a clientes
 */
export interface Date {
  /**
   * Identificador único UUID de la cita
   */
  id: string;
  /**
   * Producto o servicio aplicado en la cita
   */
  productId: string;
  /**
   * ID del negocio donde está asignada
   */
  businessId: string;
  /**
   * Precio (en céntimos) asignado a la cita
   */
  price: number;
  /**
   * Fecha en la que se asignó a la cita
   */
  dateTime: Date;
}
