export const workPricingConfig = {
  loading: {
    label: "Loading",
    unit: "trip",
  },

  ploughing: {
    label: "Ploughing",
    missions: {
      normal: {
        label: "Normal",
        unit: "hour",
      },
      rotavator: {
        label: "Rotavator",
        unit: "hour",
      }
    }
  },

  harvesting: {
    label: "Harvesting",
    cropTypes: {
      paddy: {
        unit: "hour",
      },
      maize: {
        unit: "quintal",
      },
      greengram: {
        unit: "hour",
      }
    }
  }
};
