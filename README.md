[![Netlify Status](https://api.netlify.com/api/v1/badges/9178eb8b-aac0-499e-b83d-36c52f52542d/deploy-status)](https://app.netlify.com/sites/hejfranek/deploys)
[![.NET unit tests](https://github.com/Raviraven/gifting-center/actions/workflows/dotnet.yml/badge.svg?branch=master)](https://github.com/Raviraven/gifting-center/actions/workflows/dotnet.yml)
[![react tests](https://github.com/Raviraven/gifting-center/actions/workflows/react.yml/badge.svg?branch=master)](https://github.com/Raviraven/gifting-center/actions/workflows/react.yml)

# gifting-center

TODO: rewrite in the future.

### How to run

To use generated `*.pfx` certificate with password in docker-compose on raspberry pi - [Kestrel](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints?view=aspnetcore-6.0) server has been used. Code responsible for using cert in .NET app:

```c#
builder.WebHost.ConfigureKestrel(c => c.ConfigureEndpointDefaults(opts =>
{
    opts.UseHttps("cert-name.pfx", "password-to-pfx");
}));
```

### Generating https certificates

- .pfx from .pem certificate and key

```sh
openssl pkcs12 -export -in cert.pem -inkey key.pem -out your-certificate.pfx
```

- dotnet local certs [Create self-signed certificate - MS Docs](https://learn.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide#create-a-self-signed-certificate)

Useful links:

https://stackoverflow.com/questions/13732826/convert-pem-to-crt-and-key  
https://stackoverflow.com/questions/6307886/how-to-create-pfx-file-from-certificate-and-private-key  
https://stackoverflow.com/questions/49153782/install-certificate-in-dotnet-core-docker-container
