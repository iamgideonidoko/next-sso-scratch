import "server-only";
import * as saml from "samlify";

export async function getProviders() {
  const response = await fetch(process.env.OKTA_METADATA_URL!);
  if (!response.ok) throw new Error("Failed to fetch metadata.");
  const metadata = await response.text();

  const idp = saml.IdentityProvider({
    metadata,
  });

  const sp = saml.ServiceProvider({
    metadata,
    assertionConsumerService: [
      {
        Binding: saml.Constants.namespace.binding.post,
        Location: `${process.env.NEXT_PUBLIC_APP_URL}/api/acs`,
      },
    ],
  });

  saml.setSchemaValidator({
    // Schema validation function
    validate: () => Promise.resolve(),
  });

  return { idp, sp };
}
