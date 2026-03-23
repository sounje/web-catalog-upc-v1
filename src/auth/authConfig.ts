/**
 * Configuración OIDC centralizada para AWS Cognito
 * Usa metadata explícita para evitar CORS al obtener openid-configuration
 */

const cognitoDomain =
  process.env.NEXT_PUBLIC_COGNITO_DOMAIN || process.env.REACT_APP_COGNITO_DOMAIN;
const authority =
  process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || process.env.REACT_APP_COGNITO_AUTHORITY;
const clientId =
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || process.env.REACT_APP_COGNITO_CLIENT_ID;
const redirectUri =
  process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || process.env.REACT_APP_COGNITO_REDIRECT_URI;

export const authConfig = {
  authority: authority || '',
  client_id: clientId || '',
  redirect_uri: redirectUri || (typeof window !== 'undefined' ? window.location.origin + '/' : ''),
  response_type: 'code' as const,
  scope: 'aws.cognito.signin.user.admin email openid profile',
  automaticSilentRenew: true,
  onSigninCallback: () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
  metadata: cognitoDomain
    ? {
        issuer: authority,
        authorization_endpoint: `${cognitoDomain}/oauth2/authorize`,
        token_endpoint: `${cognitoDomain}/oauth2/token`,
        userinfo_endpoint: `${cognitoDomain}/oauth2/userInfo`,
        end_session_endpoint: `${cognitoDomain}/logout`,
        jwks_uri: authority ? `${authority}/.well-known/jwks.json` : undefined,
      }
    : undefined,
};
