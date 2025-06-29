using CategoriesApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

var builder = WebApplication.CreateBuilder(args);

// 1. ����� �� �� HTTP ���� 6000
builder.WebHost.UseUrls("http://localhost:6000");

// 2. EF DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Controllers
builder.Services.AddControllers();

// 4. (���������) CORS ���� ��React
builder.Services.AddCors(o => o.AddPolicy("AllowAll", p =>
    p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

// 5. ����� ������ ����
app.Lifetime.ApplicationStarted.Register(() =>
{
    var addresses = app.Services
        .GetRequiredService<IServer>()
        .Features
        .Get<IServerAddressesFeature>()!
        .Addresses;

    Console.WriteLine("API listening on:");
    foreach (var addr in addresses)
        Console.WriteLine($"  {addr}");
});

app.Run();
