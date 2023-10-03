using gifting_center.Logic.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace gifting_center.Api.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RoleGateAttribute : Attribute, IAuthorizationFilter
{
    private readonly string _claimName;
    private readonly string _claimValue;

    public RoleGateAttribute(string claimValue)
    {
        _claimValue = claimValue;
        _claimName = "ChangeItToPermissionOrSth";
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // var test = context.HttpContext.User.Claims;
        // var s = test.FirstOrDefault(n => n.Type == _claimName)?.Value;

        var allowAnonymousAttribute = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();

        if (allowAnonymousAttribute)
        {
            return;
        }
        
        if (!context.HttpContext.User.HasClaim(_claimName, _claimValue)) 
        //if (!s.Contains(_claimValue))
        {
            context.Result = new ForbidResult();
        }
    }
}