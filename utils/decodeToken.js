export function decodeToken(token) {
  if (!token) return null;

  try {
    const payloadString = token.split(".")[1];
    const payloadJsonAsString = atob(payloadString);
    const payloadJson = JSON.parse(payloadJsonAsString);
    console.log(payloadJson);
    return payloadJson;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}
