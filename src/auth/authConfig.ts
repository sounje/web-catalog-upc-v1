/**
 * Configuración OIDC centralizada para AWS Cognito.
 * Requerido por react-oidc-context: onSigninCallback limpia code/state de la URL tras el login.
 *
 * IMPORTANTE: Se usa metadata explícita para evitar CORS al obtener openid-configuration
 * desde cognito-idp (no permite peticiones desde el navegador).
 * Los endpoints de token/authorize están en el dominio de Cognito Hosted UI que sí soporta CORS.
 */

const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
const authority = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY;

export const authConfig = {
  authority: authority ?? '',
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
  redirect_uri:
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI ??
    (typeof window !== 'undefined' ? `${window.location.origin}/` : ''),
  response_type: 'code' as const,
  scope: 'aws.cognito.signin.user.admin email openid profile',
  automaticSilentRenew: true,
  onSigninCallback: () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
  // Metadata explícita para evitar fetch a cognito-idp (CORS)
  metadata:
    cognitoDomain && authority
      ? {
          issuer: authority,
          authorization_endpoint: `${cognitoDomain}/oauth2/authorize`,
          token_endpoint: `${cognitoDomain}/oauth2/token`,
          userinfo_endpoint: `${cognitoDomain}/oauth2/userInfo`,
          end_session_endpoint: `${cognitoDomain}/logout`,
          jwks_uri: `${authority}/.well-known/jwks.json`,
        }
      : undefined,
};
