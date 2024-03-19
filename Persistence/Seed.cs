using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData ( DataContext context )
        {
            if(context.Activities.Any()) return;
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Test 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Description 1",
                    Category = "Category 1",
                    City = "City 1",
                    Venue = "Venue 1",
                },
                new Activity
                {
                    Title = "Test 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Description 2",
                    Category = "Category 2",
                    City = "City 2",
                    Venue = "Venue 2",
                },
            };
            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}