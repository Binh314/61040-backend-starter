import { NotFoundError } from "./errors";

export default class LocationConcept {
  async getAddressLocation(address: string) {
    // Using Google API
    const myAPIKey = process.env.GOOGLE_API_KEY;
    const geocodingUrl: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${myAPIKey}`;

    console.log(geocodingUrl);

    const response = await fetch(geocodingUrl);
    const results = await response.json();
    if (results.results.length === 0) {
      throw new NotFoundError("Address Not Found");
    }
    const location = results.results[0].geometry.location;
    return location;
  }
}
