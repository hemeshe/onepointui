using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace App.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OnePointUiController : ControllerBase
    {

        private readonly ILogger<OnePointUiController> _logger;

        public OnePointUiController(ILogger<OnePointUiController> logger)
        {
            _logger = logger;
        }

    }
}
