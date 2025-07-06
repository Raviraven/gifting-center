[![Netlify Status](https://api.netlify.com/api/v1/badges/9178eb8b-aac0-499e-b83d-36c52f52542d/deploy-status)](https://app.netlify.com/sites/okruszki/deploys)  
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

### How to run postgres db docker container locally

```
docker run --name some-postgres -e POSTGRES_DB=test-database -e POSTGRES_USER=test-user -e POSTGRES_PASSWORD=test-password -d postgres:17.4-alpine3.21
```

### Generating https certificates

- .pfx from .pem certificate and key

```sh
openssl pkcs12 -export -in cert.pem -inkey key.pem -out your-certificate.pfx
```

- dotnet local certs [Create self-signed certificate - MS Docs](https://learn.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide#create-a-self-signed-certificate)

### Restarting docker-compose backend service due to i.e. another certificate / domain

1. Generate .pfx file
2. Make sure .env file stays up to date / needs update
3. Copy files to the server
4. Run

```
docker-compose --env-file path/to/env.file up -d --build net-core
```

---

Useful links:

https://stackoverflow.com/questions/13732826/convert-pem-to-crt-and-key  
https://stackoverflow.com/questions/6307886/how-to-create-pfx-file-from-certificate-and-private-key  
https://stackoverflow.com/questions/49153782/install-certificate-in-dotnet-core-docker-container
