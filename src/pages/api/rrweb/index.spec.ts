import { mockRequest } from "#/src/utils/mock-request";
import { POST } from ".";

describe("rrweb", () => {
  it("should insert rrweb data", async () => {
    const url = new URL("http://localhost:3000/api/rrweb");

    const resp = await POST(
      mockRequest({
        url,
        clientAddress: ":::1",
        request: new Request(url, {
          method: "POST",
          body: JSON.stringify({
            data: { hello: "world" },
            timestamp: 123,
            type: 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    );

    expect(resp.status).toBe(200);
  });
});
