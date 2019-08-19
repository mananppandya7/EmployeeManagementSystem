using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.EntityFrameworkCore;
using EMS_Backend.Interface;
using EMS_Backend.Services;
using EMS_Backend.Models;
using System.Text;
using JWT_Authentication.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace EMS_Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddDbContext<EmployeeContext>(option =>
                        option.UseSqlServer(Configuration.GetConnectionString("EmployeeDatabase")));

            // Uncomment below line to use SQL Lite database.
            //services.AddDbContext<EmployeeContext>(options =>
            //            options.UseSqlite(Configuration.GetConnectionString("EmployeeContext")));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Employee Management API",
                    Description = "Employee Management (EMS) Web API",
                    TermsOfService = "None",
                    Contact = new Contact() { Name = "EMS", Email = "", Url = "" }
                });
            });

            // Configure strongly typed setting object.
            var appsettingSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appsettingSection);

            // Configure JWT authentication.
            var appsettings = appsettingSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appsettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowOrigin");

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "EMS API v1");
            });

            app.UseMvc();
        }
    }
}
