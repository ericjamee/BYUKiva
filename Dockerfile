# Force fresh build - 2024-01-17
FROM mcr.microsoft.com/dotnet/sdk:8.0.100 AS build
WORKDIR /src
COPY ["Integrity.API/Integrity.API.csproj", "Integrity.API/"]
RUN dotnet restore "Integrity.API/Integrity.API.csproj"
COPY . .
WORKDIR "/src/Integrity.API"
RUN dotnet build "Integrity.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Integrity.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "Integrity.API.dll"] 