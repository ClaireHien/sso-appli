
import { environment as local } from './environment.development';

export const environment = {
  ...local,
  // Autres configurations spécifiques au développement ici
  production: false,
  backendUrl: 'http://sso-api.test/api'

  //production: true,
  //backendUrl: 'https://sso-api.nhei.fr/api'
};