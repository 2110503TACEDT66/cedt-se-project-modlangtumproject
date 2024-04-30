describe('Test2 visit my web', () => {

  it('User2-1', () => {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/session");
    cy.visit("/job/create");
    cy.get("input[name=job_name]").type("FullStack Developer");
    cy.get("input[name=job_description]").type("FullStack Developer have to code all day");
    cy.get("input[name=salary]").type("100,000");  
    cy.get("select[name=company_id]").select("65e69f5471065fb8d0183510");
    cy.get("button").contains("Submit").click();
    cy.url().should("eq", "http://localhost:3000/company");
  })

})
