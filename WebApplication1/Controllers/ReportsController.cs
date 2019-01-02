using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]

    public class ReportsController : Controller
    {
        private readonly IRecipeService _recipeService;
        private readonly IIngredientsRepository _ingredientsRepository;

        public ReportsController(IRecipeService recipeService, IIngredientsRepository ingredientsRepository)
        {
            _recipeService = recipeService;
            _ingredientsRepository = ingredientsRepository;
        }

        [HttpGet("[action]")]
        public IActionResult GenerateReportPdf()
        {
            IEnumerable<Ingredient> ingredients = _ingredientsRepository.GetIngredients();
            return _recipeService.CreatePdfReport((List<Ingredient>) ingredients);
        }

        [HttpGet("[action]")]
        public ActionResult CreateDocument()
        {

            //Create a new PDF document
            PdfDocument document = new PdfDocument();

            //Add a page to the document
            PdfPage page = document.Pages.Add();

            //Create PDF graphics for the page
            PdfGraphics graphics = page.Graphics;

            //Set the standard font
            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 20);

            //Draw the text
            graphics.DrawString("Hello World!!!", font, PdfBrushes.Black, new PointF(0, 0));

            //Saving the PDF to the MemoryStream
            MemoryStream stream = new MemoryStream();

            document.Save(stream);

            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;

            //Download the PDF document in the browser.
            FileStreamResult fileStreamResult = new FileStreamResult(stream, "application/pdf");
            fileStreamResult.FileDownloadName = "Output.pdf";
            return fileStreamResult;
        }
    }
}