export type DigitalCertificate = {
  image: string;
  link: string;
};

export function fetchCourseraImage(id: string): Promise<string | undefined> {
  return fetch(
    `https://www.coursera.org/api/metaImages.v1/CERTIFICATE_LANDING_PAGE~${id}`
  )
    .then((res) => res.json())
    .then((data) => data?.elements?.[0]?.url as string);
}

export type CertificateIssuer = "coursera";

export function resolveCertificateIdAndIssuer(
  link: string
): [string, CertificateIssuer] | undefined {
  const courseraId = (/coursera\.org.+verify\/(.+)/.exec(link) || [])[1];
  if (courseraId) {
    return [courseraId, "coursera"];
  }
  return undefined;
}

export function fetchDigitalCertificate(
  certificate: string
): Promise<DigitalCertificate | undefined> {
  const courseraId = (/coursera\.org.+verify\/(.+)/.exec(certificate) || [])[1];
  if (courseraId) {
    return fetchCourseraImage(courseraId).then((image) =>
      image
        ? {
            image,
            link: certificate,
          }
        : undefined
    );
  }
  return Promise.resolve(undefined);
}
