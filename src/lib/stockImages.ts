// Large curated pool of real estate images from Unsplash CDN (free, hotlinkable).
// We pick deterministically based on the property id so every listing gets a
// stable, unique-looking gallery — no duplicate placeholder repetition.

// Each entry is an Unsplash photo ID. URLs are built with `w` + `fm=webp` for
// fast, optimized delivery via the Unsplash CDN.

const POOLS: Record<string, string[]> = {
  flat: [
    "1502672260266-1c1ef2d93688","1493809842364-78817add7ffb","1522708323590-d24dbb6b0267",
    "1560448204-e02f11c3d0e2","1545324418-cc1a3fa10c00","1556909114-f6e7ad7d3136",
    "1556020685-ae41abfc9365","1560185007-cde436f6a4d0","1560185008-a33f5c7b1844",
    "1567496898669-ee935f5f647a","1568605114967-8130f3a36994","1570129477492-45c003edd2be",
    "1574362848149-11496d93a7c7","1580587771525-78b9dba3b914","1583608205776-bfd35f0d9f83",
    "1600585154340-be6161a56a0c","1600596542815-ffad4c1539a9","1600607687939-ce8a6c25118c",
    "1600210492486-724fe5c67fb0","1600566753190-17f0baa2a6c3","1600573472550-8090b5e0745e",
    "1600585154526-990dced4db0d","1600596542815-ffad4c1539a9","1605276374104-dee2a0ed3cd6",
    "1613490493576-7fde63acd811","1617806118233-18e1de247200","1618219740772-cccd0bcfe2e8",
    "1622372738946-62e02505feb3","1628624747186-a941c476b7ef","1630699144867-37acec97df5a",
  ],
  villa: [
    "1564013799919-ab600027ffc6","1572120360610-d971b9d7767c","1613490493576-7fde63acd811",
    "1568605114967-8130f3a36994","1600596542815-ffad4c1539a9","1512917774080-9991f1c4c750",
    "1518780664697-55e3ad937233","1523217582562-09d0def993a6","1502005229762-cf1b2da7c5d6",
    "1505843513577-22bb7d21e455","1510798831971-661eb04b3739","1523413651479-597eb2da0ad6",
    "1533090481720-856c6e3c1fdc","1540541338287-41700207dee6","1542621334-a254cf47733d",
    "1564540583246-934409427776","1565182999561-18d7dc61c393","1567428485548-c499e4931c10",
    "1571055107559-3e67626fa8be","1572120360610-d971b9d7767c","1583608205776-bfd35f0d9f83",
    "1597211684565-dca64d72bdfe","1600585154340-be6161a56a0c","1600585154526-990dced4db0d",
    "1600607687939-ce8a6c25118c","1605146768851-eda79da39897","1613553423335-6b2b6c0bfeec",
    "1613977257363-707ba9348227","1628624747186-a941c476b7ef","1631679706909-1844bbd07221",
  ],
  house: [
    "1568605114967-8130f3a36994","1570129477492-45c003edd2be","1572120360610-d971b9d7767c",
    "1583608205776-bfd35f0d9f83","1605146769289-440113cc3d00","1605114801898-d36fd5dffe14",
    "1605276374104-dee2a0ed3cd6","1605146768851-eda79da39897","1505843513577-22bb7d21e455",
    "1518780664697-55e3ad937233","1523217582562-09d0def993a6","1502005229762-cf1b2da7c5d6",
    "1510798831971-661eb04b3739","1533090481720-856c6e3c1fdc","1564540583246-934409427776",
    "1567428485548-c499e4931c10","1571055107559-3e67626fa8be","1600585154340-be6161a56a0c",
    "1600585154526-990dced4db0d","1600607687939-ce8a6c25118c",
  ],
  penthouse: [
    "1600607687939-ce8a6c25118c","1600210492486-724fe5c67fb0","1600566753190-17f0baa2a6c3",
    "1600573472550-8090b5e0745e","1600585154526-990dced4db0d","1613490493576-7fde63acd811",
    "1622372738946-62e02505feb3","1628624747186-a941c476b7ef","1542621334-a254cf47733d",
    "1545324418-cc1a3fa10c00","1556909114-f6e7ad7d3136","1564540583246-934409427776",
  ],
  studio: [
    "1522708323590-d24dbb6b0267","1560448204-e02f11c3d0e2","1556020685-ae41abfc9365",
    "1556909114-f6e7ad7d3136","1493809842364-78817add7ffb","1502672260266-1c1ef2d93688",
    "1574362848149-11496d93a7c7","1580587771525-78b9dba3b914","1583608205776-bfd35f0d9f83",
    "1618219740772-cccd0bcfe2e8","1630699144867-37acec97df5a",
  ],
  commercial: [
    "1497366216548-37526070297c","1497366811353-6870744d04b2","1486406146926-c627a92ad1ab",
    "1542744173-8e7e53415bb0","1454165804606-c3d57bc86b40","1556761175-5973dc0f32e7",
    "1556761175-4b46a572b786","1564540586988-aa4e53c3d799","1565728744382-61accd4aa148",
    "1582653291997-079a1c04e7c2","1593642632559-0c6d3fc62b89","1600880292203-757bb62b4baf",
    "1604328698692-f76ea9498e76","1606857521015-7f9fcf423740","1607082348824-0a96f2a4b9da",
    "1497215842964-222b430dc094","1531973576160-7125cd663d86","1535025183041-0991a977e25b",
  ],
  plot: [
    "1500382017468-9049fed747ef","1464822759023-fed622ff2c3b","1501785888041-af3ef285b470",
    "1472214103451-9374bd1c798e","1470071459604-3b5ec3a7fe05","1441974231531-c6227db76b6e",
    "1502082553048-f009c37129b9","1518495973542-4542c06a5843","1519681393784-d120267933ba",
    "1473773508845-188df298d2d1","1551649001-7a2482d98d05","1565299624946-b28f40a0ae38",
    "1597211684565-dca64d72bdfe","1605146768851-eda79da39897","1542621334-a254cf47733d",
  ],
};

