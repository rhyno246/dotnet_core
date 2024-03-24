using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities ()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivistiesById (Guid id)
        {
            return await Mediator.Send(new Details.Query{ Id = id });
        }
        [HttpPost]

        public async Task<IActionResult> CreateActivities (Activity activity)
        {
            await Mediator.Send(new Create.Command{ Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivities (Guid id , Activity activity) 
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command{ Activity = activity });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivities (Guid id)
        {
            await Mediator.Send(new Delete.Command{ Id = id });
            return Ok();
        }
    }
}