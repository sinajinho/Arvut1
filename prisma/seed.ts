import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function specs(obj: Record<string, string>) {
  return JSON.stringify(obj);
}

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "CPUs", slug: "cpus" } }),
    prisma.category.create({ data: { name: "GPUs", slug: "gpus" } }),
    prisma.category.create({ data: { name: "RAM", slug: "ram" } }),
    prisma.category.create({ data: { name: "SSDs", slug: "ssds" } }),
    prisma.category.create({
      data: { name: "Motherboards", slug: "motherboards" },
    }),
    prisma.category.create({
      data: { name: "Power Supplies", slug: "power-supplies" },
    }),
    prisma.category.create({ data: { name: "Cases", slug: "cases" } }),
    prisma.category.create({ data: { name: "Coolers", slug: "coolers" } }),
  ]);

  const [cpus, gpus, ram, ssds, motherboards, psus, cases, coolers] =
    categories;

  // Create brands
  const brands = await Promise.all([
    prisma.brand.create({ data: { name: "AMD", slug: "amd" } }),
    prisma.brand.create({ data: { name: "Intel", slug: "intel" } }),
    prisma.brand.create({ data: { name: "NVIDIA", slug: "nvidia" } }),
    prisma.brand.create({ data: { name: "Corsair", slug: "corsair" } }),
    prisma.brand.create({ data: { name: "Samsung", slug: "samsung" } }),
    prisma.brand.create({ data: { name: "ASUS", slug: "asus" } }),
    prisma.brand.create({ data: { name: "MSI", slug: "msi" } }),
    prisma.brand.create({ data: { name: "NZXT", slug: "nzxt" } }),
    prisma.brand.create({ data: { name: "Noctua", slug: "noctua" } }),
    prisma.brand.create({ data: { name: "Seasonic", slug: "seasonic" } }),
    prisma.brand.create({ data: { name: "G.Skill", slug: "gskill" } }),
    prisma.brand.create({ data: { name: "be quiet!", slug: "be-quiet" } }),
  ]);

  const [
    amd, intel, _nvidia, corsair, samsung, asus, msi, nzxt, noctua, seasonic, gskill, bequiet,
  ] = brands;

  // Create products with specs
  await prisma.product.createMany({
    data: [
      // CPUs
      {
        name: "AMD Ryzen 9 7950X",
        slug: "amd-ryzen-9-7950x",
        description:
          "16-core, 32-thread processor with 5.7 GHz boost clock. AM5 socket, 170W TDP.",
        specs: specs({
          Socket: "AM5",
          Cores: "16",
          Threads: "32",
          "Base Clock": "4.5 GHz",
          "Boost Clock": "5.7 GHz",
          "L3 Cache": "64 MB",
          TDP: "170W",
          Architecture: "Zen 4",
        }),
        price: 549.0,
        categoryId: cpus.id,
        brandId: amd.id,
      },
      {
        name: "Intel Core i7-14700K",
        slug: "intel-core-i7-14700k",
        description:
          "20 cores (8P+12E), 28 threads, up to 5.6 GHz. LGA 1700 socket, unlocked.",
        specs: specs({
          Socket: "LGA 1700",
          Cores: "20 (8P+12E)",
          Threads: "28",
          "Base Clock": "3.4 GHz (P-core)",
          "Boost Clock": "5.6 GHz",
          "L3 Cache": "33 MB",
          TDP: "125W",
          Architecture: "Raptor Lake Refresh",
        }),
        price: 409.0,
        categoryId: cpus.id,
        brandId: intel.id,
      },
      {
        name: "AMD Ryzen 5 7600X",
        slug: "amd-ryzen-5-7600x",
        description:
          "6-core, 12-thread processor with 5.3 GHz boost clock. AM5 socket, 105W TDP.",
        specs: specs({
          Socket: "AM5",
          Cores: "6",
          Threads: "12",
          "Base Clock": "4.7 GHz",
          "Boost Clock": "5.3 GHz",
          "L3 Cache": "32 MB",
          TDP: "105W",
          Architecture: "Zen 4",
        }),
        price: 229.0,
        categoryId: cpus.id,
        brandId: amd.id,
      },
      // GPUs
      {
        name: "ASUS ROG Strix GeForce RTX 4070 Ti SUPER",
        slug: "asus-rog-strix-rtx-4070-ti-super",
        description:
          "16 GB GDDR6X, 2670 MHz boost clock, 3.5 slot design with triple axial fans.",
        specs: specs({
          GPU: "AD103",
          VRAM: "16 GB GDDR6X",
          "Memory Bus": "256-bit",
          "Boost Clock": "2670 MHz",
          "CUDA Cores": "8448",
          Interface: "PCIe 4.0 x16",
          "Power Connector": "1x 16-pin",
          TDP: "285W",
        }),
        price: 879.0,
        categoryId: gpus.id,
        brandId: asus.id,
      },
      {
        name: "MSI Gaming X Trio GeForce RTX 4080 SUPER",
        slug: "msi-gaming-x-trio-rtx-4080-super",
        description:
          "16 GB GDDR6X, TRI FROZR 3S cooling, 2610 MHz boost clock.",
        specs: specs({
          GPU: "AD103",
          VRAM: "16 GB GDDR6X",
          "Memory Bus": "256-bit",
          "Boost Clock": "2610 MHz",
          "CUDA Cores": "10240",
          Interface: "PCIe 4.0 x16",
          "Power Connector": "1x 16-pin",
          TDP: "320W",
        }),
        price: 1099.0,
        categoryId: gpus.id,
        brandId: msi.id,
      },
      {
        name: "ASUS TUF Gaming GeForce RTX 4060 Ti",
        slug: "asus-tuf-gaming-rtx-4060-ti",
        description:
          "8 GB GDDR6, OC edition, triple fan cooling, military-grade capacitors.",
        specs: specs({
          GPU: "AD106",
          VRAM: "8 GB GDDR6",
          "Memory Bus": "128-bit",
          "Boost Clock": "2565 MHz",
          "CUDA Cores": "4352",
          Interface: "PCIe 4.0 x16",
          "Power Connector": "1x 8-pin",
          TDP: "160W",
        }),
        price: 449.0,
        categoryId: gpus.id,
        brandId: asus.id,
      },
      // RAM
      {
        name: "Corsair Vengeance DDR5-6000 32GB (2x16GB)",
        slug: "corsair-vengeance-ddr5-6000-32gb",
        description:
          "DDR5-6000 CL36, Intel XMP 3.0, compact low-profile design.",
        specs: specs({
          Type: "DDR5",
          Capacity: "32 GB (2x16 GB)",
          Speed: "6000 MHz",
          Latency: "CL36-36-36-76",
          Voltage: "1.35V",
          "Form Factor": "DIMM",
          "Heat Spreader": "Aluminum",
          XMP: "Intel XMP 3.0",
        }),
        price: 109.0,
        categoryId: ram.id,
        brandId: corsair.id,
      },
      {
        name: "G.Skill Trident Z5 RGB DDR5-6400 32GB (2x16GB)",
        slug: "gskill-trident-z5-rgb-ddr5-6400-32gb",
        description:
          "DDR5-6400 CL32, dual-channel kit with RGB lighting and aluminum heatspreader.",
        specs: specs({
          Type: "DDR5",
          Capacity: "32 GB (2x16 GB)",
          Speed: "6400 MHz",
          Latency: "CL32-39-39-102",
          Voltage: "1.40V",
          "Form Factor": "DIMM",
          "Heat Spreader": "Aluminum",
          RGB: "Yes",
        }),
        price: 149.0,
        categoryId: ram.id,
        brandId: gskill.id,
      },
      // SSDs
      {
        name: "Samsung 990 Pro 2TB NVMe M.2",
        slug: "samsung-990-pro-2tb",
        description:
          "PCIe 4.0 x4, up to 7450 MB/s read, 6900 MB/s write. V-NAND TLC.",
        specs: specs({
          Capacity: "2 TB",
          Interface: "PCIe 4.0 x4 NVMe",
          "Form Factor": "M.2 2280",
          "Sequential Read": "7450 MB/s",
          "Sequential Write": "6900 MB/s",
          "NAND Type": "V-NAND TLC",
          Controller: "Samsung Pascal",
          Endurance: "1200 TBW",
        }),
        price: 169.0,
        categoryId: ssds.id,
        brandId: samsung.id,
      },
      {
        name: "Samsung 870 EVO 1TB SATA",
        slug: "samsung-870-evo-1tb",
        description:
          '2.5" SATA III, up to 560 MB/s read, 530 MB/s write. V-NAND TLC.',
        specs: specs({
          Capacity: "1 TB",
          Interface: "SATA III (6 Gb/s)",
          "Form Factor": '2.5"',
          "Sequential Read": "560 MB/s",
          "Sequential Write": "530 MB/s",
          "NAND Type": "V-NAND TLC",
          Controller: "Samsung MKX",
          Endurance: "600 TBW",
        }),
        price: 79.0,
        categoryId: ssds.id,
        brandId: samsung.id,
      },
      // Motherboards
      {
        name: "ASUS ROG Strix B650E-E Gaming WiFi",
        slug: "asus-rog-strix-b650e-e-gaming-wifi",
        description:
          "AM5 ATX motherboard, PCIe 5.0, DDR5, WiFi 6E, 2.5G Ethernet.",
        specs: specs({
          Socket: "AM5",
          Chipset: "AMD B650E",
          "Form Factor": "ATX",
          "Memory Slots": "4x DDR5",
          "Max Memory": "128 GB",
          "PCIe Slots": "1x PCIe 5.0 x16, 1x PCIe 4.0 x16",
          "M.2 Slots": "3",
          WiFi: "WiFi 6E",
          LAN: "2.5G Ethernet",
        }),
        price: 289.0,
        categoryId: motherboards.id,
        brandId: asus.id,
      },
      {
        name: "MSI MAG Z790 Tomahawk WiFi",
        slug: "msi-mag-z790-tomahawk-wifi",
        description:
          "LGA 1700 ATX, DDR5, PCIe 5.0 x16, WiFi 6E, 2.5G LAN, USB-C front panel.",
        specs: specs({
          Socket: "LGA 1700",
          Chipset: "Intel Z790",
          "Form Factor": "ATX",
          "Memory Slots": "4x DDR5",
          "Max Memory": "128 GB",
          "PCIe Slots": "1x PCIe 5.0 x16, 1x PCIe 4.0 x16",
          "M.2 Slots": "4",
          WiFi: "WiFi 6E",
          LAN: "2.5G Ethernet",
        }),
        price: 259.0,
        categoryId: motherboards.id,
        brandId: msi.id,
      },
      // Power Supplies
      {
        name: "Corsair RM850x 850W 80+ Gold",
        slug: "corsair-rm850x-850w",
        description:
          "Fully modular ATX 3.0 PSU, 80+ Gold, zero RPM fan mode, 140mm depth.",
        specs: specs({
          Wattage: "850W",
          Efficiency: "80+ Gold",
          Modularity: "Fully Modular",
          "Fan Size": "135mm",
          Standard: "ATX 3.0",
          "12VHPWR Connector": "Yes",
          Depth: "140mm",
          Warranty: "10 years",
        }),
        price: 139.0,
        categoryId: psus.id,
        brandId: corsair.id,
      },
      {
        name: "Seasonic Focus GX-1000 1000W 80+ Gold",
        slug: "seasonic-focus-gx-1000",
        description:
          "Fully modular, 80+ Gold, hybrid fan control, 10-year warranty.",
        specs: specs({
          Wattage: "1000W",
          Efficiency: "80+ Gold",
          Modularity: "Fully Modular",
          "Fan Size": "120mm",
          Standard: "ATX 3.0",
          "12VHPWR Connector": "Yes",
          Depth: "140mm",
          Warranty: "10 years",
        }),
        price: 179.0,
        categoryId: psus.id,
        brandId: seasonic.id,
      },
      // Cases
      {
        name: "NZXT H7 Flow",
        slug: "nzxt-h7-flow",
        description:
          "Mid-tower ATX case with perforated front panel, tempered glass, and cable management.",
        specs: specs({
          Type: "Mid-Tower",
          "Motherboard Support": "ATX, Micro-ATX, Mini-ITX",
          "Max GPU Length": "400mm",
          "Max CPU Cooler Height": "185mm",
          "Drive Bays": "2x 3.5\", 2x 2.5\"",
          "Fan Support": "Top: 3x120mm, Front: 3x120mm, Rear: 1x120mm",
          "Radiator Support": "Top: 360mm, Front: 360mm",
          "Side Panel": "Tempered Glass",
        }),
        price: 129.0,
        categoryId: cases.id,
        brandId: nzxt.id,
      },
      {
        name: "be quiet! Pure Base 500DX",
        slug: "be-quiet-pure-base-500dx",
        description:
          "Mid-tower ATX with mesh front, 3 pre-installed Pure Wings 2 fans, ARGB LED.",
        specs: specs({
          Type: "Mid-Tower",
          "Motherboard Support": "ATX, Micro-ATX, Mini-ITX",
          "Max GPU Length": "369mm",
          "Max CPU Cooler Height": "190mm",
          "Drive Bays": "2x 3.5\", 5x 2.5\"",
          "Included Fans": "3x Pure Wings 2 140mm",
          "Radiator Support": "Top: 360mm, Front: 360mm",
          "Side Panel": "Tempered Glass",
        }),
        price: 109.0,
        categoryId: cases.id,
        brandId: bequiet.id,
      },
      // Coolers
      {
        name: "Noctua NH-D15 chromax.black",
        slug: "noctua-nh-d15-chromax-black",
        description:
          "Dual tower CPU cooler, dual NF-A15 fans, 250W TDP, all-black design.",
        specs: specs({
          Type: "Air Cooler (Dual Tower)",
          "Fan Size": "2x 140mm (NF-A15)",
          "Socket Support": "AM5, AM4, LGA 1700, LGA 1200",
          Height: "165mm",
          "TDP Rating": "250W",
          "Noise Level": "24.6 dB(A)",
          Weight: "1320g",
          Color: "Black (chromax)",
        }),
        price: 109.0,
        categoryId: coolers.id,
        brandId: noctua.id,
      },
      {
        name: "Corsair iCUE H150i Elite Capellix XT",
        slug: "corsair-icue-h150i-elite-capellix-xt",
        description:
          "360mm AIO liquid cooler, AF120 RGB Elite fans, copper cold plate.",
        specs: specs({
          Type: "AIO Liquid Cooler",
          "Radiator Size": "360mm",
          "Fan Size": "3x 120mm (AF120 RGB Elite)",
          "Socket Support": "AM5, AM4, LGA 1700, LGA 1200",
          "Cold Plate": "Copper",
          "Pump Speed": "2100 RPM",
          "Noise Level": "30 dB(A)",
          RGB: "Capellix XT LEDs",
        }),
        price: 189.0,
        categoryId: coolers.id,
        brandId: corsair.id,
      },
    ],
  });

  // Seed desktops
  await prisma.desktop.deleteMany();
  await prisma.desktop.createMany({
    data: [
      {
        name: "Arvut1 Office i3 - Windows 11 Pro",
        slug: "arvut1-office-i3",
        description:
          "Compact and affordable office desktop built around the Intel Core i3-13100 4-core processor with integrated graphics. Perfect for everyday tasks, office applications, and web browsing.",
        cpu: "Intel Core i3-13100",
        gpu: "Intel UHD Graphics 730",
        ram: "8 GB DDR4",
        ssd: "256GB M.2 NVMe SSD",
        os: "Windows 11 Pro",
        specs: specs({
          CPU: "Intel Core i3-13100",
          "CPU Cores": "4 (4P+0E)",
          "CPU Threads": "8",
          "CPU Base Clock": "3.4 GHz",
          "CPU Boost Clock": "4.5 GHz",
          GPU: "Intel UHD Graphics 730",
          "RAM Amount": "8 GB",
          "RAM Type": "DDR4-3200",
          "Storage": "256GB M.2 NVMe SSD",
          Motherboard: "Intel B660 Micro-ATX",
          "Power Supply": "400W 80+ Bronze",
          Case: "Micro-ATX Mini Tower",
          "Operating System": "Windows 11 Pro",
          WiFi: "WiFi 5 (802.11ac)",
          Warranty: "2 years",
        }),
        price: 499.0,
      },
      {
        name: "Arvut1 Office i5 - Windows 11 Pro",
        slug: "arvut1-office-i5",
        description:
          "Powerful office workstation featuring the Intel Core i5-13400 10-core processor. Handles multitasking, spreadsheets, video calls, and light content creation with ease.",
        cpu: "Intel Core i5-13400",
        gpu: "Intel UHD Graphics 730",
        ram: "16 GB DDR4",
        ssd: "512GB M.2 NVMe SSD",
        os: "Windows 11 Pro",
        specs: specs({
          CPU: "Intel Core i5-13400",
          "CPU Cores": "10 (6P+4E)",
          "CPU Threads": "16",
          "CPU Base Clock": "2.5 GHz",
          "CPU Boost Clock": "4.6 GHz",
          GPU: "Intel UHD Graphics 730",
          "RAM Amount": "16 GB (2x8 GB)",
          "RAM Type": "DDR4-3200",
          Storage: "512GB M.2 NVMe SSD",
          Motherboard: "Intel B660 Micro-ATX",
          "Power Supply": "450W 80+ Bronze",
          Case: "Micro-ATX Mini Tower",
          "Operating System": "Windows 11 Pro",
          WiFi: "WiFi 6 (802.11ax)",
          Warranty: "2 years",
        }),
        price: 649.0,
      },
      {
        name: "Arvut1 Home R5 - Windows 11 Home",
        slug: "arvut1-home-r5",
        description:
          "Versatile home desktop powered by the AMD Ryzen 5 5600G with integrated Radeon Vega graphics. Great for home use, media streaming, light gaming, and everyday productivity.",
        cpu: "AMD Ryzen 5 5600G",
        gpu: "AMD Radeon Vega 7",
        ram: "16 GB DDR4",
        ssd: "500GB M.2 NVMe SSD",
        os: "Windows 11 Home",
        specs: specs({
          CPU: "AMD Ryzen 5 5600G",
          "CPU Cores": "6",
          "CPU Threads": "12",
          "CPU Base Clock": "3.9 GHz",
          "CPU Boost Clock": "4.4 GHz",
          GPU: "AMD Radeon Vega 7 (integrated)",
          "GPU Cores": "7 CUs",
          "RAM Amount": "16 GB (2x8 GB)",
          "RAM Type": "DDR4-3200",
          Storage: "500GB M.2 NVMe SSD",
          Motherboard: "AMD B550 Micro-ATX",
          "Power Supply": "450W 80+ Bronze",
          Case: "Micro-ATX Mini Tower",
          "Operating System": "Windows 11 Home",
          WiFi: "WiFi 5 (802.11ac)",
          Warranty: "2 years",
        }),
        price: 549.0,
      },
      {
        name: "Arvut1 Gaming R5 - Windows 11 Home",
        slug: "arvut1-gaming-r5",
        description:
          "Entry-level gaming desktop with AMD Ryzen 5 5600X and NVIDIA GeForce RTX 4060. Delivers smooth 1080p gaming performance in all modern titles with ray tracing support.",
        cpu: "AMD Ryzen 5 5600X",
        gpu: "GeForce RTX 4060 8GB",
        ram: "16 GB DDR4",
        ssd: "500GB M.2 NVMe SSD",
        os: "Windows 11 Home",
        specs: specs({
          CPU: "AMD Ryzen 5 5600X",
          "CPU Cores": "6",
          "CPU Threads": "12",
          "CPU Base Clock": "3.7 GHz",
          "CPU Boost Clock": "4.6 GHz",
          GPU: "NVIDIA GeForce RTX 4060",
          VRAM: "8 GB GDDR6",
          "GPU Boost Clock": "2460 MHz",
          "RAM Amount": "16 GB (2x8 GB)",
          "RAM Type": "DDR4-3200",
          Storage: "500GB M.2 NVMe SSD",
          Motherboard: "AMD B550 ATX",
          "Power Supply": "550W 80+ Bronze",
          Case: "Mid-Tower ATX, Tempered Glass",
          "Operating System": "Windows 11 Home",
          WiFi: "WiFi 6 (802.11ax)",
          Warranty: "2 years",
        }),
        price: 899.0,
      },
      {
        name: "Arvut1 Gaming R5 Pro - Windows 11 Home",
        slug: "arvut1-gaming-r5-pro",
        description:
          "High-performance gaming desktop featuring AMD Ryzen 5 7600X on the AM5 platform with DDR5 memory and NVIDIA GeForce RTX 4070 SUPER. Excellent for 1440p gaming and content creation.",
        cpu: "AMD Ryzen 5 7600X",
        gpu: "GeForce RTX 4070 SUPER 12GB",
        ram: "32 GB DDR5",
        ssd: "1TB M.2 NVMe SSD",
        os: "Windows 11 Home",
        specs: specs({
          CPU: "AMD Ryzen 5 7600X",
          "CPU Cores": "6",
          "CPU Threads": "12",
          "CPU Base Clock": "4.7 GHz",
          "CPU Boost Clock": "5.3 GHz",
          GPU: "NVIDIA GeForce RTX 4070 SUPER",
          VRAM: "12 GB GDDR6X",
          "GPU Boost Clock": "2475 MHz",
          "RAM Amount": "32 GB (2x16 GB)",
          "RAM Type": "DDR5-6000",
          Storage: "1TB M.2 NVMe SSD",
          Motherboard: "AMD B650 ATX",
          "Power Supply": "650W 80+ Gold",
          Case: "Mid-Tower ATX, Tempered Glass",
          "CPU Cooler": "Tower Air Cooler 240W TDP",
          "Operating System": "Windows 11 Home",
          WiFi: "WiFi 6E",
          Warranty: "2 years",
        }),
        price: 1199.0,
      },
      {
        name: "Arvut1 Gaming i5 - Windows 11 Home",
        slug: "arvut1-gaming-i5",
        description:
          "Intel-based gaming desktop with Core i5-14400F and NVIDIA GeForce RTX 4060 Ti. A balanced build for smooth 1080p and 1440p gaming with DDR5 memory.",
        cpu: "Intel Core i5-14400F",
        gpu: "GeForce RTX 4060 Ti 8GB",
        ram: "16 GB DDR5",
        ssd: "512GB M.2 NVMe SSD",
        os: "Windows 11 Home",
        specs: specs({
          CPU: "Intel Core i5-14400F",
          "CPU Cores": "10 (6P+4E)",
          "CPU Threads": "16",
          "CPU Base Clock": "2.5 GHz",
          "CPU Boost Clock": "4.7 GHz",
          GPU: "NVIDIA GeForce RTX 4060 Ti",
          VRAM: "8 GB GDDR6",
          "GPU Boost Clock": "2535 MHz",
          "RAM Amount": "16 GB (2x8 GB)",
          "RAM Type": "DDR5-5200",
          Storage: "512GB M.2 NVMe SSD",
          Motherboard: "Intel B760 ATX",
          "Power Supply": "600W 80+ Bronze",
          Case: "Mid-Tower ATX, Tempered Glass",
          "Operating System": "Windows 11 Home",
          WiFi: "WiFi 6 (802.11ax)",
          Warranty: "2 years",
        }),
        price: 949.0,
      },
      {
        name: "Arvut1 Gaming R7 Elite - Windows 11 Home",
        slug: "arvut1-gaming-r7-elite",
        description:
          "Premium gaming desktop built around the AMD Ryzen 7 7800X3D — the ultimate gaming CPU with 3D V-Cache — paired with NVIDIA GeForce RTX 4070 Ti SUPER. Dominates at 1440p and handles 4K gaming.",
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "GeForce RTX 4070 Ti SUPER 16GB",
        ram: "32 GB DDR5",
        ssd: "1TB M.2 NVMe SSD",
        os: "Windows 11 Home",
        specs: specs({
          CPU: "AMD Ryzen 7 7800X3D",
          "CPU Cores": "8",
          "CPU Threads": "16",
          "CPU Base Clock": "4.2 GHz",
          "CPU Boost Clock": "5.0 GHz",
          "CPU L3 Cache": "96 MB (3D V-Cache)",
          GPU: "NVIDIA GeForce RTX 4070 Ti SUPER",
          VRAM: "16 GB GDDR6X",
          "GPU Boost Clock": "2610 MHz",
          "RAM Amount": "32 GB (2x16 GB)",
          "RAM Type": "DDR5-6000",
          Storage: "1TB M.2 NVMe SSD",
          Motherboard: "AMD B650E ATX",
          "Power Supply": "750W 80+ Gold",
          Case: "Mid-Tower ATX, Tempered Glass, ARGB",
          "CPU Cooler": "240mm AIO Liquid Cooler",
          "Operating System": "Windows 11 Home",
          WiFi: "WiFi 6E",
          Warranty: "2 years",
        }),
        price: 1499.0,
      },
      {
        name: "Arvut1 Creator i7 - Windows 11 Pro",
        slug: "arvut1-creator-i7",
        description:
          "Professional workstation for creators, featuring the Intel Core i7-14700K 20-core processor and NVIDIA GeForce RTX 4070. Ideal for video editing, 3D rendering, streaming, and software development.",
        cpu: "Intel Core i7-14700K",
        gpu: "GeForce RTX 4070 12GB",
        ram: "32 GB DDR5",
        ssd: "1TB M.2 NVMe SSD",
        os: "Windows 11 Pro",
        specs: specs({
          CPU: "Intel Core i7-14700K",
          "CPU Cores": "20 (8P+12E)",
          "CPU Threads": "28",
          "CPU Base Clock": "3.4 GHz",
          "CPU Boost Clock": "5.6 GHz",
          GPU: "NVIDIA GeForce RTX 4070",
          VRAM: "12 GB GDDR6X",
          "GPU Boost Clock": "2475 MHz",
          "RAM Amount": "32 GB (2x16 GB)",
          "RAM Type": "DDR5-5600",
          Storage: "1TB M.2 NVMe SSD",
          Motherboard: "Intel Z790 ATX",
          "Power Supply": "700W 80+ Gold",
          Case: "Mid-Tower ATX, Tempered Glass",
          "CPU Cooler": "Tower Air Cooler 250W TDP",
          "Operating System": "Windows 11 Pro",
          WiFi: "WiFi 6E",
          Warranty: "2 years",
        }),
        price: 1349.0,
      },
    ],
  });

  console.log("Seed complete: 18 products + 8 desktops.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
