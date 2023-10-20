import "https://deno.land/std@0.202.0/dotenv/load.ts";

const CLIENT_ID = Deno.env.get("GITHUB_CLIENT");
const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET");


const handlePing = async (_request) => {
  return new Response("Pong");
};

const handleGetAccessToken = async (request) => {
  const url = new URL(request.url);
  const urlParams = url.searchParams;
  const code = urlParams.get("code");

  const params = "?client_id=" + CLIENT_ID +
    "&client_secret=" + CLIENT_SECRET +
    "&code=" + code;

  const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return Response.json(data);
};

const handleGetUser = async (request) => {
  const token = request.headers.get("Authorization");
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: token,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const data = await response.json();
  return Response.json(data);
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/ping" }),
    fn: handlePing,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/github/getAccessToken" }),
    fn: handleGetAccessToken,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/github/getUser" }),
    fn: handleGetUser,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 })
  }
};

const portConfig = { port: 7777, hostname: '0.0.0.0' };
Deno.serve(portConfig, handleRequest);