using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using ReqnrollPlaywright.Support;

namespace ReqnrollPlaywright.Steps;

[Binding]
public class ApiSteps
{
    private readonly PlaywrightDriver _driver;
    public ApiSteps(PlaywrightDriver driver) => _driver = driver;

    private IAPIResponse _response = null!;

    [When("I GET {string}")]
    public async Task WhenGet(string path) => _response = await _driver.Request.GetAsync(path);

    [When("I POST a new post to {string}")]
    public async Task WhenPost(string path)
    {
        var payload = new { title = "SDET portfolio", body = "created via API test", userId = 1 };
        _response = await _driver.Request.PostAsync(path, new() { DataObject = payload });
    }

    [Then("the response status is {int}")]
    public void ThenStatus(int status) => Assert.That(_response.Status, Is.EqualTo(status));

    [Then("the post id is {int}")]
    public async Task ThenPostId(int id)
    {
        var body = await _response.JsonAsync();
        Assert.That(body!.Value.GetProperty("id").GetInt32(), Is.EqualTo(id));
    }

    [Then("the post has a non-empty title and body")]
    public async Task ThenPostFields()
    {
        var body = await _response.JsonAsync();
        Assert.That(body!.Value.GetProperty("userId").GetInt32(), Is.GreaterThan(0));
        Assert.That(body.Value.GetProperty("title").GetString(), Is.Not.Empty);
        Assert.That(body.Value.GetProperty("body").GetString(), Is.Not.Empty);
    }

    [Then("the response contains {int} items")]
    public async Task ThenCount(int count)
    {
        var body = await _response.JsonAsync();
        Assert.That(body!.Value.GetArrayLength(), Is.EqualTo(count));
    }

    [Then("the created post echoes the payload and has a numeric id")]
    public async Task ThenCreated()
    {
        var body = await _response.JsonAsync();
        Assert.That(body!.Value.GetProperty("title").GetString(), Is.EqualTo("SDET portfolio"));
        Assert.That(body.Value.GetProperty("id").GetInt32(), Is.GreaterThan(0));
    }
}
