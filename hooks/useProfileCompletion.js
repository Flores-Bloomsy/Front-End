import { useMemo } from "react";

export default function useProfileCompletion(user) {
  const profileIsConfigured = useMemo(
    () => ({
      phone: user?.phone,
      name: user?.name || user?.storeName,
      address: {
        street: user?.address?.street,
        city: user?.address?.city,
        state: user?.address?.state,
        number: user?.address?.number,
        postalCode: user?.address?.postalCode,
      },
    }),
    [user]
  );

  const isProfileIncomplete = useMemo(() => {
    if (!profileIsConfigured) return true;

    const { phone, name, address } = profileIsConfigured;
    const isMainInfoMissing = !name || !phone;
    const isAddressMissing =
      !address.street ||
      !address.city ||
      !address.state ||
      !address.number ||
      !address.postalCode;

    return isMainInfoMissing || isAddressMissing;
  }, [profileIsConfigured]);

  return { isProfileIncomplete };
}
