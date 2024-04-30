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

    const fileName = 'example_resume.pdf';
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName,
        mimeType: 'application/pdf'
      });
    });

    cy.contains('button', 'Confirm').click();
    cy.contains('Booking created');
    cy.url().should('include', '/session');
  })


  it('User2-1 Cretiria-1', () => {
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
    cy.visit("/company/65e69f5471065fb8d0183510");
    cy.get("button").contains("View Available Job").click();
    cy.get("button").contains("Delete").click();

  })

  it('User2-1 Cretiria-2', () => {
    cy.visit("/");
    cy.visit("/auth/login");
    cy.get("input[name=email]").type("admin@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button").contains("Sign in with Credentials").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.visit("/company");
    cy.visit("/company/65e3428465164ca39be76934");
    cy.get("button").contains("View Available Job").click();
    cy.url
    
  })
})