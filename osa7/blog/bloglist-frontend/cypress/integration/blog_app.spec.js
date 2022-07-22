describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form exists", function () {
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login-button").should("exist");
  });

  it("user can login with right credentials", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.get("#notify").should("have.text", "Welcome Matti Luukkainen");
  });

  it("user cant login with wrong credentials", function () {
    cy.get("#username").type("väärä");
    cy.get("#password").type("einäin");
    cy.get("#login-button").click();
    cy.get("#notify").should("have.text", "wrong credentials");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#tog-button").click();
      cy.get("#title").type("New blog");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New url");
      cy.get("#create-button").click();

      cy.contains("New blog");
    });

    it("A blog can be liked", function () {
      cy.get("#tog-button").click();
      cy.get("#title").type("New blog");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New url");
      cy.get("#create-button").click();

      cy.get("#view-button").click();
      cy.get("#like-button").click();
    });

    it("A blog can be removed", function () {
      cy.get("#tog-button").click();
      cy.get("#title").type("New blog");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New url");
      cy.get("#create-button").click();
      cy.get("#view-button").click();
      cy.get("#remove-button").click();

      // cy.contains('New blog').should('not.exist')
    });

    it("Order is right", function () {
      cy.get("#tog-button").click();
      cy.get("#title").type("Most likes");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New url");
      cy.get("#create-button").click();
      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.get("#like-button").click();

      cy.get("#tog-button").click();
      cy.get("#title").type("second likes");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New url");
      cy.get("#create-button").click();
      cy.get("#view-button").click();
      cy.get("#like-button").click();

      cy.get(".blog").eq(0).should("contain", "Most likes");
      cy.get(".blog").eq(1).should("contain", "second likes");
    });
  });
});
