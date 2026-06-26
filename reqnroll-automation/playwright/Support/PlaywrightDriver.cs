using Microsoft.Playwright;

namespace ReqnrollPlaywright.Support;

/// <summary>
/// Owns the Playwright lifecycle for a single scenario. Reqnroll's context
/// injection hands the same instance to every binding/hook in the scenario,
/// so step classes share one isolated browser (parallel-safe by scenario).
/// </summary>
public class PlaywrightDriver : IAsyncDisposable
{
    private const string ApiBaseUrl = "https://jsonplaceholder.typicode.com";

    private IPlaywright? _playwright;
    private IBrowser? _browser;
    private IBrowserContext? _context;

    public IPage Page { get; private set; } = null!;
    public IAPIRequestContext Request { get; private set; } = null!;

    public async Task StartBrowserAsync()
    {
        _playwright ??= await Microsoft.Playwright.Playwright.CreateAsync();
        var headed = Environment.GetEnvironmentVariable("HEADED") == "1";
        _browser = await _playwright.Chromium.LaunchAsync(new() { Headless = !headed });
        _context = await _browser.NewContextAsync();
        Page = await _context.NewPageAsync();
        Page.SetDefaultTimeout(30000);
    }

    public async Task StartApiAsync()
    {
        _playwright ??= await Microsoft.Playwright.Playwright.CreateAsync();
        Request = await _playwright.APIRequest.NewContextAsync(new() { BaseURL = ApiBaseUrl });
    }

    public async ValueTask DisposeAsync()
    {
        if (Request is not null) await Request.DisposeAsync();
        if (_context is not null) await _context.DisposeAsync();
        if (_browser is not null) await _browser.DisposeAsync();
        _playwright?.Dispose();
        GC.SuppressFinalize(this);
    }
}
