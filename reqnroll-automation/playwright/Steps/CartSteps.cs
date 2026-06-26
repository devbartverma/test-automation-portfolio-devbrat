using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Fixtures;
using ReqnrollPlaywright.Pages;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class CartSteps
{
    private readonly PlaywrightDriver _driver;
    public CartSteps(PlaywrightDriver driver) => _driver = driver;

    private InventoryPage Inventory => new(_driver.Page);
    private CartPage Cart => new(_driver.Page);

    private static Product ProductByName(string name) => Products.All.First(p => p.Name == name);

    [When("I add the {string} to the cart")]
    public async Task WhenAddOne(string name) => await Inventory.AddToCartByDataTestAsync(ProductByName(name).DataTest);

    [When("I add the {string} and {string} to the cart")]
    public async Task WhenAddTwo(string first, string second)
        => await Inventory.AddMultipleToCartAsync(new[] { ProductByName(first).DataTest, ProductByName(second).DataTest });

    [Then("the cart contains {string} and {string}")]
    public async Task ThenContains(string first, string second)
    {
        await Cart.AssertItemInCartAsync(first);
        await Cart.AssertItemInCartAsync(second);
    }

    [Then("the cart has {int} items")]
    [Then("the cart has {int} item")]
    public async Task ThenItemCount(int count) => await Cart.AssertItemCountAsync(count);

    [When("I remove {string} from the cart")]
    public async Task WhenRemove(string name) => await Cart.RemoveItemAsync(name);
}
