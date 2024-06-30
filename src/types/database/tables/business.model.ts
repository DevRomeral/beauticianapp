import { LanguageEnum } from '../enums/language-enum';

/**
 * Negocio o empresa que está registrada en la aplicación
 */
export interface Business {
  /**
   * Identificador único UUID de la empresa
   */
  id: string;
  /**
   * Correo principal de la empresa
   */
  email: string;
  /**
   * Contraseña pra el administrador de la empresa
   */
  password: string;
  /**
   * Zona horaria por defecto de los usuarios de este negocio
   */
  timezone: string;
  /**
   * Idioma por defecto para los usuarios
   */
  language: LanguageEnum;
}
