import { fetchCourseraImage } from "./certificate";

describe("resolveCourseraCertificate", () => {
  it("should fetch image url", async () => {
    const image = await fetchCourseraImage("3D5RN9RC6X5W");
    expect(image).toBe(
      "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~3D5RN9RC6X5W/CERTIFICATE_LANDING_PAGE~3D5RN9RC6X5W.jpeg"
    );
  });
});
