using System.Globalization;
using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Fixtures;
using ReqnrollPlaywright.Pages;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class CheckoutSteps
{
    private readonly PlaywrightDriver _driver;
    public CheckoutSteps(PlaywrightDriver driver) => _driver = driver;

    private InventoryPage Inventory => new(_driver.Page);
    private CartPage Cart => new(_driver.Page);
    private CheckoutPage Checkout => new(_driver.Page);

    private static Product ProductByName(string name) => Products.All.First(p => p.Name == name);

    [Given("I have the {string} in the cart and I am on checkout step one")]
    public async Task GivenOneItemAtCheckout(string name)
    {
        await Inventory.AddToCartByDataTestAsync(ProductByName(name).DataTest);
        await Inventory.GoToCartAsync();
        await Cart.ProceedToCheckoutAsync();
    }

    [Given("I have the {string} and {string} in the cart and I am on checkout step one")]
    public async Task GivenTwoItemsAtCheckout(string first, string second)
    {
        await Inventory.AddMultipleToCartAsync(new[] { ProductByName(first).DataTest, ProductByName(second).DataTest });
        await Inventory.GoToCartAsync();
        await Cart.ProceedToCheckoutAsync();
    }

    [When("I submit the form without a first name")]
    public async Task WhenSubmitNoFirstName()
    {
        await Checkout.FillCustomerInfoAsync(string.Empty, CustomerData.LastName, CustomerData.PostalCode);
        await Checkout.SubmitEmptyFormAsync();
    }

    [When("I fill the customer info and continue")]
    public async Task WhenFillAndContinue()
        => await Checkout.FillAndContinueAsync(CustomerData.FirstName, CustomerData.LastName, CustomerData.PostalCode);

    [When("I finish the order")]
    public async Task WhenFinish() => await Checkout.FinishOrderAsync();

    [Then("I should see the error {string}")]
    public async Task ThenError(string text) => await Checkout.AssertStep1ErrorAsync(text);

    [Then("the subtotal should be {string}")]
    public async Task ThenSubtotal(string expected)
    {
        var (subtotal, _, _) = await Checkout.GetPriceSummaryAsync();
        Assert.That(subtotal, Is.EqualTo(double.Parse(expected, CultureInfo.InvariantCulture)).Within(0.01));
    }

    [Then("subtotal plus tax should equal the total")]
    public async Task ThenMath() => await Checkout.AssertTotalCalculationIsCorrectAsync();

    [Then("I should see the order confirmation")]
    public async Task ThenConfirmation() => await Checkout.AssertConfirmationPageAsync();
}
