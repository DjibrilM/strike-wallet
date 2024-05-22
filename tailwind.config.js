// tailwind.config.js
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./navigation/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueLight: "#5a8dfe", // Light shade of blue
        blueDefault: "#1354fe", // Base custom blue
        blueDark: "#0f3ec9", // Dark shade of blue
        blueSky: "#87ceeb", // Sky blue
        blueNavy: "#001f3f", // Navy blue
        blueTeal: "#1abc9c", // Teal blue
        blueCerulean: "#007ba7", // Cerulean blue
        blueSapphire: "#0f52ba", // Sapphire blue

        blackLight: "#2c2f3a", // Light shade of black
        blackDefault: "#161925", // Base custom black
        blackDark: "#0d0e14", // Dark shade of black
        blackCharcoal: "#36454f", // Charcoal black
        blackJet: "#343434", // Jet black
        blackOnyx: "#353839", // Onyx black
        blackEbony: "#555d50", // Ebony black
        blackRaisin: "#242124", // Raisin black
      },
    },
  },
  plugins: [],
};
