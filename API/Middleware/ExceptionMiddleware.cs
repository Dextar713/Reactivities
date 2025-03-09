﻿
using System.Text.Json;
using Application.Core;
using FluentValidation;

namespace API.Middleware
{
    public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                await HandleValidationException(ex, context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
                //throw;
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            var trace = env.IsDevelopment() ? ex.StackTrace : null;
            var response = new AppException(context.Response.StatusCode, ex.Message, trace);
            var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }

        private static async Task HandleValidationException(ValidationException ex, HttpContext context)
        {
            var validationErrors = new Dictionary<string, string[]>();

            if (ex.Errors is not null)
            {
                foreach (var error in ex.Errors)
                {
                    if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                    {
                        validationErrors[error.PropertyName] = [..existingErrors, error.ErrorMessage];
                    }
                    else
                    {
                        validationErrors[error.PropertyName] = [error.ErrorMessage];
                    }
                }
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            var validationProblemDetails = new HttpValidationProblemDetails(validationErrors)
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "ValidationFailure",
                Title = "Validation error",
                Detail = "One or more validation errors has occurred"
            };

            await context.Response.WriteAsJsonAsync(validationProblemDetails);

             
        }
    }
}
