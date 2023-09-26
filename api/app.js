const handlePing = async (_request) => {
  return new Response(`Hello from ${ SERVER_ID }`);
};

const handleGithubCallback = async (_request) => {
  return new Response("Callback testing");
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/ping" }),
    fn: handlePing,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/github/callback" }),
    fn: handleGithubCallback,
  }
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