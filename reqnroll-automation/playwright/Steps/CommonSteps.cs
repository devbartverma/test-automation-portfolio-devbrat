using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Fixtures;
using ReqnrollPlaywright.Pages;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class CommonSteps
{
    private readonly PlaywrightDriver _driver;
    public CommonSteps(PlaywrightDriver driver) => _driver = driver;

    private LoginPage Login => new(_driver.Page);
    private InventoryPage Inventory => new(_driver.Page);
    private CartPage Cart => new(_driver.Page);

    [Given("I am logged in as the standard user")]
    public async Task GivenLoggedIn()
    {
        await Login.GoToAsync();
        await Login.LoginAsync(Users.StandardUsername, Users.StandardPassword);
    }

    [When("I open the cart")]
    public async Task WhenOpenCart() => await Inventory.GoToCartAsync();

    [When("I continue shopping")]
    public async Task WhenContinueShopping() => await Cart.ContinueShoppingAsync();

    [When("I proceed to checkout")]
    public async Task WhenProceedToCheckout() => await Cart.ProceedToCheckoutAsync();

    [Then("the cart badge shows {string}")]
    public async Task ThenBadge(string count) => await Inventory.AssertCartBadgeCountAsync(int.Parse(count));
}
