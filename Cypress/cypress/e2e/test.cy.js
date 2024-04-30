describe('Test visit my web', () => {
  it('User1-1', () => {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("pppp@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/user");
    cy.visit("/user/edit");
    cy.get("input[id=username]").type("p1");
    cy.get("input[id=password]").type("123456");
    cy.get("button").contains("Save").click();
  })

  it('User1-3', () => {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("pppp@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/company");
    cy.visit("/company/65e3428465164ca39be76934");
    cy.get("button").contains("View Available Job").click();
    cy.get("button").contains("Apply").click();
  })

  it('User2-1', ()=> {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq","http://localhost:3000/");
    cy.visit()
  })

  it('User2-3', () => {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("pppp@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/company");
    cy.visit("/company/65e3428465164ca39be76934");
    cy.get("button").contains("View Available Job").click();

  })

  it('User2-2', ()=> {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq","http://localhost:3000/");
    cy.visit("/company");
    cy.visit("/company/65e3428465164ca39be76934");
    cy.get("button").contains("View Available Job").click();
    cy.get("button").contains("Delete").click();
  })
})