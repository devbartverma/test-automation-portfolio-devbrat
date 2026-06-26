using Microsoft.Playwright;
using Reqnroll;

namespace ReqnrollPlaywright.Support;

/// <summary>
/// Scenario lifecycle: start the right Playwright resource based on tags
/// (@ui -> browser, @api -> API request context), capture a screenshot on
/// failure, and dispose everything afterwards.
/// </summary>
[Binding]
public class Hooks
{
    private readonly PlaywrightDriver _driver;
    private readonly ScenarioContext _scenario;

    public Hooks(PlaywrightDriver driver, ScenarioContext scenario)
    {
        _driver = driver;
        _scenario = scenario;
    }

    [BeforeScenario("@ui")]
    public async Task StartBrowserAsync() => await _driver.StartBrowserAsync();

    [BeforeScenario("@api")]
    public async Task StartApiAsync() => await _driver.StartApiAsync();

    [AfterScenario("@ui", Order = 1)]
    public async Task CaptureScreenshotOnFailureAsync()
    {
        if (_scenario.TestError is not null && _driver.Page is not null)
        {
            Directory.CreateDirectory("screenshots");
            var safe = string.Join("_", _scenario.ScenarioInfo.Title.Split(Path.GetInvalidFileNameChars()));
            await _driver.Page.ScreenshotAsync(new() { Path = Path.Combine("screenshots", $"{safe}.png"), FullPage = true });
        }
    }

    [AfterScenario(Order = 100)]
    public async Task TearDownAsync() => await _driver.DisposeAsync();
}
