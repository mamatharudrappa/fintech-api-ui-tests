export function getAuthHeader() {
  const token = Cypress.env("AUTH_TOKEN") || "qa-token-123";
  return { Authorization: `Bearer ${token}` };
}
