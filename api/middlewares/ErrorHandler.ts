import { HTTPErrorInterface, HTTPError } from "../errors/HTTPError";

export function ErrorHandler(
  error: Error | HTTPErrorInterface,
  req: any,
  res: any,
  next: any
) {
  if (error) {
    if (error instanceof HTTPError) {
      console.log("HTTP errors: ", error);
      return res
        .status(error.statusCode)
        .send({ success: false, message: error.message });
    } else {
      console.log("non-HTTP error happened: ", error);
      return res
        .status(500)
        .send({ success: false, message: "Unknown internal error happened" });
    }
  }
}
