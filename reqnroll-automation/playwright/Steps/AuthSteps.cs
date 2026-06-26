using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Fixtures;
using ReqnrollPlaywright.Pages;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class AuthSteps
{
    private readonly PlaywrightDriver _driver;
    public AuthSteps(PlaywrightDriver driver) => _driver = driver;

    private LoginPage Login => new(_driver.Page);

    [Given("I am on the login page")]
    public async Task GivenOnLoginPage() => await Login.GoToAsync();

    [When("I log in as the standard user")]
    public async Task WhenStandardLogin() => await Login.LoginAsync(Users.StandardUsername, Users.StandardPassword);

    [When("I log in as the locked-out user")]
    public async Task WhenLockedLogin() => await Login.LoginAsync(Users.LockedUsername, Users.LockedPassword);

    [When("I log in with invalid credentials")]
    public async Task WhenInvalidLogin() => await Login.LoginAsync(Users.InvalidUsername, Users.InvalidPassword);

    [When("I log out")]
    public async Task WhenLogout()
    {
        await _driver.Page.GetByRole(AriaRole.Button, new() { Name = "Open Menu" }).ClickAsync();
        await _driver.Page.GetByRole(AriaRole.Link, new() { Name = "Logout" }).ClickAsync();
    }

    [When("I try to open the inventory directly")]
    public async Task WhenOpenInventoryDirect() => await _driver.Page.GotoAsync(Urls.Inventory);

    [Then("I should land on the inventory page")]
    public async Task ThenOnInventory() => await Login.AssertLoggedInAsync();

    [Then("the page title should be {string}")]
    public async Task ThenTitle(string title)
        => Assert.That(await _driver.Page.Locator(".title").TextContentAsync(), Is.EqualTo(title));

    [Then("I should see the locked-out error with its icon")]
    public async Task ThenLockedError()
    {
        Assert.That(await Login.ErrorMessage.TextContentAsync(), Does.Contain(ErrorMessages.LockedOut));
        await Login.AssertErrorIconVisibleAsync();
    }

    [Then("I should see the invalid-credentials error")]
    public async Task ThenInvalidError()
        => Assert.That(await Login.ErrorMessage.TextContentAsync(), Does.Contain(ErrorMessages.InvalidCredentials));

    [Then("I should be redirected to the login page")]
    public void ThenOnLogin()
        => Assert.That(_driver.Page.Url.TrimEnd('/'), Is.EqualTo(Urls.Base));
}
