using HomeworkJune17_RecipeSharing.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using System.Text;

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
            System.IO.File.WriteAllBytes($"uploads/{model.FileName}", bytes);
        }

        [HttpGet("View")]
        public IActionResult View(string img)
        {
            var bytes = System.IO.File.ReadAllBytes($"uploads/{img}");
            return File(bytes, "image/jpeg");
            //return File(bytes, "application/octet-stream", fileName);
        }

        [HttpGet("GeneratePdf")]
        public IActionResult GeneratePDF(string name)
        {
            var bytes = GeneratePdfAsync(name).Result;
            return File(bytes, "application/pdf", "hello.pdf");
        }


        [HttpGet("generatecsv")]
        public IActionResult GenerateCSV()
        {
            string csv = "FirstName,LastName,Age\n" +
                "John,Doe,45\n" +
                "Foo,Bar,55\n";
            byte[] csvBytes = Encoding.UTF8.GetBytes(csv);
            return File(csvBytes, "text/csv", "people.csv");

        }

        private static async Task<byte[]> GeneratePdfAsync(string name)
        {
            await new BrowserFetcher().DownloadAsync();

            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            using var page = await browser.NewPageAsync();
            await page.SetContentAsync($"<h1>Hello {name}</h1>");

            byte[] bytes = await page.PdfDataAsync(new PdfOptions
            {
                Format = PuppeteerSharp.Media.PaperFormat.A4
            });

            return bytes;
        }
    }
}
