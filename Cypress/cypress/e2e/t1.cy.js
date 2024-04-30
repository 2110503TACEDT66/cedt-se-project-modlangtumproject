describe('Test1 visit my web', () => {
  it('User1-1', () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/auth/login");
    cy.wait(500);
    cy.get("input[name=email]").type("pppp@gmail.com");
    cy.wait(500);
    cy.get("input[name=password]").type("123456");
    cy.wait(500);
    cy.get("button").contains("Sign in with Credentials").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/");
    cy.wait(500);
    cy.visit("/user");
    cy.wait(500);
    cy.visit("/user/edit");
    cy.wait(500);
    cy.get("input[id=username]").type("p1");
    cy.wait(500);
    cy.get("input[id=password]").type("123456");
    cy.wait(500);
    cy.get("button").contains("Save").click();

  })

  it('User1-2', () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/auth/register");
    cy.wait(500);
    cy.get("input[name=name]").type("GemKa3");
    cy.wait(500);
    cy.get("input[name=email]").type("gemKaa3@gmail.com");
    cy.wait(500);
    cy.get("input[name=tel]").type("0019283749");
    cy.wait(500);
    cy.get("input[name=password]").type("123456");
    cy.wait(500);
    cy.get("input[name=confirmPassword]").type("123456");
    cy.wait(500);
    cy.get("input[id=remember]").click();
    cy.wait(500);
    cy.get("button").contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/api/auth/signin");
    cy.get("input[name=email]").type("gemKaa3@gmail.com");
    cy.wait(500);
    cy.get("input[name=password]").type("123456");
    cy.wait(500);
    cy.get("button").contains("Sign in with Credentials").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/user");
    cy.wait(500);
    cy.visit("/user/security");
    cy.wait(500);
    cy.get("button").contains("Delete User").click();
    cy.visit("/");

  })
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


  it('User2-2', ()=> {
      cy.visit("/");
      cy.wait(500);
      cy.visit("/auth/login");
      cy.wait(500);
      cy.get("input[name=email]").type("admin@gmail.com");
      cy.wait(500);
      cy.get("input[name=password]").type("123456");
      cy.wait(500);
      cy.get("button").contains("Sign in with Credentials").click();
      cy.wait(500);
      cy.url().should("eq","http://localhost:3000/");
      cy.wait(500);
      cy.visit("/company");
      cy.wait(500);
      const companyId = '65e69f5471065fb8d0183510';
      cy.wait(500);
          cy.get(`[data-testid="${companyId}"]`).click();
          cy.wait(500);
      cy.get("button").contains("View Available Job").click();
      cy.wait(500);
      cy.get("button").contains("Delete").click();

    })
  
    it('User2-3', () => {
      cy.visit("/");
      cy.wait(500);
      cy.visit("/auth/login");
      cy.wait(500);
      cy.get("input[name=email]").type("pppp@gmail.com");
      cy.wait(500);
      cy.get("input[name=password]").type("123456");
      cy.wait(500);
      cy.get("button").contains("Sign in with Credentials").click();
      cy.wait(500);
      cy.url().should("eq", "http://localhost:3000/");
      cy.wait(500);
      cy.visit("/company");
      cy.wait(500);
      const companyId = '65e3428465164ca39be76934';
      cy.wait(500);
      cy.get(`[data-testid="${companyId}"]`).click();
      cy.wait(500);
      cy.get("button").contains("View Available Job").click();
      cy.wait(500);
      cy.wait(10000);

    })
  
    it('User2-4', () => {
      cy.visit("/");
      cy.wait(500);
      cy.visit("/auth/login");
      cy.wait(500);
      cy.get("input[name=email]").type("user@gmail.com");
      cy.wait(500);
      cy.get("input[name=password]").type("123456");
      cy.wait(500);
      cy.get("button").contains("Sign in with Credentials").click();
      cy.wait(500);
      cy.url().should("eq", "http://localhost:3000/");
      cy.wait(500);
      cy.visit("/company");
      cy.wait(500);
      const companyId = '65e3428465164ca39be76934';
      cy.wait(500);
      cy.get(`[data-testid="${companyId}"]`).click();
      cy.wait(500);
      cy.get("button").contains("View Available Job").click();
      cy.wait(500);
      cy.get("button").contains("Apply").click();
      cy.wait(500);
      cy.get("button").contains("Confirm").click();
      cy.wait(500);
      cy.visit("/session");

      })
   



})