import { SetupUser } from "@/actions/billing/setupUser";

async function SetupPage() {
  return await SetupUser();
}

export default SetupPage;
