import { useHistory } from 'react-router-dom';
import { DevError } from '../../utils/errors';
import { routeMapping, RouteName } from './routes';

function applyParameters(route: string, params: { [key: string]: string }) {
  const routeParts = route.split('/');
  const parameterized = [];

  for (const routePart of routeParts) {
    const replacement =
      routePart[0] !== ':' ? routePart : params[routePart.slice(1)];

    if (replacement === undefined)
      throw new Error(
        `Param for ${routePart} not given. Given params: ${params}`
      );
    parameterized.push(replacement);
  }
  return parameterized.join('/');
}

function useNavigate(pageName: RouteName, navigationType: 'push' | 'replace') {
  const route = routeMapping[pageName];
  if (!route) throw new DevError(`No such page name ${pageName}`);
  const history = useHistory();
  return (params = {}, state = {}) =>
    history[navigationType](applyParameters(route, params), state);
}

function useRedirect(pageName: RouteName) {
  return useNavigate(pageName, 'push');
}

function useReplace(pageName: RouteName) {
  return useNavigate(pageName, 'replace');
}

export { useRedirect, useReplace, routeMapping };
