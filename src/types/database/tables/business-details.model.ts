/**
 * Detalles de un negocio
 */
export interface BusinessDetails {
  /**
   * Identificador único UUID del registro
   */
  id: string;
  /**
   * Identificador del negocio
   */
  businessId: string;
  /**
   * CIF de la empresa
   */
  cif: number;
  /**
   * Dirección física del local
   */
  address: string;
}
