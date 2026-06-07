using CdbInvestment.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// <snippet_UseSwagger>
builder.Services.AddScoped<ICdbInvestmentService, CdbInvestmentService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}
// </snippet_UseSwagger>

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();