
import { environment as local } from './environment.development';

export const environment = {
  ...local,
  // Autres configurations spécifiques au développement ici
  //production: false,
  //backendUrl: 'http://soul-spirit-api.test/api'

  production: true,
  backendUrl: 'https://soul-spirit-api.nhei.fr/api'
};