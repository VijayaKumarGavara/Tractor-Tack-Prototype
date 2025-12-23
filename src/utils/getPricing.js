export default function getPricingContext(form) {
  switch (form.workType) {
    case "loading":
      return null;

    case "ploughing":
      return { mission: form.mission };

    case "harvesting":
      return { crop: form.crop };

    default:
      return "";
  }
}
