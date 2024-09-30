import { POST } from ".";
import { mockRequest } from "#/src/utils/mock-request";

describe("send-otp", () => {
  it("should send otp", async () => {
    const url = new URL("http://localhost:3000/api/send-otp");

    const resp = await POST(
      mockRequest({
        url,
        request: new Request(url, {
          method: "POST",
          body: JSON.stringify({ email: "hbiaser132@gmail.com" }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    );

    expect(resp.status).toBe(200);
  });
});
