export function logApiResponse(name: string, data: any) {
  cy.writeFile(`cypress/results/api-${name}-${Date.now()}.json`, data);
}
