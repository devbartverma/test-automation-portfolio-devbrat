using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Fixtures;
using ReqnrollPlaywright.Pages;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class InventorySteps
{
    private readonly PlaywrightDriver _driver;
    public InventorySteps(PlaywrightDriver driver) => _driver = driver;

    private InventoryPage Inventory => new(_driver.Page);

    [Then("I should see {int} products")]
    public async Task ThenSeeProducts(int count) => await Inventory.AssertProductCountAsync(count);

    [When("I sort the products by price, high to low")]
    public async Task WhenSortPriceHiLo() => await Inventory.SortByAsync(SortOptions.PriceHiLo);

    [When("I sort the products by name, A to Z")]
    public async Task WhenSortNameAZ() => await Inventory.SortByAsync(SortOptions.NameAZ);

    [Then("the product prices should be in descending order")]
    public async Task ThenPricesDescending() => await Inventory.AssertPricesSortedDescendingAsync();

    [Then("the product names should be in ascending order")]
    public async Task ThenNamesAscending() => await Inventory.AssertNamesAlphabeticallyAscendingAsync();

    [When("I open the detail page for {string}")]
    public async Task WhenOpenDetail(string name) => await Inventory.OpenProductDetailAsync(name);

    [Then("the detail page shows {string} priced {string}")]
    public async Task ThenDetail(string name, string price)
    {
        var detail = new ProductDetailPage(_driver.Page);
        Assert.That(await detail.ProductName.TextContentAsync(), Is.EqualTo(name));
        Assert.That(await detail.ProductPrice.TextContentAsync(), Is.EqualTo(price));
        Assert.That(await detail.ProductDescription.TextContentAsync(), Is.Not.Empty);
        Assert.That(await detail.BackButton.IsVisibleAsync(), Is.True);
    }
}