// City flavor pools (urban skylines / area shots) added as the LAST image so
// each gallery ends with a location-aware shot.
const CITY_POOL: Record<string, string[]> = {
  mumbai: ["1570168007204-dfb528c6958f","1567157577867-05ccb1388e66","1580581100388-cf60ba00ce75"],
  delhi: ["1587474260584-136574528ed5","1597040663330-c4d2998e1d59","1524613032530-449a5d94c285"],
  bangalore: ["1596176530529-78163a4f7af2","1558431382-27e303142255","1572297569858-b8c00fab1d54"],
  bengaluru: ["1596176530529-78163a4f7af2","1558431382-27e303142255","1572297569858-b8c00fab1d54"],
  chennai: ["1582510003544-4d00b7f74220","1567784177951-6fa58317e16b","1591012825005-86b0bd5ed99f"],
  hyderabad: ["1572252009286-268acec5ca0a","1609766857041-ed402ea8069a","1587474260584-136574528ed5"],
  pune: ["1572252009286-268acec5ca0a","1596176530529-78163a4f7af2","1567157577867-05ccb1388e66"],
  kolkata: ["1558431382-27e303142255","1524613032530-449a5d94c285","1597040663330-c4d2998e1d59"],
  ahmedabad: ["1587474260584-136574528ed5","1572252009286-268acec5ca0a","1591012825005-86b0bd5ed99f"],
  jaipur: ["1599661046289-e31897846e41","1477587458883-47145ed94245","1524613032530-449a5d94c285"],
  goa: ["1512343879784-a960bf40e7f2","1566552881560-0be862a7c445","1582510003544-4d00b7f74220"],
};

const TYPE_ALIASES: Record<string, keyof typeof POOLS> = {
  apartment: "flat", flat: "flat", studio: "studio",
  villa: "villa", house: "house", "independent house": "house", bungalow: "house",
  penthouse: "penthouse", commercial: "commercial", office: "commercial", shop: "commercial",
  plot: "plot", land: "plot",
};

const W = 1200;
const TW = 400;
const buildUrl = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=webp&q=75&w=${w}`;

// Deterministic 32-bit hash from a string (FNV-1a)
const hash = (s: string): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
};

const normalizeType = (t?: string): keyof typeof POOLS => {
  const key = (t || "").toLowerCase().trim();
  return TYPE_ALIASES[key] || "flat";
};

// Build a stable gallery (6 images) for a given property id + type + city.
// First N-1 are type-themed, last one is city-themed when available.
export function buildGallery(seed: string, propertyType?: string, city?: string, count = 6): string[] {
  const type = normalizeType(propertyType);
  const typePool = POOLS[type];
  const cityKey = (city || "").toLowerCase().trim();
  const cityPool = CITY_POOL[cityKey];
  const base = hash(seed || type);

  const result: string[] = [];
  const used = new Set<string>();
  // Pick (count - 1) distinct type images deterministically
  let cursor = base % typePool.length;
  const step = 1 + (base % (typePool.length - 1 || 1));
  while (result.length < count - 1) {
    const id = typePool[cursor % typePool.length];
    if (!used.has(id)) { used.add(id); result.push(buildUrl(id, W)); }
    cursor += step;
    if (used.size >= typePool.length) break;
  }
  // Add a city-flavored final image
  if (cityPool && cityPool.length) {
    const cid = cityPool[base % cityPool.length];
    if (!used.has(cid)) result.push(buildUrl(cid, W));
  }
  // Pad if still short
  while (result.length < count) {
    const id = typePool[(cursor++) % typePool.length];
    result.push(buildUrl(id, W));
  }
  return result;
}

// Backwards compatible helpers used across the app
export function getStockImages(propertyType: string): string[] {
  return buildGallery(propertyType || "flat", propertyType, undefined, 4);
}

const looksLikePlaceholder = (s: string) =>
  !s || s === "/placeholder.svg" || s.includes("placeholder");

export function getPropertyImage(
  images: string[] | null | undefined,
  propertyType: string,
  index = 0,
  seed?: string,
  city?: string,
): string {
  const valid = (images || []).filter((u) => typeof u === "string" && !looksLikePlaceholder(u));
  if (valid.length > 0) {
    const pick = valid[index % valid.length];
    if (pick.startsWith("http") || pick.startsWith("/") || pick.startsWith("data:")) return pick;
  }
  const gallery = buildGallery(seed || propertyType || "x", propertyType, city, 6);
  return gallery[index % gallery.length];
}

// Thumbnail-sized variant (lighter for cards / grids)
export function getThumbUrl(url: string): string {
  if (!url.includes("images.unsplash.com")) return url;
  return url.replace(/(\?|&)w=\d+/, `$1w=${TW}`);
}
