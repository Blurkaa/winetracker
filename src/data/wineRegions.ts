
export interface WineRegion {
  country: string;
  regions: string[];
}

export const wineRegions: WineRegion[] = [
  {
    country: "France",
    regions: [
      "Bordeaux",
      "Burgundy",
      "Champagne",
      "Alsace",
      "Loire Valley",
      "Rhône Valley",
      "Provence",
      "Languedoc-Roussillon",
      "Beaujolais",
      "Jura",
      "Savoie",
      "Corsica",
      "South West"
    ]
  },
  {
    country: "Italy",
    regions: [
      "Piedmont",
      "Tuscany",
      "Veneto",
      "Sicily",
      "Sardinia",
      "Friuli-Venezia Giulia",
      "Trentino-Alto Adige",
      "Lombardy",
      "Emilia-Romagna",
      "Umbria",
      "Marche",
      "Abruzzo",
      "Campania",
      "Puglia",
      "Calabria",
      "Basilicata",
      "Molise",
      "Lazio",
      "Liguria",
      "Valle d'Aosta"
    ]
  },
  {
    country: "Spain",
    regions: [
      "Rioja",
      "Ribera del Duero",
      "Priorat",
      "Catalonia",
      "Galicia",
      "Castilla y León",
      "Castilla-La Mancha",
      "Andalusia",
      "Valencia",
      "Navarra",
      "Aragon",
      "Balearic Islands",
      "Canary Islands",
      "Murcia",
      "Basque Country",
      "Extremadura"
    ]
  },
  {
    country: "United States",
    regions: [
      "Napa Valley",
      "Sonoma",
      "Central Coast",
      "Oregon",
      "Washington",
      "New York",
      "Virginia",
      "Texas",
      "Michigan",
      "Colorado",
      "Arizona",
      "Idaho",
      "North Carolina",
      "Missouri",
      "Pennsylvania"
    ]
  },
  {
    country: "Argentina",
    regions: [
      "Mendoza",
      "Salta",
      "San Juan",
      "La Rioja",
      "Patagonia",
      "Catamarca",
      "Córdoba",
      "Neuquén",
      "Río Negro"
    ]
  },
  {
    country: "Chile",
    regions: [
      "Maipo Valley",
      "Colchagua Valley",
      "Casablanca Valley",
      "Aconcagua Valley",
      "Leyda Valley",
      "Maule Valley",
      "Bio Bio Valley",
      "Elqui Valley",
      "Rapel Valley",
      "Curicó Valley",
      "Limari Valley"
    ]
  },
  {
    country: "Australia",
    regions: [
      "Barossa Valley",
      "McLaren Vale",
      "Hunter Valley",
      "Yarra Valley",
      "Margaret River",
      "Coonawarra",
      "Clare Valley",
      "Eden Valley",
      "Tasmania",
      "Adelaide Hills",
      "Great Southern",
      "Mornington Peninsula",
      "Riverina",
      "Rutherglen"
    ]
  },
  {
    country: "New Zealand",
    regions: [
      "Marlborough",
      "Hawke's Bay",
      "Central Otago",
      "Wairarapa",
      "Canterbury",
      "Nelson",
      "Auckland",
      "Gisborne",
      "Waiheke Island"
    ]
  },
  {
    country: "Germany",
    regions: [
      "Mosel",
      "Rheingau",
      "Pfalz",
      "Rheinhessen",
      "Baden",
      "Franken",
      "Nahe",
      "Ahr",
      "Württemberg",
      "Saale-Unstrut",
      "Mittelrhein",
      "Hessische Bergstraße",
      "Sachsen"
    ]
  },
  {
    country: "Portugal",
    regions: [
      "Douro",
      "Alentejo",
      "Dão",
      "Bairrada",
      "Vinho Verde",
      "Lisboa",
      "Tejo",
      "Madeira",
      "Setúbal Peninsula",
      "Algarve",
      "Trás-os-Montes",
      "Távora-Varosa",
      "Beira Interior"
    ]
  },
  {
    country: "South Africa",
    regions: [
      "Stellenbosch",
      "Paarl",
      "Franschhoek",
      "Swartland",
      "Walker Bay",
      "Constantia",
      "Robertson",
      "Elgin",
      "Hemel-en-Aarde",
      "Overberg",
      "Cape South Coast",
      "Klein Karoo",
      "Tulbagh"
    ]
  },
  {
    country: "Austria",
    regions: [
      "Wachau",
      "Kamptal",
      "Kremstal",
      "Burgenland",
      "Styria",
      "Vienna",
      "Weinviertel",
      "Thermenregion",
      "Neusiedlersee",
      "Carnuntum",
      "Wagram"
    ]
  },
  {
    country: "Greece",
    regions: [
      "Macedonia",
      "Peloponnese",
      "Crete",
      "Santorini",
      "Nemea",
      "Naoussa",
      "Attica",
      "Central Greece",
      "Epirus",
      "Thessaly",
      "Aegean Islands"
    ]
  },
  {
    country: "Hungary",
    regions: [
      "Tokaj",
      "Eger",
      "Villány",
      "Balaton",
      "Somló",
      "Sopron",
      "Szekszárd",
      "Mátra",
      "Hajós-Baja",
      "Nagy-Somló",
      "Etyek-Buda"
    ]
  },
  {
    country: "Canada",
    regions: [
      "Niagara Peninsula",
      "Okanagan Valley",
      "Prince Edward County",
      "Nova Scotia",
      "Vancouver Island",
      "Similkameen Valley",
      "Pelee Island",
      "Lake Erie North Shore",
      "Fraser Valley"
    ]
  }
];

export const getAllCountries = (): string[] => {
  return wineRegions.map(region => region.country).sort();
};

export const getRegionsByCountry = (country: string): string[] => {
  const foundCountry = wineRegions.find(region => region.country === country);
  return foundCountry ? foundCountry.regions.sort() : [];
};

export const getAllRegions = (): string[] => {
  return wineRegions.flatMap(region => region.regions).sort();
};
