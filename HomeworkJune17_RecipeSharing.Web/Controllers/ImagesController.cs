using HomeworkJune17_RecipeSharing.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using RazorLight;
using System.Reflection;
using System.Text;
using System.Text.Json;

namespace HomeworkJune17_RecipeSharing.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        [HttpPost("Upload")]
        public void Upload(UploadModel model)
        {
            int indexOfComma = model.Base64Data.IndexOf(',');
            string base64 = model.Base64Data.Substring(indexOfComma + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{model.FileName}.jpg", bytes);
        }

        [HttpGet("View")]
        public IActionResult View(string img)
        {
            var bytes = System.IO.File.ReadAllBytes($"uploads/{img}.jpg");
            return File(bytes, "image/jpeg");
            //return File(bytes, "application/octet-stream", fileName);
        }

        [HttpGet("GeneratePdf")]
        public async Task<IActionResult> GeneratePDF(string title, string ingredients, string steps, string image)

        {
            foreach (var i in ingredients.Split(',').ToList())
            {
                await Console.Out.WriteLineAsync(i);
            }
            await Console.Out.WriteLineAsync(image);
            var model = new RecipePdfModel

            {
                Title = title,
                Ingredients = ingredients.Split(',').ToList(),
                Steps = steps.Split(",").ToList(),
                ImageName = $"{image}.jpg"
            };

            var engine = new RazorLightEngineBuilder()

                .UseFileSystemProject(Path.Combine(Directory.GetCurrentDirectory(), "Pages"))
                .UseMemoryCachingProvider()
                .Build();

            string htmlString = await engine.CompileRenderAsync("/RecipePdf.cshtml", model);

            var pdfBytes = await GeneratePdfAsync(htmlString);

            return File(pdfBytes, "application/pdf", $"{title}.pdf");

        }

        private static async Task<byte[]> GeneratePdfAsync(string content)
        {
            await new BrowserFetcher().DownloadAsync();

            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            using var page = await browser.NewPageAsync();
            await page.SetContentAsync(content);

            byte[] bytes = await page.PdfDataAsync(new PdfOptions
            {
                Format = PuppeteerSharp.Media.PaperFormat.A4
            });

            return bytes;
        }
    }
}
