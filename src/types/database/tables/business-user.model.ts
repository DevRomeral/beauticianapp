import { RolEnum } from '../enums/rol-enum';

/**
 * Usuario que ingresará a la aplicación
 */
export interface BusinessUser {
  /**
   * Identificador único UUID del registro
   */
  id: string;
  /**
   * ID del usuario
   */
  userId: string;
  /**
   * ID del negocio al que pertenece
   */
  businessId: string;
  /**
   * Fecha en la que el usuario se relacionó con la empresa
   */
  created: Date;
  /**
   * Rol del usuario en la aplicación para esta empresa
   */
  rol: RolEnum;
}
