/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { imageSizes: [16, 32, 48, 64, 96, 128, 220, 256, 384, 440] },
  async redirects() {
    return [
      { source: "/blog/tag/area%20calculation", destination: "/blog/tag/area-calculation", permanent: true },
      { source: "/blog/tag/trapezoid%20area", destination: "/blog/tag/trapezoid-area", permanent: true },
      { source: "/blog/tag/square%20feet", destination: "/blog/tag/square-feet", permanent: true },
      // Malformed URLs found in Google Search Console
      {
        source: "/\\$",
        destination: "/",
        permanent: true,
      },
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },

      // Square Footage
      {
        source: "/calculators/square-footage-calculator",
        destination: "/calculators/square-footage",
        permanent: true,
      },

      // Paver
      {
        source: "/calculators/paver-calculator",
        destination: "/calculators/paver",
        permanent: true,
      },

      // Concrete
      {
        source: "/calculators/concrete-calculator",
        destination: "/calculators/concrete",
        permanent: true,
      },
      {
        source: "/calculators/concrete-slab-calculator",
        destination: "/calculators/concrete",
        permanent: true,
      },

      // Paint
      {
        source: "/calculators/paint-calculator",
        destination: "/calculators/paint",
        permanent: true,
      },

      // Tile
      {
        source: "/calculators/tile-calculator",
        destination: "/calculators/tile",
        permanent: true,
      },

      // Gravel
      {
        source: "/calculators/gravel-calculator",
        destination: "/calculators/gravel",
        permanent: true,
      },

      // Topsoil
      {
        source: "/calculators/topsoil-calculator",
        destination: "/calculators/topsoil",
        permanent: true,
      },

      // Sod / Turf
      {
        source: "/calculators/sod-turf-calculator",
        destination: "/calculators/sod-turf",
        permanent: true,
      },

      // Asphalt
      {
        source: "/calculators/asphalt-calculator",
        destination: "/calculators/asphalt",
        permanent: true,
      },

      // Fence
      {
        source: "/calculators/fence-calculator",
        destination: "/calculators/fence",
        permanent: true,
      },

      // Roofing
      {
        source: "/calculators/roofing-calculator",
        destination: "/calculators/roofing",
        permanent: true,
      },

      // Steel
      {
        source: "/calculators/steel-calculator",
        destination: "/calculators/steel",
        permanent: true,
      },

      // Area
      {
        source: "/calculators/area-calculator",
        destination: "/calculators/area",
        permanent: true,
      },

      // Brick
      {
        source: "/calculators/brick-calculator",
        destination: "/calculators/brick",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
